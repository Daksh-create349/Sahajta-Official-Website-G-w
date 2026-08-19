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
      <AuroraBackground className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* Editorial Studio Eyebrow Accent Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9B75B] inline-block" />
              <span className="font-mono-custom text-[10px] sm:text-xs font-semibold text-[#6B7E76] uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                YOUR RELIABLE TECH PARTNER
              </span>
            </motion.div>

            {/* Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-syne text-[2rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#121212] leading-[1.08] mb-5 sm:mb-6 md:mb-8"
            >
              Get More Built <br className="hidden sm:inline" />
              <span className="text-[#2D6E54] font-normal italic">
                in{' '}
                <span className="relative inline-block">
                  Weeks
                  {/* Hand-drawn marker circle — loops "Weeks" with a natural
                      overshoot. pathLength=1 normalizes the draw so no JS
                      measuring; stroke-dashoffset eases in once the preloader
                      has cleared and the main thread is idle. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 348 154"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute overflow-visible"
                    style={{
                      left: '52.5%',
                      top: '50%',
                      width: '128%',
                      height: '154%',
                      transform: 'translate(-50%, -50%) rotate(-2.1deg)',
                    }}
                  >
                    <defs>
                      <linearGradient id="wk-circle" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#D9B75B" />
                        <stop offset="100%" stopColor="#B8902F" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M250 23C162 7 78 13 42 45C12 71 22 109 100 125C184 141 280 124 306 78C318 54 294 26 210 18"
                      fill="none"
                      stroke="url(#wk-circle)"
                      strokeWidth="4.3"
                      strokeLinecap="round"
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
                </span>
                . Not Months.
              </span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#6B7E76] font-normal leading-relaxed max-w-xl mb-6 sm:mb-8 md:mb-10 tracking-tight px-4 sm:px-0"
            >
              We plan it, build it, fix it, and ship it. No long hiring, no equity dilution.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            >
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#0B422A] text-[#FDFCF0] font-syne font-medium text-sm sm:text-base rounded-full hover:bg-[#2D6E54] transition-all flex items-center justify-center gap-2 shadow-md group touch-manipulation"
              >
                <span>See If We Can Help</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>

              <a
                href="#case-studies"
                className="w-full sm:w-auto px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-[#F0EFE6]/90 backdrop-blur-md text-[#121212] font-syne font-medium text-sm sm:text-base rounded-full border border-[#DDD8CC] hover:bg-[#DDD8CC] transition-all flex items-center justify-center shadow-xs touch-manipulation"
              >
                See What We Have Built
              </a>
            </motion.div>

          </div>
        </div>
      </AuroraBackground>

      {/* Plain cream section: marquee + proof badges — outside aurora so no GPU layer conflict */}
      <div className="bg-[#FDFCF0] pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        
        {/* Full-width Marquee Container (spans 100% of the screen width naturally) */}
        <div className="w-full overflow-hidden mb-16 sm:mb-20">
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
              className="pt-6 sm:pt-7 border-t border-[#DDD8CC]/80 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left w-full max-w-2xl px-4 sm:px-0"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F0EFE6]/80 border border-[#DDD8CC] shadow-2xs">
                <span className="font-syne font-bold text-lg sm:text-xl text-[#121212] tracking-tight">UNLIMITED</span>
                <span className="text-[10px] sm:text-xs text-[#6B7E76] font-medium">
                  Requests &amp; Fixes
                </span>
              </div>

              <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F0EFE6]/80 border border-[#DDD8CC] shadow-2xs">
                <span className="font-syne font-bold text-lg sm:text-xl text-[#121212] tracking-tight">WEEKLY</span>
                <span className="text-[10px] sm:text-xs text-[#6B7E76] font-medium">
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


