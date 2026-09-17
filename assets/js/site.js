/* =====================================================================
   AEON CEREALS — site engine (Reliance-style build)
   Header/footer injection, preloader, smooth scroll, scroll reveals,
   vertical timeline, business tabs, hero video, voice dock.
   ===================================================================== */
(function () {
  'use strict';

  const SHOP = 'https://4knatural.peculiex.com/products';
  const PRODUCTS = [
    { name: 'Dhoop & Agarbatti', slug: 'dhoop-agarbatti' },
    { name: 'Dry Fruits', slug: 'dry-fruits' },
    { name: 'Wellness & Supplements', slug: 'wellness-supplements' },
    { name: 'Mukhwas', slug: 'mukhwas' },
    { name: 'Oils', slug: 'oils' },
    { name: 'Ghee', slug: 'ghee' },
    { name: 'Pulses & Rice', slug: 'pulses-rice' },
    { name: 'Snacks', slug: 'snacks', soon: true },
    { name: 'Spices', slug: 'spices' },
    { name: 'Tea and Herbal Tea', slug: 'tea-herbal' },
    { name: 'Organic Products', slug: 'organic-products' }
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
  const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';

  /* Gold flame-and-grain mark, in the spirit of a corporate seal */
  const logo = `
    <svg class="brand__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#D2AB67"/>
      <path d="M32 12c0 9-12 12-12 22a12 12 0 0 0 24 0c0-6-4-9-6-13-1 5-3 6-3 9 0-7-3-13-3-18Z" fill="#fff"/>
      <path d="M44 40c4-1 8-4 9-9-4 1-7 3-9 9Z" fill="#fff" opacity=".85"/>
    </svg>`;

  /* ---------- Header ---------- */
  function buildHeader() {
    const aboutLinks = ABOUT.map(a => `<a href="${a.href}"><span>${a.name}</span><small>${a.tag}</small></a>`).join('');
    const prodLinks = PRODUCTS.map(p => `<a href="${SHOP}?category=${p.slug}" target="_blank" rel="noopener"><span>${p.name}</span>${p.soon ? '<small>Coming soon</small>' : extIcon}</a>`).join('');

    const isAbout = ['history.html', 'founder.html', 'chairman.html', 'board.html', 'committees.html'].includes(page);
    const act = h => page === h ? ' class="is-active"' : '';

    document.body.insertAdjacentHTML('afterbegin', `
    <div class="topbar" id="topbar">
      <div class="container--wide">
        <div class="topbar__stats">
          <span>FSSAI <b>13322001000902</b></span>
          <span>CIN <b>U74899DL1995PLC072664</b></span>
          <span>ISO <b>9001:2015 &amp; 22000</b><i>&#9650;</i></span>
        </div>
        <div class="topbar__links">
          <a href="offices.html">Contact Us</a>
          <a href="${SHOP}" target="_blank" rel="noopener">Shop 4K Natural</a>
        </div>
      </div>
    </div>
    <header class="header" id="header">
      <div class="container--wide">
        <a class="brand" href="index.html" aria-label="Aeon Cereals Limited home">${logo}<span class="brand__name">Aeon Cereals<small>Limited &middot; Purity is Life</small></span></a>
        <nav aria-label="Primary">
          <ul class="nav">
            <li class="has-drop${isAbout ? ' is-active' : ''}"><button type="button" aria-haspopup="true">About ${chev}</button>
              <div class="dropdown">${aboutLinks}</div></li>
            <li class="has-drop${page === 'products.html' ? ' is-active' : ''}"><button type="button" aria-haspopup="true">Products ${chev}</button>
              <div class="dropdown dropdown--wide"><div class="dropdown__head">4K Natural range &middot; opens the store</div>${prodLinks}<a href="products.html" style="grid-column:1/-1;background:var(--cream)"><span>View product overview</span><small>On this site</small></a></div></li>
            <li${act('board.html')}><a href="board.html">Board of Directors</a></li>
            <li${act('financials.html')}><a href="financials.html">Financials</a></li>
            <li${act('offices.html')}><a href="offices.html">Registered Offices</a></li>
            <li${act('news.html')}><a href="news.html">News &amp; Media</a></li>
          </ul>
        </nav>
        <div class="header__cta">
          <a class="btn" href="${SHOP}" target="_blank" rel="noopener">Shop 4K Natural</a>
          <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      <ul>
        <li><button type="button">About <span>+</span></button><div class="sub">${ABOUT.map(a => `<a href="${a.href}">${a.name}</a>`).join('')}</div></li>
        <li><button type="button">Products <span>+</span></button><div class="sub">${PRODUCTS.map(p => `<a href="${SHOP}?category=${p.slug}" target="_blank" rel="noopener">${p.name}${p.soon ? '<small>Coming soon</small>' : '<small>&#8599;</small>'}</a>`).join('')}<a href="products.html">Product overview</a></div></li>
        <li><a href="board.html">Board of Directors</a></li>
        <li><a href="financials.html">Financials</a></li>
        <li><a href="offices.html">Registered Offices</a></li>
        <li><a href="news.html">News &amp; Media</a></li>
        <li><a href="${SHOP}" target="_blank" rel="noopener">Shop 4K Natural</a></li>
      </ul>
      <p class="mobile-menu__foot">Aeon Cereals Limited &middot; Shop No. 18, CSC-6, Sector 9, Rohini, New Delhi 110085</p>
    </div>`);
  }

  /* ---------- Footer ---------- */
  function buildFooter() {
    document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <a class="brand" href="index.html">${logo}<span class="brand__name">Aeon Cereals<small>Limited &middot; Est. 1995</small></span></a>
            <p>A public limited company incorporated in New Delhi in 1995, and the house behind the 4K Natural range of dry fruits, spices, pulses, oils, ghee and organic staples.</p>
            <p style="margin-top:13px">CIN: U74899DL1995PLC072664<br>FSSAI: 13322001000902</p>
          </div>
          <div><h4>About</h4><ul>${ABOUT.map(a => `<li><a href="${a.href}">${a.name}</a></li>`).join('')}</ul></div>
          <div><h4>Company</h4><ul>
            <li><a href="products.html">Products</a></li>
            <li><a href="financials.html">Financials</a></li>
            <li><a href="offices.html">Registered Offices</a></li>
            <li><a href="news.html">News &amp; Media</a></li>
            <li><a href="${SHOP}" target="_blank" rel="noopener">4K Natural Store</a></li>
          </ul></div>
          <div><h4>Contact</h4><ul>
            <li>Shop No. 18, CSC-6, Sector 9,<br>Rohini, New Delhi 110085</li>
            <li><a href="mailto:info@aeoncereals.com">info@aeoncereals.com</a></li>
            <li><a href="tel:+919560969531">+91 95609 69531</a></li>
          </ul></div>
        </div>
        <div class="footer__bottom">
          <span>&copy; ${new Date().getFullYear()} Aeon Cereals Limited. All rights reserved.</span>
          <span>Registrar of Companies, Delhi &middot; Public Limited Company</span>
        </div>
      </div>
    </footer>
    <div class="voice-dock" id="voiceDock" role="group" aria-label="Voice controls">
      <button class="voice-btn" id="btnSpeak" aria-label="Listen to this page" title="Listen to this page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>
      </button>
      <button class="voice-btn" id="btnMic" aria-label="Voice command" title="Say: open products, go to history, read page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg>
      </button>
      <div class="voice-bars"><i></i><i></i><i></i><i></i></div>
      <span class="voice-dock__label" id="voiceLabel"></span>
    </div>
    <div class="voice-tip" id="voiceTip"></div>
    <div class="modal" id="modal" aria-hidden="true"><div class="modal__box"><button class="modal__close" id="modalClose" aria-label="Close">&times;</button><div id="modalContent"></div></div></div>
    <div class="cursor" id="cursor"><div class="cursor__ring"></div><div class="cursor__dot"></div></div>`);
  }

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
    initHeroVideo();
    initBizTabs();

    const start = () => {
      initSmoothScroll();
      initReveals();
      initCounters();
      initParallax();
      initTimeline();
      initHeroIntro();
      document.dispatchEvent(new CustomEvent('aeon:ready'));
    };

    if (pre && hasGSAP) {
      let done = false;
      const finish = () => { pre.el.remove(); pre.curtain.remove(); sessionStorage.setItem('aeon-loaded', '1'); };
      const guard = setTimeout(() => { if (!done) { done = true; tl.kill(); finish(); start(); } }, 4500);
      const tl = gsap.timeline({ onComplete: () => { clearTimeout(guard); finish(); } });
      const count = { v: 0 };
      tl.to('.preloader__logo span', { y: 0, duration: .9, ease: 'expo.out' })
        .to(count, {
          v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => {
            pre.el.querySelector('.preloader__count').textContent = String(Math.round(count.v)).padStart(3, '0');
            pre.el.querySelector('.preloader__bar i').style.width = count.v + '%';
          }
        }, '<')
        .to('.preloader__logo span', { y: '-110%', duration: .55, ease: 'expo.in' }, '+=.1')
        .to(pre.curtain, { scaleY: 1, duration: .55, ease: 'expo.inOut' }, '<.1')
        .set(pre.el, { autoAlpha: 0 })
        .add(() => { if (!done) { done = true; start(); } })
        .to(pre.curtain, { scaleY: 0, transformOrigin: 'bottom', duration: .75, ease: 'expo.inOut' });
    } else {
      if (pre) { pre.el.remove(); pre.curtain.remove(); }
      start();
    }
  });

  /* ---------- Header behaviour ---------- */
  function initHeader() {
    const header = document.getElementById('header');
    const topbar = document.getElementById('topbar');
    if (document.body.dataset.header === 'light') header.classList.add('is-light');
    const apply = y => {
      const on = y > 40;
      header.classList.toggle('is-scrolled', on);
      topbar.classList.toggle('is-solid', on);
    };
    apply(window.scrollY);
    window.addEventListener('scroll', () => apply(window.scrollY), { passive: true });
    window.__aeonHeaderScroll = apply;

    document.querySelectorAll('.nav .has-drop > button').forEach(btn => {
      btn.addEventListener('click', e => {
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
      document.getElementById('header').classList.toggle('is-scrolled', open || window.scrollY > 40);
      if (window.lenis) open ? window.lenis.stop() : window.lenis.start();
    });
    menu.querySelectorAll('li > button').forEach(b => b.addEventListener('click', () => {
      b.parentElement.classList.toggle('is-open');
      b.querySelector('span').textContent = b.parentElement.classList.contains('is-open') ? '–' : '+';
    }));
  }

  /* ---------- Hero video ---------- */
  function initHeroVideo() {
    const v = document.querySelector('.hero__media video');
    if (!v) return;
    v.muted = true; v.loop = true; v.playsInline = true;
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    // Mobile browsers may refuse autoplay until the page is loaded or touched
    ['loadeddata', 'canplay'].forEach(ev => v.addEventListener(ev, tryPlay));
    ['click', 'touchstart', 'scroll'].forEach(ev => document.addEventListener(ev, tryPlay, { once: true, passive: true }));
    // Pause when the hero leaves the viewport so it costs nothing further down the page
    new IntersectionObserver(en => { en[0].isIntersecting ? tryPlay() : v.pause(); }, { threshold: .05 })
      .observe(v.closest('.hero'));

    const mute = document.getElementById('heroMute');
    if (!mute) return;
    const iconOff = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m17 9 4 6M21 9l-4 6"/></svg>';
    const iconOn = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>';
    mute.innerHTML = iconOff;
    mute.addEventListener('click', () => {
      v.muted = !v.muted;
      mute.innerHTML = v.muted ? iconOff : iconOn;
      mute.setAttribute('aria-label', v.muted ? 'Unmute video' : 'Mute video');
      if (!v.muted) tryPlay();
    });
  }

  /* ---------- Business tabs ---------- */
  function initBizTabs() {
    const biz = document.querySelector('.biz');
    if (!biz) return;
    const buttons = [...biz.querySelectorAll('.biz__list button')];
    const imgs = [...biz.querySelectorAll('.biz__bg img')];
    const copy = biz.querySelector('.biz__copy');
    let idx = 0, timer = null;

    const show = i => {
      idx = i;
      buttons.forEach((b, k) => b.parentElement.classList.toggle('is-active', k === i));
      imgs.forEach((im, k) => im.classList.toggle('is-active', k === i));
      const d = buttons[i].dataset;
      copy.innerHTML = `<span class="eyebrow">Our businesses</span><h3>${d.title}</h3><p>${d.text}</p>` +
        (d.link ? `<a class="link-arrow mt-2" href="${d.link}"${d.link.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>Explore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>` : '');
      if (typeof gsap !== 'undefined') gsap.fromTo(copy.children, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .07, ease: 'expo.out' });
    };
    const cycle = () => { timer = setInterval(() => show((idx + 1) % buttons.length), 6000); };
    const reset = () => { clearInterval(timer); cycle(); };

    buttons.forEach((b, i) => b.addEventListener('click', () => { show(i); reset(); }));
    show(0); cycle();
    biz.addEventListener('mouseenter', () => clearInterval(timer));
    biz.addEventListener('mouseleave', cycle);
  }

  /* ---------- Smooth scroll ---------- */
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', e => { if (window.__aeonHeaderScroll) window.__aeonHeaderScroll(e.scroll); });
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
      left: { x: -110, opacity: 0 },
      right: { x: 110, opacity: 0 },
      up: { y: 64, opacity: 0 },
      down: { y: -64, opacity: 0 },
      scale: { scale: .9, opacity: 0 },
      fade: { opacity: 0 },
      flip: { rotateX: -26, y: 40, opacity: 0, transformPerspective: 900 }
    };
    document.querySelectorAll('[data-reveal]').forEach(el => {
      const from = map[el.dataset.reveal] || map.up;
      gsap.fromTo(el, { ...from }, {
        x: 0, y: 0, opacity: 1, scale: 1, rotateX: 0,
        duration: 1.25, delay: parseFloat(el.dataset.delay || 0), ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });
    document.querySelectorAll('[data-stagger]').forEach(group => {
      const from = map[group.dataset.stagger] || map.up;
      gsap.fromTo(group.children, { ...from }, {
        x: 0, y: 0, opacity: 1, scale: 1, rotateX: 0,
        duration: 1.1, ease: 'expo.out', stagger: .11,
        scrollTrigger: { trigger: group, start: 'top 86%', toggleActions: 'play none none reverse' }
      });
    });
    document.querySelectorAll('.frame[data-clip]').forEach(fr => {
      const clips = { left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)', up: 'inset(100% 0 0 0)', down: 'inset(0 0 100% 0)' };
      gsap.fromTo(fr, { clipPath: clips[fr.dataset.clip] || clips.left }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'expo.inOut',
        scrollTrigger: { trigger: fr, start: 'top 86%' }
      });
      const img = fr.querySelector('img');
      if (img) gsap.fromTo(img, { scale: 1.28 }, { scale: 1.01, duration: 1.7, ease: 'expo.out', scrollTrigger: { trigger: fr, start: 'top 86%' } });
    });
    document.querySelectorAll('[data-split]').forEach(h => {
      const words = h.textContent.trim().split(/\s+/);
      h.setAttribute('aria-label', words.join(' '));
      h.innerHTML = words.map(w => `<span class="w" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em"><span style="display:inline-block">${w}</span></span>`).join(' ');
      gsap.fromTo(h.querySelectorAll('.w > span'), { y: '110%' }, {
        y: 0, duration: 1.1, ease: 'expo.out', stagger: .045,
        scrollTrigger: { trigger: h, start: 'top 88%' }
      });
    });
    document.querySelectorAll('.rule').forEach(r => {
      gsap.fromTo(r, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: r, start: 'top 92%' } });
    });
    ScrollTrigger.refresh();
  }

  /* ---------- Hero intro ---------- */
  function initHeroIntro() {
    const h1 = document.querySelector('.hero h1');
    if (!h1 || typeof gsap === 'undefined') return;
    const words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', words.join(' '));
    h1.innerHTML = words.map(w => `<span class="word"><span>${w}</span></span>`).join(' ');
    gsap.timeline({ delay: .15 })
      .to('.hero h1 .word span', { y: 0, duration: 1.3, ease: 'expo.out', stagger: .075 })
      .to('.hero__rule', { width: 108, duration: 1, ease: 'expo.out' }, '-=.75')
      .to('.hero .lead', { opacity: 1, y: 0, duration: .95, ease: 'expo.out' }, '-=.8')
      .fromTo('.hero__actions', { y: 18 }, { opacity: 1, y: 0, duration: .95, ease: 'expo.out' }, '-=.75');
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.hero__content', { y: -90, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__media', { scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
  }

  /* ---------- Parallax ---------- */
  function initParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    document.querySelectorAll('.page-hero__img').forEach(img => {
      gsap.to(img, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top top', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('.page-hero .container').forEach(c => {
      gsap.to(c, { y: -60, opacity: 0, ease: 'none', scrollTrigger: { trigger: c.parentElement, start: '45% top', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const amt = parseFloat(el.dataset.parallax) || 50;
      gsap.fromTo(el, { y: amt }, { y: -amt, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('.frame:not([data-clip]) img').forEach(img => {
      gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ---------- Vertical timeline (history) ---------- */
  function initTimeline() {
    const tl = document.querySelector('.tl');
    if (!tl || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const fill = tl.querySelector('.tl__spine i');
    if (fill) {
      gsap.fromTo(fill, { height: '0%' }, {
        height: '100%', ease: 'none',
        scrollTrigger: { trigger: tl, start: 'top 55%', end: 'bottom 75%', scrub: .6 }
      });
    }

    tl.querySelectorAll('.tl-row').forEach((row, i) => {
      const media = row.querySelector('.tl-row__media');
      const body = row.querySelector('.tl-row__body');
      const dot = row.querySelector('.tl-row__dot b');
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      // Odd rows: media enters from the left, copy from the right. Even rows mirror it.
      const even = i % 2 === 1;
      const mediaX = mobile ? 40 : (even ? 130 : -130);
      const bodyX = mobile ? 40 : (even ? -130 : 130);

      const t = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none reverse' } });
      if (dot) t.fromTo(dot, { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.8)' });
      if (media) t.fromTo(media, { x: mediaX, opacity: 0 }, { x: 0, opacity: 1, duration: 1.25, ease: 'expo.out' }, '-=.45');
      if (body) t.fromTo(body, { x: bodyX, opacity: 0 }, { x: 0, opacity: 1, duration: 1.25, ease: 'expo.out' }, '<.1');
    });
    ScrollTrigger.refresh();
  }

  /* ---------- Counters ---------- */
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dec = (el.dataset.count.split('.')[1] || '').length;
      const run = () => {
        if (typeof gsap === 'undefined') { el.textContent = target + suffix; return; }
        const obj = { v: 0 };
        gsap.to(obj, { v: target, duration: 2, ease: 'expo.out', onUpdate: () => el.textContent = obj.v.toFixed(dec) + suffix });
      };
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: run });
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
    document.addEventListener('mouseover', e => c.classList.toggle('is-hover', !!e.target.closest('a,button,input')));
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
      const parts = [];
      if (main.dataset.speech) parts.push(main.dataset.speech);
      main.querySelectorAll('[data-speak], h1, h2, .lead, .split__body p, .leader__body p, .card p, .director__body p, .tl-row__body p, .news-item p, .acc__inner p, .quote p, .fin-step > p').forEach(el => {
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
      speaking = false; btnSpeak.classList.remove('is-active'); dock.classList.remove('is-talking'); label.textContent = '';
    }
    function speak(text) {
      if (!synth) { showTip('Speech is not supported in this browser.'); return; }
      stopSpeak();
      utter = new SpeechSynthesisUtterance(text);
      const v = pickVoice(); if (v) utter.voice = v;
      utter.rate = .98; utter.lang = (v && v.lang) || 'en-IN';
      utter.onend = stopSpeak; utter.onerror = stopSpeak;
      speaking = true; btnSpeak.classList.add('is-active'); dock.classList.add('is-talking'); label.textContent = 'Reading this page';
      synth.speak(utter);
    }
    btnSpeak.addEventListener('click', () => speaking ? stopSpeak() : speak(pageText()));
    if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = pickVoice;
    window.addEventListener('beforeunload', () => synth && synth.cancel());
    window.aeonSpeak = speak;

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
      showTip('Heard: "' + txt + '"');
      if (/stop|quiet|silence/.test(t)) { stopSpeak(); return; }
      if (/read|speak|listen|tell me/.test(t) && !/go|open|show|take/.test(t)) { speak(pageText()); return; }
      if (/shop|store|buy/.test(t)) { window.open(SHOP, '_blank'); return; }
      for (const p of PRODUCTS) { if (t.includes(p.name.toLowerCase().split(' ')[0]) && /open|go|show|buy/.test(t)) { window.open(SHOP + '?category=' + p.slug, '_blank'); return; } }
      for (const [re, href] of routes) { if (re.test(t)) { if (page !== href) { showTip('Opening ' + href.replace('.html', '')); setTimeout(() => location.href = href, 500); } return; } }
      if (/scroll down|next/.test(t)) { window.scrollBy({ top: window.innerHeight * .8, behavior: 'smooth' }); return; }
      if (/scroll up|top/.test(t)) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      showTip('Try: "open products", "go to history", "read this page", "stop".', 4500);
    }
    function stopMic() { listening = false; btnMic.classList.remove('is-active'); dock.classList.remove('is-listening'); label.textContent = ''; try { rec && rec.stop(); } catch (e) {} }
    btnMic.addEventListener('click', () => {
      if (!SR) { showTip('Voice commands need Chrome or Edge. Use the speaker button to listen instead.', 4500); return; }
      if (listening) { stopMic(); return; }
      stopSpeak();
      rec = new SR(); rec.lang = 'en-IN'; rec.interimResults = false; rec.maxAlternatives = 1;
      rec.onresult = e => handleCommand(e.results[0][0].transcript);
      rec.onerror = e => { showTip(e.error === 'not-allowed' ? 'Microphone permission was blocked.' : 'Could not hear you. Please try again.'); stopMic(); };
      rec.onend = stopMic;
      listening = true; btnMic.classList.add('is-active'); dock.classList.add('is-listening'); label.textContent = 'Listening';
      showTip('Say: "open products", "go to financials", "read this page", or "stop".', 5000);
      try { rec.start(); } catch (e) { stopMic(); }
    });
  }
})();
