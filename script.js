// ── DATA ──
const products = [
  {
    id: 1,
    name: "Vestido Asimétrico",
    brand: "Roland Mouret",
    category: "vestidos",
    price: "S/ 35",
    tag: "Más alquilado",
    sizes: ["XS", "S", "M", "L"],
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  },
  {
    id: 2,
    name: "Traje Americano",
    brand: "Hugo Boss",
    category: "trajes",
    price: "S/ 45",
    tag: "Hombre",
    sizes: ["S", "M", "L", "XL"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEfk-DcgtxwTuQc6VkoigppF53-WfLXLYb7SD4XSKaA&s=10",
  },
  {
    id: 3,
    name: "Vestido Midi Floral",
    brand: "Zimmermann",
    category: "vestidos",
    price: "S/ 35",
    tag: "Exclusivo",
    sizes: ["XS", "S", "M"],
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
  },
  {
    id: 4,
    name: "Co-ord Set Lino",
    brand: "Vince",
    category: "casual",
    price: "S/ 72",
    tag: "Tendencia",
    sizes: ["S", "M", "L"],
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
  {
    id: 5,
    name: "Disfraz de Vampiro",
    brand: "Pronovias",
    category: "disfraces",
    price: "S/ 20",
    tag: "¡Nuevo!",
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQpiI42sMf4YwsAIjIGHQVG2W3nxEOXa8ZmghEjCD3tA&s=10",
  },
  {
    id: 6,
    name: "Terno Clásico",
    brand: "Zara Man",
    category: "trajes",
    price: "S/ 45",
    tag: "Hombre",
    sizes: ["S", "M", "L", "XL"],
    img: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI798P15472001_alternate10?$rl_4x5_pdp$",
  },
  {
    id: 7,
    name: "Vestido Cocktail",
    brand: "Elie Saab",
    category: "vestidos",
    price: "S/ 35",
    tag: "Gala",
    sizes: ["XS", "S", "M"],
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
  },
  {
    id: 8,
    name: "Disfraz Jedi",
    brand: "LOOP Originals",
    category: "disfraces",
    price: "S/ 20",
    tag: "¡Nuevo!",
    sizes: ["S", "M", "L", "XL"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbWCXSjzjDaA1akyKd5_qIgJW7xntG4-nm3mBTs2_2SQmmZaCYT5BIBiA&s=10",
  },
];

let currentFilter = "todos";

function renderCatalog(filter) {
  const grid = document.getElementById("catalogGrid");
  const filtered =
    filter === "todos"
      ? products
      : products.filter((p) => p.category === filter);
  grid.innerHTML = filtered
    .map(
      (p) => `
      <div class="product-card fade-up" onclick="openModal(${p.id})">
        <div class="product-img-wrap">
          <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"/>
          <div class="product-tag">${p.tag}</div>
          <div class="product-actions">
            <button class="btn-card btn-card-primary" onclick="event.stopPropagation(); openModal(${p.id})">Reservar</button>
            <button class="btn-card btn-card-secondary" onclick="event.stopPropagation(); showToast('Añadido a favoritos ♥')">♡</button>
          </div>
        </div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">${p.brand}</div>
        <div class="product-price-row">
          <span class="product-price">${p.price} <span class="price-period">/ día</span></span>
          <div class="product-sizes">
            ${p.sizes
              .slice(0, 3)
              .map((s) => `<div class="size-dot">${s}</div>`)
              .join("")}
          </div>
        </div>
      </div>
    `,
    )
    .join("");
  observeFadeUps();
}

function filterCatalog(btn, filter) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = filter;
  renderCatalog(filter);
}

// ── MODAL ──
function openModal(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  currentModalProduct = p;
  currentSelectedSize = p.sizes[0];
  document.getElementById("modalTag").textContent = p.tag;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalMeta").textContent = p.brand;
  document.getElementById("modalPrice").textContent = p.price;
  const modalImgEl = document.getElementById("modalImg");
  modalImgEl.innerHTML = `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;"/>`;
  modalImgEl.className = "";
  const sizesEl = document.getElementById("modalSizes");
  sizesEl.innerHTML = p.sizes
    .map(
      (s, i) =>
        `<button class="size-btn${i === 0 ? " selected" : ""}" onclick="selectSize(this, '${s}')">${s}</button>`,
    )
    .join("");
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("productModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("productModal").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("productModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

function selectSize(btn, size) {
  document
    .querySelectorAll(".size-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
  currentSelectedSize = size;
}

let currentModalProduct = null;
let currentSelectedSize = null;

function reservar() {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  if (!start || !end) {
    showToast("Por favor selecciona las fechas de alquiler.");
    return;
  }
  if (new Date(end) <= new Date(start)) {
    showToast("La fecha de fin debe ser posterior al inicio.");
    return;
  }
  if (!currentModalProduct) return;

  const days = Math.max(
    1,
    Math.round((new Date(end) - new Date(start)) / 86400000),
  );
  addToCart({
    productId: currentModalProduct.id,
    name: currentModalProduct.name,
    brand: currentModalProduct.brand,
    img: currentModalProduct.img,
    pricePerDay: parseInt(currentModalProduct.price.replace(/\D/g, "")),
    size: currentSelectedSize,
    startDate: start,
    endDate: end,
    days: days,
  });
  closeModal();
  showToast("Prenda añadida al carrito ♥");
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}

// ── FADE ON SCROLL ──
function observeFadeUps() {
  const els = document.querySelectorAll(".fade-up:not(.visible)");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 80);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  els.forEach((el) => obs.observe(el));
}

// ── HAMBURGER MENU ──
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const btn = document.getElementById("hamburger");
  menu.classList.toggle("open");
  btn.classList.toggle("open");
}
function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
}
// Close menu on outside click
document.addEventListener("click", (e) => {
  const menu = document.getElementById("mobileMenu");
  const btn = document.getElementById("hamburger");
  if (
    menu.classList.contains("open") &&
    !menu.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    closeMenu();
  }
});

// ══════════════════════════════════════
//  AUTH SYSTEM (localStorage)
// ══════════════════════════════════════
const USERS_KEY = "loop_users";
const SESSION_KEY = "loop_session";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (e) {
    return null;
  }
}
function setSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email: user.email, name: user.name }),
  );
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Simple non-cryptographic hash — fine for a frontend-only demo, never use for real security
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

