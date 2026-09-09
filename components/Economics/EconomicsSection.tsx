"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  PiHouseDuotone,
  PiBriefcaseDuotone,
  PiTrendUpDuotone,
  PiArrowRightBold,
  PiCheckBold,
} from "react-icons/pi";
import { Caveat } from "next/font/google";
import { CurvedUnderline } from "@/components/hero/HeroLogos";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

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
   ECONOMICS SECTION (1:1 HIGH-FIDELITY IMPLEMENTATION)
═══════════════════════════════════════════════════════════════════════ */
const EconomicsSection = () => {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-white via-[#FCFDFF] to-white py-14 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      aria-label="Economics: We Don’t Need Hundreds Of Leads For This To Work"
    >
      {/* ── Ambient Radial Blue Background Glows ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-1/4 right-1/10 w-[750px] h-[500px] bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/10 -translate-x-1/3 w-[800px] h-[500px] bg-[radial-gradient(circle,rgba(0,102,255,0.05)_0%,transparent_70%)] rounded-full blur-[80px]" />
      </div>

      {/* ── Full-Width Container (Matching project layout) ── */}
      <div className="relative w-full px-5 sm:px-8 md:px-12 lg:px-14 xl:px-18 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 items-center w-full">
          {/* ════════════════════════════════════════════════════
              LEFT COLUMN: TWO-LINE HEADLINE & VALUE PROPOSITION
          ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            {/* 1. Eyebrow Badge: ECONOMICS */}
            <Reveal delay={0} direction="none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4FF] border border-[#CCE0FF] shadow-xs mb-5 sm:mb-6">
                <PiTrendUpDuotone className="w-4 h-4 text-[#0066FF]" />
                <span className="text-[11.5px] sm:text-[12px] font-extrabold text-[#0066FF] tracking-wider uppercase">
                  ECONOMICS
                </span>
              </div>
            </Reveal>

            {/* 2. Main Headline: Exactly Two Lines on Desktop */}
            <Reveal delay={0.05} direction="up">
              <h2 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[40px] xl:text-[46px] 2xl:text-[50px] font-black tracking-[-0.035em] text-[#0A1128] leading-[1.08]">
                <span className="block lg:whitespace-nowrap">
                  We Don’t Need Hundreds
                </span>
                <span className="relative inline-block lg:whitespace-nowrap text-[#0066FF] mt-1 sm:mt-1.5">
                  Of Leads For This To Work.
                  <CurvedUnderline className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-[#0066FF]" />
                </span>
              </h2>
            </Reveal>

            {/* 3. Supporting Body Copy — scannable argument stack */}
            <Reveal delay={0.1} direction="up">
              <div className="mt-6 sm:mt-7 max-w-[540px]">
                <div className="relative overflow-hidden rounded-[22px] sm:rounded-[24px] bg-gradient-to-br from-[#F7FAFF]/90 via-white/80 to-[#EEF4FF]/70 border border-[#DCEAFB] shadow-[0_12px_32px_-16px_rgba(0,102,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-sm">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                  <div className="divide-y divide-[#E4EEF8]">
                    {/* Beat 1 — the setup */}
                    <div className="relative flex gap-3.5 sm:gap-4 px-4 sm:px-5 py-4 sm:py-[18px]">
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] border border-[#CCE0FF] text-[11px] font-black tracking-tight text-[#0066FF]"
                        aria-hidden
                      >
                        01
                      </span>
                      <p className="text-[15.5px] sm:text-[16.5px] leading-[1.45] text-slate-700">
                        For most contractors we work with, the math is actually{" "}
                        <span className="font-extrabold text-[#0A1128] tracking-tight">
                          pretty simple.
                        </span>
                      </p>
                    </div>

                    {/* Beat 2 — the numbers */}
                    <div className="relative flex gap-3.5 sm:gap-4 px-4 sm:px-5 py-4 sm:py-[18px] bg-white/45">
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] border border-[#CCE0FF] text-[11px] font-black tracking-tight text-[#0066FF]"
                        aria-hidden
                      >
                        02
                      </span>
                      <p className="text-[15.5px] sm:text-[16.5px] leading-[1.5] text-slate-700">
                        If your average project is worth{" "}
                        <span className="whitespace-nowrap font-black text-[#0066FF] tracking-tight">
                          $10,000
                        </span>
                        {", "}
                        <span className="whitespace-nowrap font-black text-[#0066FF] tracking-tight">
                          $20,000
                        </span>
                        {", "}
                        <span className="whitespace-nowrap font-black text-[#0066FF] tracking-tight">
                          $50,000
                        </span>{" "}
                        or more&hellip; you don’t need{" "}
                        <span className="whitespace-nowrap rounded-[5px] bg-[#EEF4FF] px-1.5 py-0.5 font-extrabold text-[#0A1128] tracking-tight">
                          100 new customers
                        </span>{" "}
                        every month.
                      </p>
                    </div>

                    {/* Beat 3 — the payoff */}
                    <div className="relative flex gap-3.5 sm:gap-4 px-4 sm:px-5 py-4 sm:py-[18px]">
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-[11px] font-black tracking-tight text-white shadow-[0_4px_10px_rgba(0,102,255,0.28)]"
                        aria-hidden
                      >
                        03
                      </span>
                      <p className="text-[15.5px] sm:text-[16.5px] leading-[1.5] text-slate-700">
                        Sometimes just{" "}
                        <span className="font-extrabold text-[#0A1128] tracking-tight">
                          a handful of additional projects
                        </span>{" "}
                        makes the entire campaign{" "}
                        <span className="font-black text-[#0066FF] tracking-tight">
                          profitable.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 sm:mt-6 font-semibold text-[15.5px] sm:text-[16.5px] text-[#0A1128] tracking-tight">
                  That’s what we care about.
                </p>
              </div>
            </Reveal>

            {/* 4. Two Blue Checkmark Points */}
            <Reveal delay={0.15} direction="up">
              <div className="mt-5 sm:mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#0066FF] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <PiCheckBold className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700">
                    Not getting you the cheapest lead on paper.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#0066FF] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <PiCheckBold className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700">
                    Getting you enough profitable work for Google Ads to make
                    business sense.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ════════════════════════════════════════════════════
              RIGHT COLUMN: 3D CARD PROGRESSION SYSTEM
          ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center w-full">
            <Reveal delay={0.15} direction="left" className="w-full">
              {/* Outer Translucent Frosted Backing Panel */}
              <div className="relative w-full rounded-[32px] sm:rounded-[38px] bg-gradient-to-br from-[#F4F8FD]/85 via-white/80 to-[#EEF5FF]/85 border border-[#DFEDFB] p-6 sm:p-7 md:p-8 lg:p-9 shadow-[0_20px_55px_-15px_rgba(0,102,255,0.07),inset_0_1px_2px_rgba(255,255,255,1)] backdrop-blur-md">
                {/* 3 Compact 3D Elevated Cards with Integrated Connecting Arrows */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2 md:gap-3 lg:gap-3.5 w-full">
                  {/* Card 1: Average Project ($10K+) */}
                  <div className="relative overflow-hidden w-full sm:w-[31%] rounded-[24px] sm:rounded-[26px] bg-gradient-to-b from-white via-[#FCFDFF] to-[#F6FAFF] border border-white/95 ring-1 ring-[#DCE7F7] shadow-[0_20px_35px_-10px_rgba(15,23,42,0.12),0_8px_18px_-4px_rgba(0,102,255,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,102,255,0.02)] p-5 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1.5 transition-all duration-300 ease-out group">
                    {/* Top specular reflection line */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                    {/* Raised 3D Icon Container */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#EFF6FF] via-[#E1EFFF] to-[#D4E7FE] border border-white ring-1 ring-[#0066FF]/20 shadow-[inset_0_2px_3px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,102,255,0.14),0_4px_12px_rgba(0,102,255,0.15)] flex items-center justify-center text-[#0066FF] group-hover:scale-105 transition-transform duration-300">
                      <PiHouseDuotone className="w-7 h-7 text-[#0066FF] drop-shadow-[0_2px_4px_rgba(0,102,255,0.25)]" />
                    </div>

                    {/* Compact Cohesive Text Group */}
                    <div className="flex flex-col items-center mt-3.5 sm:mt-4">
                      <span className="text-[12px] sm:text-[12.5px] md:text-[13px] font-medium text-slate-500 mb-1">
                        Average Project
                      </span>
                      <span className="text-[24px] sm:text-[26px] md:text-[28px] font-black text-slate-900 tracking-tight leading-none">
                        $10K+
                      </span>
                    </div>
                  </div>

                  {/* Integrated 3D Arrow 1 */}
                  <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-gradient-to-b from-white to-[#EFF5FF] border border-[#D5E6FC] shadow-[0_2px_8px_rgba(0,102,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] text-[#0066FF]">
                    <PiArrowRightBold className="w-4 h-4 rotate-90 sm:rotate-0 drop-shadow-[0_1px_2px_rgba(0,102,255,0.25)]" />
                  </div>

                  {/* Card 2: Just a Handful of Projects */}
                  <div className="relative overflow-hidden w-full sm:w-[31%] rounded-[24px] sm:rounded-[26px] bg-gradient-to-b from-white via-[#FCFDFF] to-[#F6FAFF] border border-white/95 ring-1 ring-[#DCE7F7] shadow-[0_20px_35px_-10px_rgba(15,23,42,0.12),0_8px_18px_-4px_rgba(0,102,255,0.06),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,102,255,0.02)] p-5 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1.5 transition-all duration-300 ease-out group">
                    {/* Top specular reflection line */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                    {/* Raised 3D Icon Container */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#EFF6FF] via-[#E1EFFF] to-[#D4E7FE] border border-white ring-1 ring-[#0066FF]/20 shadow-[inset_0_2px_3px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,102,255,0.14),0_4px_12px_rgba(0,102,255,0.15)] flex items-center justify-center text-[#0066FF] group-hover:scale-105 transition-transform duration-300">
                      <PiBriefcaseDuotone className="w-7 h-7 text-[#0066FF] drop-shadow-[0_2px_4px_rgba(0,102,255,0.25)]" />
                    </div>

                    {/* Compact Cohesive Text Group */}
                    <div className="flex flex-col items-center mt-3.5 sm:mt-4">
                      <span className="text-[12px] sm:text-[12.5px] md:text-[13px] font-medium text-slate-500 mb-1">
                        Just a Handful of
                      </span>
                      <span className="text-[20px] sm:text-[22px] md:text-[24px] font-black text-slate-900 tracking-tight leading-none">
                        Projects
                      </span>
                    </div>
                  </div>

                  {/* Integrated 3D Arrow 2 */}
                  <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-gradient-to-b from-white to-[#EFF5FF] border border-[#D5E6FC] shadow-[0_2px_8px_rgba(0,102,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] text-[#0066FF]">
                    <PiArrowRightBold className="w-4 h-4 rotate-90 sm:rotate-0 drop-shadow-[0_1px_2px_rgba(0,102,255,0.25)]" />
                  </div>

                  {/* Card 3: Campaign Becomes Profitable (Hero 3D Elevated Card) */}
                  <div className="relative w-full sm:w-[31%] group">
                    {/* Ambient Radial Blue Glow behind Card 3 */}
                    <div className="absolute -inset-2 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.25)_0%,rgba(0,102,255,0.06)_65%,transparent_80%)] rounded-[32px] blur-xl -z-10 pointer-events-none" />

                    {/* Top-Right Celebration Sparkles */}
                    <div className="absolute -top-3.5 -right-3.5 w-7 h-7 text-[#0066FF] pointer-events-none z-20">
                      <svg
                        viewBox="0 0 28 28"
                        fill="none"
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M 5 9 L 1 3"
                          stroke="#0066FF"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 14 7 L 14 1"
                          stroke="#0066FF"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 21 11 L 27 7"
                          stroke="#0066FF"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div className="relative overflow-hidden w-full rounded-[24px] sm:rounded-[26px] bg-gradient-to-b from-[#F3F8FF] via-white to-[#EAF3FF] border-2 border-[#0066FF] ring-4 ring-[#0066FF]/15 shadow-[0_22px_45px_-8px_rgba(0,102,255,0.28),0_8px_20px_rgba(0,102,255,0.12),inset_0_2px_1.5px_rgba(255,255,255,1),inset_0_-2px_6px_rgba(0,102,255,0.06)] p-5 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center hover:-translate-y-2 hover:shadow-[0_28px_55px_-8px_rgba(0,102,255,0.36)] transition-all duration-300 ease-out">
                      {/* Top specular reflection line */}
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                      {/* Raised 3D Icon Container */}
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#EFF6FF] via-[#E1EFFF] to-[#D4E7FE] border border-white ring-1 ring-[#0066FF]/25 shadow-[inset_0_2px_3px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,102,255,0.15),0_4px_14px_rgba(0,102,255,0.22)] flex items-center justify-center text-[#0066FF] group-hover:scale-105 transition-transform duration-300">
                        <PiTrendUpDuotone className="w-7 h-7 text-[#0066FF] drop-shadow-[0_2px_4px_rgba(0,102,255,0.3)]" />
                      </div>

                      {/* Compact Cohesive Text Group */}
                      <div className="flex flex-col items-center mt-3.5 sm:mt-4">
                        <span className="text-[12px] sm:text-[12.5px] md:text-[13px] font-medium text-slate-600 mb-1">
                          Campaign Becomes
                        </span>
                        <span className="text-[20px] sm:text-[22px] md:text-[24px] font-black text-slate-900 tracking-tight leading-none">
                          Profitable
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom-Right Handwritten Callout with Project CurvedUnderline */}
                <div className="flex flex-col items-end mt-6 sm:mt-8 mr-1 sm:mr-3">
                  <span
                    className={`${caveat.className} text-[23px] sm:text-[26px] md:text-[28px] text-[#0066FF] font-bold tracking-wide -rotate-1 select-none`}
                  >
                    Less leads. More profitable work.
                  </span>
                  {/* Reused project CurvedUnderline */}
                  <div className="w-44 sm:w-56 -mt-1.5 mr-1">
                    <CurvedUnderline className="w-full h-3 sm:h-3.5 text-[#0066FF]" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomicsSection;
