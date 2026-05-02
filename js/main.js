/* ══════════════════════════════════════════════
   ITQAAN — main.js
   ══════════════════════════════════════════════ */

/* ────────────────────────────────────────────
   1. REVEAL ON SCROLL
──────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  els.forEach(el => {
    const d = el.style.getPropertyValue('--d') || '0s';
    el.style.transitionDelay = d;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

/* ────────────────────────────────────────────
   2. NAVBAR SCROLL SHADOW
──────────────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ────────────────────────────────────────────
   3. MOBILE NAV TOGGLE
──────────────────────────────────────────── */
const navHam    = document.getElementById('nav-ham');
const navMobile = document.getElementById('nav-mobile');

navHam.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navHam.textContent = open ? '✕' : '☰';
  navHam.setAttribute('aria-expanded', open);
});

function closeMobileNav() {
  navMobile.classList.remove('open');
  navHam.textContent = '☰';
  navHam.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', e => {
  if (!navHam.contains(e.target) && !navMobile.contains(e.target)) {
    closeMobileNav();
  }
});

/* ────────────────────────────────────────────
   4. TESTIMONIALS CAROUSEL
──────────────────────────────────────────── */
(function () {
  const reviews = [
    {
      name: 'Shabiib A.',
      role: 'MathTutor Insights',
      init: 'S',
      text: '"Working with Shayan was a seamless experience. He understood the vision immediately and delivered a site that <span class="tc-hl">exceeded every expectation</span>. Professional, fast, and genuinely cares about the result."'
    },
    {
      name: 'Client',
      role: 'Royal Thobes',
      init: 'R',
      text: '"The attention to detail in our e-commerce site was outstanding. Every section was <span class="tc-hl">thoughtfully designed</span> with our customers in mind. Highly recommend ITQAAN to any Muslim business."'
    },
    {
      name: 'Client',
      role: 'Tadabbur Kids',
      init: 'T',
      text: '"ITQAAN brought our platform to life in a way that felt <span class="tc-hl">true to our values</span>. The design is beautiful, the site works perfectly, and the whole process was barakah-filled."'
    },
    {
      name: 'Business Owner',
      role: 'UAE — Service Business',
      init: 'B',
      text: '"Finally a designer who understands the Muslim market. The site <span class="tc-hl">converts visitors into clients</span> and looks premium doing it. The Itqaan philosophy really shows in the work."'
    }
  ];

  function card(r) {
    return `<div class="tc-card">
      <div class="tc-top">
        <div class="tc-avatar">${r.init}</div>
        <div>
          <div class="tc-name">${r.name}</div>
          <div class="tc-role">${r.role}</div>
        </div>
        <div class="tc-stars">
          <span class="tc-star">★</span><span class="tc-star">★</span>
          <span class="tc-star">★</span><span class="tc-star">★</span>
          <span class="tc-star">★</span>
        </div>
      </div>
      <p class="tc-text">${r.text}</p>
    </div>`;
  }

  const r1 = document.getElementById('tc-r1');
  const r2 = document.getElementById('tc-r2');
  const o1 = [0, 1, 2, 3, 0, 1, 2, 3];
  const o2 = [2, 3, 0, 1, 2, 3, 0, 1];
  r1.innerHTML = o1.map(i => card(reviews[i])).join('');
  r2.innerHTML = o2.map(i => card(reviews[i])).join('');
})();

