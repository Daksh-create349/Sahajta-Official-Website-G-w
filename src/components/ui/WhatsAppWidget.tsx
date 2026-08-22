import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(true);

  // Auto dismiss tooltip on mobile screens (< 640px) after 6 seconds to avoid blocking cards
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 6000);
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
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-0.5"
          >
            {/* Pill Container: White bg, thick black stroke, brand green offset drop shadow */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="relative flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border-[2.5px] border-[#121212] shadow-[2px_4px_0px_0px_#0B422A] hover:shadow-[2px_6px_0px_0px_#0B422A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_2px_0px_0px_#0B422A] transition-all duration-150 cursor-pointer block"
            >
              <span className="font-sans font-medium text-xs sm:text-sm text-[#121212] tracking-tight whitespace-nowrap">
                Chat with us
              </span>
            </a>

            {/* Black Circle Close Button with White 'X' on top-right */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close chat prompt"
              className="absolute -top-1.5 -right-2.5 sm:-right-3 w-5.5 h-5.5 sm:w-6 sm:h-6 bg-[#121212] hover:bg-[#2A2A2A] text-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all duration-150 cursor-pointer z-20"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Trigger: Solid Brand Forest Green Circle with White Icon & Soft Shadow */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#0B422A] text-white shadow-[0_8px_24px_-4px_rgba(11,66,42,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(11,66,42,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* Official WhatsApp Vector Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white pointer-events-none select-none transition-transform duration-200 group-hover:scale-105"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </div>
  );
}
