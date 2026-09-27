/* Pactura.ai shared site behavior. No dependencies. Loaded with `defer` on every page. */
(function () {
  'use strict';

  // Demo requests. The only place the form destination is configured.
  // Any element with [data-demo] opens the Tally popup, and falls back to the
  // hosted form URL if the Tally script is unavailable.
  var DEMO_FORM_ID = 'A7Q4yz';
  var DEMO_FALLBACK_URL = 'https://tally.so/r/' + DEMO_FORM_ID;
  var TALLY_SCRIPT = 'https://tally.so/widgets/embed.js';

  var root = document.documentElement;
  var desktopNav = window.matchMedia('(min-width: 960px)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  root.classList.add('js');

  /* Mobile navigation */
  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) return;

    function setOpen(open) {
      root.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && root.classList.contains('nav-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    desktopNav.addEventListener('change', function () {
      setOpen(false);
    });
  }

  /* Mark the current page in the navigation */
  function initActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a[href]').forEach(function (link) {
      if (link.getAttribute('href') === page) link.setAttribute('aria-current', 'page');
    });
  }

  /* Demo request buttons */
  var tallyLoading = null;

  function loadTally() {
    if (window.Tally) return;
    if (tallyLoading) return;
    tallyLoading = document.createElement('script');
    tallyLoading.src = TALLY_SCRIPT;
    tallyLoading.async = true;
    tallyLoading.onerror = function () {
      tallyLoading = null;
    };
    document.head.appendChild(tallyLoading);
  }

  function initDemo() {
    var triggers = document.querySelectorAll('[data-demo]');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.setAttribute('href', DEMO_FALLBACK_URL);
      trigger.addEventListener('pointerenter', loadTally, { once: true });
      trigger.addEventListener('focus', loadTally, { once: true });

      trigger.addEventListener('click', function (event) {
        // Let modified clicks open the hosted form in a new tab.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        // Without the Tally script the link navigates to the hosted form.
        if (!window.Tally || typeof window.Tally.openPopup !== 'function') return;

        event.preventDefault();
        try {
          window.Tally.openPopup(DEMO_FORM_ID, { layout: 'modal', width: 640, overlay: true });
        } catch (error) {
          window.location.href = DEMO_FALLBACK_URL;
        }
      });
    });

    // Warm the script once the page is idle so the first click opens the popup.
    var idle = window.requestIdleCallback || function (fn) { setTimeout(fn, 2000); };
    window.addEventListener('load', function () {
      idle(loadTally);
    });
  }

  /* Restrained entrance transitions */
  function initReveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    // Content stays visible unless this runs, so a failed script never hides anything.
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    root.classList.add('reveal-ready');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  initNav();
  initActiveNav();
  initDemo();
  initReveal();
})();
