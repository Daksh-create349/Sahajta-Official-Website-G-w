import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    num: '01',
    question: 'What kind of businesses do you work with?',
    answer:
      'We work with early-stage founders building an MVP, fast-moving companies adding custom AI capabilities, and teams that need a reliable technical build partner without hiring overhead.',
  },
  {
    num: '02',
    question: 'How fast can you actually ship?',
    answer:
      'We ship a working prototype to a live staging environment within 24–48 hours for scoped MVP builds, and operate in short weekly production sprints.',
  },
  {
    num: '03',
    question: 'Do we own the code after the project?',
    answer:
      'Yes, 100%. You own the complete source code repository, architecture docs, database schemas, and deployment scripts with zero vendor lock-in.',
  },
  {
    num: '04',
    question: 'What does the engagement look like?',
    answer:
      'We set one clear goal per weekly sprint. No long hiring, no retainers, and no equity dilution. Scope is agreed before a single line of code is written.',
  },
  {
    num: '05',
    question: 'How much does it cost?',
    answer:
      "Projects are scoped and priced per engagement. Tell us what you're building and we'll give you a number within 24 hours.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Simple Centered Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono-custom text-xs font-semibold uppercase tracking-widest text-[#6B7E76] block mb-2">
            Still wondering if this is for you?
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B422A]">
            FAQs
          </h2>
          <p className="mt-3 text-sm sm:text-base font-normal text-[#6B7E76] max-w-md mx-auto">
            Everything you need to know about working with Sahajta.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.num}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#F0EFE6] border-[#0B422A]/30 shadow-xs'
                    : 'bg-[#F0EFE6]/70 border-[#DDD8CC] hover:bg-[#F0EFE6] hover:border-[#DDD8CC]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 sm:p-6 text-left select-none focus:outline-hidden"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 pr-2">
                    <span className={`font-mono-custom text-xs font-bold transition-colors duration-200 ${isOpen ? 'text-[#0B422A]' : 'text-[#9AA89F]'}`}>
                      {faq.num}
                    </span>
                    <span className="font-syne text-base sm:text-lg font-bold tracking-tight text-[#121212]">
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${
                      isOpen
                        ? 'border-[#0B422A] bg-[#0B422A] text-white rotate-45'
                        : 'border-[#DDD8CC] bg-[#FDFCF0] text-[#6B7E76]'
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed text-[#5A6D65] pl-10 sm:pl-12 border-t border-[#DDD8CC]/50 mt-1">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
