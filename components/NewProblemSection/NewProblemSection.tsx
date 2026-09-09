'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import MiddleCardImg from '@/public/NewProblemSection/MiddleCard.webp';
import Link from 'next/link';
import {
  Calendar,
  Phone,
  Layers,
  Users,
  HardHat,
  AlertTriangle,
  Check,
  ArrowRight,
  User,
} from 'lucide-react';

/* ─── Scroll Reveal Wrapper ───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const initial =
    direction === 'up'
      ? { opacity: 0, y: 28 }
      : direction === 'down'
        ? { opacity: 0, y: -20 }
        : direction === 'left'
          ? { opacity: 0, x: -28 }
          : direction === 'right'
            ? { opacity: 0, x: 28 }
            : { opacity: 0 };
  const animate = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Underline Under "predictability problem." ────────────────────────── */
function SingleCurvedUnderline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 18"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 3 8 C 75 16, 230 16, 337 6"
        stroke="#0066FF"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Underline Under "your own." ──────────────────────────────────────── */
function YourOwnUnderline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 14"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 2 7 C 30 12, 85 12, 116 6"
        stroke="#0066FF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Connecting Flow Arrow ────────────────────────────────────────────── */
function FlowArrow({ className = '' }: { className?: string }) {
  return (
    <div className={`hidden lg:flex items-center justify-center px-0.5 xl:px-1 shrink-0 self-center ${className}`}>
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 2 7 L 17 7"
          stroke="#0066FF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 12 2.5 L 17.5 7 L 12 11.5"
          stroke="#0066FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ─── Pipeline Alert Icon ──────────────────────────────────────────────── */
function PipelineAlertIcon({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 54" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Pipe Body with Flanges */}
      <rect x="5" y="24" width="4" height="13" rx="2" stroke="#0066FF" strokeWidth="2.2" fill="#EFF6FF" />
      <path
        d="M 9 27 L 24 27 C 32 27, 37 22, 37 14 L 37 5"
        stroke="#0066FF"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 9 34 L 24 34 C 38 34, 44 24, 44 14 L 44 5"
        stroke="#0066FF"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="34" y="2" width="13" height="4" rx="2" stroke="#0066FF" strokeWidth="2.2" fill="#EFF6FF" />

      {/* Alert Triangle Badge */}
      <path
        d="M 40 31 L 49.5 47 C 50.3 48.3, 49.3 50, 47.8 50 L 28.8 50 C 27.3 50, 26.3 48.3, 27.1 47 L 36.6 31 C 37.4 29.7, 39.2 29.7, 40 31 Z"
        fill="#0066FF"
      />
      <circle cx="38.3" cy="46" r="1.3" fill="white" />
      <path d="M 38.3 37 L 38.3 42.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT (FULL-WIDTH EXPANSIVE DESIGN)
═══════════════════════════════════════════════════════════════════════ */
export default function NewProblemSection() {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-[#FAFCFF] via-[#F4F8FF] to-[#FAFCFF] py-20 sm:py-24 lg:py-28 overflow-hidden"
      aria-label="The Real Problem"
    >
      {/* ── Ambient Radial Glows for 3D Depth ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1400px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.08)_0%,rgba(0,102,255,0.02)_50%,transparent_75%)] rounded-full blur-[50px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-100/35 rounded-full blur-[100px]" />
        <div className="absolute -top-12 left-10 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[80px]" />
        <div className="absolute -bottom-12 right-10 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[80px]" />
      </div>

      {/* ── Wide Architectural Framing Arc Line ── */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none -z-0 overflow-hidden" aria-hidden>
        <svg
          viewBox="0 0 1920 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto opacity-75"
        >
          <path
            d="M -100 45 C 450 240, 1470 240, 2020 45"
            stroke="#D6E6FE"
            strokeWidth="1.6"
          />
        </svg>
      </div>

      {/* ── Full-Width Section Content Container (NO max-width constraint) ── */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-14">

        {/* ══════════════════════════════════════════════════════
            1. SECTION HEADER
        ══════════════════════════════════════════════════════ */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">

          {/* Eyebrow badge */}
          <Reveal delay={0} direction="none">
            <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#CFE2FF] shadow-[0_4px_16px_rgba(0,102,255,0.06)] mb-5 sm:mb-6">
              <AlertTriangle className="w-3.5 h-3.5 text-[#0066FF] fill-[#0066FF]/20" />
              <span className="text-[13px] sm:text-[13.5px] font-semibold text-[#0066FF] tracking-wide">
                The Real Problem
              </span>
            </div>
          </Reveal>

          {/* Main Headline: Two lines on desktop */}
          <Reveal delay={0.06} direction="up">
            <h2 className="text-[34px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-black tracking-[-0.035em] text-[#0B132B] leading-[1.08] max-w-5xl mx-auto">
              Most Contractors Don&rsquo;t Actually
              <br />
              Have A Lead Problem.
            </h2>
          </Reveal>

          {/* Subheading: "They have a predictability problem." */}
          <Reveal delay={0.12} direction="up">
            <p className="mt-4 sm:mt-5 text-[19px] sm:text-[25px] md:text-[29px] font-medium text-slate-800 leading-snug">
              They have a{' '}
              <span className="relative inline-block text-[#0066FF] font-bold">
                predictability problem.
                <SingleCurvedUnderline className="absolute -bottom-2 left-0 w-full h-[15px]" />
              </span>
            </p>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════════════════════
            2. FIVE-COLUMN FLOW ROW (EXPANDED TO FULL WIDTH)
        ══════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-2 xl:gap-3 2xl:gap-3.5 w-full">

          {/* ── CARD 1: Some months referrals are great ── */}
          <Reveal delay={0.08} direction="up" className="w-full lg:flex-1 min-w-0">
            <div className="group relative h-full min-h-[350px] lg:min-h-[360px] xl:min-h-[375px] rounded-[26px] xl:rounded-[30px] bg-gradient-to-b from-white/95 via-white/85 to-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_28px_-6px_rgba(0,102,255,0.07),0_20px_45px_-12px_rgba(15,23,42,0.08),0_1px_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(219,234,254,0.6)] hover:shadow-[0_28px_65px_-10px_rgba(0,102,255,0.20),0_0_0_1px_rgba(96,165,250,0.7)] hover:-translate-y-2 transition-all duration-300 ease-out p-5 xl:p-6 flex flex-col justify-between overflow-hidden">
              {/* Specular Edge Highlight */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
              {/* Internal Refractive Glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Blue Calendar Icon Container */}
                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-2xl bg-[#EFF6FF] border border-[#D5E6FF] flex items-center justify-center text-[#0066FF] mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5 xl:w-5.5 xl:h-5.5" />
                </div>
                {/* Headline */}
                <h3 className="text-[15.5px] xl:text-[16.5px] 2xl:text-[17.5px] font-bold text-slate-900 leading-[1.3]">
                  Some months<br />referrals are great.
                </h3>
                {/* Body */}
                <p className="mt-1.5 text-[12px] xl:text-[12.5px] text-slate-500 leading-relaxed">
                  You get busy. The phone rings.<br />You&rsquo;re on site. It feels good.
                </p>
              </div>

              {/* Bottom Dashboard Widget: Compact & Wide SaaS Area Chart */}
              <div className="mt-4 rounded-2xl bg-gradient-to-b from-white to-[#F8FAFC] border border-[#E2EEFE] p-3 xl:p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-[10.5px] font-bold shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Lots of work
                  </span>
                  <span className="text-[10.5px] font-semibold text-emerald-600">
                    +42% MoM
                  </span>
                </div>

                {/* Upward Line Chart */}
                <div className="relative w-full h-14 xl:h-16">
                  <svg viewBox="0 0 240 60" fill="none" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="goodChartGradWide" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.22" />
                        <stop offset="60%" stopColor="#0066FF" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <line x1="0" y1="15" x2="240" y2="15" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="35" x2="240" y2="35" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="55" x2="240" y2="55" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />

                    <path
                      d="M 8 50 C 35 42, 60 52, 95 34 C 130 18, 160 32, 195 14 C 215 5, 228 10, 235 4 L 235 60 L 8 60 Z"
                      fill="url(#goodChartGradWide)"
                    />

                    <path
                      d="M 8 50 C 35 42, 60 52, 95 34 C 130 18, 160 32, 195 14 C 215 5, 228 10, 235 4"
                      stroke="#0066FF"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />

                    <circle cx="8" cy="50" r="3" fill="white" stroke="#0066FF" strokeWidth="2.2" />
                    <circle cx="95" cy="34" r="3" fill="white" stroke="#0066FF" strokeWidth="2.2" />
                    <circle cx="195" cy="14" r="3" fill="white" stroke="#0066FF" strokeWidth="2.2" />
                    <circle cx="235" cy="4" r="3.5" fill="#0066FF" stroke="white" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Flow Arrow 1 */}
          <FlowArrow />

          {/* ── CARD 2: Some months the phone barely rings ── */}
          <Reveal delay={0.14} direction="up" className="w-full lg:flex-1 min-w-0">
            <div className="group relative h-full min-h-[350px] lg:min-h-[360px] xl:min-h-[375px] rounded-[26px] xl:rounded-[30px] bg-gradient-to-b from-white/95 via-white/85 to-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_28px_-6px_rgba(0,102,255,0.07),0_20px_45px_-12px_rgba(15,23,42,0.08),0_1px_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(219,234,254,0.6)] hover:shadow-[0_28px_65px_-10px_rgba(0,102,255,0.20),0_0_0_1px_rgba(96,165,250,0.7)] hover:-translate-y-2 transition-all duration-300 ease-out p-5 xl:p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Blue Phone Icon Container */}
                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-2xl bg-[#EFF6FF] border border-[#D5E6FF] flex items-center justify-center text-[#0066FF] mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 xl:w-5.5 xl:h-5.5" />
                </div>
                {/* Headline */}
                <h3 className="text-[15.5px] xl:text-[16.5px] 2xl:text-[17.5px] font-bold text-slate-900 leading-[1.3]">
                  Some months<br />the phone barely rings.
                </h3>
                {/* Body */}
                <p className="mt-1.5 text-[12px] xl:text-[12.5px] text-slate-500 leading-relaxed">
                  No calls. No form fills.<br />Just silence.
                </p>
              </div>

              {/* Bottom Dashboard Widget: Flatline Chart */}
              <div className="mt-4 rounded-2xl bg-gradient-to-b from-white to-[#F8FAFC] border border-[#E2EEFE] p-3 xl:p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1F2] border border-[#FECDD3] text-[#E11D48] text-[10.5px] font-bold shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    Slow month
                  </span>
                  <span className="text-[10.5px] font-semibold text-rose-500">
                    -68% drop
                  </span>
                </div>

                {/* Drop & Flatline Curve */}
                <div className="relative w-full h-14 xl:h-16">
                  <svg viewBox="0 0 240 60" fill="none" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="slowChartGradWide" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <line x1="0" y1="15" x2="240" y2="15" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="35" x2="240" y2="35" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                    <line x1="0" y1="55" x2="240" y2="55" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />

                    <path
                      d="M 8 18 C 35 22, 60 46, 95 48 C 135 50, 175 46, 205 47 C 220 45, 230 48, 235 47 L 235 60 L 8 60 Z"
                      fill="url(#slowChartGradWide)"
                    />

                    <path
                      d="M 8 18 C 35 22, 60 46, 95 48 C 135 50, 175 46, 205 47 C 220 45, 230 48, 235 47"
                      stroke="#0066FF"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />

                    <circle cx="8" cy="18" r="3" fill="white" stroke="#0066FF" strokeWidth="2.2" />
                    <circle cx="95" cy="48" r="3" fill="white" stroke="#0066FF" strokeWidth="2.2" />
                    <circle cx="175" cy="47" r="3" fill="white" stroke="#0066FF" strokeWidth="2.2" />
                    <circle cx="235" cy="47" r="3" fill="white" stroke="#0066FF" strokeWidth="2.2" />
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Flow Arrow 2 */}
          <FlowArrow />

          {/* ── CARD 3 (CENTER VISUAL): Distressed Contractor with Floating Badges ── */}
          <Reveal delay={0.2} direction="up" className="w-full lg:flex-[1.28] xl:flex-[1.32] 2xl:flex-[1.36] min-w-0 self-center">
            <div className="group relative h-full min-h-[350px] lg:min-h-[360px] xl:min-h-[375px] rounded-[28px] xl:rounded-[32px] overflow-hidden bg-gradient-to-b from-white/95 via-blue-50/40 to-white/80 backdrop-blur-2xl border border-blue-200/80 shadow-[0_20px_55px_-10px_rgba(0,102,255,0.18),0_1px_2px_rgba(255,255,255,1)_inset] hover:shadow-[0_30px_75px_-12px_rgba(0,102,255,0.26)] hover:-translate-y-2.5 transition-all duration-300 ease-out p-2 flex items-center justify-center">
              {/* Radial Halo glow inside card */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,102,255,0.12)_0%,transparent_65%)] pointer-events-none" />

              <div className="relative w-full h-full rounded-[22px] xl:rounded-[26px] overflow-hidden bg-white/50 flex items-center justify-center">
                <Image
                  src={MiddleCardImg}
                  alt="Frustrated contractor surrounded by Angi, HomeAdvisor, and Thumbtack platform fees"
                  className="w-full h-auto max-h-[340px] xl:max-h-[360px] object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </Reveal>

          {/* Flow Arrow 3 */}
          <FlowArrow />

          {/* ── CARD 4: So you try Angi. HomeAdvisor. Thumbtack ── */}
          <Reveal delay={0.26} direction="up" className="w-full lg:flex-1 min-w-0">
            <div className="group relative h-full min-h-[350px] lg:min-h-[360px] xl:min-h-[375px] rounded-[26px] xl:rounded-[30px] bg-gradient-to-b from-white/95 via-white/85 to-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_28px_-6px_rgba(0,102,255,0.07),0_20px_45px_-12px_rgba(15,23,42,0.08),0_1px_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(219,234,254,0.6)] hover:shadow-[0_28px_65px_-10px_rgba(0,102,255,0.20),0_0_0_1px_rgba(96,165,250,0.7)] hover:-translate-y-2 transition-all duration-300 ease-out p-5 xl:p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Blue Layers Icon Container */}
                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-2xl bg-[#EFF6FF] border border-[#D5E6FF] flex items-center justify-center text-[#0066FF] mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5 xl:w-5.5 xl:h-5.5" />
                </div>
                {/* Headline */}
                <h3 className="text-[15.5px] xl:text-[16.5px] 2xl:text-[17.5px] font-bold text-slate-900 leading-[1.3]">
                  So you try Angi.<br />HomeAdvisor. Thumbtack.
                </h3>
                {/* Body */}
                <p className="mt-1.5 text-[12px] xl:text-[12.5px] text-slate-500 leading-relaxed">
                  Maybe another lead company<br />promising &ldquo;exclusive leads&rdquo;.
                </p>
              </div>

              {/* Bottom Feature List Pills */}
              <div className="mt-4 space-y-2">
                {[
                  'Paying for generic leads',
                  'High cost per lead',
                  'No real control',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F0F6FF]/95 hover:bg-[#E6F0FF] border border-[#D0E2FF] shadow-2xs transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                      <span className="text-[12px] xl:text-[12.5px] font-semibold text-slate-800">
                        {item}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#0066FF] font-bold">›</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Flow Arrow 4 */}
          <FlowArrow />

          {/* ── CARD 5: Shared leads distribution ── */}
          <Reveal delay={0.32} direction="up" className="w-full lg:flex-1 min-w-0">
            <div className="group relative h-full min-h-[350px] lg:min-h-[360px] xl:min-h-[375px] rounded-[26px] xl:rounded-[30px] bg-gradient-to-b from-white/95 via-white/85 to-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_28px_-6px_rgba(0,102,255,0.07),0_20px_45px_-12px_rgba(15,23,42,0.08),0_1px_1px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(219,234,254,0.6)] hover:shadow-[0_28px_65px_-10px_rgba(0,102,255,0.20),0_0_0_1px_rgba(96,165,250,0.7)] hover:-translate-y-2 transition-all duration-300 ease-out p-5 xl:p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Blue Users Icon Container */}
                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-2xl bg-[#EFF6FF] border border-[#D5E6FF] flex items-center justify-center text-[#0066FF] mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5 xl:w-5.5 xl:h-5.5" />
                </div>
                {/* Headline */}
                <h3 className="text-[14.5px] xl:text-[15.5px] 2xl:text-[16.5px] font-bold text-slate-900 leading-[1.3]">
                  And now you&rsquo;re paying for homeowners who filled out five forms and are getting called by five contractors.
                </h3>
                {/* Body */}
                <p className="mt-1 text-[11.5px] xl:text-[12px] text-slate-400 italic">
                  That&rsquo;s not really an asset.
                </p>
              </div>

              {/* Bottom Widget: Multi-contractor lead competition diagram */}
              <div className="mt-4 rounded-2xl bg-[#F8FAFC] border border-[#DCE8FC] p-3 xl:p-3.5 shadow-2xs">
                {/* Homeowners Row */}
                <div className="flex justify-between items-center px-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-full bg-[#DCEBFF] border border-[#BFDBFE] flex items-center justify-center text-[#0066FF] shadow-2xs"
                    >
                      <User className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>

                {/* Branching connecting network lines */}
                <svg viewBox="0 0 200 30" fill="none" className="w-full h-6 my-1">
                  <line x1="25" y1="2" x2="75" y2="28" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="3 2" />
                  <line x1="75" y1="2" x2="75" y2="28" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="3 2" />
                  <line x1="125" y1="2" x2="125" y2="28" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="3 2" />
                  <line x1="175" y1="2" x2="125" y2="28" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="3 2" />
                  <line x1="75" y1="2" x2="25" y2="28" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="3 2" />
                  <line x1="125" y1="2" x2="175" y2="28" stroke="#94A3B8" strokeWidth="1.3" strokeDasharray="3 2" />
                </svg>

                {/* Contractors Row */}
                <div className="flex justify-between items-center px-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 xl:w-7.5 xl:h-7.5 rounded-full bg-[#0066FF] border border-blue-600 flex items-center justify-center text-white shadow-2xs"
                    >
                      <HardHat className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        {/* ══════════════════════════════════════════════════════
            3. BOTTOM CTA BANNER (EXPANSIVE FROSTED GLASS PILL)
        ══════════════════════════════════════════════════════ */}
        <Reveal delay={0.24} direction="up" className="mt-16 sm:mt-20 lg:mt-24">
          <div className="relative w-full max-w-[1140px] xl:max-w-[1240px] mx-auto rounded-full bg-white/90 backdrop-blur-2xl border border-[#D5E5FE] shadow-[0_25px_65px_-15px_rgba(0,102,255,0.11),0_1px_1px_rgba(255,255,255,1)_inset] px-8 sm:px-12 py-5 sm:py-6 overflow-hidden">
            {/* Top Specular Line Highlight */}
            <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">

              {/* Left: Pipeline Alert Icon + Copy */}
              <div className="flex items-center gap-5 sm:gap-6 flex-1 min-w-0 text-center sm:text-left">
                {/* Pipeline Icon */}
                <div className="shrink-0 hidden min-[520px]:flex p-2.5 rounded-2xl bg-blue-50/80 border border-blue-100 shadow-2xs">
                  <PipelineAlertIcon className="w-12 h-12 xl:w-13 xl:h-13" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-[19px] sm:text-[23px] md:text-[25px] font-black text-slate-900 tracking-tight leading-tight">
                    You&rsquo;re renting somebody else&rsquo;s pipeline.
                  </p>
                  <p className="mt-1 text-[15px] sm:text-[17.5px] text-slate-600 font-medium">
                    We help you build{' '}
                    <span className="relative inline-block text-[#0066FF] font-bold">
                      your own.
                      <YourOwnUnderline className="absolute -bottom-1 left-0 w-full h-[12px]" />
                    </span>
                  </p>
                </div>
              </div>

              {/* Right: Glowing Blue CTA Pill Button */}
              <div className="shrink-0">
                <Link
                  href="/contact"
                  id="problem-section-cta"
                  className="group inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-[14.5px] sm:text-[15.5px] shadow-[0_10px_28px_rgba(0,102,255,0.38)] hover:shadow-[0_14px_34px_rgba(0,102,255,0.48)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  <span>Build Your Own Pipeline</span>
                  <ArrowRight className="w-4.5 h-4.5 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
