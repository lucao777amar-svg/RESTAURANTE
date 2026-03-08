/* ============================================================
   RED EMBER DINER — scripts.js
   All interactivity, cart logic, data, and animations
   ============================================================ */

'use strict';

/* ── DATA ───────────────────────────────────────────────────── */

/** Menu items — each has id, name, emoji, category, description, price, popular flag */
const MENU_ITEMS = [
  // Burgers
  { id: 1,  name: 'The Ember Classic',     emoji: '🍔', category: 'burgers',  price: 9.99,  popular: true,
    desc: 'Double smash patty, special ember sauce, lettuce, pickles, raw onion on a brioche bun.' },
  { id: 2,  name: 'Smoky BBQ Stack',       emoji: '🍔', category: 'burgers',  price: 12.49, popular: true,
    desc: 'Aged cheddar, hickory-smoked bacon, crispy onion rings, house BBQ, jalapeños.' },
  { id: 3,  name: 'Earl\'s Double Down',   emoji: '🍔', category: 'burgers',  price: 14.99, popular: false,
    desc: 'Four smash patties, American cheese, mustard-mayo, gherkins, shredded iceberg.' },
  { id: 4,  name: 'The Mushroom Melt',     emoji: '🍄', category: 'burgers',  price: 11.49, popular: false,
    desc: 'Sautéed wild mushrooms, gruyère, garlic aioli, arugula on a toasted sourdough bun.' },
  { id: 5,  name: 'Crispy Chicken Deluxe', emoji: '🍗', category: 'burgers',  price: 10.99, popular: true,
    desc: 'Buttermilk fried chicken, coleslaw, pickled jalapeños, honey-chipotle drizzle.' },
  { id: 6,  name: 'The Veggie Ember',      emoji: '🥦', category: 'burgers',  price: 9.49,  popular: false,
    desc: 'Charred black bean & oat patty, roasted tomato, avocado spread, micro greens.' },

  // Hot Dogs
  { id: 7,  name: 'Classic Street Dog',    emoji: '🌭', category: 'hotdogs',  price: 6.99,  popular: false,
    desc: 'Snap casing all-beef frank, yellow mustard, sweet relish, diced onion.' },
  { id: 8,  name: 'The Chicago Dog',       emoji: '🌭', category: 'hotdogs',  price: 8.49,  popular: true,
    desc: 'Vienna beef frank, celery salt, sport peppers, tomato slices, neon relish — no ketchup ever.' },
  { id: 9,  name: 'Bacon-Wrapped Dog',     emoji: '🥓', category: 'hotdogs',  price: 9.99,  popular: false,
    desc: 'Beef frank wrapped in two strips of crispy bacon, griddled, topped with nacho cheese.' },

  // Sides
  { id: 10, name: 'Ember Shoestring Fries',emoji: '🍟', category: 'sides',    price: 3.99,  popular: true,
    desc: 'Thin-cut, double-fried, seasoned with our secret spice blend. Dangerously addictive.' },
  { id: 11, name: 'Onion Rings Tower',     emoji: '🧅', category: 'sides',    price: 4.99,  popular: false,
    desc: 'Thick-cut sweet onion rings in a crispy beer batter. Stacked tall, served proud.' },
  { id: 12, name: 'Mac & Cheese Bites',    emoji: '🧀', category: 'sides',    price: 5.49,  popular: false,
    desc: 'Creamy three-cheese mac formed into bite-sized balls, panko-crusted, deep fried.' },
  { id: 13, name: 'Loaded Chili Fries',    emoji: '🫕', category: 'sides',    price: 6.99,  popular: true,
    desc: 'Shoestring fries smothered in house chili, cheddar, sour cream, scallions.' },

  // Drinks
  { id: 14, name: 'Classic Vanilla Shake', emoji: '🥛', category: 'drinks',   price: 5.49,  popular: true,
    desc: 'Real Madagascar vanilla bean ice cream, hand-spun thick. Topped with whipped cream.' },
  { id: 15, name: 'Strawberry Fields Shake',emoji:'🍓', category: 'drinks',   price: 5.99,  popular: false,
    desc: 'Fresh strawberries blended into real strawberry ice cream. A summer classic all year.' },
  { id: 16, name: 'Ember Root Beer Float', emoji: '🍺', category: 'drinks',   price: 4.49,  popular: false,
    desc: 'Ice-cold root beer poured over a scoop of vanilla. Served in a frosted mug.' },
  { id: 17, name: 'Lemonade Squeeze',      emoji: '🍋', category: 'drinks',   price: 3.49,  popular: false,
    desc: 'Hand-squeezed lemonade, a hint of mint, served over crushed ice.' },

  // Desserts
  { id: 18, name: 'Deep-Fried Oreo',       emoji: '🍪', category: 'desserts', price: 4.99,  popular: true,
    desc: 'Golden-fried Oreo sandwich dusted in powdered sugar. A county fair legend.' },
  { id: 19, name: 'Warm Brownie Sundae',   emoji: '🍫', category: 'desserts', price: 6.49,  popular: false,
    desc: 'Gooey walnut brownie, vanilla ice cream, hot fudge, cherry on top.' },
  { id: 20, name: 'Banana Foster Waffle',  emoji: '🧇', category: 'desserts', price: 7.49,  popular: false,
    desc: 'Crispy Belgian waffle, caramelized banana, rum caramel drizzle, whipped cream.' },
];

