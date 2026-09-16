import { useEffect, useState, lazy, Suspense } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { Services } from '@/components/sections/Services';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Process } from '@/components/sections/Process';
import { WorkWithUsCTA } from '@/components/sections/WorkWithUsCTA';
import { FAQ } from '@/components/sections/FAQ';
import { VideoTestimonials } from '@/components/sections/VideoTestimonials';
import { initLenis, destroyLenis, lenisRef } from '@/lib/lenis';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';

const PrivacyPage = lazy(() => import('@/components/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const CookiePage = lazy(() => import('@/components/pages/CookiePage').then((m) => ({ default: m.CookiePage })));
const RefundPage = lazy(() => import('@/components/pages/RefundPage').then((m) => ({ default: m.RefundPage })));
const AiUsagePage = lazy(() => import('@/components/pages/AiUsagePage').then((m) => ({ default: m.AiUsagePage })));

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  const hash = window.location.hash;
  if (path === '/privacy' || hash === '#privacy') return '/privacy';
  if (path === '/cookies' || hash === '#cookies') return '/cookies';
  if (path === '/refund' || hash === '#refund') return '/refund';
  if (path === '/ai-usage' || hash === '#ai-usage') return '/ai-usage';
  return '/';
}

function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  useEffect(() => {
    if (currentPath === '/') {
      // Delay Lenis init when a direct section hash is present.
      // Lenis resets scroll to 0 on init — if hash hop hasn't fired yet,
      // Lenis wins and user lands on Hero. Give hop 350ms head start.
      const hash = window.location.hash;
      const hasHash = hash && hash.length > 1 && !['#privacy','#cookies','#refund','#ai-usage'].includes(hash.split('?')[0]);
      if (hasHash) {
        const t = setTimeout(() => initLenis(), 350);
        // still need cleanup
        const onPopState = () => setCurrentPath(getInitialPath());
        window.addEventListener('popstate', onPopState);
        window.addEventListener('hashchange', onPopState);
        return () => {
          clearTimeout(t);
          destroyLenis();
          window.removeEventListener('popstate', onPopState);
          window.removeEventListener('hashchange', onPopState);
        };
      } else {
        initLenis();
      }
    } else {
      destroyLenis();
    }

    // Dynamic SEO Metadata Sync
    const metaMap: Record<string, { title: string; description: string; canonical: string }> = {
      '/': {
        title: 'Sahajta AI | Fractional CTO & High-Velocity AI Tech Partner',
        description: 'Your fractional CTO and agile build team in one. We plan, build, fix, test, and ship production-ready software and custom AI systems through short weekly sprints.',
        canonical: 'https://sahajta.com/',
      },
      '/privacy': {
        title: 'Privacy Policy | Sahajta AI',
        description: 'Read Sahajta\'s privacy policy and understand our strict commitments to data protection, non-disclosure, and zero data selling.',
        canonical: 'https://sahajta.com/privacy',
      },
      '/cookies': {
        title: 'Cookie Policy | Sahajta AI',
        description: 'Sahajta\'s cookie policy. Learn how we maintain a zero first-party tracking and no advertising cookies policy.',
        canonical: 'https://sahajta.com/cookies',
      },
      '/refund': {
        title: 'Refund Policy | Sahajta AI',
        description: 'Review Sahajta\'s transparent refund policy, milestone agreements, and weekly sprint terms.',
        canonical: 'https://sahajta.com/refund',
      },
      '/ai-usage': {
        title: 'AI Usage & Data Policy | Sahajta AI',
        description: 'How Sahajta utilizes AI tools responsibly without storing client confidential information or training public foundational models.',
        canonical: 'https://sahajta.com/ai-usage',
      },
    };

    const currentMeta = metaMap[currentPath] || metaMap['/'];
    document.title = currentMeta.title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', currentMeta.description);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentMeta.canonical);
    }

    const onPopState = () => {
      setCurrentPath(getInitialPath());
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onPopState);

    return () => {
      destroyLenis();
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onPopState);
    };
  }, [currentPath]);

  // Automated instant section hopping for direct links (e.g. #case-studies, #process, #contact)
  useEffect(() => {
    if (currentPath !== '/') return;

    const getCleanHashId = (rawHash: string): string | null => {
      if (!rawHash) return null;
      const withoutQuery = rawHash.split('?')[0];
      const clean = withoutQuery.replace(/^#/, '').replace(/[/()\s.,;]+$/, '').trim();
      if (!clean) return null;
      if (['privacy', 'cookies', 'refund', 'ai-usage'].includes(clean)) return null;
      return clean;
    };

    const targetId = getCleanHashId(window.location.hash);
    if (!targetId) return;

    let userHasInteracted = false;
    const markInteraction = () => {
      userHasInteracted = true;
    };

    window.addEventListener('touchstart', markInteraction, { passive: true, once: true });
    window.addEventListener('wheel', markInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', markInteraction, { passive: true, once: true });
    window.addEventListener('keydown', markInteraction, { passive: true, once: true });

    const hopToSection = (overrideId?: string) => {
      if (userHasInteracted && !overrideId) return;
      const id = overrideId || targetId;
      const element = document.getElementById(id);
      if (!element) return;

      // Header clearance: ~64px on mobile (<768px), ~80px on desktop (>=768px)
      const navbarOffset = window.innerWidth < 768 ? 64 : 80;
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const rect = element.getBoundingClientRect();
      const targetTop = Math.max(0, rect.top + currentScrollY - navbarOffset);

      if (Math.abs(currentScrollY - targetTop) > 4) {
        // Stop Lenis so it doesn't fight us during the instant jump
        if (lenisRef.current) {
          lenisRef.current.stop();
        }
        window.scrollTo({ top: targetTop, behavior: 'instant' as ScrollBehavior });
        document.documentElement.scrollTop = targetTop;
        document.body.scrollTop = targetTop;
        // Resume Lenis after jump settles
        if (lenisRef.current) {
          requestAnimationFrame(() => {
            if (lenisRef.current) lenisRef.current.start();
          });
        }
      }
    };

    // 1. Hop immediately on render
    hopToSection();

    // 2. Lock onto target position across subsequent layout reflows (fonts, videos, images)
    const timers: number[] = [];
    const intervals = [20, 50, 100, 200, 350, 550, 850, 1200, 1800];
    intervals.forEach((delay) => {
      const t = window.setTimeout(() => hopToSection(), delay);
      timers.push(t);
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => hopToSection()).catch(() => {});
    }

    const onLoad = () => hopToSection();
    window.addEventListener('load', onLoad, { once: true });

    // 3. Handle in-page hash changes
    const onHashChange = () => {
      userHasInteracted = false;
      const nextId = getCleanHashId(window.location.hash);
      if (nextId) hopToSection(nextId);
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('touchstart', markInteraction);
      window.removeEventListener('wheel', markInteraction);
      window.removeEventListener('pointerdown', markInteraction);
      window.removeEventListener('keydown', markInteraction);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('hashchange', onHashChange);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [currentPath]);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  if (currentPath === '/privacy') {
    return (
      <Suspense fallback={null}>
        <PrivacyPage
          onBack={() => navigateTo('/')}
          onNavigateCookies={() => navigateTo('/cookies')}
          onNavigateRefund={() => navigateTo('/refund')}
          onNavigateAiUsage={() => navigateTo('/ai-usage')}
        />
      </Suspense>
    );
  }

  if (currentPath === '/cookies') {
    return (
      <Suspense fallback={null}>
        <CookiePage onBack={() => navigateTo('/')} />
      </Suspense>
    );
  }

  if (currentPath === '/refund') {
    return (
      <Suspense fallback={null}>
        <RefundPage onBack={() => navigateTo('/')} />
      </Suspense>
    );
  }

  if (currentPath === '/ai-usage') {
    return (
      <Suspense fallback={null}>
        <AiUsagePage onBack={() => navigateTo('/')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#121212] selection:bg-[#D9B75B]/30 selection:text-[#0B422A] font-sans antialiased relative">
      <Preloader />
      <Navbar />

      <WhatsAppWidget />
      
      <main>
        <Hero />
        <VideoShowcase />
        <Services />
        <CaseStudies />
        <Process />
        <WorkWithUsCTA />
        <FAQ />
        <VideoTestimonials />
      </main>

      <Footer
        onPrivacyClick={() => navigateTo('/privacy')}
        onCookieClick={() => navigateTo('/cookies')}
        onRefundClick={() => navigateTo('/refund')}
        onAiUsageClick={() => navigateTo('/ai-usage')}
      />
    </div>
  );
}

export default App;
