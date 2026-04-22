/* ================================================================
   VANTELLO — BRAND TRANSFORMATION JAVASCRIPT
   All existing functionality preserved.
   Added: bath accessories filter, new page routing (bath, quartz),
          navbar transparent-on-top behaviour.
   ================================================================ */

/* ── PAGE ROUTING ── */
const PAGES = ['home', 'quartz', 'bath', 'product', 'about', 'contact'];
const NAV_MAP = {
  quartz:  'nl-quartz',
  bath:    'nl-bath',
  about:   'nl-about',
  contact: 'nl-contact',
};

function navigate(page, productId) {
  /* hide all */
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.remove('active');
  });

  /* show target */
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  /* nav highlights */
  Object.values(NAV_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (NAV_MAP[page]) {
    const el = document.getElementById(NAV_MAP[page]);
    if (el) el.classList.add('active');
  }

  /* product detail */
  if (page === 'product') setProductData(productId);

  /* reset contact */
  if (page === 'contact') {
    const formOk = document.getElementById('form-ok');
    if (formOk) formOk.style.display = 'none';
    document.querySelectorAll('.t-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
    const fp = document.querySelector('.t-panel');
    const fb = document.querySelector('.t-btn');
    if (fp) fp.classList.add('active');
    if (fb) fb.classList.add('active');
  }

  /* scroll top */
  window.scrollTo({ top: 0, behavior: 'smooth' });

  /* re-init reveal */
  setTimeout(initReveal, 100);

  /* handle navbar transparency */
  updateNavbar();
}

/* ── PRODUCT DATA ── */
const products = {
  pearl:    { series: 'Pearl Series',    name: 'Pearl Brown',    tag: 'The compact single. Precision in small spaces, nothing wasted.',    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80' },
  crystal:  { series: 'Crystal Series',  name: 'Crystal Grey',   tag: 'Understated depth. A surface that improves with every use.',         img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80' },
  marvel:   { series: 'Marvel Series',   name: 'Marvel Black',   tag: 'The flagship single bowl. Engineered without compromise.',           img: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=900&q=80' },
  imperial: { series: 'Imperial Series', name: 'Imperial White',  tag: 'Classic form, modern material. Space meets elegance.',              img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80' },
  fortune:  { series: 'Fortune Series',  name: 'Fortune Brown',   tag: 'Single bowl with generous drainer. Built for the family kitchen.',   img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80' },
  royal:    { series: 'Royal Series',    name: 'Royal White',     tag: 'Two bowls. One vision. Uncompromising depth and workspace.',        img: 'https://images.unsplash.com/photo-1556909172-89cf0b43e8c0?w=900&q=80' },
  matrix:   { series: 'Matrix Series',   name: 'Matrix Almond',   tag: 'Dual-bowl balance. Clean lines, endless light.',                    img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80' },
  rock:     { series: 'Rock Series',     name: 'Rock Grey',       tag: 'Maximum workspace. The statement double bowl for serious kitchens.', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80' },
};

function setProductData(id) {
  const p = products[id] || products.marvel;
  const set = (elId, val) => { const el = document.getElementById(elId); if (el) el.textContent = val; };
  set('bc-name', p.name);
  set('pd-series', p.series);
  set('pd-name', p.name);
  set('pd-tagline', p.tag);
  const img = document.getElementById('gal-main-img');
  if (img) img.src = p.img;
  document.querySelectorAll('.thumb').forEach((t, i) => t.classList.toggle('active', i === 0));
}

/* ── THUMBNAIL GALLERY ── */
function setThumb(el, src) {
  const img = document.getElementById('gal-main-img');
  if (img) img.src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

/* ── QUARTZ COLLECTION FILTER ── */
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.prod-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.style.transition = 'opacity .35s, transform .35s';
      if (show) {
        card.style.display = '';
        requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
      } else {
        card.style.opacity = '0'; card.style.transform = 'translateY(8px)';
        setTimeout(() => { card.style.display = 'none'; }, 360);
      }
    });
  });
});

/* ── BATH ACCESSORIES FILTER ── */
document.querySelectorAll('.ba-cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ba-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.cat;
    document.querySelectorAll('.ba-section-group').forEach(group => {
      const show = filter === 'all' || group.dataset.group === filter;
      group.style.transition = 'opacity .35s';
      if (show) {
        group.style.display = '';
        requestAnimationFrame(() => { group.style.opacity = '1'; });
      } else {
        group.style.opacity = '0';
        setTimeout(() => { group.style.display = 'none'; }, 360);
      }
    });
  });
});

