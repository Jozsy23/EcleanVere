(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var backdrop = document.getElementById("nav-backdrop");
  var menu = document.getElementById("nav-menu");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function syncMenuAria() {
    if (!menu) return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      menu.removeAttribute("aria-hidden");
    } else {
      menu.setAttribute("aria-hidden", nav.classList.contains("is-open") ? "false" : "true");
    }
  }

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
    if (backdrop) {
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
    syncMenuAria();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setNavOpen(false);
      });
    }

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
          setNavOpen(false);
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setNavOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setNavOpen(false);
      }
      syncMenuAria();
    });

    syncMenuAria();
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = String(fd.get("name") || "").trim();
      var email = String(fd.get("email") || "").trim();
      var message = String(fd.get("message") || "").trim();
      var to = "hello@example.com";
      var subject = encodeURIComponent("Contact de la " + (name || "site"));
      var body = encodeURIComponent(
        [message, "", "—", "Nume: " + name, "E-mail: " + email].join("\n")
      );
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });
  }

  var servicesCarousel = document.querySelector("[data-services-carousel]");
  if (servicesCarousel) {
    var servicesTrack = servicesCarousel.querySelector("[data-services-track]");
    var prevBtn = servicesCarousel.querySelector("[data-services-prev]");
    var nextBtn = servicesCarousel.querySelector("[data-services-next]");

    function isDesktopServices() {
      return window.matchMedia("(min-width: 1024px)").matches;
    }

    function getScrollStep() {
      if (!servicesTrack) return 0;
      var firstCard = servicesTrack.querySelector(".feature-card");
      if (!firstCard) return servicesTrack.clientWidth;
      var cardWidth = firstCard.getBoundingClientRect().width;
      var styles = window.getComputedStyle(servicesTrack);
      var gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      return cardWidth + gap;
    }

    function syncServicesButtons() {
      if (!servicesTrack || !prevBtn || !nextBtn) return;
      if (!isDesktopServices()) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
      }
      var maxScroll = servicesTrack.scrollWidth - servicesTrack.clientWidth;
      prevBtn.disabled = servicesTrack.scrollLeft <= 2;
      nextBtn.disabled = servicesTrack.scrollLeft >= maxScroll - 2;
    }

    if (prevBtn && nextBtn && servicesTrack) {
      prevBtn.addEventListener("click", function () {
        servicesTrack.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
      });

      nextBtn.addEventListener("click", function () {
        servicesTrack.scrollBy({ left: getScrollStep(), behavior: "smooth" });
      });

      servicesTrack.addEventListener("scroll", syncServicesButtons);
      window.addEventListener("resize", syncServicesButtons);
      syncServicesButtons();
    }
  }
})();
