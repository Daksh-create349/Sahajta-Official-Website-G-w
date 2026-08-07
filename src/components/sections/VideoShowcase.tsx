import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import videoWebm from '@/assets/video/hero-showcase.webm';
import videoMp4 from '@/assets/video/hero-showcase.mp4';
import videoPoster from '@/assets/video/hero-showcase-poster.jpg';

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for target section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "center 0.5"]
  });

  // Smooth Physics Spring for smooth expansion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.3,
    restDelta: 0.0001
  });

  // Pure Scroll Expansion Transforms
  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1.0]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [0.4, 1.0]);
  const translateY = useTransform(smoothProgress, [0, 1], [40, 0]);

  return (
    <section ref={containerRef} className="py-12 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        style={{
          scale,
          opacity,
          y: translateY,
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
        className="relative overflow-hidden bg-[#2A331F] border border-[#e2ded5] shadow-[0_20px_60px_-15px_rgba(42,51,31,0.18)] group rounded-[2rem]"
      >
        {/* Pure Edge-to-Edge Video Player Frame */}
        <div className="relative aspect-video w-full bg-[#12170D] overflow-hidden flex items-center justify-center">
          {/* poster paints on the first frame of the response so the frame is
              never a black box while the video streams in */}
          <video
            poster={videoPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="w-full h-full object-cover"
          >
            <source src={videoWebm} type="video/webm" />
            <source src={videoMp4} type="video/mp4" />
          </video>
        </div>
      </motion.div>
    </section>
  );
}
