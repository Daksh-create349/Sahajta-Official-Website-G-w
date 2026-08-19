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

        {/* Logo — bare, left side */}
        <img src={logoImg} alt="Sahajta AI" width={140} height={40} className="relative z-10 hidden md:block h-8 w-auto object-contain" />

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
            <span>Book 24h Sprint</span>
            <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>

        {/* Mobile Title & Menu Toggle */}
        <div className="md:hidden relative z-10 flex items-center justify-between w-full gap-8 px-2">
          <img src={logoImg} alt="Sahajta AI" width={120} height={36} className="h-7 w-auto object-contain" />
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

      {/* Mobile Fullscreen Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 w-screen h-screen bg-[#FDFCF0] z-50 flex flex-col justify-between p-6 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between">
          <img src={logoImg} alt="Sahajta AI" width={120} height={36} className="h-7 w-auto object-contain" />
          <button
            className="text-[#0B422A] p-2 rounded-full hover:bg-[#F0EFE6] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Vertically Centered Link List */}
        <nav className="flex flex-col gap-6 my-auto pt-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, link.href);
              }}
              className={cn(
                "text-3xl font-syne font-bold text-[#0B422A] hover:text-[#2D6E54] transition-all transform duration-500",
                mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              )}
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              <span className="font-mono-custom text-xs text-[#9AA89F] mr-4 font-normal">0{idx + 1}</span>
              {link.name}
            </a>
          ))}
        </nav>

        {/* Footer Area: CTA & Info */}
        <div className="flex flex-col gap-6 pt-6 border-t border-[#DDD8CC]/60">
          <a
            href="#contact"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, '#contact');
            }}
            className="w-full text-center py-4 text-sm font-syne font-bold bg-[#0B422A] text-[#FDFCF0] hover:bg-[#2D6E54] rounded-full shadow-md cursor-pointer transition-all duration-300"
          >
            Book 24h Sprint ↗
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
