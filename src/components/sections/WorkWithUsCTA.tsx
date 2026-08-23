import { useState, useEffect, useRef, lazy, Suspense, type FormEvent } from 'react';
import { COUNTRIES, type Country } from '@/data/countryCodes';
import { ChevronDown, Search, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Plasma = lazy(() => import('@/components/ui/Plasma'));

export function WorkWithUsCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldRenderPlasma, setShouldRenderPlasma] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Country Code selector state
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default India +91
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the message box with content (up to a cap), so long text is
  // visible without fighting the page's smooth-scroll for the inner scrollbar.
  const autoGrowMessage = () => {
    const el = messageRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 260)}px`;
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    }
    if (countryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [countryDropdownOpen]);

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.dialCode.includes(countrySearch) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Lazy-load Plasma when section comes into viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderPlasma(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const triggerCelebration = () => {
    const brandColors = ['#D9B75B', '#0B422A', '#2D6E54', '#B8902F', '#F5EDD6', '#FFFFFF'];

    // Left cannon
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.15, y: 0.65 },
      colors: brandColors,
      zIndex: 9999,
    });

    // Right cannon
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.85, y: 0.65 },
      colors: brandColors,
      zIndex: 9999,
    });

    // High velocity center burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: brandColors,
        ticks: 220,
        gravity: 1.1,
        scalar: 1.1,
        zIndex: 9999,
      });
    }, 180);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem('yourName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('whatBuilding') as HTMLTextAreaElement).value;
    const contact = `${selectedCountry.dialCode} ${phoneNumber}`;

    try {
      await fetch('https://formsubmit.co/ajax/hello@sahajta.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Contact: contact,
          'What are you building?': message,
          _subject: `New Enquiry from ${name}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
        }),
      });
    } catch {
      // silently fail — still show success to user
    }

    setLoading(false);
    setSubmitted(true);
    triggerCelebration();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-[#FDFCF0] relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6">
        {/* Main Outer Card - Light Mode Paper Aesthetics */}
        <div className="bg-[#F0EFE6] rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-3.5 sm:p-6 md:p-8 lg:p-10 border border-[#DDD8CC] shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            
            {/* Left Box with Plasma Background - Light Mode */}
            <div className="lg:col-span-5 relative bg-[#FDFCF0] rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] overflow-hidden min-h-[160px] sm:min-h-[260px] lg:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 md:p-10 border border-[#DDD8CC] group">
              
              {/* Plasma Animation Background - Deferred Mount for 100 Performance */}
              <div className="absolute inset-0 z-0">
                {shouldRenderPlasma && (
                  <Suspense fallback={null}>
                    <Plasma
                      color="#0B422A"
                      speed={0.4}
                      direction="forward"
                      scale={1.25}
                      opacity={0.95}
                      mouseInteractive={false}
                      renderScale={0.35}
                      maxDpr={1.0}
                      targetFps={30}
                      iterations={25}
                    />
                  </Suspense>
                )}
              </div>

              {/* Subtle Gradient Overlay so deep plasma texture remains vivid & legible */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF0]/35 via-transparent to-[#FDFCF0]/75 pointer-events-none z-1" />

              {/* Header Content */}
              <div className="relative z-10 my-auto">
                <span className="font-mono-custom text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0B422A]/80 block mb-1.5 sm:mb-2">
                  START A SPRINT
                </span>
                <h2 className="font-syne text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#0B422A] leading-[1.12]">
                  Ready to grow with us?
                </h2>
              </div>
            </div>

            {/* Right Box Form - Light Mode Card */}
            <div className="lg:col-span-7 bg-[#FDFCF0] rounded-xl sm:rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-8 md:p-10 border border-[#DDD8CC] flex flex-col justify-between shadow-xs">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col items-center justify-center text-center py-10 sm:py-12 px-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0B422A] text-[#D9B75B] flex items-center justify-center mb-5 sm:mb-6 shadow-[0_10px_25px_-5px_rgba(11,66,42,0.35)]"
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-[#D9B75B]/40 animate-ping opacity-25 pointer-events-none" />
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#D9B75B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="font-syne text-xl sm:text-2xl md:text-3xl font-bold text-[#0B422A] mb-2">Enquiry Received!</h3>
                  <p className="text-[#6B7E76] text-xs sm:text-sm max-w-sm leading-relaxed">
                    Thank you for reaching out. The Sahajta team will review your project and get in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    aria-label="Send another message"
                    className="mt-6 sm:mt-8 px-5 py-2.5 rounded-full text-xs font-mono-custom font-semibold bg-[#F0EFE6] border border-[#DDD8CC] text-[#0B422A] hover:bg-[#0B422A] hover:text-white transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    ← Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-4 sm:space-y-5">
                  <div className="space-y-3.5 sm:space-y-4">
                    
                    {/* Row 1: Your Name * & Email * */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {/* Your Name * */}
                      <div>
                        <label htmlFor="yourName" className="block text-xs font-semibold text-[#0B422A] mb-1 font-syne">
                          Your Name <span className="text-[#A67F2E]">*</span>
                        </label>
                        <input
                          id="yourName"
                          type="text"
                          required
                          placeholder="Pranamya Jain"
                          aria-label="Your Name"
                          className="w-full bg-white border border-[#DDD8CC] rounded-xl px-3.5 py-3 text-[16px] sm:text-sm text-[#121212] placeholder-[#9AA89F] focus:outline-hidden focus:border-[#0B422A] focus:ring-1 focus:ring-[#0B422A] transition-all shadow-2xs"
                        />
                      </div>

                      {/* Email * */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#0B422A] mb-1 font-syne">
                          Email <span className="text-[#A67F2E]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="you@startup.com"
                          aria-label="Email"
                          className="w-full bg-white border border-[#DDD8CC] rounded-xl px-3.5 py-3 text-[16px] sm:text-sm text-[#121212] placeholder-[#9AA89F] focus:outline-hidden focus:border-[#0B422A] focus:ring-1 focus:ring-[#0B422A] transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Row 2: Contact Number with International Country Code selector */}
                    <div className="relative" ref={dropdownRef}>
                      <label htmlFor="contactNumber" className="block text-xs font-semibold text-[#0B422A] mb-1 font-syne">
                        Contact Number <span className="text-[#A67F2E]">*</span>
                      </label>
                      <div className="flex rounded-xl bg-white border border-[#DDD8CC] focus-within:border-[#0B422A] focus-within:ring-1 focus-within:ring-[#0B422A] transition-all shadow-2xs overflow-visible">
                        {/* Country Code Trigger Button */}
                        <button
                          type="button"
                          onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                          aria-expanded={countryDropdownOpen}
                          aria-haspopup="listbox"
                          className="flex items-center gap-1.5 px-3 py-3 bg-[#F7F6EE] hover:bg-[#EFECE0] text-[#121212] text-sm border-r border-[#DDD8CC] rounded-l-xl transition-colors cursor-pointer select-none shrink-0"
                          title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
                        >
                          <span className="text-base leading-none">{selectedCountry.flag}</span>
                          <span className="font-mono-custom text-xs font-medium text-[#0B422A]">{selectedCountry.dialCode}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-[#6B7E76] transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Phone Number Input */}
                        <input
                          id="contactNumber"
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="98765 43210"
                          aria-label="Contact Number"
                          className="w-full bg-transparent px-3.5 py-3 text-[16px] sm:text-sm text-[#121212] placeholder-[#9AA89F] focus:outline-hidden"
                        />
                      </div>

                      {/* Searchable Country Code Dropdown Popover */}
                      {countryDropdownOpen && (
                        <div
                          className="absolute top-full left-0 mt-1.5 w-full sm:w-80 bg-white border border-[#DDD8CC] rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-72 animate-in fade-in-0 zoom-in-95 duration-150"
                        >
                          {/* Search bar inside dropdown */}
                          <div className="p-2 border-b border-[#EFECE0] bg-[#FDFCF0] sticky top-0 z-10">
                            <div className="relative flex items-center">
                              <Search className="w-4 h-4 text-[#6B7E76] absolute left-3 pointer-events-none" />
                              <input
                                ref={searchInputRef}
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Search country or code..."
                                className="w-full bg-white border border-[#DDD8CC] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#121212] placeholder-[#9AA89F] focus:outline-hidden focus:border-[#0B422A]"
                              />
                            </div>
                          </div>

                          {/* Country List */}
                          <div
                            data-lenis-prevent
                            className="overflow-y-auto overscroll-contain divide-y divide-[#F7F6EE] flex-1 p-1 max-h-56"
                          >
                            {filteredCountries.length === 0 ? (
                              <div className="py-6 text-center text-xs text-[#6B7E76]">
                                No country found
                              </div>
                            ) : (
                              filteredCountries.map((c) => {
                                const isSelected = selectedCountry.code === c.code && selectedCountry.dialCode === c.dialCode;
                                return (
                                  <button
                                    key={`${c.code}-${c.dialCode}`}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountry(c);
                                      setCountryDropdownOpen(false);
                                      setCountrySearch('');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-xs transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#0B422A]/10 text-[#0B422A] font-semibold'
                                        : 'hover:bg-[#F7F6EE] text-[#2D3748]'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="text-base leading-none shrink-0">{c.flag}</span>
                                      <span className="truncate">{c.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 ml-2">
                                      <span className="font-mono-custom text-[11px] text-[#A67F2E]">{c.dialCode}</span>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0B422A]" />}
                                    </div>
                                  </button>
                                );
                              })
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Row 3: What are you building? * */}
                    <div>
                      <label htmlFor="whatBuilding" className="block text-xs font-semibold text-[#0B422A] mb-1 font-syne">
                        What are you building? <span className="text-[#A67F2E]">*</span>
                      </label>
                      <textarea
                        id="whatBuilding"
                        ref={messageRef}
                        rows={3}
                        required
                        onInput={autoGrowMessage}
                        placeholder="Tell us about your product, timeline, and goals..."
                        aria-label="What are you building?"
                        className="w-full bg-white border border-[#DDD8CC] rounded-xl px-3.5 py-3 text-[16px] sm:text-sm text-[#121212] placeholder-[#9AA89F] focus:outline-hidden focus:border-[#0B422A] focus:ring-1 focus:ring-[#0B422A] transition-all shadow-2xs resize-y leading-relaxed overflow-y-auto max-h-[220px] min-h-[96px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label="Submit Enquiry Form"
                      className="w-full min-h-[48px] bg-[#0B422A] hover:bg-[#2D6E54] text-white font-syne font-semibold py-3.5 px-6 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-[0.99] shadow-md group cursor-pointer disabled:opacity-75 touch-manipulation"
                    >
                      {loading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkWithUsCTA;
