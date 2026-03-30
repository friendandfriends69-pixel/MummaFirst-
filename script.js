/* ============================================================
   MUMMA FIRST — script.js
   Minimal, clean interactions
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV: scroll behaviour ── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  /* ── HAMBURGER / MOBILE MENU ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  hamburger.addEventListener('click', () => {
    menuOpen ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });


  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── BAR CHART ANIMATION ── */
  // Animate bars when results section enters view
  const barFills = document.querySelectorAll('.bar__fill');

  // Initially collapse bars to 0
  barFills.forEach(fill => {
    fill.style.height = '0%';
  });

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          barFills.forEach(fill => {
            const targetH = fill.style.getPropertyValue('--h') || fill.getAttribute('style').match(/--h:\s*(\d+%)/)?.[1];
            setTimeout(() => {
              fill.style.height = targetH;
            }, 200);
          });
          barObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const resultsSection = document.getElementById('results');
  if (resultsSection) barObserver.observe(resultsSection);


  /* ── SMOOTH SCROLL OVERRIDE ── */
  // Offset scroll for fixed nav height
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navH = navbar.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });


  /* ── SUBTLE PARALLAX: hero image ── */
  const heroImgWrap = document.querySelector('.hero__img-wrap');

  if (heroImgWrap && window.matchMedia('(min-width: 769px)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const speed = 0.15;
      heroImgWrap.style.transform = `translateY(${scrolled * speed}px)`;
    }, { passive: true });
  }


  /* ── FEATURE CARD: stagger on hover reset ── */
  // Cards already handled via CSS :hover — nothing extra needed.


  /* ── CURSOR GLOW (subtle, desktop only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      z-index: 0;
      transition: left 0.6s ease, top 0.6s ease;
      will-change: left, top;
    `;
    document.body.appendChild(glow);

    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
    }, { passive: true });

    // Throttle updates
    let glowRaf;
    function moveGlow() {
      glow.style.left = lastX + 'px';
      glow.style.top  = lastY + 'px';
      glowRaf = requestAnimationFrame(moveGlow);
    }
    glowRaf = requestAnimationFrame(moveGlow);
  }


  /* ── IMAGES: graceful fallback colour ── */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      // If image fails to load, show a beautiful gradient placeholder
      this.style.opacity = '0';
      const parent = this.parentElement;
      if (parent) {
        parent.style.background = 'linear-gradient(145deg, #F5E6DA 0%, #EBCBCB 100%)';
      }
    });
  });

})();
