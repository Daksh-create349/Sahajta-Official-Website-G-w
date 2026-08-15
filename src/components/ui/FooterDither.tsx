import { useEffect, useRef, useState } from 'react';
import Dither from '@/components/ui/Dither';
import { isMobileDevice, isWindowsDevice } from '@/lib/device';

export function FooterDither() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tabActive, setTabActive] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setIsWin(isWindowsDevice());
    const onResize = () => {
      setIsMobile(isMobileDevice());
      setIsWin(isWindowsDevice());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(motion.matches);
    syncMotion();
    motion.addEventListener('change', syncMotion);
    return () => motion.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = hostRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const sync = () => setTabActive(!document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  // Completely omitted on mobile for max scroll speed and 0 GPU overhead
  if (isMobile) {
    return null;
  }

  const maskStyle: React.CSSProperties = isWin
    ? {
        maskImage:
          'radial-gradient(120% 62% at 50% 30%, transparent 34%, #000 88%)',
        WebkitMaskImage:
          'radial-gradient(120% 62% at 50% 30%, transparent 34%, #000 88%)',
      }
    : {
        maskImage:
          'radial-gradient(120% 62% at 50% 30%, transparent 34%, #000 88%), linear-gradient(to bottom, transparent 0%, #000 30%, #000 72%, transparent 97%)',
        WebkitMaskImage:
          'radial-gradient(120% 62% at 50% 30%, transparent 34%, #000 88%), linear-gradient(to bottom, transparent 0%, #000 30%, #000 72%, transparent 97%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      };

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={
        isWin
          ? 'hidden md:block pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3.5rem] will-change-transform translate-z-0'
          : 'hidden md:block pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3.5rem]'
      }
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out data-[ready=true]:opacity-[0.45]"
        data-ready={visible || undefined}
        style={maskStyle}
      >
        <Dither
          active={visible && tabActive}
          disableAnimation={reduced}
          enableMouseInteraction={true}
          mouseRadius={0.4}
          waveColor={[0.85, 0.72, 0.36]}
          waveSpeed={0.014}
          waveFrequency={2.6}
          waveAmplitude={0.36}
          colorNum={4}
          pixelSize={4}
        />
      </div>

      {/* Settles the dither into the footer dark forest green */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B2818] via-[#0B2818]/25 to-[#0B2818]/90" />
    </div>
  );
}

