import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Engagement = {
  line: string;
  name: string;
  flag?: string;
  price: string;
  priceNote: string;
  summary: string;
  deliverables: string[];
};

const engagements: Engagement[] = [
  {
    line: '01',
    name: 'MVP Engineering',
    flag: 'Core offering',
    price: 'Scoped',
    priceNote: 'Quoted in 24h',
    summary:
      'Zero-to-live production AI build with full auth, DB, pipelines & fast deployment.',
    deliverables: [
      'Next.js, Auth, Database & AI Core',
      '24–48 hours to live environment',
      'AI built into your product',
      'Clean, professional codebase',
      '100% code & IP handover',
    ],
  },
  {
    line: '02',
    name: 'AI Automation & Agents',
    price: '₹40K',
    priceNote: 'Starting from',
    summary:
      'We build bots and automations that handle your repetitive work – so you don\'t have to.',
    deliverables: [
      'Built custom for your business',
      'Zero templates — custom logic',
      'Slack, Sheets & Notion integration',
      'Delivery in 48–72 hours',
      'Full workflow ownership',
    ],
  },
  {
    line: '03',
    name: 'AI Feature Integration',
    price: '₹75K',
    priceNote: 'Starting from',
    summary:
      'We add AI to your existing product without breaking anything that already works.',
    deliverables: [
      'Existing stack architecture audit',
      'OpenAI, Gemini & Claude models',
      'Smart search & document reading',
      'Daily deployable milestones',
      'Zero vendor lock-in',
    ],
  },
  {
    line: '04',
    name: 'Website Design & Development',
    price: '₹35K',
    priceNote: 'Starting from',
    summary:
      'High-converting, ultra-fast Next.js websites built for fast-moving founders.',
    deliverables: [
      'Custom design — 0 templates',
      'Production-ready Next.js',
      'Mobile-first performance',
      'Optional CMS integration',
      'Complete repository ownership',
    ],
  },
];

function ArrowGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 9 9 3M4.4 3H9v4.6" />
    </svg>
  );
}

function Row({
  item,
  isOpen,
  onToggle,
}: {
  item: Engagement;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = `rate-${item.line}`;

  return (
    <div
      className={`relative border-t border-[#DDD8CC] transition-colors duration-500 first:border-t-0 ${
        isOpen ? 'bg-[#0B422A]' : 'bg-transparent hover:bg-[#FDFCF0]/60'
      }`}
    >
      {/* ── Always-visible line: number · name · price ──────── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="relative flex w-full cursor-pointer items-center gap-5 px-6 py-7 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-zinc-400 md:gap-8 md:px-12 md:py-8"
      >
        <span
          className={`font-mono-custom hidden text-xs font-bold tabular-nums transition-colors duration-400 sm:block ${
            isOpen ? 'text-[#FDFCF0]' : 'text-[#6B7E76]'
          }`}
        >
          {item.line}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`font-syne block truncate text-xl font-bold tracking-tight transition-colors duration-400 md:text-[1.7rem] ${
              isOpen ? 'text-[#FDFCF0]' : 'text-[#121212]'
            }`}
          >
            {item.name}
          </span>
          {item.flag && (
            <span
              className={`font-mono-custom mt-1.5 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-400 ${
                isOpen
                  ? 'border-white/20 bg-white/10 text-[#EBF2EE]'
                  : 'border-[#DDD8CC] bg-[#F0EFE6] text-[#6B7E76]'
              }`}
            >
              {item.flag}
            </span>
          )}
        </span>

        <span className="shrink-0 text-right">
          <span
            className={`font-mono-custom block text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-400 ${
              isOpen ? 'text-[#9AA89F]' : 'text-[#6B7E76]'
            }`}
          >
            {item.priceNote}
          </span>
          <span
            className={`font-syne block text-[1.9rem] font-bold leading-none tracking-tight tabular-nums transition-colors duration-400 md:text-[2.6rem] ${
              isOpen ? 'text-[#FDFCF0]' : 'text-[#121212]'
            }`}
          >
            {item.price}
          </span>
        </span>

        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
            isOpen
              ? 'rotate-180 border-white/20 bg-white/10 text-white'
              : 'border-[#DDD8CC] bg-[#FDFCF0] text-[#6B7E76]'
          }`}
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-3 w-3"
          >
            <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
          </svg>
        </span>
      </button>

      {/* ── Disclosed detail ───────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 px-6 pb-9 md:grid-cols-12 md:gap-10 md:px-12 md:pb-11 md:pl-[4.75rem]">
              <p className="font-syne text-base font-normal leading-relaxed text-[#EBF2EE] md:col-span-5 md:text-lg">
                {item.summary}
              </p>

              <div className="md:col-span-7">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {item.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-px w-3 shrink-0 bg-[#9AA89F]"
                      />
                      <span className="text-[13px] font-normal leading-snug text-[#9AA89F]">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="group/cta mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FDFCF0] px-6 py-3 font-syne text-xs font-medium tracking-tight text-[#0B422A] transition-colors duration-300 hover:bg-white hover:text-[#0B422A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Start a project</span>
                  <ArrowGlyph className="h-3 w-3 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Pricing() {
  const reduce = useReducedMotion();
  const [openLine, setOpenLine] = useState<string | null>('01');

  return (
    <section id="pricing" className="border-t border-[#DDD8CC] bg-[#FDFCF0] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-syne text-4xl font-bold tracking-tight text-[#0B422A] md:text-5xl">
              What it costs to ship
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-custom text-xs font-semibold text-[#6B7E76] uppercase tracking-widest md:justify-end">
            <span className="text-[#121212] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6E54]" />
              24h Fixed Quote
            </span>
            <span className="text-[#9AA89F]">/</span>
            <span>100% IP Handover</span>
            <span className="text-[#9AA89F]">/</span>
            <span>SLA Guaranteed</span>
          </div>
        </div>

        {/* ── The rate sheet ─────────────────────────────────── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[2.5rem] border border-[#DDD8CC] bg-[#F0EFE6] shadow-md"
        >
          {engagements.map((item) => (
            <Row
              key={item.line}
              item={item}
              isOpen={openLine === item.line}
              onToggle={() => setOpenLine(openLine === item.line ? null : item.line)}
            />
          ))}
        </motion.div>

        {/* ── Closing terms ──────────────────────────────────── */}
        <div className="mt-7 flex flex-col items-start justify-between gap-4 px-2 sm:flex-row sm:items-center">
          <p className="font-mono-custom text-xs text-[#6B7E76]">
            No retainers. No lock-in. Scope agreed before a line of code is written.
          </p>
          <a
            href="#contact"
            className="group/all inline-flex cursor-pointer items-center gap-2 font-syne text-xs font-bold tracking-tight text-[#0B422A] transition-colors duration-300 hover:text-[#2D6E54] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-600"
          >
            <span>Get a number in 24 hours</span>
            <ArrowGlyph className="h-3 w-3 transition-transform duration-300 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
