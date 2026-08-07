import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import videoSrc from '@/assets/video/talent-showcase.mp4';
import videoPoster from '@/assets/video/talent-showcase-poster.jpg';

export function TalentShowcaseCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // This block sits in the footer, so on load it is thousands of pixels below
  // the fold — but `autoPlay` makes the browser fetch it immediately, competing
  // with the hero video for bandwidth. Attach the source only once the block is
  // actually approaching the viewport.
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

  // autoPlay does not fire for a source attached after mount, so kick playback
  // off explicitly. Muted playback is always permitted, but a rejected promise
  // must still be swallowed or it surfaces as an unhandled rejection.
  useEffect(() => {
    if (shouldLoad) videoRef.current?.play().catch(() => {});
  }, [shouldLoad]);

  // Scroll emergence expansion animation matching VideoShowcase style
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "center 0.5"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.3,
    restDelta: 0.0001
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.75, 1.0]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [0.2, 1.0]);
  const translateY = useTransform(smoothProgress, [0, 1], [60, 0]);

  return (
    <div ref={containerRef} className="mb-16 md:mb-20 px-4 max-w-3xl mx-auto overflow-hidden">
      <motion.div
        style={{
          scale,
          opacity,
          y: translateY,
          z: 0,
          willChange: 'transform, opacity',
        }}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-[#2A331F] text-[#faf8f6] font-syne font-medium text-xs md:text-sm rounded-full hover:bg-zinc-800 hover:scale-105 transition-all shadow-md group/btn tracking-tight"
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
