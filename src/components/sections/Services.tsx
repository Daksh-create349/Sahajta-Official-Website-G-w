import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToTarget } from '@/lib/lenis';

import service1Img from '@/assets/services/service-1.png';
import service2Img from '@/assets/services/service-2.png';
import service3Img from '@/assets/services/service-3.png';
import service4Img from '@/assets/services/service-4.png';

const services = [
  {
    num: "01",
    stepNum: 1,
    title: "Custom AI Solutions",
    bgImg: service1Img,
    deliverables: ["RAG PIPELINES", "AGENTS", "FINE-TUNING", "EVALS"]
  },
  {
    num: "02",
    stepNum: 2,
    title: "Add AI to Existing Business",
    bgImg: service2Img,
    deliverables: ["INTEGRATIONS", "COPILOTS"]
  },
  {
    num: "03",
    stepNum: 3,
    title: "Business Automation",
    bgImg: service3Img,
    deliverables: ["WORKFLOWS", "OPS TOOLING"]
  },
  {
    num: "04",
    stepNum: 4,
    title: "Website Design & Development",
    bgImg: service4Img,
    deliverables: ["WEB DESIGN", "DEVELOPMENT", "CRO & SEO"]
  }
];

const arcAngles = [-80, -25, 25, 80];

const ARC_RADIUS = 100;
const ARC_PATH = 'M 50 150 A 100 100 0 0 1 250 150';
/** Half-circumference of the r=100 arc, so the dash covers it exactly. */
const ARC_LENGTH = Math.PI * ARC_RADIUS;

/**
 * How much page scroll (as a fraction of the viewport height) each phase gets
 * while the section is pinned. Higher = slower, more deliberate stepping.
 */
const STEP_VH = 0.6;

/**
 * Total wrapper height: one viewport for the pinned frame plus one step per
 * phase. The pin lasts exactly `services.length * STEP_VH` viewports.
 */
const WRAPPER_VH = 100 + services.length * STEP_VH * 100;

