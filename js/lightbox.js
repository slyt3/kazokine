/**
 * Nuotraukų peržiūra per visą ekraną.
 *
 * Naudojimas HTML'e:
 *   <div data-gallery>
 *     <figure class="photo"><a href="didele.jpg" data-lightbox><img alt="…"></a></figure>
 *   </div>
 *
 * - Naršoma tik tarp to paties [data-gallery] bloko nuotraukų, kurios
 *   nėra paslėptos filtru (figure[hidden]).
 * - Valdymas: rodyklės ← →, Escape, mygtukai ekrane.
 * - Be JS nuoroda tiesiog atidaro originalią nuotrauką.
 * - Jokių animacijų: vaizdas keičiamas iškart.
 */
(function () {
  "use strict";

  var links = document.querySelectorAll("[data-lightbox]");
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  // Dialogo struktūra sukuriama vieną kartą ir pridedama į <body>.
  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Nuotraukos peržiūra");
  dialog.innerHTML =
    '<div class="lightbox__inner">' +
    '  <div class="lightbox__bar">' +
    '    <span class="lightbox__counter" aria-live="polite"></span>' +
    '    <button type="button" data-action="close" aria-label="Uždaryti">' +
    '      <i class="ph ph-x" aria-hidden="true"></i>' +
    "    </button>" +
    "  </div>" +
    '  <figure class="lightbox__figure"><img alt=""></figure>' +
    '  <div class="lightbox__footer">' +
    '    <p class="lightbox__caption"></p>' +
    '    <div class="lightbox__controls">' +
    '      <button type="button" data-action="prev" aria-label="Ankstesnė nuotrauka">' +
    '        <i class="ph ph-arrow-left" aria-hidden="true"></i>' +
    "      </button>" +
    '      <button type="button" data-action="next" aria-label="Kita nuotrauka">' +
    '        <i class="ph ph-arrow-right" aria-hidden="true"></i>' +
    "      </button>" +
    "    </div>" +
    "  </div>" +
    "</div>";
  document.body.appendChild(dialog);

  var image = dialog.querySelector("img");
  var caption = dialog.querySelector(".lightbox__caption");
  var counter = dialog.querySelector(".lightbox__counter");

  var items = []; // dabartinio rinkinio nuorodos
  var index = 0;

  /** Grąžina matomas nuorodas tame pačiame galerijos bloke. */
  function collect(link) {
    var scope = link.closest("[data-gallery]") || document;
    return Array.prototype.filter.call(
      scope.querySelectorAll("[data-lightbox]"),
      function (a) {
        var figure = a.closest("figure");
        return !(figure && figure.hidden);
      }
    );
  }

  function show(i) {
    index = (i + items.length) % items.length;
    var link = items[index];
    var thumb = link.querySelector("img");
    var alt = thumb ? thumb.alt : "";

    image.src = link.href;
    image.alt = alt;
    caption.textContent = alt;
    counter.textContent = index + 1 + " / " + items.length;
  }

  function open(link) {
    items = collect(link);
    show(items.indexOf(link));
    dialog.showModal();
    document.body.style.overflow = "hidden";
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("[data-lightbox]");
    if (!link) return;
    event.preventDefault();
    open(link);
  });

  dialog.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-action]");
    if (!button) return;
    var action = button.getAttribute("data-action");
    if (action === "close") dialog.close();
    if (action === "prev") show(index - 1);
    if (action === "next") show(index + 1);
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });

  // Uždarius grąžinamas slinkimas ir fokusas į paspaustą nuotrauką.
  dialog.addEventListener("close", function () {
    document.body.style.overflow = "";
    image.removeAttribute("src");
    if (items[index]) items[index].focus();
  });
})();