/* ── CONTACT TABS ── */
function switchTab(btn, panelId) {
  document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.t-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
  const ok = document.getElementById('form-ok');
  if (ok) ok.style.display = 'none';
}

function submitForm() {
  document.querySelectorAll('.t-panel').forEach(p => p.classList.remove('active'));
  const ok = document.getElementById('form-ok');
  if (ok) ok.style.display = 'flex';
}

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobMenu   = document.getElementById('mobMenu');
if (hamburger && mobMenu) {
  hamburger.addEventListener('click', () => {
    mobMenu.classList.toggle('open');
    const sp = hamburger.querySelectorAll('span');
    const open = mobMenu.classList.contains('open');
    sp[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
    sp[1].style.opacity   = open ? '0' : '';
    sp[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
  });
}
function closeMob() {
  if (!mobMenu) return;
  mobMenu.classList.remove('open');
  if (hamburger) {
    const sp = hamburger.querySelectorAll('span');
    sp[0].style.transform = ''; sp[1].style.opacity = ''; sp[2].style.transform = '';
  }
}

/* ── NAVBAR — transparent on hero, dark on scroll ── */
const navbar = document.getElementById('navbar');
function updateNavbar() {
  if (!navbar) return;
  const atTop = window.scrollY < 60;
  navbar.classList.toggle('at-top', atTop);
  navbar.classList.toggle('scrolled', !atTop);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar(); /* init */

/* ── SCROLL REVEAL (stagger-aware) ── */
function getCurrentPage() {
  for (const p of PAGES) {
    const el = document.getElementById('page-' + p);
    if (el && el.classList.contains('active')) return p;
  }
  return 'home';
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent   = entry.target.parentElement;
      const siblings = [...parent.querySelectorAll('.rv:not(.in)')];
      const idx      = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.1) + 's';
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('#page-' + getCurrentPage() + ' .rv:not(.in)').forEach(el => obs.observe(el));
}

/* ── COUNTER ANIMATION ── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    if (el._counted) return;
    el._counted = true;
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start  = performance.now();
    const dur    = 1800;
    const tick   = now => {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
const ctrObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
}, { threshold: 0.35 });
document.querySelectorAll('.stats').forEach(el => ctrObs.observe(el));

/* ── CUSTOM CURSOR (desktop) ── */
if (window.innerWidth > 900) {
  const dot  = document.createElement('div');
  dot.style.cssText  = 'position:fixed;width:6px;height:6px;background:#B8952A;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s;mix-blend-mode:normal;';
  const ring = document.createElement('div');
  ring.style.cssText = 'position:fixed;width:28px;height:28px;border:1px solid rgba(184,149,42,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .28s,height .28s,border-color .28s;';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function lagRing() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(lagRing);
  })();
  const expand   = () => { ring.style.width='46px'; ring.style.height='46px'; ring.style.borderColor='rgba(184,149,42,.65)'; };
  const contract = () => { ring.style.width='28px'; ring.style.height='28px'; ring.style.borderColor='rgba(184,149,42,.4)'; };
  document.addEventListener('mouseover', e => { if (e.target.matches('a,button,.prod-card,.ba-card,.cat-card,.rel-card,.feat-card,.why-card,.thumb')) expand(); });
  document.addEventListener('mouseout',  e => { if (e.target.matches('a,button,.prod-card,.ba-card,.cat-card,.rel-card,.feat-card,.why-card,.thumb')) contract(); });
}

/* ── BODY LOAD ── */
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  initReveal();
  updateNavbar();
});
