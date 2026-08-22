import { useEffect, useRef } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  outcome: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "They shipped a working AI intake system in two weeks — something our last agency quoted six months for. No fluff, just working software every Friday.",
    name: "Ananya Rao",
    role: "Founder, Meridian Health",
    outcome: "Shipped in 2 weeks",
  },
  {
    quote: "Pranamya rebuilt our entire data pipeline over a weekend and it just worked. The kind of engineering you rarely get to see up close.",
    name: "Marcus Feldt",
    role: "CTO, Northlane",
    outcome: "Weekend rebuild",
  },
  {
    quote: "Weekly sprints meant I always knew where my money was going. Every demo was something I could actually click and use, not a slide.",
    name: "Rahul Menon",
    role: "CEO, Trellis",
    outcome: "Weekly delivery",
  },
  {
    quote: "We went from a Figma file to a live product our customers pay for. Sahajta handled the AI, the backend, all of it end to end.",
    name: "Sofia Alvarez",
    role: "Co-founder, Cadence",
    outcome: "Figma to revenue",
  },
  {
    quote: "The handover was flawless — clean code, real docs, zero lock-in. My in-house team picked it up in a single day.",
    name: "Devon Clarke",
    role: "VP Engineering, Baseform",
    outcome: "Clean handover",
  },
  {
    quote: "Our support costs dropped 60% after their AI agent went live. It paid for the entire build inside the first month.",
    name: "Priya Nair",
    role: "Operations Lead, Kettle",
    outcome: "−60% support cost",
  },
  {
    quote: "Fast, honest, and genuinely good at the AI part — not just thin wrappers around an API. That combination is rare.",
    name: "James Whitmore",
    role: "Founder, Orbital",
    outcome: "Real AI, not wrappers",
  },
  {
    quote: "They turned a vague idea into a deployed product in 24 hours during our pilot. I have never watched a team move like that.",
    name: "Kavya Iyer",
    role: "Founder, Loomly",
    outcome: "Live in 24 hours",
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="group/t w-[290px] sm:w-[330px] md:w-[360px] shrink-0 flex flex-col justify-between bg-white border border-[#DDD8CC] rounded-[1.75rem] p-6 sm:p-7 shadow-[0_2px_10px_-6px_rgba(18,18,18,0.10)] hover:border-[#0B422A] hover:-translate-y-1 hover:shadow-[0_16px_34px_-22px_rgba(18,18,18,0.22)] transition-[transform,border-color,box-shadow] duration-300 ease-out select-none">
      {/* Top row: outcome marker */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <span
          aria-hidden="true"
          className="font-syne font-extrabold text-[2.75rem] leading-[0.55] text-[#D9B75B]/90 group-hover/t:text-[#B8902F] transition-colors duration-300 -ml-0.5"
        >
          &ldquo;
        </span>
        <span className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9B75B] group-hover/t:bg-[#B8902F] transition-colors duration-300" />
          <span className="font-mono-custom text-[10px] font-bold text-[#A67F2E] uppercase tracking-[0.16em] whitespace-nowrap">
            {item.outcome}
          </span>
        </span>
      </div>

      {/* Quote body */}
      <blockquote className="text-[#121212] text-[13.5px] sm:text-sm font-normal leading-relaxed mb-6">
        {item.quote}
      </blockquote>

      {/* Author */}
      <figcaption className="flex items-center gap-3.5 pt-4 border-t border-[#DDD8CC]/70">
        <span className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-[#0B422A] text-[#FDFCF0] font-syne font-bold text-[13px] ring-2 ring-transparent group-hover/t:ring-[#D9B75B]/50 transition-[box-shadow] duration-300">
          {initials(item.name)}
        </span>
        <span className="flex flex-col min-w-0">
          <span className="font-syne font-bold text-[14px] text-[#0B422A] tracking-tight leading-tight truncate">
            {item.name}
          </span>
          <span className="font-mono-custom text-[10.5px] text-[#6B7E76] tracking-wide leading-tight mt-1 truncate">
            {item.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  dir,
  speed,
}: {
  items: Testimonial[];
  dir: -1 | 1;
  speed: number;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1);
  const targetRef = useRef(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!viewport || !track || !group) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    // Hover eases speed toward this fraction — slows, never fully stops.
    const HOVER_FACTOR = 0.18;
    let offset = 0;
    let last = performance.now();
    let raf = 0;
    let running = false;

    const measure = () =>
      group.getBoundingClientRect().width +
      parseFloat(getComputedStyle(track).columnGap || "0");
    let wrap = measure();

    const ro = new ResizeObserver(() => {
      wrap = measure();
    });
    ro.observe(group);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // Ease current speed toward target (1 = full, 0 = hovered/slow).
      speedRef.current += (targetRef.current - speedRef.current) * Math.min(dt * 8, 1);
      const factor = HOVER_FACTOR + (1 - HOVER_FACTOR) * speedRef.current;
      offset += dir * speed * factor * dt;
      if (wrap > 0) {
        offset = offset % wrap;
        if (offset > 0) offset -= wrap; // keep within (-wrap, 0] — two copies tile seamlessly
      }
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    // Only animate while on screen — zero cost off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(viewport);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [dir, speed]);

  return (
    <div
      ref={viewportRef}
      onMouseEnter={() => (targetRef.current = 0)}
      onMouseLeave={() => (targetRef.current = 1)}
    >
      <div ref={trackRef} className="testimonials-marquee-track">
        {[0, 1].map((set) => (
          <div
            key={set}
            ref={set === 0 ? groupRef : undefined}
            className="flex gap-5 sm:gap-6 shrink-0 items-stretch"
            aria-hidden={set === 1 ? "true" : undefined}
          >
            {items.map((item, idx) => (
              <TestimonialCard key={`${set}-${idx}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const topRow = testimonials.slice(0, 4);
  const bottomRow = testimonials.slice(4, 8);

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="py-20 sm:py-24 bg-[#FDFCF0] border-t border-[#DDD8CC] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="font-mono-custom text-[11px] sm:text-xs font-bold text-[#6B7E76] uppercase tracking-[0.28em] flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-[#D9B75B] to-[#DDD8CC]" />
              Client Stories
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B422A]">
              The people we ship for
            </h2>
          </div>
          <p className="font-mono-custom text-xs text-[#9AA89F] tracking-wide max-w-xs md:text-right">
            Real outcomes from founders and teams we&apos;ve built with.
          </p>
        </div>
      </div>

      {/* Full-bleed dual-row scrolling marquee */}
      <div className="testimonials-marquee-viewport py-6 sm:py-8">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FDFCF0] via-[#FDFCF0]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FDFCF0] via-[#FDFCF0]/80 to-transparent z-20" />

        <div className="flex flex-col gap-5 sm:gap-6">
          <MarqueeRow items={topRow} dir={-1} speed={40} />
          <MarqueeRow items={bottomRow} dir={1} speed={32} />
        </div>
      </div>
    </section>
  );
}
