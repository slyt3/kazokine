/**
 * Galerijos filtras (galerija.html).
 *
 * Mygtukai [data-filter="…"] rodo tik tos grupės nuotraukas
 * (figure[data-group="…"]). Reikšmė "visos" rodo viską.
 * Jei grupėje nėra nė vienos nuotraukos, rodoma tuščia būsena
 * [data-empty-state]. Pasirinkimas įrašomas į URL (#antras-namas),
 * todėl nuoroda į konkrečią grupę veikia.
 */
(function () {
  "use strict";

  var buttons = document.querySelectorAll("[data-filter]");
  var photos = document.querySelectorAll("figure[data-group]");
  var empty = document.querySelector("[data-empty-state]");
  if (!buttons.length) return;

  // Skaičiai prie mygtukų apskaičiuojami iš tikrų nuotraukų.
  Array.prototype.forEach.call(buttons, function (button) {
    var group = button.getAttribute("data-filter");
    var count = group === "visos"
      ? photos.length
      : document.querySelectorAll('figure[data-group="' + group + '"]').length;
    var slot = button.querySelector(".filter__count");
    if (slot) slot.textContent = count;
  });

  function apply(group) {
    var visible = 0;

    Array.prototype.forEach.call(photos, function (photo) {
      var match = group === "visos" || photo.getAttribute("data-group") === group;
      photo.hidden = !match;
      if (match) visible++;
    });

    Array.prototype.forEach.call(buttons, function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-filter") === group));
    });

    if (empty) empty.hidden = visible > 0;
  }

  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener("click", function () {
      var group = button.getAttribute("data-filter");
      apply(group);
      history.replaceState(null, "", group === "visos" ? location.pathname : "#" + group);
    });
  });

  // Pradinė būsena iš URL, pvz. galerija.html#saslykine
  var initial = location.hash.slice(1);
  var known = document.querySelector('[data-filter="' + initial + '"]');
  apply(known ? initial : "visos");
})();
