const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const { category, name } = req.query;

    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    const results = await collection.find(query).toArray();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
