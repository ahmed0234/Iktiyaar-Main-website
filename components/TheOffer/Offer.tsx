"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Search,
  FileText,
  Network,
  TrendingUp,
  Ban,
  Gavel,
  LayoutTemplate,
  PhoneCall,
  Settings,
  Target,
  User,
  Phone,
  ArrowRight,
  MousePointer2,
  PhoneIncoming,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { GoogleAdsLogo, CurvedUnderline } from "@/components/hero/HeroLogos";

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
      ? { opacity: 0, y: 18 }
      : direction === "down"
        ? { opacity: 0, y: -16 }
        : direction === "left"
          ? { opacity: 0, x: -20 }
          : direction === "right"
            ? { opacity: 0, x: 20 }
            : { opacity: 0 };
  const animate = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Underline Under "We Handle:" ────────────────────────────────────── */
function ShortCurvedUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 18"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 13.5C25 5 65 4 107 11.5"
        stroke="#0066FF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M8 15.5C30 8 70 7 102 14"
        stroke="#0066FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

/* ─── Underline Under "giving estimates, and closing work." ────────────── */
function FocusCurvedUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 18"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 13.5C65 4.5 160 3.5 317 11.5"
        stroke="#0066FF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M18 15.5C85 8 190 7 305 14"
        stroke="#0066FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

/* ─── Upward Swoop Arrow SVG ──────────────────────────────────────────── */
function UpwardSwoopArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 28"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 4 24 C 12 24, 25 18, 28 6"
        stroke="#0066FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 21 6 L 28 6 L 28 13"
        stroke="#0066FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Phone Swoop Arrow SVG ───────────────────────────────────────────── */
function PhoneSwoopArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 46 18"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 2 13 C 15 13, 31 9, 42 5"
        stroke="#0066FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 35 3 L 42 5 L 38 11"
        stroke="#0066FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Google "G" Logo SVG ─────────────────────────────────────────────── */
function GoogleGLogoSmall({ className = "w-4 h-4" }: { className?: string }) {
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

/* ─── Ringing Phone Icon Group ────────────────────────────────────────── */
function RingingPhone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
    >
      <span className="text-[#0066FF] text-xl font-bold mr-1 select-none opacity-80 animate-pulse">
        )
      </span>
      <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-[#0066FF] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(0,102,255,0.4)] transition-transform hover:scale-105">
        <Phone className="w-4.5 h-4.5 xl:w-5 xl:h-5 fill-white" />
      </div>
      <span className="text-[#0066FF] text-xl font-bold ml-1 select-none opacity-80 animate-pulse">
        (
      </span>
    </div>
  );
}

/* ─── Dot Grid Architectural Pattern ──────────────────────────────────── */
function DotGridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-6 gap-2.5 pointer-events-none ${className}`}
      aria-hidden
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#0066FF]/20" />
      ))}
    </div>
  );
}

/* ─── Ascending 3D Growth Bars + Curved Arrow ─────────────────────────── */
function AscendingGrowthBars({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-end gap-2 sm:gap-2.5 ${className}`}>
      {/* Curved Upward Cyan Arrow */}
      <svg
        viewBox="0 0 70 70"
        fill="none"
        className="absolute -top-10 -right-5 w-12 h-12 overflow-visible text-[#38BDF8] pointer-events-none drop-shadow-xs"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 6 60 C 18 53, 36 32, 54 12"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 40 10 L 56 10 L 56 26"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* 3D Cyan/Blue Stepped Bars */}
      <div className="w-3.5 sm:w-4 h-12 sm:h-14 rounded-t-md bg-gradient-to-t from-[#BAE6FD] to-[#7DD3FC] opacity-75 shadow-2xs" />
      <div className="w-3.5 sm:w-4 h-20 sm:h-24 rounded-t-md bg-gradient-to-t from-[#7DD3FC] to-[#38BDF8] opacity-85 shadow-2xs" />
      <div className="w-3.5 sm:w-4 h-30 sm:h-36 rounded-t-md bg-gradient-to-t from-[#38BDF8] to-[#0284C7] opacity-95 shadow-xs" />
    </div>
  );
}

