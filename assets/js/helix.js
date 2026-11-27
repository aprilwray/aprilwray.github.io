/* Compact helix wheel in the hero. Spins on its own. Scroll nudges it. */
(function () {
  var stage = document.getElementById("hero-wheel-stage");
  var wheel = document.getElementById("hero-wheel");
  var dataEl = document.getElementById("helix-projects");
  if (!stage || !wheel || !dataEl) return;

  var projects = JSON.parse(dataEl.textContent);
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HELIX = { perTurn: 7, slices: 4, pitchK: 1.34, tiltZ: -14, tiltX: -8 };

  var fit = document.createElement("div");
  fit.className = "helix-group";
  var group = document.createElement("div");
  group.className = "helix-group";
  var screw = document.createElement("div");
  screw.className = "helix-screw";
  group.appendChild(screw);
  fit.appendChild(group);
  stage.appendChild(fit);

  var sliceRefs = [];
  var geom = null;
  var spin = -0.55 * Math.PI;

  function face(src, j, sw, cw, ch, isBack) {
    var el = document.createElement("div");
    el.className = "helix-face" + (isBack ? " is-back" : " is-front");
    el.style.backgroundImage = "url(\"" + src + "\")";
    el.style.backgroundSize = cw + "px " + ch + "px";
    el.style.backgroundPosition = (-j * sw) + "px 0";
    el.style.backgroundRepeat = "no-repeat";
    return el;
  }

  function buildGeometry() {
    var W = stage.clientWidth || wheel.clientWidth;
    var H = stage.clientHeight || wheel.clientHeight;
    if (W < 8 || H < 8) return;
    var U = 720;
    var cw = U * 0.34;
    var ch = cw / 1.5;
    var dTheta = (2 * Math.PI) / HELIX.perTurn;
    var R = cw / dTheta;
    var pitch = ch * HELIX.pitchK;
    var sw = cw / HELIX.slices;
    var dy = (pitch * dTheta) / HELIX.slices / (2 * Math.PI);
    var skew = Math.atan(pitch / (2 * Math.PI * R)) * (180 / Math.PI);
    var n = projects.length;
    var span = pitch * (n - 1) * dTheta / (2 * Math.PI);
    var scale = Math.min(W / (cw * 2.15), H / (ch * 2.35));
    geom = { H: H, dTheta: dTheta, R: R, pitch: pitch, span: span, n: n, scale: scale };
    stage.style.perspective = (U * 1.15) + "px";

    screw.innerHTML = "";
    sliceRefs = [];
    var order = projects.slice().reverse();
    for (var i = 0; i < order.length; i++) {
      for (var j = 0; j < HELIX.slices; j++) {
        var a = i * dTheta + (j + 0.5) * dTheta / HELIX.slices;
        var y = -pitch * a / (2 * Math.PI);
        var slice = document.createElement("div");
        slice.className = "helix-slice";
        slice.style.width = (sw + 2) + "px";
        slice.style.height = ch + "px";
        slice.style.transform =
          "rotateY(" + (a * 180 / Math.PI) + "deg) translate3d(" + (-sw / 2 - 2) + "px, " + (y - ch / 2 + dy / 2) + "px, " + R + "px) skewY(" + (-skew) + "deg)";
        slice.appendChild(face(order[i].src, j, sw, cw, ch, false));
        slice.appendChild(face(order[i].src, j, sw, cw, ch, true));
        screw.appendChild(slice);
        sliceRefs.push({ a: a, front: slice.firstChild, back: slice.lastChild });
      }
    }
  }

  function nudge() {
    var rect = wheel.getBoundingClientRect();
    var view = window.innerHeight || 1;
    var passed = (view * 0.55 - rect.top) / (view + rect.height);
    if (passed < -1) passed = -1;
    if (passed > 1) passed = 1;
    return passed * 1.15;
  }

  function render(phi) {
    var g = geom;
    if (!g) return;
    var screwY = -g.pitch * phi / (2 * Math.PI);
    var centre = -g.span / 2 + screwY;
    fit.style.transform = "scale(" + g.scale + ")";
    group.style.transform =
      "translate3d(0px, " + (-centre) + "px, " + (-g.R) + "px) rotateZ(" + HELIX.tiltZ + "deg) rotateX(" + HELIX.tiltX + "deg)";
    screw.style.transform = "rotateY(" + (phi * 180 / Math.PI) + "deg) translateY(" + screwY + "px)";
    for (var s = 0; s < sliceRefs.length; s++) {
      var ref = sliceRefs[s];
      var c = Math.cos(ref.a + phi);
      var frontOn = c > 0.04;
      ref.front.style.visibility = frontOn ? "visible" : "hidden";
      ref.back.style.visibility = frontOn ? "hidden" : "visible";
      var bright = 0.66 + 0.34 * Math.max(0, frontOn ? c : -c);
      var filter = "brightness(" + bright.toFixed(3) + ")";
      ref.front.style.filter = filter;
      ref.back.style.filter = filter;
    }
  }

  buildGeometry();
  render(reduced ? spin : spin + nudge());

  var active = false;
  var raf = 0;
  var last = 0;

  function frame(now) {
    if (!active) return;
    var dt = last ? Math.min(40, now - last) : 16;
    last = now;
    spin += dt * 0.00055;
    render(spin + nudge());
    raf = window.requestAnimationFrame(frame);
  }

  function wake() {
    if (reduced || active) return;
    active = true;
    last = 0;
    raf = window.requestAnimationFrame(frame);
  }
  function sleep() {
    active = false;
    if (raf) window.cancelAnimationFrame(raf);
  }

  if (!reduced) {
    var observer = new IntersectionObserver(function (entries) {
      var on = false;
      for (var i = 0; i < entries.length; i++) if (entries[i].isIntersecting) on = true;
      if (on) wake();
      else sleep();
    }, { threshold: 0 });
    observer.observe(wheel);
    window.addEventListener("scroll", function () {
      if (!active) render(spin + nudge());
    }, { passive: true });
  }

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      buildGeometry();
      render(spin + (reduced ? 0 : nudge()));
    }, 120);
  });
})();
