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
      <div className="flex items-center justify-center w-full sm:w-auto sm:shrink-0 sm:w-56 lg:w-64 overflow-hidden">
        <img
          src={discoveryImg}
          alt="Set the Goal"
          decoding="async"
          draggable={false}
          className="h-20 sm:h-36 md:h-44 w-auto object-contain [filter:url(#brand-green-silhouette)]"
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
      <div className="flex items-center justify-center w-full sm:w-auto sm:shrink-0 sm:w-56 lg:w-64 overflow-hidden">
        <img
          src={slaBuildImg}
          alt="Plan the Work"
          decoding="async"
          draggable={false}
          className="h-20 sm:h-36 md:h-44 w-auto object-contain [filter:url(#brand-green-silhouette)]"
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
      <div className="flex items-center justify-center w-full sm:w-auto sm:shrink-0 sm:w-56 lg:w-64 overflow-hidden">
        <img
          src={integrationImg}
          alt="Build and Test"
          decoding="async"
          draggable={false}
          className="h-20 sm:h-36 md:h-44 w-auto object-contain [filter:url(#brand-green-silhouette)]"
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
      <div className="flex items-center justify-center w-full sm:w-auto sm:shrink-0 sm:w-56 lg:w-64 overflow-hidden">
        <img
          src={handoverImg}
          alt="Review and Ship"
          decoding="async"
          draggable={false}
          className="h-20 sm:h-36 md:h-44 w-auto object-contain [filter:url(#brand-green-silhouette)]"
        />
      </div>
    )
  }
];

function CardItem({ step, index, total }: { step: typeof steps[0]; index: number; total: number }) {
  const isLast = index === total - 1;

  return (
    <div
      className={`sticky top-20 sm:top-28 md:top-32 ${
        isLast ? 'mb-0' : 'mb-[60vh] sm:mb-[65vh] md:mb-[70vh]'
      }`}
      style={{
        zIndex: index + 1,
      }}
    >
      <div
        className="bg-[#F0EFE6] border border-[#DDD8CC] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-4.5 sm:p-6 md:p-8 lg:p-12 shadow-[0_16px_36px_-12px_rgba(11,66,42,0.12)] min-h-[200px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3 md:mb-4 flex-wrap">
              <span className="text-xs sm:text-sm text-[#6B7E76] font-normal uppercase tracking-wider">({step.num})</span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#A67F2E] px-2 py-0.5 sm:px-2.5 sm:py-0.5 md:px-3 md:py-1 bg-[#F5EDD6] rounded-full border border-[#D9B75B]/40">
                {step.topTag}
              </span>
            </div>
            <h3 className="font-syne font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#0B422A] tracking-tight leading-tight sm:leading-none">
              {step.title}
            </h3>
          </div>

          {/* Right Column: stacks text then image on mobile, side-by-side from sm */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 md:gap-8">
            <p className="font-syne text-xs sm:text-base md:text-lg lg:text-xl text-[#121212] leading-relaxed font-normal flex-1">
              {step.subtitle}
            </p>
            {step.visualCard}
          </div>

        </div>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative bg-[#FDFCF0] pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-32 md:pb-40 border-t border-[#DDD8CC]">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B422A]">
            More Gets Built Each Week
          </h2>
          <p className="text-[#6B7E76] text-sm sm:text-base font-normal mt-2 sm:mt-3">
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
