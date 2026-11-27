/* Scroll travel for the red-section ribbon.
   Transforms only. Does not change scroll position. */
(function () {
  var band = document.querySelector(".ribbon-band");
  var mover = document.querySelector(".ribbon-mover");
  if (!band || !mover) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var active = false;
  var ticking = false;

  function clamp(n) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
  }

  function apply() {
    ticking = false;
    if (!active) return;
    var rect = band.getBoundingClientRect();
    var view = window.innerHeight || 1;
    var span = view + rect.height;
    var passed = view - rect.top;
    var progress = clamp(passed / span);
    var along = (progress - 0.5) * 28;
    var rise = (0.5 - progress) * 16;
    var turn = -10 + progress * 22;
    mover.style.transform =
      "translate3d(" + along.toFixed(2) + "%, " + rise.toFixed(2) + "%, 0) rotate(" + turn.toFixed(2) + "deg)";
  }

  function request() {
    if (!active || ticking) return;
    ticking = true;
    window.requestAnimationFrame(apply);
  }

  var observer = new IntersectionObserver(function (entries) {
    active = false;
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) active = true;
    }
    if (active) request();
  }, { threshold: 0 });

  observer.observe(band);
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
  request();
})();
