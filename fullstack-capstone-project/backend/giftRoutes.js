const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const gifts = await collection.find({}).toArray();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gifts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const gift = await collection.findOne({ id: req.params.id });
    if (!gift) return res.status(404).json({ error: 'Gift not found' });
    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
});

module.exports = router;
