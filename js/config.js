/* config.js — timing and layout parameters */

var CONFIG = {

  /* ── Master duration dial ───────────────────────────────────────────────── */
  ANIM_DURATION:          13000,  /* scale all animation durations — one knob to rule them all */
  SPIRIT_PULSE_MS:        12000,  /* Spirit band pulse period — runs independently of animations */
  STAGE1_AUTO_ADVANCE_MS: 13000,  /* ms after scriptureA appears before visual auto-plays (0 = off) */

  /* ── Orb & ring proportions ────────────────────────────────────────────── */
  BAND_RATIO:            0.33,   /* outer ring width / outer radius (gold orb + figure bodies) */
  CENTRE_RATIO:          0.33,   /* inner circle radius / outer radius (teal in orb, gold in figures) */
  LARGE_ORB_SCALE:       0.29,   /* orb radius = min(w,h) × this (beats 3–9) */
  ORB_CENTRE_Y:          0.50,   /* orb vertical centre as fraction of h (beats 3–9) */

  /* ── Figure & scene layout ─────────────────────────────────────────────── */
  IMAGE_TOP_PAD:         0.04,   /* top padding for image beats (beats 1–2)  */
  SIN_ORB_RATIO:         0.52,   /* sin-orb radius / body radius (beats 6–6a) */
  CROSS_LINE_ALPHA:      0.65,   /* cross opacity (beats 6–7)                */
  CROSS_LINE_SCALE:      0.0175, /* cross line width as fraction of min(w,h) */
  CROSS_H_RATIO:         0.50,   /* cross vertical arm / Christ-figure size  */
  CROSS_W_RATIO:         0.38,   /* cross horizontal arm / Christ-figure size */
  RAY_TIP_WIDTH:         0.07,   /* ray tip half-width as fraction of min(w,h) */
  CHRIST_Y:              0.28,   /* Christ figure Y as fraction of h         */
  CHRIST_SIZE:           0.28,   /* Christ figure size as fraction of min(w,h) */
  FIGURES_Y:             0.72,   /* figure row Y as fraction of h            */
  FIGURES_GAP:           0.16,   /* gap between figures as fraction of w     */
  FIGURE_SIZE:           0.22,   /* church figure size as fraction of min(w,h) */
  FIGURE_STAGGER:        0.12,   /* animation stagger between figures        */
  HEAD_GAP_RATIO:        -0.03,  /* head–body gap as fraction of body radius */
  HEART_CHEST_RATIO:     0.56,   /* (legacy) heart radius / body radius      */
  ASSEMBLE_SCALE:        0.29,   /* assembled body radius = min(w,h) × this  */
  ASSEMBLE_Y:            0.50,   /* assembled body centre Y as fraction of h */

};

/* Named duration constants derived from ANIM_DURATION — tweak the master dial above */
CONFIG.FIGURE_FADE_IN = CONFIG.ANIM_DURATION * 1.6;   /* figures fading in (beats 4–5)            */
CONFIG.CROSS_DURATION = CONFIG.ANIM_DURATION * 0.2;   /* cross arms extend from centre (beat 6)   */
CONFIG.BLOOD_DURATION = CONFIG.ANIM_DURATION * 1.8;   /* blood drops travel Christ → figures      */
CONFIG.SIN_ORB_TRAVEL = CONFIG.ANIM_DURATION * 1.8;   /* sin orbs travel figures → Christ         */
CONFIG.SPIRIT_RISE    = CONFIG.ANIM_DURATION * 1.0;   /* Spirit rises from Christ (beat 6a)       */
CONFIG.SPIRIT_FLOW    = CONFIG.ANIM_DURATION * 1.0;   /* gold dots travel Christ → figures (beat 7) */
