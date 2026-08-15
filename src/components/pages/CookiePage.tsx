import { useEffect } from 'react';
import logoImg from '@/assets/sahajta-logo.png';

type CookiePageProps = {
  onBack: () => void;
};

export function CookiePage({ onBack }: CookiePageProps) {
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
            Cookie Policy
          </h1>
          <p className="font-mono-custom text-xs sm:text-sm text-[#6B7E76] uppercase tracking-wider">
            Last updated: 22 June 2026
          </p>
        </div>

        {/* 4 Points Detailed List */}
        <div className="space-y-8 text-base leading-relaxed text-[#2C3E35]">
          
          {/* 1. What Are Cookies */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">01</span>
              <span>What Are Cookies</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                Cookies are small text files that a website saves to your browser when you visit. They are used for a range of purposes — from keeping you logged in, to remembering your preferences, to understanding how visitors use a site. Some cookies are set by the site you visit directly; others are set by third-party services embedded on that page.
              </p>
            </div>
          </section>

          {/* 2. Cookies on This Site */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">02</span>
              <span>Cookies on This Site</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                <strong className="text-[#121212]">sahajta.com does not set any first-party tracking or advertising cookies.</strong> We do not use Google Analytics, Meta Pixel, or any other analytics or ad-targeting platform.
              </p>
              <p>
                The only third-party embed on this site is the Cal.com scheduling calendar. When the calendar loads, Cal.com may set cookies required for the scheduling interface to function correctly — for example, to remember your timezone or session state during booking. These cookies are governed by Cal.com&apos;s privacy policy at{' '}
                <a
                  href="https://cal.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]"
                >
                  cal.com/privacy
                </a>
                .
              </p>
              <p>
                We do not have access to or control over the cookies set by Cal.com.
              </p>
            </div>
          </section>

          {/* 3. How to Control Cookies */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">03</span>
              <span>How to Control Cookies</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                You can block or delete cookies at any time through your browser settings. The steps vary by browser — most have a Privacy or Security section in Settings where you can manage cookies. Blocking cookies from third-party embeds like Cal.com may prevent the scheduling calendar from functioning, but will not affect the rest of the site.
              </p>
              <p>
                For detailed guidance on managing cookies across different browsers, visit{' '}
                <a
                  href="https://www.aboutcookies.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]"
                >
                  aboutcookies.org
                </a>
                .
              </p>
            </div>
          </section>

          {/* 4. Contact */}
          <section className="rounded-3xl border border-[#DDD8CC] bg-[#FAF8F6] p-6 sm:p-8 shadow-xs">
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-[#0B422A] mb-4 flex items-center gap-3">
              <span className="font-mono-custom text-sm font-semibold text-[#A67F2E] px-2.5 py-0.5 rounded-lg bg-[#F5EDD6] border border-[#D9B75B]/30">04</span>
              <span>Contact</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                If you have questions about this policy, email us at{' '}
                <a
                  href="mailto:hello@sahajta.com"
                  className="font-semibold text-[#0B422A] underline underline-offset-4 hover:text-[#2D6E54]"
                >
                  hello@sahajta.com
                </a>
                .
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
