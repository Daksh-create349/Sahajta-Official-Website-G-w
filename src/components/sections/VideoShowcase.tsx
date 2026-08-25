import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import brandVideo from '@/assets/video/brand-showcase-opt.mp4';
import brandWebm from '@/assets/video/brand-showcase-opt.webm';
import brandPoster from '@/assets/video/brand-showcase-poster.jpg';

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll position through the showcase section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Play video smoothly when in view, pause when off-screen
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          }
        } else {
          if (isVisible) {
            isVisible = false;
            video.pause();
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: '200px 0px 200px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 100% GPU Compositor Transforms: Zero Layout Reflows = Zero Scroll Lag
  const scale = useTransform(
    scrollYProgress,
    [0, 0.42, 0.58, 1],
    [0.91, 1.0, 1.0, 0.91]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.32, 0.44, 0.56, 0.68, 1],
    ['2.25rem', '1.25rem', '0rem', '0rem', '1.25rem', '2.25rem']
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.65, 0.9],
    [0.4, 1, 1, 0.4]
  );

  const textY = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    [10, 0, 10]
  );

  return (
    <section
      ref={containerRef}
      className="py-8 sm:py-12 md:py-16 relative w-full overflow-hidden flex flex-col items-center justify-center bg-[#FDFCF0]"
    >
      {/* 100% Width Container that GPU-scales from 91% to 100% (touching screen edges) and flattens corners */}
      <div className="w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            scale,
            borderRadius,
            transformOrigin: 'center center',
          }}
          className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-[#0B2818] shadow-[0_20px_50px_-15px_rgba(11,66,42,0.22)] will-change-transform"
        >
          {/* Optimized Faststart Brand Video */}
          <video
            ref={videoRef}
            poster={brandPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          >
            <source src={brandWebm} type="video/webm" />
            <source src={brandVideo} type="video/mp4" />
          </video>

          {/* Soft Bottom-Only Subtle Scrim for Clean Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

          {/* Lower Third Editorial Typography */}
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-8 md:px-12 text-center max-w-4xl mx-auto pointer-events-none">
            <motion.h2
              style={{ opacity: textOpacity, y: textY }}
              className="font-syne text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#FDFCF0] tracking-tight leading-[1.18] drop-shadow-[0_2px_20px_rgba(0,0,0,0.85)]"
            >
              We eliminate the work your team should not be doing.
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
