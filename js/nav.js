/**
 * Mobilaus meniu perjungiklis.
 * Mygtukas .nav-toggle atidaro / uždaro #pagrindinis-meniu.
 * Be JS meniu nuorodos lieka visada matomos (žr. layout.css).
 */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("pagrindinis-meniu");
  if (!toggle || !nav) return;

  var icon = toggle.querySelector(".ph");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (icon) icon.className = open ? "ph ph-x" : "ph ph-list";
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Paspaudus nuorodą (pvz. inkarą tame pačiame puslapyje) meniu užsidaro.
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();
