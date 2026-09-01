"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, ArrowDown } from "lucide-react";

// ─── Google 4-Color "G" SVG ──────────────────────────────────────────────────
function GoogleGIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12c0 2.02.45 3.84 1.24 5.42l4.04-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Hostinger Geometric "H" SVG ─────────────────────────────────────────────
function HostingerHIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 5.5L14 10.5V22L6 17V5.5Z" fill="#673DE6" />
      <path d="M26 10L18 5.5V17L26 21.5V10Z" fill="#7C4DFF" />
      <path d="M14 13.5L18 16V26.5L14 24V13.5Z" fill="#5120D1" />
    </svg>
  );
}

// ─── Curved Blue Accent Underline ─────────────────────────────────────────────
function HeaderCurveUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10C70 3.5 170 3.5 236 10"
        stroke="#0066FF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M28 13.5C95 6.5 160 6.5 212 13.5"
        stroke="#0066FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

const Partner = () => {
  const handleScrollNext = () => {
    const nextSection =
      document.getElementById("myself-video") ||
      document.getElementById("video-testimonial");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-8 sm:py-8 md:py-6 bg-white overflow-hidden">
      {/* ─── AMBIENT BACKGROUND GLOWS ─── */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-purple-100/25 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ─── SIDE DECORATIVE DOT MATRICES ─── */}
      {/* Left Blue Dots */}
      <div className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 hidden md:grid grid-cols-4 gap-2.5 opacity-35 pointer-events-none select-none -z-10">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={`dot-left-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-blue-500"
          />
        ))}
      </div>

      {/* Right Purple Dots */}
      <div className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 hidden md:grid grid-cols-4 gap-2.5 opacity-35 pointer-events-none select-none -z-10">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={`dot-right-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── SECTION HEADLINE (PROMINENT & CLEAN) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Real certifications are nice.
          </h2>
          <div className="relative inline-flex flex-col items-center mt-1 sm:mt-1.5">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0066FF] tracking-tight leading-tight">
              But numbers matter more.
            </span>
            <HeaderCurveUnderline className="w-48 sm:w-60 md:w-72 h-3 sm:h-4 mt-1" />
          </div>
        </motion.div>

        {/* ─── TWO ENHANCED CREDENTIAL CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 max-w-5xl mx-auto mt-10 sm:mt-12 items-stretch">
          {/* Card 1: Google Search Certified / Partner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-7 lg:p-8 shadow-[0_10px_35px_-8px_rgba(15,23,42,0.06),0_0_20px_rgba(0,102,255,0.03)] hover:shadow-[0_16px_45px_-8px_rgba(0,102,255,0.14)] hover:border-blue-300/90 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top specularity border highlight */}
            <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/60 to-transparent pointer-events-none" />

            <div>
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] border border-[#BFDBFE]/80 text-[#0066FF] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 shadow-xs">
                <div className="w-4 h-4 rounded-full bg-[#0066FF] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>GOOGLE ADS SEARCH CERTIFIED</span>
              </div>

              {/* Main Content: Circular Badge + Text Details */}
              <div className="flex items-center gap-5 sm:gap-6">
                {/* Circular Badge Container */}
                <div className="w-26 h-26 sm:w-28 sm:h-28 md:w-30 md:h-30 rounded-full bg-white border-2 border-slate-100 ring-4 ring-blue-50 shadow-[0_6px_20px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center shrink-0 p-2.5 text-center group-hover:scale-105 transition-transform duration-300">
                  <GoogleGIcon className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 drop-shadow-xs" />
                  <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight leading-tight mt-1">
                    Google Partner
                  </span>
                </div>

                {/* Right Details */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-xl sm:text-2xl md:text-[23px] font-extrabold text-slate-900 tracking-tight leading-snug">
                    Google Search Partner
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-slate-600 leading-relaxed mt-1.5">
                    Officially recognized by Google for driving results and growing businesses.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Status Tag */}
            <div className="flex items-center gap-2 mt-5 pt-3.5 border-t border-slate-100 text-xs sm:text-sm font-bold text-[#0066FF]">
              <div className="w-4.5 h-4.5 rounded-full bg-[#0066FF] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Verified Partner</span>
            </div>
          </motion.div>

          {/* Card 2: Hostinger Partner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-7 lg:p-8 shadow-[0_10px_35px_-8px_rgba(15,23,42,0.06),0_0_20px_rgba(103,61,230,0.03)] hover:shadow-[0_16px_45px_-8px_rgba(103,61,230,0.14)] hover:border-purple-300/90 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top specularity border highlight */}
            <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/60 to-transparent pointer-events-none" />

            <div>
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEFF] border border-[#DDD0FE]/80 text-[#673DE6] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 shadow-xs">
                <div className="w-4 h-4 rounded-full bg-[#673DE6] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>HOSTINGER PARTNER</span>
              </div>

              {/* Main Content: Circular Badge + Text Details */}
              <div className="flex items-center gap-5 sm:gap-6">
                {/* Circular Badge Container */}
                <div className="w-26 h-26 sm:w-28 sm:h-28 md:w-30 md:h-30 rounded-full bg-white border-2 border-purple-100 ring-4 ring-purple-50 shadow-[0_6px_20px_rgba(103,61,230,0.08)] flex flex-col items-center justify-between shrink-0 pt-2.5 pb-0 text-center overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                  <HostingerHIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 mt-0.5" />
                  <span className="text-[10px] sm:text-[11px] md:text-[11.5px] font-black text-[#1F1646] tracking-wider leading-none">
                    HOSTINGER
                  </span>
                  <div className="w-full bg-[#673DE6] text-white text-[8px] sm:text-[8.5px] font-black tracking-widest uppercase py-1">
                    PARTNER
                  </div>
                </div>

                {/* Right Details */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-xl sm:text-2xl md:text-[23px] font-extrabold text-slate-900 tracking-tight leading-snug">
                    Hostinger Partner
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-slate-600 leading-relaxed mt-1.5">
                    Official partner with Hostinger powering fast, secure & reliable websites.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Status Tag */}
            <div className="flex items-center gap-2 mt-5 pt-3.5 border-t border-slate-100 text-xs sm:text-sm font-bold text-[#673DE6]">
              <div className="w-4.5 h-4.5 rounded-full bg-[#673DE6] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Official Partner</span>
            </div>
          </motion.div>
        </div>

        {/* ─── BOTTOM "KEEP SCROLLING" WITH DOWNWARD ARROW ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-8 sm:mt-10"
        >
          <button
            type="button"
            onClick={handleScrollNext}
            aria-label="Scroll to next section"
            className="flex flex-col items-center gap-1.5 group cursor-pointer text-slate-700 hover:text-[#0066FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl px-4 py-1"
          >
            <span className="font-caveat text-2xl sm:text-3xl md:text-[32px] font-bold tracking-wide select-none leading-none group-hover:scale-105 transition-transform duration-200">
              Keep Scrolling
            </span>
            <div className="text-slate-600 group-hover:text-[#0066FF] transition-all transform group-hover:translate-y-1">
              <ArrowDown className="w-4.5 h-4.5 stroke-[2.2] animate-bounce" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Partner;