function openAuth(tab) {
  document.getElementById("authModal").classList.add("open");
  document.body.style.overflow = "hidden";
  switchAuthTab(tab || "login");
}
function closeAuth() {
  document.getElementById("authModal").classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("loginError").classList.remove("show");
  document.getElementById("registerError").classList.remove("show");
}
document.getElementById("authModal").addEventListener("click", function (e) {
  if (e.target === this) closeAuth();
});

function switchAuthTab(tab) {
  const isLogin = tab === "login";
  document.getElementById("tabLogin").classList.toggle("active", isLogin);
  document.getElementById("tabRegister").classList.toggle("active", !isLogin);
  document.getElementById("panelLogin").classList.toggle("active", isLogin);
  document.getElementById("panelRegister").classList.toggle("active", !isLogin);
}

function showAuthError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.add("show");
}

function handleRegister() {
  const name = document.getElementById("registerName").value.trim();
  const email = document
    .getElementById("registerEmail")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("registerPassword").value;
  document.getElementById("registerError").classList.remove("show");

  if (!name || !email || !password) {
    showAuthError("registerError", "Por favor completa todos los campos.");
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showAuthError("registerError", "Ingresa un correo electrónico válido.");
    return;
  }
  if (password.length < 6) {
    showAuthError(
      "registerError",
      "La contraseña debe tener al menos 6 caracteres.",
    );
    return;
  }
  const users = getUsers();
  if (users.some((u) => u.email === email)) {
    showAuthError("registerError", "Ya existe una cuenta con este correo.");
    return;
  }
  const newUser = { name, email, passwordHash: simpleHash(password) };
  users.push(newUser);
  saveUsers(users);
  setSession(newUser);
  closeAuth();
  refreshAuthUI();
  showToast(`¡Bienvenida, ${name}! Tu cuenta fue creada con éxito.`);
  clearAuthForms();
}

