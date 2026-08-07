import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import logoImg from '@/assets/sahajta-logo.png';
import { TalentShowcaseCTA } from '@/components/sections/TalentShowcaseCTA';
import { FaqModal } from '@/components/ui/FaqModal';
import { FooterDither } from '@/components/ui/FooterDither';
import { scrollToTarget } from '@/lib/lenis';

const explore = [
  { label: 'Philosophy', href: '#overview' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Shipped work', href: '#case-studies' },
  { label: 'Methodology', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQs', href: '#faq', isFaq: true },
];

const engagements = [
  { label: 'MVP engineering', href: '#pricing' },
  { label: 'AI automation & agents', href: '#pricing' },
  { label: 'AI feature integration', href: '#pricing' },
  { label: 'Website design & build', href: '#pricing' },
];

const elsewhere = [
  { label: 'Shubhang (LinkedIn)', href: 'https://www.linkedin.com/in/shubhangsethi/', external: true },
  { label: 'Pranamya (LinkedIn)', href: 'https://www.linkedin.com/in/pranamya-jainn/', external: true },
  { label: 'vibe2real.codes', href: 'https://vibe2real.codes', external: true },
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

function MetaColumn({
  title,
  links,
  onFaqClick,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean; isFaq?: boolean }[];
  onFaqClick?: () => void;
}) {
  return (
    <div>
      <h3 className="font-mono-custom mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              onClick={(e) => {
                if (link.isFaq && onFaqClick) {
                  e.preventDefault();
                  onFaqClick();
                  return;
                }
                if (!link.external && link.href.startsWith('#')) {
                  e.preventDefault();
                  const targetId = link.href.replace('#', '');
                  const element = document.getElementById(targetId);
                  if (element) {
                    scrollToTarget(element);
                    window.history.pushState(null, '', link.href);
                  }
                }
              }}
              className="group/link inline-flex items-center gap-1.5 rounded-sm text-[13px] font-normal text-zinc-400 transition-colors duration-300 hover:text-[#faf8f6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="h-px w-0 bg-[#B99A62] transition-all duration-300 group-hover/link:w-3"
              />
              <span>{link.label}</span>
              {link.external && (
                <ArrowGlyph className="h-2.5 w-2.5 opacity-0 transition-all duration-300 group-hover/link:opacity-60" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const reduce = useReducedMotion();
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden rounded-t-[2.5rem] bg-[#1A2013] pt-16 pb-12 text-[#faf8f6] md:rounded-t-[3.5rem] md:pt-20 border-t border-[#B99A62]/20 shadow-2xl isolate"
      style={{ transform: 'translateZ(0)' }}
    >
      <FooterDither />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <TalentShowcaseCTA />

        {/* ── The sign-off: the email is the footer ──────────── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div className="mb-6 flex items-center justify-end gap-4">

            {/* Quick FAQ Trigger Pill */}
            <button
              type="button"
              onClick={() => setFaqOpen(true)}
              className="group/faq inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono-custom text-xs font-medium text-zinc-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <span>Have Questions? (FAQs)</span>
              <span className="text-zinc-400 transition-transform group-hover/faq:translate-x-0.5">↗</span>
            </button>
          </div>

          <h2 className="font-syne mb-8 max-w-2xl text-3xl font-bold leading-[1.12] tracking-tight text-[#faf8f6] md:text-5xl">
            Tell us what you&rsquo;re building.
          </h2>

          <a
            href="mailto:hello@sahajta.com"
            className="group/mail inline-block max-w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white"
          >
            <span className="font-syne flex flex-wrap items-baseline gap-x-4 text-[1.65rem] font-bold leading-none tracking-tight text-[#faf8f6] transition-colors duration-300 group-hover/mail:text-zinc-300 sm:text-4xl md:text-6xl lg:text-7xl">
              <span>hello@sahajta.com</span>
              <ArrowGlyph className="h-4 w-4 shrink-0 text-[#B99A62] transition-transform duration-300 group-hover/mail:translate-x-1.5 group-hover/mail:-translate-y-1.5 md:h-7 md:w-7" />
            </span>
            {/* Rule that draws in under the address on hover */}
            <span
              aria-hidden="true"
              className="mt-4 block h-px w-full origin-left scale-x-0 bg-[#B99A62]/70 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mail:scale-x-100"
            />
          </a>

          <p className="mt-7 max-w-md text-sm font-normal leading-relaxed text-zinc-400">
            One email is enough. We reply within 24 hours with a scope, a timeline, and a number.
          </p>
        </motion.div>

        {/* ── Meta ───────────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-14">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
            <div className="col-span-2 md:col-span-4">
              {/*
                * Was `brightness-0 invert`, which crushes the mark to flat
                * white and throws away the gold leaf — the one warm note in
                * the identity. Instead: lift the dark green wordmark until it
                * reads on the olive ground while leaving hue intact, so the
                * leaf stays gold.
                */}
              <img
                src={logoImg}
                alt="Sahajta AI"
                width={160}
                height={48}
                className="mb-6 h-10 w-auto object-contain brightness-[2.6] contrast-[1.05] saturate-[1.15] md:h-12 opacity-95 transition-opacity hover:opacity-100"
              />
              <p className="max-w-xs text-[13px] font-normal leading-relaxed text-zinc-400 mb-4">
                Your fractional CTO and build team in one. We plan it, build it, fix it, and ship
                it — in short weekly sprints.
              </p>
            </div>

            <div className="md:col-span-3">
              <MetaColumn title="Engagements" links={engagements} />
            </div>
            <div className="md:col-span-3">
              <MetaColumn title="Explore" links={explore} onFaqClick={() => setFaqOpen(true)} />
            </div>
            <div className="md:col-span-2">
              <MetaColumn title="Elsewhere" links={elsewhere} />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────── */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs font-normal text-zinc-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Sahajta AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setFaqOpen(true)}
              className="font-mono-custom text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              FAQs
            </button>
            <p className="font-mono-custom tracking-wide flex items-center gap-2 text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B99A62]"></span>
              Replies within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Popup Modal */}
      <FaqModal isOpen={faqOpen} onClose={() => setFaqOpen(false)} />
    </footer>
  );
}
