/* app.js — navigation, layout, orchestration */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  var WHEEL_GAP_MS = 500;

  /* ─────────────────────────────────────────────
     STATE
     phase:   'active' | 'outro'
     beatIdx: 0-based index into BEATS
     stage:   1 | 2 | 3  (only meaningful when active)
  ───────────────────────────────────────────── */
  var phase      = 'active';
  var beatIdx    = 0;
  var stage      = 1;
  var lastWheel  = 0;
  var touchY0    = 0;
  var cancelVisual    = null;
  var currentVisual   = null;  /* visual key currently rendered on canvas */
  var prevBeatIdx     = -1;    /* beatIdx as of the last goStage call */
  var autoAdvTimer    = null;  /* setTimeout handle for stage-1 auto-advance */

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
    if (phase === 'outro') {
      paintBlack();
    } else if (currentVisual) {
      /* re-render the running visual (canvas was cleared by resize) */
      renderVisualForBeat(BEATS[beatIdx]);
    }
    /* stage a with no visual: canvas is transparently cleared by the resize itself */
  }

  /* ─────────────────────────────────────────────
     STAGE-1 AUTO-ADVANCE
  ───────────────────────────────────────────── */
  function clearAutoAdv() {
    if (autoAdvTimer !== null) { clearTimeout(autoAdvTimer); autoAdvTimer = null; }
  }

  function scheduleAutoAdv() {
    clearAutoAdv();
    if (CONFIG.STAGE1_AUTO_ADVANCE_MS > 0) {
      autoAdvTimer = setTimeout(function () { autoAdvTimer = null; advance(1); }, CONFIG.STAGE1_AUTO_ADVANCE_MS);
    }
  }

  /* ─────────────────────────────────────────────
     BLACK SCREEN HELPERS
  ───────────────────────────────────────────── */
  function paintBlack() {
    if (cancelVisual) { cancelVisual(); cancelVisual = null; }
    currentVisual = null;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function enterBlackout() {
    clearAutoAdv();
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
     NAVIGATION
  ───────────────────────────────────────────── */
  /* First/last valid stage for a beat — skip null-scripture stages */
  function firstStage(beat) { return beat.scriptureA ? 1 : 2; }
  function lastStage(beat)  { return beat.scriptureB ? 3 : 2; }

  function next() { advance(1);  }
  function prev() { advance(-1); }

  function advance(dir) {
    clearAutoAdv();
    if (dir > 0) {
      if (phase === 'outro') return;

      var beat = BEATS[beatIdx];
      if (stage === 1) {
        stage = 2;
        goStage();
      } else if (stage === 2) {
        if (beat.scriptureB) {
          stage = 3;
          goStage();
        } else if (beatIdx < BEATS.length - 1) {
          beatIdx++;
          stage = firstStage(BEATS[beatIdx]);
          goStage();
        } else {
          phase = 'outro';
          enterBlackout();
        }
      } else {
        if (beatIdx < BEATS.length - 1) {
          beatIdx++;
          stage = firstStage(BEATS[beatIdx]);
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
        stage = lastStage(BEATS[beatIdx]);
        goStage();
        return;
      }

      var beat = BEATS[beatIdx];
      if (stage === 3) {
        stage = 2;
        goStage();
      } else if (stage === 2) {
        if (beat.scriptureA) {
          stage = 1;
          goStage();
        } else if (beatIdx > 0) {
          beatIdx--;
          stage = lastStage(BEATS[beatIdx]);
          goStage();
        }
        /* else: at beat 0 with no scriptureA — nowhere to go back, navPrev is disabled */
      } else {
        if (beatIdx > 0) {
          beatIdx--;
          stage = lastStage(BEATS[beatIdx]);
          goStage();
        }
        /* else: at beat 0 stage 1 — nowhere to go back, navPrev is disabled */
      }
    }
  }

  /* ─────────────────────────────────────────────
     GO TO CURRENT STAGE
  ───────────────────────────────────────────── */
  function goStage() {
    var beatChanged = (beatIdx !== prevBeatIdx);
    prevBeatIdx = beatIdx;
    var beat = BEATS[beatIdx];

    if (stage === 1) {
      renderScriptureSlot(scriptureTop, beat.scriptureA);
      renderScriptureSlot(scriptureBot, null);
      /* cross-beat same visual or persistVisual → leave running; otherwise clear */
      if (!(beatChanged && (beat.visual === currentVisual || beat.persistVisual))) {
        if (cancelVisual) { cancelVisual(); cancelVisual = null; }
        currentVisual = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      scheduleAutoAdv();
    } else if (stage === 2) {
      renderScriptureSlot(scriptureTop, beat.scriptureA);
      renderScriptureSlot(scriptureBot, null);
      renderVisualForBeat(beat);
    } else {
      renderScriptureSlot(scriptureTop, beat.scriptureA);
      renderScriptureSlot(scriptureBot, beat.scriptureB);
      /* ensure visual is running — may be arriving here backward from a different beat */
      if (beat.visual !== currentVisual) renderVisualForBeat(beat);
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
      text.textContent = item.text;
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
    currentVisual = beat.visual;

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
    var stageLetter = ['a', 'b', 'c'][stage - 1];
    if (counter) counter.textContent = beat.id + stageLetter + ' \xb7 ' + BEATS.length;
    if (navPrev) navPrev.disabled = (beatIdx === 0 && stage === firstStage(BEATS[0]));
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
    document.body.classList.remove('is-blackout');  /* clear any stale blackout from bfcache */
    attachListeners();
    stage = firstStage(BEATS[0]);
    sizeCanvas();
    goStage();
  }

  document.addEventListener('DOMContentLoaded', init);

}());
