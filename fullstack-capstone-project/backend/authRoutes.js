const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connectToDatabase = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'capstone-dev-secret';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = payload;
    next();
  });
}

router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({ email, password: hashedPassword, firstName, lastName });

    const token = jwt.sign({ userId: result.insertedId, email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, email, firstName, lastName });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');
    const { email, password } = req.body;

    // Locate the current user in the database
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, email: user.email, firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');
    const user = await users.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ email: user.email, firstName: user.firstName, lastName: user.lastName });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;
