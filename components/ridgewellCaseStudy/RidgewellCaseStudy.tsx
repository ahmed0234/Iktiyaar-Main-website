"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import {
  MapPin,
  X,
  Check,
  User,
  DollarSign,
  MousePointer2,
  CheckCircle2,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"] });

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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const initial =
    direction === "up"
      ? { opacity: 0, y: 28 }
      : direction === "left"
        ? { opacity: 0, x: -28 }
        : direction === "right"
          ? { opacity: 0, x: 28 }
          : { opacity: 0 };
  const animateState = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animateState}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Curved underline SVG (site-wide pattern)                           */
/* ------------------------------------------------------------------ */
function CurvedUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 18"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M4 10C60 3 140 3 180 8C220 13 270 14 296 10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashed arrow connector between metric cards                        */
/* ------------------------------------------------------------------ */
function MetricArrow({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="hidden lg:flex items-center justify-center shrink-0 w-10 xl:w-12"
      aria-hidden
    >
      <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
        <line
          x1="0"
          y1="8"
          x2="26"
          y2="8"
          stroke="#93C5FD"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <polygon points="26,3 36,8 26,13" fill="#3B82F6" />
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative watermark illustrations for each metric card            */
/* ------------------------------------------------------------------ */
function MetricDecoration({ type }: { type: "bars" | "dollars" | "circles" | "target" }) {
  const color = "#D6E4FA";
  if (type === "bars") {
    return (
      <svg width="80" height="42" viewBox="0 0 80 42" fill="none" className="opacity-50">
        <rect x="2" y="24" width="10" height="18" rx="3" fill={color} />
        <rect x="16" y="14" width="10" height="28" rx="3" fill={color} />
        <rect x="30" y="8" width="10" height="34" rx="3" fill={color} />
        <rect x="44" y="18" width="10" height="24" rx="3" fill={color} />
        <rect x="58" y="4" width="10" height="38" rx="3" fill={color} />
        <rect x="72" y="12" width="6" height="30" rx="3" fill={color} />
      </svg>
    );
  }
  if (type === "dollars") {
    return (
      <svg width="80" height="42" viewBox="0 0 80 42" fill="none" className="opacity-50">
        <circle cx="18" cy="28" r="14" fill={color} />
        <circle cx="50" cy="22" r="10" fill={color} />
        <circle cx="70" cy="32" r="7" fill={color} />
        <text x="12" y="33" fontSize="14" fontWeight="bold" fill="#B8CFF0">$</text>
        <text x="45" y="27" fontSize="11" fontWeight="bold" fill="#B8CFF0">$</text>
      </svg>
    );
  }
  if (type === "circles") {
    return (
      <svg width="80" height="42" viewBox="0 0 80 42" fill="none" className="opacity-50">
        <circle cx="20" cy="26" r="12" fill={color} />
        <circle cx="44" cy="30" r="8" fill={color} />
        <circle cx="62" cy="22" r="10" fill={color} />
        <circle cx="36" cy="16" r="5" fill={color} />
      </svg>
    );
  }
  // target
  return (
    <svg width="80" height="42" viewBox="0 0 80 42" fill="none" className="opacity-50">
      <circle cx="40" cy="24" r="18" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="40" cy="24" r="11" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="40" cy="24" r="4" fill={color} />
      <line x1="58" y1="12" x2="66" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="64,2 70,5 66,9" fill={color} />
    </svg>
  );
}

const decorationTypes: Array<"bars" | "dollars" | "circles" | "target"> = [
  "bars",
  "dollars",
  "circles",
  "target",
];

/* ------------------------------------------------------------------ */
/*  Metric card data                                                   */
/* ------------------------------------------------------------------ */
const metrics = [
  { icon: MousePointer2, value: "1,389", label: "Clicks" },
  { icon: DollarSign, value: "$4.55", label: "Average CPC" },
  { icon: CheckCircle2, value: "85", label: "Conversions" },
  { icon: Users, value: "$75.27", label: "Cost Per\nConversion" },
];

/* ------------------------------------------------------------------ */
/*  Shadow tokens                                                      */
/* ------------------------------------------------------------------ */
const topCardShadow =
  "shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_1px_3px_rgba(15,23,42,0.04),0_24px_56px_-16px_rgba(0,102,255,0.13),0_14px_28px_-12px_rgba(15,23,42,0.07)]";

const metricCardShadow =
  "shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-12px_rgba(0,102,255,0.12),0_10px_22px_-10px_rgba(15,23,42,0.06)]";

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function RidgewellCaseStudy() {
  return (
    <section className="relative w-full bg-[#EEF3FD] py-20 sm:py-28 overflow-hidden">
      {/* ── Background textures & ambient glows ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C2D4F3 1.1px, transparent 1.1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 55% 50% at 88% 6%, black 0%, transparent 70%)",
          opacity: 0.5,
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full bg-blue-300/12 blur-[100px]" />

      <div className="relative mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════════════════════════
            HEADING
        ════════════════════════════════════════════════════════════ */}
        <Reveal className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-[0_2px_12px_-2px_rgba(0,102,255,0.12)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-[#0066FF] uppercase">
              Real Client Results
            </span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[50px] font-black tracking-tight text-[#0B1220] leading-[1.06] uppercase">
            Google Ads Case Study
          </h2>
          <div className="relative inline-block mt-2.5">
            <p className="text-[25px] sm:text-[34px] lg:text-[40px] font-extrabold tracking-tight text-[#0066FF] leading-[1.1]">
              Here&rsquo;s What That Looks Like In The Real World.
            </p>
            <CurvedUnderline className="absolute -bottom-2.5 left-0 w-full h-[14px] text-[#0066FF] opacity-75" />
          </div>
        </Reveal>

        {/* ════════════════════════════════════════════════════════════
            TOP ROW — Profile Card + Objective Card
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-5 sm:gap-6 items-stretch">

          {/* ── Profile Card ── */}
          <Reveal delay={0.05} direction="left">
            <div className={`relative h-full rounded-[28px] bg-white border border-white/90 p-5 sm:p-7 flex flex-col ${topCardShadow}`}>
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-[68px] h-[68px] shrink-0 rounded-full overflow-hidden border-2 border-slate-100 bg-white shadow-[0_6px_18px_-4px_rgba(0,102,255,0.20),0_2px_6px_rgba(15,23,42,0.06)]">
                  <Image
                    src="/RidgewellColoradoCaseStudy/Logo.png"
                    alt="Ridgewell Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="text-[24px] font-black text-slate-900 leading-tight tracking-tight">
                    Ridgewell
                  </p>
                  <p className="text-[14px] font-medium text-slate-500 leading-tight">
                    Landscape &amp; Design
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[#0066FF]">
                    <MapPin size={13} strokeWidth={2.5} />
                    <span className="text-[12.5px] font-semibold">Colorado</span>
                  </div>
                </div>
              </div>
              <div className="relative flex-1 min-h-[240px] sm:min-h-[280px] w-full overflow-hidden rounded-2xl border border-slate-100/80 shadow-[inset_0_2px_10px_rgba(15,23,42,0.08),0_8px_24px_-8px_rgba(0,102,255,0.10)]">
                <Image
                  src="/RidgewellColoradoCaseStudy/ridgewellcolorado.png"
                  alt="Ridgewell landscaping project in Colorado"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/15 to-transparent" />
              </div>
            </div>
          </Reveal>

          {/* ── Objective Card ── */}
          <Reveal delay={0.12} direction="right">
            <div className={`relative h-full rounded-[28px] bg-white border border-white/90 p-5 sm:p-7 flex flex-col ${topCardShadow}`}>
              <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Quote */}
              <div className="flex gap-3.5 mb-7">
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shadow-[0_6px_16px_-4px_rgba(0,102,255,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path
                      d="M0 14V9.33C0 6.4.93 3.98 2.8 2.16 4.67.33 7.16.04 10.27.41v2.8c-1.56-.23-2.76.17-3.6.96-.84.8-1.27 1.9-1.27 3.33H8.73V14H0Zm8.73 0V9.33c0-2.93.93-5.35 2.8-7.17 1.87-1.83 4.36-2.12 7.47-1.75v2.8c-1.56-.23-2.76.17-3.6.96-.84.8-1.27 1.9-1.27 3.33h3.34V14H8.73Z"
                      fill="#93C5FD"
                    />
                  </svg>
                </div>
                <p className="text-[16px] sm:text-[17.5px] leading-[1.6] text-slate-700 font-medium">
                  Ridgewell wanted more homeowners looking for{" "}
                  <span className="font-bold text-[#0066FF]">landscaping, xeriscaping</span>{" "}
                  and{" "}
                  <span className="font-bold text-[#0066FF]">outdoor construction</span>{" "}
                  work.
                </p>
              </div>

              {/* THE REAL OBJECTIVE divider with horizontal arrow → circle */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="text-[11px] font-extrabold tracking-[0.14em] text-[#0066FF] whitespace-nowrap uppercase">
                  The Real Objective
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-200 to-blue-300/60" />
                {/* Arrow triangle pointing right */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                  <polygon points="0,0 10,5 0,10" fill="#93C5FD" />
                </svg>
                {/* Dashed circle terminal */}
                <div className="w-4 h-4 shrink-0 rounded-full border-[2px] border-dashed border-blue-200/80" />
              </div>

              {/* Objective sub-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {/* Wrong */}
                <div className="relative rounded-2xl bg-[#FAFBFE] border border-slate-100/80 p-5 flex flex-col items-center text-center gap-3 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_10px_24px_-8px_rgba(220,38,38,0.08),0_6px_12px_-6px_rgba(15,23,42,0.04)]">
                  <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 border border-red-100 shadow-[0_6px_16px_-4px_rgba(220,38,38,0.25)]">
                    <X size={19} className="text-red-500" strokeWidth={3} />
                  </div>
                  <p className="text-[14px] leading-snug text-slate-600">
                    The objective{" "}
                    <span className="font-bold text-slate-900">wasn&rsquo;t traffic.</span>
                  </p>
                  <span className="mt-auto rounded-full bg-red-50 border border-red-100 px-3.5 py-1.5 text-[12px] font-semibold text-red-500">
                    Random traffic
                  </span>
                </div>

                {/* Right */}
                <div className="relative rounded-2xl bg-[#FAFBFE] border border-slate-100/80 p-5 flex flex-col items-center text-center gap-3 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_10px_24px_-8px_rgba(16,185,129,0.08),0_6px_12px_-6px_rgba(15,23,42,0.04)]">
                  <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_6px_16px_-4px_rgba(16,185,129,0.50),inset_0_1px_0_rgba(255,255,255,0.25)]">
                    <Check size={19} className="text-white" strokeWidth={3} />
                  </div>
                  <p className="text-[14px] leading-snug text-slate-600">
                    The objective was{" "}
                    <span className="font-bold text-slate-900">profitable homeowner inquiries.</span>
                  </p>
                  <div className="mt-auto w-full flex flex-col gap-2">
                    <span className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
                      <User size={12} strokeWidth={2.5} /> High intent homeowners
                    </span>
                    <span className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
                      <DollarSign size={12} strokeWidth={2.5} /> Profitable jobs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            RESULTS SECTION
        ════════════════════════════════════════════════════════════ */}
        <div className="mt-20 sm:mt-28">

          {/* Section header */}
          <Reveal className="text-center mb-10 sm:mb-14">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="flex-1 max-w-[120px] h-px bg-gradient-to-r from-transparent to-blue-200" />
              <p className="text-[12px] font-extrabold tracking-[0.18em] text-[#0066FF] uppercase">
                The Results
              </p>
              <div className="flex-1 max-w-[120px] h-px bg-gradient-to-l from-transparent to-blue-200" />
            </div>
            {/* Big heading */}
            <h3 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black tracking-tight text-[#0B1220] leading-[1.1]">
              Real campaign.{" "}
              <span className="text-[#0066FF]">Real results.</span>
            </h3>
            <p className="mt-2 text-[16px] sm:text-[18px] text-slate-500 font-medium">
              One campaign. <span className="font-bold text-slate-700">Big impact for our client.</span>
            </p>
          </Reveal>

          {/* Metrics row + impact card */}
          <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">

            {/* 4 Metric tiles */}
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-center flex-1">
                <Reveal delay={0.1 + i * 0.08} direction="up" className="flex-1 h-full">
                  <div className={`relative h-full rounded-[22px] bg-white border border-white/90 px-4 sm:px-5 pt-7 sm:pt-9 pb-5 sm:pb-6 flex flex-col items-center text-center gap-3 overflow-hidden ${metricCardShadow}`}>
                    {/* Specular top edge */}
                    <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                    {/* Icon in ring circle */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-white to-blue-50/80 border-[2.5px] border-blue-100 text-[#0066FF] shadow-[0_8px_20px_-6px_rgba(0,102,255,0.28),inset_0_2px_0_rgba(255,255,255,1)]">
                      <m.icon size={22} strokeWidth={2} />
                    </div>

                    {/* Value */}
                    <p className="text-[30px] sm:text-[34px] font-black text-slate-900 leading-none tracking-tight">
                      {m.value}
                    </p>

                    {/* Label */}
                    <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500 leading-snug whitespace-pre-line">
                      {m.label}
                    </p>

                    {/* Watermark illustration at bottom */}
                    <div className="mt-auto pt-3 pointer-events-none select-none">
                      <MetricDecoration type={decorationTypes[i]} />
                    </div>
                  </div>
                </Reveal>

                {/* Connecting arrow */}
                <MetricArrow delay={0.16 + i * 0.08} />
              </div>
            ))}

            {/* ── HERO IMPACT CARD (blue gradient, 3D, larger) ── */}
            <Reveal
              delay={0.1 + metrics.length * 0.08}
              direction="up"
              className="relative lg:w-[280px] xl:w-[300px] lg:pl-1"
            >
              {/* Ambient blue glow halo */}
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[44px] bg-[#0066FF]/20 blur-[40px]" />

              {/* ── Floating "BIG IMPACT" badge (top-right corner) ── */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute -top-6 right-3 sm:-top-7 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-100 shadow-[0_8px_20px_-4px_rgba(0,102,255,0.25),0_4px_8px_-2px_rgba(15,23,42,0.06)]"
              >
                <Star size={12} className="text-[#0066FF] fill-[#0066FF]" />
                <span className="text-[10px] font-extrabold tracking-wide text-[#0066FF] uppercase leading-none">
                  Big<br />Impact
                </span>
              </motion.div>

              {/* ── Curved growth arrow (sweeps upward to badge) ── */}
              <motion.svg
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.85 }}
                width="60"
                height="50"
                viewBox="0 0 60 50"
                fill="none"
                className="absolute -top-9 right-[70px] sm:right-[80px] hidden sm:block z-10"
                aria-hidden
              >
                <motion.path
                  d="M6 44C12 30 22 16 36 10C44 7 52 8 56 10"
                  stroke="#0066FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                />
                {/* Arrowhead pointing right-upward */}
                <motion.polygon
                  points="52,4 60,10 52,14"
                  fill="#0066FF"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: 1.65 }}
                />
              </motion.svg>

              {/* The blue gradient card */}
              <div className="relative h-full rounded-[22px] overflow-hidden flex flex-col items-center text-center px-6 pt-10 pb-8 gap-4 shadow-[0_2px_0_0_rgba(255,255,255,0.15)_inset,0_36px_70px_-16px_rgba(0,80,204,0.50),0_18px_36px_-14px_rgba(15,23,42,0.12)]"
                style={{
                  background: "linear-gradient(165deg, #3B8BFF 0%, #0066FF 30%, #0050CC 65%, #003DA5 100%)",
                }}
              >
                {/* Specular top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                {/* Inner subtle glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-300/20 blur-[50px] pointer-events-none" />

                {/* Glassmorphic icon circle */}
                <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/25 shadow-[0_14px_32px_-8px_rgba(0,40,150,0.50),inset_0_1px_2px_rgba(255,255,255,0.30)]"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 100%)" }}
                >
                  <TrendingUp size={32} strokeWidth={2.2} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
                </div>

                {/* "Approximately" label */}
                <p className="text-[12px] font-semibold text-blue-200/90 tracking-wide uppercase -mb-2">
                  Approximately
                </p>

                {/* Dollar figure */}
                <p className="text-[38px] sm:text-[44px] leading-none font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                  ~$50,000<span className="text-blue-200">+</span>
                </p>

                {/* Label */}
                <p className="text-[14px] sm:text-[15px] font-bold text-white/90 leading-tight -mt-1">
                  Profit Generated
                </p>

                {/* Handwritten note */}
                <p className={`${caveat.className} text-[17px] sm:text-[19px] font-bold text-blue-200 -mt-1 -rotate-1`}>
                  from just one campaign
                </p>

                {/* CTA button */}
                <button className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-extrabold tracking-[0.1em] text-[#0066FF] uppercase shadow-[0_10px_24px_-6px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_14px_30px_-6px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                  Real Impact
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* ── Bottom footnote ── */}
          <Reveal delay={0.25} className="mt-10 sm:mt-12">
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 border border-blue-100 shadow-[0_4px_12px_-3px_rgba(0,102,255,0.20)]">
                <Star size={14} className="text-[#0066FF] fill-[#0066FF]" />
              </div>
              <p className="text-[15px] sm:text-[17px] text-slate-500 font-medium">
                Real client. Real numbers.{" "}
                <span className="relative font-bold text-[#0066FF]">
                  Real growth.
                  <CurvedUnderline className="absolute -bottom-1.5 left-0 w-full h-[8px] text-[#0066FF] opacity-60" />
                </span>
              </p>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
