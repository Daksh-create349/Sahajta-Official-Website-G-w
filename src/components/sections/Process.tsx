import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import discoveryImg from '@/assets/discovery-inspect.png';
import slaBuildImg from '@/assets/sla-build.png';
import integrationImg from '@/assets/integration-connect.png';
import handoverImg from '@/assets/handover-ownership.png';

const steps = [
  {
    num: "Step 01",
    topTag: "ONE CLEAR GOAL",
    title: "Set the Goal",
    time: "Sprint Step 01",
    subtitle: "You tell us what matters now. We help pick the right work.",
    visualCard: (
      <div className="flex items-center justify-center h-full w-full lg:w-64 shrink-0 overflow-hidden">
        <img
          src={discoveryImg}
          alt="Set the Goal"
          decoding="async"
          draggable={false}
          className="h-36 md:h-48 w-auto object-contain [filter:url(#brand-green-silhouette)]"
        />
      </div>
    )
  },
  {
    num: "Step 02",
    topTag: "ONE SHORT SPRINT",
    title: "Plan the Work",
    time: "Sprint Step 02",
    subtitle: "We break big work into small parts. You can see it all in Linear.",
    visualCard: (
      <div className="flex items-center justify-center h-full w-full lg:w-64 shrink-0 overflow-hidden">
        <img
          src={slaBuildImg}
          alt="Plan the Work"
          decoding="async"
          draggable={false}
          className="h-36 md:h-48 w-auto object-contain [filter:url(#brand-green-silhouette)]"
        />
      </div>
    )
  },
  {
    num: "Step 03",
    topTag: "AI-LED BUILD",
    title: "Build and Test",
    time: "Sprint Step 03",
    subtitle: "We use AI to help us code, test, and fix work fast.",
    visualCard: (
      <div className="flex items-center justify-center h-full w-full lg:w-64 shrink-0 overflow-hidden">
        <img
          src={integrationImg}
          alt="Build and Test"
          decoding="async"
          draggable={false}
          className="h-36 md:h-48 w-auto object-contain [filter:url(#brand-green-silhouette)]"
        />
      </div>
    )
  },
  {
    num: "Step 04",
    topTag: "YOU SAY GO",
    title: "Review and Ship",
    time: "Sprint Step 04",
    subtitle: "You review the work. When you say yes, we make it live.",
    visualCard: (
      <div className="flex items-center justify-center h-full w-full lg:w-64 shrink-0 overflow-hidden">
        <img
          src={handoverImg}
          alt="Review and Ship"
          decoding="async"
          draggable={false}
          className="h-36 md:h-48 w-auto object-contain [filter:url(#brand-green-silhouette)]"
        />
      </div>
    )
  }
];

/** Extra top offset per card, so every buried card keeps a visible sliver. */
const PEEK_REM = 1.25;

/** How much a card shrinks for each card that ends up stacked on top of it. */
const SHRINK_PER_CARD = 0.035;

function CardItem({ step, index, total }: { step: typeof steps[0]; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 0 when this card reaches its pinned position, 1 once the next card has
  // fully covered it (the wrappers are adjacent, so the container's bottom
  // passing the viewport top means the next card is in place). This is the
  // window during which the card should recede into the deck.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // The front card never shrinks; each card behind it settles one notch smaller.
  const targetScale = 1 - (total - index - 1) * SHRINK_PER_CARD;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-[calc(8rem_+_var(--peek))] md:top-[calc(9rem_+_var(--peek))] mb-12"
      style={{ zIndex: index + 1, '--peek': `${index * PEEK_REM}rem` } as CSSProperties}
    >
      <motion.div
        // Opaque background and no opacity animation — cards in a stack must
        // fully hide the ones behind them. Shrinking from the top edge keeps
        // each buried card's sliver visible instead of pulling it under.
        //
        // `willChange: transform` matters here: without it the browser
        // re-rasterises the card — including its two large blurred shadows — at
        // every scale step, which is what made this deck stutter on weak GPUs.
        style={{
          scale,
          transformOrigin: 'top center',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
        className="bg-[#F0EFE6] border border-[#DDD8CC] rounded-[2.5rem] p-8 md:p-12 shadow-[0_12px_30px_-12px_rgba(11,66,42,0.08)] min-h-[320px] md:min-h-[360px] flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-[#6B7E76] font-normal uppercase tracking-wider">({step.num})</span>
              <span className="text-xs font-semibold text-[#A67F2E] px-3 py-1 bg-[#F5EDD6] rounded-full border border-[#D9B75B]/40">
                {step.topTag}
              </span>
            </div>
            <h3 className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl text-[#0B422A] tracking-tight leading-none">
              {step.title}
            </h3>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-between gap-8">
            <p className="font-syne text-lg md:text-xl text-[#121212] leading-relaxed font-normal flex-1">
              {step.subtitle}
            </p>
            {step.visualCard}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative bg-[#FDFCF0] pt-24 pb-32 border-t border-[#DDD8CC]">
      {/* Brand Green Silhouette SVG Filter - Tints illustrations to #0B422A and removes off-white backgrounds */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0 w-0 h-0 overflow-hidden" aria-hidden="true">
        <filter id="brand-green-silhouette" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.8" intercept="-0.4" />
            <feFuncG type="linear" slope="1.8" intercept="-0.4" />
            <feFuncB type="linear" slope="1.8" intercept="-0.4" />
          </feComponentTransfer>
          <feColorMatrix type="matrix" values="
            0 0 0 0 0.043
            0 0 0 0 0.258
            0 0 0 0 0.165
            -0.333 -0.333 -0.333 1 0
          " />
        </filter>
      </svg>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight text-[#0B422A]">
            More Gets Built Each Week
          </h2>
          <p className="text-[#6B7E76] text-base font-normal mt-3">
            Our AI-native team picks one goal, works in short sprints, and ships useful work each week.
          </p>
        </div>

        {/* Card Deck Sticky Container */}
        <div className="relative">
          {steps.map((step, idx) => (
            <CardItem
              key={idx}
              step={step}
              index={idx}
              total={steps.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
