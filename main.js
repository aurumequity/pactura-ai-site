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

  /* Cookie consent (Google Consent Mode v2)
     Defaults are set inline in each page's <head> before Google Tag Manager
     loads. All four signals start denied, and a saved choice is restored there.
     This banner only records the visitor's choice and sends a consent update.
     Choices are stored in localStorage under CONSENT_KEY. If the format
     changes, bump CONSENT_VERSION here and in the inline head script. */
  var CONSENT_KEY = 'pactura-consent';
  var CONSENT_VERSION = 1;

  function readConsent() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
      return saved && saved.v === CONSENT_VERSION ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function sendConsentUpdate(choice) {
    window.dataLayer = window.dataLayer || [];
    // Consent commands must be pushed as an arguments object, the same as gtag().
    (function () { window.dataLayer.push(arguments); })('consent', 'update', {
      analytics_storage: choice.analytics ? 'granted' : 'denied',
      ad_storage: choice.ads ? 'granted' : 'denied',
      ad_user_data: choice.ads ? 'granted' : 'denied',
      ad_personalization: choice.ads ? 'granted' : 'denied'
    });
  }

  // When consent is withdrawn, remove cookies that were set while it was granted.
  function clearCookies(prefixes) {
    var host = window.location.hostname;
    var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
    document.cookie.split(';').forEach(function (entry) {
      var name = entry.split('=')[0].trim();
      if (!prefixes.some(function (p) { return name.indexOf(p) === 0; })) return;
      domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  function initConsent() {
    var previous = readConsent();
    var returnFocusTo = null;

    var banner = document.createElement('section');
    banner.className = 'consent';
    banner.id = 'consent';
    banner.setAttribute('aria-labelledby', 'consent-title');
    banner.hidden = true;
    banner.innerHTML =
      '<div class="container consent__inner">' +
        '<div class="consent__text">' +
          '<p class="consent__title" id="consent-title">Cookie preferences</p>' +
          '<p>Optional analytics and advertising cookies stay off unless you allow them. <a class="inline-link" href="/privacy.html">Privacy policy</a></p>' +
        '</div>' +
        '<fieldset class="consent__options" id="consent-options" hidden>' +
          '<legend class="visually-hidden">Optional cookies</legend>' +
          '<label class="consent__option"><input type="checkbox" name="analytics"> <span><strong>Analytics</strong> Helps us understand which pages are useful.</span></label>' +
          '<label class="consent__option"><input type="checkbox" name="ads"> <span><strong>Advertising measurement</strong> Helps us measure whether our ads work, if we run them.</span></label>' +
        '</fieldset>' +
        '<div class="consent__actions">' +
          '<button type="button" class="btn btn--ghost btn--sm" data-choice="reject">Reject optional</button>' +
          '<button type="button" class="btn btn--ghost btn--sm" data-choice="accept">Accept all</button>' +
          '<button type="button" class="btn btn--ghost btn--sm" data-choice="customize" aria-expanded="false" aria-controls="consent-options">Choose settings</button>' +
          '<button type="button" class="btn btn--primary btn--sm" data-choice="save" hidden>Save choices</button>' +
        '</div>' +
      '</div>';

    // First in keyboard order after the skip link, although it is shown at the bottom.
    var skip = document.querySelector('.skip-link');
    if (skip) skip.insertAdjacentElement('afterend', banner);
    else document.body.insertBefore(banner, document.body.firstChild);

    var options = banner.querySelector('#consent-options');
    var customize = banner.querySelector('[data-choice="customize"]');
    var save = banner.querySelector('[data-choice="save"]');
    var boxes = { analytics: options.querySelector('[name="analytics"]'), ads: options.querySelector('[name="ads"]') };

    // Keep page content clear of the fixed banner.
    function reserveSpace() {
      document.body.style.setProperty('--consent-space', banner.hidden ? '0px' : banner.offsetHeight + 'px');
    }
    if ('ResizeObserver' in window) new ResizeObserver(reserveSpace).observe(banner);

    function showOptions(show) {
      options.hidden = !show;
      save.hidden = !show;
      customize.hidden = show;
      customize.setAttribute('aria-expanded', String(show));
      if (show) boxes.analytics.focus();
    }

    function open(fromControl) {
      var current = readConsent();
      boxes.analytics.checked = !!(current && current.analytics);
      boxes.ads.checked = !!(current && current.ads);
      showOptions(!!fromControl);
      returnFocusTo = fromControl || null;
      banner.hidden = false;
      root.classList.add('consent-open');
      reserveSpace();
      if (fromControl) boxes.analytics.focus();
    }

    function close() {
      banner.hidden = true;
      root.classList.remove('consent-open');
      reserveSpace();
      if (returnFocusTo) {
        returnFocusTo.focus();
      } else {
        var main = document.getElementById('main');
        if (main) main.focus({ preventScroll: true });
      }
    }

    function decide(analytics, ads) {
      var before = readConsent();
      var choice = { v: CONSENT_VERSION, analytics: analytics, ads: ads, at: new Date().toISOString() };
      try {
        window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
      } catch (error) {
        // Storage unavailable (for example some private modes). The choice applies to this page only.
      }
      sendConsentUpdate(choice);
      if (before && before.analytics && !analytics) clearCookies(['_ga']);
      if (before && before.ads && !ads) clearCookies(['_gcl', '_gac']);
      close();
    }

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-choice]');
      if (!button) return;
      var action = button.getAttribute('data-choice');
      if (action === 'accept') decide(true, true);
      else if (action === 'reject') decide(false, false);
      else if (action === 'customize') showOptions(true);
      else if (action === 'save') decide(boxes.analytics.checked, boxes.ads.checked);
    });

    document.querySelectorAll('[data-consent-open]').forEach(function (control) {
      control.addEventListener('click', function () {
        open(control);
      });
    });

    if (!previous) open(null);
  }

  initNav();
  initActiveNav();
  initDemo();
  initReveal();
  initConsent();
})();