/* ─── Service Item Definition ─────────────────────────────────────────── */
interface ServiceItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const serviceItems: ServiceItem[] = [
  { title: "Google Search Ads", icon: Search },
  { title: "Keyword research", icon: FileText },
  { title: "Campaign structure", icon: Network },
  { title: "Ad copy", icon: FileText },
  { title: "Conversion tracking", icon: TrendingUp },
  { title: "Negative keywords", icon: Ban },
  { title: "Bid management", icon: Gavel },
  { title: "Landing page strategy", icon: LayoutTemplate },
  { title: "Call and form tracking", icon: PhoneCall },
  { title: "Ongoing optimization", icon: Settings },
];

/* ═══════════════════════════════════════════════════════════════════════
   MAIN OFFER COMPONENT (FULL-WIDTH 100VH BALANCED COMPOSITION)
═══════════════════════════════════════════════════════════════════════ */
const Offer = () => {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-[#FAFDFE] via-[#F3F8FF] to-[#FAFDFE] py-10 sm:py-14 lg:py-16 xl:py-20 overflow-hidden"
      aria-label="Our Offer"
    >
      {/* ── Ambient Radial Blue Background Glows ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-1/6 left-1/4 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(circle,rgba(0,102,255,0.07)_0%,transparent_70%)] rounded-full blur-[70px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 w-[850px] h-[500px] bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] rounded-full blur-[70px]" />
      </div>

      {/* ── Full-Width Container (NO max-width constraint) ── */}
      <div className="relative w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 2xl:gap-16 items-start w-full">
          {/* ════════════════════════════════════════════════════
              LEFT COLUMN: HEADLINE, GOAL & FULLY OCCUPIED GOOGLE ADS DASHBOARD
          ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
            {/* Top Eyebrow Badge */}
            <Reveal delay={0} direction="none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#D5E5FE] shadow-[0_2px_8px_rgba(0,102,255,0.05)] mb-3 sm:mb-4">
                <GoogleAdsLogo className="w-4 h-4" />
                <span className="text-[12.5px] font-bold text-slate-800 tracking-wide">
                  Our Offer
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </div>
            </Reveal>

            {/* Main Headline (Exact 3-Line Treatment Matching Reference) */}
            <Reveal delay={0.05} direction="up">
              <h2 className="text-[32px] sm:text-[40px] md:text-[44px] lg:text-[40px] xl:text-[46px] 2xl:text-[50px] font-black tracking-[-0.035em] text-[#0A1128] leading-[1.12]">
                We Build You A Google Ads
                <br className="hidden sm:inline" />
                {" "}System Designed To{" "}
                <span className="text-[#0066FF]">Generate</span>
                <br className="hidden sm:inline" />
                {" "}
                <span className="relative inline-block text-[#0066FF]">
                  Estimate Requests.
                  <CurvedUnderline className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-[#0066FF]" />
                </span>
              </h2>
            </Reveal>

            {/* Contrast Subtext (Tight, clean spacing) */}
            <Reveal delay={0.1} direction="up">
              <div className="mt-3.5 sm:mt-4 space-y-0.5 text-[14.5px] sm:text-[15.5px] text-slate-500 font-medium leading-relaxed">
                <p>Not traffic.</p>
                <p>Not impressions.</p>
                <p>
                  Not a pretty dashboard full of marketing numbers nobody cares
                  about.
                </p>
              </div>
            </Reveal>

            {/* "The Goal Is Simple" Card */}
            <Reveal delay={0.15} direction="up">
              <div className="mt-4 sm:mt-5 rounded-[20px] bg-gradient-to-r from-blue-50/80 via-white to-blue-50/60 border border-blue-200/80 p-4 sm:p-4.5 shadow-[0_4px_16px_-4px_rgba(0,102,255,0.06)] flex items-center justify-between gap-4 relative overflow-hidden">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,102,255,0.35)] shrink-0">
                    <Target className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11.5px] sm:text-[12px] font-extrabold text-[#0066FF] uppercase tracking-wider">
                      The Goal Is Simple:
                    </span>
                    <p className="text-[15px] sm:text-[16.5px] xl:text-[17px] font-bold text-[#0A1128] leading-snug mt-0.5">
                      Get more homeowners searching for your exact service to
                      contact your business.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 hidden sm:flex items-center pr-1">
                  <UpwardSwoopArrow className="w-8 h-7 text-[#0066FF]" />
                </div>
              </div>
            </Reveal>

            {/* Lower Google Ads Dashboard & Live Conversion System */}
            <Reveal delay={0.2} direction="up" className="mt-5 sm:mt-6 w-full">
              <div className="relative pt-6 pb-2 w-full">
                {/* Background Dot Grid on Left */}
                <DotGridPattern className="absolute top-1 -left-3 sm:-left-6 z-0 opacity-40 hidden sm:grid" />

                {/* Floating Google Ad Search Snippet Card (Overlapping Top-Left Edge) */}
                <div className="relative z-20 max-w-[260px] sm:max-w-[285px] -mb-7 sm:-mb-8 ml-2 sm:ml-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100/90 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12),0_1px_1px_rgba(255,255,255,1)_inset] p-3 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <GoogleGLogoSmall className="w-4 h-4 shrink-0" />
                    <span className="text-[12.5px] font-bold text-slate-900 leading-none">
                      Kitchen Remodeling Experts
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 font-medium">
                    <span className="font-bold text-slate-700">Ad</span> ·
                    yourwebsite.com
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5 leading-tight">
                    Get a Free Estimate · Licensed & Insured
                  </p>

                  {/* Mouse Cursor Hover Pointer */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 flex items-center justify-center text-[#0066FF] drop-shadow-xs">
                    <MousePointer2 className="w-5 h-5 fill-[#0066FF]" />
                  </div>
                </div>

                {/* Dual Container: Dashboard (Left) + Inbound Estimate Lead Widget (Right, Fills Marked Red Box) */}
                <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-3.5 xl:gap-4.5 w-full">
                  {/* ── 1. Main Google Ads Dashboard Card ── */}
                  <div className="flex-1 min-w-0 rounded-[24px] sm:rounded-[28px] bg-white/95 backdrop-blur-xl border border-blue-100/90 shadow-[0_20px_50px_-12px_rgba(0,102,255,0.12),0_1px_1px_rgba(255,255,255,1)_inset] p-4.5 sm:p-5 xl:p-6 overflow-hidden flex flex-col justify-between">
                    {/* Top Specular Edge Highlight */}
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                    <div>
                      {/* Dashboard Header */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2">
                          <GoogleAdsLogo className="w-5 h-5" />
                          <span className="text-[14.5px] font-extrabold text-slate-900 tracking-tight">
                            Google Ads
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 text-[#0066FF] text-[10px] font-bold">
                          <Zap className="w-2.5 h-2.5 fill-[#0066FF]" />
                          Active Campaign
                        </div>
                      </div>

                      {/* 4 KPI Columns */}
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 border-b border-slate-100 pb-3 mb-3">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Clicks
                          </span>
                          <p className="text-[15px] sm:text-[17px] xl:text-[18px] font-black text-slate-900 mt-0.5 tracking-tight">
                            1,284
                          </p>
                          <span className="inline-block text-[10px] font-bold text-emerald-600">
                            ↑ 32%
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Conversions
                          </span>
                          <p className="text-[15px] sm:text-[17px] xl:text-[18px] font-black text-slate-900 mt-0.5 tracking-tight">
                            142
                          </p>
                          <span className="inline-block text-[10px] font-bold text-emerald-600">
                            ↑ 28%
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            Cost / Conv.
                          </span>
                          <p className="text-[15px] sm:text-[17px] xl:text-[18px] font-black text-slate-900 mt-0.5 tracking-tight">
                            $49.21
                          </p>
                          <span className="inline-block text-[10px] font-bold text-emerald-600">
                            ↑ 16%
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                            ROAS
                          </span>
                          <p className="text-[15px] sm:text-[17px] xl:text-[18px] font-black text-slate-900 mt-0.5 tracking-tight">
                            6.71x
                          </p>
                          <span className="inline-block text-[10px] font-bold text-emerald-600">
                            ↑ 35%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Upward Line Chart Canvas */}
                    <div className="relative w-full h-32 sm:h-36 xl:h-40 pt-1">
                      <svg
                        viewBox="0 0 440 180"
                        fill="none"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="offerDashboardGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#0066FF"
                              stopOpacity="0.20"
                            />
                            <stop
                              offset="100%"
                              stopColor="#0066FF"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        {/* Subtle Horizontal Gridlines */}
                        <line
                          x1="10"
                          y1="35"
                          x2="430"
                          y2="35"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="10"
                          y1="75"
                          x2="430"
                          y2="75"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="10"
                          y1="115"
                          x2="430"
                          y2="115"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="10"
                          y1="155"
                          x2="430"
                          y2="155"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />

                        {/* Subtle Vertical Gridlines */}
                        <line
                          x1="65"
                          y1="20"
                          x2="65"
                          y2="170"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="140"
                          y1="20"
                          x2="140"
                          y2="170"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="215"
                          y1="20"
                          x2="215"
                          y2="170"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="290"
                          y1="20"
                          x2="290"
                          y2="170"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1="365"
                          y1="20"
                          x2="365"
                          y2="170"
                          stroke="#F1F5F9"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />

                        {/* Area Fill Gradient */}
                        <path
                          d="M 15 135 C 40 128, 52 125, 65 125 C 88 125, 108 132, 130 130 C 152 128, 175 118, 195 115 C 218 112, 240 102, 260 95 C 285 86, 305 76, 325 68 C 350 56, 368 45, 385 38 C 402 31, 415 22, 425 18 L 425 180 L 15 180 Z"
                          fill="url(#offerDashboardGrad)"
                        />

                        {/* Smooth Blue Upward Curve */}
                        <path
                          d="M 15 135 C 40 128, 52 125, 65 125 C 88 125, 108 132, 130 130 C 152 128, 175 118, 195 115 C 218 112, 240 102, 260 95 C 285 86, 305 76, 325 68 C 350 56, 368 45, 385 38 C 402 31, 415 22, 425 18"
                          stroke="#0066FF"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                        />

                        {/* Circular Milestone Data Nodes */}
                        <circle
                          cx="15"
                          cy="135"
                          r="3.5"
                          fill="white"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="65"
                          cy="125"
                          r="3.5"
                          fill="white"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="130"
                          cy="130"
                          r="3.5"
                          fill="white"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="195"
                          cy="115"
                          r="3.5"
                          fill="white"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="260"
                          cy="95"
                          r="3.5"
                          fill="white"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="325"
                          cy="68"
                          r="3.5"
                          fill="white"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="385"
                          cy="38"
                          r="3.5"
                          fill="white"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="425"
                          cy="18"
                          r="4"
                          fill="#0066FF"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Floating Metric Badge: "Estimate Requests +247 ↑ 62%" */}
                      <div className="absolute top-1 right-1 sm:right-2 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200/90 shadow-[0_6px_20px_-4px_rgba(0,102,255,0.18)] px-2.5 py-1.5 flex items-center gap-2 group hover:scale-105 transition-transform">
                        <div className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse shrink-0" />
                        <div>
                          <span className="block text-[9.5px] font-bold text-slate-500 uppercase tracking-wider">
                            Estimate Requests
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                            <span className="text-[13.5px] font-black text-[#0066FF] tracking-tight">
                              +247
                            </span>
                            <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                              ↑ 62%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── 2. Live Inbound Estimate Request & Lead Verification Card (Fills Marked Red Area) ── */}
                  <div className="w-full md:w-[215px] lg:w-[225px] xl:w-[240px] shrink-0 rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-white/95 via-white/90 to-blue-50/30 backdrop-blur-xl border border-blue-100/90 shadow-[0_20px_50px_-12px_rgba(0,102,255,0.12),0_1px_1px_rgba(255,255,255,1)_inset] p-4 sm:p-4.5 flex flex-col justify-between relative overflow-hidden group hover:border-blue-200 transition-colors">
                    {/* Specular Edge */}
                    <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                    <div>
                      {/* Status Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Inbound
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">Just now</span>
                      </div>

                      {/* Primary Lead Snippet Box */}
                      <div className="rounded-2xl bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF]/70 border border-blue-100/80 p-3 mb-3 shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                            <PhoneIncoming className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[9.5px] font-extrabold text-[#0066FF] uppercase tracking-wider">
                              Estimate Request
                            </span>
                            <p className="text-[13px] font-extrabold text-slate-900 leading-tight mt-0.5 truncate">
                              Kitchen Remodel
                            </p>
                            <p className="text-[11px] font-bold text-emerald-600 mt-0.5">
                              $45,000 Est. Value
                            </p>
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-blue-100/60 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                          <span>Intent Score</span>
                          <span className="font-bold text-[#0066FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50">
                            9.8 / 10
                          </span>
                        </div>
                      </div>

                      {/* Quality Metrics */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                            Lead Type
                          </span>
                          <span className="font-bold text-slate-800">100% Exclusive</span>
                        </div>
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            Phone Verified
                          </span>
                          <span className="font-bold text-emerald-600">Homeowner</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Close Stat */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                        <Sparkles className="w-3 h-3 text-[#0066FF]" />
                        <span>Target Close</span>
                      </div>
                      <span className="text-[11.5px] font-black text-[#0066FF]">
                        1 in 3 Calls
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Flow Banner underneath dashboard */}
                <div className="mt-3.5 flex justify-start pl-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-100 shadow-[0_2px_12px_-2px_rgba(0,102,255,0.06)] text-[11.5px] sm:text-[12px] font-bold text-slate-700">
                    <span>More Calls</span>
                    <span className="text-[#0066FF] font-bold">→</span>
                    <span>More Estimates</span>
                    <span className="text-[#0066FF] font-bold">→</span>
                    <span>More Jobs</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ════════════════════════════════════════════════════
              RIGHT COLUMN: "WE HANDLE:" 10 SERVICE CARDS GRID & YOUR FOCUS
          ════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal delay={0.1} direction="left">
              <div className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-white/95 via-white/90 to-blue-50/25 backdrop-blur-2xl border border-white/95 shadow-[0_20px_60px_-15px_rgba(0,102,255,0.10),0_1px_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(219,234,254,0.7)] p-5 sm:p-7 xl:p-8 flex flex-col justify-between overflow-hidden">
                {/* Top Specular Edge Highlight */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                <div>
                  {/* Header: "We Handle:" with blue underline */}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-[28px] sm:text-[32px] xl:text-[36px] font-black text-[#0A1128] tracking-tight relative inline-block">
                      We Handle:
                      <ShortCurvedUnderline className="absolute -bottom-1.5 left-0 w-full h-[12px]" />
                    </h3>
                  </div>

                  {/* 10 Services Grid (3 columns on desktop, 1 on row 4) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 xl:gap-4">
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="group relative rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-[0_4px_16px_-4px_rgba(0,102,255,0.05),0_1px_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(219,234,254,0.6)] hover:shadow-[0_12px_28px_-6px_rgba(0,102,255,0.14),0_0_0_1px_rgba(147,197,253,0.9)] hover:-translate-y-1 transition-all duration-300 p-4 xl:p-4.5 flex flex-col justify-between min-h-[110px] xl:min-h-[118px] overflow-hidden"
                        >
                          {/* Inner subtle specular light */}
                          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                          {/* 3D Icon Container */}
                          <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-xl bg-gradient-to-b from-[#F0F6FF] via-[#F4F9FF] to-[#DBEAFE] border border-[#BFDBFE]/80 flex items-center justify-center text-[#0066FF] shadow-2xs group-hover:scale-105 group-hover:bg-[#EFF6FF] transition-all">
                            <Icon className="w-5 h-5 text-[#0066FF]" />
                          </div>

                          {/* Title */}
                          <p className="text-[14.5px] xl:text-[15px] font-bold text-[#0F172A] leading-snug mt-2.5 sm:mt-3">
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom "Your Focus" Banner */}
                <div className="mt-6 sm:mt-7 xl:mt-8 rounded-[20px] bg-gradient-to-r from-blue-50/85 via-white to-blue-50/70 border border-blue-200/80 p-4 sm:p-4.5 xl:p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* User Avatar Circle */}
                    <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0 shadow-2xs">
                      <User className="w-5 h-5 xl:w-5.5 xl:h-5.5 text-[#0066FF]" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] sm:text-[11.5px] font-extrabold text-[#0066FF] uppercase tracking-wider">
                        Your Focus
                      </span>
                      <p className="text-[14.5px] sm:text-[15.5px] xl:text-[16px] font-bold text-[#0A1128] leading-snug mt-0.5">
                        You focus on answering the phone,{" "}
                        <span className="relative inline-block text-[#0A1128]">
                          giving estimates, and closing work.
                          <FocusCurvedUnderline className="absolute -bottom-1 left-0 w-full h-[10px]" />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2.5">
                    <PhoneSwoopArrow className="w-10 h-5 text-[#0066FF] hidden sm:block" />
                    <RingingPhone />
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

export default Offer;
