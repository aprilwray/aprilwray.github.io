(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-highlights]").forEach(function (root) {
    var scroller = root.querySelector(".highlights-scroller");
    if (!scroller) return;
    var timer = 0;
    var holdTimer = 0;
    var paused = false;

    function step() {
      var card = scroller.querySelector(".highlight-card");
      if (!card) return scroller.clientWidth;
      var track = scroller.querySelector(".highlights-track");
      var gap = 16;
      if (track) {
        var styles = window.getComputedStyle(track);
        gap = parseFloat(styles.columnGap || styles.gap) || 16;
      }
      return card.getBoundingClientRect().width + gap;
    }

    function go(dir) {
      var max = scroller.scrollWidth - scroller.clientWidth - 2;
      var next = scroller.scrollLeft + step() * dir;
      if (dir > 0 && scroller.scrollLeft >= max) next = 0;
      if (dir < 0 && scroller.scrollLeft <= 2) next = scroller.scrollWidth;
      scroller.scrollTo({ left: next, behavior: reduce.matches ? "auto" : "smooth" });
    }

    function hold() {
      paused = true;
      window.clearTimeout(holdTimer);
      holdTimer = window.setTimeout(function () { paused = false; }, 7000);
    }

    root.querySelectorAll("[data-highlight-dir]").forEach(function (button) {
      button.addEventListener("click", function () {
        hold();
        go(Number(button.getAttribute("data-highlight-dir")) || 1);
      });
    });

    scroller.addEventListener("pointerdown", hold);
    scroller.addEventListener("wheel", hold, { passive: true });
    scroller.addEventListener("touchstart", hold, { passive: true });
    root.addEventListener("mouseenter", function () { paused = true; });
    root.addEventListener("mouseleave", function () { paused = false; });
    root.addEventListener("focusin", function () { paused = true; });
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) paused = false;
    });

    function tick() {
      if (!paused && !document.hidden && !reduce.matches) go(1);
    }

    function arm() {
      window.clearInterval(timer);
      if (reduce.matches) return;
      timer = window.setInterval(tick, 3600);
    }

    document.addEventListener("visibilitychange", arm);
    if (reduce.addEventListener) reduce.addEventListener("change", arm);
    arm();
  });
})();
