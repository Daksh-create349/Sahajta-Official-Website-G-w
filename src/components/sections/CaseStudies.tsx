import { useState } from 'react';

const cases = [
  {
    num: "01",
    title: "Stratapilot",
    subtitle: "Executive Assistant",
    impact: "14x Faster Strategy",
    stack: ["GPT-4o", "AI Automation", "Smart Search"],
    highlights: [
      "Automated document & brief ingestion",
      "Live competitor & market vector model",
      "Executive strategy summary in 1.2s"
    ]
  },
  {
    num: "02",
    title: "HireAI",
    subtitle: "Assessment Engine",
    impact: "72% Screening Cut",
    stack: ["Gemini 1.5", "Automation", "Custom API"],
    highlights: [
      "24kHz real-time adaptive voice interviews",
      "Automated coding & logic assessment",
      "Instant rubric evaluation score"
    ]
  },
  {
    num: "03",
    title: "Invoice AI Parser",
    subtitle: "Document Intelligence",
    impact: "$2.4M+ Auto-Processed",
    stack: ["Vision AI", "Postgres"],
    highlights: [
      "99.7% OCR precision on multi-page PDFs",
      "VAT & line-item auto-reconciliation",
      "Direct ERP & accounting ledger auto-sync"
    ]
  },
  {
    num: "04",
    title: "Blog Writing Agent",
    subtitle: "Autonomous Content",
    impact: "+140% Traffic Growth",
    stack: ["Multi-Step AI", "Claude 3.5", "WebSearch"],
    highlights: [
      "Multi-agent live research with citations",
      "Automated compiler code verification",
      "SEO rank distribution pipeline"
    ]
  }
];

interface FlipCardProps {
  project: typeof cases[0];
  isFlipped: boolean;
  onToggle: () => void;
}

function FlipCard({ project, isFlipped, onToggle }: FlipCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggle}
      className="group cursor-pointer h-[420px] sm:h-[460px] md:h-[490px] w-full select-none touch-manipulation"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Flipping Container — hover on desktop, tap on mobile */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          transform: (isHovered || isFlipped) ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >

        {/* ================= FRONT SIDE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[2.2rem] bg-[#F0EFE6] border border-[#DDD8CC] p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center text-center [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(1px)] transition-colors hover:border-[#0B422A]/40 shadow-xs">
          {/* Center Content: Giant Monogram Index & Bold Title */}
          <div className="relative z-10 flex flex-col items-center pointer-events-none">
            <span className="font-syne text-6xl sm:text-7xl md:text-8xl font-bold text-[#DDD8CC]/80 leading-none select-none tracking-tighter block mb-2 transition-transform duration-500 group-hover:scale-105">
              {project.num}
            </span>
            <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-[#121212] tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[2.2rem] bg-[#0B422A] text-[#FDFCF0] border border-[#0B422A] p-5 sm:p-6 md:p-7 lg:p-8 flex flex-col justify-between [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)] shadow-md">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-custom text-[9px] sm:text-[10px] font-semibold text-[#D9B75B] uppercase tracking-[0.2em]">
                {project.subtitle}
              </span>
              <span className="font-mono-custom text-xs text-white/50">
                ↻
              </span>
            </div>

            <h3 className="font-syne font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-snug">
              {project.title}
            </h3>

            <div className="mt-2 text-[10px] sm:text-xs font-mono-custom text-[#D9B75B] font-semibold uppercase tracking-wider">
              {project.impact}
            </div>
          </div>

          {/* 3-Step Execution Highlights */}
          <div className="space-y-2.5 sm:space-y-3 md:space-y-3.5 my-auto py-2">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#EBF2EE] font-normal leading-relaxed">
                <span className="font-mono-custom text-[10px] sm:text-[11px] font-bold text-[#D9B75B] select-none pt-0.5">
                  0{idx + 1}
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Bottom Tech Metadata & CTA */}
          <div className="pt-3 sm:pt-4 border-t border-white/15 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono-custom text-[9px] sm:text-[10px] text-white/70 tracking-wide"
                >
                  {tech}{idx < project.stack.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="font-syne text-xs font-bold text-[#D9B75B] hover:text-white transition-colors flex items-center gap-1 shrink-0 touch-manipulation"
            >
              <span>Build</span>
              <span>↗</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export function CaseStudies() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="case-studies" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B422A]">
            AI Case Studies
          </h2>
        </div>

        {/* Single Row 4-Column Rectangular Cards Grid (||||) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {cases.map((project, idx) => (
            <FlipCard
              key={idx}
              project={project}
              isFlipped={flippedIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
