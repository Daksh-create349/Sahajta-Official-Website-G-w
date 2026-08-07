import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import minimalistImg from '@/assets/minimalist-1.jpg';

const pillars = [
  {
    id: "sprint",
    num: "01",
    label: "Rapid SLA Deployments",
    headline: "Live Working Code",
    sub: "Working AI prototype deployed to staging in 24–48 hours."
  },
  {
    id: "ownership",
    num: "02",
    label: "100% Code & IP Ownership",
    headline: "Sovereign Ownership",
    sub: "Complete source code, pipeline scripts & model weights handover."
  },
  {
    id: "integration",
    num: "03",
    label: "Non-Invasive Integration",
    headline: "Direct Tool Integration",
    sub: "Seamless connections to your CRMs, ERPs & enterprise databases."
  },
  {
    id: "harnesses",
    num: "04",
    label: "Production Validation Harnesses",
    headline: "Deterministic Reliability",
    sub: "Custom evaluation harnesses monitoring precision before production."
  }
];

export function Overview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePillar = pillars[activeIdx];

  return (
    <section id="overview" className="py-24 bg-[#faf8f6] border-t border-[#eeebe4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Scroll-Emerging Premium Studio Box */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#EEEBE4] border border-[#E2DED5] rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
        >
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-mono-custom text-xs font-semibold text-emerald-700 uppercase tracking-widest block mb-2">
                01 / PHILOSOPHY & SLA
              </span>
              <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A331F]">
                Production-grade AI, <span className="font-normal italic text-zinc-500">shipped in days.</span>
              </h2>
            </div>
            <p className="text-zinc-600 max-w-sm text-sm font-normal leading-relaxed">
              Zero fluff. Autonomous AI systems built, tested, and integrated into your infrastructure.
            </p>
          </div>

          {/* 2-Column Minimal Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Interactive Tab Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
              {pillars.map((pillar, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`text-left p-4 md:p-5 rounded-2xl transition-all relative overflow-hidden border ${
                      isActive
                        ? "bg-[#FAF8F6] border-[#E2DED5] shadow-xs"
                        : "bg-[#EEEBE4] border-transparent hover:bg-[#FAF8F6]/60"
                    }`}
                  >
                    {/* Left Active Line Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`font-mono-custom text-xs font-bold ${isActive ? "text-emerald-700" : "text-zinc-400"}`}>
                          {pillar.num}
                        </span>
                        <span className={`font-syne text-base md:text-lg font-bold tracking-tight ${isActive ? "text-[#2A331F]" : "text-zinc-500"}`}>
                          {pillar.label}
                        </span>
                      </div>

                      <span className={`text-xs font-mono-custom ${isActive ? "text-emerald-700 font-semibold" : "text-zinc-400"}`}>
                        {isActive ? "→" : ""}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: User's Minimalist Wallpaper Showcase Card */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[2rem] shadow-lg h-full min-h-[340px] md:min-h-[380px] border border-[#e2ded5] group">
                
                {/* Minimalist 1 Wallpaper Background */}
                <img
                  src={minimalistImg}
                  alt="Minimalist Architecture Art Wallpaper"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Gradient Overlay for Clean Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12170D]/88 via-[#1A2013]/30 to-transparent" />

                {/* Minimalist Content Overlay */}
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end text-white">
                  
                  {/* Minimal Overlay Headline & Subtitle */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePillar.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="font-syne text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                        {activePillar.headline}
                      </h3>

                      <p className="text-zinc-200 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
                        {activePillar.sub}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
