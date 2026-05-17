/* config.js — timing and layout parameters */

var CONFIG = {
  /* Animation durations (ms) */
  RAY_EXTEND_DURATION:   3300,
  ORB_CROSSFADE:         3300,
  FIGURE_FADE_IN:        3300,
  SIN_ORB_TRAVEL:        3300,
  SPIRIT_RISE:           3300,
  SPIRIT_DESCEND:        3300,
  CHRIST_RESTORE:        3300,
  HEART_FLOW:            3300,
  ASSEMBLE_MOVE:         3300,
  ASSEMBLE_MERGE:        3300,
  ASSEMBLE_HEAD_APPEAR:  500,

  /* Ring proportions — same structure whether the outer is gold (orb) or teal (Christ/figures) */
  BAND_RATIO:                 0.33,  /* outer ring width / outer radius — gold band in orb AND teal band in figures */
  CENTRE_RATIO:               0.33,  /* inner circle radius / outer radius: teal-in-orb AND gold-in-Christ */

  /* Figure proportions
     Head radius = bR × CENTRE_RATIO  (head IS the centre of the figure, as teal/gold dot is the centre of the orb/body)
     Head gap    = bR × BAND_RATIO    (one band-width of clear space between head bottom and body top — derived, no extra param)
     Heart is intentionally 1.7× the gold dot (HEART_CHEST_RATIO vs CENTRE_RATIO) — intimacy > cosmic principle
     Sin-orb is intentionally 1.6× (weight and opacity of sin vs. light) */
  HEART_CHEST_RATIO:          0.56,  /* heart radius / body radius — deliberately larger than CENTRE_RATIO */
  SIN_ORB_RATIO:              0.52,  /* sin-orb radius / body radius — deliberately larger than CENTRE_RATIO */
  LARGE_ORB_SCALE:       0.22,   /* orb radius = min(w,h) * this */
  ORB_CENTRE_Y:          0.59,   /* vertical centre for beats 3–5 orb/figure, as fraction of h (push down to clear title) */
  IMAGE_TOP_PAD:         0.10,   /* fraction of h to reserve at top for section-title overlay on image beats */
  CROSS_LINE_ALPHA:      0.65,   /* opacity of the bold cross background in beats 6–7 */
  CROSS_LINE_SCALE:      0.0175, /* cross line width as fraction of min(w,h) — intentionally heavy */
  CROSS_H_RATIO:         0.50,   /* cross half-height / Christ-figure size (vertical arm) */
  CROSS_W_RATIO:         0.38,   /* cross half-width  / Christ-figure size (horizontal arm, narrower) */
  CROSS_DURATION:        1200,   /* ms for cross arms to extend from centre */
  RAY_TIP_WIDTH:         0.07,   /* ray half-width at tip as fraction of min(w,h) — 0 = hairline, grows outward */

  /* Layout ratios (fraction of Math.min(w,h) unless noted) */
  FIGURE_STAGGER:        0.12,   /* stagger between figure animations */
  CHRIST_Y:              0.30,   /* Christ figure Y as fraction of h */
  FIGURES_Y:             0.68,   /* figure row Y as fraction of h */
  FIGURES_GAP:           0.13,   /* gap between figures as fraction of w */
  CHRIST_SIZE:           0.14,   /* Christ figure size */
  FIGURE_SIZE:           0.11,   /* Church figure size */
  ASSEMBLE_SCALE:        0.22,   /* assembled body radius = min(w,h) * this */
  ASSEMBLE_Y:            0.50,   /* assembled body centre Y as fraction of h */
};
