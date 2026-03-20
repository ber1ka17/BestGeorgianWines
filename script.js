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

function addToCart(wineName, price, qtyInput) {
  const quantity = Math.max(1, Number(qtyInput.value) || 1);
  const total = (price * quantity).toFixed(2);
  toastAlert(`${quantity} x ${wineName} added to cart (₾${total})`);
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
      addToCart(title, price, qtyInput);
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeCatalog);
