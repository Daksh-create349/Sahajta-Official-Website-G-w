import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ColorBends } from '@/components/ui/ColorBends';

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.08 });

  return (
    <section ref={containerRef} className="py-12 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ scale: 0.88, opacity: 0.4, y: 40 }}
        animate={isInView ? { scale: 1, opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform, opacity' }}
        className="relative overflow-hidden bg-[#0B422A] border border-[#DDD8CC] shadow-[0_12px_32px_-8px_rgba(11,66,42,0.12)] group rounded-[2.5rem]"
      >
        {/* Deep Forest Green Frame with Sahajta Signature Gold & Emerald Waves */}
        <div className="relative aspect-video w-full bg-[#0B422A] overflow-hidden flex items-center justify-center">
          
          {/* High-Impact ColorBends Shader with Gold & Emerald Brand Palette */}
          <ColorBends
            colors={["#0B422A", "#D9B75B", "#2D6E54", "#F5EDD6", "#A67F2E", "#0B2818"]}
            rotation={45}
            speed={0.12}
            scale={1.1}
            frequency={1.0}
            warpStrength={0.8}
            mouseInfluence={0.5}
            parallax={0.2}
            noise={0.02}
            iterations={1}
            intensity={1.6}
            bandWidth={3.5}
            transparent={false}
            className="absolute inset-0 w-full h-full"
          />

          {/* Warm Cream Headline (Crisp contrast against gold & forest background) */}
          <div className="relative z-10 px-8 sm:px-16 text-center max-w-4xl mx-auto pointer-events-none">
            <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-bold text-[#FDFCF0] tracking-tight leading-[1.14] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              We eliminate the work your team should not be doing.
            </h2>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
