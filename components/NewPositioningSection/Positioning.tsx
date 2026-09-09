"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Target, Search, Check } from "lucide-react";
import { CurvedUnderline } from "@/components/hero/HeroLogos";
import RightSideVisual from "@/public/positioning/RightSideImage.png";

/* ─── Scroll Reveal Wrapper ───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const initial =
    direction === "up"
      ? { opacity: 0, y: 22 }
      : direction === "down"
        ? { opacity: 0, y: -18 }
        : direction === "left"
          ? { opacity: 0, x: -22 }
          : direction === "right"
            ? { opacity: 0, x: 22 }
            : { opacity: 0 };
  const animate = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   NEW POSITIONING SECTION (1:1 FIDELITY RECREATION)
═══════════════════════════════════════════════════════════════════════ */
const Positioning = () => {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-[#FAFDFE] via-white to-[#FAFDFE] py-16 sm:py-20 lg:py-24 xl:py-12 overflow-hidden"
      aria-label="Positioning: We’re Not A Lead Company"
    >
      {/* ── Ambient Radial Blue Background Glows ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-1/4 left-1/10 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/10 translate-x-1/3 w-[900px] h-[550px] bg-[radial-gradient(circle,rgba(0,102,255,0.05)_0%,transparent_70%)] rounded-full blur-[80px]" />
      </div>

      {/* ── Full-Width Container (NO narrow max-width constraint) ── */}
      <div className="relative w-full px-5 sm:px-8 md:px-12 lg:px-14 xl:px-18 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 items-center w-full">
          {/* ════════════════════════════════════════════════════
              LEFT COLUMN: CODE-CRAFTED NARRATIVE & POSITIONING
          ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 flex flex-col justify-center">
            {/* 1. Eyebrow Badge: Our Approach */}
            <Reveal delay={0} direction="none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#CCE0FF] shadow-xs mb-5 sm:mb-6">
                <Target className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="text-[12.5px] sm:text-[13px] font-bold text-[#0066FF] tracking-wide">
                  Our Approach
                </span>
              </div>
            </Reveal>

            {/* 2. Main Headline with Handwritten Underline (Dominant Scale) */}
            <Reveal delay={0.05} direction="up">
              <h2 className="text-[38px] sm:text-[48px] md:text-[54px] lg:text-[52px] xl:text-[62px] 2xl:text-[68px] font-black tracking-[-0.035em] text-[#0A1128] leading-[1.05] sm:leading-[1.03]">
                We’re Not A<br />
                <span className="relative inline-block text-[#0066FF]">
                  Lead Company.
                  <CurvedUnderline className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3.5 sm:h-5 text-[#0066FF]" />
                </span>
              </h2>
            </Reveal>

            {/* 3. "This matters." Subtitle & Copy */}
            <Reveal delay={0.1} direction="up">
              <div className="mt-5 sm:mt-6">
                <p className="text-[16.5px] sm:text-[18px] font-bold text-slate-900 tracking-tight">
                  This matters.
                </p>
                <p className="text-[14.5px] sm:text-[15.5px] xl:text-[16px] text-slate-500 font-normal leading-relaxed mt-1 max-w-[480px]">
                  We don’t collect a bunch of homeowner information and sell the
                  same lead to multiple contractors.
                </p>
              </div>
            </Reveal>

            {/* 4. "When someone searches:" Frosted Glass Search Card */}
            <Reveal delay={0.15} direction="up">
              <div className="mt-5 sm:mt-6 rounded-2xl bg-gradient-to-b from-[#F0F6FF]/95 via-[#F7FAFF]/85 to-[#EEF5FF]/95 border border-[#CEE0FD] p-4.5 sm:p-5 shadow-[0_6px_24px_-6px_rgba(0,102,255,0.08),0_1px_3px_rgba(0,0,0,0.02)] max-w-[540px]">
                {/* Search Card Header */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-5 h-5 rounded-md bg-[#0066FF]/10 flex items-center justify-center">
                    <Search className="w-3.5 h-3.5 text-[#0066FF]" />
                  </div>
                  <span className="text-[13.5px] sm:text-[14px] font-bold text-slate-800 tracking-tight">
                    When someone searches:
                  </span>
                </div>

                {/* 3 Horizontal Search Chip Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="group/card flex items-center gap-2 px-3 py-2.5 sm:py-3 rounded-xl bg-white border border-[#D5E4FA] shadow-[0_2px_8px_-2px_rgba(0,102,255,0.06)] hover:border-[#0066FF]/40 hover:shadow-[0_4px_14px_-2px_rgba(0,102,255,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                    <Search className="w-3.5 h-3.5 text-[#0066FF] shrink-0 opacity-85 group-hover/card:scale-110 transition-transform duration-200" />
                    <span className="text-[11px] sm:text-[11.5px] font-semibold text-slate-700 leading-snug group-hover/card:text-slate-900 transition-colors">
                      &ldquo;roof replacement near me&rdquo;
                    </span>
                  </div>

                  <div className="group/card flex items-center gap-2 px-3 py-2.5 sm:py-3 rounded-xl bg-white border border-[#D5E4FA] shadow-[0_2px_8px_-2px_rgba(0,102,255,0.06)] hover:border-[#0066FF]/40 hover:shadow-[0_4px_14px_-2px_rgba(0,102,255,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                    <Search className="w-3.5 h-3.5 text-[#0066FF] shrink-0 opacity-85 group-hover/card:scale-110 transition-transform duration-200" />
                    <span className="text-[11px] sm:text-[11.5px] font-semibold text-slate-700 leading-snug group-hover/card:text-slate-900 transition-colors">
                      &ldquo;paver patio contractor&rdquo;
                    </span>
                  </div>

                  <div className="group/card flex items-center gap-2 px-3 py-2.5 sm:py-3 rounded-xl bg-white border border-[#D5E4FA] shadow-[0_2px_8px_-2px_rgba(0,102,255,0.06)] hover:border-[#0066FF]/40 hover:shadow-[0_4px_14px_-2px_rgba(0,102,255,0.12)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                    <Search className="w-3.5 h-3.5 text-[#0066FF] shrink-0 opacity-85 group-hover/card:scale-110 transition-transform duration-200" />
                    <span className="text-[11px] sm:text-[11.5px] font-semibold text-slate-700 leading-snug group-hover/card:text-slate-900 transition-colors">
                      &ldquo;kitchen remodeling company near me&rdquo;
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 5. Lead Flow Statement */}
            <Reveal delay={0.2} direction="up">
              <p className="mt-5 sm:mt-6 text-[16px] sm:text-[17.5px] font-bold text-slate-900 leading-snug">
                we position{" "}
                <span className="text-[#0066FF] font-extrabold">
                  your company in
                </span>{" "}
                front of them.
              </p>
            </Reveal>

            {/* 6. 4 Blue Checkmark Items (Enlarged & Polished) */}
            <Reveal delay={0.25} direction="up">
              <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-3.5">
                {[
                  "They click your ad.",
                  "They land on your page.",
                  "They call you.",
                  "They submit a request to you.",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 group/item">
                    <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-gradient-to-b from-[#1A75FF] to-[#005CE6] flex items-center justify-center text-white shrink-0 shadow-[0_2px_8px_rgba(0,102,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.35)] group-hover/item:scale-105 transition-transform duration-200">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.2]" />
                    </div>
                    <span className="text-[15px] sm:text-[16.5px] font-bold text-slate-800 tracking-[-0.01em]">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* 7. Bottom Narrative Callout & Accent Underline */}
            <Reveal delay={0.3} direction="up">
              <div className="mt-6 sm:mt-7">
                <p className="text-[16px] sm:text-[17.5px] font-bold text-slate-900 leading-snug">
                  You’re building demand around your own brand.
                </p>
                <p className="text-[13.5px] sm:text-[14.5px] text-slate-500 font-normal leading-relaxed mt-1 max-w-[460px]">
                  And if you ever stop working with us, you’re not starting from
                  zero with another rented lead source.
                </p>
                {/* Handwritten Underline Accent */}
                <div className="mt-2.5 w-28 sm:w-36">
                  <CurvedUnderline className="w-full h-3 text-[#0066FF]" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* ════════════════════════════════════════════════════
              RIGHT COLUMN: NATIVE RIGHT-SIDE IMAGE VISUAL
          ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 flex items-center justify-center w-full relative">
            {/* Ambient Backlight Glows behind the image */}
            <div
              className="pointer-events-none absolute -inset-4 sm:-inset-8 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.11)_0%,rgba(0,102,255,0.03)_55%,transparent_75%)] rounded-3xl blur-2xl -z-10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -top-8 -right-8 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl -z-10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-8 w-80 h-80 bg-[#0066FF]/10 rounded-full blur-3xl -z-10"
              aria-hidden
            />

            <Reveal delay={0.15} direction="left" className="w-full">
              <div className="relative w-full rounded-2xl sm:rounded-3xl p-1 sm:p-2 transition-all duration-500 ease-out hover:scale-[1.012]">
                <Image
                  src={RightSideVisual}
                  alt="Google Ads journey vs rented leads breakdown"
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_24px_50px_rgba(0,102,255,0.09)] drop-shadow-[0_4px_16px_rgba(10,17,40,0.04)]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Positioning;
