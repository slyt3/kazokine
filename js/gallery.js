// Kazokinė — meniu perjungimas ir nuotraukų peržiūra (be animacijų)
document.addEventListener('DOMContentLoaded', function () {

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen
        ? '<i class="ph ph-x"></i>'
        : '<i class="ph ph-list"></i>';
    });
  }

  // ---- Lightbox ----
  var groups = {};
  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    var group = el.getAttribute('data-lightbox');
    if (!groups[group]) groups[group] = [];
    groups[group].push(el.getAttribute('href'));
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openLightbox(group, groups[group].indexOf(el.getAttribute('href')));
    });
  });

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');

  var currentGroup = null;
  var currentIndex = 0;

  function openLightbox(group, index) {
    currentGroup = group;
    currentIndex = index;
    showCurrent();
    lightbox.classList.add('is-open');
  }

  function showCurrent() {
    var list = groups[currentGroup];
    lightboxImg.src = list[currentIndex];
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
  }

  function step(delta) {
    var list = groups[currentGroup];
    currentIndex = (currentIndex + delta + list.length) % list.length;
    showCurrent();
  }

  if (lightbox) {
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
});
