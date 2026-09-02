"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import {
  Search,
  DollarSign,
  Users,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ------------------------------------------------------------------ */
/*  Scroll-reveal animation wrapper                                    */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const initial =
    direction === "up"
      ? { opacity: 0, y: 24 }
      : direction === "left"
        ? { opacity: 0, x: -24 }
        : direction === "right"
          ? { opacity: 0, x: 24 }
          : { opacity: 0 };
  const animateState = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animateState}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPRESSIVE HAND-DRAWN SVG DECORATIVE ELEMENTS                      */
/* ------------------------------------------------------------------ */

/* Top-left corner scribble marks (diagonal lines) */
function CornerScribble() {
  return (
    <svg
      width="42"
      height="48"
      viewBox="0 0 42 48"
      fill="none"
      className="w-8 h-10 sm:w-9 sm:h-11 lg:w-10 lg:h-12"
    >
      <path
        d="M 6 44 L 14 4"
        stroke="#0062FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 13 44 L 21 8"
        stroke="#0062FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 20 42 L 26 12"
        stroke="#0062FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 27 40 L 32 18"
        stroke="#0062FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

/* Hand-drawn underline for "Searching Google" */
function SearchingGoogleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 18"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M 4 10 C 60 3, 140 4, 220 7 C 270 9, 310 9, 336 6.5"
        stroke="#0062FF"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Hand-drawn oval/circle around "choosing somebody." */
function ChoosingSomebodyOval({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 50"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M 22 40 C 4 28, 6 10, 48 6 C 92 2, 170 1, 215 6 C 238 9, 238 28, 220 38 C 195 48, 95 49, 45 44 C 18 41, 10 34, 22 40"
        stroke="#0062FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

/* Hand-drawn underline for "The only question is:" */
function TheOnlyQuestionUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 10"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M 3 6 C 40 3, 95 4, 140 5.5 C 168 6.5, 188 5, 197 6"
        stroke="#0062FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Arrow pointing to "How much of that demand are you capturing?" */
function CalloutArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 36" fill="none" className={className}>
      <path
        d="M 4 18 C 18 15, 34 17, 48 18"
        stroke="#0062FF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M 36 8 L 52 18 L 36 28"
        stroke="#0062FF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* Underline for "you capturing" */
function YouCapturingUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M 3 8 C 45 3, 110 4, 160 7 C 185 8.5, 205 9, 216 7"
        stroke="#0062FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Underline for "competitors?" */
function CompetitorsUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 10"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M 2 6 C 30 3, 70 3, 100 5 C 115 6, 124 5, 128 6"
        stroke="#0062FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Curved arrow pointing from "Real Demand..." to cards */
function RealDemandArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" fill="none" className={className}>
      <path
        d="M 6 42 C 8 20, 20 8, 48 6"
        stroke="#0062FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 34 6 L 50 6 L 50 22"
        stroke="#0062FF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* Horizontal Hand-drawn Curly Bracket underneath the 5 Cards */
function CardsBottomBracket({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 30"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      {/* Left arm */}
      <path
        d="M 8 6 C 100 8, 200 12, 280 18 C 290 19, 296 24, 300 28"
        stroke="#0062FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Right arm */}
      <path
        d="M 592 6 C 500 8, 400 12, 320 18 C 310 19, 304 24, 300 28"
        stroke="#0062FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

/* Arrow pointing into the CTA Box from the left */
function CtaBoxArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 44" fill="none" className={className}>
      <path
        d="M 4 36 C 10 16, 24 6, 52 8"
        stroke="#0062FF"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 40 4 L 56 8 L 46 20"
        stroke="#0062FF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* Action bursts over the CTA button */
function ButtonBursts({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M 8 28 L 2 34"
        stroke="#0062FF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 18 16 L 16 6"
        stroke="#0062FF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 28 22 L 36 18"
        stroke="#0062FF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Underline under "whether it makes sense." */
function CtaHeadingUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 14"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M 4 8 C 60 3, 140 4, 210 7 C 240 8.5, 265 8, 276 6.5"
        stroke="#0062FF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Underline under "No guesswork. Just the numbers that matter." */
function NoGuessworkUnderlineWithArrow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 280 30" fill="none" className={className}>
      {/* Underline */}
      <path
        d="M 4 12 C 45 6, 110 7, 180 12 C 210 14, 235 12, 245 10"
        stroke="#0062FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Upward curved arrow */}
      <path
        d="M 248 10 C 260 8, 270 4, 274 -10"
        stroke="#0062FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 264 -4 L 274 -10 L 278 -0"
        stroke="#0062FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric Cards Data                                                  */
/* ------------------------------------------------------------------ */
const metrics = [
  {
    icon: Search,
    label: "Search Volume",
    value: "1,284",
    change: "↑ 32%",
    isBlueVal: false,
  },
  {
    icon: DollarSign,
    label: "Click Costs",
    value: "$4.55",
    change: "↑ 28%",
    isBlueVal: false,
  },
  {
    icon: Users,
    label: "Competition",
    value: "Medium",
    change: "6.7x ROAS",
    isBlueVal: true,
  },
  {
    icon: Target,
    label: "Lead Economics",
    value: "$75.27",
    change: "↑ 16%",
    isBlueVal: false,
  },
  {
    icon: BarChart3,
    label: "Potential Opportunity",
    value: "$200K+",
    change: "Monthly",
    isBlueVal: false,
  },
];

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export default function FinalCTA() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#F2F6FE] via-[#EBF2FC] to-[#F4F8FE] py-10 sm:py-16 lg:py-12 xl:py-12 overflow-hidden">
      {/* ── Background subtle dot grid & ambient blue glows ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #B8CEF5 1.1px, transparent 1.1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 30% 25%, black 0%, transparent 80%)",
          opacity: 0.55,
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-blue-400/12 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full bg-blue-300/15 blur-[130px]" />

      {/* Expanded Max-Width Container for generous spacing matching reference */}
      <div className="relative mx-auto max-w-[1360px] xl:max-w-[1420px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ════════════════════════════════════════════════════════════
            MAIN TWO-COLUMN GRID
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.14fr] xl:grid-cols-[1fr_1.18fr] gap-10 sm:gap-12 lg:gap-12 xl:gap-16 items-start">
          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN — HEADLINE + PROOF & COPY
          ══════════════════════════════════════════════════════════ */}
          <div className="flex flex-col">
            {/* ── Top-Left Corner Scribble ── */}
            <Reveal delay={0.05} direction="left" className="mb-1 -ml-1">
              <CornerScribble />
            </Reveal>

            {/* ── Main Headline (Exact Line Breaks) ── */}
            <Reveal delay={0.08} direction="left">
              <h2 className="text-[32px] sm:text-[42px] md:text-[46px] lg:text-[44px] xl:text-[50px] font-black tracking-tight text-[#0B1220] leading-[1.08]">
                {/* Line 1: Homeowners in your city stays strictly on one line */}
                <span className="whitespace-nowrap">
                  Homeowners In Your City
                </span>
                <br />
                {/* Line 2: Are Searching Google with blue text and blue underline */}
                Are{" "}
                <span className="relative inline-block text-[#0062FF]">
                  Searching Google
                  <SearchingGoogleUnderline className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-[12px] sm:h-[15px] pointer-events-none" />
                </span>
                <br />
                {/* Line 3 */}
                For The Work You Do.
              </h2>
            </Reveal>

            {/* ── "Right now they're choosing somebody." ── */}
            <Reveal delay={0.13} direction="left" className="mt-5 sm:mt-6">
              <p className="text-[15.5px] sm:text-[17px] text-slate-800 font-medium leading-relaxed">
                Right now they&rsquo;re{" "}
                <span className="relative inline-block px-1">
                  <ChoosingSomebodyOval className="absolute -inset-x-2 -inset-y-1.5 w-[calc(100%+16px)] h-[calc(100%+12px)] pointer-events-none" />
                  <span className="relative z-10 font-bold text-[#0B1220]">
                    choosing somebody.
                  </span>
                </span>
              </p>
            </Reveal>

            {/* ── "The only question is:" ── */}
            <Reveal delay={0.16} direction="left" className="mt-4 sm:mt-5">
              <div className="relative inline-block">
                <p className="text-[15.5px] sm:text-[17px] text-slate-800 font-medium">
                  The only question is:
                </p>
                <TheOnlyQuestionUnderline className="absolute -bottom-1.5 left-0 w-full h-[8px] pointer-events-none" />
              </div>
            </Reveal>

            {/* ── Callout Box with Soft Blue Brush Background + Arrow ── */}
            <Reveal
              delay={0.2}
              direction="left"
              className="mt-6 sm:mt-7 relative"
            >
              <div className="flex items-start gap-2.5 sm:gap-3.5">
                {/* Arrow */}
                <CalloutArrow className="w-10 h-7 sm:w-12 sm:h-8 mt-1.5 shrink-0 text-[#0062FF]" />

                <div className="relative">
                  {/* Soft Blue Organic Brush / Highlight Background Pill */}
                  <div className="absolute -inset-x-4 -inset-y-3 sm:-inset-x-6 sm:-inset-y-4 rounded-2xl sm:rounded-3xl bg-blue-100/50 -z-0 blur-xs" />

                  {/* Heading inside brush */}
                  <h3 className="relative z-10 text-[23px] sm:text-[27px] lg:text-[28px] xl:text-[32px] font-black tracking-tight text-[#0B1220] leading-[1.15]">
                    How much of that demand
                    <br />
                    are{" "}
                    <span className="relative inline-block text-[#0062FF]">
                      you capturing?
                      <YouCapturingUnderline className="absolute -bottom-1 left-0 w-full h-[10px] pointer-events-none" />
                    </span>
                  </h3>

                  {/* Handwritten: "And how much is going to competitors?" */}
                  <div className="relative mt-2 sm:mt-2.5">
                    <p
                      className={`${caveat.className} text-[21px] sm:text-[24px] lg:text-[26px] text-[#0062FF] font-medium leading-tight`}
                    >
                      And how much is going
                      <br />
                      <span className="ml-4 sm:ml-6 relative inline-block">
                        to competitors?
                        <CompetitorsUnderline className="absolute -bottom-1 left-0 w-full h-[8px] pointer-events-none" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── "Let us look at your market and show you the numbers." ── */}
            <Reveal delay={0.25} direction="left" className="mt-7 sm:mt-8">
              <p className="text-[15px] sm:text-[16.5px] text-slate-700 font-medium leading-relaxed">
                Let us look at{" "}
                <span className="font-extrabold text-[#0B1220] underline decoration-[#0B1220] decoration-1 underline-offset-2">
                  your market
                </span>{" "}
                and show you the numbers.
              </p>
            </Reveal>

            {/* ── 2-Column Checklist ── */}
            <Reveal delay={0.28} direction="left" className="mt-4 sm:mt-5">
              <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-3">
                {/* Column 1 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0062FF] shrink-0 stroke-[2.5]" />
                    <span className="text-[14px] sm:text-[15px] text-slate-800">
                      Search{" "}
                      <span className="underline decoration-slate-400 decoration-1 underline-offset-2 font-medium">
                        volume.
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0062FF] shrink-0 stroke-[2.5]" />
                    <span className="text-[14px] sm:text-[15px] text-slate-800">
                      Click{" "}
                      <span className="underline decoration-slate-400 decoration-1 underline-offset-2 font-medium">
                        costs.
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0062FF] shrink-0 stroke-[2.5]" />
                    <span className="text-[14px] sm:text-[15px] text-slate-800 font-medium">
                      Competition.
                    </span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0062FF] shrink-0 stroke-[2.5]" />
                    <span className="text-[14px] sm:text-[15px] text-slate-800">
                      Lead{" "}
                      <span className="underline decoration-slate-400 decoration-1 underline-offset-2 font-medium">
                        economics.
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0062FF] shrink-0 stroke-[2.5]" />
                    <span className="text-[14px] sm:text-[15px] text-slate-800">
                      Potential{" "}
                      <span className="underline decoration-slate-400 decoration-1 underline-offset-2 font-medium">
                        opportunity.
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Handwritten note at bottom-left ── */}
            <Reveal
              delay={0.32}
              direction="left"
              className="mt-7 sm:mt-8 relative"
            >
              <div className="relative inline-block">
                <p
                  className={`${caveat.className} text-[20px] sm:text-[23px] text-[#0062FF] font-semibold leading-snug`}
                >
                  No guesswork.
                  <br />
                  Just the numbers that matter.
                </p>
                <NoGuessworkUnderlineWithArrow className="w-64 h-7 -mt-1 text-[#0062FF] pointer-events-none" />
              </div>
            </Reveal>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN — 5 SPACIOUS METRIC CARDS + FINAL CTA BOX
          ══════════════════════════════════════════════════════════ */}
          <div className="flex flex-col">
            {/* ── Handwritten annotation above cards: "Real Demand. Real Numbers. Real Opportunity." ── */}
            <Reveal
              delay={0.1}
              direction="right"
              className="flex items-start gap-2.5 mb-3 sm:mb-4 justify-start sm:ml-4"
            >
              <RealDemandArrow className="w-10 h-9 sm:w-11 sm:h-10 mt-1 shrink-0 text-[#0062FF]" />
              <p
                className={`${caveat.className} text-[20px] sm:text-[23px] lg:text-[25px] text-[#0062FF] font-semibold leading-[1.3]`}
              >
                Real Demand.
                <br />
                Real Numbers.
                <br />
                <span className="relative inline-block">
                  Real Opportunity.
                  <svg
                    viewBox="0 0 160 10"
                    fill="none"
                    className="absolute -bottom-1 left-0 w-full h-[8px] pointer-events-none"
                  >
                    <path
                      d="M 2 6 C 30 3, 90 3, 140 5 C 152 5.5, 158 5, 160 6"
                      stroke="#0062FF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </p>
            </Reveal>

            {/* ── Five Metric Cards (Spacious, Balanced, Sized with Breathing Room) ── */}
            <Reveal delay={0.15} direction="right" className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-3.5 w-full">
                {metrics.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={i}
                      className="group relative rounded-[20px] sm:rounded-[22px] bg-white border border-slate-200/90 py-5 px-3 sm:py-6 sm:px-3.5 flex flex-col items-center text-center shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_10px_30px_-8px_rgba(0,102,255,0.08),0_2px_6px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_-8px_rgba(0,102,255,0.16)] hover:border-blue-300/90 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      {/* Top specularity highlight */}
                      <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent pointer-events-none" />

                      {/* Top Circular 3D Icon Dish */}
                      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-blue-50/90 border border-blue-100 flex items-center justify-center mb-3.5 shadow-[0_4px_12px_-2px_rgba(0,102,255,0.14)] group-hover:bg-blue-100/90 group-hover:scale-105 transition-all">
                        <Icon className="w-6 h-6 text-[#0062FF] stroke-[2.2]" />
                      </div>

                      {/* Metric Label */}
                      <p className="text-[11px] sm:text-[11.5px] font-bold text-slate-500 uppercase tracking-wider leading-tight min-h-[26px] flex items-center justify-center mb-2">
                        {m.label}
                      </p>

                      {/* Big Metric Value */}
                      <p
                        className={`text-[23px] sm:text-[25px] lg:text-[27px] font-black tracking-tight leading-none mb-2 ${
                          m.isBlueVal ? "text-[#0062FF]" : "text-[#0B1220]"
                        }`}
                      >
                        {m.value}
                      </p>

                      {/* Sub-label / change indicator */}
                      <p className="text-[12px] sm:text-[13px] font-bold text-blue-600">
                        {m.change}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Horizontal hand-drawn curly bracket below cards */}
              <div className="hidden md:block w-full px-4 -mt-0.5">
                <CardsBottomBracket className="w-full h-6 text-[#0062FF]" />
              </div>
            </Reveal>

            {/* ── Main Prominent CTA Box (Bordered, Dominant, Conversion Focused) ── */}
            <Reveal
              delay={0.22}
              direction="right"
              className="mt-4 sm:mt-6 relative"
            >
              {/* Arrow pointing into left edge of CTA box on desktop */}
              <div className="absolute -left-8 lg:-left-10 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none z-10">
                <CtaBoxArrow className="w-10 h-7 lg:w-12 lg:h-8 text-[#0062FF]" />
              </div>

              {/* Box Card */}
              <div className="relative rounded-[24px] sm:rounded-[28px] bg-white border-2 border-[#0062FF] p-6 sm:p-8 lg:p-9 text-center shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_16px_45px_-10px_rgba(0,102,255,0.14),0_4px_16px_rgba(15,23,42,0.04)] overflow-visible">
                {/* Top specularity */}
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/60 to-transparent pointer-events-none" />

                {/* Headline inside box */}
                <h3 className="text-[25px] sm:text-[30px] lg:text-[33px] font-black tracking-tight text-[#0B1220] leading-[1.15] mb-5 sm:mb-6">
                  Then you decide
                  <br />
                  <span className="relative inline-block text-[#0062FF]">
                    whether it makes sense.
                    <CtaHeadingUnderline className="absolute -bottom-1.5 left-0 w-full h-[10px] pointer-events-none" />
                  </span>
                </h3>

                {/* Primary Pill Button with Action Bursts */}
                <div className="relative inline-block">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="cursor-pointer relative overflow-hidden group inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-4 sm:py-4.5 rounded-full font-black text-white text-[15.5px] sm:text-[17px] tracking-wider uppercase transition-all bg-gradient-to-r from-[#0062FF] to-[#0052EA] shadow-[0_8px_25px_rgba(0,98,255,0.42)] hover:shadow-[0_12px_35px_rgba(0,98,255,0.55)]"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0052EA] to-[#0042D0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2.5">
                        SHOW ME MY MARKET
                        <ArrowRight className="w-5 h-5 stroke-[2.8] group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </motion.button>
                  </Link>

                  {/* Radiating burst lines at top right of button */}
                  <div className="absolute -top-3 -right-6 hidden sm:block pointer-events-none select-none">
                    <ButtonBursts className="w-7 h-7 text-[#0062FF]" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Bottom Tagline (Handwritten script) ── */}
            <Reveal
              delay={0.28}
              direction="right"
              className="mt-5 sm:mt-6 text-center"
            >
              <p
                className={`${caveat.className} text-[19px] sm:text-[22px] lg:text-[24px] text-slate-700 font-medium leading-relaxed`}
              >
                Google Ads for contractors who care about{" "}
                <span className="relative inline-block font-bold text-[#0B1220] underline decoration-[#0062FF] decoration-2 underline-offset-4">
                  jobs, revenue and profit
                </span>
                {" – "}
                <span className="relative inline-block font-bold text-[#0B1220] line-through decoration-slate-900 decoration-2">
                  not
                </span>{" "}
                marketing reports.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
