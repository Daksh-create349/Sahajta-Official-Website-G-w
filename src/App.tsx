import { useEffect, useState } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { Overview } from '@/components/sections/Overview';
import { Services } from '@/components/sections/Services';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Process } from '@/components/sections/Process';
import { PromiseCarousel } from '@/components/sections/PromiseCarousel';
import { Pricing } from '@/components/sections/Pricing';
import { WorkWithUsCTA } from '@/components/sections/WorkWithUsCTA';
import { Team } from '@/components/sections/Team';
import { Testimonials } from '@/components/sections/Testimonials';
import { PrivacyPage } from '@/components/pages/PrivacyPage';
import { CookiePage } from '@/components/pages/CookiePage';
import { RefundPage } from '@/components/pages/RefundPage';
import { AiUsagePage } from '@/components/pages/AiUsagePage';
import { initLenis, destroyLenis } from '@/lib/lenis';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';

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
      <PrivacyPage
        onBack={() => navigateTo('/')}
        onNavigateCookies={() => navigateTo('/cookies')}
        onNavigateRefund={() => navigateTo('/refund')}
        onNavigateAiUsage={() => navigateTo('/ai-usage')}
      />
    );
  }

  if (currentPath === '/cookies') {
    return <CookiePage onBack={() => navigateTo('/')} />;
  }

  if (currentPath === '/refund') {
    return <RefundPage onBack={() => navigateTo('/')} />;
  }

  if (currentPath === '/ai-usage') {
    return <AiUsagePage onBack={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#121212] selection:bg-[#D9B75B]/30 selection:text-[#0B422A] font-sans antialiased overflow-x-clip relative">
      <Preloader />
      <Navbar />

      <WhatsAppWidget />
      
      <main>
        <Hero />
        <VideoShowcase />
        <Overview />
        <Services />
        <CaseStudies />
        <Process />
        <PromiseCarousel />
        <Pricing />
        <WorkWithUsCTA />
        <Team />
        <Testimonials />
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
