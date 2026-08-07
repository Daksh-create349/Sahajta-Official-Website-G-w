/**
 * Coarse "can this machine afford a continuous full-screen effect" check.
 *
 * The hero aurora (animated gradient under a 14px blur and mix-blend-difference)
 * and the footer dither (a 4-octave fbm shader plus a post pass) both repaint
 * every frame for as long as they are on screen. On a discrete GPU that is free;
 * on the integrated graphics in a budget laptop it is most of a frame budget,
 * which is what makes scrolling past those two sections feel heavy.
 *
 * deviceMemory and hardwareConcurrency are advisory and absent in Safari, so a
 * missing value is treated as capable — this only ever downgrades machines that
 * positively report themselves as small.
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === 'number' && cores > 0 && cores <= 4) return true;

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof memory === 'number' && memory > 0 && memory <= 4) return true;

  return false;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
