import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import videoSrc from '@/assets/video/talent-showcase.mp4';
import videoPoster from '@/assets/video/talent-showcase-poster.jpg';

export function TalentShowcaseCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.08 });

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="mb-16 md:mb-20 px-4 max-w-3xl mx-auto overflow-hidden">
      <motion.div
        initial={{ scale: 0.75, opacity: 0.2, y: 60 }}
        animate={isInView ? { scale: 1, opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
        className="relative rounded-2xl md:rounded-3xl overflow-hidden"
      >
        {/* Full Uncropped Video Frame - No cuts, no heavy box shadows */}
        <div className="relative w-full overflow-hidden flex items-center justify-center rounded-2xl md:rounded-3xl">
          <video
            ref={videoRef}
            src={shouldLoad ? videoSrc : undefined}
            poster={videoPoster}
            autoPlay
            loop
            muted
            playsInline
            preload={shouldLoad ? 'auto' : 'none'}
            aria-hidden="true"
            className="w-full h-auto object-contain rounded-2xl md:rounded-3xl"
          />

          {/* Clean Floating CTA Button */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
            <a
              href="mailto:hello@sahajta.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-[#0B422A] text-[#FDFCF0] font-syne font-medium text-xs md:text-sm rounded-full hover:bg-[#2D6E54] hover:scale-105 transition-all shadow-md group/btn tracking-tight"
            >
              <span>Talk to Team</span>
              <span className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