/** Restaurant locations data */
const LOCATIONS = [
  {
    id: 1,
    branch: 'Downtown',
    name: 'Red Ember Diner — Downtown',
    address: '142 W 45th St, New York, NY 10036',
    hours: 'Mon–Sun: 10am–12am',
    phone: '+1 (212) 555-0101',
    tag: 'Flagship',
    lat: 40.7589,
    lng: -73.9851,
  },
  {
    id: 2,
    branch: 'Brooklyn Heights',
    name: 'Red Ember Diner — Brooklyn Heights',
    address: '88 Montague Street, Brooklyn, NY 11201',
    hours: 'Mon–Sun: 10am–11pm',
    phone: '+1 (718) 555-0202',
    tag: 'Original',
    lat: 40.6958,
    lng: -73.9960,
  },
  {
    id: 3,
    branch: 'Chicago Loop',
    name: 'Red Ember Diner — Chicago',
    address: '225 N Michigan Ave, Chicago, IL 60601',
    hours: 'Mon–Thu: 10am–10pm · Fri–Sat: 10am–12am',
    phone: '+1 (312) 555-0303',
    tag: 'Drive-Thru',
    lat: 41.8858,
    lng: -87.6241,
  },
  {
    id: 4,
    branch: 'Austin South Congress',
    name: 'Red Ember Diner — Austin',
    address: '1620 S Congress Ave, Austin, TX 78704',
    hours: 'Mon–Sun: 11am–11pm',
    phone: '+1 (512) 555-0404',
    tag: 'New',
    lat: 30.2490,
    lng: -97.7503,
  },
  {
    id: 5,
    branch: 'Los Angeles Silver Lake',
    name: 'Red Ember Diner — LA',
    address: '3400 Sunset Blvd, Los Angeles, CA 90026',
    hours: 'Mon–Sun: 10am–11pm',
    phone: '+1 (323) 555-0505',
    tag: 'Patio',
    lat: 34.0918,
    lng: -118.2649,
  },
  {
    id: 6,
    branch: 'Miami Wynwood',
    name: 'Red Ember Diner — Miami',
    address: '2529 NW 2nd Ave, Miami, FL 33127',
    hours: 'Mon–Sun: 12pm–1am',
    phone: '+1 (305) 555-0606',
    tag: 'Late Night',
    lat: 25.7981,
    lng: -80.2014,
  },
];

/* ── STATE ──────────────────────────────────────────────────── */

/** Cart: array of { id, name, emoji, price, qty } */
let cart = JSON.parse(localStorage.getItem('reCart') || '[]');

