/* Fasal Natural storefront */
(() => {
  'use strict';

  const WA_NUMBER = '923041790269';
  const DELIVERY = 250;
  const DISCOUNT = 500;
  const STORAGE_KEY = 'fasal-natural-cart-v1';

  /* ---------- Catalog (selling price = base; compare-at = base + 500) ---------- */
  const PRODUCTS = [
    { id: 'simple',   cat: 'halwa', title: 'Simple Sohan Halwa',        urdu: 'سادہ سوہن حلوہ',           img: 'images/products/simple_sohan_halwa_main.webp',     variants: [{ label: '1 Kg', price: 1700 }] },
    { id: 'badami',   cat: 'halwa', title: 'Badami Sohan Halwa',        urdu: 'بادامی سوہن حلوہ',         img: 'images/products/badami_sohan_halwa_main.webp',     variants: [{ label: '1 Kg', price: 1900 }] },
    { id: 'akhroti',  cat: 'halwa', title: 'Akhroti Sohan Halwa',       urdu: 'اخروٹی سوہن حلوہ',         img: 'images/products/akhroti_sohan_halwa_main.webp',     variants: [{ label: '1 Kg', price: 2000 }] },
    { id: 'dakhroti', cat: 'halwa', title: 'Double Akhroti Sohan Halwa',urdu: 'ڈبل اخروٹی سوہن حلوہ',     img: 'images/products/double_akhroti_main.jpg',     variants: [{ label: '1 Kg', price: 2200 }] },
    { id: 'mixdry',   cat: 'halwa', title: 'Mix Dry Fruit Sohan Halwa', urdu: 'مکس ڈرائی فروٹ سوہن حلوہ', img: 'images/products/mix_dry_fruit_main.jpg',     variants: [{ label: '1 Kg', price: 2300 }] },
    { id: 'pista',    cat: 'halwa', title: 'Pista Sohan Halwa',         urdu: 'پستہ سوہن حلوہ',           img: 'images/products/pista_sohan_halwa_main.webp',     variants: [{ label: '1 Kg', price: 2500 }] },
    { id: 'royal',    cat: 'halwa', title: 'Special Royal Sohan Halwa', urdu: 'اسپیشل سوہن حلوہ',         img: 'images/products/special_sohan_halwa_main.webp',     variants: [{ label: '1 Kg', price: 2700 }] },
    { id: 'ghee',     cat: 'ghee',  title: 'Pure Desi Ghee',            urdu: 'خالص دیسی گھی',            img: 'images/ghee.jpg',      variants: [
      { label: '250 Grams', short: '250g', price: 1500 },
      { label: '500 Grams', short: '500g', price: 2600 },
      { label: '1 Kg Tin',  short: '1 Kg', price: 4500 } ] },
    { id: 'panjeeri', cat: 'panjeeri', title: 'Desi Ghee Panjeeri',     urdu: 'دیسی گھی پنجیری',          img: 'images/products/desi_ghee_panjeeri_main.webp',  variants: [{ label: '1 Kg', price: 2500 }] }
  ];

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = n => 'Rs ' + n.toLocaleString('en-PK');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const findProduct = id => PRODUCTS.find(p => p.id === id);

  /* ---------- State ---------- */
  let cart = [];            // [{ id, v (variant index), qty }]
  let filter = 'all';
  let query = '';
  let checkoutItems = null; // null => use cart; array => "Buy now" single item
  const selectedVariant = {}; // product id -> variant index

  try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { cart = []; }
  cart = cart.filter(i => findProduct(i.id) && findProduct(i.id).variants[i.v] && i.qty > 0);
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {} };

  /* ---------- Product grid ---------- */
  const grid = $('#grid');

  function cardHTML(p) {
    const v = p.variants[selectedVariant[p.id] ?? 0];
    const multi = p.variants.length > 1;
    return `
      <article class="card" data-id="${p.id}">
        <div class="card__img">
          <img src="${p.img}" alt="${esc(p.title)}" loading="lazy" width="400" height="400">
          <span class="badge">Save Rs 500</span>
        </div>
        <div class="card__body">
          <h3 class="card__title">${esc(p.title)}</h3>
          <p class="card__urdu urdu">${p.urdu}</p>
          ${multi
            ? `<div class="sizes" role="group" aria-label="Select size">${p.variants.map((x, i) =>
                `<button type="button" data-size="${i}" class="${i === (selectedVariant[p.id] ?? 0) ? 'is-active' : ''}">${x.short}</button>`).join('')}</div>`
            : `<p class="card__size">${v.label} Gift Box</p>`}
          <div class="price"><strong>${fmt(v.price)}</strong><s>${fmt(v.price + DISCOUNT)}</s></div>
          <div class="card__actions">
            <button class="btn btn--primary btn--sm" data-act="add">Add to Cart</button>
            <button class="btn btn--wa btn--sm" data-act="buy">Buy via WhatsApp</button>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter(p =>
      (filter === 'all' || p.cat === filter) &&
      (!q || (p.title + ' ' + p.urdu + ' ' + p.cat).toLowerCase().includes(q)));
    grid.innerHTML = list.map(cardHTML).join('');
    $('#empty').hidden = list.length > 0;
  }

  function setFilter(f, scroll) {
    filter = f;
    $$('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.filter === f));
    renderGrid();
    if (scroll) $('#shop').scrollIntoView({ behavior: 'smooth' });
  }

  grid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const p = findProduct(card.dataset.id);
    const sizeBtn = e.target.closest('[data-size]');
    if (sizeBtn) {
      selectedVariant[p.id] = +sizeBtn.dataset.size;
      card.outerHTML = cardHTML(p);
      return;
    }
    const act = e.target.closest('[data-act]')?.dataset.act;
    const v = selectedVariant[p.id] ?? 0;
    if (act === 'add') { addToCart(p.id, v); toast(`✓ ${p.title} added to cart`); }
    if (act === 'buy') openCheckout([{ id: p.id, v, qty: 1 }]);
  });

  $$('.tab').forEach(t => t.addEventListener('click', () => setFilter(t.dataset.filter, false)));
  $$('[data-filter]:not(.tab)').forEach(a => a.addEventListener('click', () => {
    setFilter(a.dataset.filter, false);
    $('#nav').classList.remove('open');
  }));
  $('#search').addEventListener('input', e => {
    query = e.target.value;
    renderGrid();
    if (query && window.scrollY < $('#shop').offsetTop - 120) $('#shop').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Cart ---------- */
  function addToCart(id, v) {
    const line = cart.find(i => i.id === id && i.v === v);
    line ? line.qty++ : cart.push({ id, v, qty: 1 });
    save(); renderCart();
    const b = $('#cartOpen'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  }

  function totals(items) {
    const qty = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + findProduct(i.id).variants[i.v].price * i.qty, 0);
    const savings = qty * DISCOUNT;
    return { qty, subtotal, savings, delivery: items.length ? DELIVERY : 0, grand: subtotal + (items.length ? DELIVERY : 0) };
  }

  function renderCart() {
    const t = totals(cart);
    $('#cartCount').textContent = t.qty;
    const box = $('#cartItems');
    if (!cart.length) {
      box.innerHTML = '<div class="cart-empty"><p>🛒</p><p>Your cart is empty.</p></div>';
      $('#cartFoot').hidden = true;
      return;
    }
    $('#cartFoot').hidden = false;
    box.innerHTML = cart.map((i, idx) => {
      const p = findProduct(i.id), v = p.variants[i.v];
      return `
      <div class="line">
        <img src="${p.img}" alt="">
        <div>
          <div class="line__title">${esc(p.title)}</div>
          <div class="line__meta">${v.label} · ${fmt(v.price)}</div>
          <div class="qty">
            <button data-q="-1" data-i="${idx}" aria-label="Decrease quantity">−</button>
            <span>${i.qty}</span>
            <button data-q="1" data-i="${idx}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="line__right">
          <span class="line__price">${fmt(v.price * i.qty)}</span>
          <button class="line__remove" data-rm="${idx}">Remove</button>
        </div>
      </div>`;
    }).join('');
    $('#tSub').textContent = fmt(t.subtotal);
    $('#tShip').textContent = fmt(t.delivery);
    $('#tSave').textContent = `You are saving ${fmt(t.savings)} on this order!`;
    $('#tGrand').textContent = fmt(t.grand);
  }

  $('#cartItems').addEventListener('click', e => {
    const q = e.target.closest('[data-q]');
    const rm = e.target.closest('[data-rm]');
    if (q) {
      const line = cart[+q.dataset.i];
      line.qty += +q.dataset.q;
      if (line.qty < 1) cart.splice(+q.dataset.i, 1);
    } else if (rm) cart.splice(+rm.dataset.rm, 1);
    else return;
    save(); renderCart();
  });

  /* ---------- Drawer / modal ---------- */
  const drawer = $('#drawer'), overlay = $('#overlay'), modal = $('#modal');

  function openDrawer() {
    hideToast();
    overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add('show'));
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
  }
  function closeDrawer() {
    overlay.classList.remove('show'); drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true');
    setTimeout(() => { if (!drawer.classList.contains('open')) overlay.hidden = true; }, 300);
  }
  $('#cartOpen').addEventListener('click', openDrawer);
  $('#cartClose').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeCheckout(); } });

  $('#proceed').addEventListener('click', () => { if (cart.length) openCheckout(null); });

  function openCheckout(items) {
    hideToast();
    checkoutItems = items;
    const list = items || cart;
    const t = totals(list);
    $('#modalSummary').innerHTML =
      list.map(i => {
        const p = findProduct(i.id), v = p.variants[i.v];
        return `<div><span>${esc(p.title)} (${v.label}) × ${i.qty}</span><span>${fmt(v.price * i.qty)}</span></div>`;
      }).join('') +
      `<div><span>Delivery (Flat Nationwide)</span><span>${fmt(t.delivery)}</span></div>
       <div><span>You save</span><span>${fmt(t.savings)}</span></div>
       <div class="sum-total"><span>Total Payable</span><span>${fmt(t.grand)}</span></div>`;
    closeDrawer();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#checkoutForm [name=name]').focus(), 50);
  }
  function closeCheckout() { modal.hidden = true; document.body.style.overflow = ''; }
  $('#modalClose').addEventListener('click', closeCheckout);
  modal.addEventListener('mousedown', e => { if (e.target === modal) closeCheckout(); });

  /* ---------- WhatsApp order ---------- */
  function buildMessage(f, items) {
    const t = totals(items);
    const lines = items.map((i, n) => {
      const p = findProduct(i.id), v = p.variants[i.v];
      return `${n + 1}. ${p.title} (${v.label}) × ${i.qty} = ${fmt(v.price * i.qty)}`;
    }).join('\n');
    const notes = f.notes.trim() ? [`• Notes: ${f.notes.trim()}`] : [];
    return [
      '🌿 *NEW ORDER — FASAL NATURAL* 🌿',
      '━━━━━━━━━━━━━━━━━━━━━',
      '👤 *CUSTOMER DETAILS:*',
      `• Name: ${f.name.trim()}`,
      `• Phone: ${f.phone.trim()}`,
      `• City: ${f.city.trim()}`,
      `• Address: ${f.address.trim()}`,
      `• Payment Preference: ${f.payment}`,
      ...notes,
      '',
      '📦 *ITEMS ORDERED:*',
      lines,
      '',
      '━━━━━━━━━━━━━━━━━━━━━',
      `💰 *Subtotal:* ${fmt(t.subtotal)}`,
      `🚚 *Delivery Charges:* Rs ${DELIVERY} (Flat Nationwide)`,
      `🎉 *Total Discount Savings:* ${fmt(t.savings)}`,
      `⭐ *TOTAL PAYABLE:* ${fmt(t.grand)}`,
      '━━━━━━━━━━━━━━━━━━━━━',
      '📍 *Dispatch Origin:* Multan, Pakistan',
      '',
      '_Please confirm my order and share dispatch details. Thank you!_'
    ].join('\n');
  }

  $('#checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    const err = $('#formError');
    let ok = true;
    ['name', 'phone', 'city', 'address'].forEach(k => {
      const el = form.elements[k];
      const bad = !String(data[k] || '').trim();
      el.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    const digits = String(data.phone || '').replace(/\D/g, '');
    if (ok && digits.length < 10) { form.elements.phone.classList.add('invalid'); ok = false; err.textContent = 'Please enter a valid phone number.'; }
    else err.textContent = 'Please fill in all required fields.';
    err.hidden = ok;
    if (!ok) return;

    const items = checkoutItems || cart;
    if (!items.length) return;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMessage(data, items))}`;
    if (!checkoutItems) { cart = []; save(); renderCart(); }
    closeCheckout();
    form.reset();
    window.location.href = url;
  });

  /* ---------- Misc ---------- */
  $('#menuBtn').addEventListener('click', e => {
    const open = $('#nav').classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open);
  });
  $('#nav a[href="#contact"]').addEventListener('click', () => $('#nav').classList.remove('open'));
  $('#year').textContent = new Date().getFullYear();

  let toastEl;
  function hideToast() { if (toastEl) toastEl.classList.remove('show'); }
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  /* ---------- Theme (light / dark) ---------- */
  const root = document.documentElement;
  const themeBtn = $('#themeBtn');
  function applyTheme(t, persist) {
    root.setAttribute('data-theme', t);
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (persist) { try { localStorage.setItem('fasal-theme', t); } catch {} }
  }
  applyTheme(root.getAttribute('data-theme') || 'light', false);
  themeBtn.addEventListener('click', () =>
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    let saved = null; try { saved = localStorage.getItem('fasal-theme'); } catch {}
    if (!saved) applyTheme(e.matches ? 'dark' : 'light', false);
  });

  renderGrid();
  renderCart();
})();

