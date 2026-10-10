/* Clone interaction layer. Restores the pieces the removed remote/Astro scripts
   provided: the mega-menu panels, carousel arrows and newsletter validation. */
(function () {
  "use strict";

  /* ---------- Mega menu ---------- */
  var globalNav = document.querySelector("global-nav");
  var navBar = document.querySelector("global-nav .nav-bar");

  function panelFor(trigger) {
    var id = trigger.getAttribute("data-nav-open");
    return id ? document.getElementById(id) : null;
  }

  function closeAllPanels() {
    document.querySelectorAll("global-nav .nav-panel").forEach(function (p) {
      p.classList.remove("is-open");
      p.style.removeProperty("display");
    });
    document.querySelectorAll("global-nav [data-nav-open]").forEach(function (t) {
      t.setAttribute("aria-expanded", "false");
    });
    var bd = document.querySelector(".od-nav-backdrop");
    if (bd) bd.classList.remove("is-open");
  }

  function openPanel(trigger) {
    var panel = panelFor(trigger);
    if (!panel) return;
    var already = panel.classList.contains("is-open");
    closeAllPanels();
    if (already) return;
    panel.classList.add("is-open");
    panel.style.setProperty("display", "block", "important");
    trigger.setAttribute("aria-expanded", "true");
    var bd = document.querySelector(".od-nav-backdrop");
    if (!bd) {
      bd = document.createElement("div");
      bd.className = "od-nav-backdrop";
      document.body.appendChild(bd);
    }
    requestAnimationFrame(function () { bd.classList.add("is-open"); });
  }

  if (globalNav && navBar) {
    globalNav.setAttribute("data-enhanced", "");

    document.querySelectorAll("global-nav [data-nav-open]").forEach(function (trigger) {
      var item = trigger.closest("li") || trigger;
      var timer = null;
      item.addEventListener("mouseenter", function () {
        if (window.matchMedia("(min-width: 1200px)").matches) openPanel(trigger);
      });
      item.addEventListener("mouseleave", function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (!item.matches(":hover")) closeAllPanels();
        }, 140);
      });
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        openPanel(trigger);
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest("global-nav")) closeAllPanels();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllPanels();
    });
  }

  /* ---------- Carousels ---------- */
  function scrollContainerFor(button) {
    var section = button.closest("section, [data-container-id], div");
    while (section) {
      var track = section.querySelector(
        ".overflow-x-auto.snap-x, [class*='overflow-x-auto'][class*='snap']"
      );
      if (track) return track;
      section = section.parentElement;
    }
    return null;
  }

  document.querySelectorAll("button[aria-label]").forEach(function (btn) {
    var label = btn.getAttribute("aria-label") || "";
    if (!/previous slide|next slide|back arrow|forward arrow/i.test(label)) return;
    var fwd = /next|forward/i.test(label);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var track = scrollContainerFor(btn);
      if (!track) return;
      var amount = Math.max(320, Math.round(track.clientWidth * 0.8));
      track.scrollBy({ left: fwd ? amount : -amount, behavior: "smooth" });
    });
  });

  /* ---------- Newsletter validation ---------- */
  document.querySelectorAll("form").forEach(function (form) {
    var email = form.querySelector("input[type='email']");
    if (!email) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".od-newsletter-msg");
      if (!msg) {
        msg = document.createElement("p");
        msg.className = "od-newsletter-msg";
        form.appendChild(msg);
      }
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      msg.className = "od-newsletter-msg " + (ok ? "is-success" : "is-error");
      msg.textContent = ok
        ? "Thanks — check your inbox to confirm."
        : "Enter a valid email address.";
      if (ok) email.value = "";
    });
  });

  /* ---------- Simple search toggle ---------- */
  document.querySelectorAll("[data-nav-search-toggle], button[aria-label*='search' i]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = document.querySelector("global-nav input[type='search'], global-nav input[name='q']");
      if (input) input.focus();
    });
  });
})();
