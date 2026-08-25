import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import brandVideo from '@/assets/video/brand-showcase-expand.mp4';

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll through the showcase section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Play video smoothly when in view
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
              playPromise.catch(() => {
                // Auto-play prevented fallback
              });
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
        threshold: [0, 0.15, 0.5],
        rootMargin: '100px 0px 100px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Butter-smooth spring interpolation for fluid 60fps response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.7,
    restDelta: 0.001,
  });

  // Smooth width and scale expansion to touch screen edges perfectly
  const width = useTransform(
    smoothProgress,
    [0, 0.42, 0.58, 1],
    ['91%', '100%', '100%', '91%']
  );
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.32, 0.44, 0.56, 0.68, 1],
    ['2.25rem', '1.25rem', '0rem', '0rem', '1.25rem', '2.25rem']
  );
  const textOpacity = useTransform(
    smoothProgress,
    [0.1, 0.35, 0.65, 0.9],
    [0.5, 1, 1, 0.5]
  );
  const textY = useTransform(
    smoothProgress,
    [0.1, 0.5, 0.9],
    [10, 0, 10]
  );

  return (
    <section
      ref={containerRef}
      className="py-8 sm:py-12 md:py-16 relative w-full overflow-hidden flex flex-col items-center justify-center bg-[#FDFCF0]"
    >
      {/* Scroll-Expanding Video Canvas */}
      <motion.div
        style={{
          width,
          borderRadius,
        }}
        className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-[#0B2818] shadow-[0_16px_40px_-10px_rgba(11,66,42,0.18)]"
      >
        {/* Brand Video */}
        <video
          ref={videoRef}
          src={brandVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        />

        {/* Soft Bottom-Only Subtle Scrim for Clean Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

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
    </section>
  );
}
