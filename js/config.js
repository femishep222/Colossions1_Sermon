/* config.js — timing and layout parameters */

var CONFIG = {

  /* ── Durations (ms) ────────────────────────────────────────────────────────
     Roughly in beat order; multi-beat constants at the top                  */
  AUTO_REPLAY_MS:        33000,  /* ms of inactivity before current beat auto-replays */
  SPIRIT_PULSE_MS:       12000,   /* period of the Spirit band radial love-pulse (ms) */

  ORB_CROSSFADE:         5500,   /* orb state transitions (beats 3–5)        */
  FIGURE_FADE_IN:        8800,   /* figures fading in (beats 4–5)            */
  CROSS_DURATION:        1100,   /* cross arms extend from centre (beat 6)   */
  BLOOD_DURATION:        9900,   /* blood drops travel Christ → figures (beat 6) */
  SIN_ORB_TRAVEL:        9900,   /* sin orbs travel figures → Christ (beat 6a) */
  SPIRIT_RISE:           5500,   /* Spirit rises from Christ (beat 6a)       */
  SPIRIT_DESCEND:        5500,   /* Spirit descends back to Christ (beat 7)  */
  CHRIST_RESTORE:        3300,   /* Christ restores to full colour (beat 7)  */
  SPIRIT_FLOW:           5500,   /* gold dots travel Christ → figures (beat 7) */
  ASSEMBLE_MOVE:         5500,   /* figures move to ring positions (beat 8)  */
  ASSEMBLE_MERGE:        5500,   /* figures merge into assembled body (beat 8) */
  ASSEMBLE_HEAD_APPEAR:  3300,    /* Christ head appears above body (beat 8)  */
  RAY_EXTEND_DURATION:   5500,   /* gold rays extend through figures (beat 8a) */
  HEART_FLOW:            3300,   /* (legacy — kept for reference)            */

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
  CHRIST_SIZE:           0.17,   /* Christ figure size as fraction of min(w,h) */
  FIGURES_Y:             0.72,   /* figure row Y as fraction of h            */
  FIGURES_GAP:           0.13,   /* gap between figures as fraction of w     */
  FIGURE_SIZE:           0.13,   /* church figure size as fraction of min(w,h) */
  FIGURE_STAGGER:        0.12,   /* animation stagger between figures        */
  HEAD_GAP_RATIO:        -0.03,   /* head–body gap as fraction of body radius */
  HEART_CHEST_RATIO:     0.56,   /* (legacy) heart radius / body radius      */
  ASSEMBLE_SCALE:        0.29,   /* assembled body radius = min(w,h) × this  */
  ASSEMBLE_Y:            0.50,   /* assembled body centre Y as fraction of h */

};
