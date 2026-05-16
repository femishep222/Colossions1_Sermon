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
    var gGrad = ctx.createRadialGradient(cx, cy, r * 0.52, cx, cy, r);
    gGrad.addColorStop(0, GOLD);
    gGrad.addColorStop(1, GOLD_DK);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = gGrad;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.67, 0, Math.PI * 2);
    ctx.fillStyle = PEARL;
    ctx.fill();

    ctx.shadowBlur  = r * 0.35;
    ctx.shadowColor = TEAL;
    var tGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.3);
    tGrad.addColorStop(0, TEAL_LT);
    tGrad.addColorStop(1, TEAL);
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = tGrad;
    ctx.fill();

    ctx.restore();
  }

  /* Post-incarnation / indwelling orb: Teal outer ring, Pearl fill, Gold centre */
  function drawOrbInverted(ctx, cx, cy, r) {
    ctx.save();

    ctx.shadowBlur  = r * 0.65;
    ctx.shadowColor = TEAL;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = TEAL;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.67, 0, Math.PI * 2);
    ctx.fillStyle = PEARL;
    ctx.fill();

    ctx.shadowBlur  = r * 0.35;
    ctx.shadowColor = GOLD;
    var gGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.3);
    gGrad.addColorStop(0, '#FFD94A');
    gGrad.addColorStop(1, GOLD_DK);
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = gGrad;
    ctx.fill();

    ctx.restore();
  }

  /* Human figure — small head circle + larger body circle
     headFill defaults to strokeCol (solid) if omitted */
  function drawHuman(ctx, cx, cy, size, strokeCol, fillCol, headFill) {
    var hR     = size * 0.15;
    var bR     = size * 0.25;
    var headCy = cy - size * 0.24;
    var bodyCy = cy + size * 0.14;
    var lw     = Math.max(1.5, size * 0.025);
    var hFill  = (headFill !== undefined) ? headFill : strokeCol;

    ctx.save();
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth   = lw;

    /* Body circle */
    ctx.beginPath();
    ctx.arc(cx, bodyCy, bR, 0, Math.PI * 2);
    ctx.fillStyle = fillCol;
    ctx.fill();
    ctx.stroke();

    /* Head circle — solid, matches outline colour by default */
    ctx.beginPath();
    ctx.arc(cx, headCy, hR, 0, Math.PI * 2);
    ctx.fillStyle = hFill;
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  /* Chest = centre of the body circle */
  function chestY(cy, size) { return cy + size * 0.14; }

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
  function drawFaintRays(ctx, cx, cy, w, h, alpha) {
    var maxLen = Math.sqrt(w * w + h * h);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = TEAL;
    ctx.lineWidth   = 1;
    [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(function (d) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + d[0] * maxLen, cy + d[1] * maxLen);
      ctx.stroke();
    });
    ctx.restore();
  }

  /* Layout: 5 figures in a row below centre */
  function figPositions(w, h) {
    var rowY = h * 0.68, gap = w * 0.13, cx = w * 0.5;
    return [
      { x: cx - gap * 2, y: rowY },
      { x: cx - gap,     y: rowY },
      { x: cx,           y: rowY },
      { x: cx + gap,     y: rowY },
      { x: cx + gap * 2, y: rowY }
    ];
  }

  /* Christ sits above the row */
  function christXY(w, h) { return { x: w * 0.5, y: h * 0.3 }; }

  /* Cubic ease-out: 0→1 */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  /* ─────────────────────────────────────────────
     VISUAL FUNCTIONS
     Each accepts (ctx, w, h) and may return a
     cancel function to stop its animation loop.
  ───────────────────────────────────────────── */

  window.VISUALS = {};

  /* ── Beat 1: introduce the orb, full-screen, still ── */
  window.VISUALS.orbIntro = function (ctx, w, h) {
    var r = Math.min(w, h) * 0.28;
    drawOrb(ctx, w / 2, h / 2, r);
    return null;
  };

  /* ── Beat 2: State 1 — still orb, "Before time" ── */
  window.VISUALS.orbState1 = function (ctx, w, h) {
    var r = Math.min(w, h) * 0.22;
    drawOrb(ctx, w / 2, h / 2, r);
    return null;
  };

  /* ── Beat 3: State 2 — orb + 4 rays extending outward ── */
  window.VISUALS.orbState2 = function (ctx, w, h) {
    var cx = w / 2, cy = h / 2;
    var r  = Math.min(w, h) * 0.15;
    var maxLen = Math.sqrt(w * w + h * h) * 0.54;
    var DURATION = 2400;
    var running = true, t0 = null;

    var rays = [
      { dx:  0, dy: -1, tag: 'star'  },
      { dx:  1, dy:  0, tag: 'eq'    },
      { dx:  0, dy:  1, tag: 'wave'  },
      { dx: -1, dy:  0, tag: 'dna'   }
    ];

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
      }
      ctx.restore();
    }

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var p = easeOut(Math.min((ts - t0) / DURATION, 1));

      ctx.clearRect(0, 0, w, h);

      rays.forEach(function (ray) {
        var len = maxLen * p;
        ctx.save();
        ctx.globalAlpha = 0.5 * p;
        ctx.shadowBlur  = 5; ctx.shadowColor = TEAL;
        ctx.strokeStyle = TEAL; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + ray.dx * len, cy + ray.dy * len);
        ctx.stroke();
        ctx.restore();

        if (p > 0.72) {
          var a = (p - 0.72) / 0.28;
          ctx.save();
          ctx.globalAlpha = a * 0.8;
          var sz = Math.min(w, h) * 0.027;
          drawSymbol(ctx, cx + ray.dx * len, cy + ray.dy * len, ray.tag, sz);
          ctx.restore();
        }
      });

      drawOrb(ctx, cx, cy, r);

      if (p < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 4: State 3 — orb transitions to human silhouette ── */
  window.VISUALS.orbState3 = function (ctx, w, h) {
    var cx = w / 2, cy = h / 2;
    var bigR = Math.min(w, h) * 0.22;
    var figH = Math.min(w, h) * 0.58;
    var cOrbR = figH * 0.08;
    var DURATION = 1800;
    var running = true, t0 = null;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var p = easeOut(Math.min((ts - t0) / DURATION, 1));

      ctx.clearRect(0, 0, w, h);
      drawFaintRays(ctx, cx, cy, w, h, 0.12);

      /* Orb fading out */
      ctx.save();
      ctx.globalAlpha = 1 - p;
      drawOrb(ctx, cx, cy, bigR);
      ctx.restore();

      /* Figure fading in — teal outline, pearl fill */
      ctx.save();
      ctx.globalAlpha = p;
      ctx.shadowBlur  = figH * 0.05;
      ctx.shadowColor = TEAL;
      drawHuman(ctx, cx, cy, figH, TEAL, PEARL, TEAL);
      var cy2 = chestY(cy, figH);
      ctx.shadowBlur  = cOrbR * 0.5;
      ctx.shadowColor = GOLD;
      var gGrad = ctx.createRadialGradient(cx, cy2, 0, cx, cy2, cOrbR);
      gGrad.addColorStop(0, '#FFD94A');
      gGrad.addColorStop(1, GOLD_DK);
      ctx.beginPath();
      ctx.arc(cx, cy2, cOrbR, 0, Math.PI * 2);
      ctx.fillStyle = gGrad;
      ctx.fill();
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
    var fSz   = Math.min(w, h) * 0.11;
    var cSz   = Math.min(w, h) * 0.14;
    var sinR  = fSz * 0.13;
    var cOrbR = cSz * 0.15;
    var DURATION = 800;
    var running = true, t0 = null;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var p = easeOut(Math.min((ts - t0) / DURATION, 1));

      ctx.clearRect(0, 0, w, h);
      drawFaintRays(ctx, cp.x, cp.y, w, h, 0.08);

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
      drawHuman(ctx, cp.x, cp.y, cSz, TEAL, PEARL, TEAL);
      drawOrbInverted(ctx, cp.x, chestY(cp.y, cSz), cOrbR);
      ctx.restore();

      if (p < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 6: State 4b — sin-orbs rise to Christ, Christ darkens, Spirit rises ── */
  window.VISUALS.orbState4b = function (ctx, w, h) {
    var cp      = christXY(w, h);
    var figs    = figPositions(w, h);
    var fSz     = Math.min(w, h) * 0.11;
    var cSz     = Math.min(w, h) * 0.14;
    var sinR    = fSz * 0.13;
    var cOrbR   = cSz * 0.15;
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
      drawFaintRays(ctx, cp.x, cp.y, w, h, 0.08);

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

      /* Christ: orb fades, then entire body + head darkens as orbs arrive */
      ctx.save();
      ctx.globalAlpha = 1 - tP;
      drawOrbInverted(ctx, cp.x, chestY(cp.y, cSz), cOrbR);
      ctx.restore();
      drawHuman(ctx, cp.x, cp.y, cSz, TEAL, PEARL, TEAL);
      if (tP > 0) {
        ctx.save();
        ctx.globalAlpha = tP;
        drawHuman(ctx, cp.x, cp.y, cSz, TEAL, '#0D0D0D', '#0D0D0D');
        ctx.restore();
      }

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
    var fSz      = Math.min(w, h) * 0.11;
    var cSz      = Math.min(w, h) * 0.14;
    var cOrbR    = cSz * 0.15;
    var heartS   = fSz * 0.14;
    var sinR     = fSz * 0.13;

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
        var figT = easeOut(Math.min(Math.max((flP - i * 0.12) / 0.3, 0), 1));
        ctx.save();
        ctx.strokeStyle = figT > 0.5 ? TEAL : LINE_COL;
        ctx.globalAlpha = figT > 0.5 ? 0.45 : 0.35;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(f.x, f.y); ctx.stroke();
        ctx.restore();
      });

      /* Figures */
      figs.forEach(function (f, i) {
        var figT     = easeOut(Math.min(Math.max((flP - i * 0.12) / 0.3, 0), 1));
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

        /* Travelling heart, then landed heart */
        var hP = Math.min(Math.max((flP - i * 0.12) / 0.7, 0), 1);
        if (hP > 0 && hP < 1) {
          ctx.save(); ctx.globalAlpha = 0.9;
          drawHeartOrb(ctx, cp.x + (f.x - cp.x) * hP, cp.y + (f.y - cp.y) * hP, heartS);
          ctx.restore();
        } else if (hP >= 1) {
          drawHeartOrb(ctx, f.x, cy2, heartS);
        }
      });

      /* Spirit — descends from risen position, pearl outer + gold centre */
      if (spP < 1) {
        var spirY = spiritStartY + (cp.y - spiritStartY) * spP;
        drawSpiritOrb(ctx, cp.x, spirY, spiritR);
      }

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
      drawOrbInverted(ctx, cp.x, chestY(cp.y, cSz), cOrbR);
      ctx.restore();

      if (el < T_END) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

  /* ── Beat 8: State 5 held — all figures drawn into the expanded orb ── */
  window.VISUALS.orbState5Held = function (ctx, w, h) {
    var cp     = christXY(w, h);
    var figs   = figPositions(w, h);
    var fSz    = Math.min(w, h) * 0.11;
    var cSz    = Math.min(w, h) * 0.14;
    var cOrbR  = cSz * 0.15;
    var heartS = fSz * 0.14;
    var EXPAND = 1600;
    var running = true, t0 = null;

    /* Radius of the containing orb — just large enough to hold all figures */
    var maxR = (Math.abs(figs[0].x - cp.x) + fSz * 0.65) * 1.18;

    function frame(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      var p = easeOut(Math.min((ts - t0) / EXPAND, 1));

      ctx.clearRect(0, 0, w, h);

      /* Expanding containing orb — transparent gold ring + faint pearl fill */
      var bigR = maxR * p;
      if (bigR > 2) {
        ctx.save();
        ctx.globalAlpha = p * 0.7;
        ctx.shadowBlur  = bigR * 0.18; ctx.shadowColor = GOLD;
        var gGrad = ctx.createRadialGradient(cp.x, cp.y, bigR * 0.78, cp.x, cp.y, bigR);
        gGrad.addColorStop(0, GOLD + '55');
        gGrad.addColorStop(1, GOLD_DK + '11');
        ctx.beginPath(); ctx.arc(cp.x, cp.y, bigR, 0, Math.PI * 2);
        ctx.fillStyle = gGrad; ctx.fill();
        /* Pearl inner haze */
        ctx.beginPath(); ctx.arc(cp.x, cp.y, bigR * 0.84, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(238,242,255,0.05)'; ctx.fill();
        /* Teal inner dot */
        ctx.beginPath(); ctx.arc(cp.x, cp.y, bigR * 0.06, 0, Math.PI * 2);
        ctx.fillStyle = TEAL; ctx.fill();
        ctx.restore();
      }

      /* Lines */
      ctx.save();
      ctx.strokeStyle = TEAL; ctx.lineWidth = 1; ctx.globalAlpha = 0.4 * p;
      figs.forEach(function (f) {
        ctx.beginPath(); ctx.moveTo(cp.x, cp.y); ctx.lineTo(f.x, f.y); ctx.stroke();
      });
      ctx.restore();

      /* Figures */
      ctx.save(); ctx.globalAlpha = p;
      figs.forEach(function (f, i) {
        drawHuman(ctx, f.x, f.y, fSz, TEAL, PASTELS[i], TEAL);
        drawHeartOrb(ctx, f.x, chestY(f.y, fSz), heartS);
      });
      ctx.restore();

      /* Christ */
      ctx.save(); ctx.globalAlpha = p;
      drawHuman(ctx, cp.x, cp.y, cSz, TEAL, PEARL, TEAL);
      drawOrbInverted(ctx, cp.x, chestY(cp.y, cSz), cOrbR);
      ctx.restore();

      if (p < 1) requestAnimationFrame(frame);
      else running = false;
    }
    requestAnimationFrame(frame);
    return function () { running = false; };
  };

}());
