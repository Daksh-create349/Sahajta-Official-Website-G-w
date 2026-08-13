import { useEffect, useRef, useState } from 'react';
import Dither from '@/components/ui/Dither';

/**
 * Decorative WebGL field behind the footer.
 *
 * The Dither component (three.js + postprocessing, ~600 kB) is eagerly imported
 * so the JS chunk is fetched during the preloader phase and the WebGL context is
 * ready before the user ever reaches the footer — no visible pop-in.
 *
 * The render loop is still gated to viewport visibility so the shader burns zero
 * GPU cycles while the footer is off-screen.
 */
export function FooterDither() {
  const hostRef = useRef<HTMLDivElement>(null);
  // Start visible=true to force WebGL shader compilation on mount,
  // preventing a massive lag spike when scrolling to the footer.
  // IntersectionObserver will immediately set it to false if off-screen.
  const [visible, setVisible] = useState(true);
  const [tabActive, setTabActive] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: none), (pointer: coarse)');
    const syncMotion = () => setReduced(motion.matches);
    const syncPointer = () => setCoarse(pointer.matches);
    syncMotion();
    syncPointer();
    motion.addEventListener('change', syncMotion);
    pointer.addEventListener('change', syncPointer);
    return () => {
      motion.removeEventListener('change', syncMotion);
      pointer.removeEventListener('change', syncPointer);
    };
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const gate = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );

    gate.observe(el);
    return () => gate.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => setTabActive(!document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3.5rem]"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-[1400ms] ease-out data-[ready=true]:opacity-[0.5]"
        data-ready={visible || undefined}
        style={{
          maskImage:
            'radial-gradient(120% 62% at 50% 30%, transparent 34%, #000 88%), linear-gradient(to bottom, transparent 0%, #000 30%, #000 72%, transparent 97%)',
          WebkitMaskImage:
            'radial-gradient(120% 62% at 50% 30%, transparent 34%, #000 88%), linear-gradient(to bottom, transparent 0%, #000 30%, #000 72%, transparent 97%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <Dither
          active={visible && tabActive}
          disableAnimation={reduced}
          enableMouseInteraction={!coarse && !reduced}
          mouseRadius={0.4}
          // Gold-forest wave color matching #D9B75B [0.85, 0.72, 0.36]
          waveColor={[0.85, 0.72, 0.36]}
          waveSpeed={0.014}
          waveFrequency={2.6}
          waveAmplitude={0.36}
          colorNum={4}
          pixelSize={coarse ? 4 : 3}
        />
      </div>

      {/* Settles the dither into the footer dark forest green instead of letting it sit on top. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B2818] via-[#0B2818]/25 to-[#0B2818]/90" />
    </div>
  );
}
