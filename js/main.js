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
})();
