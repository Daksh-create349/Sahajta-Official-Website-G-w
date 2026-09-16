import Lenis from 'lenis';

export const lenisRef: { current: Lenis | null } = { current: null };

export function initLenis(): Lenis {
  if (lenisRef.current) return lenisRef.current;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const lenis = new Lenis({
    // lerp is frame-rate independent in Lenis, so a 60Hz laptop and a 144Hz
    // desktop settle over the same wall-clock time. `duration` + easing is not:
    // it restarts a tween on every wheel event, which reads as rubber-banding
    // when events arrive faster than the tween can finish.
    lerp: 0.12,
    smoothWheel: !reduced,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    // Native touch scrolling is already smooth and compositor-driven; running it
    // through JS is what makes low-end phones drop frames.
    syncTouch: false,
    // Lenis drives its own rAF, so nothing here has to be torn down by hand.
    autoRaf: true,
  });

  lenisRef.current = lenis;
  return lenis;
}

export function destroyLenis(): void {
  lenisRef.current?.destroy();
  lenisRef.current = null;
}

export function scrollToTarget(
  target: string | HTMLElement | number,
  options?: { offset?: number; immediate?: boolean; duration?: number }
) {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, options);
  } else {
    if (typeof target === 'number') {
      window.scrollTo({
        top: target,
        behavior: options?.immediate ? 'auto' : 'smooth',
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        if (options?.offset !== undefined) {
          const top = el.getBoundingClientRect().top + window.scrollY + (options.offset || 0);
          window.scrollTo({
            top,
            behavior: options?.immediate ? 'auto' : 'smooth',
          });
        } else {
          el.scrollIntoView({
            behavior: options?.immediate ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      }
    }
  }
}
