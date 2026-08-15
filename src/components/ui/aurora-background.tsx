import { cn } from "@/lib/utils";
import React, { type ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { isMobileDevice } from "@/lib/device";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    const onResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  // Pause the aurora CSS animation while the user is actively scrolling.
  const pauseAurora = useCallback(() => {
    if (isMobile) return;
    const el = auroraRef.current;
    if (!el) return;
    el.style.animationPlayState = 'paused';
    el.classList.add('aurora-paused');
  }, [isMobile]);

  const resumeAurora = useCallback(() => {
    if (isMobile) return;
    const el = auroraRef.current;
    if (!el) return;
    el.style.animationPlayState = 'running';
    el.classList.remove('aurora-paused');
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      pauseAurora();
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(resumeAurora, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [pauseAurora, resumeAurora, isMobile]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center bg-[#FDFCF0] text-[#121212] isolate",
        className
      )}
      {...props}
    >
      {/* Aurora layer completely removed on mobile for butter smooth 60fps scrolling */}
      {!isMobile && (
        <div
          className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-0"
          style={{ contain: 'strict' }}
        >
          <div
            ref={auroraRef}
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            pointer-events-none
            absolute -inset-[10px]
            motion-reduce:after:animate-none`,
              "filter blur-[14px] opacity-35",
              "after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]",
              "after:dark:[background-image:var(--dark-gradient),var(--aurora)]",
              "after:[background-size:200%,_100%]",
              "after:mix-blend-difference",
              isVisible && "after:animate-aurora",
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              contain: 'paint',
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};
