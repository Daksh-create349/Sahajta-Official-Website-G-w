import { useEffect } from 'react';
import logoImg from '@/assets/sahajta-logo.png';

type AiUsagePageProps = {
  onBack: () => void;
};

export function AiUsagePage({ onBack }: AiUsagePageProps) {
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
            <span>AI PRACTICES & DATA SAFETY</span>
          </div>

          <h1 className="font-syne text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B422A] leading-tight mb-3">
            How We Use AI
          </h1>
          <p className="font-mono-custom text-xs sm:text-sm text-[#6B7E76] uppercase tracking-wider mb-4">
            Last updated: 22 June 2026
          </p>
          <p className="text-base sm:text-lg text-[#2C3E35] leading-relaxed max-w-3xl">
            This page is for clients and potential clients who want to understand exactly how we use AI in our work — and what that means for their data. No legal language, just a straight answer.
          </p>
        </div>

        {/* 5 Points Detailed List */}
        <div className="space-y-8 text-base leading-relaxed text-[#2C3E35]">
          
          {/* 1. The Tools We Build With */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">01</span>
              <span>The Tools We Build With</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                We use a small, deliberate set of AI tools, and we pick them based on what each project actually needs:
              </p>
              <ul className="space-y-2 pl-4 list-disc marker:text-[#0B422A]">
                <li><strong className="text-[#121212]">OpenAI GPT models</strong> — for LLM integration, content generation pipelines, and agentic reasoning.</li>
                <li><strong className="text-[#121212]">Google Gemini</strong> — for multimodal tasks and document processing.</li>
                <li><strong className="text-[#121212]">Anthropic Claude</strong> — for code review, complex reasoning, and structured output work.</li>
                <li><strong className="text-[#121212]">n8n</strong> — for workflow automation and agent orchestration.</li>
              </ul>
              <p className="pt-2 text-[#6B7E76]">
                If a project calls for a different or additional tool, we tell you at the scoping stage and get your agreement before using it. No surprises.
              </p>
            </div>
          </section>

          {/* 2. What Happens to Your Data When We Use These Tools */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">02</span>
              <span>What Happens to Your Data When We Use These Tools</span>
            </h2>
            <div className="space-y-2.5 text-sm sm:text-base">
              <p>We pass only the minimum data required to complete the task at hand.</p>
              <p>Data shared with LLM APIs during a project is processed within the session. We do not store client data in any AI platform account.</p>
              <p>We do not use your data to fine-tune or train any model.</p>
              <p>Credentials, API keys, and proprietary business information are handled in isolated environments and are never shared across client engagements.</p>
            </div>
          </section>

          {/* 3. What We Do Not Do */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">03</span>
              <span>What We Do Not Do</span>
            </h2>
            <div className="space-y-2.5 text-sm sm:text-base">
              <p>We do not sell client data.</p>
              <p>We do not use one client&apos;s business logic, data, or systems to inform or train anything for another client.</p>
              <p>We do not retain access to client systems after project handover unless a separate maintenance agreement is in place and explicitly signed.</p>
            </div>
          </section>

          {/* 4. Staying Current */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">04</span>
              <span>Staying Current</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                The AI landscape changes fast. We track changes to the tools we use — including API policy updates, deprecations, and pricing shifts — and proactively flag anything that could affect a delivered product. If something changes after handover that you should know about, we&apos;ll reach out.
              </p>
            </div>
          </section>

          {/* 5. Questions */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">05</span>
              <span>Questions</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                If you have questions about how we use AI in a specific project or in general, email us at{' '}
                <a
                  href="mailto:hello@sahajta.com"
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]"
                >
                  hello@sahajta.com
                </a>
                . We respond within one business day.
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
