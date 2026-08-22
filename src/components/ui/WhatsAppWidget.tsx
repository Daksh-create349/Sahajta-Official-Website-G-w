import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(true);

  // Auto dismiss tooltip on mobile screens (< 640px) after 5 seconds to avoid blocking cards/text
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const whatsappUrl =
    'https://wa.me/918082943205?text=Hi%20Sahajta%20team%2C%20I%20want%20to%20discuss%20a%20project%20with%20you.';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3 select-none pointer-events-auto pb-[env(safe-area-inset-bottom)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative group mb-0.5"
          >
            {/* Clean Editorial Floating Prompt */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="relative flex items-center px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-[#FDFCF0] border border-[#DDD8CC] shadow-md hover:border-[#0B422A]/40 hover:bg-[#FFFFFF] transition-all duration-200 cursor-pointer"
            >
              <span className="font-sans font-medium text-xs sm:text-sm text-[#121212] tracking-tight whitespace-nowrap">
                Chat with us
              </span>
            </a>

            {/* Dismiss Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close chat prompt"
              className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-5.5 sm:h-5.5 bg-[#121212]/80 hover:bg-[#0B422A] text-white/90 hover:text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xs hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-20"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Floating Trigger — Deep Forest Green & Specular Edge */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0D4E32] via-[#0B422A] to-[#072B1B] text-white border border-[#4A8C6F]/40 shadow-[0_10px_28px_-6px_rgba(11,66,42,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_14px_36px_-4px_rgba(11,66,42,0.55),0_0_24px_rgba(217,183,91,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out cursor-pointer"
      >
        {/* Ambient Gold Glow Halo on Hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0B422A] to-[#D9B75B] opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300 -z-10 pointer-events-none" />

        {/* Official WhatsApp Monochrome Vector Icon */}
        <img
          src="/whatsapp-monochrome.svg"
          alt="WhatsApp"
          className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
          draggable={false}
        />
      </a>
    </div>
  );
}
