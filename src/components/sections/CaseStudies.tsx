import { useState } from 'react';

interface CaseStudyProject {
  num: string;
  title: string;
  headline: string;
  highlights: string[];
  shippedIn: string;
  link?: string;
  image?: string;
}

const cases: CaseStudyProject[] = [
  {
    num: "01",
    title: "Stratapilot",
    headline: "Turns messy ad data into one plan — 14x faster.",
    highlights: [
      "Multi-model AI picks the best output for each task",
      "Every campaign idea scored and versioned",
      "Hours of planning cut to minutes"
    ],
    shippedIn: "1 month",
    image: "/cases/stratapilot.jpg"
  },
  {
    num: "02",
    title: "Ad Wise AI",
    headline: "One dashboard for every ad rupee you spend — and every one you're losing.",
    highlights: [
      "Meta and Google Ads data in one place",
      "Shows exactly where ad revenue is leaking",
      "Turns guesswork into clear, fast decisions"
    ],
    shippedIn: "3 weeks",
    image: "/cases/ad-wise-ai.jpg"
  },
  {
    num: "03",
    title: "vibe2real.codes",
    headline: "A debugging simulator most developers fail on their first try.",
    highlights: [
      "87% fail their first attempt",
      "15 real production incidents, zero hints",
      "Free and fully open source"
    ],
    shippedIn: "24 hours",
    link: "https://vibe2real.codes",
    image: "/cases/vibe2real.jpg"
  },
  {
    num: "04",
    title: "Reddit Lead Finder",
    headline: "Finds people already asking for help — before they ask you.",
    highlights: [
      "Scans Reddit for real intent signals",
      "Filters signal from noise automatically",
      "Sends outreach the moment intent is confirmed"
    ],
    shippedIn: "2 weeks",
    image: "/cases/reddit-lead-finder.jpg"
  },
  {
    num: "05",
    title: "Voice Support Agent",
    headline: "Picks up every call, day or night.",
    highlights: [
      "Handles customer support calls automatically",
      "Available 24/7, zero hold time",
      "Escalates to a human only when it truly needs one"
    ],
    shippedIn: "8 days",
    image: "/cases/voice-support-agent.jpg"
  },
  {
    num: "06",
    title: "TryOn Studio",
    headline: "Lets customers see themselves in the outfit — before they buy.",
    highlights: [
      "Upload a photo, try on any outfit instantly",
      "Removes the guesswork of shopping online",
      "Fewer returns, more confident purchases"
    ],
    shippedIn: "1 week",
    image: "/cases/tryon-studio.jpg"
  },
  {
    num: "07",
    title: "Smart Lead Radar",
    headline: "Finds companies about to hire — before your competitors do.",
    highlights: [
      "Tracks funding rounds, expansion news, and hiring signals",
      "Flags companies showing real intent to hire",
      "Staffing agencies reach out first, not last"
    ],
    shippedIn: "6 days",
    image: "/cases/smart-lead-radar.jpg"
  }
];

// Distinct "SHIPPED IN" stat chip — never renders as body text.
function ShippedBadge({ value, tone }: { value: string; tone: 'onLight' | 'onDark' }) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono-custom text-[10px] font-bold uppercase tracking-[0.14em] whitespace-nowrap";
  if (tone === 'onLight') {
    return (
      <span className={`${base} border border-[#D9B75B]/50 bg-[#FDFCF0] text-[#A67F2E]`}>
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#D9B75B]" />
        <span className="text-[#6B7E76]">Shipped in</span>
        <span>{value}</span>
      </span>
    );
  }
  return (
    <span className={`${base} border border-[#D9B75B]/30 bg-white/[0.06] text-[#D9B75B]`}>
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#D9B75B]" />
      <span className="text-[#EBF2EE]/70">Shipped in</span>
      <span>{value}</span>
    </span>
  );
}

interface FlipCardProps {
  project: CaseStudyProject;
  isFlipped: boolean;
  onToggle: () => void;
}

