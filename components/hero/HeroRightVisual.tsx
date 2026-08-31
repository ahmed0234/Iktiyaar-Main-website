"use client";

import React from "react";
import { motion } from "motion/react";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import { GoogleGLogo, GoogleAdsLogo, GoogleMicIcon } from "./HeroLogos";
import { Hero3DBars, HeroSwoopArrow, DotGrid } from "./Hero3DVisuals";

// Keywords table data
const topKeywords = [
  { keyword: "kitchen remodel contractor", clicks: "298" },
  { keyword: "bathroom renovation", clicks: "214" },
  { keyword: "home addition contractor", clicks: "185" },
  { keyword: "basement finishing", clicks: "142" },
  { keyword: "custom deck builder", clicks: "98" },
];

// Conversion bar chart heights
const barHeights = [35, 65, 30, 85, 45, 95, 40, 75, 55, 90, 60, 80, 100, 70];

export default function HeroRightVisual() {
  return (
    <div className="relative w-full mx-auto flex items-center justify-center select-none py-10 lg:py-6 px-4 sm:px-8">
      {/* ─── ATMOSPHERIC INTEGRATION LAYERS (BLENDING INTO HERO BACKGROUND) ─── */}
      <div className="absolute -top-16 -right-16 w-[480px] h-[480px] bg-gradient-to-br from-blue-400/20 via-sky-300/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-16 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/15 via-indigo-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-16 right-10 w-[420px] h-[420px] bg-gradient-to-tl from-sky-400/15 via-blue-300/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Dot Grid Arrays in background */}
      <DotGrid
        className="absolute -top-8 -right-6 hidden md:grid opacity-40 pointer-events-none -z-10"
        rows={8}
        cols={7}
      />
      <DotGrid
        className="absolute -bottom-8 -left-8 hidden md:grid opacity-35 pointer-events-none -z-10"
        rows={7}
        cols={6}
      />

      {/* ─── MAIN 3D FLOATING SYSTEM CANVAS ─── */}
      <div className="relative w-full max-w-[620px] xl:max-w-[660px]">
        {/* ─── 1. CENTRAL DASHBOARD (TALLER & SEAMLESSLY INTEGRATED) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/90 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.07),0_0_45px_rgba(59,130,246,0.06)] p-3.5 sm:p-7 flex flex-col justify-between min-h-[430px] sm:min-h-[630px] xl:min-h-[660px] relative overflow-hidden"
        >
          {/* Subtle Top Glass Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

          {/* Dashboard Header Bar */}
          <div>
            <div className="flex items-center justify-between pb-2.5 sm:pb-4 mb-2.5 sm:mb-4 border-b border-slate-100/80">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-xs sm:text-[14px] font-bold text-slate-800 ml-1.5 sm:ml-2">
                  Google Ads Performance
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-50/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-slate-100 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Tracking
              </div>
            </div>

            {/* 4 KPI Metric Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-2 sm:mb-6">
              {/* Clicks */}
              <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md border border-slate-100/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">Clicks</span>
                <span className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  1,284
                </span>
                <div className="inline-flex items-center gap-0.5 text-[9.5px] sm:text-[10.5px] font-bold text-emerald-600 mt-0.5 sm:mt-1">
                  <ArrowUp className="w-2.5 h-2.5" />
                  <span>32%</span>
                </div>
              </div>

              {/* Conversions */}
              <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md border border-slate-100/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                  Conversions
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  142
                </span>
                <div className="inline-flex items-center gap-0.5 text-[9.5px] sm:text-[10.5px] font-bold text-emerald-600 mt-0.5 sm:mt-1">
                  <ArrowUp className="w-2.5 h-2.5" />
                  <span>28%</span>
                </div>
              </div>

              {/* Cost / Conv */}
              <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md border border-slate-100/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                  Cost / Conv.
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  $49.21
                </span>
                <div className="inline-flex items-center gap-0.5 text-[9.5px] sm:text-[10.5px] font-bold text-emerald-600 mt-0.5 sm:mt-1">
                  <ArrowDown className="w-2.5 h-2.5" />
                  <span>16%</span>
                </div>
              </div>

              {/* ROAS */}
              <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md border border-slate-100/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.02)] flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">ROAS</span>
                <span className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  6.71x
                </span>
                <div className="inline-flex items-center gap-0.5 text-[9.5px] sm:text-[10.5px] font-bold text-emerald-600 mt-0.5 sm:mt-1">
                  <ArrowUp className="w-2.5 h-2.5" />
                  <span>35%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Smooth SVG Line Chart with Responsive Height */}
          <div className="relative w-full h-32 sm:h-52 lg:h-56 my-auto pt-1 pb-1 sm:pt-2 sm:pb-2">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 160"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="mainChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Subtle Grid Lines */}
              <line
                x1="0"
                y1="35"
                x2="500"
                y2="35"
                stroke="#F1F5F9"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="85"
                x2="500"
                y2="85"
                stroke="#F1F5F9"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1="130"
                x2="500"
                y2="130"
                stroke="#F1F5F9"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Area Fill */}
              <path
                d="M 0 110 Q 60 75, 120 95 T 240 55 T 360 65 T 440 30 T 500 25 L 500 160 L 0 160 Z"
                fill="url(#mainChartGrad)"
              />

              {/* Glowing Spline Line */}
              <path
                d="M 0 110 Q 60 75, 120 95 T 240 55 T 360 65 T 440 30 T 500 25"
                fill="none"
                stroke="#0066FF"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Active Data Nodes */}
              <circle cx="60" cy="85" r="4.5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="3" />
              <circle cx="120" cy="95" r="4.5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="3" />
              <circle cx="180" cy="65" r="4.5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="3" />
              <circle cx="240" cy="55" r="4.5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="3" />
              <circle cx="300" cy="80" r="4.5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="3" />
              <circle cx="360" cy="65" r="4.5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="3" />
              <circle cx="440" cy="30" r="5.5" fill="#FFFFFF" stroke="#0066FF" strokeWidth="3.5" />
            </svg>
          </div>

          {/* Daily Conversion Distribution Bar Graph */}
          <div className="flex items-end justify-between gap-1 sm:gap-2 h-12 sm:h-20 pt-2 sm:pt-3 border-t border-slate-100/80">
            {barHeights.map((h, i) => (
              <div
                key={i}
                className="w-full bg-blue-100/80 hover:bg-[#0066FF] rounded-t-sm transition-colors duration-200 cursor-pointer"
                style={{
                  height: `${h}%`,
                  background:
                    i === 5 || i === 8 || i === 12
                      ? "linear-gradient(180deg, #0066FF 0%, #3B82F6 100%)"
                      : undefined,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ─── 2. FLOATING CHANNEL TAGS (Positioned cleanly on Top-Left corner) ─── */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-5 -left-2 sm:-top-10 sm:-left-8 z-30 flex flex-col items-center gap-1.5 sm:gap-2.5"
        >
          {/* Google Ads Tag */}
          <div className="flex flex-col items-center px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.12)]">
            <GoogleAdsLogo className="w-5 h-5 sm:w-6.5 sm:h-6.5" />
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 mt-0.5 sm:mt-1">Google Ads</span>
          </div>
          {/* Dashed connector down to SEO */}
          <div className="h-2.5 sm:h-3 w-px border-l-2 border-dashed border-blue-300/80" />
          {/* SEO Tag */}
          <div className="flex flex-col items-center px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_10px_30px_-5px_rgba(37,99,235,0.12)]">
            <div className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF]">
              <Search className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 mt-0.5">SEO</span>
          </div>
        </motion.div>

        {/* ─── 3. FLOATING "LEADS FROM GOOGLE" (Cleanly on Top-Right Corner) ─── */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-6 -right-2 sm:-top-12 sm:-right-6 z-30 w-36 sm:w-52 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_15px_40px_-8px_rgba(37,99,235,0.14)]"
        >
          <span className="text-[9.5px] sm:text-[11px] font-semibold text-slate-500 block">
            Leads From Google
          </span>
          <span className="text-lg sm:text-2xl font-extrabold text-[#0066FF] block mt-0.5">
            +167%
          </span>
          {/* Mini Sparkline Chart */}
          <div className="w-full h-6 sm:h-9 mt-0.5 sm:mt-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 160 40">
              <path
                d="M 0 35 L 30 28 L 60 32 L 90 18 L 120 22 L 155 8"
                fill="none"
                stroke="#0066FF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="30" cy="28" r="3" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
              <circle cx="60" cy="32" r="3" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
              <circle cx="90" cy="18" r="3" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
              <circle cx="120" cy="22" r="3" fill="#FFFFFF" stroke="#0066FF" strokeWidth="2" />
              <circle cx="155" cy="8" r="4" fill="#0066FF" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>
        </motion.div>

        {/* ─── 4. FLOATING "LEAD QUALITY" DONUT CARD (Cleanly on Left Outer Margin) ─── */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[44%] -left-2 sm:-left-12 lg:-left-14 -translate-y-1/2 z-30 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_15px_40px_-8px_rgba(37,99,235,0.14)] flex flex-col items-center"
        >
          <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-700 mb-1 sm:mb-1.5">Lead Quality</span>
          {/* Donut Chart SVG */}
          <div className="relative w-11 h-11 sm:w-17 sm:h-17 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                stroke="currentColor"
                strokeWidth="3.8"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#0066FF]"
                stroke="currentColor"
                strokeWidth="3.8"
                strokeDasharray="92, 100"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs sm:text-base font-extrabold text-[#0066FF]">
              92%
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[10px] font-medium text-slate-500 mt-1 sm:mt-1.5">
            High Quality Leads
          </span>
        </motion.div>

        {/* ─── 5. FLOATING "TOP PERFORMING KEYWORDS" (Cleanly on Right Outer Margin) ─── */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[38%] -right-2 sm:-right-12 lg:-right-14 -translate-y-1/2 z-30 w-38 sm:w-56 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_15px_40px_-8px_rgba(37,99,235,0.14)]"
        >
          <div className="flex items-center justify-between pb-1 sm:pb-2 mb-1 sm:mb-2 border-b border-slate-100">
            <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-800">
              Top Performing Keywords
            </span>
            <span className="text-[8.5px] sm:text-[10px] font-semibold text-slate-400">Clicks</span>
          </div>
          <div className="space-y-1 sm:space-y-1.5">
            {topKeywords.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[9px] sm:text-[11px] leading-tight"
              >
                <span className="text-slate-600 truncate pr-1 sm:pr-2">{item.keyword}</span>
                <span className="font-bold text-slate-900 shrink-0">{item.clicks}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── 6. FLOATING LIVE GOOGLE SEARCH & AD PREVIEW (Bottom-Right Corner) ─── */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-6 -right-1 sm:-bottom-10 sm:-right-6 z-30 w-[215px] sm:w-76 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-xl border border-white/95 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.12)]"
        >
          {/* Search Simulation Input */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-50/90 border border-slate-200/90 text-xs text-slate-700 mb-1.5 sm:mb-2.5 shadow-inner">
            <GoogleGLogo className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate font-medium text-[9.5px] sm:text-[11px]">
              kitchen remodeling near me
            </span>
            <GoogleMicIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-auto shrink-0" />
          </div>

          {/* Google Ad Result Snippet */}
          <div className="space-y-0.5 sm:space-y-1 text-left">
            <div className="flex items-center gap-1 text-[9.5px] sm:text-[10.5px] text-slate-500 font-medium">
              <span className="font-bold text-slate-800">Ad</span>
              <span>·</span>
              <span className="text-slate-600">yourcontractor.com</span>
            </div>
            <h4 className="text-[11px] sm:text-[13px] font-bold text-[#1a0dab] hover:underline cursor-pointer leading-snug">
              Kitchen Remodeling Experts
            </h4>
            <p className="text-[9.5px] sm:text-[11px] font-semibold text-slate-800 leading-tight">
              Free Estimate – Licensed & Insured
            </p>
            <p className="text-[8.5px] sm:text-[10px] text-slate-500 leading-tight">
              Get a quote today. Trusted by homeowners across your area.
            </p>
            {/* Skeletal lines */}
            <div className="pt-1 space-y-0.5 sm:pt-1.5 sm:space-y-1">
              <div className="w-full h-0.5 sm:h-1 bg-slate-100 rounded-full" />
              <div className="w-4/5 h-0.5 sm:h-1 bg-slate-100 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* ─── 7. 3D ASCENDING PILLARS & SWOOP ARROW (Bottom-Left Corner) ─── */}
        <div className="absolute -bottom-5 -left-1 sm:-bottom-10 sm:-left-7 z-20 flex items-end scale-75 sm:scale-100 origin-bottom-left">
          <HeroSwoopArrow className="w-16 h-20 sm:w-20 sm:h-24 -mr-5 -mb-2" />
          <Hero3DBars className="-ml-3" />
        </div>
      </div>
    </div>
  );
}
