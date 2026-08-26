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
import { initLenis, destroyLenis } from '@/lib/lenis';
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
      initLenis();
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
