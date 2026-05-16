/* config.js — timing and layout parameters */

var CONFIG = {
  /* Animation durations (ms) */
  RAY_EXTEND_DURATION:   2400,
  ORB_CROSSFADE:         1800,
  FIGURE_FADE_IN:         800,
  SIN_ORB_TRAVEL:        1600,
  SPIRIT_RISE:            900,
  SPIRIT_DESCEND:         900,
  CHRIST_RESTORE:         600,
  HEART_FLOW:            1800,
  ASSEMBLE_MOVE:         1200,
  ASSEMBLE_MERGE:         800,
  ASSEMBLE_HEAD_APPEAR:   500,

  /* Ring proportions — same structure whether the outer is gold (orb) or teal (Christ/figures) */
  BAND_RATIO:                 0.15,  /* outer ring width / outer radius — gold band in orb AND teal band in figures */
  CENTRE_RATIO:               0.33,  /* inner circle radius / outer radius: teal-in-orb AND gold-in-Christ */

  /* Figure proportions */
  HEAD_BODY_RATIO:            0.45,  /* head circle radius / body circle radius (drawHuman) */
  HEAD_Y_OFFSET:              0.22,  /* head centre Y above figure centre, as fraction of size (drawHuman) */
  HEART_CHEST_RATIO:          0.56,  /* heart-orb radius / body circle radius (drawChurchFig) */
  SIN_ORB_RATIO:              0.52,  /* sin-orb radius / body circle radius (orbState4a/4b) */
  LARGE_ORB_SCALE:       0.22,   /* orb radius = min(w,h) * this */

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
