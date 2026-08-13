import { motion } from 'framer-motion';

export function LatestShip() {
  return (
    <section className="py-12 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#F0EFE6] p-8 md:p-10 rounded-3xl border border-[#DDD8CC] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-[#0B422A]">
              vibe2real.codes <span className="font-normal text-[#6B7E76]">— from idea to live in 24 hours.</span>
            </h3>
          </div>

          <a
            href="https://vibe2real.codes"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-[#0B422A] text-[#FDFCF0] font-syne font-medium text-xs rounded-full hover:bg-[#2D6E54] transition-all inline-flex items-center gap-2 shadow-xs group cursor-pointer"
          >
            <span>Visit Live Build</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
