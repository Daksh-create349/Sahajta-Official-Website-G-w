import { useState, useEffect, useRef, type FormEvent } from 'react';
import Plasma from '@/components/ui/Plasma';

export function WorkWithUsCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldRenderPlasma, setShouldRenderPlasma] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldRenderPlasma(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderPlasma(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-[#faf8f6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Outer Card - Light Mode Paper Aesthetics */}
        <div className="bg-[#EEEBE4] rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 border border-[#E2DED5] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Box with Plasma Background - Light Mode */}
            <div className="lg:col-span-5 relative bg-[#FAF8F6] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden min-h-[380px] lg:min-h-[500px] flex flex-col justify-between p-8 sm:p-10 border border-[#E2DED5] group">
              
              {/* Plasma Animation Background - Deferred Mount for 100 Performance */}
              <div className="absolute inset-0 z-0">
                {shouldRenderPlasma && (
                  <Plasma
                    color="#3D4B2F"
                    speed={0.4}
                    direction="forward"
                    scale={1.25}
                    opacity={0.95}
                    mouseInteractive={false}
                    renderScale={0.35}
                    maxDpr={1.0}
                    targetFps={30}
                    iterations={25}
                  />
                )}
              </div>

              {/* Subtle Gradient Overlay so deep plasma texture remains vivid & legible */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F6]/35 via-transparent to-[#FAF8F6]/75 pointer-events-none z-1" />

              {/* Header Content */}
              <div className="relative z-10 my-auto">
                <h2 className="font-syne text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#2A331F] leading-[1.08]">
                  Ready to grow with us?
                </h2>
              </div>
            </div>

            {/* Right Box Form - Light Mode Card */}
            <div className="lg:col-span-7 bg-[#FAF8F6] rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 border border-[#E2DED5] flex flex-col justify-between shadow-xs">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-14 h-14 rounded-full bg-[#64794A]/15 border border-[#64794A] flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-[#2A331F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-[#2A331F] mb-2">Enquiry Received!</h3>
                  <p className="text-[#5F6654] text-sm max-w-sm">
                    Thank you for reaching out. The Sahajta team will be in touch with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    aria-label="Send another message"
                    className="mt-8 text-xs font-mono-custom text-[#7E663A] underline underline-offset-4 hover:text-[#2A331F] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-4">
                    {/* Top Row: Email & First Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="Email"
                          aria-label="Email Address"
                          className="w-full bg-white border border-[#E2DED5] rounded-xl px-4 py-3.5 text-sm text-[#2A331F] placeholder-[#7C8271] focus:outline-none focus:border-[#2A331F] focus:ring-1 focus:ring-[#2A331F] transition-all shadow-2xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="firstName" className="sr-only">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          placeholder="First Name"
                          aria-label="First Name"
                          className="w-full bg-white border border-[#E2DED5] rounded-xl px-4 py-3.5 text-sm text-[#2A331F] placeholder-[#7C8271] focus:outline-none focus:border-[#2A331F] focus:ring-1 focus:ring-[#2A331F] transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Middle Row: Company Name */}
                    <div>
                      <label htmlFor="companyName" className="sr-only">Company Name</label>
                      <input
                        id="companyName"
                        type="text"
                        placeholder="Company Name"
                        aria-label="Company Name"
                        className="w-full bg-white border border-[#E2DED5] rounded-xl px-4 py-3.5 text-sm text-[#2A331F] placeholder-[#7C8271] focus:outline-none focus:border-[#2A331F] focus:ring-1 focus:ring-[#2A331F] transition-all shadow-2xs"
                      />
                    </div>

                    {/* Textarea: How can we help? */}
                    <div>
                      <label htmlFor="helpMessage" className="sr-only">How can we help?</label>
                      <textarea
                        id="helpMessage"
                        rows={5}
                        required
                        placeholder="How can we help?"
                        aria-label="How can we help?"
                        className="w-full bg-white border border-[#E2DED5] rounded-xl px-4 py-3.5 text-sm text-[#2A331F] placeholder-[#7C8271] focus:outline-none focus:border-[#2A331F] focus:ring-1 focus:ring-[#2A331F] transition-all shadow-2xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label="Submit Enquiry Form"
                      className="w-full bg-[#2A331F] hover:bg-[#1A2013] text-white font-syne font-semibold py-4 px-6 rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md group cursor-pointer disabled:opacity-75"
                    >
                      {loading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkWithUsCTA;