/** The pin only runs where the two-column layout fits in one viewport. */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 620px)';

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPinned, setIsPinned] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(PIN_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setIsPinned(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // While pinned, the arc stroke and active phase are derived continuously from
  // how far the page has scrolled into the wrapper.
  //
  // The continuous parts (stroke, indicator head, node "past" state) are written
  // straight to the DOM rather than held in React state. A setState per scroll
  // frame would re-render this whole subtree — which contains a multi-megabyte
  // background image and an AnimatePresence pair — 60+ times a second. Only
  // `activeIdx` goes through React, and that changes 4 times across the pin.
  useEffect(() => {
    if (!isPinned) return;

    let frame = 0;
    // Cached so the scroll path never reads getBoundingClientRect(), which would
    // force a synchronous layout on every frame.
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

      if (arcRef.current) {
        arcRef.current.style.strokeDashoffset = String(ARC_LENGTH - progress * ARC_LENGTH);
      }

      if (headRef.current) {
        const rad = (-80 + progress * 160 - 90) * (Math.PI / 180);
        headRef.current.setAttribute('cx', String(150 + ARC_RADIUS * Math.cos(rad)));
        headRef.current.setAttribute('cy', String(150 + ARC_RADIUS * Math.sin(rad)));
      }

      const idx = Math.max(
        0,
        Math.min(services.length - 1, Math.round(progress * (services.length - 1)))
      );

      nodesRef.current.forEach((node, i) => {
        if (node) node.dataset.past = progress >= i / (services.length - 1) - 0.02 ? 'true' : 'false';
      });

      setActiveIdx((prev) => (prev === idx ? prev : idx));
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
  }, [isPinned]);

  const goToPhase = (idx: number) => {
    if (!isPinned) {
      setActiveIdx(idx);
      return;
    }

    const el = wrapperRef.current;
    if (!el) return;

    const maxScrollPx = window.innerHeight * STEP_VH * (services.length - 1);
    const wrapperTop = el.getBoundingClientRect().top + window.scrollY;

    scrollToTarget(wrapperTop + (idx / (services.length - 1)) * maxScrollPx);
  };

  const activeService = services[activeIdx];

  return (
    <section
      ref={wrapperRef}
      id="services"
      className="relative bg-[#faf8f6] border-t border-[#EEEBE4]"
      style={isPinned ? { height: `${WRAPPER_VH}vh` } : undefined}
    >
      {/* Pinned frame: stays put while the phases advance, then releases. */}
      <div
        className={
          isPinned
            ? 'sticky top-0 h-screen flex flex-col justify-center overflow-hidden'
            : 'py-24'
        }
      >
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Header */}
        <div className="mb-12">
          <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight text-[#2A331F]">
            Your Fractional CTO and Build Team in One
          </h2>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: Big Service Card with Rich Background Image */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.num}
                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative bg-[#eeebe4] p-8 md:p-12 rounded-[2.5rem] border border-[#e2ded5] shadow-xl min-h-[380px] md:min-h-[420px] flex flex-col justify-between overflow-hidden group"
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                  <img
                    src={activeService.bgImg}
                    alt={activeService.title}
                    className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#eeebe4]/80 via-[#eeebe4]/30 to-transparent" />
                </div>

                {/* Top Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F6]/90 backdrop-blur-md flex items-center justify-center font-mono-custom font-bold text-[#2A331F] text-sm border border-[#e2ded5] shadow-xs mb-8">
                    {activeService.num}
                  </div>

                  <h3 className="font-syne font-bold text-3xl md:text-5xl text-[#2A331F] tracking-tight leading-tight">
                    {activeService.title}
                  </h3>
                </div>

                {/* Bottom Tags */}
                <div className="relative z-10 pt-8 border-t border-[#2A331F]/10">
                  <div className="flex flex-wrap gap-3">
                    {activeService.deliverables.map((item, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.18 }}
                        className="px-4 py-2 bg-[#FAF8F6]/90 backdrop-blur-md text-[#2A331F] text-xs font-mono-custom font-semibold rounded-xl border border-[#e2ded5] shadow-2xs tracking-wider"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Arc Dial with Continuous Scroll Progress */}
          <div className="lg:col-span-5 flex items-center justify-center relative py-6">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                {/* Dashed background track */}
                <path
                  d={ARC_PATH}
                  fill="none" stroke="#E2DED5" strokeWidth="3" strokeDasharray="6 6"
                />
                {/* Progress stroke, written directly from the scroll handler.
                    No CSS transition — the value already updates once per frame,
                    so easing it again only makes the arc lag behind the wheel.
                    Gold rather than green: the arc crosses the olive nodes, and
                    a green-on-green trail is invisible at the exact moment it's
                    meant to show you where you are. */}
                <path
                  ref={arcRef}
                  d={ARC_PATH}
                  fill="none" stroke="#B99A62" strokeWidth="3.5"
                  style={{ strokeDasharray: ARC_LENGTH, strokeDashoffset: ARC_LENGTH }}
                />
                {/* Continuous moving indicator head along the arc */}
                <circle ref={headRef} cx={50} cy={150} r="5" fill="#B99A62" />
              </svg>

              <div className="text-center z-10">
                <span className="font-mono-custom text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
                  PHASE
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="font-syne text-5xl md:text-6xl font-bold text-[#2A331F] block"
                  >
                    0{activeIdx + 1}
                  </motion.span>
                </AnimatePresence>
                <span className="font-mono-custom text-xs text-zinc-500 block mt-1">
                  of 0{services.length}
                </span>
              </div>

              {services.map((item, idx) => {
                const radAngle = (arcAngles[idx] - 90) * (Math.PI / 180);
                const cx = 150 + ARC_RADIUS * Math.cos(radAngle);
                const cy = 150 + ARC_RADIUS * Math.sin(radAngle);
                const isActive = activeIdx === idx;

                return (
                  <button
                    key={item.num}
                    ref={(node) => { nodesRef.current[idx] = node; }}
                    onClick={() => goToPhase(idx)}
                    style={{
                      left: `${(cx / 300) * 100}%`,
                      top: `${(cy / 300) * 100}%`
                    }}
                    // `isPast` is a continuous function of scroll, so it is carried
                    // on a data attribute the scroll handler writes and resolved in
                    // CSS — keeping it out of the React render path.
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center font-mono-custom font-bold text-sm transition-all duration-300 z-20 cursor-pointer ${
                      isActive
                        ? "bg-[#2A331F] text-[#faf8f6] border-2 border-[#B99A62] shadow-xl scale-125"
                        : "data-[past=true]:bg-emerald-600 data-[past=true]:text-white data-[past=true]:border data-[past=true]:border-emerald-500 data-[past=true]:shadow-md data-[past=true]:scale-105 data-[past=false]:bg-[#EEEBE4] data-[past=false]:text-zinc-600 data-[past=false]:border data-[past=false]:border-[#E2DED5] data-[past=false]:hover:bg-[#2A331F] data-[past=false]:hover:text-white"
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
