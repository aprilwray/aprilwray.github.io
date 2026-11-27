/* Helix ribbon hero. Scroll progress only. Does not move the page. */
(function () {
  var pin = document.getElementById("helix-pin");
  var stage = document.getElementById("helix-stage");
  var world = document.getElementById("helix-world");
  var headline = document.getElementById("helix-title");
  var line1 = document.getElementById("helix-line-1");
  var line2 = document.getElementById("helix-line-2");
  var bio = document.getElementById("helix-bio");
  var grid = document.getElementById("helix-grid");
  var dataEl = document.getElementById("helix-projects");
  if (!pin || !stage || !world || !headline || !dataEl) return;

  var projects = JSON.parse(dataEl.textContent);
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HELIX = { perTurn: 7, slices: 4, pitchK: 1.34, tiltZ: -17, tiltX: -9 };
  var ranges = {
    bio: [0, 0.06],
    split: [0.08, 0.36],
    helix: [0.02, 0.62],
    grid: [0.53, 0.63],
    gridScroll: [0.8, 1],
    calmOut: [0.04, 0.2],
    calmIn: [0.42, 0.58]
  };

  function clamp(n, a, b) {
    return n < a ? a : n > b ? b : n;
  }
  function seg(p, range) {
    return clamp((p - range[0]) / (range[1] - range[0]), 0, 1);
  }
  function easeInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeSine(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * t);
  }

  var group = document.createElement("div");
  group.className = "helix-group";
  var screw = document.createElement("div");
  screw.className = "helix-screw";
  group.appendChild(screw);
  world.appendChild(group);

  var sliceRefs = [];
  var geom = null;

  function buildGeometry() {
    var W = stage.clientWidth;
    var H = stage.clientHeight;
    var U = Math.max(Math.min(W, H * 1.6), H * 0.62);
    var cw = U * 0.4;
    var ch = cw / 1.5;
    var dTheta = (2 * Math.PI) / HELIX.perTurn;
    var R = cw / dTheta;
    var pitch = ch * HELIX.pitchK;
    var sw = cw / HELIX.slices;
    var dy = (pitch * dTheta) / HELIX.slices / (2 * Math.PI);
    var skew = Math.atan(pitch / (2 * Math.PI * R)) * (180 / Math.PI);
    var persp = U * 1.05;
    var n = projects.length;
    var span = pitch * (n - 1) * dTheta / (2 * Math.PI);
    geom = { W: W, H: H, cw: cw, ch: ch, dTheta: dTheta, R: R, pitch: pitch, sw: sw, dy: dy, skew: skew, persp: persp, span: span, n: n };
    var perspEl = document.getElementById("helix-persp") || stage;
    perspEl.style.perspective = persp + "px";

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
        var front = face(order[i].src, j, sw, cw, ch, false);
        var back = face(order[i].src, j, sw, cw, ch, true);
        slice.appendChild(front);
        slice.appendChild(back);
        screw.appendChild(slice);
        sliceRefs.push({ a: a, front: front, back: back });
      }
    }
  }

  function face(src, j, sw, cw, ch, isBack) {
    var el = document.createElement("div");
    el.className = "helix-face" + (isBack ? " is-back" : " is-front");
    el.style.backgroundImage = "url(\"" + src + "\")";
    el.style.backgroundSize = cw + "px " + ch + "px";
    el.style.backgroundPosition = (-j * sw) + "px 0";
    el.style.backgroundRepeat = "no-repeat";
    return el;
  }

  function cols() {
    return stage.clientWidth < 720 ? 2 : 3;
  }

  function fromVec(i, c, W, H) {
    var col = i % c;
    var row = Math.floor(i / c);
    var dx = W * 0.72;
    var dy = H * 0.48;
    if (row === 0) {
      if (c === 3) {
        if (col === 0) return [-dx, 0];
        if (col === 1) return [0, -dy];
        return [dx, 0];
      }
      return col === 0 ? [-dx, 0] : [dx, 0];
    }
    return [0, dy * 0.85];
  }

  function render(p) {
    var g = geom;
    if (!g) return;
    if (reduced) {
      var out = seg(p, ranges.calmOut);
      var inn = easeOut(seg(p, ranges.calmIn));
      headline.style.opacity = String(1 - out);
      headline.style.transform = "none";
      line1.style.transform = "none";
      line2.style.transform = "none";
      group.style.display = "none";
      bio.style.opacity = String(1 - seg(p, ranges.bio));
      var cardsR = grid.children;
      for (var r = 0; r < cardsR.length; r++) {
        cardsR[r].style.transform = "none";
        cardsR[r].style.filter = "none";
        cardsR[r].style.opacity = String(inn);
        cardsR[r].style.pointerEvents = inn > 0.82 ? "auto" : "none";
      }
      grid.style.transform = "none";
      grid.style.opacity = "1";
      return;
    }

    var splitT = easeInOut(seg(p, ranges.split));
    line1.style.transform = "translateX(" + (splitT * g.W * 0.95) + "px)";
    line2.style.transform = "translateX(" + (-splitT * g.W * 0.95) + "px)";
    var hide = splitT >= 0.995;
    line1.style.opacity = hide ? "0" : "1";
    line2.style.opacity = hide ? "0" : "1";

    var ht = seg(p, ranges.helix);
    var rise = easeSine(ht) * 0.35 + ht * 0.65;
    var phi = -0.85 * Math.PI + ht * 2.1 * Math.PI;
    var screwY = -g.pitch * phi / (2 * Math.PI);
    var centre = -g.span / 2 + screwY;
    var reach = g.H / 2 + g.span / 2 + g.ch * 1.6;
    var risePx = reach - rise * 2 * reach;
    var showHelix = ht > 0 && p < ranges.helix[1];
    group.style.display = showHelix ? "block" : "none";
    group.style.transform =
      "translate3d(" + (-g.W * 0.04) + "px, " + (risePx - centre) + "px, " + (-g.R) + "px) rotateZ(" + HELIX.tiltZ + "deg) rotateX(" + HELIX.tiltX + "deg)";
    screw.style.transform = "rotateY(" + (phi * 180 / Math.PI) + "deg) translateY(" + screwY + "px)";

    var compensate = (g.persp + g.R * 0.45) / g.persp;
    headline.style.transform = "translateZ(" + (-g.R * 0.45) + "px) scale(" + compensate + ")";

    for (var s = 0; s < sliceRefs.length; s++) {
      var ref = sliceRefs[s];
      var c = Math.cos(ref.a + phi);
      var frontOn = c > 0.05;
      ref.front.style.visibility = frontOn ? "visible" : "hidden";
      ref.back.style.visibility = !frontOn ? "visible" : "hidden";
      var bright = 0.66 + 0.34 * Math.max(0, frontOn ? c : -c);
      var filter = "brightness(" + bright.toFixed(3) + ")";
      ref.front.style.filter = filter;
      ref.back.style.filter = filter;
    }

    bio.style.opacity = String(1 - seg(p, ranges.bio));

    var ccount = cols();
    var cards = grid.children;
    for (var i = 0; i < cards.length; i++) {
      var local = easeOut(seg(p, [ranges.grid[0] + i * 0.026, ranges.grid[1] + i * 0.026]));
      var k = 1 - local;
      var vec = fromVec(i, ccount, g.W, g.H);
      cards[i].style.opacity = String(local);
      cards[i].style.filter = "blur(" + (k * 7).toFixed(2) + "px)";
      cards[i].style.transform =
        "translate(" + (vec[0] * k).toFixed(1) + "px, " + (vec[1] * k).toFixed(1) + "px) scale(" + (1 + 0.4 * k).toFixed(3) + ") rotateX(" + (k * 16).toFixed(2) + "deg)";
      cards[i].style.pointerEvents = local > 0.82 ? "auto" : "none";
    }
    var gs = seg(p, ranges.gridScroll);
    grid.style.transform = "translateY(" + (-gs * 8) + "vh)";
  }

  var cur = 0;
  var last = 0;
  var raf = 0;
  var active = false;

  function goal() {
    var rect = pin.getBoundingClientRect();
    var stageH = stage.getBoundingClientRect().height || window.innerHeight;
    var denom = rect.height - stageH;
    if (denom <= 1) return 0;
    return clamp(-rect.top / denom, 0, 1);
  }

  function frame(now) {
    if (!active) return;
    var dt = last ? Math.min(48, now - last) : 16;
    last = now;
    var target = goal();
    cur += (target - cur) * (1 - Math.exp(-dt / 110));
    if (Math.abs(target - cur) < 0.0004) cur = target;
    render(cur);
    raf = window.requestAnimationFrame(frame);
  }

  function wake() {
    if (active) return;
    active = true;
    last = 0;
    raf = window.requestAnimationFrame(frame);
  }
  function sleep() {
    active = false;
    if (raf) window.cancelAnimationFrame(raf);
  }

  buildGeometry();
  render(0);
  var observer = new IntersectionObserver(function (entries) {
    var on = false;
    for (var i = 0; i < entries.length; i++) if (entries[i].isIntersecting) on = true;
    if (on) wake();
    else sleep();
  }, { threshold: 0 });
  observer.observe(pin);

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      buildGeometry();
      render(cur);
    }, 120);
  });
})();
