const express = require('express');
const cors = require('cors');
require('dotenv').config();

const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');
const authRoutes = require('./authRoutes');
const analyzeSentiment = require('../sentiment');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

app.post('/api/gifts/:id/review', (req, res) => {
  const { comment } = req.body;
  const result = analyzeSentiment(comment);
  res.json({ comment, ...result });
});

app.get('/', (req, res) => {
  res.json({ message: 'Gift Shop API is running' });
});

const PORT = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Gift Shop API running on port ${PORT}`);
  });
}

module.exports = app;
