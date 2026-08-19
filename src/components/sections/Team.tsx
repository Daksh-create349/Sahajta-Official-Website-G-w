import shubhangImg from '@/assets/shubhang.png';
import pranamyaImg from '@/assets/pranamya.png';

export function Team() {
  const team = [
    {
      name: "Shubhang Sethi",
      role: "Co-founder & Product Lead",
      bio: "Product strategy & weekly sprint delivery. Turns business goals into clean, shipped software.",
      tags: ["Product Strategy", "Sprint Delivery", "Namyah Lead"],
      linkedin: "https://www.linkedin.com/in/shubhangsethi/",
      initials: "SS",
      slotId: "PHOTO_SLOT_01 // SHUBHANG",
      image: shubhangImg,
      imgClass: "absolute bottom-0 h-[98%] w-auto object-contain pointer-events-none"
    },
    {
      name: "Pranamya Jain",
      role: "Co-founder & Tech Lead",
      bio: "AI systems & full-stack architecture. Built vibe2real.codes from concept to live production in 24 hours.",
      tags: ["AI Architect", "Full-Stack Eng", "vibe2real Founder"],
      linkedin: "https://www.linkedin.com/in/pranamya-jainn/",
      initials: "PJ",
      slotId: "PHOTO_SLOT_02 // PRANAMYA",
      image: pranamyaImg,
      imgClass: "absolute bottom-0 h-[98%] w-auto object-contain pointer-events-none"
    }
  ];

  return (
    <section id="team" className="py-24 bg-[#FDFCF0] border-t border-[#DDD8CC]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-[#0B422A]">
              The Team Behind Sahajta
            </h2>
          </div>
          <div className="font-mono-custom text-xs font-semibold text-[#6B7E76] uppercase tracking-widest">
            02 / FOUNDERS
          </div>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#F0EFE6] p-6 sm:p-8 md:p-10 rounded-[2.5rem] border border-[#DDD8CC] flex flex-col justify-between hover:border-[#6B7E76] transition-all duration-300 shadow-xs group/card"
            >
              <div>
                {/* Minimalistic Photo Slot Frame */}
                <div className="relative w-full h-[380px] lg:h-[480px] mb-8 rounded-[2rem] border border-[#DDD8CC] bg-[#FDFCF0] overflow-hidden flex items-center justify-center">
                  {/* Co-founder Cutout Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`transition-transform duration-500 ease-out group-hover/card:scale-[1.03] ${member.imgClass}`}
                  />
                </div>

                <div className="mb-4">
                  <h3 className="font-syne font-bold text-3xl text-[#0B422A] tracking-tight">
                    {member.name}
                  </h3>
                  <p className="font-mono-custom text-xs font-medium text-[#6B7E76] uppercase tracking-wider mt-1.5">
                    {member.role}
                  </p>
                </div>

                <p className="text-[#121212] text-sm sm:text-base font-normal leading-relaxed mb-8">
                  {member.bio}
                </p>
              </div>

              <div>
                {/* Clean Tag Row */}
                <div className="flex flex-wrap gap-2 mb-8 pt-4 border-t border-[#DDD8CC]/60">
                  {member.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono-custom text-[11px] font-medium text-[#6B7E76] px-3 py-1 bg-[#FDFCF0] rounded-md border border-[#DDD8CC]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between">
                  <span className="font-mono-custom text-xs text-[#9AA89F]">Sahajta AI</span>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FDFCF0] text-[#0B422A] font-mono-custom text-xs font-medium hover:bg-[#0B422A] hover:text-white transition-colors duration-300 border border-[#DDD8CC]"
                  >
                    <span>LinkedIn</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

