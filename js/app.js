/* app.js — navigation, layout, orchestration */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  var WHEEL_GAP_MS = 500;
  var INIT_DELAY   = 400;

  /* ─────────────────────────────────────────────
     FLATTEN BEATS
     Sub-beats are inserted immediately after their
     parent, giving a simple linear sequence.
  ───────────────────────────────────────────── */
  var FLAT = [];
  var TOTAL_MAIN = BEATS.length;   /* top-level beat count — denominator in counter */
  BEATS.forEach(function (beat, i) {
    beat._label = String(i + 1);
    FLAT.push(beat);
    (beat.subBeats || []).forEach(function (sub, j) {
      sub._label = String(i + 1) + String.fromCharCode(97 + j);  /* "2a", "6a", "8a" … */
      FLAT.push(sub);
    });
  });

  /* ─────────────────────────────────────────────
     STATE
  ───────────────────────────────────────────── */
  var idx          = -1;
  var lastWheel    = 0;
  var touchY0      = 0;
  var cancelVisual = null;

  /* ─────────────────────────────────────────────
     DOM REFS
  ───────────────────────────────────────────── */
  var canvas         = document.getElementById('visual-canvas');
  var ctx            = canvas.getContext('2d');
  var sectionTitleEl = document.getElementById('section-title');
  var scriptureBlock = document.getElementById('scripture-block');
  var counter        = document.getElementById('beat-counter');
  var navPrev        = document.getElementById('nav-prev');
  var navNext        = document.getElementById('nav-next');
  var overlay        = document.getElementById('story-overlay');
  var storyRight     = document.getElementById('story-right');

  /* ─────────────────────────────────────────────
     CANVAS SIZING
     Setting canvas.width/height clears the surface;
     we immediately re-render the current visual.
  ───────────────────────────────────────────── */
  function sizeCanvas() {
    canvas.width  = storyRight.offsetWidth;
    canvas.height = storyRight.offsetHeight;
    if (idx >= 0) renderVisual(FLAT[idx]);
  }

  /* ─────────────────────────────────────────────
     NAVIGATION
  ───────────────────────────────────────────── */
  function next()   { advance(1);  }
  function prev()   { advance(-1); }
  function replay() { if (idx >= 0) go(idx); }

  function advance(dir) {
    var target = idx + dir;
    if (target < 0 || target >= FLAT.length) return;
    go(target);
  }

  /* ─────────────────────────────────────────────
     GO TO BEAT
  ───────────────────────────────────────────── */
  function go(i) {
    idx = i;
    var beat = FLAT[i];

    renderLeft(beat);
    renderVisual(beat);
    updateNav(i);

    document.dispatchEvent(new CustomEvent('beat-change', {
      detail: { idx: i, total: FLAT.length, id: beat.id, visual: beat.visual }
    }));
  }

  /* ─────────────────────────────────────────────
     LEFT PANEL
  ───────────────────────────────────────────── */
  function renderLeft(beat) {
    sectionTitleEl.textContent = beat.sectionTitle || '';
    scriptureBlock.innerHTML   = '';

    if (!beat.scripture) return;

    var items = Array.isArray(beat.scripture) ? beat.scripture : [beat.scripture];
    items.forEach(function (item) {
      var wrapper = document.createElement('div');
      wrapper.className = 'scripture-item' + (/^col/i.test(item.ref) ? ' is-col' : '');

      var ref = document.createElement('p');
      ref.className   = 'scripture-ref';
      ref.textContent = item.ref;

      var text = document.createElement('p');
      text.className   = 'scripture-text';
      text.textContent = '“' + item.text + '”';

      wrapper.appendChild(ref);
      wrapper.appendChild(text);
      scriptureBlock.appendChild(wrapper);
    });
  }

  /* ─────────────────────────────────────────────
     VISUAL RENDERING
     Each visual function may return a cancel fn
     that stops its animation loop; we call it
     before starting the next visual.
  ───────────────────────────────────────────── */
  function renderVisual(beat) {
    if (cancelVisual) { cancelVisual(); cancelVisual = null; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (beat.visual && window.VISUALS && window.VISUALS[beat.visual]) {
      var result = window.VISUALS[beat.visual](ctx, canvas.width, canvas.height);
      cancelVisual = (typeof result === 'function') ? result : null;
    }
  }

  /* ─────────────────────────────────────────────
     BEAT COUNTER + NAV BUTTONS
  ───────────────────────────────────────────── */
  function updateNav(i) {
    if (counter) counter.textContent = FLAT[i]._label + ' \xb7 ' + TOTAL_MAIN;
    if (navPrev) navPrev.disabled = (i === 0);
    if (navNext) navNext.disabled = (i === FLAT.length - 1);
  }

  /* ─────────────────────────────────────────────
     EVENT LISTENERS
  ───────────────────────────────────────────── */
  function attachListeners() {

    /* Full-page click overlay */
    if (overlay) overlay.addEventListener('click', next);

    /* Nav buttons — stop propagation so overlay doesn't also fire */
    if (navNext) navNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });
    if (navPrev) navPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });

    /* Mouse wheel — debounced, bidirectional */
    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      var now = Date.now();
      if (now - lastWheel < WHEEL_GAP_MS) return;
      lastWheel = now;
      if (e.deltaY > 0) next(); else prev();
    }, { passive: false });

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault(); next();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault(); prev();
      } else if (e.code === 'Space') {
        e.preventDefault(); replay();
      }
    });

    /* Touch — swipe up = forward, swipe down = backward */
    document.addEventListener('touchstart', function (e) {
      touchY0 = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      var delta = touchY0 - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 35) return;
      if (delta > 0) next(); else prev();
    }, { passive: true });

    /* Resize — re-measure canvas and re-render current visual */
    window.addEventListener('resize', sizeCanvas);
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  function init() {
    attachListeners();
    sizeCanvas();
    setTimeout(function () { go(0); }, INIT_DELAY);
  }

  document.addEventListener('DOMContentLoaded', init);

}());
