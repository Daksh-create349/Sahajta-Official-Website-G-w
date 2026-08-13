import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';

interface PromiseSlide {
  id: number;
  title: string;
  text: string;
  smallText: string;
  tag: string;
  icon: ReactNode;
}

const slides: PromiseSlide[] = [
  {
    id: 1,
    title: "Clear Work",
    text: "You will always know what we are working on now.",
    smallText: "One shared plan in Linear",
    tag: "TRANSPARENCY",
    icon: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#55693E" />
            <stop offset="100%" stopColor="#38472A" />
          </linearGradient>
          <linearGradient id="grad1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C8C5E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#55693E" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Background rounded board */}
        <rect x="15" y="15" width="90" height="90" rx="20" fill="url(#grad1-bg)" stroke="#55693E" strokeWidth="1.5" strokeDasharray="4 2" />
        {/* Linear Task Card 1 */}
        <rect x="26" y="28" width="68" height="18" rx="6" fill="#2A331F" />
        <circle cx="36" cy="37" r="4" fill="url(#grad1)" />
        <rect x="46" y="34" width="34" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
        {/* Linear Task Card 2 (Active) */}
        <rect x="26" y="51" width="68" height="18" rx="6" fill="url(#grad1)" />
        <circle cx="36" cy="60" r="4" fill="#FFFFFF" />
        <rect x="46" y="57" width="26" height="6" rx="3" fill="#FFFFFF" />
        <rect x="76" y="57" width="10" height="6" rx="3" fill="#FFFFFF" opacity="0.7" />
        {/* Linear Task Card 3 */}
        <rect x="26" y="74" width="68" height="18" rx="6" fill="#2A331F" opacity="0.8" />
        <circle cx="36" cy="83" r="4" fill="#55693E" opacity="0.5" />
        <rect x="46" y="80" width="40" height="6" rx="3" fill="#FFFFFF" opacity="0.5" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Clear Focus",
    text: "We pick one main goal, so the work does not get lost.",
    smallText: "One main goal each week",
    tag: "ALIGNMENT",
    icon: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B99A62" />
            <stop offset="100%" stopColor="#8A6F3C" />
          </linearGradient>
        </defs>
        {/* Outer Ring */}
        <circle cx="60" cy="60" r="44" fill="none" stroke="#B99A62" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        <circle cx="60" cy="60" r="34" fill="#B99A62" fillOpacity="0.1" stroke="url(#grad2)" strokeWidth="2" />
        <circle cx="60" cy="60" r="20" fill="none" stroke="#8A6F3C" strokeWidth="2.5" />
        {/* Center Target Focal Point */}
        <circle cx="60" cy="60" r="9" fill="url(#grad2)" />
        <circle cx="60" cy="60" r="4" fill="#FFFFFF" />
        {/* Crosshair accents */}
        <line x1="60" y1="8" x2="60" y2="20" stroke="#B99A62" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="100" x2="60" y2="112" stroke="#B99A62" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="8" y1="60" x2="20" y2="60" stroke="#B99A62" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="60" x2="112" y2="60" stroke="#B99A62" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Small Steps",
    text: "Big work is cut into small parts you can see and test.",
    smallText: "No long wait in the dark",
    tag: "VELOCITY",
    icon: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md">
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#829366" />
            <stop offset="100%" stopColor="#5C6B47" />
          </linearGradient>
        </defs>
        {/* Stepping Blocks */}
        <rect x="18" y="78" width="22" height="24" rx="6" fill="#829366" opacity="0.3" />
        <rect x="44" y="58" width="22" height="44" rx="6" fill="#829366" opacity="0.6" />
        <rect x="70" y="38" width="22" height="64" rx="6" fill="url(#grad3)" />
        {/* Ascending Arrow Curve */}
        <path d="M 22 68 Q 50 35 90 22" fill="none" stroke="#829366" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" />
        <polygon points="94,22 84,18 86,28" fill="#829366" />
        <circle cx="92" cy="22" r="4" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 4,
    title: "No Task Limit",
    text: "You can send as many tasks as you need. We do them in order.",
    smallText: "Work is picked by need",
    tag: "UNLIMITED",
    icon: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md">
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A87F4E" />
            <stop offset="100%" stopColor="#7A5A34" />
          </linearGradient>
        </defs>
        {/* Stacked Cards Queue */}
        <rect x="30" y="65" width="60" height="35" rx="8" fill="#7A5A34" opacity="0.25" transform="rotate(-6 60 82)" />
        <rect x="30" y="48" width="60" height="35" rx="8" fill="#A87F4E" opacity="0.55" transform="rotate(-3 60 65)" />
        <rect x="30" y="30" width="60" height="35" rx="8" fill="url(#grad4)" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Card Content Lines */}
        <rect x="40" y="40" width="24" height="4" rx="2" fill="#FFFFFF" />
        <rect x="40" y="48" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.8" />
        {/* Infinite Plus Badge */}
        <circle cx="80" cy="35" r="11" fill="#2A331F" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M 80 29 V 41 M 74 35 H 86" stroke="#A87F4E" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 5,
    title: "No Dead Time",
    text: "While you check one task, we keep other ready work moving.",
    smallText: "Work does not stop",
    tag: "CONTINUOUS",
    icon: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md">
        <defs>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E603B" />
            <stop offset="100%" stopColor="#2F3B21" />
          </linearGradient>
        </defs>
        {/* Infinity Loop */}
        <path
          d="M 38 60 C 20 40, 20 80, 38 60 C 55 40, 65 80, 82 60 C 100 40, 100 80, 82 60 C 65 40, 55 80, 38 60 Z"
          fill="none"
          stroke="url(#grad5)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Motion Pulse Circles */}
        <circle cx="38" cy="60" r="6" fill="#4E603B" />
        <circle cx="82" cy="60" r="6" fill="#FFFFFF" stroke="#2F3B21" strokeWidth="2" />
        <circle cx="60" cy="60" r="4" fill="#4E603B" opacity="0.8" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Your Say",
    text: "You check the work before it goes live.",
    smallText: "You give the final yes",
    tag: "APPROVAL",
    icon: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md">
        <defs>
          <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8F8B4A" />
            <stop offset="100%" stopColor="#6A6634" />
          </linearGradient>
        </defs>
        {/* Shield Badge */}
        <path
          d="M 60 18 L 92 30 V 58 C 92 78, 78 94, 60 102 C 42 94, 28 78, 28 58 V 30 Z"
          fill="url(#grad6)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        {/* Inner Glowing Verified Check */}
        <circle cx="60" cy="56" r="22" fill="#FFFFFF" fillOpacity="0.15" />
        <path
          d="M 46 56 L 55 65 L 75 45"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    id: 7,
    title: "Full Ownership",
    text: "You own the code, files, and work we make for you.",
    smallText: "Your product stays yours",
    tag: "SOVEREIGNTY",
    icon: (
      <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-md">
        <defs>
          <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E603B" />
            <stop offset="100%" stopColor="#33421F" />
          </linearGradient>
        </defs>
        {/* Lock Vault Frame */}
        <rect x="30" y="48" width="60" height="48" rx="12" fill="url(#grad7)" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Lock Shackle */}
        <path d="M 42 48 V 34 C 42 24, 78 24, 78 34 V 48" fill="none" stroke="#4E603B" strokeWidth="5" strokeLinecap="round" />
        {/* Keyhole Node */}
        <circle cx="60" cy="68" r="7" fill="#FFFFFF" />
        <polygon points="60,68 56,82 64,82" fill="#FFFFFF" />
      </svg>
    )
  }
];

