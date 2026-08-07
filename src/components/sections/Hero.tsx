import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';

export function Hero() {
  return (
    <AuroraBackground className="pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Editorial Studio Eyebrow Accent Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62] inline-block" />
            <span className="font-mono-custom text-xs font-semibold text-zinc-600 uppercase tracking-[0.25em]">
              YOUR RELIABLE TECH PARTNER
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#2A331F] leading-[1.08] mb-8"
          >
            Get More Built <br className="hidden sm:inline" />
            <span className="text-zinc-400 font-normal italic">in Weeks. Not Months.</span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-600 font-normal leading-relaxed max-w-xl mb-10 tracking-tight"
          >
            We plan it, build it, fix it, and ship it. No long hiring, no equity dilution.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#2A331F] text-[#faf8f6] font-syne font-medium text-base rounded-full hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-md group"
            >
              <span>See If We Can Help</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </a>

            <a
              href="#case-studies"
              className="w-full sm:w-auto px-8 py-4 bg-[#eeebe4]/90 backdrop-blur-md text-[#2A331F] font-syne font-medium text-base rounded-full border border-[#e2ded5] hover:bg-[#e6e2d8] transition-all flex items-center justify-center shadow-xs"
            >
              See What We Have Built
            </a>
          </motion.div>

          {/* Minimal Proof Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-[#e2ded5]/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full max-w-2xl"
          >
            <div className="flex items-center justify-between p-5 rounded-2xl bg-[#EEEBE4]/80 border border-[#E2DED5] shadow-2xs">
              <span className="font-syne font-bold text-xl text-[#2A331F] tracking-tight">UNLIMITED</span>
              <span className="text-xs text-zinc-600 font-medium">
                Requests & Fixes
              </span>
            </div>

            <div className="flex items-center justify-between p-5 rounded-2xl bg-[#EEEBE4]/80 border border-[#E2DED5] shadow-2xs">
              <span className="font-syne font-bold text-xl text-[#2A331F] tracking-tight">WEEKLY</span>
              <span className="text-xs text-zinc-600 font-medium">
                Predictable Sprints
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </AuroraBackground>
  );
}
