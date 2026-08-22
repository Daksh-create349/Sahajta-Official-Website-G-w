import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Pillar {
  id: string;
  num: string;
  label: string;
  headline: string;
  sub: string;
  image: string;
  alt: string;
}

const pillars: Pillar[] = [
  {
    id: "sprint",
    num: "01",
    label: "Rapid SLA Deployments",
    headline: "Live Working Code",
    sub: "Working AI prototype deployed to staging in 24–48 hours.",
    image: "/overview-sprint.png",
    alt: "Rapid SLA deployment with live code pipeline and AI integration"
  },
  {
    id: "ownership",
    num: "02",
    label: "100% Code & IP Ownership",
    headline: "Sovereign Ownership",
    sub: "We hand over all the code and files — it's yours forever, no strings attached.",
    image: "/overview-ownership.png",
    alt: "100% Code and IP ownership with secure repository handover"
  },
  {
    id: "integration",
    num: "03",
    label: "Non-Invasive Integration",
    headline: "Direct Tool Integration",
    sub: "Seamless connections to your CRMs, ERPs & enterprise databases.",
    image: "/overview-integration.png",
    alt: "Direct tool integration with CRM, ERP, and Enterprise databases"
  },
  {
    id: "harnesses",
    num: "04",
    label: "Tested Before It Goes Live",
    headline: "Reliable Every Time",
    sub: "We run thorough checks before anything goes live, so there are no surprises.",
    image: "/overview-harness.png",
    alt: "Tested and verified pipeline for reliable production deployments"
  }
];

export function Overview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePillar = pillars[activeIdx];

  // Preload all showcase illustrations so tab switches are instantaneous without lag/pop-in
  useEffect(() => {
    pillars.forEach((pillar) => {
      const img = new Image();
      img.src = pillar.image;
    });
  }, []);

  const handleSelectTab = (nextIdx: number) => {
    if (nextIdx === activeIdx) return;
    setActiveIdx(nextIdx);
  };

  return (
    <section id="overview" className="py-12 sm:py-18 md:py-24 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6">

        {/* Scroll-Emerging Premium Studio Box */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F0EFE6] border border-[#DDD8CC] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-4.5 sm:p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden"
        >

          {/* Section Header */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D9B75B]" />
              <span className="font-mono-custom text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6B7E76] font-semibold">
                CORE CAPABILITIES
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#121212]">
              Production-grade AI, <span className="font-normal italic text-[#2D6E54]">shipped in days.</span>
            </h2>
          </div>

          {/* 2-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-12 items-center">

            {/* Left Column: Interactive Tab Buttons — Fixed-height buttons prevent layout shifting */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-2 sm:space-y-3" role="tablist" aria-label="Core Capabilities">
              {pillars.map((pillar, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={pillar.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectTab(idx)}
                    className={`text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-200 relative overflow-hidden border cursor-pointer touch-manipulation ${
                      isActive
                        ? "bg-[#FDFCF0] border-[#DDD8CC] shadow-xs"
                        : "bg-[#F0EFE6] border-transparent hover:bg-[#FDFCF0]/60"
                    }`}
                  >
                    {/* Left Active Line Indicator */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-[#2D6E54] transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className={`font-mono-custom text-xs font-bold transition-colors duration-200 ${isActive ? "text-[#2D6E54]" : "text-[#9AA89F]"}`}>
                            {pillar.num}
                          </span>
                          <span className={`font-syne text-sm sm:text-base md:text-lg font-bold tracking-tight transition-colors duration-200 ${isActive ? "text-[#121212]" : "text-[#6B7E76]"}`}>
                            {pillar.label}
                          </span>
                        </div>

                        <span className={`text-xs font-mono-custom transition-all duration-200 ${isActive ? "text-[#2D6E54] font-semibold translate-x-0 opacity-100" : "text-[#9AA89F] -translate-x-1 opacity-0"}`}>
                          →
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Borderless Full Box Showcase with Instant GPU Crossfade */}
            <div className="lg:col-span-7 h-full flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] min-h-[280px] sm:min-h-[360px] md:min-h-[470px] rounded-2xl sm:rounded-3xl md:rounded-[2.25rem] bg-[#FAF9F0] overflow-hidden select-none flex flex-col justify-between p-4.5 sm:p-7 md:p-9 border border-[#DDD8CC]/70 shadow-2xs">
                
                {/* Headline & Subtitle Slot — Sits at Top with its own Vertical Space */}
                <div className="relative z-10 w-full mb-2">
                  <h3 className="font-syne text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-[#121212] leading-tight transition-all duration-300">
                    {activePillar.headline}
                  </h3>
                  <p className="text-[#6B7E76] text-xs sm:text-sm font-normal leading-relaxed mt-1 sm:mt-1.5 transition-all duration-300 line-clamp-2">
                    {activePillar.sub}
                  </p>
                </div>

                {/* Illustration Stage — 4 pre-decoded stacked images with instant hardware-accelerated crossfade */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-[160px] sm:min-h-[220px] md:min-h-[280px]">
                  {pillars.map((pillar, idx) => {
                    const isCurrent = activeIdx === idx;
                    return (
                      <img
                        key={pillar.id}
                        src={pillar.image}
                        alt={pillar.alt}
                        decoding="async"
                        loading="eager"
                        draggable={false}
                        className={`absolute inset-0 m-auto w-full h-full max-h-[160px] sm:max-h-[260px] md:max-h-[320px] object-contain filter drop-shadow-xs transition-all duration-300 transform-gpu ${
                          isCurrent
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
                      />
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