/** Slop (px) for float-imprecise scrollLeft comparisons against the end stops. */
const EDGE_EPSILON = 2;

export function PromiseCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Aligns a card's LEFT edge to the deck's left edge. Centring is impossible
  // for the first and last cards — scrollLeft is bounded by
  // scrollWidth - clientWidth, so the browser clamps and leaves them half cut
  // with the active border drawn across the clipped edge. Left alignment is
  // reachable for every card. Measured from live rects rather than offsetLeft
  // so it doesn't depend on which ancestor is the offsetParent.
  const scrollToIndex = useCallback((index: number) => {
    const deck = scrollContainerRef.current;
    if (!deck) return;

    const card = deck.children[index] as HTMLElement | undefined;
    if (!card) return;

    const delta = card.getBoundingClientRect().left - deck.getBoundingClientRect().left;
    deck.scrollTo({ left: deck.scrollLeft + delta, behavior: 'smooth' });
  }, []);

  // Arrows step from the deck's real geometry, not from activeSlide. At the
  // right end stop activeSlide is pinned to the last index even though an
  // earlier card is the one flush left, so stepping off the pinned index asks
  // for a scroll the browser clamps away and the deck never moves.
  const stepSlide = useCallback((direction: -1 | 1) => {
    const deck = scrollContainerRef.current;
    if (!deck) return;

    const deckLeft = deck.getBoundingClientRect().left;
    const offsets = Array.from(deck.children).map(
      (node) => (node as HTMLElement).getBoundingClientRect().left - deckLeft,
    );

    const target =
      direction === -1
        ? offsets.reduce((acc, offset, idx) => (offset < -EDGE_EPSILON ? idx : acc), -1)
        : offsets.findIndex((offset) => offset > EDGE_EPSILON);

    if (target !== -1) scrollToIndex(target);
  }, [scrollToIndex]);

  const nextSlide = () => stepSlide(1);
  const prevSlide = () => stepSlide(-1);

  // Single source of truth for the highlight, counter, dots and arrow enablement:
  // the deck's real scroll position. Covers the arrows, dot clicks, card clicks,
  // trackpad swipe, touch drag and shift+wheel identically.
  useEffect(() => {
    const deck = scrollContainerRef.current;
    if (!deck) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const maxScroll = deck.scrollWidth - deck.clientWidth;

      setCanPrev(deck.scrollLeft > EDGE_EPSILON);
      setCanNext(deck.scrollLeft < maxScroll - EDGE_EPSILON);

      let nearest: number;
      if (deck.scrollLeft >= maxScroll - EDGE_EPSILON) {
        // At the right end stop the last card sits flush right, fully visible,
        // but it is no longer the card nearest the left edge — pin it anyway.
        nearest = slides.length - 1;
      } else {
        const deckLeft = deck.getBoundingClientRect().left;
        nearest = 0;
        let smallest = Infinity;
        Array.from(deck.children).forEach((node, idx) => {
          const distance = Math.abs((node as HTMLElement).getBoundingClientRect().left - deckLeft);
          if (distance < smallest) {
            smallest = distance;
            nearest = idx;
          }
        });
      }

      setActiveSlide((prev) => (prev === nearest ? prev : nearest));
    };

    measure();
    deck.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      deck.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="promises" className="py-24 bg-[#FDFCF0] border-t border-[#DDD8CC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-[#0B422A]">
              How We Keep Work Moving
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 font-mono-custom text-xs text-[#6B7E76] mr-2">
              <span className="font-bold text-[#0B422A]">
                {String(activeSlide + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(slides.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={prevSlide}
              disabled={!canPrev}
              aria-label="Previous promise"
              className="w-12 h-12 rounded-full border border-[#DDD8CC] bg-[#F0EFE6] transition-colors duration-300 flex items-center justify-center text-lg text-[#0B422A] shadow-xs enabled:cursor-pointer enabled:hover:bg-[#0B422A] enabled:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              disabled={!canNext}
              aria-label="Next promise"
              className="w-12 h-12 rounded-full border border-[#DDD8CC] bg-[#F0EFE6] transition-colors duration-300 flex items-center justify-center text-lg text-[#0B422A] shadow-xs enabled:cursor-pointer enabled:hover:bg-[#0B422A] enabled:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel Deck */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pt-6 pb-10 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={slide.id}
                onClick={() => scrollToIndex(index)}
                className={`snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[380px] group cursor-pointer transition-[border-color,box-shadow] duration-300 rounded-[2.2rem] p-8 bg-[#F0EFE6] border flex flex-col justify-between relative overflow-hidden ${
                  isActive
                    ? "border-[#D9B75B] ring-1 ring-[#D9B75B]/30 shadow-xl"
                    : "border-[#DDD8CC] hover:border-[#6B7E76] shadow-xs"
                }`}
              >
                {/* Top Tag & Index */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono-custom text-[11px] font-bold text-[#A67F2E] px-3 py-1 bg-[#FDFCF0] rounded-md border border-[#DDD8CC] uppercase tracking-wider">
                      {slide.tag}
                    </span>
                    <span className="font-mono-custom text-xs font-semibold text-[#9AA89F]">
                      0{slide.id}
                    </span>
                  </div>

                  {/* Front-Looking Icon Frame with B&W to Color & Floating Hover */}
                  <div className="flex items-center justify-center my-6 py-4">
                    <div className="relative transform transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-110 filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100">
                      {slide.icon}
                    </div>
                  </div>

                  {/* Title & Main Text */}
                  <div className="mt-4">
                    <h3 className="font-syne font-bold text-2xl text-[#0B422A] tracking-tight mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-[#121212] text-sm font-normal leading-relaxed">
                      {slide.text}
                    </p>
                  </div>
                </div>

                {/* Bottom Footer Accent */}
                <div className="mt-8 pt-4 border-t border-[#DDD8CC] flex items-center justify-between">
                  <span className="font-mono-custom text-xs font-medium text-[#6B7E76]">
                    {slide.smallText}
                  </span>
                  <span className="text-[#2D6E54] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ✓
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeSlide ? "w-8 bg-[#0B422A]" : "w-2 bg-[#DDD8CC] hover:bg-[#6B7E76]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