function FlipCard({ project, isFlipped, onToggle }: FlipCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const showBack = isFlipped || isHovered;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
      className="group cursor-pointer h-[390px] sm:h-[450px] md:h-[490px] w-full select-none touch-manipulation"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Flipping Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)',
          transform: showBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >

        {/* ================= FRONT SIDE ================= */}
        <div className={`absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[2.2rem] bg-[#F0EFE6] border border-[#DDD8CC] flex flex-col justify-between text-left [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(1px)] transition-all duration-300 hover:border-[#0B422A] group/card overflow-hidden shadow-2xs ${project.image ? '' : 'p-5 sm:p-6 md:p-7 lg:p-8'}`}>
          {project.image ? (
            /* Full-Bleed Edge-to-Edge Clean Image */
            <img
              src={project.image}
              alt={`${project.title} - Sahajta AI Case Study`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            /* Standard Text-based Front */
            <>
              {/* Top Row: Index number & Category label */}
              <div className="flex justify-between items-start pointer-events-none z-10">
                <span className="font-mono-custom text-xs font-semibold text-[#0B422A] tracking-wider">
                  {project.num}
                </span>
                <span className="font-mono-custom text-[10px] text-[#6B7E76] uppercase tracking-widest">
                  CASE STUDY
                </span>
              </div>

              {/* Center: Title + one-line headline */}
              <div className="pointer-events-none my-auto pr-2">
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-[#0B422A] tracking-tight leading-tight group-hover/card:translate-x-1.5 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 text-[#121212] text-xs sm:text-[15px] font-normal leading-relaxed">
                  {project.headline}
                </p>
              </div>

              {/* Bottom Row: Shipped badge & flip indicator */}
              <div className="flex justify-between items-center pt-3 border-t border-[#DDD8CC]/60 pointer-events-none gap-3 z-10">
                <ShippedBadge value={project.shippedIn} tone="onLight" />
                <div className="flex items-center gap-1.5 text-xs text-[#0B422A] font-mono-custom">
                  <span className="hidden sm:inline text-[11px] text-[#6B7E76]">Flip</span>
                  <span className="transition-transform duration-300 group-hover/card:translate-x-1 shrink-0 font-bold">
                    ↻
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ================= BACK SIDE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[2.2rem] bg-[#0B422A] text-[#FDFCF0] border border-[#0B422A] p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)] shadow-md">
          {/* Top Header */}
          <div>
            <div className="mb-2">
              <span className="font-mono-custom text-[9px] sm:text-[10px] font-semibold text-[#D9B75B] uppercase tracking-[0.2em]">
                Case Study {project.num}
              </span>
            </div>

            <h3 className="font-syne font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
              {project.title}
            </h3>
          </div>

          {/* 3-Step Execution Highlights */}
          <div className="space-y-2 sm:space-y-3 md:space-y-3.5 my-auto py-2">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#EBF2EE] font-normal leading-relaxed">
                <span className="font-mono-custom text-[10px] sm:text-[11px] font-bold text-[#D9B75B] select-none pt-0.5">
                  0{idx + 1}
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Shipped stat badge — distinct chip under the bullets */}
          <div className="pt-1">
            <ShippedBadge value={project.shippedIn} tone="onDark" />
          </div>

          {/* Bottom CTA */}
          <div className="mt-3 pt-3 sm:pt-4 border-t border-white/15 flex items-center justify-end">
            <a
              href={project.link || "#contact"}
              onClick={(e) => e.stopPropagation()}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className="font-syne text-xs font-bold text-[#D9B75B] hover:text-white transition-colors flex items-center gap-1 shrink-0 touch-manipulation"
            >
              <span>{project.link ? "Visit" : "Build with us"}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export function CaseStudies() {
  const [flippedIndex, setFlippedIndex] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setFlippedIndex((prev) => (prev === id ? null : id));
  };

  // Repeat within each set so the track always exceeds viewport width for a
  // seamless loop even with a small number of cards.
  const loop = [...cases, ...cases];

  return (
    <section id="case-studies" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FDFCF0] border-t border-[#DDD8CC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-6 sm:mb-12 md:mb-16">
          <span className="font-mono-custom text-[11px] font-semibold text-[#6B7E76] uppercase tracking-[0.2em] block mb-2">
            PROVEN RESULTS
          </span>
          <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B422A]">
            AI Case Studies
          </h2>
        </div>

        {/* Mobile Touch Snap Carousel (Visible on mobile screens < 768px) */}
        <div className="md:hidden">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 no-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {cases.map((project, idx) => {
              const cardId = `mobile-${idx}`;
              return (
                <div key={cardId} className="w-[82vw] max-w-[320px] shrink-0 snap-center">
                  <FlipCard
                    project={project}
                    isFlipped={flippedIndex === cardId}
                    onToggle={() => handleToggle(cardId)}
                  />
                </div>
              );
            })}
          </div>
          {/* Mobile swipe hint */}
          <div className="flex justify-center items-center gap-1.5 pt-1">
            <span className="font-mono-custom text-[11px] text-[#9AA89F]">
              ← Swipe for more cases →
            </span>
          </div>
        </div>

        {/* Infinite Scrolling Horizontal Card Marquee (Desktop & Tablet >= 768px) */}
        <div className="hidden md:block cases-marquee-viewport overflow-hidden py-6">
          {/* Edge Fade Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#FDFCF0] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#FDFCF0] to-transparent z-20" />

          <div className="cases-marquee-track">
            {[0, 1].map((set) => (
              <div
                key={set}
                className="flex gap-6 shrink-0"
                aria-hidden={set === 1 ? 'true' : undefined}
              >
                {loop.map((project, idx) => {
                  const cardId = `${set}-${idx}`;
                  return (
                    <div key={cardId} className="w-[300px] sm:w-[340px] md:w-[380px] shrink-0">
                      <FlipCard
                        project={project}
                        isFlipped={flippedIndex === cardId}
                        onToggle={() => handleToggle(cardId)}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

