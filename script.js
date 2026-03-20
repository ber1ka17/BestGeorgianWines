function toggleBurger(navId, burgerId) {
  const nav = document.getElementById(navId);
  const burger = document.getElementById(burgerId);
  if (!nav || !burger) return;
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}

toggleBurger('mainNav', 'burgerBtn');
toggleBurger('mainNav2', 'burgerBtn2');
toggleBurger('mainNav3', 'burgerBtn3');

function toastAlert(message) {
  alert(message);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill all required fields before sending.');
    return false;
  }

  setTimeout(() => {
    alert('Thank you ' + name + '! Your message has been sent.');
  }, 100);

  document.getElementById('contactForm').reset();
  return false;
}

const cart = [];

const wineCatalog = {
  'Saperavi': {name:'Saperavi', image:'https://i.ibb.co/LRXdXp4/botli.png', type:'Red dry', description:'Classic Saperavi, rich berries, oak nuance.', price:45},
  'Mukuzani': {name:'Mukuzani', image:'https://www.bgw.com.ge/wines/mukuzani.jpg', type:'Red dry', description:'Bold red from Kakheti aged in oak barrels.', price:48},
  'Kindzmarauli': {name:'Kindzmarauli', image:'https://www.bgw.com.ge/wines/kindzmarauli.png', type:'Red semi-sweet', description:'Elegant semi-sweet with ripe cherry aroma.', price:42},
  'Tsinandali': {name:'Tsinandali', image:'https://www.bgw.com.ge/wines/tsinandali.jpg', type:'White dry', description:'Crisp white blend with citrus and floral notes.', price:35},
  'Mtsvane': {name:'Mtsvane', image:'https://www.bgw.com.ge/wines/mtsvane.png', type:'White fresh', description:'Lovely white with orchard fruit and fine acidity.', price:33},
  'Okro': {name:'Okro', image:'https://www.bgw.com.ge/wines/okro.png', type:'White semi-sweet', description:'Balanced semi-sweet blend from Kisi, Chkhaveri, Mtsvane.', price:36},
  '8000 Century': {name:'8000 Century', image:'https://www.bgw.com.ge/wines/8000.png', type:'Red premium', description:'Aged red in oak and qvevri, deep tannins.', price:85},
  '8000 Tree': {name:'8000 Tree', image:'https://www.bgw.com.ge/wines/tree.png', type:'White premium', description:'Dry white aged in casks with mineral finish.', price:60},
  'Shavi': {name:'Shavi', image:'https://www.bgw.com.ge/wines/shavi.png', type:'Red semi-sweet', description:'Rich jammy red from Saperavi grapes.', price:40},
  'Chacha Premium': {name:'Chacha Premium', image:'https://www.bgw.com.ge/wines/chacha.jpg', type:'Spirit', description:'Strong Georgian chacha 45% ABV, premium blend.', price:65},
  'Chacha Classic': {name:'Chacha Classic', image:'https://www.bgw.com.ge/wines/chacha1.jpg', type:'Spirit', description:'Classic Georgian chacha 45% ABV.', price:55}
};

function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function initializeWineDetails() {
  const wineName = getQueryParam('wine');
  if (!wineName) return;

  const cleanName = decodeURIComponent(wineName);
  const product = wineCatalog[cleanName];
  if (!product) return;

  const title = document.getElementById('wineTitle');
  const img = document.getElementById('wineImage');
  const type = document.getElementById('wineType');
  const desc = document.getElementById('wineDescription');
  const price = document.getElementById('winePrice');
  const qtyInput = document.getElementById('wineQty');
  const addBtn = document.getElementById('wineAddButton');

  if (!title || !img || !type || !desc || !price || !qtyInput || !addBtn) return;

  title.textContent = product.name;
  img.src = product.image;
  img.alt = product.name;
  type.textContent = product.type;
  desc.textContent = product.description;
  price.textContent = '₾' + product.price.toFixed(2);

  addBtn.addEventListener('click', () => {
    addToCart(product.name, product.price, Number(qtyInput.value));
  });
}

