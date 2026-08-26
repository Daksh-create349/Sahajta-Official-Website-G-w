import { useRef, useState, useEffect, useCallback, type TouchEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { scrollToTarget } from '@/lib/lenis';

import service1Img from '@/assets/services/service-1.png';
import service2Img from '@/assets/services/service-2.png';
import service3Img from '@/assets/services/service-3.png';
import service4Img from '@/assets/services/service-4.png';
import service5Img from '@/assets/services/service-5.png';

const services = [
  {
    num: "01",
    stepNum: 1,
    title: "Custom AI Solutions",
    bgImg: service1Img,
    deliverables: ["SMART SEARCH", "AI ASSISTANTS", "TRAINED FOR YOU", "QUALITY TESTED"]
  },
  {
    num: "02",
    stepNum: 2,
    title: "Add AI to Existing Business",
    bgImg: service2Img,
    deliverables: ["INTEGRATIONS", "AI HELPER"]
  },
  {
    num: "03",
    stepNum: 3,
    title: "Business Automation",
    bgImg: service3Img,
    deliverables: ["WORKFLOWS", "SAVE YOUR TIME"]
  },
  {
    num: "04",
    stepNum: 4,
    title: "Website Design & Development",
    bgImg: service4Img,
    deliverables: ["WEB DESIGN", "DEVELOPMENT", "CRO & SEO"]
  },
  {
    num: "05",
    stepNum: 5,
    title: "ML Model Training",
    bgImg: service5Img,
    deliverables: ["CUSTOM ML MODELS", "NLP & VISION", "PREDICTIVE AI", "DEPLOYED TO PROD"]
  }
];

const arcAngles = [-90, -45, 0, 45, 90];

const ARC_RADIUS = 100;
const ARC_PATH = 'M 50 150 A 100 100 0 0 1 250 150';
const ARC_LENGTH = Math.PI * ARC_RADIUS;

const STEP_VH = 0.6;
const WRAPPER_VH = 100 + services.length * STEP_VH * 100;
const PIN_QUERY = '(min-width: 1024px) and (min-height: 620px)';

const cardVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 36 : -36,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -36 : 36,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPinned, setIsPinned] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PIN_QUERY).matches
  );

  // Touch gesture support for mobile swiping
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const updateArcVisuals = useCallback((progress: number, targetIdx: number) => {
    if (arcRef.current) {
      const offset = ARC_LENGTH - progress * ARC_LENGTH;
      arcRef.current.style.strokeDashoffset = String(offset);
    }

    nodesRef.current.forEach((node, i) => {
      if (node) {
        node.dataset.past = progress >= i / (services.length - 1) - 0.02 ? 'true' : 'false';
      }
    });

    setActiveIdx((prev) => {
      if (prev !== targetIdx) {
        setDirection(targetIdx > prev ? 1 : -1);
        return targetIdx;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setIsPinned(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Sync arc stroke and node states whenever activeIdx changes (mobile & desktop)
  useEffect(() => {
    const progress = activeIdx / (services.length - 1);
    updateArcVisuals(progress, activeIdx);
  }, [activeIdx, updateArcVisuals]);

  // Desktop pinned scroll handler
  useEffect(() => {
    if (!isPinned) return;

    let frame = 0;
    let wrapperTop = 0;
    let maxScrollPx = 1;

    const remeasure = () => {
      const el = wrapperRef.current;
      if (!el) return;
      wrapperTop = el.getBoundingClientRect().top + window.scrollY;
      maxScrollPx = Math.max(1, window.innerHeight * STEP_VH * (services.length - 1));
    };

    const paint = () => {
      frame = 0;
      const progress = Math.max(0, Math.min(1, (window.scrollY - wrapperTop) / maxScrollPx));
      const idx = Math.max(
        0,
        Math.min(services.length - 1, Math.round(progress * (services.length - 1)))
      );
      updateArcVisuals(progress, idx);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onResize = () => {
      remeasure();
      onScroll();
    };

    remeasure();
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [isPinned, updateArcVisuals]);

  const goToPhase = (idx: number) => {
    if (idx === activeIdx) return;
    setDirection(idx > activeIdx ? 1 : -1);

    if (!isPinned) {
      const progress = idx / (services.length - 1);
      updateArcVisuals(progress, idx);
      return;
    }

    const el = wrapperRef.current;
    if (!el) return;

    const maxScrollPx = window.innerHeight * STEP_VH * (services.length - 1);
    const wrapperTop = el.getBoundingClientRect().top + window.scrollY;

    scrollToTarget(wrapperTop + (idx / (services.length - 1)) * maxScrollPx);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current !== null ? touchStartY.current - touchEndY : 0;

    // Only trigger if primarily a horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0 && activeIdx < services.length - 1) {
        // Swiped Left -> Advance to Next Phase
        goToPhase(activeIdx + 1);
      } else if (diffX < 0 && activeIdx > 0) {
        // Swiped Right -> Return to Previous Phase
        goToPhase(activeIdx - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const activeService = services[activeIdx];

  return (
    <section
      ref={wrapperRef}
      id="services"
      className="relative bg-[#FDFCF0] border-t border-[#DDD8CC]"
      style={isPinned ? { height: `${WRAPPER_VH}vh` } : undefined}
    >
      {/* Pinned frame on desktop, clean spaced container on mobile */}
      <div
        className={
          isPinned
            ? 'sticky top-0 h-screen flex flex-col justify-center overflow-hidden'
            : 'py-12 sm:py-16 md:py-20 lg:py-24'
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">

          {/* Header */}
          <div className="mb-6 sm:mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-custom text-[11px] font-semibold text-[#6B7E76] uppercase tracking-[0.2em] block mb-2">
                WHAT WE BUILD
              </span>
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B422A]">
                Your Fractional CTO and Build Team in One
              </h2>
            </div>

            {/* Mobile Phase Pill Selector Bar (Visible only on mobile/tablet < 1024px) */}
            <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-2">
              {services.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => goToPhase(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono-custom font-semibold transition-all duration-300 shrink-0 cursor-pointer touch-manipulation flex items-center gap-1.5 border ${
                      isActive
                        ? "bg-[#0B422A] text-[#FDFCF0] border-[#0B422A] shadow-xs"
                        : "bg-[#F0EFE6] text-[#6B7E76] border-[#DDD8CC] hover:bg-[#FDFCF0]"
                    }`}
                  >
                    <span>0{item.stepNum}</span>
                    <span className="text-[11px] font-sans font-medium">{item.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

            {/* Left: Service Card with Rich Background Image & Swipe on Mobile */}
            <div
              className="lg:col-span-7"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeService.num}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative bg-[#F0EFE6] p-5 sm:p-7 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border border-[#DDD8CC] shadow-md min-h-[300px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[420px] flex flex-col justify-between overflow-hidden group touch-manipulation"
                >
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                    <img
                      src={activeService.bgImg}
                      alt={activeService.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#F0EFE6]/95 via-[#F0EFE6]/60 to-transparent pointer-events-none" />
                  </div>

                  {/* Top Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 sm:mb-8">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FDFCF0]/90 backdrop-blur-md flex items-center justify-center font-mono-custom font-bold text-[#0B422A] text-xs sm:text-sm border border-[#DDD8CC] shadow-xs">
                        {activeService.num}
                      </div>

                      {/* Mobile Phase counter badge */}
                      <span className="lg:hidden font-mono-custom text-[11px] font-semibold text-[#0B422A] px-2.5 py-1 rounded-full bg-[#FDFCF0]/90 border border-[#DDD8CC]/80">
                        {activeIdx + 1} / {services.length}
                      </span>
                    </div>

                    <h3 className="font-syne font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0B422A] tracking-tight leading-snug sm:leading-tight">
                      {activeService.title}
                    </h3>
                  </div>

                  {/* Bottom Tags */}
                  <div className="relative z-10 pt-5 sm:pt-8 border-t border-[#0B422A]/10 mt-4 sm:mt-0">
                    <div className="flex flex-wrap gap-1.5 sm:gap-3">
                      {activeService.deliverables.map((item, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04, duration: 0.18 }}
                          className="px-2.5 sm:px-4 py-1 sm:py-2 bg-[#FDFCF0]/90 backdrop-blur-md text-[#0B422A] text-[10px] sm:text-xs font-mono-custom font-semibold rounded-lg sm:rounded-xl border border-[#DDD8CC] shadow-2xs tracking-wider"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile Carousel Controls Bar (Visible only on mobile/tablet < 1024px) */}
              <div className="lg:hidden flex items-center justify-between mt-4 px-1">
                {/* Swipe hint */}
                <div className="flex items-center gap-1.5">
                  <span className="font-mono-custom text-[11px] text-[#6B7E76]">
                    Swipe or tap to switch
                  </span>
                </div>

                {/* Arrow Prev/Next Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToPhase(Math.max(0, activeIdx - 1))}
                    disabled={activeIdx === 0}
                    aria-label="Previous Phase"
                    className="w-9 h-9 rounded-full border border-[#DDD8CC] bg-[#F0EFE6] text-[#0B422A] flex items-center justify-center text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0B422A] hover:text-[#FDFCF0] transition-colors cursor-pointer touch-manipulation"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPhase(Math.min(services.length - 1, activeIdx + 1))}
                    disabled={activeIdx === services.length - 1}
                    aria-label="Next Phase"
                    className="w-9 h-9 rounded-full border border-[#DDD8CC] bg-[#F0EFE6] text-[#0B422A] flex items-center justify-center text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0B422A] hover:text-[#FDFCF0] transition-colors cursor-pointer touch-manipulation"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Arc Dial with Connected Stroke & Interactive Nodes (Desktop Only >= 1024px) */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative py-4 sm:py-6">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                  {/* Dashed background track */}
                  <path
                    d={ARC_PATH}
                    fill="none"
                    stroke="#DDD8CC"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                  />
                  {/* Progress stroke: Smooth rounded continuous stroke (animated on mobile and desktop) */}
                  <path
                    ref={arcRef}
                    d={ARC_PATH}
                    fill="none"
                    stroke="#0B422A"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: ARC_LENGTH,
                      strokeDashoffset: ARC_LENGTH - (activeIdx / (services.length - 1)) * ARC_LENGTH,
                      transition: isPinned ? 'none' : 'stroke-dashoffset 0.35s ease-out',
                    }}
                  />
                </svg>

                {/* Center Phase Indicator */}
                <div className="text-center z-10 select-none pointer-events-none">
                  <span className="font-mono-custom text-[10px] sm:text-xs font-bold text-[#0B422A] uppercase tracking-widest block mb-1">
                    PHASE
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="font-syne text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B422A] block"
                    >
                      0{activeIdx + 1}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-mono-custom text-[10px] sm:text-xs text-[#6B7E76] block mt-1">
                    of 0{services.length}
                  </span>
                </div>

                {/* Interactive Node Buttons on the Arc */}
                {services.map((item, idx) => {
                  const radAngle = (arcAngles[idx] - 90) * (Math.PI / 180);
                  const cx = 150 + ARC_RADIUS * Math.cos(radAngle);
                  const cy = 150 + ARC_RADIUS * Math.sin(radAngle);
                  const isActive = activeIdx === idx;
                  const isPast = activeIdx >= idx;

                  return (
                    <button
                      key={item.num}
                      ref={(node) => { nodesRef.current[idx] = node; }}
                      onClick={() => goToPhase(idx)}
                      data-past={isPast ? 'true' : 'false'}
                      style={{
                        left: `${(cx / 300) * 100}%`,
                        top: `${(cy / 300) * 100}%`
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono-custom font-bold text-xs sm:text-sm transition-all duration-300 z-20 cursor-pointer touch-manipulation ${
                        isActive
                          ? "bg-[#0B422A] text-[#FDFCF0] border-2 border-[#0B422A] ring-4 ring-[#0B422A]/15 shadow-xl scale-125"
                          : isPast
                          ? "bg-[#0B422A] text-[#FDFCF0] border border-[#0B422A] shadow-md scale-105"
                          : "bg-[#F0EFE6] text-[#6B7E76] border border-[#DDD8CC] hover:bg-[#0B422A] hover:text-[#FDFCF0]"
                      }`}
                    >
                      {item.stepNum}
                    </button>
                  );
                })}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Services;
