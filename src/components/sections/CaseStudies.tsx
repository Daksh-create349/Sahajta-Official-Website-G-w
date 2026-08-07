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
    stack: ["GPT-4o", "LangGraph", "VectorDB"],
    highlights: ["Automated report analysis", "Live competitor modeling"],
    image: coverStratapilot
  },
  {
    title: "HireAI",
    subtitle: "Assessment Engine",
    impact: "72% Screening Cut",
    stack: ["Gemini 1.5", "n8n", "FastAPI"],
    highlights: ["Live adaptive interviews", "Voice & code evaluation"],
    image: coverHireai
  },
  {
    title: "Invoice AI Parser",
    subtitle: "Document Intelligence",
    impact: "$2.4M+ Auto-Processed",
    stack: ["Llama-3-Vision", "Postgres"],
    highlights: ["99.7% vision parsing accuracy", "Direct ledger auto-sync"],
    image: coverInvoice
  },
  {
    title: "Blog Writing Agent",
    subtitle: "Autonomous Content",
    impact: "+140% Traffic Growth",
    stack: ["CrewAI", "Claude 3.5", "WebSearch"],
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
        <div className="absolute inset-0 w-full h-full rounded-[2.2rem] overflow-hidden [backface-visibility:hidden] border border-[#e2ded5]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12170D]/92 via-[#1A2013]/40 to-[#1A2013]/12" />

          {/* Front Content Overlay */}
          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between text-white">
            
            {/* Top Subtitle Tag */}
            <div className="flex items-center justify-between">
              <span className="font-mono-custom text-[10px] font-semibold text-white/90 uppercase tracking-widest px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full border border-white/20">
                {project.subtitle}
              </span>

              <span className="text-xs font-mono-custom text-white/80 bg-[#12170D]/45 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                ↻
              </span>
            </div>

            {/* Bottom Title & Impact Badge */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-syne font-semibold text-xs mb-2.5 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.impact}</span>
              </div>

              <h3 className="font-syne font-bold text-2xl md:text-3xl text-white tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

          </div>
        </div>

        {/* ================= BACK SIDE (Visual & Punchy Project Info) ================= */}
        <div className="absolute inset-0 w-full h-full rounded-[2.2rem] bg-[#EEEBE4] border border-[#E2DED5] p-6 md:p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl">
          
          <div>
            {/* Top Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono-custom text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-0.5">
                  {project.subtitle}
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#2A331F] leading-tight">
                  {project.title}
                </h3>
              </div>

              <a
                href="#contact"
                className="w-8 h-8 rounded-full bg-[#faf8f6] border border-[#e2ded5] flex items-center justify-center text-[#2A331F] font-semibold hover:bg-[#2A331F] hover:text-white transition-colors shrink-0 text-xs shadow-xs"
              >
                ↗
              </a>
            </div>

            {/* Impact Metric Tag */}
            <div className="font-mono-custom text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>{project.impact}</span>
            </div>

            {/* Clean Feature Highlights */}
            <div className="space-y-2.5 mb-6">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-zinc-800 text-xs font-medium">
                  <span className="w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Tech Stack & Action */}
          <div>
            <span className="font-mono-custom text-[10px] uppercase tracking-wider text-zinc-400 block mb-2 font-semibold">
              Engineered With
            </span>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono-custom text-[10px] px-2 py-0.5 bg-[#FAF8F6] text-zinc-700 rounded border border-[#E2DED5] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-syne font-bold text-[#2A331F] hover:text-[#7E663A] transition-colors"
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
    <section id="case-studies" className="py-24 bg-[#faf8f6] border-t border-[#eeebe4]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-[#2A331F]">
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
