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

    // Everything outside the header is made inert while the menu is open,
    // so screen readers and the keyboard stay inside the menu.
    var background = document.querySelectorAll('.skip-link, main, .site-footer');

    function isOpen() {
      return root.classList.contains('nav-open');
    }

    function setOpen(open) {
      root.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      background.forEach(function (el) {
        el.toggleAttribute('inert', open);
      });
    }

    function close(returnFocus) {
      if (!isOpen()) return;
      setOpen(false);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen()) return;
      if (event.key === 'Escape') {
        close(true);
        return;
      }
      // Keep Tab cycling between the menu button and the menu links. Focus is moved
      // explicitly so this also works in Safari, which skips links on Tab by default.
      if (event.key === 'Tab') {
        var items = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll('a[href]')));
        var index = items.indexOf(document.activeElement);
        var step = event.shiftKey ? -1 : 1;
        event.preventDefault();
        items[(index + step + items.length) % items.length].focus();
      }
    });

    // Tapping the scrim or anywhere outside the menu closes it.
    document.addEventListener('click', function (event) {
      if (isOpen() && !menu.contains(event.target) && !toggle.contains(event.target)) close(false);
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) close(false);
    });

    // Rotating or resizing into the desktop layout resets the menu.
    desktopNav.addEventListener('change', function () {
      close(false);
    });
  }

  /* Mark the current page in the navigation. Handles /platform and /platform.html. */
  function pageName(path) {
    var name = path.split('/').pop().replace(/\.html$/, '');
    return name === '' ? 'index' : name;
  }

  function initActiveNav() {
    var page = pageName(window.location.pathname);
    document.querySelectorAll('.site-nav a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href.charAt(0) === '#' || href.indexOf('#') > 0) return;
      if (pageName(href) === page) link.setAttribute('aria-current', 'page');
    });
  }

  /* Demo request buttons */
  var tallyLoading = null;

  // Analytics for demo requests. One dataLayer event per confirmed submission,
  // reported only through Tally's documented onSubmit callback. Tally calls it
  // after a successful submission in the popup, never on open, click, or load.
  // Keep this the only submission hook. Do not also listen for the
  // Tally.FormSubmitted message or turn on Tally's formEventsForwarding option,
  // since either would record each lead twice.
  //
  // Submissions made on tally.so itself, through DEMO_FALLBACK_URL, happen on
  // Tally's domain and never reach this page's dataLayer. Complete attribution
  // for those needs a Tally-side integration or webhook.
  var reportedSubmissions = {};

  function onDemoSubmitted(payload) {
    // Tally gives each response an id. Guard against the same response being reported twice.
    var responseId = payload && payload.id;
    if (responseId) {
      if (reportedSubmissions[responseId]) return;
      reportedSubmissions[responseId] = true;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pactura_demo_submitted'
    });
  }

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
          window.Tally.openPopup(DEMO_FORM_ID, {
            layout: 'modal',
            width: 640,
            overlay: true,
            onSubmit: onDemoSubmitted
          });
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
