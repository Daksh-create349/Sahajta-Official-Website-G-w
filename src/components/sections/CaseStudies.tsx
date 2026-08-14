import { useState } from 'react';
import coverStratapilot from '@/assets/cover-stratapilot.png';
import coverHireai from '@/assets/cover-hireai.png';
import coverInvoice from '@/assets/cover-invoice.png';
import coverBlogagent from '@/assets/cover-blogagent.png';

const cases = [
  {
    title: "Stratapilot",
    subtitle: "Executive Assistant",
    impact: "14x Faster Strategy",
    stack: ["GPT-4o", "AI Automation", "Smart Search"],
    highlights: ["Automated report analysis", "Live competitor modeling"],
    image: coverStratapilot
  },
  {
    title: "HireAI",
    subtitle: "Assessment Engine",
    impact: "72% Screening Cut",
    stack: ["Gemini 1.5", "Automation", "Custom API"],
    highlights: ["Live adaptive interviews", "Voice & code evaluation"],
    image: coverHireai
  },
  {
    title: "Invoice AI Parser",
    subtitle: "Document Intelligence",
    impact: "$2.4M+ Auto-Processed",
    stack: ["Vision AI", "Postgres"],
    highlights: ["99.7% vision parsing accuracy", "Direct ledger auto-sync"],
    image: coverInvoice
  },
  {
    title: "Blog Writing Agent",
    subtitle: "Autonomous Content",
    impact: "+140% Traffic Growth",
    stack: ["Multi-Step AI", "Claude 3.5", "WebSearch"],
    highlights: ["Multi-agent research & draft", "Automated code verification"],
    image: coverBlogagent
  }
];

function FlipCard({ project }: { project: typeof cases[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="group [perspective:1000px] cursor-pointer h-[460px] md:h-[500px] w-full"
    >
      {/* 3D Flipping Rectangular Card Container */}
      <div
        className={`relative w-full h-full rounded-[2.2rem] transition-transform duration-700 [transform-style:preserve-3d] shadow-xl ${
          isFlipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]"
        }`}
      >
        
        {/* ================= FRONT SIDE (Minimal Picture Cover) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-[2.2rem] overflow-hidden [backface-visibility:hidden] border border-[#DDD8CC]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2818]/92 via-[#0B422A]/40 to-transparent" />

          {/* Front Content Overlay */}
          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between text-white">
            
            {/* Top Subtitle Tag */}
            <div className="flex items-center justify-between">
              <span className="font-mono-custom text-[10px] font-semibold text-white/90 uppercase tracking-widest px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full border border-white/20">
                {project.subtitle}
              </span>

              <span className="text-xs font-mono-custom text-white/80 bg-[#0B2818]/45 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                ↻
              </span>
            </div>

            {/* Bottom Title & Impact Badge */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D9B75B]/20 border border-[#D9B75B]/40 text-[#D9B75B] font-syne font-semibold text-xs mb-2.5 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9B75B] animate-pulse" />
                <span>{project.impact}</span>
              </div>

              <h3 className="font-syne font-bold text-2xl md:text-3xl text-white tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

          </div>
        </div>

        {/* ================= BACK SIDE (Visual & Punchy Project Info) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-[2.2rem] bg-[#F0EFE6] border border-[#DDD8CC] p-6 md:p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md">
          
          <div>
            {/* Top Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono-custom text-[10px] font-semibold text-[#6B7E76] uppercase tracking-wider block mb-0.5">
                  {project.subtitle}
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#0B422A] leading-tight">
                  {project.title}
                </h3>
              </div>

              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#FDFCF0] border border-[#DDD8CC] flex items-center justify-center text-[#0B422A] font-semibold hover:bg-[#0B422A] hover:text-white transition-colors shrink-0 text-xs shadow-xs"
              >
                ↗
              </a>
            </div>

            {/* Impact Metric Tag */}
            <div className="font-mono-custom text-xs font-bold text-[#2D6E54] uppercase tracking-widest flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6E54]" />
              <span>{project.impact}</span>
            </div>

            {/* Clean Feature Highlights */}
            <div className="space-y-2.5 mb-6">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-[#121212] text-xs font-medium">
                  <span className="w-1 h-1 rounded-full bg-[#6B7E76] shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Tech Stack & Action */}
          <div>
            <span className="font-mono-custom text-[10px] uppercase tracking-wider text-[#9AA89F] block mb-2 font-semibold">
              Engineered With
            </span>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono-custom text-[10px] px-2 py-0.5 bg-[#FDFCF0] text-[#121212] rounded border border-[#DDD8CC] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-[#0B422A] hover:text-[#2D6E54] transition-colors"
            >
              <span>Build System</span>
              <span>↗</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-[#0B422A]">
            AI Case Studies
          </h2>
        </div>

        {/* Single Row 4-Column Rectangular Cards Grid (||||) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((project, idx) => (
            <FlipCard key={idx} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
