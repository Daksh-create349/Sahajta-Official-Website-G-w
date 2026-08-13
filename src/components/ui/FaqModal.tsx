import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What kind of businesses do you work with?',
    answer:
      'We work with early-stage founders building an MVP, fast-moving companies adding custom AI capabilities, and teams that need a reliable technical build partner without hiring overhead.',
  },
  {
    question: 'How fast can you actually ship?',
    answer:
      'We ship a working prototype to a live staging environment within 24–48 hours for scoped MVP builds, and operate in short weekly production sprints.',
  },
  {
    question: 'Do we own the code after the project?',
    answer:
      'Yes, 100%. You own the complete source code repository, architecture docs, database schemas, and deployment scripts with zero vendor lock-in.',
  },
  {
    question: 'What does the engagement look like?',
    answer:
      'We set one clear goal per weekly sprint. No long hiring, no retainers, and no equity dilution. Scope is agreed before a single line of code is written.',
  },
  {
    question: 'How much does it cost?',
    answer:
      "Projects are scoped and priced per engagement. Tell us what you're building and we'll give you a number within 24 hours.",
  },
];

type FaqModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FaqModal({ isOpen, onClose }: FaqModalProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Close on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B2818]/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-[#0B422A] p-6 sm:p-10 shadow-2xl text-[#FDFCF0] max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10 shrink-0">
              <div>
                <span className="font-mono-custom text-xs font-semibold uppercase tracking-widest text-zinc-300 block mb-1">
                  Still wondering if this is for you?
                </span>
                <h2 className="font-syne text-3xl sm:text-4xl font-bold tracking-tight text-[#FDFCF0]">
                  FAQs
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm font-normal text-zinc-300">
                  Everything you need to know about working with Sahajta.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Accordion Questions List */}
            <div className="overflow-y-auto pt-6 space-y-3 pr-1 flex-1">
              {faqs.map((faq, idx) => {
                const isOpenIdx = openIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpenIdx ? null : idx)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left focus:outline-hidden"
                    >
                      <span className="font-syne text-base font-bold tracking-tight text-[#FDFCF0]">
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs text-zinc-300 transition-transform duration-300 ${
                          isOpenIdx ? 'rotate-180 bg-white/10 text-white' : ''
                        }`}
                      >
                        ↓
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpenIdx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pt-1 text-xs sm:text-sm font-normal leading-relaxed text-zinc-200">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <span className="font-mono-custom text-xs text-zinc-300">
                Have a specific question?
              </span>
              <a
                href="mailto:hello@sahajta.com"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-[#FDFCF0] px-5 py-2.5 font-syne text-xs font-medium text-[#0B422A] transition-colors hover:bg-white hover:text-[#0B422A]"
              >
                <span>Email Team</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
