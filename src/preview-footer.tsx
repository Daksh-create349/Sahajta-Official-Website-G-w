import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { Footer } from '@/components/layout/Footer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="bg-[#faf8f6]">
      <Footer />
    </div>
  </StrictMode>
);
