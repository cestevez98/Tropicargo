/* Tropicargo — interacciones del sitio */
(function () {
  'use strict';

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Cotizador rápido ---------- */
  // Tarifas base orientativas (USD): tarifa fija + costo por libra.
  var RATES = {
    express:  { base: 20, perLb: 6.5 },
    aereo:    { base: 12, perLb: 4.2 },
    maritimo: { base: 8,  perLb: 1.8 }
  };
  // Multiplicador por lejanía respecto a La Habana.
  var PROV_FACTOR = {
    'La Habana': 1, 'Artemisa': 1.05, 'Mayabeque': 1.05, 'Matanzas': 1.1,
    'Villa Clara': 1.15, 'Cienfuegos': 1.15, 'Sancti Spíritus': 1.2,
    'Ciego de Ávila': 1.25, 'Camagüey': 1.3, 'Las Tunas': 1.35,
    'Holguín': 1.4, 'Granma': 1.45, 'Santiago de Cuba': 1.5,
    'Guantánamo': 1.55, 'Pinar del Río': 1.15, 'Isla de la Juventud': 1.6
  };

  var qType = document.getElementById('qType');
  var qWeight = document.getElementById('qWeight');
  var qProv = document.getElementById('qProv');
  var qPrice = document.getElementById('qPrice');

  function calcQuote() {
    if (!qType || !qWeight || !qProv || !qPrice) return;
    var rate = RATES[qType.value] || RATES.aereo;
    var lb = Math.max(1, parseFloat(qWeight.value) || 0);
    var factor = PROV_FACTOR[qProv.value] || 1.2;
    var total = (rate.base + rate.perLb * lb) * factor;
    qPrice.textContent = '$' + total.toFixed(2);
  }
  [qType, qWeight, qProv].forEach(function (el) {
    if (el) { el.addEventListener('input', calcQuote); el.addEventListener('change', calcQuote); }
  });
  calcQuote();

  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) quoteForm.addEventListener('submit', function (e) { e.preventDefault(); });

  /* ---------- Contador de estadísticas ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString('es-ES') + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll + contadores ---------- */
  // Etiqueta automáticamente los elementos a animar.
  document.querySelectorAll(
    '.section__head, .service, .ship, .step, .plan, .about__content, .about__media, .faq__item'
  ).forEach(function (el) { el.setAttribute('data-reveal', ''); });

  var revealEls = document.querySelectorAll('[data-reveal]');
  var countEls = document.querySelectorAll('.stat__num');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) {
      // Revela de inmediato lo que ya está visible al cargar (evita parpadeo above-the-fold).
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || document.documentElement.clientHeight)) el.classList.add('is-visible');
      else io.observe(el);
    });

    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    countEls.forEach(function (el) { countObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    countEls.forEach(animateCount);
  }

  /* ---------- Suscripción (demo front-end) ---------- */
  var subForm = document.getElementById('subForm');
  var subMsg = document.getElementById('subMsg');
  if (subForm) {
    subForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = subForm.querySelector('input[type="email"]');
      if (input && input.value && /\S+@\S+\.\S+/.test(input.value)) {
        if (subMsg) subMsg.textContent = '¡Gracias por formar parte de nuestra comunidad!';
        subForm.reset();
      } else if (subMsg) {
        subMsg.textContent = 'Introduce un correo válido, por favor.';
      }
    });
  }

  /* ---------- Formulario de contacto (demo front-end) ---------- */
  var contactForm = document.getElementById('contactForm');
  var contactMsg = document.getElementById('contactMsg');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        if (contactMsg) contactMsg.textContent = 'Completa los campos obligatorios (*).';
        contactForm.reportValidity();
        return;
      }
      if (contactMsg) contactMsg.textContent = '¡Gracias! Hemos recibido tu mensaje. Te contactaremos muy pronto.';
      contactForm.reset();
    });
  }
})();
