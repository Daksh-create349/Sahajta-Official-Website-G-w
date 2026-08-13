import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import logoImg from '@/assets/sahajta-logo.png';
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
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500">
      
      {/* Streamlined Liquid Glass Floating Oval Navbar */}
      <div
        className={cn(
          "relative overflow-hidden rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-6 px-4 py-2 md:px-6 md:py-2",
          isScrolled
            ? "liquid-glass-scrolled py-2 scale-[0.98]"
            : "liquid-glass"
        )}
      >
        {/* Specular Liquid Edge Highlight Overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/70 via-transparent to-white/10 pointer-events-none" />
        
        {/* Ambient Top Light Reflection Line */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90" />

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

        {/* Action Button */}
        <div className="relative z-10 hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-medium bg-[#0B422A] text-[#FDFCF0] hover:bg-[#2D6E54] transition-all rounded-full shadow-md group tracking-tight cursor-pointer"
          >
            <span>Book 24h Sprint</span>
            <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>

        {/* Mobile Title & Menu Toggle */}
        <div className="md:hidden relative z-10 flex items-center justify-between w-full gap-8 px-2">
          <img src={logoImg} alt="Sahajta Logo" className="h-6 w-auto object-contain" />
          <button
            className="text-[#0B422A] p-1.5 rounded-full hover:bg-white/50 transition-colors"
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

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-24 left-6 right-6 liquid-glass-scrolled rounded-3xl p-6 flex flex-col gap-4 shadow-2xl z-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, link.href);
              }}
              className="text-base font-syne font-medium text-[#0B422A] hover:text-[#2D6E54] transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#contact');
            }}
            className="mt-2 text-center py-3 text-sm font-medium bg-[#0B422A] text-[#FDFCF0] rounded-full shadow-md cursor-pointer"
          >
            Book 24h Sprint
          </a>
        </div>
      )}

    </header>
  );
}