/* ── DOM REFERENCES ─────────────────────────────────────────── */
const navbar         = document.getElementById('navbar');
const hamburger      = document.getElementById('hamburger');
const navLinks       = document.getElementById('nav-links');
const cartToggleBtn  = document.getElementById('cart-toggle-btn');
const cartCloseBtn   = document.getElementById('cart-close-btn');
const cartSidebar    = document.getElementById('cart-sidebar');
const cartOverlay    = document.getElementById('cart-overlay');
const cartItemsEl    = document.getElementById('cart-items');
const cartFooterEl   = document.getElementById('cart-footer');
const cartCountEl    = document.getElementById('cart-count');
const navCartCount   = document.getElementById('nav-cart-count');
const cartTotalEl    = document.getElementById('cart-total');
const pages          = document.querySelectorAll('.page');
const allNavLinks    = document.querySelectorAll('.nav-link');
const menuGrid       = document.getElementById('menu-grid');
const featuredGrid   = document.getElementById('featured-grid');
const locationsGrid  = document.getElementById('locations-grid');
const checkoutForm   = document.getElementById('checkout-form');
const checkoutItems  = document.getElementById('checkout-items');
const checkoutTotals = document.getElementById('checkout-totals');
const coSubtotal     = document.getElementById('co-subtotal');
const coTotal        = document.getElementById('co-total');
const filterBtns     = document.querySelectorAll('.filter-btn');
const successModal   = document.getElementById('success-modal');
const successName    = document.getElementById('success-name');
const successOrderId = document.getElementById('success-order-id');
const modalCloseBtn  = document.getElementById('modal-close-btn');
const toastEl        = document.getElementById('toast');
const cartCheckoutBtn= document.getElementById('cart-checkout-btn');

/* ── PAGE ROUTING ───────────────────────────────────────────── */

/**
 * Show a page by ID and update nav state.
 * @param {string} pageId
 */
function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-trigger fade animations for the new page
    setTimeout(() => observeFadeEls(), 80);
  }

  // Update nav active state
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  // Sync checkout page when visited
  if (pageId === 'checkout') renderCheckoutPage();

  // Close mobile nav
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

/** Handle all navigation link / button clicks that carry data-page attribute */
function handleNavClick(e) {
  const el = e.target.closest('[data-page]');
  if (!el) return;
  e.preventDefault();
  showPage(el.dataset.page);
  closeCart();
}

document.addEventListener('click', handleNavClick);

/* ── NAVBAR SCROLL EFFECT ───────────────────────────────────── */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── HAMBURGER ──────────────────────────────────────────────── */
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

/* ── CART ───────────────────────────────────────────────────── */

/** Save cart to localStorage */
function persistCart() {
  localStorage.setItem('reCart', JSON.stringify(cart));
}

/** Compute cart total quantity */
function cartTotalQty() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/** Compute cart dollar total */
function cartTotalPrice() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/** Update cart count badges */
function updateCartBadges() {
  const qty = cartTotalQty();
  cartCountEl.textContent   = qty;
  navCartCount.textContent  = qty;
}

/** Render cart sidebar items */
function renderCart() {
  updateCartBadges();

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🍔</span>
        <p>Your cart is empty</p>
        <small>Add something delicious!</small>
      </div>`;
    cartFooterEl.style.display = 'none';
    return;
  }

  cartFooterEl.style.display = 'block';
  cartTotalEl.textContent = `$${cartTotalPrice().toFixed(2)}`;

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <span class="remove-btn" data-action="remove" data-id="${item.id}">Remove</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
      </div>
    </div>`).join('');
}

/** Add item to cart */
function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: item.id, name: item.name, emoji: item.emoji, price: item.price, qty: 1 });
  }
  persistCart();
  renderCart();
  showToast(`${item.emoji} ${item.name} added to cart!`);
}

/** Handle cart item interactions (inc/dec/remove) */
cartItemsEl.addEventListener('click', e => {
  const action = e.target.dataset.action;
  const id     = parseInt(e.target.dataset.id);
  if (!action || !id) return;

  const idx = cart.findIndex(c => c.id === id);
  if (idx === -1) return;

  if (action === 'inc') {
    cart[idx].qty += 1;
  } else if (action === 'dec') {
    cart[idx].qty -= 1;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
  } else if (action === 'remove') {
    cart.splice(idx, 1);
  }

  persistCart();
  renderCart();
  if (document.getElementById('checkout').classList.contains('active')) {
    renderCheckoutPage();
  }
});

/** Open cart sidebar */
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  cartOverlay.setAttribute('aria-hidden', 'false');
  cartSidebar.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/** Close cart sidebar */
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  cartOverlay.setAttribute('aria-hidden', 'true');
  cartSidebar.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cartToggleBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/** Cart sidebar → Checkout */
