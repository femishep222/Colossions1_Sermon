/* app.js — navigation, layout, orchestration */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  var WHEEL_GAP_MS = 500;
  var INIT_DELAY   = 400;

  /* ─────────────────────────────────────────────
     STATE
     phase:   'intro' | 'active' | 'outro'
     beatIdx: 0-based index into BEATS
     stage:   1 | 2 | 3  (only meaningful when active)
  ───────────────────────────────────────────── */
  var phase      = 'intro';
  var beatIdx    = 0;
  var stage      = 1;
  var lastWheel  = 0;
  var touchY0    = 0;
  var cancelVisual = null;
  var replayTimer  = null;

  /* ─────────────────────────────────────────────
     DOM REFS
  ───────────────────────────────────────────── */
  var canvas         = document.getElementById('visual-canvas');
  var ctx            = canvas.getContext('2d');
  var scriptureTop   = document.getElementById('scripture-top');
  var scriptureBot   = document.getElementById('scripture-bottom');
  var counter        = document.getElementById('beat-counter');
  var navPrev        = document.getElementById('nav-prev');
  var navNext        = document.getElementById('nav-next');
  var overlay        = document.getElementById('story-overlay');
  var storyRight     = document.getElementById('story-right');

  /* ─────────────────────────────────────────────
     CANVAS SIZING
  ───────────────────────────────────────────── */
  function sizeCanvas() {
    canvas.width  = storyRight.offsetWidth;
    canvas.height = storyRight.offsetHeight;
    if (phase === 'active') renderVisualForBeat(BEATS[beatIdx]);
    if (phase !== 'active') paintBlack();
  }

  /* ─────────────────────────────────────────────
     BLACK SCREEN HELPERS
  ───────────────────────────────────────────── */
  function paintBlack() {
    if (cancelVisual) { cancelVisual(); cancelVisual = null; }
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function enterBlackout() {
    document.body.classList.add('is-blackout');
    paintBlack();
    if (counter)  counter.textContent  = '';
    if (navPrev)  navPrev.disabled     = true;
    if (navNext)  navNext.disabled     = true;
  }

  function exitBlackout() {
    document.body.classList.remove('is-blackout');
  }

  /* ─────────────────────────────────────────────
     AUTO REPLAY
  ───────────────────────────────────────────── */
  function scheduleAutoReplay() {
    if (replayTimer) clearTimeout(replayTimer);
    replayTimer = setTimeout(function () {
      if (phase === 'active') renderVisualForBeat(BEATS[beatIdx]);
    }, CONFIG.AUTO_REPLAY_MS);
  }

  /* ─────────────────────────────────────────────
     NAVIGATION
  ───────────────────────────────────────────── */
  function next() { advance(1);  }
  function prev() { advance(-1); }

  function advance(dir) {
    if (dir > 0) {
      if (phase === 'intro') {
        exitBlackout();
        phase = 'active';
        beatIdx = 0;
        stage = 1;
        goStage();
        return;
      }
      if (phase === 'outro') return;

      /* active: advance stage or beat */
      if (stage < 3) {
        stage++;
        goStage();
      } else {
        if (beatIdx < BEATS.length - 1) {
          beatIdx++;
          stage = 1;
          goStage();
        } else {
          phase = 'outro';
          enterBlackout();
        }
      }
    } else {
      if (phase === 'outro') {
        exitBlackout();
        phase = 'active';
        /* stay at last beat, stage 3 */
        goStage();
        return;
      }
      if (phase === 'intro') return;

      /* active: go back */
      if (stage > 1) {
        stage--;
        goStage();
      } else {
        if (beatIdx > 0) {
          beatIdx--;
          stage = 3;
          goStage();
        } else {
          phase = 'intro';
          enterBlackout();
        }
      }
    }
  }

  /* ─────────────────────────────────────────────
     GO TO CURRENT STAGE
  ───────────────────────────────────────────── */
  function goStage() {
    var beat = BEATS[beatIdx];

    if (stage === 1) {
      renderScriptureSlot(scriptureTop, beat.scriptureA);
      renderScriptureSlot(scriptureBot, null);
      /* canvas unchanged — holds previous frame */
    } else if (stage === 2) {
      renderScriptureSlot(scriptureTop, beat.scriptureA);
      renderScriptureSlot(scriptureBot, null);
      renderVisualForBeat(beat);
      scheduleAutoReplay();
    } else {
      renderScriptureSlot(scriptureTop, beat.scriptureA);
      renderScriptureSlot(scriptureBot, beat.scriptureB);
      /* canvas unchanged */
    }

    updateNav();

    document.dispatchEvent(new CustomEvent('beat-change', {
      detail: { beatIdx: beatIdx, stage: stage, id: beat.id, visual: beat.visual }
    }));
  }

  /* ─────────────────────────────────────────────
     LEFT PANEL — render a scripture slot
     data: null | single object | array of objects
  ───────────────────────────────────────────── */
  function renderScriptureSlot(el, data) {
    el.innerHTML = '';
    if (!data) return;

    var items = Array.isArray(data) ? data : [data];
    items.forEach(function (item) {
      var wrapper = document.createElement('div');
      var cls = 'scripture-item';
      if (item.provocation) cls += ' is-provocation';
      if (item.crimson)     cls += ' is-crimson';
      if (!item.provocation && item.ref && /^col/i.test(item.ref)) cls += ' is-col';
      wrapper.className = cls;

      if (item.ref && !item.provocation) {
        var ref = document.createElement('p');
        ref.className   = 'scripture-ref';
        ref.textContent = item.ref;
        wrapper.appendChild(ref);
      }

      var text = document.createElement('p');
      text.className   = 'scripture-text';
      text.textContent = item.provocation ? item.text : '“' + item.text + '”';
      wrapper.appendChild(text);

      el.appendChild(wrapper);
    });
  }

  /* ─────────────────────────────────────────────
     VISUAL RENDERING
  ───────────────────────────────────────────── */
  function renderVisualForBeat(beat) {
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
  function updateNav() {
    var beat = BEATS[beatIdx];
    if (counter) counter.textContent = beat.id + ' \xb7 ' + BEATS.length;
    if (navPrev) navPrev.disabled = (phase === 'active' && beatIdx === 0 && stage === 1);
    if (navNext) navNext.disabled = false;
  }

  /* ─────────────────────────────────────────────
     EVENT LISTENERS
  ───────────────────────────────────────────── */
  function attachListeners() {

    if (overlay) overlay.addEventListener('click', next);

    if (navNext) navNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });
    if (navPrev) navPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });

    window.addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      var now = Date.now();
      if (now - lastWheel < WHEEL_GAP_MS) return;
      lastWheel = now;
      if (e.deltaY > 0) next(); else prev();
    }, { passive: false });

    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault(); next();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault(); prev();
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (phase === 'active') renderVisualForBeat(BEATS[beatIdx]);
      }
    });

    document.addEventListener('touchstart', function (e) {
      touchY0 = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      var delta = touchY0 - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 35) return;
      if (delta > 0) next(); else prev();
    }, { passive: true });

    window.addEventListener('resize', sizeCanvas);
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  function init() {
    attachListeners();
    sizeCanvas();
    setTimeout(function () {
      enterBlackout();  /* start in black intro phase */
    }, INIT_DELAY);
  }

  document.addEventListener('DOMContentLoaded', init);

}());
