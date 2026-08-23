import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SahajtaLogo } from '@/components/ui/SahajtaLogo';
import { scrollToTarget } from '@/lib/lenis';

const navLinks = [
  { name: 'Philosophy', href: '#overview' },
  { name: 'Capabilities', href: '#services' },
  { name: 'Shipped Work', href: '#case-studies' },
  { name: 'Methodology', href: '#process' },
  { name: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    // Coalesced to one read per frame, and the state only changes when the
    // boolean actually flips — otherwise every scroll event re-rendered the
    // navbar, which carries two backdrop-filter layers.
    const measure = () => {
      frame = 0;
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        scrollToTarget(element);
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 transition-all duration-500 pointer-events-none">
      
      {/* Streamlined Liquid Glass Floating Oval Navbar */}
      <div
        className={cn(
          "pointer-events-auto relative overflow-hidden rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-3 sm:gap-6 px-3.5 py-2 sm:px-4 md:px-6 md:py-2 w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] md:w-auto max-w-lg md:max-w-none",
          isScrolled
            ? "liquid-glass-scrolled py-1.5 md:py-2 scale-[0.98]"
            : "liquid-glass"
        )}
      >
        {/* Specular Liquid Edge Highlight Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/70 via-transparent to-white/10 pointer-events-none" />
        
        {/* Ambient Top Light Reflection Line */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90" />

        {/* Logo — crisp vector logo */}
        <div className="relative z-10 hidden md:block">
          <SahajtaLogo imgClassName="h-7.5 w-auto" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="relative z-10 hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "px-5 py-2 text-xs font-medium tracking-tight transition-all rounded-full cursor-pointer",
                isScrolled
                  ? "text-zinc-800 hover:text-[#0B422A] hover:bg-white/80 hover:shadow-xs"
                  : "text-zinc-700 hover:text-[#0B422A] hover:bg-white/60"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>


        <div className="relative z-10 hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium bg-[#0B422A] text-[#FDFCF0] hover:bg-[#2D6E54] transition-all rounded-full shadow-md group tracking-tight cursor-pointer"
          >
            <span>Start a Project</span>
            <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>

        {/* Mobile Title & Menu Toggle */}
        <div className="md:hidden relative z-10 flex items-center justify-between w-full gap-3 px-1 py-0.5">
          <SahajtaLogo imgClassName="h-7 sm:h-7.5 w-auto" />
          <div className="flex items-center gap-2 translate-y-0.5">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[11px] font-syne font-bold bg-[#0B422A] text-[#FDFCF0] hover:bg-[#2D6E54] transition-all rounded-full shadow-xs tracking-tight cursor-pointer"
            >
              <span>Let's Talk</span>
              <span className="text-[10px]">↗</span>
            </a>
            <button
              className="text-[#0B422A] p-1.5 rounded-full hover:bg-white/60 bg-black/[0.04] transition-colors flex items-center justify-center cursor-pointer touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 w-screen h-[100dvh] bg-[#FDFCF0] z-[60] flex flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 !pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between shrink-0">
          <SahajtaLogo imgClassName="h-6.5 w-auto" onClick={() => setMobileMenuOpen(false)} />
          <button
            className="text-[#0B422A] p-2 -mr-2 rounded-full hover:bg-[#F0EFE6] transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Editorial Index — rows distribute across the full height, no dead space */}
        <nav className="flex-1 flex flex-col min-h-0 pt-7">
          {/* Eyebrow gives the upper edge a job */}
          <div
            className={cn(
              "flex items-center gap-2.5 mb-3 shrink-0 transition-all duration-500",
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9B75B]" />
            <span className="font-mono-custom text-[10px] tracking-[0.28em] uppercase text-[#6B7E76]">Navigate</span>
          </div>

          <ul className="flex-1 flex flex-col border-t border-[#DDD8CC]/70">
            {navLinks.map((link, idx) => (
              <li key={link.name} className="flex-1 flex border-b border-[#DDD8CC]/70">
                <a
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className={cn(
                    "group flex-1 flex items-center justify-between min-h-[64px] transition-all duration-500",
                    mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  )}
                  style={{ transitionDelay: `${120 + idx * 70}ms` }}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono-custom text-xs text-[#9AA89F] group-hover:text-[#B8902F] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="font-syne text-[1.75rem] leading-none font-bold text-[#0B422A] group-hover:text-[#2D6E54] transition-colors">
                      {link.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[#B8B3A4] text-lg group-hover:text-[#2D6E54] group-hover:translate-x-1 transition-all duration-300"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Area: CTA & Info */}
        <div className="flex flex-col gap-5 pt-6 border-t border-[#DDD8CC]/60 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#contact');
            }}
            className="w-full text-center py-4 text-sm font-syne font-bold bg-[#0B422A] text-[#FDFCF0] hover:bg-[#2D6E54] rounded-full shadow-md cursor-pointer transition-all duration-300"
          >
            Start a Project ↗
          </a>

          <div className="flex justify-between items-center text-xs font-mono-custom text-[#6B7E76]">
            <span>© {new Date().getFullYear()} Sahajta AI</span>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/shubhangsethi/" target="_blank" rel="noreferrer" className="hover:text-[#0B422A]">Shubhang</a>
              <span>·</span>
              <a href="https://www.linkedin.com/in/pranamya-jainn/" target="_blank" rel="noreferrer" className="hover:text-[#0B422A]">Pranamya</a>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
