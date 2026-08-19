import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(true);

  // Auto dismiss tooltip on mobile screens (< 640px) after 4 seconds to avoid blocking cards/text
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const whatsappUrl =
    'https://wa.me/918082943205?text=Hi%20Sahajta%20team%2C%20I%20want%20to%20discuss%20a%20project%20with%20you.';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3 select-none pointer-events-auto pb-[env(safe-area-inset-bottom)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group mb-0.5 sm:mb-1"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative cursor-pointer"
            >
              {/* Offset Solid Shadow in Sahajta Forest Green Theme Color */}
              <div className="absolute inset-0 bg-[#0B422A] rounded-full translate-x-[2.5px] translate-y-[2.5px] sm:translate-x-[3px] sm:translate-y-[3px] transition-transform duration-200 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

              {/* Pill Container — Compact on mobile, standard on desktop */}
              <div className="relative bg-white text-[#121212] border-[1.5px] border-[#121212] px-3.5 py-1.5 sm:px-6 sm:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-sm transition-transform duration-200 group-hover:-translate-x-[1px] group-hover:-translate-y-[1px]">
                <span className="font-sans font-semibold text-xs sm:text-base tracking-tight text-[#121212] whitespace-nowrap">
                  Chat with us
                </span>
              </div>
            </a>

            {/* Dismiss 'x' Button on Pill Top-Right */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close chat prompt"
              className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 bg-[#121212] hover:bg-[#0B422A] text-white rounded-full flex items-center justify-center transition-colors shadow-md z-20 cursor-pointer"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Main Circular Trigger Button — Sleek 48px on mobile, 64px on desktop */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#0B422A] hover:bg-[#2D6E54] text-white shadow-xl shadow-[#0B422A]/30 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Glow halo on hover */}
        <div className="absolute inset-0 rounded-full bg-[#D9B75B]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />

        {/* Official WhatsApp Monochrome White Icon */}
        <img
          src="/whatsapp-monochrome.svg"
          alt="WhatsApp"
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain pointer-events-none select-none transition-transform duration-200 group-hover:scale-110"
          draggable={false}
        />
      </a>
    </div>
  );
}
