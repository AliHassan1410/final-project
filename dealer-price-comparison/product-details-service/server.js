const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const products = [
  { id: 1, name: 'Laptop Pro 15' },
  { id: 2, name: 'Wireless Mouse' },
  { id: 3, name: 'Mechanical Keyboard' },
  { id: 4, name: '4K Monitor' },
  { id: 5, name: 'Noise Cancelling Headphones' },
  { id: 6, name: 'USB-C Hub' },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Product Details Microservice running on port ${PORT}`);
});
