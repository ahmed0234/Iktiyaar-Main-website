"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Check,
  Search,
  BarChart3,
  Users,
  CheckCircle2,
  Maximize2,
  X,
  TrendingUp,
  Globe,
} from "lucide-react";

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
      ? { opacity: 0, y: 22 }
      : direction === "left"
        ? { opacity: 0, x: -22 }
        : direction === "right"
          ? { opacity: 0, x: 22 }
          : { opacity: 0 };
  const animateState = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animateState}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */
function useCountUp(
  end: number,
  duration: number = 2000,
  startOnView: boolean = true
) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || !inView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration, startOnView]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Handwritten-style underline SVG                                    */
/* ------------------------------------------------------------------ */
function HandwrittenUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 14"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M4 9C50 3 120 4 160 7C200 10 260 11 296 8"
        stroke="#0062FF"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Curved sketch arrow (decorative)                                   */
/* ------------------------------------------------------------------ */
function SketchArrow() {
  return (
    <svg
      width="48"
      height="42"
      viewBox="0 0 48 42"
      fill="none"
      className="w-10 h-9 lg:w-12 lg:h-10 drop-shadow-[0_2px_6px_rgba(0,98,255,0.25)]"
    >
      <path
        d="M 6 38 C 10 18, 22 8, 40 6"
        stroke="#0062FF"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 28 6 L 41 6 L 41 18"
        stroke="#0062FF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Eyebrow label component                                            */
/* ------------------------------------------------------------------ */
function SectionEyebrow({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 mb-3">
      <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-5 h-px bg-blue-300" />
      <span className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.2em] text-[#0062FF] uppercase px-1">
        {text}
      </span>
      <div className="w-5 h-px bg-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-blue-300" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Search bar decorative graphic                                      */
/* ------------------------------------------------------------------ */
function SearchBarGraphic() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
      {/* Ambient glow behind graphic */}
      <div className="absolute inset-0 rounded-3xl bg-blue-400/10 blur-xl -z-10" />

      {/* Main card frame */}
      <div className="relative rounded-2xl sm:rounded-[22px] bg-white border border-slate-200/80 shadow-[0_8px_32px_-6px_rgba(0,102,255,0.12),0_2px_8px_rgba(15,23,42,0.04)] p-4 sm:p-5">
        {/* Top search input bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-8 sm:h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center px-3 gap-2 shadow-2xs">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400/70" />
            <div className="flex-1 h-2 rounded bg-slate-200/80" />
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-[0_3px_10px_rgba(0,102,255,0.3)] shrink-0">
            <Search className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
        </div>

        {/* Chart lines going up */}
        <div className="relative h-[110px] sm:h-[130px] rounded-xl bg-gradient-to-b from-[#F8FAFC] to-white border border-slate-100/80 p-2 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 240 100" fill="none" className="w-full h-full">
            {/* Grid lines */}
            <line
              x1="0"
              y1="25"
              x2="240"
              y2="25"
              stroke="#E2E8F0"
              strokeWidth="0.6"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1="50"
              x2="240"
              y2="50"
              stroke="#E2E8F0"
              strokeWidth="0.6"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1="75"
              x2="240"
              y2="75"
              stroke="#E2E8F0"
              strokeWidth="0.6"
              strokeDasharray="4 4"
            />

            {/* Area gradient under line */}
            <defs>
              <linearGradient
                id="searchChartGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0062FF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0062FF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 10 85 C 35 80, 55 75, 75 64 C 95 53, 115 48, 135 40 C 155 32, 180 24, 205 16 L 228 8 L 228 95 L 10 95 Z"
              fill="url(#searchChartGrad)"
            />

            {/* Upward trending line */}
            <path
              d="M 10 85 C 35 80, 55 75, 75 64 C 95 53, 115 48, 135 40 C 155 32, 180 24, 205 16 L 228 8"
              stroke="#0062FF"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Arrow head */}
            <path
              d="M 218 14 L 229 7 L 222 2"
              stroke="#0062FF"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Shadow layers for depth */}
      <div className="absolute -bottom-2 left-3 right-3 h-4 rounded-2xl bg-blue-100/40 blur-xs -z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Google "G" Logo SVG                                                */
/* ------------------------------------------------------------------ */
function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        fill="#FFC107"
      />
      <path
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        fill="#FF3D00"
      />
      <path
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        fill="#4CAF50"
      />
      <path
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        fill="#1976D2"
      />
    </svg>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export default function SEOCaseStudy() {
  const visitorsCounter = useCountUp(1000, 2200);
  const leadsCounter = useCountUp(200, 2000);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(
    null
  );

  // Close modal on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedScreenshot(null);
      }
    };
    if (selectedScreenshot) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedScreenshot]);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F5F8FE] via-[#EDF3FC] to-[#F1F6FE] py-14 sm:py-18 lg:py-22 overflow-hidden">
      {/* ── Background subtle dot grid & ambient glows ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #B8CEF5 1.1px, transparent 1.1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 80% 15%, black 0%, transparent 75%)",
          opacity: 0.55,
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/12 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-300/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* ════════════════════════════════════════════════════════════
            SECTION HEADING
        ════════════════════════════════════════════════════════════ */}
        <Reveal className="text-center mb-10 sm:mb-14">
          <SectionEyebrow text="SEO Case Study" />
        </Reveal>

        {/* ════════════════════════════════════════════════════════════
            TOP ROW: LEFT = HEADLINE + COPY  |  RIGHT = RESULTS CARD
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 lg:gap-12 items-start mb-14 sm:mb-18 lg:mb-20">
          {/* ── Left Column: Headline + Description ── */}
          <Reveal delay={0.05} direction="left">
            <div className="flex flex-col">
              {/* Search icon circle */}
              <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white border border-blue-100 shadow-[0_6px_20px_-4px_rgba(0,102,255,0.14),0_2px_6px_rgba(15,23,42,0.04)] flex items-center justify-center mb-5 sm:mb-7">
                <Search className="w-6 h-6 sm:w-7 sm:h-7 text-[#0062FF]" />
              </div>

              {/* Main heading */}
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black tracking-tight text-[#0B1220] leading-[1.08] mb-2 sm:mb-3">
                Casey Insurance Group
              </h2>

              {/* Subtitle with underline */}
              <div className="mb-5 sm:mb-6">
                <p className="text-[19px] sm:text-[23px] lg:text-[27px] font-extrabold tracking-tight text-[#0B1220] leading-[1.2]">
                  From Organic Traffic To
                </p>
                <div className="relative inline-block mt-0.5">
                  <p className="text-[19px] sm:text-[23px] lg:text-[27px] font-extrabold tracking-tight text-[#0052EA] leading-[1.2]">
                    Consistent Lead Generation.
                  </p>
                  <HandwrittenUnderline className="absolute -bottom-1.5 left-0 w-full h-[10px] opacity-70" />
                </div>
              </div>

              {/* Description */}
              <p className="text-[14.5px] sm:text-[15.5px] text-slate-600 leading-relaxed max-w-[460px] mb-5">
                We worked on Casey Insurance Group&rsquo;s organic search
                presence with a simple objective:
              </p>

              {/* Highlighted callout */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-blue-100/80 shadow-[0_4px_16px_-4px_rgba(0,102,255,0.08)] mb-6 max-w-[460px]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(0,102,255,0.4)]">
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                </div>
                <p className="text-[13.5px] sm:text-[14.5px] font-semibold text-slate-800 leading-snug">
                  Get more people finding the business through Google.
                </p>
              </div>

              {/* Checklist items */}
              <div className="flex flex-col gap-2.5">
                {[
                  "Not just rankings for the sake of rankings.",
                  "Not traffic for the sake of traffic.",
                  "Traffic that turns into inquiries.",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#0062FF] stroke-[3]" />
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-slate-600 leading-snug">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Right Column: Results Card ── */}
          <Reveal delay={0.15} direction="right">
            <div className="relative">
              {/* Decorative sketch arrow */}
              <div className="absolute -top-8 right-4 sm:right-8 pointer-events-none select-none z-10 hidden sm:block">
                <SketchArrow />
              </div>

              {/* Decorative dots */}
              <div
                className="absolute -top-4 right-0 w-[80px] h-[80px] pointer-events-none hidden sm:block"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #B8CEF5 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                  opacity: 0.6,
                }}
              />

              {/* Results card */}
              <div className="relative rounded-[24px] bg-white border border-white/90 p-5 sm:p-7 lg:p-8 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_1px_3px_rgba(15,23,42,0.04),0_24px_56px_-16px_rgba(0,102,255,0.12),0_14px_28px_-12px_rgba(15,23,42,0.06)]">
                {/* Top specularity */}
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-200/60 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-[0_4px_12px_-3px_rgba(0,102,255,0.15)]">
                    <BarChart3 className="w-5 h-5 text-[#0062FF]" />
                  </div>
                  <h3 className="text-[19px] sm:text-[21px] font-extrabold text-slate-900 tracking-tight">
                    The Results
                  </h3>
                </div>

                {/* Result 1: Monthly Organic Visitors */}
                <div className="rounded-2xl bg-gradient-to-br from-[#F8FAFF] to-white border border-blue-50/80 p-4.5 sm:p-6 mb-3.5 sm:mb-4 shadow-[0_2px_8px_-2px_rgba(0,102,255,0.06)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span
                        ref={visitorsCounter.ref}
                        className="text-[34px] sm:text-[42px] lg:text-[46px] font-black text-[#0062FF] leading-none tracking-tight block"
                      >
                        {visitorsCounter.count.toLocaleString()}+
                      </span>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500 mt-1.5 tracking-tight">
                        Monthly Organic Visitors
                      </p>
                    </div>
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#0062FF]/70" />
                    </div>
                  </div>
                </div>

                {/* Result 2: Leads Generated */}
                <div className="rounded-2xl bg-gradient-to-br from-[#F8FAFF] to-white border border-blue-50/80 p-4.5 sm:p-6 shadow-[0_2px_8px_-2px_rgba(0,102,255,0.06)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span
                        ref={leadsCounter.ref}
                        className="text-[34px] sm:text-[42px] lg:text-[46px] font-black text-[#0062FF] leading-none tracking-tight block"
                      >
                        {leadsCounter.count}+
                      </span>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500 mt-1.5 tracking-tight">
                        Leads Generated Overall
                      </p>
                    </div>
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#0062FF]/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            MIDDLE SECTION: SEARCH CONSOLE / SEO PERFORMANCE DASHBOARD
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.38fr_0.62fr] xl:grid-cols-[0.34fr_0.66fr] gap-6 sm:gap-8 lg:gap-10 items-center mb-14 sm:mb-18 lg:mb-20">
          {/* ── Left: Search Console info ── */}
          <Reveal delay={0.05} direction="left">
            <div className="flex flex-col">
              {/* Google Logo Card */}
              <div className="hidden w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white border border-slate-100 shadow-[0_8px_24px_-6px_rgba(0,102,255,0.12),0_2px_6px_rgba(15,23,42,0.04)] flex items-center justify-center mb-4 sm:mb-5">
                <GoogleLogo className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-black tracking-tight text-[#0B1220] leading-[1.12] mb-2 sm:mb-2.5">
                 Search Console
              </h3>

              <p className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0062FF] mb-2 sm:mb-2.5">
                Organic Search Performance
              </p>

              <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed max-w-[340px]">
                Steady growth in clicks, impressions and average position from
                organic search over time.
              </p>
            </div>
          </Reveal>

          {/* ── Right: Full Search Console / SEO Dashboard (Zero Cropping + Click to Expand) ── */}
          <Reveal delay={0.12} direction="right" className="w-full">
            <div
              onClick={() => setSelectedScreenshot("/SEO.jpg")}
              className="group relative w-full rounded-2xl sm:rounded-[22px] bg-white border border-slate-200/90 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_16px_40px_-10px_rgba(0,102,255,0.12),0_4px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_50px_-10px_rgba(0,102,255,0.20),0_0_0_1.5px_rgba(0,98,255,0.45)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Top specularity highlight */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent pointer-events-none z-10" />

              {/* Browser Window Style Header Bar */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-50/90 border-b border-slate-100 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200/60 shadow-2xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 font-medium truncate max-w-[140px] sm:max-w-[240px]">
                    caseyinsurancecompanies.com
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] sm:text-[12px] font-bold text-[#0062FF] group-hover:underline">
                  <Maximize2 size={12} strokeWidth={2.5} />
                  <span className="hidden sm:inline">Expand</span>
                </div>
              </div>

              {/* Full Screenshot Image Container (No Crop) */}
              <div className="relative w-full bg-white p-1.5 sm:p-2.5 flex items-center justify-center overflow-hidden">
                <Image
                  src="/SEO.jpg"
                  alt="Organic Search Performance Dashboard for Casey Insurance Group"
                  width={1100}
                  height={420}
                  className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 750px"
                  priority
                />

                {/* Hover Click-to-Expand Badge */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 text-[11px] sm:text-[12px] font-extrabold text-[#0062FF] shadow-lg flex items-center gap-2 border border-blue-100 backdrop-blur-sm">
                    <Maximize2 size={13} strokeWidth={2.8} /> Click to expand
                  </span>
                </div>
              </div>

              {/* Bottom Proof Strip */}
              <div className="px-3 sm:px-4 py-2 bg-slate-50/70 border-t border-slate-100/90 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-[12px] text-slate-500">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Globe size={13} className="text-[#0062FF]" /> Live Client SEO Overview
                </span>
                <span className="text-[#0062FF] font-bold flex items-center gap-1">
                  <TrendingUp size={13} /> Consistent Growth
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            BOTTOM SECTION: RESULTS SUMMARY WITH GRAPHIC
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* ── Left: Search bar graphic ── */}
          <Reveal
            delay={0.05}
            direction="left"
            className="flex justify-center lg:justify-start"
          >
            <SearchBarGraphic />
          </Reveal>

          {/* ── Right: Result description + checklist ── */}
          <Reveal delay={0.12} direction="right">
            <div className="flex flex-col">
              <p className="text-[15.5px] sm:text-[17.5px] lg:text-[19px] text-slate-700 leading-relaxed max-w-[540px] mb-4 sm:mb-5 font-medium">
                We grew the organic presence by building search visibility
                around what their customers were actually looking for.
              </p>

              {/* "The result:" heading */}
              <p className="text-[17px] sm:text-[19px] font-extrabold text-[#0062FF] mb-3.5 tracking-tight italic">
                The result:
              </p>

              {/* Checklist */}
              <div className="flex flex-col gap-3 sm:gap-3.5">
                {[
                  { text: "More visibility.", highlight: false },
                  { text: "More inbound traffic.", highlight: false },
                  { text: "More opportunities.", highlight: false },
                  {
                    text: "No paying for every single click.",
                    highlight: true,
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.15 + i * 0.08} direction="up">
                    <div className="flex items-center gap-3">
                      <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-[0_4px_14px_-3px_rgba(0,102,255,0.45)]">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </div>
                      <p
                        className={`text-[14.5px] sm:text-[16px] leading-snug ${
                          item.highlight
                            ? "font-extrabold text-[#0062FF]"
                            : "font-semibold text-slate-700"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          LIGHTBOX MODAL FOR FULL SCREENSHOT INSPECTION
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedScreenshot(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 shadow-2xl overflow-hidden"
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between pb-3 px-1 sm:px-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-[13.5px] sm:text-[15px] font-bold text-slate-900 leading-tight">
                      Casey Insurance Group — Organic Search Performance
                    </p>
                    <p className="text-[11px] sm:text-[12px] text-slate-500 font-medium">
                      Verified organic traffic, keywords &amp; search visibility overview
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer transition-colors shadow-2xs shrink-0"
                  aria-label="Close modal"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Modal Image Container */}
              <div className="relative w-full max-h-[75vh] mt-3 rounded-xl overflow-auto bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                <Image
                  src={selectedScreenshot}
                  alt="Casey Insurance Group SEO Performance Full Resolution"
                  width={1600}
                  height={600}
                  className="w-full h-auto object-contain rounded-lg max-h-[70vh]"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Modal Footer Bar */}
              <div className="mt-3 pt-2.5 px-2 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-[12px] text-slate-500">
                <span className="font-medium text-slate-700">
                  Source: Live Client Dashboard Insights
                </span>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="text-[#0062FF] font-bold hover:underline cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