function handleLogin() {
  const email = document
    .getElementById("loginEmail")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("loginPassword").value;
  document.getElementById("loginError").classList.remove("show");

  if (!email || !password) {
    showAuthError("loginError", "Ingresa tu correo y contraseña.");
    return;
  }
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user || user.passwordHash !== simpleHash(password)) {
    showAuthError("loginError", "Correo o contraseña incorrectos.");
    return;
  }
  setSession(user);
  closeAuth();
  refreshAuthUI();
  showToast(`¡Hola de nuevo, ${user.name}!`);
  clearAuthForms();
}

function logoutUser() {
  clearSession();
  refreshAuthUI();
  showToast("Sesión cerrada. ¡Vuelve pronto!");
}

function clearAuthForms() {
  [
    "loginEmail",
    "loginPassword",
    "registerName",
    "registerEmail",
    "registerPassword",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

function openAuthIfNeeded() {
  const session = getSession();
  if (!session) openAuth("login");
}

function refreshAuthUI() {
  const session = getSession();
  const badge = document.getElementById("accountBadge");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const loggedOutBox = document.getElementById("mobileMenuLoggedOut");
  const loggedInBox = document.getElementById("mobileMenuLoggedIn");

  if (session) {
    badge.classList.add("show");
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    document.getElementById("accountName").textContent =
      session.name.split(" ")[0];
    document.getElementById("accountAvatar").textContent = session.name
      .charAt(0)
      .toUpperCase();
    document.getElementById("mobileAccountName").textContent =
      session.name.split(" ")[0];
    loggedOutBox.style.display = "none";
    loggedInBox.style.display = "flex";
  } else {
    badge.classList.remove("show");
    loginBtn.style.display = "";
    registerBtn.style.display = "";
    loggedOutBox.style.display = "flex";
    loggedInBox.style.display = "none";
  }
}

// ══════════════════════════════════════
//  CART SYSTEM (localStorage)
// ══════════════════════════════════════
const CART_KEY = "loop_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function addToCart(item) {
  const cart = getCart();
  item.cartId = Date.now().toString() + Math.random().toString(36).slice(2, 6);
  cart.push(item);
  saveCart(cart);
}

function removeFromCart(cartId) {
  let cart = getCart();
  cart = cart.filter((i) => i.cartId !== cartId);
  saveCart(cart);
  renderCart();
}

function updateCartBadges() {
  const count = getCart().length;
  const sidebarBadge = document.getElementById("cartCountSidebar");
  const mobileBadge = document.getElementById("cartCountMobile");
  if (count > 0) {
    sidebarBadge.textContent = count;
    sidebarBadge.classList.add("show");
    mobileBadge.textContent = `(${count})`;
  } else {
    sidebarBadge.classList.remove("show");
    mobileBadge.textContent = "";
  }
}

function openCart() {
  renderCart();
  document.getElementById("cartModal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartModal").classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("cartModal").addEventListener("click", function (e) {
  if (e.target === this) closeCart();
});

function formatDate(d) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartItemsContainer");
  const summary = document.getElementById("cartSummary");
  const subtitle = document.getElementById("cartSubtitle");

  subtitle.textContent = `${cart.length} prenda${cart.length !== 1 ? "s" : ""} seleccionada${cart.length !== 1 ? "s" : ""}`;

  if (cart.length === 0) {
    container.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <p>Tu carrito está vacío.<br>Explora el catálogo y añade tus prendas favoritas.</p>
        </div>`;
    summary.style.display = "none";
    return;
  }

  let subtotal = 0;
  container.innerHTML = cart
    .map((item) => {
      const lineTotal = item.pricePerDay * item.days;
      subtotal += lineTotal;
      return `
        <div class="cart-item">
          <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"/></div>
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">${item.brand} · Talla ${item.size}</div>
            <div class="cart-item-dates">${formatDate(item.startDate)} – ${formatDate(item.endDate)} (${item.days} día${item.days !== 1 ? "s" : ""})</div>
          </div>
          <div>
            <div class="cart-item-price">S/ ${lineTotal}</div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.cartId}')">Quitar</button>
          </div>
        </div>`;
    })
    .join("");

  const insurance = Math.round(subtotal * 0.08);
  const total = subtotal + insurance;

  document.getElementById("cartSubtotal").textContent = `S/ ${subtotal}`;
  document.getElementById("cartInsurance").textContent = `S/ ${insurance}`;
  document.getElementById("cartTotal").textContent = `S/ ${total}`;
  summary.style.display = "block";
}

// ══════════════════════════════════════
//  CHECKOUT (simulado)
// ══════════════════════════════════════
function goToCheckout() {
  const session = getSession();
  if (!session) {
    closeCart();
    showToast("Inicia sesión para continuar con tu reserva.");
    openAuth("login");
    return;
  }
  const cart = getCart();
  if (cart.length === 0) return;

  let subtotal = cart.reduce((sum, i) => sum + i.pricePerDay * i.days, 0);
  const total = subtotal + Math.round(subtotal * 0.08);

  document.getElementById("checkoutTotalLabel").textContent =
    `Total a pagar: S/ ${total}`;
  document.getElementById("checkoutForm").style.display = "block";
  document.getElementById("checkoutSuccess").style.display = "none";
  document.getElementById("checkoutError").classList.remove("show");
  closeCart();
  document.getElementById("checkoutModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
  document.body.style.overflow = "";
}
document
  .getElementById("checkoutModal")
  .addEventListener("click", function (e) {
    if (e.target === this) closeCheckout();
  });

// Format card number with spaces as user types
document.getElementById("cardNumber").addEventListener("input", function (e) {
  let v = e.target.value.replace(/\D/g, "").slice(0, 16);
  e.target.value = v.replace(/(\d{4})(?=\d)/g, "$1 ");
});
document.getElementById("cardExpiry").addEventListener("input", function (e) {
  let v = e.target.value.replace(/\D/g, "").slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
  e.target.value = v;
});
document.getElementById("cardCvv").addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
});

function handleCheckout() {
  const name = document.getElementById("cardName").value.trim();
  const number = document.getElementById("cardNumber").value.replace(/\s/g, "");
  const expiry = document.getElementById("cardExpiry").value;
  const cvv = document.getElementById("cardCvv").value;
  const errEl = document.getElementById("checkoutError");
  errEl.classList.remove("show");

  if (!name || !number || !expiry || !cvv) {
    errEl.textContent = "Por favor completa todos los campos de pago.";
    errEl.classList.add("show");
    return;
  }
  if (number.length < 15) {
    errEl.textContent = "El número de tarjeta no es válido.";
    errEl.classList.add("show");
    return;
  }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    errEl.textContent = "La fecha de vencimiento no es válida (MM/AA).";
    errEl.classList.add("show");
    return;
  }
  if (cvv.length < 3) {
    errEl.textContent = "El CVV no es válido.";
    errEl.classList.add("show");
    return;
  }

  // Simulated payment processing
  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("checkoutSuccess").style.display = "block";

  // Clear cart after successful "payment"
  saveCart([]);

  // Clear card form
  ["cardName", "cardNumber", "cardExpiry", "cardCvv"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
}

// ── SIDEBAR EXPAND ──
const sidebar = document.getElementById("sidebar");
const nav = document.querySelector("nav");
sidebar.addEventListener("mouseenter", () => {
  nav.style.left = "var(--sidebar-expanded)";
});
sidebar.addEventListener("mouseleave", () => {
  nav.style.left = "var(--sidebar-w)";
});

// ── INIT ──
renderCatalog("todos");
refreshAuthUI();
updateCartBadges();
document.addEventListener("DOMContentLoaded", observeFadeUps);
observeFadeUps();
