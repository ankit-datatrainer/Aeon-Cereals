/* =====================================================================
   AEON CEREALS — site engine
   Shared header/footer, preloader, smooth scroll, scroll animations,
   3D tilt, cursor, dropdowns, voice dock (speak + mic), helpers.
   ===================================================================== */
(function () {
  'use strict';

  const SHOP = 'https://4knatural.peculiex.com/products';
  const PRODUCTS = [
    { name: 'Dhoop & Agarbatti', slug: 'dhoop-agarbatti', tag: 'Rituals' },
    { name: 'Dry Fruits', slug: 'dry-fruits', tag: 'Premium' },
    { name: 'Wellness & Supplements', slug: 'wellness-supplements', tag: 'Vitality' },
    { name: 'Mukhwas', slug: 'mukhwas', tag: 'After-meal' },
    { name: 'Oils', slug: 'oils', tag: 'Cold-pressed' },
    { name: 'Ghee', slug: 'ghee', tag: 'Pure' },
    { name: 'Pulses & Rice', slug: 'pulses-rice', tag: 'Staples' },
    { name: 'Snacks', slug: 'snacks', tag: 'Coming soon', soon: true },
    { name: 'Spices', slug: 'spices', tag: 'Whole & ground' },
    { name: 'Tea and Herbal Tea', slug: 'tea-herbal', tag: 'Brew' },
    { name: 'Organic Products', slug: 'organic-products', tag: 'Certified' }
  ];
  window.AEON_PRODUCTS = PRODUCTS;
  window.AEON_SHOP = SHOP;

  const ABOUT = [
    { name: 'Our History', href: 'history.html', tag: 'Since 1995' },
    { name: 'Founder-Chairman', href: 'founder.html', tag: 'Leadership' },
    { name: 'Chairman & Managing Director', href: 'chairman.html', tag: 'Leadership' },
    { name: 'Board of Directors', href: 'board.html', tag: 'Governance' },
    { name: 'Board Committees', href: 'committees.html', tag: 'Governance' }
  ];

  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const extIcon = '<svg class="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>';
  const logo = `
    <svg class="brand__mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="#c9a24a" stroke-width="1.2"/>
      <path d="M24 8c4 6 6 11 6 16s-2 10-6 16c-4-6-6-11-6-16s2-10 6-16Z" fill="#c9a24a"/>
      <path d="M24 12v24" stroke="#0b1f16" stroke-width="1.2"/>
      <path d="M14 30c3-1 6-1 10 0M14 22c3-1 6-1 10 0M34 30c-3-1-6-1-10 0M34 22c-3-1-6-1-10 0" stroke="#c9a24a" stroke-width="1" opacity=".7"/>
    </svg>`;

  /* ---------- Header ---------- */
  function buildHeader() {
    const aboutLinks = ABOUT.map(a => `<a href="${a.href}"><span>${a.name}</span><small>${a.tag}</small></a>`).join('');
    const prodLinks = PRODUCTS.map(p => `<a href="${SHOP}?category=${p.slug}" target="_blank" rel="noopener"><span>${p.name}</span>${p.soon ? '<small>Coming soon</small>' : extIcon}</a>`).join('');

    const isAbout = ['history.html', 'founder.html', 'chairman.html', 'board.html', 'committees.html'].includes(page);
    const act = (h) => page === h ? ' class="is-active"' : '';

    const html = `
    <div class="topbar">
      <div class="container">
        <div class="topbar-marquee"><span>FSSAI Lic. No. 13322001000902 &nbsp;·&nbsp; ISO 9001:2015 &amp; ISO 22000 Certified &nbsp;·&nbsp; CIN U74899DL1995PLC072664 &nbsp;·&nbsp; 100% Natural since 1995 &nbsp;·&nbsp; Registered Office: Rohini, New Delhi &nbsp;·&nbsp; FSSAI Lic. No. 13322001000902 &nbsp;·&nbsp; ISO 9001:2015 &amp; ISO 22000 Certified &nbsp;·&nbsp; CIN U74899DL1995PLC072664 &nbsp;·&nbsp; 100% Natural since 1995 &nbsp;·&nbsp; Registered Office: Rohini, New Delhi &nbsp;·&nbsp;</span></div>
        <span class="topbar__right"><a href="${SHOP}" target="_blank" rel="noopener">Shop 4K Natural ↗</a></span>
      </div>
    </div>
    <header class="header" id="header">
      <div class="container">
        <a class="brand" href="index.html" aria-label="Aeon Cereals Limited home">${logo}<span class="brand__name">Aeon Cereals<small>Limited · Est. 1995</small></span></a>
        <nav aria-label="Primary">
          <ul class="nav">
            <li class="has-drop${isAbout ? ' is-active' : ''}"><button type="button" aria-haspopup="true">About ${chev}</button>
              <div class="dropdown">${aboutLinks}</div></li>
            <li class="has-drop${act('products.html') ? ' is-active' : ''}"><button type="button" aria-haspopup="true">Products ${chev}</button>
              <div class="dropdown dropdown--wide"><div class="dropdown__head">4K Natural range · opens store</div>${prodLinks}<a href="products.html" style="grid-column:1/-1;background:var(--cream-100)"><span>View product overview</span><small>On this site</small></a></div></li>
            <li${act('board.html')}><a href="board.html">Board of Directors</a></li>
            <li${act('financials.html')}><a href="financials.html">Financials</a></li>
            <li${act('offices.html')}><a href="offices.html">Registered Offices</a></li>
            <li${act('news.html')}><a href="news.html">News / Media</a></li>
          </ul>
        </nav>
        <div class="header__cta">
          <a class="btn btn--outline" href="${SHOP}" target="_blank" rel="noopener">Shop 4K Natural</a>
          <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      <ul>
        <li><button type="button">About <span>+</span></button><div class="sub">${ABOUT.map(a => `<a href="${a.href}">${a.name}</a>`).join('')}</div></li>
        <li><button type="button">Products <span>+</span></button><div class="sub">${PRODUCTS.map(p => `<a href="${SHOP}?category=${p.slug}" target="_blank" rel="noopener">${p.name}${p.soon ? '<small>Coming soon</small>' : '<small>↗</small>'}</a>`).join('')}<a href="products.html">Product overview →</a></div></li>
        <li><a href="board.html">Board of Directors</a></li>
        <li><a href="financials.html">Financials</a></li>
        <li><a href="offices.html">Registered Offices</a></li>
        <li><a href="news.html">News / Media</a></li>
        <li><a href="${SHOP}" target="_blank" rel="noopener">Shop 4K Natural ↗</a></li>
      </ul>
      <p class="mobile-menu__foot">Aeon Cereals Limited · Shop No. 18, CSC-6, Sector 9, Rohini, New Delhi 110085</p>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', html);
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    const html = `
    <footer class="footer">
      <div class="footer__big" aria-hidden="true">AEON CEREALS</div>
      <div class="container">
        <div class="footer__grid">
          <div>
            <a class="brand" href="index.html">${logo}<span class="brand__name">Aeon Cereals<small>Limited · Est. 1995</small></span></a>
            <p>An unlisted public company incorporated in 1995 and headquartered in Rohini, New Delhi. Home of the 4K Natural range of dry fruits, spices, pulses, oils, ghee and organic staples.</p>
            <p style="margin-top:14px">CIN: U74899DL1995PLC072664<br>FSSAI: 13322001000902</p>
          </div>
          <div><h4>About</h4><ul>${ABOUT.map(a => `<li><a href="${a.href}">${a.name}</a></li>`).join('')}</ul></div>
          <div><h4>Company</h4><ul>
            <li><a href="products.html">Products</a></li>
            <li><a href="financials.html">Financials</a></li>
            <li><a href="offices.html">Registered Offices</a></li>
            <li><a href="news.html">News / Media</a></li>
            <li><a href="${SHOP}" target="_blank" rel="noopener">4K Natural Store ↗</a></li>
          </ul></div>
          <div><h4>Contact</h4><ul>
            <li>Shop No. 18, CSC-6, Sector 9,<br>Rohini, New Delhi 110085</li>
            <li><a href="mailto:info@aeoncereals.com">info@aeoncereals.com</a></li>
            <li><a href="tel:+919560969531">+91 95609 69531</a></li>
          </ul></div>
        </div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} Aeon Cereals Limited. All rights reserved.</span>
          <span>Registrar of Companies, Delhi · Public Limited Company</span>
        </div>
      </div>
    </footer>
    <div class="voice-dock" id="voiceDock" role="group" aria-label="Voice controls">
      <button class="voice-btn" id="btnSpeak" aria-label="Listen to this page" title="Listen to this page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>
      </button>
      <button class="voice-btn" id="btnMic" aria-label="Voice command" title="Say: open products, go to history, read page…">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg>
      </button>
      <div class="voice-bars"><i></i><i></i><i></i><i></i></div>
      <span class="voice-dock__label" id="voiceLabel"></span>
    </div>
    <div class="voice-tip" id="voiceTip"></div>
    <div class="modal" id="modal" aria-hidden="true"><div class="modal__box"><button class="modal__close" id="modalClose" aria-label="Close">×</button><div id="modalContent"></div></div></div>
    <div class="cursor" id="cursor"><div class="cursor__ring"></div><div class="cursor__dot"></div></div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ---------- Preloader ---------- */
  function buildPreloader() {
    if (sessionStorage.getItem('aeon-loaded')) return null;
    const el = document.createElement('div');
    el.className = 'preloader';
    el.innerHTML = `<div class="preloader__logo"><span>Aeon Cereals</span></div><div class="preloader__bar"><i></i></div><div class="preloader__count">000</div>`;
    document.body.appendChild(el);
    const curtain = document.createElement('div');
    curtain.className = 'curtain';
    document.body.appendChild(curtain);
    return { el, curtain };
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildHeader();
    buildFooter();
    const pre = buildPreloader();

    const hasGSAP = typeof gsap !== 'undefined';
    if (hasGSAP && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    initHeader();
    initMobileMenu();
    initCursor();
    initAccordion();
    initModal();
    initVoice();

    const start = () => {
      initSmoothScroll();
      initReveals();
      initTilt();
      initCounters();
      initParallax();
      initMagnetic();
      initTimeline();
      initHeroIntro();
      document.dispatchEvent(new CustomEvent('aeon:ready'));
    };

    if (pre && hasGSAP) {
      let done = false;
      const finish = () => { pre.el.remove(); pre.curtain.remove(); sessionStorage.setItem('aeon-loaded', '1'); };
      // Safety net: if frames are throttled (hidden tab), never trap the visitor behind the loader
      const guard = setTimeout(() => { if (!done) { done = true; tl.kill(); finish(); start(); } }, 4500);
      const tl = gsap.timeline({ onComplete: () => { clearTimeout(guard); finish(); } });
      const count = { v: 0 };
      tl.to('.preloader__logo span', { y: 0, duration: 1, ease: 'expo.out' })
        .to(count, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { pre.el.querySelector('.preloader__count').textContent = String(Math.round(count.v)).padStart(3, '0'); pre.el.querySelector('.preloader__bar i').style.width = count.v + '%'; } }, '<')
        .to('.preloader__logo span', { y: '-110%', duration: .6, ease: 'expo.in' }, '+=.1')
        .to(pre.curtain, { scaleY: 1, duration: .6, ease: 'expo.inOut' }, '<.1')
        .set(pre.el, { autoAlpha: 0 })
        .add(() => { if (!done) { done = true; start(); } })
        .to(pre.curtain, { scaleY: 0, transformOrigin: 'bottom', duration: .8, ease: 'expo.inOut' });
    } else {
      if (pre) { pre.el.remove(); pre.curtain.remove(); }
      start();
    }
  });

  /* ---------- Header behaviour ---------- */
  function initHeader() {
    const header = document.getElementById('header');
    if (document.body.dataset.header === 'light') header.classList.add('is-light');
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    document.querySelectorAll('.nav .has-drop > button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const li = btn.parentElement;
        const open = li.classList.contains('is-open');
        document.querySelectorAll('.nav .has-drop').forEach(l => l.classList.remove('is-open'));
        if (!open) li.classList.add('is-open');
      });
    });
    document.addEventListener('click', () => document.querySelectorAll('.nav .has-drop').forEach(l => l.classList.remove('is-open')));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.nav .has-drop').forEach(l => l.classList.remove('is-open')); });
  }

  function initMobileMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (window.lenis) open ? window.lenis.stop() : window.lenis.start();
    });
    menu.querySelectorAll('li > button').forEach(b => b.addEventListener('click', () => b.parentElement.classList.toggle('is-open')));
  }

  /* ---------- Smooth scroll ---------- */
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', e => document.getElementById('header').classList.toggle('is-scrolled', e.scroll > 40));
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -90 }); }
    }));
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      document.documentElement.classList.add('no-js');
      return;
    }
    const map = {
      left: { x: -90, y: 0, opacity: 0, rotateY: 8 },
      right: { x: 90, y: 0, opacity: 0, rotateY: -8 },
      up: { y: 70, opacity: 0 },
      down: { y: -70, opacity: 0 },
      scale: { scale: .85, opacity: 0 },
      fade: { opacity: 0 },
      flip: { rotateX: -30, y: 40, opacity: 0, transformPerspective: 900 }
    };
    document.querySelectorAll('[data-reveal]').forEach(el => {
      const type = el.dataset.reveal || 'up';
      const from = map[type] || map.up;
      const delay = parseFloat(el.dataset.delay || 0);
      gsap.fromTo(el, { ...from, transformPerspective: 1000 }, {
        x: 0, y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0,
        duration: 1.35, delay, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });

    // Stagger groups: children animate one after another
    document.querySelectorAll('[data-stagger]').forEach(group => {
      const kids = group.children;
      const dir = group.dataset.stagger || 'up';
      const from = map[dir] || map.up;
      gsap.fromTo(kids, { ...from, transformPerspective: 1000 }, {
        x: 0, y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0,
        duration: 1.2, ease: 'expo.out', stagger: .12,
        scrollTrigger: { trigger: group, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    // Image reveals: clip-path from a side + inner scale
    document.querySelectorAll('.frame[data-clip]').forEach(fr => {
      const side = fr.dataset.clip;
      const clips = { left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)', up: 'inset(100% 0 0 0)', down: 'inset(0 0 100% 0)' };
      gsap.fromTo(fr, { clipPath: clips[side] || clips.left }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'expo.inOut',
        scrollTrigger: { trigger: fr, start: 'top 85%' }
      });
      const img = fr.querySelector('img');
      if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1.02, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: fr, start: 'top 85%' } });
    });

    // Split-line headings
    document.querySelectorAll('[data-split]').forEach(h => {
      const words = h.textContent.trim().split(/\s+/);
      h.setAttribute('aria-label', words.join(' '));
      h.innerHTML = words.map(w => `<span class="w" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em"><span style="display:inline-block">${w}</span></span>`).join(' ');
      gsap.fromTo(h.querySelectorAll('.w > span'), { y: '110%', rotate: 4 }, {
        y: 0, rotate: 0, duration: 1.2, ease: 'expo.out', stagger: .05,
        scrollTrigger: { trigger: h, start: 'top 88%' }
      });
    });

    // Progress-driven section pins for horizontal marquee speed etc.
    ScrollTrigger.refresh();
  }

  /* ---------- Hero intro (home) ---------- */
  function initHeroIntro() {
    const h1 = document.querySelector('.hero h1');
    if (!h1 || typeof gsap === 'undefined') return;
    const words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', words.join(' '));
    h1.innerHTML = words.map(w => `<span class="word"><span>${w}</span></span>`).join(' ');
    gsap.timeline({ delay: .1 })
      .to('.hero h1 .word span', { y: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: .08 })
      .to('.hero .lead', { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=.9')
      .fromTo('.hero__actions', { y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=.8')
      .fromTo('.hero__meta', { y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=.8');
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero__content', { y: -120, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
  }

  /* ---------- Parallax for page-hero backgrounds & inner imgs ---------- */
  function initParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    document.querySelectorAll('.page-hero__img').forEach(img => {
      gsap.to(img, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top top', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('.page-hero .container').forEach(c => {
      gsap.to(c, { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: c.parentElement, start: '50% top', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const amt = parseFloat(el.dataset.parallax) || 60;
      gsap.fromTo(el, { y: amt }, { y: -amt, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('.frame:not([data-clip]) img').forEach(img => {
      gsap.fromTo(img, { yPercent: -8, scale: 1.18 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ---------- Horizontal timeline (history) ---------- */
  function initTimeline() {
    const wrap = document.querySelector('.timeline-wrap');
    const track = document.querySelector('.timeline');
    if (!wrap || !track || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px)', () => {
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: wrap, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: st => { const p = wrap.querySelector('.tl-progress i'); if (p) p.style.width = (st.progress * 100) + '%'; }
        }
      });
      gsap.utils.toArray('.tl-item').forEach(item => {
        gsap.fromTo(item, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left 90%', toggleActions: 'play none none reverse' } });
      });
      return () => tween.kill();
    });
    mm.add('(max-width: 768px)', () => {
      track.style.transform = '';
      track.style.width = '';
      track.style.flexDirection = 'column';
      wrap.classList.add('is-stacked');
    });
  }

  /* ---------- 3D tilt ---------- */
  function initTilt() {
    if (!window.matchMedia('(hover:hover)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(el => {
      const max = parseFloat(el.dataset.tilt) || 8;
      const glare = document.createElement('div'); glare.className = 'card__glare'; el.appendChild(glare);
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (px * 100) + '%'); el.style.setProperty('--my', (py * 100) + '%');
        el.style.transition = 'transform .1s';
        el.style.transform = `perspective(900px) rotateX(${(py - .5) * -max}deg) rotateY(${(px - .5) * max}deg) translateZ(6px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transition = 'transform .8s cubic-bezier(.16,1,.3,1)'; el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!window.matchMedia('(hover:hover)').matches || typeof gsap === 'undefined') return;
    document.querySelectorAll('.btn, .voice-btn, .news-item .go').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .25, duration: .4, ease: 'power3.out' });
      });
      b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)' }));
    });
  }

  /* ---------- Counters ---------- */
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dec = (el.dataset.count.split('.')[1] || '').length;
      const run = () => {
        const obj = { v: 0 };
        if (typeof gsap === 'undefined') { el.textContent = target + suffix; return; }
        gsap.to(obj, { v: target, duration: 2.2, ease: 'expo.out', onUpdate: () => el.textContent = obj.v.toFixed(dec) + suffix });
      };
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: run });
      else run();
    });
  }

  /* ---------- Cursor ---------- */
  function initCursor() {
    const c = document.getElementById('cursor');
    if (!c || !window.matchMedia('(hover:hover)').matches) return;
    let x = 0, y = 0, rx = 0, ry = 0;
    const dot = c.querySelector('.cursor__dot'), ring = c.querySelector('.cursor__ring');
    window.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; });
    const loop = () => { rx += (x - rx) * .16; ry += (y - ry) * .16; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener('mouseover', e => c.classList.toggle('is-hover', !!e.target.closest('a,button,[data-tilt],input')));
  }

  /* ---------- Accordion ---------- */
  function initAccordion() {
    document.querySelectorAll('.acc').forEach(acc => {
      const head = acc.querySelector('.acc__head'), body = acc.querySelector('.acc__body');
      head.addEventListener('click', () => {
        const open = acc.classList.toggle('is-open');
        body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
        if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 750);
      });
    });
    const first = document.querySelector('.acc');
    if (first) { first.classList.add('is-open'); first.querySelector('.acc__body').style.maxHeight = first.querySelector('.acc__body').scrollHeight + 'px'; }
  }

  /* ---------- Modal ---------- */
  function initModal() {
    const m = document.getElementById('modal');
    const close = () => { m.classList.remove('is-open'); if (window.lenis) window.lenis.start(); };
    document.getElementById('modalClose').addEventListener('click', close);
    m.addEventListener('click', e => { if (e.target === m) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.openModal = html => { document.getElementById('modalContent').innerHTML = html; m.classList.add('is-open'); if (window.lenis) window.lenis.stop(); };
  }

  /* ---------- Voice: speak the page + mic commands ---------- */
  function initVoice() {
    const dock = document.getElementById('voiceDock');
    const btnSpeak = document.getElementById('btnSpeak');
    const btnMic = document.getElementById('btnMic');
    const label = document.getElementById('voiceLabel');
    const tip = document.getElementById('voiceTip');
    const synth = window.speechSynthesis;
    let speaking = false, utter = null, tipTimer;

    const showTip = (msg, ms = 3200) => { tip.textContent = msg; tip.classList.add('is-visible'); clearTimeout(tipTimer); tipTimer = setTimeout(() => tip.classList.remove('is-visible'), ms); };

    function pageText() {
      const main = document.querySelector('main') || document.body;
      const custom = main.dataset.speech;
      const parts = [];
      if (custom) parts.push(custom);
      main.querySelectorAll('[data-speak], h1, h2, .lead, .split__body p, .leader__body p, .card p, .director__body p, .tl-item p, .news-item p, .acc__inner p, .fin-step > p').forEach(el => {
        if (el.closest('.no-speak')) return;
        const t = el.textContent.replace(/\s+/g, ' ').trim();
        if (t && !parts.includes(t)) parts.push(t);
      });
      return parts.join('. ');
    }

    function pickVoice() {
      const vs = synth.getVoices();
      return vs.find(v => /en-IN/i.test(v.lang)) || vs.find(v => /en-GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || vs[0];
    }

    function stopSpeak() {
      synth && synth.cancel();
      speaking = false;
      btnSpeak.classList.remove('is-active');
      dock.classList.remove('is-talking');
      label.textContent = '';
    }

    function speak(text) {
      if (!synth) { showTip('Speech is not supported in this browser.'); return; }
      stopSpeak();
      utter = new SpeechSynthesisUtterance(text);
      const v = pickVoice(); if (v) utter.voice = v;
      utter.rate = .98; utter.pitch = 1; utter.lang = (v && v.lang) || 'en-IN';
      utter.onend = stopSpeak; utter.onerror = stopSpeak;
      speaking = true;
      btnSpeak.classList.add('is-active');
      dock.classList.add('is-talking');
      label.textContent = 'Reading this page…';
      synth.speak(utter);
    }

    btnSpeak.addEventListener('click', () => speaking ? stopSpeak() : speak(pageText()));
    if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = pickVoice;
    window.addEventListener('beforeunload', () => synth && synth.cancel());
    window.aeonSpeak = speak;

    // Mic: voice commands to navigate
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    let rec = null, listening = false;
    const routes = [
      [/home|start|main page/, 'index.html'], [/history/, 'history.html'], [/founder/, 'founder.html'],
      [/managing director|chairman/, 'chairman.html'], [/committee/, 'committees.html'], [/board|director/, 'board.html'],
      [/financ|report|otp/, 'financials.html'], [/office|address|contact|location/, 'offices.html'], [/news|media|press/, 'news.html'],
      [/product|catalog/, 'products.html']
    ];
    function handleCommand(txt) {
      const t = txt.toLowerCase();
      showTip('Heard: “' + txt + '”');
      if (/stop|quiet|silence/.test(t)) { stopSpeak(); return; }
      if (/read|speak|listen|tell me/.test(t) && !/go|open|show|take/.test(t)) { speak(pageText()); return; }
      if (/shop|store|buy/.test(t)) { window.open(SHOP, '_blank'); return; }
      for (const p of PRODUCTS) { if (t.includes(p.name.toLowerCase().split(' ')[0]) && /open|go|show|buy/.test(t)) { window.open(SHOP + '?category=' + p.slug, '_blank'); return; } }
      for (const [re, href] of routes) { if (re.test(t)) { if (page !== href) { showTip('Opening ' + href.replace('.html', '') + '…'); setTimeout(() => location.href = href, 500); } return; } }
      if (/scroll down|next/.test(t)) { window.scrollBy({ top: window.innerHeight * .8, behavior: 'smooth' }); return; }
      if (/scroll up|top/.test(t)) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      showTip('Try: “open products”, “go to history”, “read this page”, “stop”.', 4500);
    }
    function stopMic() { listening = false; btnMic.classList.remove('is-active'); dock.classList.remove('is-listening'); label.textContent = ''; try { rec && rec.stop(); } catch (e) {} }
    btnMic.addEventListener('click', () => {
      if (!SR) { showTip('Voice commands need Chrome or Edge. Try the speaker button to listen instead.', 4500); return; }
      if (listening) { stopMic(); return; }
      stopSpeak();
      rec = new SR(); rec.lang = 'en-IN'; rec.interimResults = false; rec.maxAlternatives = 1;
      rec.onresult = e => handleCommand(e.results[0][0].transcript);
      rec.onerror = e => { showTip(e.error === 'not-allowed' ? 'Microphone permission was blocked.' : 'Could not hear you. Please try again.'); stopMic(); };
      rec.onend = stopMic;
      listening = true; btnMic.classList.add('is-active'); dock.classList.add('is-listening'); label.textContent = 'Listening… say a page name';
      showTip('Say: “open products”, “go to financials”, “read this page”, or “stop”.', 5000);
      try { rec.start(); } catch (e) { stopMic(); }
    });
  }
})();
