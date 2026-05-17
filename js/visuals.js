/* visuals.js — visual drawing and animation functions only */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     PALETTE
  ───────────────────────────────────────────── */
  var GOLD      = '#F5C518';
  var GOLD_DK   = '#A0690A';
  var PEARL     = '#EEF2FF';
  var TEAL      = '#0D9488';
  var TEAL_LT   = '#14B8A6';
  var SIN       = '#3A3A3A';
  var LINE_COL  = '#888888';
  var PASTELS   = ['#E8C4B8', '#F0D5B0', '#D4B896', '#C4D4B8', '#C8C0D8'];

  /* ─────────────────────────────────────────────
     DRAW HELPERS
  ───────────────────────────────────────────── */

  /* Pre-incarnation Trinity orb: Gold outer ring, Pearl fill, Teal centre */
  function drawOrb(ctx, cx, cy, r) {
    ctx.save();

    ctx.shadowBlur  = r * 0.65;
    ctx.shadowColor = GOLD;
    var innerR = r * (1 - CONFIG.BAND_RATIO);
    var gGrad  = ctx.createRadialGradient(cx, cy, innerR, cx, cy, r);
    gGrad.addColorStop(0, GOLD);
    gGrad.addColorStop(1, GOLD_DK);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = gGrad;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = PEARL;
    ctx.fill();

    ctx.shadowBlur  = r * 0.35;
    ctx.shadowColor = TEAL;
    var tCR  = CONFIG.CENTRE_RATIO;
    var tGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * tCR);
    tGrad.addColorStop(0, TEAL_LT);
    tGrad.addColorStop(1, TEAL);
    ctx.beginPath();
    ctx.arc(cx, cy, r * tCR, 0, Math.PI * 2);
    ctx.fillStyle = tGrad;
    ctx.fill();

    ctx.restore();
  }

  /* Gold centre dot — used inside Christ's body circle at the chest */
  function drawGoldCentre(ctx, cx, cy, r) {
    ctx.save();
    ctx.shadowBlur  = r * 0.6;
    ctx.shadowColor = GOLD;
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, '#FFD94A');
    g.addColorStop(1, GOLD_DK);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  }

  /* Post-incarnation / indwelling orb: Teal stroke, Pearl fill, Gold centre */
  function drawOrbInverted(ctx, cx, cy, r) {
    ctx.save();

    /* Pearl fill with teal glow + stroke */
    ctx.shadowBlur  = r * 0.65;
    ctx.shadowColor = TEAL;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle   = PEARL;
    ctx.strokeStyle = TEAL;
    ctx.lineWidth   = Math.max(1.5, r * 0.1);
    ctx.fill();
    ctx.stroke();

    /* Gold centre dot */
    ctx.shadowBlur  = r * 0.35;
    ctx.shadowColor = GOLD;
    var gCR  = CONFIG.CENTRE_RATIO;
    var gGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * gCR);
    gGrad.addColorStop(0, '#FFD94A');
    gGrad.addColorStop(1, GOLD_DK);
    ctx.beginPath();
    ctx.arc(cx, cy, r * gCR, 0, Math.PI * 2);
    ctx.fillStyle = gGrad;
    ctx.fill();

    ctx.restore();
  }

  /* Human figure — body uses same fill-cover ring structure as drawOrb (outer ring then inner fill)
     ringCol = outer ring colour (mirrors orb's gold outer / Christ's teal outer)
     fillCol = inner fill colour  headFill defaults to ringCol (solid) if omitted */
  function drawHuman(ctx, cx, cy, size, ringCol, fillCol, headFill) {
    var bR     = size * 0.25;
    var bandW  = bR * CONFIG.BAND_RATIO;
    /* Head = CENTRE_RATIO of body radius — the head IS the centre of the figure,
       mirroring how the teal/gold dot is the centre of the orb/body circle.
       Gap between head bottom and body top = one band-width (principled unit). */
    var hR     = bR * CONFIG.CENTRE_RATIO;
    var bodyCy = cy + size * 0.14;
    var headCy = bodyCy - bR - bandW - hR;  /* body top − gap − head radius */
    var hFill  = (headFill !== undefined) ? headFill : ringCol;

    ctx.save();

    /* Body: outer ring colour, then inner fill covers centre — mirrors drawOrb */
    ctx.beginPath();
    ctx.arc(cx, bodyCy, bR, 0, Math.PI * 2);
    ctx.fillStyle = ringCol;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, bodyCy, bR - bandW, 0, Math.PI * 2);
    ctx.fillStyle = fillCol;
    ctx.fill();

    /* Head — solid */
    ctx.beginPath();
    ctx.arc(cx, headCy, hR, 0, Math.PI * 2);
    ctx.fillStyle = hFill;
    ctx.fill();

    ctx.restore();
  }

  /* Chest = centre of the body circle */
  function chestY(cy, size) { return cy + size * 0.14; }

  /* Christ: teal outline, pearl body, teal head, gold chest dot */
  function drawChrist(ctx, cx, cy, size) {
    drawHuman(ctx, cx, cy, size, TEAL, PEARL, TEAL);
    drawGoldCentre(ctx, cx, chestY(cy, size), size * 0.25 * CONFIG.CENTRE_RATIO);
  }

  /* Church member: teal outline, pastel body, teal head, heart at chest */
  function drawChurchFig(ctx, cx, cy, size, pastelCol) {
    drawHuman(ctx, cx, cy, size, TEAL, pastelCol, TEAL);
    drawHeartOrb(ctx, cx, chestY(cy, size), size * 0.25 * CONFIG.HEART_CHEST_RATIO);
  }

  /* Teal ring — same BAND_RATIO width as orb/body, transparent interior */
  function drawRing(ctx, cx, cy, r, colour) {
    var innerR = r * (1 - CONFIG.BAND_RATIO);
    ctx.save();
    ctx.shadowBlur  = r * 0.25;
    ctx.shadowColor = colour;
    ctx.beginPath();
    ctx.arc(cx, cy, r,      0, Math.PI * 2, false);  /* outer CW */
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);   /* inner CCW — punches transparent hole */
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.restore();
  }

  /* Small grey sin-orb */
  function drawSinOrb(ctx, cx, cy, r) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = SIN;
    ctx.fill();
    ctx.restore();
  }

  /* Heart-shaped path centred at (cx, cy), size = half-height */
  function heartPath(ctx, cx, cy, s) {
    ctx.moveTo(cx, cy + s * 0.32);
    ctx.bezierCurveTo(cx - s * 0.98, cy - s * 0.12, cx - s * 0.5, cy - s * 0.82, cx, cy - s * 0.28);
    ctx.bezierCurveTo(cx + s * 0.5,  cy - s * 0.82, cx + s * 0.98, cy - s * 0.12, cx, cy + s * 0.32);
  }

  /* Heart-orb: pearl outer, gold centre — the divine becoming personal */
  function drawHeartOrb(ctx, cx, cy, s) {
    ctx.save();
    ctx.shadowBlur  = s * 1.0;
    ctx.shadowColor = PEARL;
    ctx.beginPath(); heartPath(ctx, cx, cy, s); ctx.closePath();
    ctx.fillStyle = PEARL;
    ctx.fill();
    ctx.shadowBlur  = s * 0.4;
    ctx.shadowColor = GOLD;
    var gGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.45);
    gGrad.addColorStop(0, '#FFD94A');
    gGrad.addColorStop(1, GOLD_DK);
    ctx.beginPath(); heartPath(ctx, cx, cy, s * 0.45); ctx.closePath();
    ctx.fillStyle = gGrad;
    ctx.fill();
    ctx.restore();
  }

  /* Spirit orb: pearl outer, gold centre — the Spirit carrying the Father */
  function drawSpiritOrb(ctx, cx, cy, r) {
    ctx.save();
    ctx.shadowBlur  = r * 1.6;
    ctx.shadowColor = PEARL;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = PEARL;
    ctx.fill();
    ctx.shadowBlur  = r * 0.4;
    ctx.shadowColor = GOLD;
    var gGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.45);
    gGrad.addColorStop(0, '#FFD94A');
    gGrad.addColorStop(1, GOLD_DK);
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = gGrad;
    ctx.fill();
    ctx.restore();
  }

  /* Very faint teal compass rays — used as lingering background in States 3+ */
  function drawFaintRays(ctx, cx, cy, w, h, alpha, colour, lw) {
    var maxLen = Math.sqrt(w * w + h * h);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = colour || TEAL;
    ctx.lineWidth   = lw || 1;
    [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(function (d) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + d[0] * maxLen, cy + d[1] * maxLen);
      ctx.stroke();
    });
    ctx.restore();
  }

  /* Trinity band labels: FATHER (outer), SPIRIT (middle), SON (centre) at the north position.
     inverted=true flips colours for the teal-outer figure (orbState3). */
  function drawOrbLabels(ctx, cx, cy, r, inverted) {
    var bandW   = r * CONFIG.BAND_RATIO;
    var innerR  = r * (1 - CONFIG.BAND_RATIO);
    var centreR = r * CONFIG.CENTRE_RATIO;
    var fs      = Math.round(bandW * 0.35);

    ctx.save();
    ctx.font          = '600 ' + fs + 'px Inter, sans-serif';
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';
    ctx.letterSpacing = '0.10em';

    ctx.fillStyle = inverted ? PEARL : GOLD_DK;
    ctx.fillText('FATHER', cx, cy - (r + innerR)  / 2);

    ctx.fillStyle = TEAL;
    ctx.fillText('SPIRIT', cx, cy - (innerR + centreR) / 2);

    ctx.fillStyle = inverted ? GOLD_DK : PEARL;
    ctx.fillText('SON',    cx, cy);

    ctx.restore();
  }

  /* Cross: 4 arms radiating from centre — pass halfW/halfH scaled by progress for animation */
  function drawCross(ctx, cx, cy, halfW, halfH, alpha, lw) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = SIN;
    ctx.lineWidth   = lw;
    ctx.lineCap     = 'round';
    [[0, -halfH], [0, halfH], [-halfW, 0], [halfW, 0]].forEach(function (d) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + d[0], cy + d[1]);
      ctx.stroke();
    });
    ctx.restore();
  }

  /* Layout: 5 figures in a row below centre */
  function figPositions(w, h) {
    var rowY = h * CONFIG.FIGURES_Y, gap = w * CONFIG.FIGURES_GAP, cx = w * 0.5;
    return [
      { x: cx - gap * 2, y: rowY },
      { x: cx - gap,     y: rowY },
      { x: cx,           y: rowY },
      { x: cx + gap,     y: rowY },
      { x: cx + gap * 2, y: rowY }
    ];
  }

  /* Christ sits above the row */
  function christXY(w, h) { return { x: w * 0.5, y: h * CONFIG.CHRIST_Y }; }

  /* Cubic ease-out: 0→1 */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  /* ─────────────────────────────────────────────
     VISUAL FUNCTIONS
     Each accepts (ctx, w, h) and may return a
     cancel function to stop its animation loop.
  ───────────────────────────────────────────── */

  window.VISUALS = {};

  /* ── Image helper: contain-scale an image in the canvas area below the title overlay ── */
  function drawImageContain(ctx, img, w, h) {
    var topPad = h * CONFIG.IMAGE_TOP_PAD;
    var availH = h - topPad;
    var scale  = Math.min(w / img.width, availH / img.height);
    var sw = img.width * scale, sh = img.height * scale;
    ctx.drawImage(img, (w - sw) / 2, topPad + (availH - sh) / 2, sw, sh);
  }

  /* ── Beat 1: statue image ── */
  var _imgStatue = null;
  window.VISUALS.imageStatue = function (ctx, w, h) {
    if (_imgStatue && _imgStatue.complete) {
      drawImageContain(ctx, _imgStatue, w, h);
    } else {
      _imgStatue = new Image();
      _imgStatue.onload = function () { drawImageContain(ctx, _imgStatue, w, h); };
      _imgStatue.src = 'Assets/imagestatue(beat1).jpg';
    }
    return null;
  };

  /* ── Beat 2: lake reflection image ── */
  var _imgLake = null;
  window.VISUALS.imageLakeReflection = function (ctx, w, h) {
    if (_imgLake && _imgLake.complete) {
      drawImageContain(ctx, _imgLake, w, h);
    } else {
      _imgLake = new Image();
      _imgLake.onload = function () { drawImageContain(ctx, _imgLake, w, h); };
      _imgLake.src = 'Assets/lakereflection(beat2).jpg';
    }
    return null;
  };

  /* ── Beat 3: introduce the orb, full-screen, still ── */
  window.VISUALS.orbIntro = function (ctx, w, h) {
    var r = Math.min(w, h) * CONFIG.LARGE_ORB_SCALE;
    drawOrb(ctx, w / 2, h * CONFIG.ORB_CENTRE_Y, r);
    return null;
  };

  /* ── orbState1 — still orb (unused in current beats, kept for reference) ── */
  window.VISUALS.orbState1 = function (ctx, w, h) {
    var r = Math.min(w, h) * CONFIG.LARGE_ORB_SCALE;
    drawOrb(ctx, w / 2, h * CONFIG.ORB_CENTRE_Y, r);
    return null;
  };

  /* ── Beat 3: State 2 — orb + 5 rays extending outward (pentagonal, mirrors 5 church figures) ── */
  window.VISUALS.orbState2 = function (ctx, w, h) {
    var cx = w / 2, cy = h * CONFIG.ORB_CENTRE_Y;
    var r  = Math.min(w, h) * CONFIG.LARGE_ORB_SCALE;
    var maxLen = Math.sqrt(w * w + h * h) * 0.54;
    var DURATION = 3300;
    var running = true, t0 = null;

    var TAGS = ['star', 'eq', 'wave', 'dna', 'cross'];
    var rays = TAGS.map(function (tag, i) {
      var a = -Math.PI / 2 + i * (Math.PI * 2 / 5);  /* start pointing up, 72° apart */
      return { dx: Math.cos(a), dy: Math.sin(a), tag: tag };
    });

    function drawSymbol(ctx, x, y, tag, sz) {
      ctx.save();
      ctx.fillStyle = TEAL_LT; ctx.strokeStyle = TEAL_LT;
      ctx.lineWidth = 1.5;

      if (tag === 'star') {
        ctx.beginPath();
        for (var i = 0; i < 10; i++) {
          var a = (i / 10) * Math.PI * 2 - Math.PI / 2;
          var rv = i % 2 === 0 ? sz * 1.1 : sz * 0.46;
          var px = x + Math.cos(a) * rv, py = y + Math.sin(a) * rv;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.fill();

      } else if (tag === 'eq') {
        ctx.font = (sz * 1.3) + 'px Inter, sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('E=mc\xb2', x, y);

      } else if (tag === 'wave') {
        ctx.beginPath();
        var hw = sz * 1.8;
        for (var ix = -hw; ix <= hw; ix += 2) {
          var iy = Math.sin((ix / hw) * Math.PI * 2) * sz * 0.6;
          if (ix === -hw) ctx.moveTo(x + ix, y + iy);
          else ctx.lineTo(x + ix, y + iy);
        }
        ctx.stroke();

      } else if (tag === 'dna') {
        [0, Math.PI].forEach(function (offset) {
          ctx.beginPath();
          var hw2 = sz * 1.6;
          for (var ix2 = -hw2; ix2 <= hw2; ix2 += 2) {
            var t = (ix2 / hw2) * Math.PI * 2 + offset;
            var iy2 = Math.sin(t) * sz * 0.55;
            if (ix2 === -hw2) ctx.moveTo(x + ix2, y + iy2);
            else ctx.lineTo(x + ix2, y + iy2);
          }
          ctx.stroke();
        });

      } else if (tag === 'cross') {
        var arm = sz * 1.0, bar = sz * 0.28;
        ctx.fillStyle = TEAL_LT;
        ctx.fillRect(x - arm, y - bar, arm * 2, bar * 2);  /* horizontal */
        ctx.fillRect(x - bar, y - arm, bar * 2, arm * 2);  /* vertical */
      }
      ctx.restore();
    }

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var p = easeOut(Math.min((ts - t0) / DURATION, 1));

      ctx.clearRect(0, 0, w, h);

      drawOrb(ctx, cx, cy, r);

      var tipHW = Math.min(w, h) * CONFIG.RAY_TIP_WIDTH;
      rays.forEach(function (ray) {
        var len  = maxLen * p;
        var tipX = cx + ray.dx * len;
        var tipY = cy + ray.dy * len;
        /* Perpendicular to ray direction — for cardinal dirs (dx,dy) this is simply (-dy, dx) */
        var px = -ray.dy, py = ray.dx;
        var hw = tipHW * p;  /* half-width at tip, grows with animation progress */
        ctx.save();
        ctx.globalAlpha = 0.45 * p;
        ctx.shadowBlur  = hw * 2; ctx.shadowColor = TEAL;
        ctx.fillStyle   = TEAL;
        ctx.beginPath();
        ctx.moveTo(cx, cy);                        /* apex — orb covers this point */
        ctx.lineTo(tipX - px * hw, tipY - py * hw);
        ctx.lineTo(tipX + px * hw, tipY + py * hw);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        /* "WORD" text tracking outward along the ray midpoint */
        if (len > r * 1.5) {
          var midX     = cx + ray.dx * len * 0.40;
          var midY     = cy + ray.dy * len * 0.40;
          var angle    = Math.atan2(ray.dy, ray.dx);
          if (Math.cos(angle) < 0) angle += Math.PI;  /* flip rays pointing leftward so text reads right-way up */
          var fontSize = Math.min(w, h) * 0.022;
          ctx.save();
          ctx.globalAlpha = p * 0.75;
          ctx.translate(midX, midY);
          ctx.rotate(angle);
          ctx.font          = '300 ' + fontSize + 'px Inter, sans-serif';
          ctx.fillStyle     = PEARL;
          ctx.textAlign     = 'center';
          ctx.textBaseline  = 'middle';
          ctx.letterSpacing = '0.18em';
          ctx.fillText('WORD', 0, 0);
          ctx.restore();
        }

        if (p > 0.72) {
          var a = (p - 0.72) / 0.28;
          ctx.save();
          ctx.globalAlpha = a * 0.8;
          var sz = Math.min(w, h) * 0.027;
          drawSymbol(ctx, cx + ray.dx * len, cy + ray.dy * len, ray.tag, sz);
          ctx.restore();
        }
      });

      /* Trinity labels — on top of orb and rays */
      ctx.save();
      ctx.globalAlpha = p;
      drawOrbLabels(ctx, cx, cy, r, false);
      ctx.restore();

      if (p < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 4: State 3 — orb transitions to human silhouette ── */
  /* Alignment: figH = 4×bigR → body radius = bigR; figCy = h/2 − figH×0.14 → body centred at h/2 */
  window.VISUALS.orbState3 = function (ctx, w, h) {
    var cx    = w / 2;
    var bigR  = Math.min(w, h) * CONFIG.LARGE_ORB_SCALE;
    var figH  = bigR * 4;
    var figCy = h * CONFIG.ORB_CENTRE_Y - figH * 0.14;
    var DURATION = 1800;
    var running = true, t0 = null;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var p = easeOut(Math.min((ts - t0) / DURATION, 1));

      ctx.clearRect(0, 0, w, h);
      drawFaintRays(ctx, cx, h * CONFIG.ORB_CENTRE_Y, w, h, 0.12);

      /* Orb fading out — centred at ORB_CENTRE_Y = body circle centre */
      ctx.save();
      ctx.globalAlpha = 1 - p;
      drawOrb(ctx, cx, h * CONFIG.ORB_CENTRE_Y, bigR);
      ctx.restore();

      /* Figure fading in */
      ctx.save();
      ctx.globalAlpha = p;
      ctx.shadowBlur  = figH * 0.04;
      ctx.shadowColor = TEAL;
      drawChrist(ctx, cx, figCy, figH);
      ctx.restore();

      /* Trinity labels on body circle — inverted colours (teal outer = FATHER) */
      ctx.save();
      ctx.globalAlpha = p;
      drawOrbLabels(ctx, cx, h * CONFIG.ORB_CENTRE_Y, bigR, true);
      ctx.restore();

      if (p < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 5: State 4a — Christ + 5 figures with sin-orbs and lines ── */
  window.VISUALS.orbState4a = function (ctx, w, h) {
    var cp    = christXY(w, h);
    var figs  = figPositions(w, h);
    var fSz   = Math.min(w, h) * CONFIG.FIGURE_SIZE;
    var cSz   = Math.min(w, h) * CONFIG.CHRIST_SIZE;
    var sinR  = fSz * 0.25 * CONFIG.SIN_ORB_RATIO;
    var crossLW = Math.min(w, h) * CONFIG.CROSS_LINE_SCALE;
    var crossH  = cSz * CONFIG.CROSS_H_RATIO;
    var crossW  = cSz * CONFIG.CROSS_W_RATIO;
    var DURATION = 800;
    var running = true, t0 = null;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var elapsed = ts - t0;
      var p  = easeOut(Math.min(elapsed / DURATION, 1));
      var xP = easeOut(Math.min(elapsed / CONFIG.CROSS_DURATION, 1));

      ctx.clearRect(0, 0, w, h);
      drawCross(ctx, cp.x, cp.y, crossW * xP, crossH * xP, CONFIG.CROSS_LINE_ALPHA, crossLW);

      /* Lines */
      ctx.save();
      ctx.strokeStyle = LINE_COL; ctx.lineWidth = 1; ctx.globalAlpha = 0.35 * p;
      figs.forEach(function (f) {
        ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(f.x, f.y); ctx.stroke();
      });
      ctx.restore();

      /* Figures */
      ctx.save(); ctx.globalAlpha = p;
      figs.forEach(function (f, i) {
        drawHuman(ctx, f.x, f.y, fSz, '#555555', PASTELS[i], SIN);
        drawSinOrb(ctx, f.x, chestY(f.y, fSz), sinR);
      });
      ctx.restore();

      /* Christ */
      ctx.save(); ctx.globalAlpha = p;
      ctx.shadowBlur = cSz * 0.08; ctx.shadowColor = TEAL;
      drawChrist(ctx, cp.x, cp.y, cSz);
      ctx.restore();

      if (p < 1 || xP < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 6: State 4b — sin-orbs rise to Christ, Christ darkens, Spirit rises ── */
  window.VISUALS.orbState4b = function (ctx, w, h) {
    var cp      = christXY(w, h);
    var figs    = figPositions(w, h);
    var fSz   = Math.min(w, h) * CONFIG.FIGURE_SIZE;
    var cSz   = Math.min(w, h) * CONFIG.CHRIST_SIZE;
    var sinR  = fSz * 0.25 * CONFIG.SIN_ORB_RATIO;
    var cOrbR   = cSz * 0.25 * CONFIG.CENTRE_RATIO;
    var crossLW = Math.min(w, h) * CONFIG.CROSS_LINE_SCALE;
    var crossH  = cSz * CONFIG.CROSS_H_RATIO;
    var crossW  = cSz * CONFIG.CROSS_W_RATIO;
    var TRAVEL  = 1600;
    var SPIRIT  = 900;
    var running = true, t0 = null;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var elapsed = ts - t0;
      var tP = easeOut(Math.min(elapsed / TRAVEL, 1));
      var sP = easeOut(Math.min(Math.max((elapsed - TRAVEL) / SPIRIT, 0), 1));

      ctx.clearRect(0, 0, w, h);
      drawCross(ctx, cp.x, cp.y, crossW, crossH, CONFIG.CROSS_LINE_ALPHA, crossLW);

      /* Lines */
      ctx.save();
      ctx.strokeStyle = LINE_COL; ctx.lineWidth = 1; ctx.globalAlpha = 0.35;
      figs.forEach(function (f) {
        ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(f.x, f.y); ctx.stroke();
      });
      ctx.restore();

      /* Figures — sin-orb shrinks and travels; chest becomes hollow white */
      figs.forEach(function (f, i) {
        drawHuman(ctx, f.x, f.y, fSz, '#555555', PASTELS[i], SIN);
        var cy2 = chestY(f.y, fSz);
        if (tP < 1) {
          /* Orb in transit: show at interpolated position */
          var bx = f.x  + (cp.x - f.x)  * tP;
          var by = cy2 + (cp.y - cy2) * tP;
          drawSinOrb(ctx, bx, by, sinR * (1 - tP * 0.4));
        }
        /* Hollow white chest once orb has left */
        if (tP > 0.45) {
          var a = Math.min((tP - 0.45) / 0.55, 1);
          ctx.save();
          ctx.globalAlpha = a;
          ctx.beginPath(); ctx.arc(f.x, cy2, sinR * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF'; ctx.fill();
          ctx.restore();
        }
      });

      /* Christ: body drawn first so pearl fill doesn't cover the gold dot */
      drawHuman(ctx, cp.x, cp.y, cSz, TEAL, PEARL, TEAL);
      if (tP > 0) {
        ctx.save();
        ctx.globalAlpha = tP;
        drawHuman(ctx, cp.x, cp.y, cSz, TEAL, '#0D0D0D', '#0D0D0D');
        ctx.restore();
      }
      ctx.save();
      ctx.globalAlpha = 1 - tP;
      drawGoldCentre(ctx, cp.x, chestY(cp.y, cSz), cOrbR);
      ctx.restore();

      /* Spirit: pearl outer, gold centre — rises from Christ */
      if (sP > 0) {
        var spiritR = cOrbR * 0.85;
        var spiritY = cp.y - sP * h * 0.22;
        drawSpiritOrb(ctx, cp.x, spiritY, spiritR);
      }

      if (elapsed < TRAVEL + SPIRIT) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 7: State 5 — Spirit descends, Christ restores, hearts flow to figures ── */
  window.VISUALS.orbState5 = function (ctx, w, h) {
    var cp       = christXY(w, h);
    var figs     = figPositions(w, h);
    var fSz      = Math.min(w, h) * CONFIG.FIGURE_SIZE;
    var cSz      = Math.min(w, h) * CONFIG.CHRIST_SIZE;
    var cOrbR  = cSz * 0.25 * CONFIG.CENTRE_RATIO;
    var heartS = fSz * 0.25 * CONFIG.HEART_CHEST_RATIO;
    var sinR   = fSz * 0.25 * CONFIG.SIN_ORB_RATIO;

    /* Phase timing (ms) */
    var T_SPIRIT  = 900;            /* spirit descends         */
    var T_RESTORE = T_SPIRIT + 600; /* Christ restores         */
    var T_FLOW    = T_RESTORE + 200;/* hearts begin flowing    */
    var T_END     = T_FLOW + 1800;
    var running   = true, t0 = null;

    /* Spirit starts at its risen position from State 4b */
    var spiritStartY = cp.y - h * 0.22;
    var spiritR      = cOrbR * 0.85;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var el = ts - t0;

      var spP  = easeOut(Math.min(el / T_SPIRIT, 1));                              /* 0→1 spirit descending  */
      var reP  = easeOut(Math.min(Math.max((el - T_SPIRIT) / 600, 0), 1));        /* 0→1 Christ restoring   */
      var flP  = easeOut(Math.min(Math.max((el - T_FLOW)   / 1800, 0), 1));       /* 0→1 hearts flowing     */

      ctx.clearRect(0, 0, w, h);
      drawFaintRays(ctx, cp.x, cp.y, w, h, 0.08);

      /* Lines — shift from grey to teal as each figure transforms */
      figs.forEach(function (f, i) {
        var figT = easeOut(Math.min(Math.max((flP - i * 0.10) / 0.3, 0), 1));
        ctx.save();
        ctx.strokeStyle = figT > 0.5 ? TEAL : LINE_COL;
        ctx.globalAlpha = figT > 0.5 ? 0.45 : 0.35;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(f.x, f.y); ctx.stroke();
        ctx.restore();
      });

      /* Figures */
      figs.forEach(function (f, i) {
        var figT     = easeOut(Math.min(Math.max((flP - i * 0.10) / 0.3, 0), 1));
        var stroke   = figT > 0.5 ? TEAL : '#555555';
        var hFill    = figT > 0.5 ? TEAL : SIN;
        var cy2      = chestY(f.y, fSz);
        drawHuman(ctx, f.x, f.y, fSz, stroke, PASTELS[i], hFill);

        /* Hollow white chest — fades out as heart arrives */
        if (figT < 1) {
          ctx.save();
          ctx.globalAlpha = 1 - figT;
          ctx.beginPath(); ctx.arc(f.x, cy2, sinR * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF'; ctx.fill();
          ctx.restore();
        }

        /* Travelling heart, then landed heart — stagger 0.10 + travel 0.60 ensures all 5 land */
        var hP = Math.min(Math.max((flP - i * 0.10) / 0.60, 0), 1);
        if (hP > 0 && hP < 1) {
          ctx.save(); ctx.globalAlpha = 0.9;
          drawHeartOrb(ctx, cp.x + (f.x - cp.x) * hP, cp.y + (f.y - cp.y) * hP, heartS);
          ctx.restore();
        } else if (hP >= 1) {
          drawHeartOrb(ctx, f.x, cy2, heartS);
        }
      });

      /* Christ — starts fully dark, body + head restore as Spirit arrives */
      drawHuman(ctx, cp.x, cp.y, cSz, TEAL, PEARL, TEAL);
      if (reP < 1) {
        ctx.save();
        ctx.globalAlpha = 1 - reP;
        drawHuman(ctx, cp.x, cp.y, cSz, TEAL, '#0D0D0D', '#0D0D0D');
        ctx.restore();
      }
      ctx.save();
      ctx.globalAlpha = reP;
      drawGoldCentre(ctx, cp.x, chestY(cp.y, cSz), cOrbR);
      ctx.restore();

      /* Spirit — drawn after Christ so it stays visible in front as it descends */
      if (spP < 1) {
        var spirY = spiritStartY + (cp.y - spiritStartY) * spP;
        drawSpiritOrb(ctx, cp.x, spirY, spiritR);
      }

      if (el < T_END) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 8: Assembly — 5 figures move to ring circumference; Christ stays ── */
  /*
   * Phase 1 (T_MOVE): 5 figures glide from their row to evenly-spaced positions on
   *   the body-circle circumference. Symmetric mapping preserves left-right order:
   *   outer figures wrap inward+upward to the top arc; inner pair land on the lower
   *   arc; centre figure drops to the bottom. Lines from Christ fade during travel.
   *   Christ stays at christXY throughout — he never moves.
   * Phase 2 (T_RING): two matching teal rings fade in with identical lineWidth:
   *   (a) body perimeter ring — the circle the figures stand on,
   *   (b) enclosing ring around Christ's whole figure.
   *
   * Ring centre at h×0.62 so Christ sits above it with a clear gap.
   * Commented-out code (containing-orb) preserved for later use.
   */
  window.VISUALS.orbState5Held = function (ctx, w, h) {
    var cp     = christXY(w, h);
    var figs   = figPositions(w, h);
    var fSz = Math.min(w, h) * CONFIG.FIGURE_SIZE;
    var cSz = Math.min(w, h) * CONFIG.CHRIST_SIZE;

    var aBodyR  = Math.min(w, h) * 0.22;
    var aBodyCx = w / 2;
    var aBodyCy = h * 0.62;  /* pushed down so Christ reads as head above the ring */

    /* Symmetric pentagon:
       fig[0]=upper-left(234°)  fig[1]=lower-left(162°)  fig[2]=bottom(90°)
       fig[3]=lower-right(18°)  fig[4]=upper-right(306°)  */
    var ANGLES  = [234, 162, 90, 18, 306].map(function (d) { return d * Math.PI / 180; });
    var targets = figs.map(function (_, i) {
      return { x: aBodyCx + aBodyR * Math.cos(ANGLES[i]),
               y: aBodyCy + aBodyR * Math.sin(ANGLES[i]) };
    });

    /* Enclosing ring: spans Christ's full head+body extent */
    var christRingR  = cSz * 0.46;
    var christRingCy = cp.y - cSz * 0.04;

    var T_MOVE = 1200;
    var T_RING = T_MOVE + 700;

    var running = true, t0 = null;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var el  = ts - t0;
      var mvP = easeOut(Math.min(el / T_MOVE, 1));
      var rnP = easeOut(Math.min(Math.max((el - T_MOVE) / 700, 0), 1));

      ctx.clearRect(0, 0, w, h);
      drawFaintRays(ctx, cp.x, cp.y, w, h, 0.07);

      /* Phase 2: rings drawn first — behind figures and Christ */
      if (rnP > 0) {
        ctx.save();
        ctx.globalAlpha = rnP * 0.65;
        drawRing(ctx, aBodyCx, aBodyCy, aBodyR, TEAL);
        drawRing(ctx, cp.x, christRingCy, christRingR, TEAL);
        ctx.restore();
      }

      /* Lines from Christ to figures — fade during travel */
      ctx.save();
      ctx.strokeStyle = TEAL; ctx.lineWidth = 1;
      figs.forEach(function (f, i) {
        var fx = f.x + (targets[i].x - f.x) * mvP;
        var fy = f.y + (targets[i].y - f.y) * mvP;
        ctx.globalAlpha = 0.38 * (1 - mvP);
        ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(fx, fy); ctx.stroke();
      });
      ctx.restore();

      /* 5 church figures — glide from row to ring circumference */
      figs.forEach(function (f, i) {
        var fx = f.x + (targets[i].x - f.x) * mvP;
        var fy = f.y + (targets[i].y - f.y) * mvP;
        drawChurchFig(ctx, fx, fy, fSz, PASTELS[i]);
      });

      /* Christ — stays at his position, drawn last (in front) */
      ctx.save();
      ctx.shadowBlur  = cSz * 0.08; ctx.shadowColor = TEAL;
      drawChrist(ctx, cp.x, cp.y, cSz);
      ctx.restore();

      /*
       * COMMENTED OUT — containing-orb expansion (preserved for later use)
       *
       * var maxR = (Math.abs(figs[0].x - cp.x) + fSz * 0.65) * 1.18;
       * var bigR = maxR * p;
       * if (bigR > 2) {
       *   ctx.save();
       *   ctx.globalAlpha = p * 0.7;
       *   ctx.shadowBlur  = bigR * 0.18; ctx.shadowColor = GOLD;
       *   var gGrad = ctx.createRadialGradient(cp.x, cp.y, bigR * 0.78, cp.x, cp.y, bigR);
       *   gGrad.addColorStop(0, GOLD + '55');
       *   gGrad.addColorStop(1, GOLD_DK + '11');
       *   ctx.beginPath(); ctx.arc(cp.x, cp.y, bigR, 0, Math.PI * 2);
       *   ctx.fillStyle = gGrad; ctx.fill();
       *   ctx.beginPath(); ctx.arc(cp.x, cp.y, bigR * 0.84, 0, Math.PI * 2);
       *   ctx.fillStyle = 'rgba(238,242,255,0.05)'; ctx.fill();
       *   ctx.beginPath(); ctx.arc(cp.x, cp.y, bigR * 0.06, 0, Math.PI * 2);
       *   ctx.fillStyle = TEAL; ctx.fill();
       *   ctx.restore();
       * }
       */

      if (el < T_RING) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Final beat: gold rays from Christ through each church figure — "ALL" ── */
  window.VISUALS.orbStateAll = function (ctx, w, h) {
    var cp   = christXY(w, h);
    var fSz  = Math.min(w, h) * CONFIG.FIGURE_SIZE;
    var cSz  = Math.min(w, h) * CONFIG.CHRIST_SIZE;

    var aBodyR   = Math.min(w, h) * CONFIG.LARGE_ORB_SCALE;
    var aBodyCx  = w / 2;
    var aBodyCy  = h * 0.62;
    var christRingR  = cSz * 0.46;
    var christRingCy = cp.y - cSz * 0.04;

    /* Figure target positions (same pentagon as orbState5Held) */
    var ANGLES  = [234, 162, 90, 18, 306].map(function (d) { return d * Math.PI / 180; });
    var targets = ANGLES.map(function (a) {
      return { x: aBodyCx + aBodyR * Math.cos(a), y: aBodyCy + aBodyR * Math.sin(a) };
    });

    /* Ray directions: from Christ normalised toward each figure — rays pass through them */
    var rayDirs = targets.map(function (t) {
      var dx = t.x - cp.x, dy = t.y - cp.y;
      var d  = Math.sqrt(dx * dx + dy * dy);
      return { dx: dx / d, dy: dy / d };
    });

    var maxLen   = Math.sqrt(w * w + h * h) * 0.54;
    var tipHW    = Math.min(w, h) * CONFIG.RAY_TIP_WIDTH;
    var DURATION = 2400;
    var running  = true, t0 = null;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var p = easeOut(Math.min((ts - t0) / DURATION, 1));

      ctx.clearRect(0, 0, w, h);
      drawFaintRays(ctx, cp.x, cp.y, w, h, 0.07);

      /* Static final state: rings */
      ctx.save();
      ctx.globalAlpha = 0.65;
      drawRing(ctx, aBodyCx, aBodyCy, aBodyR, TEAL);
      drawRing(ctx, cp.x, christRingCy, christRingR, TEAL);
      ctx.restore();

      /* Church figures at final ring positions */
      targets.forEach(function (t, i) {
        drawChurchFig(ctx, t.x, t.y, fSz, PASTELS[i]);
      });

      /* Christ */
      ctx.save();
      ctx.shadowBlur = cSz * 0.08; ctx.shadowColor = TEAL;
      drawChrist(ctx, cp.x, cp.y, cSz);
      ctx.restore();

      /* Gold rays — drawn last, on top, passing through the figures */
      rayDirs.forEach(function (ray) {
        var len  = maxLen * p;
        var tipX = cp.x + ray.dx * len;
        var tipY = cp.y + ray.dy * len;
        var px   = -ray.dy, py = ray.dx;
        var hw   = tipHW * p;

        ctx.save();
        ctx.globalAlpha = 0.45 * p;
        ctx.shadowBlur  = hw * 2; ctx.shadowColor = GOLD;
        ctx.fillStyle   = GOLD;
        ctx.beginPath();
        ctx.moveTo(cp.x, cp.y);
        ctx.lineTo(tipX - px * hw, tipY - py * hw);
        ctx.lineTo(tipX + px * hw, tipY + py * hw);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        /* "ALL" text at 40% along the ray */
        if (len > cSz * 1.5) {
          var midX     = cp.x + ray.dx * len * 0.40;
          var midY     = cp.y + ray.dy * len * 0.40;
          var angle    = Math.atan2(ray.dy, ray.dx);
          if (Math.cos(angle) < 0) angle += Math.PI;
          var fontSize = Math.min(w, h) * 0.022;
          ctx.save();
          ctx.globalAlpha   = p * 0.85;
          ctx.translate(midX, midY);
          ctx.rotate(angle);
          ctx.font          = '300 ' + fontSize + 'px Inter, sans-serif';
          ctx.fillStyle     = PEARL;
          ctx.textAlign     = 'center';
          ctx.textBaseline  = 'middle';
          ctx.letterSpacing = '0.18em';
          ctx.fillText('ALL', 0, 0);
          ctx.restore();
        }
      });

      if (p < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

}());
