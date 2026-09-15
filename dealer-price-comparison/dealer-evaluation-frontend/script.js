const PRODUCT_API_BASE = 'http://localhost:3001';
const DEALER_API_BASE = 'http://localhost:3002';

const productSelect = document.getElementById('productSelect');
const dealerSelect = document.getElementById('dealerSelect');
const resultDiv = document.getElementById('result');

async function loadProducts() {
  const res = await fetch(`${PRODUCT_API_BASE}/api/products`);
  const products = await res.json();
  productSelect.innerHTML =
    '<option value="">-- Select a product --</option>' +
    products.map((p) => `<option value="${p.id}">${p.name}</option>`).join('');
}

productSelect.addEventListener('change', async () => {
  resultDiv.innerHTML = '';
  dealerSelect.innerHTML = '<option value="">-- Select a dealer --</option>';
  dealerSelect.disabled = true;

  const productId = productSelect.value;
  if (!productId) return;

  const res = await fetch(`${DEALER_API_BASE}/api/dealers?productId=${productId}`);
  const dealers = await res.json();

  dealerSelect.innerHTML =
    '<option value="">-- Select a dealer --</option>' +
    '<option value="all">All Dealers</option>' +
    dealers.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
  dealerSelect.disabled = false;

  resultDiv.innerHTML = `
    <h2>Dealers supplying this product</h2>
    <ul class="dealer-list">
      ${dealers.map((d) => `<li>${d.name}</li>`).join('')}
    </ul>`;
});

dealerSelect.addEventListener('change', async () => {
  const productId = productSelect.value;
  const dealerId = dealerSelect.value;
  if (!productId || !dealerId) return;

  if (dealerId === 'all') {
    const res = await fetch(`${DEALER_API_BASE}/api/prices?productId=${productId}`);
    const allPrices = await res.json();
    resultDiv.innerHTML = `
      <h2>Prices from all dealers</h2>
      <table class="price-table">
        <thead><tr><th>Dealer</th><th>Price</th></tr></thead>
        <tbody>
          ${allPrices
            .map((p) => `<tr><td>${p.dealerName}</td><td>$${p.price.toFixed(2)}</td></tr>`)
            .join('')}
        </tbody>
      </table>`;
  } else {
    const res = await fetch(`${DEALER_API_BASE}/api/price?productId=${productId}&dealerId=${dealerId}`);
    const priceData = await res.json();
    resultDiv.innerHTML = `
      <h2>Price from ${priceData.dealerName}</h2>
      <p class="price">$${priceData.price.toFixed(2)}</p>`;
  }
});

loadProducts();
