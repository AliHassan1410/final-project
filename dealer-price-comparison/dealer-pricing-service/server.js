const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const dealers = [
  { id: 1, name: 'TechWorld' },
  { id: 2, name: 'GadgetHub' },
  { id: 3, name: 'ElectroMart' },
  { id: 4, name: 'ByteStore' },
  { id: 5, name: 'QuickTech' },
];

// prices[productId][dealerId] = price
const prices = {
  1: { 1: 1299, 2: 1349, 3: 1275, 4: 1320, 5: 1289 },
  2: { 1: 25, 2: 22, 3: 28, 4: 24, 5: 26 },
  3: { 1: 89, 2: 95, 3: 85, 4: 92, 5: 88 },
  4: { 1: 349, 2: 365, 3: 339, 4: 355, 5: 342 },
  5: { 1: 199, 2: 210, 3: 189, 4: 205, 5: 195 },
  6: { 1: 39, 2: 42, 3: 36, 4: 40, 5: 38 },
};

app.get('/api/dealers', (req, res) => {
  const productId = Number(req.query.productId);
  if (!productId || !prices[productId]) {
    return res.status(400).json({ error: 'Valid productId is required' });
  }
  res.json(dealers);
});

app.get('/api/price', (req, res) => {
  const productId = Number(req.query.productId);
  const dealerId = Number(req.query.dealerId);
  const price = prices[productId] && prices[productId][dealerId];
  if (price === undefined) return res.status(404).json({ error: 'Price not found' });
  const dealer = dealers.find((d) => d.id === dealerId);
  res.json({ dealerId, dealerName: dealer.name, productId, price });
});

app.get('/api/prices', (req, res) => {
  const productId = Number(req.query.productId);
  if (!productId || !prices[productId]) {
    return res.status(400).json({ error: 'Valid productId is required' });
  }
  const allPrices = dealers.map((d) => ({
    dealerId: d.id,
    dealerName: d.name,
    price: prices[productId][d.id],
  }));
  res.json(allPrices);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Dealer Pricing Microservice running on port ${PORT}`);
});
