import { useEffect } from 'react';
import logoImg from '@/assets/sahajta-logo.png';

type PrivacyPageProps = {
  onBack: () => void;
  onNavigateCookies?: () => void;
  onNavigateRefund?: () => void;
  onNavigateAiUsage?: () => void;
};

export function PrivacyPage({
  onBack,
  onNavigateCookies,
  onNavigateRefund,
  onNavigateAiUsage,
}: PrivacyPageProps) {
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
            Privacy Policy
          </h1>
          <p className="font-mono-custom text-xs sm:text-sm text-[#6B7E76] uppercase tracking-wider">
            Last updated: 22 June 2026
          </p>
        </div>

        {/* 10 Points Detailed List */}
        <div className="space-y-10 text-base leading-relaxed text-[#2C3E35]">
          
          {/* 1. Who We Are */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">01</span>
              <span>Who We Are</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                Sahajta AI Solution Private Limited (<strong className="text-[#121212]">CIN: U63999RJ2026PTC111789</strong>) is an AI studio and automation services company based in Bangalore, India. Our registered office is at: Bangalore, Karnataka, India.
              </p>
              <p>
                You can reach us at{' '}
                <a href="mailto:hello@sahajta.com" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  hello@sahajta.com
                </a>
                . For privacy-related queries, write to{' '}
                <a href="mailto:privacy@sahajta.com" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  privacy@sahajta.com
                </a>
                .
              </p>
            </div>
          </section>

          {/* 2. What Data We Collect */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">02</span>
              <span>What Data We Collect</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                <strong className="text-[#121212]">(a) Contact form.</strong> When you submit our project intake form, we collect your name, email address, project description, and budget range.
              </p>
              <p>
                <strong className="text-[#121212]">(b) Scheduling.</strong> When you book a call via our website, the scheduling is handled by Cal.com per their privacy policy at{' '}
                <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  cal.com/privacy
                </a>
                . We receive your name and email from the confirmed booking notification.
              </p>
              <p>
                <strong className="text-[#121212]">(c) Email correspondence.</strong> We retain the content and metadata of emails you send to{' '}
                <a href="mailto:hello@sahajta.com" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  hello@sahajta.com
                </a>{' '}
                or{' '}
                <a href="mailto:privacy@sahajta.com" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  privacy@sahajta.com
                </a>{' '}
                for as long as necessary to handle your inquiry.
              </p>
            </div>
          </section>

          {/* 3. How We Use Your Data */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">03</span>
              <span>How We Use Your Data</span>
            </h2>
            <div className="space-y-2 text-sm sm:text-base">
              <p>To respond to project inquiries and answer questions.</p>
              <p>To schedule and run discovery calls.</p>
              <p>To maintain internal records of business engagements.</p>
              <p className="text-[#6B7E76] italic pt-2">
                We do not use your data for marketing without your separate consent.
              </p>
            </div>
          </section>

          {/* 4. Who We Share Data With */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">04</span>
              <span>Who We Share Data With</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                <strong className="text-[#121212]">Cal.com</strong> — for scheduling functionality only.
              </p>
              <p>
                <strong className="text-[#121212]">OpenAI, Google, and Anthropic</strong> — when their APIs are used during project delivery. Client data shared with these tools is processed within the session and is not stored in any Sahajta account on those platforms.
              </p>
              <p>
                <strong className="text-[#121212]">n8n</strong> — for workflow automation during delivery.
              </p>
              <p className="text-xs sm:text-sm text-[#6B7E76] pt-1">
                We do not sell, rent, or share data with advertisers, data brokers, or analytics platforms. We do not use one client&apos;s data in another client&apos;s engagement.
              </p>
            </div>
          </section>

          {/* 5. How We Protect Data */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">05</span>
              <span>How We Protect Data</span>
            </h2>
            <div className="space-y-2 text-sm sm:text-base">
              <p>All connections to this website use HTTPS.</p>
              <p>Access to stored data is limited to team members who need it for delivery.</p>
              <p>We do not store payment information. Payment is handled by the client&apos;s chosen method outside this website.</p>
            </div>
          </section>

          {/* 6. Your Rights Under the DPDP Act 2023 */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">06</span>
              <span>Your Rights Under the DPDP Act 2023</span>
            </h2>
            <div className="space-y-2 text-sm sm:text-base">
              <p>The right to know what personal data we hold about you.</p>
              <p>The right to correction of inaccurate data.</p>
              <p>
                The right to erasure — we will action deletion requests within 7 days of receiving a written request at{' '}
                <a href="mailto:privacy@sahajta.com" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  privacy@sahajta.com
                </a>.
              </p>
              <p>The right to withdraw consent at any time.</p>
              <p>The right to raise a grievance with the Data Protection Board of India.</p>
            </div>
          </section>

          {/* 7. Data Retention */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">07</span>
              <span>Data Retention</span>
            </h2>
            <div className="space-y-2 text-sm sm:text-base">
              <p><strong className="text-[#121212]">Contact form submissions:</strong> retained for 2 years from the date of last contact.</p>
              <p><strong className="text-[#121212]">Project engagement records:</strong> retained for 5 years for business records compliance.</p>
              <p><strong className="text-[#121212]">Email correspondence:</strong> retained as long as reasonably necessary for the engagement.</p>
            </div>
          </section>

          {/* 8. Grievance Officer */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">08</span>
              <span>Grievance Officer</span>
            </h2>
            <div className="rounded-2xl border border-[#DDD8CC] bg-[#F0EFE6] p-5 mb-3 text-sm sm:text-base space-y-1">
              <p className="font-syne font-bold text-lg text-[#0B422A]">Shubhang Sethi</p>
              <p>
                <a href="mailto:privacy@sahajta.com" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  privacy@sahajta.com
                </a>
              </p>
              <p className="text-[#6B7E76] font-medium">Sahajta AI Solution Private Limited</p>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7E76]">
              Grievances will be acknowledged within 48 hours and resolved within 30 days.
            </p>
          </section>

          {/* 9. Changes to This Policy */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">09</span>
              <span>Changes to This Policy</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                When this policy changes, we update the Last Updated date at the top of this page. Continued use of the site after a change constitutes acceptance of the updated policy.
              </p>
              <p>
                For our{' '}
                <a
                  href="/cookies"
                  onClick={(e) => {
                    if (onNavigateCookies) {
                      e.preventDefault();
                      onNavigateCookies();
                    }
                  }}
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54] cursor-pointer"
                >
                  Cookie Policy
                </a>
                ,{' '}
                <a
                  href="/refund"
                  onClick={(e) => {
                    if (onNavigateRefund) {
                      e.preventDefault();
                      onNavigateRefund();
                    }
                  }}
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54] cursor-pointer"
                >
                  Refund Policy
                </a>
                , and{' '}
                <a
                  href="/ai-usage"
                  onClick={(e) => {
                    if (onNavigateAiUsage) {
                      e.preventDefault();
                      onNavigateAiUsage();
                    }
                  }}
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54] cursor-pointer"
                >
                  AI usage practices
                </a>
                , email us at{' '}
                <a href="mailto:hello@sahajta.com" className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]">
                  hello@sahajta.com
                </a>
                .
              </p>
            </div>
          </section>

          {/* 10. Governing Law */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">10</span>
              <span>Governing Law</span>
            </h2>
            <p className="text-sm sm:text-base">
              This policy is governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.
            </p>
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
