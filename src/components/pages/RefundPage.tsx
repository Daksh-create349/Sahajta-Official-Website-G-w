import { useEffect } from 'react';
import logoImg from '@/assets/sahajta-logo.png';

type RefundPageProps = {
  onBack: () => void;
};

export function RefundPage({ onBack }: RefundPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#121212] font-sans antialiased selection:bg-[#D9B75B]/30 selection:text-[#0B422A]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 border-b border-[#DDD8CC] bg-[#FDFCF0]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          {/* Left: Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#DDD8CC] bg-[#F0EFE6] px-4 py-2 text-xs font-semibold text-[#0B422A] transition-all hover:bg-[#0B422A] hover:text-[#FDFCF0] hover:border-[#0B422A]"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Back to Home</span>
          </button>

          {/* Right Corner: Big Sahajta Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="inline-flex items-center rounded-2xl bg-[#FAF8F6] px-4 py-2 border border-[#DDD8CC] shadow-xs transition-opacity hover:opacity-85"
          >
            <img
              src={logoImg}
              alt="Sahajta AI"
              width={180}
              height={52}
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16 md:py-20">
        {/* Title Header */}
        <div className="mb-12 border-b border-[#DDD8CC] pb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D9B75B]/40 bg-[#F5EDD6] px-3.5 py-1 text-xs font-semibold text-[#A67F2E]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9B75B]" />
            <span>LEGAL & COMPLIANCE</span>
          </div>

          <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B422A] leading-tight mb-3">
            Refund & Cancellation Policy
          </h1>
          <p className="font-mono-custom text-xs sm:text-sm text-[#6B7E76] uppercase tracking-wider">
            Last updated: 22 June 2026
          </p>
        </div>

        {/* 6 Points Detailed List */}
        <div className="space-y-8 text-base leading-relaxed text-[#2C3E35]">
          
          {/* 1. Project-Based Pricing */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">01</span>
              <span>Project-Based Pricing</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                All Sahajta AI projects are scoped and priced per engagement before work begins. Payment terms are defined in the project agreement provided at the start of each engagement.
              </p>
            </div>
          </section>

          {/* 2. Cancellation Before Work Begins */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">02</span>
              <span>Cancellation Before Work Begins</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                If you cancel within 48 hours of making a deposit and no work has commenced, a full refund is issued. Cancellations after 48 hours but before work begins are subject to a 10% processing fee deducted from the refund.
              </p>
            </div>
          </section>

          {/* 3. Cancellation After Work Has Started */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">03</span>
              <span>Cancellation After Work Has Started</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                You are liable for fully completed milestones at their full agreed value. A milestone that is partially complete at the time of cancellation is billed at 50% of its agreed value.
              </p>
              <p>
                Third-party tools, API accounts, subscriptions, or cloud resources set up on your behalf during delivery are non-refundable once activated.
              </p>
            </div>
          </section>

          {/* 4. Disputes About Deliverables */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">04</span>
              <span>Disputes About Deliverables</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                If you believe a deliverable does not meet the agreed specification, you must notify us in writing at{' '}
                <a
                  href="mailto:hello@sahajta.com"
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]"
                >
                  hello@sahajta.com
                </a>{' '}
                within 7 days of delivery. We will assess the dispute and respond within 5 business days.
              </p>
              <p>
                Deliverables that have been accepted — whether explicitly or through the expiry of the 7-day review window — are non-refundable.
              </p>
            </div>
          </section>

          {/* 5. Retainer Engagements */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">05</span>
              <span>Retainer Engagements</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                For ongoing retainer agreements, either party may cancel with 14 days written notice to{' '}
                <a
                  href="mailto:hello@sahajta.com"
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]"
                >
                  hello@sahajta.com
                </a>
                . Fees for work completed within the notice period are due in full.
              </p>
            </div>
          </section>

          {/* 6. Contact */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">06</span>
              <span>Contact</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                For any refund or cancellation request, email{' '}
                <a
                  href="mailto:hello@sahajta.com"
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]"
                >
                  hello@sahajta.com
                </a>{' '}
                with your project name and the reason for the request. We aim to respond within 2 business days.
              </p>
            </div>
          </section>

        </div>

        {/* Bottom Return Button */}
        <div className="mt-14 pt-8 border-t border-[#DDD8CC] flex items-center justify-between">
          <p className="text-xs text-[#6B7E76]">
            © {new Date().getFullYear()} Sahajta AI Solution Private Limited.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0B422A] px-6 py-3 font-syne text-xs font-semibold text-[#FDFCF0] shadow-md transition-all hover:bg-[#2D6E54]"
          >
            <span>Return to Home</span>
            <span>↗</span>
          </button>
        </div>
      </main>
    </div>
  );
}
