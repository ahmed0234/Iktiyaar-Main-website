"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { Caveat } from "next/font/google";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { DotGrid } from "@/components/hero/Hero3DVisuals";

const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600", "700"] });

/* ─── Scroll Reveal ───────────────────────────────────────────────── */
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
      ? { opacity: 0, y: 24 }
      : direction === "down"
        ? { opacity: 0, y: -20 }
        : direction === "left"
          ? { opacity: 0, x: -24 }
          : direction === "right"
            ? { opacity: 0, x: 24 }
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

/* ─── Handwritten SVG Decorations ─────────────────────────────────── */

/** "Let's Talk About" pill bubble with hand-drawn loop and arrow pointing down-right */
function LetsTalkGroup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
      {/* Hand-drawn sketchy pill capsule */}
      <div className="relative px-4 sm:px-5 py-1 sm:py-1.5 -rotate-2">
        <svg
          viewBox="0 0 170 54"
          fill="none"
          className="absolute inset-0 h-full w-full pointer-events-none overflow-visible"
          aria-hidden
        >
          <path
            d="M 28 8 C 70 4, 130 5, 150 14 C 168 22, 165 38, 145 44 C 110 50, 45 49, 20 44 C 4 39, 4 18, 28 8 Z"
            stroke="#0066FF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={`${caveat.className} text-[20px] sm:text-[23px] lg:text-[25px] font-bold text-[#0066FF] tracking-wide`}
        >
          Let&apos;s Talk About
        </span>
      </div>

      {/* Down-right pointing arrow towards the headline */}
      <svg
        viewBox="0 0 50 42"
        fill="none"
        className="w-8 h-7 sm:w-10 sm:h-8 -ml-1 mt-1 pointer-events-none overflow-visible"
        aria-hidden
      >
        <path
          d="M 5 10 C 18 8, 30 14, 38 28"
          stroke="#0066FF"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M 26 28 L 39 29 L 39 17"
          stroke="#0066FF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** "Real answers. Not guesswork." annotation top-right with arrow curving down-left */
function RealAnswersGroup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-end select-none pointer-events-none ${className}`}
    >
      <span
        className={`${caveat.className} text-[20px] sm:text-[23px] xl:text-[25px] font-bold text-[#0066FF] -rotate-3 leading-[1.1] text-right`}
      >
        Real answers.
        <br />
        Not guesswork.
      </span>
      {/* Down-left curved arrow */}
      <svg
        viewBox="0 0 65 60"
        fill="none"
        className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-5 -mt-1 overflow-visible"
        aria-hidden
      >
        <path
          d="M 50 6 C 46 24, 36 42, 16 50"
          stroke="#0066FF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 14 36 L 15 51 L 28 50"
          stroke="#0066FF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Energetic hand-drawn blue underline for "Your Business?" */
function HeadingUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 26"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      <path
        d="M 3 15 C 100 6, 255 20, 452 11"
        stroke="#0066FF"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M 32 18 C 145 12, 290 22, 425 14"
        stroke="#0066FF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
    </svg>
  );
}

/** Handwritten "No B.S." annotation with arrow curving towards the shield */
function NoBSAnnotation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center select-none pointer-events-none ${className}`}
    >
      <span
        className={`${caveat.className} text-[22px] sm:text-[25px] font-bold text-[#0066FF] -rotate-12 block leading-none`}
      >
        No B.S.
      </span>
      {/* Curved arrow pointing down-right towards the shield */}
      <svg
        viewBox="0 0 50 36"
        fill="none"
        className="w-9 h-7 sm:w-10 sm:h-8 ml-3 mt-0.5 overflow-visible"
        aria-hidden
      >
        <path
          d="M 10 4 C 12 18, 22 26, 40 28"
          stroke="#0066FF"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M 28 22 L 41 28 L 34 36"
          stroke="#0066FF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Sweeping hand-drawn blue underline for "the numbers and the plan." */
function PlanUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 20"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      <path
        d="M 4 12 C 140 4, 350 16, 514 8"
        stroke="#0066FF"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Left radial energy rays for the CTA button */
function ButtonRaysLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 45 42"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      {/* Top ray: angled down-right */}
      <path
        d="M 5 8 L 26 15"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Middle ray: horizontal */}
      <path
        d="M 2 21 L 22 21"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Bottom ray: angled up-right */}
      <path
        d="M 6 34 L 26 27"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Right radial energy rays for the CTA button */
function ButtonRaysRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 45 42"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      {/* Top ray: angled down-left */}
      <path
        d="M 40 8 L 19 15"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Middle ray: horizontal */}
      <path
        d="M 43 21 L 23 21"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Bottom ray: angled up-left */}
      <path
        d="M 39 34 L 19 27"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Delicate hand-drawn smile arc under the CTA bottom subtitle */
function FinePrintSmile({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 250 14"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      <path
        d="M 8 3 C 85 13, 165 13, 242 3"
        stroke="#0066FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

/* ─── Card Data ───────────────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    image: "/NewFinalCTALogos/1.png",
    title: "Your city.",
    description: "We'll analyze your local market and opportunity.",
  },
  {
    number: "02",
    image: "/NewFinalCTALogos/2.png",
    title: "Your services.",
    description: "We'll focus on the services you offer and your unique value.",
  },
  {
    number: "03",
    image: "/NewFinalCTALogos/3.png",
    title: "What people are searching.",
    description: "We'll find the exact terms your customers are using.",
  },
  {
    number: "04",
    image: "/NewFinalCTALogos/4.png",
    title: "What clicks are likely to cost.",
    description:
      "We'll show you realistic costs for your industry and location.",
  },
  {
    number: "05",
    image: "/NewFinalCTALogos/5.png",
    title:
      "And what the numbers would need to look like for the campaign to make sense.",
    description:
      "We'll break down the data so you can make a confident decision.",
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT: NewFinalCTA
═══════════════════════════════════════════════════════════════════════ */
const NewFinalCTA = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-[#EDF4FF] to-[#F0F6FF] py-16 sm:py-20 lg:py-24"
      aria-label="Final CTA - See if Google Ads works for your business"
    >
      {/* ── Ambient Background Atmosphere ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <DotGrid
          className="absolute top-12 left-6 sm:left-12 opacity-45"
          rows={8}
          cols={6}
        />
        <DotGrid
          className="absolute top-14 right-6 sm:right-12 opacity-45"
          rows={8}
          cols={6}
        />
        <DotGrid
          className="absolute bottom-16 right-6 sm:right-12 opacity-45"
          rows={6}
          cols={6}
        />
        <div className="absolute top-1/4 left-1/10 h-[560px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.08)_0%,transparent_70%)] blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/10 h-[500px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.07)_0%,transparent_70%)] blur-[90px]" />
      </div>

      {/* ── Full Width Container with Comfortable Side Padding ── */}
      <div className="relative w-full px-5 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-24">
        {/* ══════════════════════════════════════════════════════════
            HEADER SECTION
        ══════════════════════════════════════════════════════════ */}
        <div className="relative w-full">
          {/* Top-Right handwritten annotation: "Real answers. Not guesswork." */}
          <div className="hidden lg:block absolute right-2 top-0">
            <Reveal delay={0.15} direction="right">
              <RealAnswersGroup />
            </Reveal>
          </div>

          {/* Top-Left handwritten pill: "Let's Talk About" */}
          <Reveal delay={0} direction="none">
            <div className="mb-2 sm:mb-3">
              <LetsTalkGroup />
            </div>
          </Reveal>

          {/* Main 3-line Heading matching reference design */}
          <Reveal delay={0.06} direction="up">
            <h2 className="text-[34px] sm:text-[46px] lg:text-[54px] xl:text-[62px] font-black tracking-[-0.04em] leading-[1.08]">
              {/* Line 1: Dark Black */}
              <span className="text-[#0A1128] block">
                Want To Know If Google Ads
              </span>
              {/* Line 2: Vibrant Blue */}
              <span className="text-[#0066FF] block mt-0.5">
                Would Actually Work For
              </span>
              {/* Line 3: Vibrant Blue with prominent hand-drawn underline */}
              <span className="relative inline-block text-[#0066FF] mt-0.5">
                Your Business?
                <HeadingUnderline className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-5 left-0 w-[105%] h-5 sm:h-7 lg:h-8 pointer-events-none" />
              </span>
            </h2>
          </Reveal>

          {/* "We'll look at:" */}
          <Reveal delay={0.1} direction="up">
            <p className="mt-8 sm:mt-10 lg:mt-12 text-[19px] sm:text-[21px] lg:text-[23px] font-bold text-[#0A1128] tracking-tight">
              We&apos;ll look at:
            </p>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════════════════════════
            FIVE CARDS ROW (Full Width & Pure White Backgrounds)
        ══════════════════════════════════════════════════════════ */}
        <Reveal delay={0.14} direction="up">
          <div className="relative w-full mt-6 sm:mt-8">
            {/* Soft wavy connector path threading behind cards on desktop */}
            <div
              className="absolute top-[135px] inset-x-8 h-12 pointer-events-none hidden lg:block overflow-visible z-0"
              aria-hidden
            >
              <svg
                viewBox="0 0 1200 60"
                fill="none"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M 100 30 C 220 10, 340 50, 460 30 C 580 12, 700 48, 820 28 C 940 10, 1060 40, 1140 25"
                  stroke="#0066FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.22"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 5-Column Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3.5 xl:gap-4.5 2xl:gap-5">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className="group relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-white border border-[#E2EDF9] p-5 sm:p-6 lg:p-5 xl:p-6 shadow-[0_18px_42px_-14px_rgba(0,102,255,0.12),0_6px_16px_-6px_rgba(15,23,42,0.06),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_26px_52px_-12px_rgba(0,102,255,0.22),0_10px_22px_-6px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  {/* Top Specular Edge Highlight */}
                  <div
                    className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent"
                    aria-hidden
                  />

                  {/* Top-Left Number Pill Badge */}
                  <div className="flex items-center justify-start mb-2">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#1A77FF] to-[#0052CC] text-[12px] sm:text-[13px] font-black text-white shadow-[0_3px_10px_rgba(0,102,255,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)]">
                      {step.number}
                    </span>
                  </div>

                  {/* 3D Logo Image (Pure White background allows 100% seamless blend) */}
                  <div className="relative w-full flex justify-center py-2 sm:py-3 mb-2">
                    <div className="relative w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] lg:w-[115px] lg:h-[115px] xl:w-[130px] xl:h-[130px] group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 120px, 140px"
                        priority
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-[17px] sm:text-[18px] lg:text-[16px] xl:text-[18px] font-black tracking-tight leading-snug text-[#0A1128] ${
                      idx === 4
                        ? "lg:text-[14.5px] xl:text-[16px] leading-tight"
                        : ""
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[13.5px] sm:text-[14px] lg:text-[13px] xl:text-[14px] font-medium leading-relaxed text-slate-500 flex-1">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM CALLOUT: "No B.S." + 3D Shield Badge + Bold Statements
        ══════════════════════════════════════════════════════════ */}
        <Reveal delay={0.18} direction="up">
          <div className="relative w-full mt-10 sm:mt-14">
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-white/95 via-white/90 to-[#EEF5FF]/90 backdrop-blur-xl border border-white ring-1 ring-[#D6E5F8] p-6 sm:p-8 lg:p-10 xl:p-12 shadow-[0_24px_55px_-18px_rgba(0,102,255,0.14),0_8px_20px_-8px_rgba(15,23,42,0.06),inset_0_1.5px_2px_rgba(255,255,255,1)]">
              {/* Top Specular Sheen */}
              <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                aria-hidden
              />
              {/* Soft Ambient Inner Glow */}
              <div
                className="pointer-events-none absolute -top-20 left-1/4 h-48 w-80 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.09)_0%,transparent_70%)] blur-2xl"
                aria-hidden
              />

              <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 xl:gap-10">
                {/* 3D Shield Badge with "No B.S." annotation */}
                <div className="relative shrink-0 self-center lg:self-auto pt-5 sm:pt-6 lg:pt-0">
                  {/* "No B.S." handwritten mark + curved arrow pointing to shield */}
                  <div className="absolute -top-7 -left-6 sm:-top-8 sm:-left-8 select-none pointer-events-none z-20">
                    <NoBSAnnotation />
                  </div>

                  {/* 3D Multi-Layered Glass Shield Puck */}
                  <div className="relative flex h-[84px] w-[84px] sm:h-[96px] sm:w-[96px] items-center justify-center rounded-full bg-gradient-to-b from-[#E8F2FF] to-[#CCE2FF] p-2.5 shadow-[0_16px_36px_-8px_rgba(0,102,255,0.32),0_6px_14px_-4px_rgba(15,23,42,0.1),inset_0_2px_3px_rgba(255,255,255,1)] border border-white ring-1 ring-[#BAD5FF]">
                    {/* Inner vivid blue glossy core */}
                    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-[#1C7BFF] via-[#0066FF] to-[#004ACC] shadow-[inset_0_2px_4px_rgba(255,255,255,0.65),inset_0_-3px_5px_rgba(0,25,100,0.5),0_6px_14px_rgba(0,80,220,0.4)] overflow-hidden">
                      {/* Top glass specular reflection crescent */}
                      <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/45 via-white/15 to-transparent rounded-t-full pointer-events-none" />
                      {/* Shield check icon */}
                      <div className="relative z-10 flex items-center justify-center text-white drop-shadow-[0_2px_4px_rgba(0,20,80,0.3)]">
                        <ShieldCheck className="h-9 w-9 sm:h-10 sm:w-10 stroke-[2.2]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider Bar */}
                <div
                  className="hidden lg:block w-[1.5px] h-20 bg-[#D4E4F7] mx-1 shrink-0 rounded-full"
                  aria-hidden
                />

                {/* Bold Statement Typography */}
                <div className="flex-1 min-w-0">
                  <p className="text-[22px] sm:text-[27px] lg:text-[29px] xl:text-[33px] font-black tracking-[-0.03em] leading-[1.14] text-[#0A1128]">
                    No generic marketing presentation.
                  </p>
                  <p className="text-[22px] sm:text-[27px] lg:text-[29px] xl:text-[33px] font-black tracking-[-0.03em] leading-[1.14] text-[#0A1128] mt-1">
                    No 45-minute pitch about how amazing our agency is.
                  </p>
                  <p className="text-[26px] sm:text-[32px] lg:text-[36px] xl:text-[42px] font-black tracking-[-0.03em] leading-[1.14] text-[#0066FF] mt-2">
                    Just{" "}
                    <span className="relative inline-block">
                      the numbers and the plan.
                      <PlanUnderline className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-4 sm:h-5 pointer-events-none" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════════════════════
            SHINY, GLOSSY, TACTILE CTA BUTTON AREA
        ══════════════════════════════════════════════════════════ */}
        <Reveal delay={0.24} direction="up">
          <div className="relative w-full mt-10 sm:mt-12 flex flex-col items-center">
            {/* Button Row with Flanking Energy Rays */}
            <div className="relative flex items-center justify-center gap-2 sm:gap-3">
              {/* Left Energy Rays */}
              <ButtonRaysLeft className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 shrink-0" />

              {/* Glossy Tactile Pill Button */}
              <Link href="/contact" className="relative inline-block group">
                <motion.div
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.975 }}
                  className="relative overflow-hidden rounded-full cursor-pointer"
                >
                  {/* Vibrant outer glow diffusion */}
                  <div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0066FF]/35 via-[#3B82F6]/25 to-[#0066FF]/35 blur-lg group-hover:blur-xl transition-all duration-300"
                    aria-hidden
                  />

                  {/* 3D Glossy Gel Button Body */}
                  <div className="relative flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-10 lg:px-12 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-b from-[#1C79FF] via-[#0066FF] to-[#0048D1] text-white shadow-[0_18px_40px_-6px_rgba(0,102,255,0.55),0_8px_18px_-4px_rgba(0,60,180,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-3px_5px_rgba(0,25,100,0.45)] group-hover:shadow-[0_22px_48px_-4px_rgba(0,102,255,0.65),0_10px_22px_-2px_rgba(0,60,180,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-3px_5px_rgba(0,25,100,0.45)] transition-all duration-300">
                    {/* Top Glass Specular Curve Sheen */}
                    <div
                      className="pointer-events-none absolute inset-x-4 top-0 h-[48%] rounded-t-full bg-gradient-to-b from-white/45 via-white/15 to-transparent"
                      aria-hidden
                    />

                    {/* Left Circular Glass Capsule with White Arrow */}
                    <div className="relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/25 border border-white/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
                      <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white stroke-[2.8]" />
                    </div>

                    {/* CTA Text */}
                    <span className="relative z-10 text-[13.5px] sm:text-[15px] lg:text-[16px] font-black tracking-[0.08em] sm:tracking-[0.11em] uppercase text-white drop-shadow-[0_1px_2px_rgba(0,20,80,0.35)]">
                      Show Me What You&apos;d Do In My Market
                    </span>

                    {/* Right Arrow */}
                    <ArrowRight className="relative z-10 h-4.5 w-4.5 sm:h-5 sm:w-5 text-white stroke-[2.8] group-hover:translate-x-1.5 transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,20,80,0.35)]" />
                  </div>
                </motion.div>
              </Link>

              {/* Right Energy Rays */}
              <ButtonRaysRight className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 shrink-0" />
            </div>

            {/* Bottom Subtitle / Fine Print with Handwritten Smile Arc */}
            <div className="relative mt-4 sm:mt-5 flex flex-col items-center">
              <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 text-center tracking-tight">
                Takes about 15 minutes. If the numbers don&apos;t make sense,
                we&apos;ll tell you.
              </p>
              <FinePrintSmile className="w-48 sm:w-56 h-3 mt-1 pointer-events-none" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewFinalCTA;
