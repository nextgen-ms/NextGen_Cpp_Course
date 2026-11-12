/* NextGen Academy — C++ course site interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");
  var lang = doc.getAttribute("lang") === "ar" ? "ar" : "en";
  var cfg = window.NEXTGEN_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 1. Social links from config.js ---------- */
  var links = {
    whatsapp: cfg.whatsapp,
    facebook: cfg.facebook,
    telegram: cfg.telegram,
    page: cfg.academyPage
  };
  if (links.whatsapp && cfg.whatsappMessage && cfg.whatsappMessage[lang]) {
    links.whatsapp += (links.whatsapp.indexOf("?") > -1 ? "&" : "?") + "text=" + encodeURIComponent(cfg.whatsappMessage[lang]);
  }
  $$("[data-social]").forEach(function (a) {
    var url = links[a.getAttribute("data-social")];
    if (url) {
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });

  /* ---------- 2. Price ---------- */
  var priceEl = $("[data-price]");
  if (priceEl && cfg.price && cfg.price.amount) {
    var p = cfg.price;
    priceEl.innerHTML = "";
    [["amount", p.amount], ["cur", p.currency[lang]], ["per", p.per[lang]]].forEach(function (x) {
      var s = document.createElement("span");
      s.className = x[0];
      s.textContent = x[1];
      priceEl.appendChild(s);
    });
  }

  /* ---------- 3. Header: scrolled state, mobile menu, scroll-spy ---------- */
  var header = $(".site-header");
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = $(".menu-toggle");
  var nav = $("#nav-links");
  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  var spyLinks = $$('.nav-links a[href^="#"]');
  var spyMap = {};
  spyLinks.forEach(function (a) { spyMap[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && spyMap[en.target.id]) {
          spyLinks.forEach(function (l) { l.classList.remove("active"); });
          spyMap[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(spyMap).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- 4. Reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 5. Count-up numbers ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduce || isNaN(target)) { el.textContent = target; return; }
    var start = null, dur = 1100;
    function tick(t) {
      if (start === null) start = t;
      var k = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- 6. Roadmap bar → open the matching module ---------- */
  $$(".rm-group").forEach(function (g) {
    g.addEventListener("click", function () {
      var d = document.getElementById(g.getAttribute("data-target"));
      if (!d) return;
      d.open = true;
      d.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    });
  });

  /* ---------- 7. Gallery lightbox ---------- */
  var lb = $("#lightbox");
  if (lb && typeof lb.showModal === "function") {
    var lbImg = $("img", lb), lbCap = $(".lb-cap", lb);
    $$(".shot").forEach(function (b) {
      b.addEventListener("click", function () {
        var img = $("img", b);
        lbImg.src = b.getAttribute("data-full") || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = b.getAttribute("data-caption") || "";
        lb.showModal();
      });
    });
    $(".lb-close", lb).addEventListener("click", function () { lb.close(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  /* ---------- 8. Language switch keeps the current section ---------- */
  $$("[data-lang-switch]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (location.hash) a.setAttribute("href", a.getAttribute("href").split("#")[0] + location.hash);
    });
  });

  /* ---------- 9. Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
