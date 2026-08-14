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
    sub: "We hand over all the code and files — it's yours forever, no strings attached."
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
    label: "Tested Before It Goes Live",
    headline: "Reliable Every Time",
    sub: "We run thorough checks before anything goes live, so there are no surprises."
  }
];export function Overview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePillar = pillars[activeIdx];

  return (
    <section id="overview" className="py-24 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Scroll-Emerging Premium Studio Box */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F0EFE6] border border-[#DDD8CC] rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
        >
          
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#121212]">
              Production-grade AI, <span className="font-normal italic text-[#2D6E54]">shipped in days.</span>
            </h2>
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
                        ? "bg-[#FDFCF0] border-[#DDD8CC] shadow-xs"
                        : "bg-[#F0EFE6] border-transparent hover:bg-[#FDFCF0]/60"
                    }`}
                  >
                    {/* Left Active Line Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D6E54]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`font-mono-custom text-xs font-bold ${isActive ? "text-[#2D6E54]" : "text-[#9AA89F]"}`}>
                          {pillar.num}
                        </span>
                        <span className={`font-syne text-base md:text-lg font-bold tracking-tight ${isActive ? "text-[#121212]" : "text-[#6B7E76]"}`}>
                          {pillar.label}
                        </span>
                      </div>

                      <span className={`text-xs font-mono-custom ${isActive ? "text-[#2D6E54] font-semibold" : "text-[#9AA89F]"}`}>
                        {isActive ? "→" : ""}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: User's Minimalist Wallpaper Showcase Card */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[2rem] shadow-lg h-full min-h-[340px] md:min-h-[380px] border border-[#DDD8CC] group">
                
                {/* Minimalist 1 Wallpaper Background */}
                <img
                  src={minimalistImg}
                  alt="Minimalist Architecture Art Wallpaper"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Clean Neutral Gradient Overlay for Crisp Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

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

                      <p className="text-[#EBF2EE] text-xs sm:text-sm font-normal leading-relaxed max-w-md">
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
