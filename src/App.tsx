import { useEffect } from 'react';
import { Preloader } from '@/components/ui/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { Overview } from '@/components/sections/Overview';
import { Services } from '@/components/sections/Services';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { LatestShip } from '@/components/sections/LatestShip';
import { Process } from '@/components/sections/Process';
import { PromiseCarousel } from '@/components/sections/PromiseCarousel';
import { Pricing } from '@/components/sections/Pricing';
import { Team } from '@/components/sections/Team';
import { initLenis, destroyLenis } from '@/lib/lenis';

function App() {
  useEffect(() => {
    initLenis();
    return destroyLenis;
  }, []);

  // Note: overflow-x-clip, not -hidden. `overflow-x: hidden` forces overflow-y
  // to compute to `auto`, making this a scroll container and breaking
  // `position: sticky` in every descendant section.
  return (
    <div className="min-h-screen bg-[#faf8f6] text-[#2A331F] selection:bg-emerald-500/20 selection:text-[#2A331F] font-sans antialiased overflow-x-clip relative">
      <Preloader />
      <Navbar />
      
      <main>
        <Hero />
        <VideoShowcase />
        <Overview />
        <Services />
        <CaseStudies />
        <LatestShip />
        <Process />
        <PromiseCarousel />
        <Pricing />
        <Team />
      </main>

      <Footer />
    </div>
  );
}

export default App;
