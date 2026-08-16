import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';

const trustedTeams = [
  {
    name: '100xEngineers',
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="font-syne font-extrabold tracking-tight text-[#0B422A] text-base sm:text-lg">
          100<span className="text-[#A67F2E]">x</span>Engineers
        </span>
      </div>
    ),
  },
  {
    name: 'Namyah',
    render: () => (
      <div className="flex items-center gap-1.5">
        <span className="font-syne font-bold tracking-[0.14em] uppercase text-[#0B422A] text-sm sm:text-base">
          NAMYAH
        </span>
      </div>
    ),
  },
  {
    name: 'Stratapilot AI',
    render: () => (
      <div className="flex items-center gap-2">
        <span className="font-syne font-bold tracking-tight text-[#0B422A] text-base sm:text-lg">
          Stratapilot
        </span>
        <span className="font-mono-custom text-[10px] font-bold text-[#A67F2E] px-1.5 py-0.5 rounded-md bg-[#F5EDD6] border border-[#D9B75B]/40">
          AI
        </span>
      </div>
    ),
  },
];

export function Hero() {
  return (
    <AuroraBackground className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
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
            <span className="text-[#2D6E54] font-normal italic">in Weeks. Not Months.</span>
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

          {/* TRUSTED BY TEAMS AT Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-12 sm:mt-14 md:mt-16 w-full max-w-3xl px-4 sm:px-0"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="h-px w-6 sm:w-10 bg-[#DDD8CC]" />
                <span className="font-mono-custom text-[10px] sm:text-xs font-bold text-[#6B7E76] uppercase tracking-[0.25em]">
                  TRUSTED BY TEAMS AT
                </span>
                <span className="h-px w-6 sm:w-10 bg-[#DDD8CC]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
                {trustedTeams.map((team) => (
                  <div
                    key={team.name}
                    className="flex items-center justify-center py-3.5 px-5 rounded-xl sm:rounded-2xl bg-[#F0EFE6]/90 backdrop-blur-md border border-[#DDD8CC] shadow-2xs hover:border-[#0B422A]/30 hover:bg-[#FAF8F6] transition-all duration-300 group"
                  >
                    {team.render()}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Minimal Proof Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-[#DDD8CC]/80 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left w-full max-w-2xl px-4 sm:px-0"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F0EFE6]/80 border border-[#DDD8CC] shadow-2xs">
              <span className="font-syne font-bold text-lg sm:text-xl text-[#121212] tracking-tight">UNLIMITED</span>
              <span className="text-[10px] sm:text-xs text-[#6B7E76] font-medium">
                Requests & Fixes
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
    </AuroraBackground>
  );
}