cartCheckoutBtn.addEventListener('click', () => {
  closeCart();
  showPage('checkout');
});

/* ── MENU RENDERING ─────────────────────────────────────────── */

/**
 * Build a menu card HTML string
 * @param {Object} item
 * @returns {string} HTML
 */
function buildMenuCard(item) {
  return `
    <div class="menu-card" role="listitem" data-category="${item.category}" data-id="${item.id}">
      <div class="card-img">
        <span>${item.emoji}</span>
        <span class="card-category">${item.category}</span>
        ${item.popular ? `<span class="card-badge-popular">⭐ Popular</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <span class="card-price">$${item.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" data-id="${item.id}" aria-label="Add ${item.name} to cart">+ Add</button>
        </div>
      </div>
    </div>`;
}

/** Render full menu grid */
function renderMenu() {
  menuGrid.innerHTML = MENU_ITEMS.map(buildMenuCard).join('');
}

/** Render 3 featured (popular) items on the home page */
function renderFeatured() {
  const popular = MENU_ITEMS.filter(i => i.popular).slice(0, 3);
  featuredGrid.innerHTML = popular.map(buildMenuCard).join('');
}

/** Handle Add to Cart clicks in menu / featured grids */
function handleAddToCart(e) {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;
  const id   = parseInt(btn.dataset.id);
  const item = MENU_ITEMS.find(i => i.id === id);
  if (!item) return;

  // Button feedback
  btn.classList.add('adding');
  btn.textContent = '✓ Added!';
  setTimeout(() => {
    btn.classList.remove('adding');
    btn.textContent = '+ Add';
  }, 1000);

  addToCart(item);
}

document.addEventListener('click', handleAddToCart);

/* ── MENU FILTER ────────────────────────────────────────────── */

/**
 * Filter menu cards by category.
 * Cards not matching the filter are hidden with CSS.
 */
function handleFilter(e) {
  const btn    = e.target.closest('.filter-btn');
  if (!btn) return;

  const filter = btn.dataset.filter;

  filterBtns.forEach(b => {
    b.classList.toggle('active', b === btn);
    b.setAttribute('aria-selected', String(b === btn));
  });

  const cards = menuGrid.querySelectorAll('.menu-card');
  cards.forEach(card => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !match);
  });
}

document.addEventListener('click', handleFilter);

/* ── LOCATIONS RENDERING ────────────────────────────────────── */

/** Build a location card HTML string */
function buildLocationCard(loc) {
  // We embed a Google Maps static-style tile using iframe
  const mapsUrl = `https://maps.google.com/maps?q=${loc.lat},${loc.lng}&z=14&output=embed`;

  return `
    <div class="location-card" id="loc-${loc.id}">
      <div class="location-map">
        <iframe
          class="location-map-inner"
          src="${mapsUrl}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Map for ${loc.name}"
          aria-label="Map showing ${loc.name}"
          style="border:0;"
          allowfullscreen="">
        </iframe>
      </div>
      <div class="location-body">
        <span class="location-tag">${loc.tag}</span>
        <div class="location-name">${loc.branch}</div>
        <div class="location-address">${loc.address}</div>
        <div class="location-meta">
          <span>🕐 ${loc.hours}</span>
          <span>📞 ${loc.phone}</span>
        </div>
        <div class="location-actions">
          <a href="https://maps.google.com/?q=${encodeURIComponent(loc.address)}" target="_blank" rel="noopener noreferrer" class="btn btn-yellow btn-sm">Get Directions</a>
          <button class="btn btn-primary btn-sm" data-page="checkout">Order Now</button>
        </div>
      </div>
    </div>`;
}

/** Render all location cards */
function renderLocations() {
  locationsGrid.innerHTML = LOCATIONS.map(buildLocationCard).join('');
}

/* ── CHECKOUT PAGE ──────────────────────────────────────────── */

/** Sync the checkout order summary with current cart state */
function renderCheckoutPage() {
  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🍔</span>
        <p>No items yet</p>
        <button class="btn btn-outline btn-sm" data-page="menu" style="background:var(--dark);color:var(--cream);border-color:var(--tan);margin-top:8px;">Browse Menu</button>
      </div>`;
    checkoutTotals.style.display = 'none';
    return;
  }

  checkoutItems.innerHTML = cart.map(item => `
    <div class="co-item">
      <div class="co-item-emoji">${item.emoji}</div>
      <div class="co-item-details">
        <div class="co-item-name">${item.name}</div>
        <div class="co-item-qty">Qty: ${item.qty}</div>
      </div>
      <div class="co-item-price">$${(item.price * item.qty).toFixed(2)}</div>
    </div>`).join('');

  checkoutTotals.style.display = 'block';
  const sub   = cartTotalPrice();
  const total = sub + 2.99;
  coSubtotal.textContent = `$${sub.toFixed(2)}`;
  coTotal.textContent    = `$${total.toFixed(2)}`;
}

/* ── FORM VALIDATION & SUBMISSION ───────────────────────────── */

/** Simple validator for checkout form */
function validateCheckout() {
  let valid = true;

  const fields = [
    { id: 'co-name',    errId: 'err-name',    label: 'Name',    type: 'text'  },
    { id: 'co-email',   errId: 'err-email',   label: 'Email',   type: 'email' },
    { id: 'co-phone',   errId: 'err-phone',   label: 'Phone',   type: 'text'  },
    { id: 'co-address', errId: 'err-address', label: 'Address', type: 'text'  },
    { id: 'co-city',    errId: 'err-city',    label: 'City',    type: 'text'  },
    { id: 'co-zip',     errId: 'err-zip',     label: 'ZIP',     type: 'text'  },
  ];

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errEl = document.getElementById(field.errId);
    input.classList.remove('error');
    errEl.textContent = '';

    const val = input.value.trim();

    if (!val) {
      errEl.textContent = `${field.label} is required.`;
      input.classList.add('error');
      valid = false;
      return;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      errEl.textContent = 'Please enter a valid email.';
      input.classList.add('error');
      valid = false;
    }
  });

  // Cart must not be empty
  if (cart.length === 0) {
    showToast('🛒 Your cart is empty! Add some items first.');
    valid = false;
  }

  return valid;
}

/** Handle checkout form submission */
checkoutForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateCheckout()) return;

  const name = document.getElementById('co-name').value.trim();

  // Simulate order placement
  const orderId = 'RE' + Math.floor(100000 + Math.random() * 900000);
  successName.textContent    = name;
  successOrderId.textContent = orderId;

  successModal.classList.add('open');
  successModal.setAttribute('aria-hidden', 'false');

  // Clear cart after successful order
  cart = [];
  persistCart();
  renderCart();
  renderCheckoutPage();
  checkoutForm.reset();
});

/** Close modal and go back to menu */
modalCloseBtn.addEventListener('click', () => {
  successModal.classList.remove('open');
  successModal.setAttribute('aria-hidden', 'true');
  showPage('menu');
});
successModal.addEventListener('click', e => {
  if (e.target === successModal) {
    successModal.classList.remove('open');
    successModal.setAttribute('aria-hidden', 'true');
  }
});

/* ── TOAST ──────────────────────────────────────────────────── */

let toastTimer = null;

/**
 * Show a toast message for a short duration
 * @param {string} message
 * @param {number} [duration=2500]
 */
function showToast(message, duration = 2500) {
  if (toastTimer) clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, duration);
}

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger children if they exist
      const children = entry.target.querySelectorAll('.about-card, .menu-card, .location-card');
      children.forEach((child, i) => {
        child.style.animationDelay = `${i * 80}ms`;
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

/** Observe all fade-up and fade-in elements in the active page */
function observeFadeEls() {
  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    fadeObserver.observe(el);
  });
}

/* ── KEYBOARD ACCESSIBILITY ─────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (successModal.classList.contains('open')) {
      successModal.classList.remove('open');
      successModal.setAttribute('aria-hidden', 'true');
    }
    if (cartSidebar.classList.contains('open')) {
      closeCart();
    }
  }
});

/* ── INIT ───────────────────────────────────────────────────── */

/** Bootstrap everything when DOM is ready */
function init() {
  renderMenu();
  renderFeatured();
  renderLocations();
  renderCart();

  // Start on home page
  showPage('home');

  // Kick off scroll observer
  observeFadeEls();

  // Immediately reveal above-fold elements
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-up, .hero .fade-in').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
