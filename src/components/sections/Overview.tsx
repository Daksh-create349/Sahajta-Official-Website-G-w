import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

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

const imageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? 28 : -28,
    scale: 0.96,
    filter: 'blur(8px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      y: { type: 'spring', stiffness: 280, damping: 28 },
      opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: 0.28 },
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? -24 : 24,
    scale: 0.96,
    filter: 'blur(8px)',
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Overview() {
  const [[activeIdx, direction], setActiveTab] = useState([0, 0]);
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
    setActiveTab([nextIdx, nextIdx > activeIdx ? 1 : -1]);
  };

  return (
    <section id="overview" className="py-20 md:py-24 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Scroll-Emerging Premium Studio Box */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F0EFE6] border border-[#DDD8CC] rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden"
        >

          {/* Section Header */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D9B75B]" />
              <span className="font-mono-custom text-[11px] uppercase tracking-[0.2em] text-[#6B7E76] font-semibold">
                CORE CAPABILITIES
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#121212]">
              Production-grade AI, <span className="font-normal italic text-[#2D6E54]">shipped in days.</span>
            </h2>
          </div>

          {/* 2-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Left Column: Interactive Tab Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-2.5 sm:space-y-3" role="tablist" aria-label="Core Capabilities">
              {pillars.map((pillar, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={pillar.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectTab(idx)}
                    className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 relative overflow-hidden border cursor-pointer ${
                      isActive
                        ? "bg-[#FDFCF0] border-[#DDD8CC] shadow-sm"
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

                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5 sm:gap-4">
                          <span className={`font-mono-custom text-xs font-bold ${isActive ? "text-[#2D6E54]" : "text-[#9AA89F]"}`}>
                            {pillar.num}
                          </span>
                          <span className={`font-syne text-sm sm:text-base md:text-lg font-bold tracking-tight ${isActive ? "text-[#121212]" : "text-[#6B7E76]"}`}>
                            {pillar.label}
                          </span>
                        </div>

                        <span className={`text-xs font-mono-custom ${isActive ? "text-[#2D6E54] font-semibold" : "text-[#9AA89F]"}`}>
                          {isActive ? "→" : ""}
                        </span>
                      </div>

                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-[#6B7E76] text-xs sm:text-sm font-normal leading-relaxed pl-7 sm:pl-8 mt-2"
                        >
                          {pillar.sub}
                        </motion.p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Borderless Full Box Showcase with Non-Colliding Headline */}
            <div className="lg:col-span-7 h-full flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] min-h-[380px] sm:min-h-[420px] md:min-h-[470px] rounded-3xl md:rounded-[2.25rem] bg-[#FAF9F0] overflow-hidden select-none flex flex-col justify-between p-6 sm:p-8 md:p-9">
                
                {/* Headline Slot — Sits at Top with its own Vertical Space */}
                <div className="relative z-10 w-full mb-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`headline-${activePillar.id}`}
                      initial={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="font-syne text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#121212] leading-tight">
                        {activePillar.headline}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Illustration Stage — Sits below headline so they never collide */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-0 pt-1">
                  <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                      key={activePillar.id}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full h-full flex items-center justify-center"
                    >
                      <motion.img
                        src={activePillar.image}
                        alt={activePillar.alt}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200, damping: 26 }}
                        className="w-full h-full max-h-[260px] sm:max-h-[300px] md:max-h-[340px] object-contain filter drop-shadow-xs"
                        draggable={false}
                      />
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