function toastAlert(message) {
  if (existing) existing.remove();
  const alertBox = document.createElement('div');
  alertBox.id = 'toastAlertMessage';
  alertBox.textContent = message;
  alertBox.style = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#1f1a12;color:#fff;padding:0.66rem 1rem;border-radius:6px;z-index:9999;box-shadow:0 2px 10px rgba(0,0,0,0.3);';
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 1400);
}

function addToCart(wineName, price, quantity = 1) {
  const qty = Math.max(1, Math.round(quantity));
  const existing = cart.find(item => item.name === wineName);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({name: wineName, price, quantity: qty});
  }
  renderCart();
  toastAlert(`${qty} x ${wineName} added to cart (₾${(price * qty).toFixed(2)})`);
}

function clearCart() {
  cart.length = 0;
  renderCart();
}

function renderCart() {
  const cartContents = document.getElementById('cartContents');
  const cartStatus = document.getElementById('cartStatus');
  if (!cartContents || !cartStatus) return;

  if (cart.length === 0) {
    cartStatus.textContent = 'Your cart is empty.';
    cartContents.innerHTML = '';
    return;
  }

  cartStatus.textContent = `You have ${cart.reduce((acc, item) => acc + item.quantity, 0)} item(s) in cart.`;
  cartContents.innerHTML = '';

  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    const total = (item.price * item.quantity).toFixed(2);
    row.innerHTML = `
      <span>${item.name}</span>
      <span>₾${item.price.toFixed(2)}</span>
      <span>Qty: ${item.quantity}</span>
      <span>Total: ₾${total}</span>
    `;
    cartContents.appendChild(row);
  });

  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const totalRow = document.createElement('div');
  totalRow.className = 'cart-item';
  totalRow.innerHTML = `<span><strong>Grand total</strong></span><span></span><span></span><span><strong>₾${grandTotal}</strong></span>`;
  cartContents.appendChild(totalRow);
  renderCartSidebar();
}

function renderCartSidebar() {
  const sidebar = document.getElementById('sidebarCartContents');
  const totalElem = document.getElementById('sidebarCartTotal');
  const badge = document.getElementById('cartBadge');
  if (!sidebar || !totalElem || !badge) return;

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = itemCount;

  if (cart.length === 0) {
    sidebar.innerHTML = '<p>Your cart is empty.</p>';
    totalElem.textContent = '';
    return;
  }

  sidebar.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    const total = (item.price * item.quantity).toFixed(2);
    row.innerHTML = `
      <span>${item.name}</span>
      <span>₾${item.price.toFixed(2)}</span>
      <span>Qty: ${item.quantity}</span>
      <span>₾${total}</span>
    `;
    sidebar.appendChild(row);
  });

  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  totalElem.textContent = `Grand total: ₾${grandTotal}`;
}

function toggleCartSidebar() {
  const cartSidebar = document.getElementById('cartSidebar');
  if (!cartSidebar) return;
  cartSidebar.classList.toggle('open');
}

function initializeCatalog() {
  document.querySelectorAll('.card h3').forEach(h3 => {
    h3.textContent = h3.textContent.replace(/\s+\d{4}\b/g, '').trim();
  });

  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('h3')?.textContent || 'Wine';
    const priceText = card.querySelector('.price')?.textContent || '';
    const price = parseFloat(priceText.replace(/[₾\s]/g, '')) || 0;

    const oldButton = card.querySelector('button');
    const actionBlock = document.createElement('div');
    actionBlock.className = 'card-actions';
    actionBlock.innerHTML = `
      <label>Qty <input type="number" min="1" value="1" class="qty-input" /></label>
      <button class="btn btn-sm">Add to Cart</button>
    `;

    if (oldButton) {
      oldButton.remove();
    }

    card.appendChild(actionBlock);

    actionBlock.querySelector('button').addEventListener('click', () => {
      const qtyInput = actionBlock.querySelector('.qty-input');
      addToCart(title, price, Number(qtyInput.value));
    });
  });

  renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeCatalog();
  initializeWineDetails();
});