/* ────────────────────────────────────────────
   5. POSTER STACK
──────────────────────────────────────────── */
(function () {
  const posters = [
    {
      src:     'images/work/brand-identity.png',
      label:   'Brand Identity',
      hint:    'Click to browse · double-click to expand',
      fit:     'cover'
    },
    {
      src:     'images/work/tadabbur-screenshot.png',
      label:   'Web Design',
      hint:    'Click to browse · double-click to expand',
      fit:     'cover'
    },
    {
      src:     'images/work/carousel-post.png',
      label:   'Graphic Design',
      hint:    'Click to browse · double-click to expand',
      fit:     'contain'   // portrait 4:5 — contain prevents cropping
    },
  ];

  const stack   = document.getElementById('pstack');
  const dotsEl  = document.getElementById('pstack-dots');
  const cards   = Array.from(stack.querySelectorAll('.pstack-card'));
  let positions = ['front', 'middle', 'back'];
  let currentIdx = 0;
  let clickCount = 0;
  let clickTimer = null;
  const TOTAL = posters.length;

  // Inject images into cards on init
  cards.forEach((card, i) => {
    const p = posters[i];
    const inner = card.querySelector('.pstack-placeholder') || card;
    if (p && p.src) {
      // Replace placeholder with real image
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.label;
      img.style.cssText = `width:100%;height:100%;object-fit:${p.fit || 'cover'};object-position:center top;display:block;`;
      const ph = card.querySelector('.pstack-placeholder');
      if (ph) ph.replaceWith(img);
    }
    // Update the overlay label
    const badge = card.querySelector('.pstack-card-badge');
    if (badge && p) badge.textContent = p.label;
    const hint = card.querySelector('.pstack-card-hint');
    if (hint && p) hint.textContent = p.hint || 'Click to browse';
  });

  function applyPositions() {
    cards.forEach((c, i) => { c.dataset.pos = positions[i]; });
  }

  function updateDots() {
    const dots = dotsEl.querySelectorAll('.pstack-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
  }

  function shuffle() {
    const [f, m, b] = positions;
    positions = [m, b, f];
    applyPositions();
    currentIdx = (currentIdx + 1) % TOTAL;
    updateDots();
  }

  function openLightbox() {
    const frontI  = positions.indexOf('front');
    const frontCard = cards[frontI];
    const img = frontCard.querySelector('img');
    if (!img) return;
    const lb    = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    lbImg.src = img.src;
    lb.classList.add('open');
  }

  stack.addEventListener('click', e => {
    const frontI    = positions.indexOf('front');
    const frontCard = cards[frontI];
    if (!frontCard.contains(e.target) && e.target !== frontCard) return;

    clickCount++;
    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        clickCount = 0;
        shuffle();
      }, 280);
    } else if (clickCount >= 2) {
      clearTimeout(clickTimer);
      clickCount = 0;
      openLightbox();
    }
  });

  // Lightbox close
  document.getElementById('lightbox-close').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('open');
  });
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('open');
  });
})();

/* ────────────────────────────────────────────
   6. LIVE PREVIEW IFRAMES — lazy load on hover
──────────────────────────────────────────── */
(function () {
  const cards = document.querySelectorAll('.preview-card');

  cards.forEach(card => {
    const iframe = card.querySelector('.preview-frame');
    if (!iframe) return;
    let loaded = false;

    // Load iframe when card enters viewport
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loaded) {
          loaded = true;
          iframe.src = iframe.dataset.src;
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.1 });

    obs.observe(card);
  });
})();

/* ────────────────────────────────────────────
   7. SLIDE TO WHATSAPP
──────────────────────────────────────────── */
(function () {
  const container = document.getElementById('wa-slide');
  const handle    = document.getElementById('wa-slide-handle');
  const fill      = document.getElementById('wa-slide-fill');
  const label     = document.getElementById('wa-slide-label');
  const done      = document.getElementById('wa-slide-done');

  const HANDLE_W  = 58;
  const MAX_DRAG  = 232;
  const THRESHOLD = MAX_DRAG * 0.86;

  let startX    = null;
  let currentX  = 0;
  let completed = false;

  function setPos(x) {
    x = Math.max(0, Math.min(x, MAX_DRAG));
    currentX = x;
    handle.style.transform = `translateX(${x}px)`;
    fill.style.transform   = `scaleX(${(x + HANDLE_W) / (MAX_DRAG + HANDLE_W)})`;
    label.style.opacity    = String(Math.max(0, 1 - x / (THRESHOLD * 0.6)));
  }

  function complete() {
    if (completed) return;
    completed = true;
    setPos(MAX_DRAG);
    label.style.opacity = '0';
    done.style.opacity  = '1';
    window.open(
      'https://wa.me/923165252296?text=Assalamu%20Alaykum%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20ITQAAN.',
      '_blank', 'noopener'
    );
    setTimeout(() => {
      handle.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      fill.style.transition   = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      setPos(0);
      done.style.opacity  = '0';
      label.style.opacity = '1';
      setTimeout(() => {
        handle.style.transition = '';
        fill.style.transition   = '';
        completed = false;
      }, 520);
    }, 2600);
  }

  handle.addEventListener('pointerdown', e => {
    if (completed) return;
    startX = e.clientX - currentX;
    handle.setPointerCapture(e.pointerId);
    handle.style.transition = 'none';
    fill.style.transition   = 'none';
  });

  handle.addEventListener('pointermove', e => {
    if (startX === null) return;
    setPos(e.clientX - startX);
  });

  handle.addEventListener('pointerup', () => {
    if (startX === null) return;
    startX = null;
    if (currentX >= THRESHOLD) {
      complete();
    } else {
      handle.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
      fill.style.transition   = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
      setPos(0);
    }
  });

  handle.addEventListener('pointercancel', () => {
    startX = null;
    setPos(0);
  });
})();