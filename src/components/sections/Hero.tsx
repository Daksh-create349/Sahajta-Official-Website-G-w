import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { LogoMarquee } from '@/components/ui/LogoMarquee';

export function Hero() {
  // The preloader overlays the hero until assets load. Gate the "Weeks"
  // underline draw on the preloader-done signal so it plays in view, not
  // hidden behind the overlay. Fallback timer keeps it from ever stalling.
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      setReady(true);
      return;
    }
    let settle = 0;
    let raf = 0;
    // Start the draw only AFTER the preloader exit-fade (~0.4s) and the
    // WebGL/aurora init storm clear — otherwise the compositor is starved for
    // the first few frames and the sweep stutters. Flip on a fresh frame so
    // the (already warm) layer transitions instantly, no first-frame hitch.
    const reveal = () => {
      settle = window.setTimeout(() => {
        raf = requestAnimationFrame(() => setReady(true));
      }, 480);
    };
    window.addEventListener('sahajta:preloaded', reveal, { once: true });
    const fallback = window.setTimeout(reveal, 4000);
    return () => {
      window.removeEventListener('sahajta:preloaded', reveal);
      clearTimeout(fallback);
      clearTimeout(settle);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Aurora section: headline + CTAs only */}
      <AuroraBackground className="pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* Editorial Studio Eyebrow Accent Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F0EFE6]/90 backdrop-blur-sm border border-[#DDD8CC] mb-5 sm:mb-6 shadow-2xs"
            >
              <span className="font-mono-custom text-[10px] sm:text-xs font-semibold text-[#0B422A] uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                YOUR RELIABLE TECH PARTNER
              </span>
            </motion.div>

            {/* Hero Headline — Expansive, Unchopped, Elegant */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-syne text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#121212] leading-[1.08] sm:leading-[1.05] mb-5 sm:mb-7 text-center"
            >
              Get More Built <br className="hidden sm:inline" />
              <span className="text-[#2D6E54] font-normal italic inline-block mt-1 sm:mt-0">
                in{' '}
                <span className="relative inline-block px-2 sm:px-3 py-0.5 font-medium not-italic text-[#0B422A]">
                  Weeks
                  {/* Hand-drawn marker circle */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 360 154"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute -inset-x-2 -inset-y-1 sm:-inset-x-4 sm:-inset-y-2 w-[calc(100%+1rem)] sm:w-[calc(100%+2rem)] h-[calc(100%+0.5rem)] sm:h-[calc(100%+1rem)] overflow-visible"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%) rotate(-2.2deg)',
                    }}
                  >
                    <defs>
                      <linearGradient id="wk-circle" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#D9B75B" />
                        <stop offset="100%" stopColor="#B8902F" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M256 28C172 12 80 18 44 50C16 76 28 114 112 127C194 139 298 121 318 77C329 50 302 26 216 21C150 16 74 26 46 56C30 74 34 100 78 116"
                      fill="none"
                      stroke="url(#wk-circle)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: ready ? 0 : 1,
                        transition: reduced
                          ? 'none'
                          : 'stroke-dashoffset 0.9s cubic-bezier(0.33, 1, 0.68, 1)',
                        willChange: 'stroke-dashoffset',
                      }}
                    />
                  </svg>
                </span>, Not Months.
              </span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-lg md:text-xl text-[#5A6D65] font-normal leading-relaxed max-w-sm sm:max-w-xl mb-8 sm:mb-10 tracking-tight px-3 sm:px-0 text-center"
            >
              We plan it, build it, fix it, and ship it. <br className="hidden sm:inline" />
              No long hiring, no equity dilution.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none px-2 sm:px-0"
            >
              <a
                href="#contact"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 bg-[#0B422A] text-[#FDFCF0] font-syne font-semibold text-sm sm:text-base rounded-full hover:bg-[#2D6E54] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg touch-manipulation cursor-pointer group"
              >
                <span>See If We Can Help</span>
                <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>

              <a
                href="#case-studies"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 bg-[#F0EFE6]/90 backdrop-blur-md text-[#121212] font-syne font-semibold text-sm sm:text-base rounded-full border border-[#DDD8CC] hover:bg-[#DDD8CC] active:scale-[0.98] transition-all flex items-center justify-center shadow-xs touch-manipulation cursor-pointer"
              >
                See What We Have Built
              </a>
            </motion.div>

          </div>
        </div>
      </AuroraBackground>

      {/* Plain cream section: marquee + proof badges — outside aurora so no GPU layer conflict */}
      <div className="bg-[#FDFCF0] pt-10 sm:pt-16 md:pt-20 pb-10 sm:pb-16 md:pb-20 lg:pb-24">
        
        {/* Full-width Marquee Container (spans 100% of the screen width naturally) */}
        <div className="w-full overflow-hidden mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="w-full"
          >
            <LogoMarquee />
          </motion.div>
        </div>

        {/* Centered content block for Badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Minimal Proof Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="pt-6 sm:pt-7 border-t border-[#DDD8CC]/80 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left w-full max-w-2xl px-2 sm:px-0"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#F0EFE6]/90 border border-[#DDD8CC] shadow-2xs">
                <span className="font-syne font-bold text-base sm:text-xl text-[#121212] tracking-tight">UNLIMITED</span>
                <span className="text-xs sm:text-xs text-[#6B7E76] font-medium font-mono-custom">
                  Requests &amp; Fixes
                </span>
              </div>

              <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#F0EFE6]/90 border border-[#DDD8CC] shadow-2xs">
                <span className="font-syne font-bold text-base sm:text-xl text-[#121212] tracking-tight">WEEKLY</span>
                <span className="text-xs sm:text-xs text-[#6B7E76] font-medium font-mono-custom">
                  Predictable Sprints
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}


