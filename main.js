/**
 * MUMMA FIRST — Main Script
 * main.js
 *
 * Responsibilities:
 *  1. Scroll-triggered reveal animations (IntersectionObserver)
 *  2. Sticky navigation with frosted-glass effect
 *  3. Immediate visibility for above-the-fold hero elements
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. SCROLL-TRIGGERED REVEAL
     Watches every .reveal element and adds the
     .visible class when it enters the viewport.
  ───────────────────────────────────────────── */

  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px', // trigger slightly before bottom edge
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ─────────────────────────────────────────────
     2. HERO & TRANSITION — IMMEDIATE VISIBILITY
     Elements above the fold are visible before
     the user has scrolled, so we trigger them
     on load with a short delay for a clean entry.
  ───────────────────────────────────────────── */

  const aboveFoldSelectors = '#hero .reveal, #transition .reveal';

  document.querySelectorAll(aboveFoldSelectors).forEach((el) => {
    setTimeout(() => el.classList.add('visible'), 100);
  });

  /* ─────────────────────────────────────────────
     3. STICKY NAVIGATION
     Adds .scrolled to <nav> after 60 px of scroll,
     which triggers the frosted-glass background.
  ───────────────────────────────────────────── */

  const nav = document.getElementById('main-nav');

  function handleNavScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Run once on load in case the page is refreshed mid-scroll
  handleNavScroll();

})();
