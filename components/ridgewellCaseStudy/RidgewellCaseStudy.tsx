"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  MapPin,
  X,
  Check,
  User,
  DollarSign,
  Star,
  ArrowRight,
  Phone,
  FileText,
  MessageSquare,
  ShieldCheck,
  Maximize2,
  TrendingUp,
  BarChart3,
  Globe,
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
/*  Curved underline SVG for "Here's What That Looks Like..."          */
/* ------------------------------------------------------------------ */
function CurvedUnderlineWide({ className = "" }: { className?: string }) {
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
/*  Curved underline SVG for "Big impact"                              */
/* ------------------------------------------------------------------ */
function CurvedUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 12"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M3 8C40 2.5 90 2.5 137 7.5"
        stroke="#0062FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Curved hand-drawn sketch arrow (Top-Right of Results)             */
/* ------------------------------------------------------------------ */
function CurvedSketchArrow() {
  return (
    <div className="absolute -top-7 right-2 sm:right-6 lg:right-10 pointer-events-none select-none z-10 hidden sm:block">
      <svg
        width="54"
        height="46"
        viewBox="0 0 54 46"
        fill="none"
        className="w-12 h-10 lg:w-[54px] lg:h-[46px] drop-shadow-[0_2px_6px_rgba(0,98,255,0.3)]"
      >
        <path
          d="M 6 42 C 10 20, 24 8, 46 6"
          stroke="#0062FF"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M 33 6 L 47 6 L 47 20"
          stroke="#0062FF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Eyebrows                                                  */
/* ------------------------------------------------------------------ */
function ResultsEyebrow() {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 mb-2.5">
      <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-5 h-px bg-blue-300" />
      <span className="text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.2em] text-[#0062FF] uppercase px-1">
        The Results
      </span>
      <div className="w-5 h-px bg-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-blue-300" />
    </div>
  );
}

function ProofEyebrow() {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 mb-3">
      <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-5 h-px bg-blue-300" />
      <span className="text-[12px] sm:text-[13px] font-extrabold tracking-[0.22em] text-[#0062FF] uppercase px-1">
        The Proof
      </span>
      <div className="w-5 h-px bg-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-blue-300" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Enhanced 3D Floating Circular Dish Icons                           */
/* ------------------------------------------------------------------ */
function DishIcon({ type }: { type: "clicks" | "cpc" | "conversions" | "costPerConversion" }) {
  return (
    <div className="relative w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-full p-[3.5px] bg-gradient-to-b from-white via-blue-100 to-blue-200/80 shadow-[0_14px_28px_-4px_rgba(0,80,220,0.28),0_6px_12px_-2px_rgba(15,23,42,0.07),inset_0_3px_5px_rgba(255,255,255,1),inset_0_-3px_5px_rgba(180,210,255,0.75)] border border-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_18px_34px_-3px_rgba(0,80,220,0.36)]">
      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#F4F8FF] to-[#DFEDFF] flex items-center justify-center shadow-[inset_0_2.5px_5px_rgba(0,70,220,0.09),inset_0_-2px_3px_rgba(255,255,255,0.95)]">
        {type === "clicks" && (
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" className="translate-x-0.5 -translate-y-0.5 drop-shadow-[0_3px_6px_rgba(0,98,255,0.35)]">
            <path
              d="M6.5 6L23 13L15.5 16L12.5 23.5L6.5 6Z"
              fill="url(#clicks-grad-lg)"
              stroke="#0047C7"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M15.5 16L9.5 9"
              stroke="#DBEAFE"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="clicks-grad-lg" x1="6.5" y1="6" x2="23" y2="23.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#0047C7" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {type === "cpc" && (
          <span className="text-[29px] sm:text-[32px] font-black text-[#0052EA] leading-none drop-shadow-[0_2px_5px_rgba(0,80,220,0.3)] select-none">
            $
          </span>
        )}

        {type === "conversions" && (
          <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#2563EB] to-[#0047C7] flex items-center justify-center shadow-[0_4px_9px_rgba(0,98,255,0.42),inset_0_1.5px_2px_rgba(255,255,255,0.75)] border border-blue-300">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 7.2L6 9.5L10.5 4.8"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {type === "costPerConversion" && (
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 20 20" fill="none" className="drop-shadow-[0_2px_5px_rgba(0,98,255,0.32)]">
              <circle cx="8.5" cy="6" r="3.5" fill="#0052EA" />
              <path
                d="M2.5 16C2.5 13 5 11 8.5 11C10.4 11 12 11.6 13 12.6C12.7 13.2 12.6 13.8 12.6 14.5C12.6 15.6 13 16.6 13.6 17.4C12.1 17.8 10.4 18 8.5 18C5 18 2.5 16.8 2.5 16Z"
                fill="#0052EA"
              />
            </svg>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-b from-blue-500 to-[#0052EA] border-2 border-white flex items-center justify-center shadow-[0_1.5px_3px_rgba(0,0,0,0.25)]">
              <span className="text-[8.5px] font-black text-white leading-none">$</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bottom Watermark 3D Illustrations for White Cards                  */
/* ------------------------------------------------------------------ */
function CardWatermark({ type }: { type: "wave" | "bars" | "avatars" | "target" }) {
  if (type === "wave") {
    return (
      <div className="w-full h-11 sm:h-12 relative overflow-hidden flex items-end">
        <svg
          viewBox="0 0 160 48"
          fill="none"
          className="w-full h-full opacity-85"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-area-lg" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BFDBFE" stopOpacity="0.75" />
              <stop offset="0.6" stopColor="#DBEAFE" stopOpacity="0.4" />
              <stop offset="1" stopColor="#EFF6FF" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave-stroke-lg" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="0.5" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="1" stopColor="#2563EB" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0 42C30 40 60 34 95 28C125 23 145 16 160 10V48H0V42Z"
            fill="#E0EDFE"
            fillOpacity="0.5"
          />
          <path
            d="M0 48V38C25 38 45 32 70 26C100 18 125 24 160 6V48H0Z"
            fill="url(#wave-area-lg)"
          />
          <path
            d="M0 38C25 38 45 32 70 26C100 18 125 24 160 6"
            stroke="url(#wave-stroke-lg)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="156" cy="8" r="3" fill="#2563EB" />
          <circle cx="156" cy="8" r="1.2" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (type === "bars") {
    return (
      <div className="w-full h-11 sm:h-12 flex items-end justify-center gap-1.5 px-2 pb-0.5 opacity-80">
        {[
          { h: "h-2.5", color: "bg-blue-100" },
          { h: "h-4", color: "bg-blue-100" },
          { h: "h-5.5", color: "bg-blue-200/80" },
          { h: "h-7", color: "bg-blue-200" },
          { h: "h-8.5", color: "bg-blue-200" },
          { h: "h-10", color: "bg-blue-300/90" },
          { h: "h-11", color: "bg-blue-300" },
        ].map((bar, idx) => (
          <div
            key={idx}
            className={`w-2.5 ${bar.h} ${bar.color} rounded-t-sm shadow-[0_1px_2px_rgba(0,98,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]`}
          />
        ))}
      </div>
    );
  }

  if (type === "avatars") {
    return (
      <div className="w-full h-11 sm:h-12 flex items-end justify-center pb-0.5 opacity-80">
        <svg width="84" height="42" viewBox="0 0 84 42" fill="none">
          <circle cx="24" cy="18" r="9" fill="#DBEAFE" />
          <path d="M10 40C10 32 16 28 24 28C32 28 38 32 38 40" fill="#DBEAFE" />
          <circle cx="60" cy="18" r="9" fill="#DBEAFE" />
          <path d="M46 40C46 32 52 28 60 28C68 28 74 32 74 40" fill="#DBEAFE" />
          <circle cx="42" cy="13" r="10.5" fill="#BFDBFE" />
          <path d="M25 40C25 30 33 25 42 25C51 25 59 30 59 40" fill="#BFDBFE" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-11 sm:h-12 flex items-end justify-center pb-0.5 opacity-85">
      <svg width="76" height="44" viewBox="0 0 76 44" fill="none">
        <circle cx="38" cy="25" r="17" stroke="#DBEAFE" strokeWidth="2.5" fill="none" />
        <circle cx="38" cy="25" r="11" stroke="#BFDBFE" strokeWidth="2.5" fill="none" />
        <circle cx="38" cy="25" r="5" fill="#93C5FD" />
        <circle cx="38" cy="25" r="2" fill="#2563EB" />
        <line x1="56" y1="7" x2="39" y2="24" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
        <polygon points="38,25 43,20 41,18" fill="#2563EB" />
        <path d="M56 7L61 4M56 7L59 10M53 9L57 6" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashed Arrow Connector Between Metric Cards                        */
/* ------------------------------------------------------------------ */
function ConnectingDashedArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 w-8 xl:w-10 select-none pointer-events-none" aria-hidden="true">
      <svg width="38" height="14" viewBox="0 0 38 14" fill="none" className="w-full drop-shadow-[0_2px_4px_rgba(0,98,255,0.25)]">
        <line
          x1="2"
          y1="7"
          x2="26"
          y2="7"
          stroke="#0062FF"
          strokeWidth="2.2"
          strokeDasharray="4.5 3"
          strokeLinecap="round"
        />
        <polygon points="25,2.5 35,7 25,11.5" fill="#0062FF" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric cards dataset matching the reference                        */
/* ------------------------------------------------------------------ */
const metricCardsData = [
  {
    dishType: "clicks" as const,
    value: "1,389",
    label: "Clicks",
    watermark: "wave" as const,
  },
  {
    dishType: "cpc" as const,
    value: "$4.55",
    label: "Average CPC",
    watermark: "bars" as const,
  },
  {
    dishType: "conversions" as const,
    value: "85",
    label: "Conversions",
    watermark: "avatars" as const,
  },
  {
    dishType: "costPerConversion" as const,
    value: "$75.27",
    label: "Cost Per\nConversion",
    watermark: "target" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  High-Depth 3D Shadow Tokens                                        */
/* ------------------------------------------------------------------ */
const whiteCardShadow =
  "shadow-[0_1.5px_0_0_rgba(255,255,255,1)_inset,0_22px_44px_-10px_rgba(0,80,220,0.14),0_8px_18px_-4px_rgba(15,23,42,0.06),0_2px_4px_rgba(0,0,0,0.03),0_0_0_1px_rgba(220,230,248,0.85)]";

const heroCardShadow =
  "shadow-[0_2px_0_0_rgba(255,255,255,0.4)_inset,0_36px_70px_-12px_rgba(0,60,220,0.52),0_16px_32px_-6px_rgba(0,25,100,0.3),inset_0_-3px_6px_rgba(0,20,80,0.35)]";

const proofCardShadow =
  "shadow-[0_1.5px_0_0_rgba(255,255,255,1)_inset,0_28px_64px_-16px_rgba(0,80,220,0.14),0_10px_24px_-6px_rgba(15,23,42,0.05),0_0_0_1px_rgba(226,232,240,0.7)]";

/* ------------------------------------------------------------------ */
/*  How We Made It Happen Step Dish Component                         */
/* ------------------------------------------------------------------ */
function StepDish({
  stepNumber,
  title,
  children,
}: {
  stepNumber: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center group relative z-10">
      {/* 3D Circular Dish */}
      <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] rounded-full p-[3.5px] bg-gradient-to-b from-white via-blue-100 to-blue-200/80 shadow-[0_12px_28px_-4px_rgba(0,80,220,0.22),0_4px_10px_rgba(15,23,42,0.06),inset_0_2.5px_4px_rgba(255,255,255,1),inset_0_-2.5px_4px_rgba(180,210,255,0.75)] border border-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_34px_-3px_rgba(0,80,220,0.32)]">
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FF] to-[#DFEDFF] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,70,220,0.08),inset_0_-2px_3px_rgba(255,255,255,0.95)]">
          {children}
        </div>

        {/* Number Badge overlapping bottom */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0062FF] text-white text-[11px] sm:text-[12px] font-extrabold tracking-wide shadow-[0_3px_8px_rgba(0,98,255,0.42)] border-[1.5px] border-white select-none shrink-0">
          {stepNumber}
        </div>
      </div>

      {/* Description below */}
      <p className="text-[14px] sm:text-[15px] font-bold text-slate-800 leading-[1.3] text-center max-w-[170px] mt-4 sm:mt-5 group-hover:text-[#0052EA] transition-colors">
        {title}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Target Graphics with 3D Arrow (Left & Right for CTA Card)          */
/* ------------------------------------------------------------------ */
function TargetGraphicLeft() {
  return (
    <div className="absolute -bottom-10 -left-12 sm:-bottom-8 sm:-left-6 lg:-bottom-6 lg:-left-2 w-[220px] sm:w-[280px] lg:w-[320px] h-[220px] sm:h-[280px] lg:h-[320px] pointer-events-none select-none opacity-90">
      <svg viewBox="0 0 320 320" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="target-rim-grad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E0EDFF" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </radialGradient>
          <linearGradient id="dart-fin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Outer Perspective Target Rings */}
        <g transform="translate(130, 200) rotate(-22)">
          {/* Ring 1 - Outermost 3D Dish Rim */}
          <ellipse cx="0" cy="0" rx="120" ry="105" fill="url(#target-rim-grad)" stroke="#BFDBFE" strokeWidth="2.5" />
          {/* Ring 2 - White Ring */}
          <ellipse cx="0" cy="0" rx="95" ry="82" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="2" />
          {/* Ring 3 - Blue Ring */}
          <ellipse cx="0" cy="0" rx="72" ry="62" fill="#0062FF" stroke="#0052EA" strokeWidth="2" />
          {/* Ring 4 - White Ring */}
          <ellipse cx="0" cy="0" rx="48" ry="41" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="1.5" />
          {/* Ring 5 - Inner Blue Ring */}
          <ellipse cx="0" cy="0" rx="28" ry="24" fill="#0052EA" stroke="#003DB8" strokeWidth="1.5" />
          {/* Bullseye Center */}
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="#FFFFFF" />
        </g>

        {/* 3D Arrow / Dart hitting bullseye */}
        <g transform="translate(130, 200) rotate(-48)">
          {/* Dart Shaft */}
          <line x1="0" y1="0" x2="-140" y2="0" stroke="#0052EA" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="-5" y1="-1" x2="-135" y2="-1" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />

          {/* Dart Flights / Fins at tail */}
          <path d="M-140 0 L-180 -28 L-155 0 L-180 28 Z" fill="url(#dart-fin-grad)" stroke="#1E40AF" strokeWidth="1.5" />
          <path d="M-140 0 L-170 -16 L-150 0 L-170 16 Z" fill="#60A5FA" opacity="0.6" />

          {/* Point impact glow */}
          <circle cx="0" cy="0" r="5" fill="#0062FF" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

function TargetGraphicRight() {
  return (
    <div className="absolute -top-6 -right-10 sm:-top-4 sm:-right-6 lg:-top-2 lg:right-2 w-[220px] sm:w-[280px] lg:w-[320px] h-[220px] sm:h-[280px] lg:h-[320px] pointer-events-none select-none opacity-80">
      <svg viewBox="0 0 320 320" fill="none" className="w-full h-full">
        {/* Concentric Sketched Target Rings */}
        <g transform="translate(200, 120) rotate(16)">
          <ellipse cx="0" cy="0" rx="115" ry="98" fill="none" stroke="#DBEAFE" strokeWidth="2.5" strokeDasharray="6 4" />
          <ellipse cx="0" cy="0" rx="90" ry="76" fill="#F8FAFC" stroke="#BFDBFE" strokeWidth="2" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="66" ry="56" fill="none" stroke="#93C5FD" strokeWidth="2.5" />
          <ellipse cx="0" cy="0" rx="42" ry="35" fill="none" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="4 4" />
          <ellipse cx="0" cy="0" rx="20" ry="17" fill="#EBF3FF" stroke="#3B82F6" strokeWidth="1.8" />
          <circle cx="0" cy="0" r="6" fill="#0062FF" />

          {/* Radial Guideline Rays */}
          <line x1="-135" y1="0" x2="135" y2="0" stroke="#BFDBFE" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
          <line x1="0" y1="-115" x2="0" y2="115" stroke="#BFDBFE" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
        </g>

        {/* Incoming Sketched Dart from top-left */}
        <g transform="translate(200, 120) rotate(42)">
          <line x1="0" y1="0" x2="-130" y2="0" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          <path d="M-130 0 L-165 -22 L-145 0 L-165 22 Z" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="4" fill="#0062FF" />
        </g>
      </svg>
    </div>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export default function RidgewellCaseStudy() {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F5F8FE] via-[#EDF3FC] to-[#F1F6FE] py-14 sm:py-10 overflow-hidden">
      {/* ── Background subtle dot grid & ambient glows ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #B8CEF5 1.1px, transparent 1.1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 85% 10%, black 0%, transparent 75%)",
          opacity: 0.65,
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/12 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-300/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">

        {/* ════════════════════════════════════════════════════════════
            TOP MAIN SECTION HEADING (GOOGLE ADS CASE STUDY)
        ════════════════════════════════════════════════════════════ */}
        <Reveal className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-[0_2px_12px_-2px_rgba(0,102,255,0.12)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-[#0062FF] uppercase">
              Real Client Results
            </span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-black tracking-tight text-[#0B1220] leading-[1.06] uppercase">
            Google Ads Case Study
          </h2>
          <div className="relative inline-block mt-1.5">
            <p className="text-[24px] sm:text-[32px] lg:text-[38px] font-extrabold tracking-tight text-[#0052EA] leading-[1.1]">
              Here&rsquo;s What That Looks Like In The Real World.
            </p>
            <CurvedUnderlineWide className="absolute -bottom-2 left-0 w-full h-[14px] text-[#0062FF] opacity-75" />
          </div>
        </Reveal>

        {/* ════════════════════════════════════════════════════════════
            TOP SECTION: PROFILE & OBJECTIVE CARDS
        ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 sm:gap-6 items-stretch mb-12 sm:mb-16">

          {/* ── Profile Card ── */}
          <Reveal delay={0.05} direction="left">
            <div className="relative h-full rounded-[24px] bg-white border border-white/90 p-5 sm:p-6 flex flex-col shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_1px_3px_rgba(15,23,42,0.04),0_24px_56px_-16px_rgba(0,102,255,0.12),0_14px_28px_-12px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-[58px] h-[58px] shrink-0 rounded-full overflow-hidden border-2 border-slate-100 bg-white shadow-[0_6px_18px_-4px_rgba(0,102,255,0.20),0_2px_6px_rgba(15,23,42,0.06)]">
                  <Image
                    src="/RidgewellColoradoCaseStudy/Logo.png"
                    alt="Ridgewell Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="text-[22px] font-black text-slate-900 leading-tight tracking-tight">
                    Ridgewell
                  </p>
                  <p className="text-[13.5px] font-medium text-slate-500 leading-tight">
                    Landscape &amp; Design
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-[#0062FF]">
                    <MapPin size={12} strokeWidth={2.5} />
                    <span className="text-[12px] font-semibold">Colorado</span>
                  </div>
                </div>
              </div>
              <div className="relative flex-1 min-h-[170px] sm:min-h-[190px] w-full overflow-hidden rounded-2xl border border-slate-100/80 shadow-[inset_0_2px_10px_rgba(15,23,42,0.08),0_8px_24px_-8px_rgba(0,102,255,0.10)]">
                <Image
                  src="/RidgewellColoradoCaseStudy/ridgewellcolorado.webp"
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
            <div className="relative h-full rounded-[24px] bg-white border border-white/90 p-5 sm:p-6 flex flex-col justify-between shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_1px_3px_rgba(15,23,42,0.04),0_28px_64px_-14px_rgba(0,102,255,0.14),0_16px_32px_-12px_rgba(15,23,42,0.07)]">
              {/* Quote */}
              <div className="relative flex gap-3 mb-3.5">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 shadow-[0_6px_16px_-4px_rgba(0,102,255,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
                    <path
                      d="M0 14V9.33C0 6.4.93 3.98 2.8 2.16 4.67.33 7.16.04 10.27.41v2.8c-1.56-.23-2.76.17-3.6.96-.84.8-1.27 1.9-1.27 3.33H8.73V14H0Zm8.73 0V9.33c0-2.93.93-5.35 2.8-7.17 1.87-1.83 4.36-2.12 7.47-1.75v2.8c-1.56-.23-2.76.17-3.6.96-.84.8-1.27 1.9-1.27 3.33h3.34V14H8.73Z"
                      fill="#93C5FD"
                    />
                  </svg>
                </div>
                <div className="flex-1 pr-10 sm:pr-12">
                  <p className="text-[16.5px] sm:text-[18px] leading-[1.45] text-slate-700 font-medium">
                    Ridgewell wanted more homeowners looking for{" "}
                    <span className="font-bold text-[#0062FF]">landscaping, xeriscaping</span>{" "}
                    and{" "}
                    <span className="font-bold text-[#0062FF]">outdoor construction work.</span>
                  </p>
                </div>

                {/* ── Precision Curved Dashed Arrow: sweeps from 'work.' down to the circle ── */}
                <div className="absolute top-2 -right-1 sm:right-1 pointer-events-none select-none z-10" aria-hidden="true">
                  <svg width="48" height="38" viewBox="0 0 48 38" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.3)]">
                    <path
                      d="M 4 16 C 10 2, 28 2, 38 24"
                      stroke="#0062FF"
                      strokeWidth="2.2"
                      strokeDasharray="3.5 2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 28 22 L 38 27 L 41 17"
                      stroke="#0062FF"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* The Real Objective divider with terminal circle */}
              <div className="flex items-center gap-2 mb-3.5">
                <span className="text-[10.5px] font-extrabold tracking-[0.14em] text-[#0062FF] whitespace-nowrap uppercase">
                  The Real Objective
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-200 to-blue-300/60" />
                <div className="w-3.5 h-3.5 shrink-0 rounded-full border-[2px] border-dashed border-[#0062FF] flex items-center justify-center bg-blue-50/50" />
              </div>

              {/* Objective sub-cards */}
              <div className="grid grid-cols-1 sm:grid-cols-[0.88fr_1.12fr] gap-3.5 items-stretch">
                {/* Wrong Sub-card */}
                <div className="relative rounded-2xl bg-white border border-slate-100 p-4 flex flex-col items-center justify-between text-center gap-3 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_10px_24px_-6px_rgba(239,68,68,0.12),0_2px_6px_rgba(15,23,42,0.04),0_0_0_1px_rgba(254,226,226,0.65)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-white via-red-50 to-red-100/80 border border-red-200/80 shadow-[0_6px_14px_-3px_rgba(239,68,68,0.25),inset_0_2px_3px_rgba(255,255,255,1)]">
                    <X size={20} className="text-red-500" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-[14px] text-slate-500 font-medium leading-tight">
                      The objective
                    </p>
                    <p className="text-[17px] sm:text-[18px] font-black text-slate-900 leading-tight mt-0.5">
                      wasn&rsquo;t traffic.
                    </p>
                  </div>
                  <span className="rounded-full bg-red-50/90 border border-red-100 px-4 py-1.5 text-[12.5px] font-bold text-red-500 shadow-sm">
                    Random traffic
                  </span>
                </div>

                {/* Right Sub-card */}
                <div className="relative rounded-2xl bg-white border border-slate-100 p-4 flex flex-col justify-between gap-3 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_12px_28px_-6px_rgba(16,185,129,0.14),0_2px_6px_rgba(15,23,42,0.04),0_0_0_1px_rgba(209,250,229,0.75)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_6px_16px_-3px_rgba(16,185,129,0.50),inset_0_1.5px_2px_rgba(255,255,255,0.4)] border border-emerald-300">
                      <Check size={20} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-[14px] text-slate-500 font-medium leading-tight">
                        The objective
                      </p>
                      <p className="text-[16.5px] sm:text-[17.5px] font-black text-slate-900 leading-tight mt-0.5">
                        was profitable homeowner inquiries.
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <span className="flex items-center gap-2 rounded-xl bg-[#F0FDF4] border border-emerald-100/90 px-3.5 py-2 text-[12.5px] font-bold text-emerald-800 shadow-sm">
                      <User size={14} strokeWidth={2.5} className="text-emerald-600 shrink-0" /> High intent homeowners
                    </span>
                    <span className="flex items-center gap-2 rounded-xl bg-[#F0FDF4] border border-emerald-100/90 px-3.5 py-2 text-[12.5px] font-bold text-emerald-800 shadow-sm">
                      <DollarSign size={14} strokeWidth={2.5} className="text-emerald-600 shrink-0" /> Profitable jobs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            RESULTS SECTION (MATCHING UI REFERENCE IMAGE WITH HIGH 3D DEPTH)
        ════════════════════════════════════════════════════════════ */}
        <div className="relative">

          {/* Top-Right Sketched Arrow (curving upward) */}
          <CurvedSketchArrow />

          {/* Section Header */}
          <Reveal className="text-center mb-6 sm:mb-6">
            <ResultsEyebrow />

            <h3 className="text-[34px] sm:text-[42px] lg:text-[50px] font-black tracking-tight text-[#0B1220] leading-[1.08]">
              Real campaign.{" "}
              <span className="text-[#0052EA]">Real results.</span>
            </h3>

            <div className="mt-2.5 flex items-center justify-center flex-wrap gap-1 text-[16px] sm:text-[18px] text-slate-500 font-medium">
              <span>One campaign.</span>
              <span className="relative inline-block font-semibold text-slate-700 px-0.5">
                Big impact
                <CurvedUnderline className="absolute -bottom-1 left-0 w-full h-[7px] text-[#0062FF]" />
              </span>
              <span>for our client.</span>
            </div>
          </Reveal>

          {/* ══════════════════════════════════════════════════════════
              5 CARDS HORIZONTAL FLOW (High 3D Depth, Prominent Icons & Numbers)
          ══════════════════════════════════════════════════════════ */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-0">

            {/* ── 4 White Metric Cards with Dashed Connectors ── */}
            {metricCardsData.map((card, i) => (
              <div key={card.label} className="flex items-center flex-1 w-full lg:w-auto">
                <Reveal
                  delay={0.06 + i * 0.06}
                  direction="up"
                  className="flex-1 w-full"
                >
                  <div className={`group relative w-full h-[275px] sm:h-[295px] rounded-[24px] bg-gradient-to-b from-[#FFFFFF] via-[#FAFCFF] to-[#F1F6FE] border border-white/95 pt-5 pb-0 px-3 sm:px-4 flex flex-col items-center text-center overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_32px_60px_-10px_rgba(0,98,255,0.24),0_14px_28px_-4px_rgba(15,23,42,0.09),0_0_0_1px_rgba(180,210,255,1)] ${whiteCardShadow}`}>
                    {/* Top specular highlight edge */}
                    <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                    {/* Top Prominent 3D floating circular dish icon */}
                    <DishIcon type={card.dishType} />

                    {/* Prominent High-Impact Metric Value */}
                    <p className="text-[34px] sm:text-[38px] lg:text-[40px] font-black text-[#0B1220] leading-none tracking-tight mt-3 sm:mt-3.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.07)]">
                      {card.value}
                    </p>

                    {/* Metric Label */}
                    <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 leading-snug whitespace-pre-line mt-1.5">
                      {card.label}
                    </p>

                    {/* Small horizontal indicator bar */}
                    <div className="w-7 h-[3px] rounded-full bg-[#0062FF] mt-2 shadow-[0_1px_3px_rgba(0,98,255,0.35)]" />

                    {/* Bottom Watermark Illustration */}
                    <div className="mt-auto w-full pointer-events-none select-none">
                      <CardWatermark type={card.watermark} />
                    </div>
                  </div>
                </Reveal>

                {/* Connecting Dashed Arrow to Next Card */}
                <ConnectingDashedArrow />
              </div>
            ))}

            {/* ══════════════════════════════════════════════════════════
                5TH CARD: THE HERO 3D BLUE CARD (Taller & Dominant Centerpiece)
            ══════════════════════════════════════════════════════════ */}
            <Reveal
              delay={0.06 + metricCardsData.length * 0.06}
              direction="up"
              className="relative w-full lg:w-[275px] xl:w-[295px] shrink-0"
            >
              {/* Powerful ambient deep blue glow behind card */}
              <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[44px] bg-[#0052EA]/30 blur-[38px]" />

              {/* ── Top-Right Hanging Ribbon Badge: "BIG IMPACT" ── */}
              <div
                className="absolute -top-3 right-5 z-30 w-[48px] sm:w-[52px] pt-1.5 pb-3 px-0.5 bg-white flex flex-col items-center text-center shadow-[0_8px_16px_-2px_rgba(0,30,120,0.35),0_2px_4px_rgba(0,0,0,0.08)] rounded-t-sm"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)",
                }}
              >
                <Star size={12} className="text-[#0052EA] fill-[#0052EA] mb-0.5" />
                <span className="text-[8.5px] sm:text-[9.5px] font-black text-[#0052EA] tracking-tighter uppercase leading-[1.05]">
                  BIG<br />IMPACT
                </span>
              </div>

              {/* ── The 3D Blue Glass Card (Noticeably taller than white cards) ── */}
              <div
                className={`relative h-[370px] sm:h-[390px] rounded-[28px] overflow-hidden flex flex-col items-center text-center pt-5 sm:pt-6 pb-5 px-4 sm:px-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_48px_82px_-12px_rgba(0,60,220,0.68)] ${heroCardShadow}`}
                style={{
                  background:
                    "linear-gradient(155deg, #1A6CFF 0%, #0052EA 40%, #003DB8 85%, #002D8F 100%)",
                }}
              >
                {/* Specular glass top edge & ambient reflection sheen */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-20 bg-white/20 blur-2xl pointer-events-none" />

                {/* ── Prominent 3D Glass Orb with Luminous Ring & Trend Arrow ── */}
                <div className="relative mt-1 mb-1.5 flex items-center justify-center">
                  {/* Glowing orbital ring */}
                  <div className="w-[80px] h-[80px] sm:w-[86px] sm:h-[86px] rounded-full border-[1.5px] border-white/45 shadow-[0_0_18px_rgba(255,255,255,0.3),inset_0_0_10px_rgba(255,255,255,0.18)] flex items-center justify-center">
                    {/* Inner 3D glass sphere */}
                    <div
                      className="w-[64px] h-[64px] sm:w-[70px] sm:h-[70px] rounded-full backdrop-blur-md border border-white/70 flex items-center justify-center shadow-[0_10px_22px_-3px_rgba(0,20,80,0.55),inset_0_3px_6px_rgba(255,255,255,0.7),inset_0_-3px_6px_rgba(0,30,100,0.45)]"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 55%, rgba(0,40,140,0.4) 100%)",
                      }}
                    >
                      {/* Bold 3D White Trend Arrow */}
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 28 28"
                        fill="none"
                        className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                      >
                        <path
                          d="M5.5 19L13 11.5L18 15.5L22.5 8"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 8H22.5V14.5"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* "Approximately" Subtitle */}
                <p className="text-[12px] font-medium text-blue-100/90 tracking-wide mt-1.5">
                  Approximately
                </p>

                {/* Main Prominent Stat: ~$50,000+ */}
                <p className="text-[38px] sm:text-[44px] font-black text-white leading-none tracking-tight mt-0.5 drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)]">
                  ~$50,000+
                </p>

                {/* "Profit Generated" */}
                <p className="text-[16px] sm:text-[17px] font-bold text-white tracking-tight leading-tight mt-1">
                  Profit Generated
                </p>

                {/* Handwritten script: "from just one campaign" */}
                <p
                  className={`${caveat.className} text-[22px] sm:text-[24px] text-[#A6CCFF] font-semibold italic mt-0.5`}
                >
                  from just one campaign
                </p>

                {/* ── White Pill CTA Button: REAL IMPACT → ── */}
                <div className="mt-auto pt-3.5 w-full flex justify-center">
                  <button className="w-full max-w-[200px] inline-flex items-center justify-center gap-2 rounded-full bg-white px-4.5 py-2.5 text-[11.5px] font-black tracking-[0.08em] text-[#0052EA] uppercase shadow-[0_10px_22px_-4px_rgba(0,0,0,0.28),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_14px_28px_-4px_rgba(0,0,0,0.38)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                    <span>Real Impact</span>
                    <ArrowRight size={13} strokeWidth={2.8} />
                  </button>
                </div>
              </div>
            </Reveal>

          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════
            PROOF SECTION (LARGE PROMINENT GOOGLE ADS DASHBOARD)
        ════════════════════════════════════════════════════════════ */}
        <div className="mt-16 sm:mt-24">

          {/* Section Heading: Big "The Proof" with Handwritten Curve Underline */}
          <Reveal className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block">
              <h3 className="text-[34px] sm:text-[44px] lg:text-[50px] font-black tracking-tight text-[#0B1220] leading-[1.08] uppercase">
                <span className="text-[#0052EA]">The Proof</span>
              </h3>
              <CurvedUnderlineWide className="absolute -bottom-2.5 left-0 w-full h-[14px] text-[#0062FF] opacity-85" />
            </div>
          </Reveal>

          {/* ── Outer Proof Card Container with Side Attention Arrows ── */}
          <Reveal delay={0.08} className="relative max-w-[1060px] mx-auto">

            {/* Left Sketched Arrow pointing inward toward dashboard */}
            <div className="hidden xl:block absolute -left-14 top-1/3 pointer-events-none select-none z-20" aria-hidden="true">
              <svg width="72" height="74" viewBox="0 0 72 74" fill="none" className="drop-shadow-[0_3px_8px_rgba(0,98,255,0.32)]">
                <path
                  d="M 6 10 C 2 36, 18 58, 56 60"
                  stroke="#0062FF"
                  strokeWidth="2.8"
                  strokeDasharray="5.5 3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 44 52 L 58 60 L 46 68"
                  stroke="#0062FF"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Right Sketched Arrow pointing inward toward dashboard */}
            <div className="hidden xl:block absolute -right-14 top-1/3 pointer-events-none select-none z-20" aria-hidden="true">
              <svg width="72" height="74" viewBox="0 0 72 74" fill="none" className="drop-shadow-[0_3px_8px_rgba(0,98,255,0.32)]">
                <path
                  d="M 66 10 C 70 36, 54 58, 16 60"
                  stroke="#0062FF"
                  strokeWidth="2.8"
                  strokeDasharray="5.5 3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 28 52 L 14 60 L 26 68"
                  stroke="#0062FF"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* The Main Proof Card */}
            <div className={`relative rounded-[28px] sm:rounded-[32px] bg-white border border-white/95 p-4 sm:p-6 lg:p-8 ${proofCardShadow}`}>
              {/* Specular top highlight */}
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/80 to-transparent" />

              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0062FF] animate-pulse" />
                  <p className="text-[13px] sm:text-[14px] font-extrabold tracking-[0.14em] text-[#0062FF] uppercase">
                    Google Ads Results
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-700 shadow-sm">
                    <Check size={12} strokeWidth={3} /> Verified Client Dashboard
                  </span>
                </div>
              </div>

              {/* Large Prominent Browser-Framed Screenshot Container */}
              <div
                onClick={() => setSelectedScreenshot("/RidgewellColoradoCaseStudy/GoogleDashboard.png")}
                className="group relative w-full rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-2 sm:p-3 overflow-hidden cursor-pointer shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_16px_36px_-10px_rgba(0,80,220,0.12),0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_48px_-10px_rgba(0,80,220,0.22),0_0_0_1.5px_rgba(0,98,255,0.45)] transition-all duration-300"
              >
                {/* Top Browser Window Controls Bar */}
                <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-slate-200/70 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/85" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/85" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/85" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-slate-200/60 shadow-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" fill="#0062FF" />
                    </svg>
                    <span className="text-[11px] font-mono text-slate-500 font-medium truncate">
                      ads.google.com/aw/campaigns/overview
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#0062FF] group-hover:underline">
                    <Maximize2 size={13} strokeWidth={2.5} />
                    <span className="hidden sm:inline">Expand</span>
                  </div>
                </div>

                {/* Screenshot Image Frame */}
                <div className="relative w-full h-[280px] sm:h-[400px] md:h-[480px] lg:h-[540px] rounded-xl overflow-hidden bg-white border border-slate-100 shadow-inner flex items-center justify-center">
                  <Image
                    src="/RidgewellColoradoCaseStudy/GoogleDashboard.png"
                    alt="Google Ads Performance Dashboard Screenshot"
                    fill
                    className="object-contain object-top group-hover:scale-[1.01] transition-transform duration-300 p-1 sm:p-2"
                    sizes="(max-width: 1200px) 100vw, 1060px"
                    priority
                  />

                  {/* Click-to-Expand Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-white/95 text-[12px] font-extrabold text-[#0062FF] shadow-xl flex items-center gap-2 border border-blue-100 backdrop-blur-sm">
                      <Maximize2 size={14} strokeWidth={2.8} /> Click to view full resolution
                    </span>
                  </div>
                </div>
              </div>

              {/* Supporting Proof Highlights Bar */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-slate-600 text-[12.5px] sm:text-[13.5px]">
                <div className="flex items-center gap-2 font-medium">
                  <span className="font-bold text-slate-900">Campaign Timeline:</span> May 1, 2024 – May 31, 2024
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0062FF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" /> 1,362 Clicks
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0062FF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" /> $4.56 Avg. CPC
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 82.33 Conversions
                  </span>
                </div>
              </div>

            </div>
          </Reveal>

        </div>

        {/* ════════════════════════════════════════════════════════════
            HOW WE MADE IT HAPPEN (STEP-BY-STEP PROCESS FLOW)
        ════════════════════════════════════════════════════════════ */}
        <div className="mt-10 sm:mt-24">

          {/* Section Eyebrow Heading */}
          <Reveal className="text-center mb-12 sm:mb-14">
            <h3 className="text-[14px] sm:text-[15px] xl:text-lg font-black tracking-[0.22em] text-[#0062FF] uppercase">
              How We Made It Happen
            </h3>
          </Reveal>

          {/* 7-Step Circuit Pathway Container */}
          <div className="relative max-w-[1040px] mx-auto px-2 sm:px-4">

            {/* Desktop Continuous Rounded-Rectangle Dashed Circuit */}
            <svg
              viewBox="0 0 1000 350"
              fill="none"
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Single continuous dashed rounded-rectangle path passing through dish centers */}
              <path
                d="M 80 42 L 920 42 Q 965 42 965 87 L 965 205 Q 965 250 920 250 L 80 250 Q 35 250 35 205 L 35 87 Q 35 42 80 42 Z"
                stroke="#0062FF"
                strokeWidth="2.2"
                strokeDasharray="8 6"
                strokeLinecap="round"
                fill="none"
              />

              {/* ── Top row arrows → (pointing right) ── */}
              <polygon points="244,36 257,42 244,48" fill="#0062FF" />
              <polygon points="494,36 507,42 494,48" fill="#0062FF" />
              <polygon points="744,36 757,42 744,48" fill="#0062FF" />

              {/* ── Right side arrow ↑ (pointing up along circuit loop) ── */}
              <polygon points="958,155 965,138 972,155" fill="#0062FF" />

              {/* ── Bottom row arrows ← (pointing left) ── */}
              <polygon points="642,244 628,250 642,256" fill="#0062FF" />
              <polygon points="372,244 358,250 372,256" fill="#0062FF" />
              <polygon points="122,244 108,250 122,256" fill="#0062FF" />

              {/* ── Left side arrow ↑ (pointing up) ── */}
              <polygon points="28,155 35,138 42,155" fill="#0062FF" />
            </svg>

            {/* ── TOP ROW: STEPS 01 TO 04 ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 items-start relative z-10">
              {/* Step 01 */}
              <Reveal delay={0.04} direction="up">
                <StepDish stepNumber="01" title="We separated services.">
                  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.2)]">
                    <path d="M14 4L3 9.5L14 15L25 9.5L14 4Z" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="#EBF3FF" />
                    <path d="M3 14L14 19.5L25 14" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 18.5L14 24L25 18.5" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </StepDish>
              </Reveal>

              {/* Step 02 */}
              <Reveal delay={0.08} direction="up">
                <StepDish stepNumber="02" title="We targeted high intent searches.">
                  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.2)]">
                    <circle cx="14" cy="14" r="11" stroke="#0062FF" strokeWidth="2.2" fill="#EBF3FF" />
                    <circle cx="14" cy="14" r="6.5" stroke="#0062FF" strokeWidth="2.2" />
                    <circle cx="14" cy="2.5" fill="#0062FF" />
                  </svg>
                </StepDish>
              </Reveal>

              {/* Step 03 */}
              <Reveal delay={0.12} direction="up">
                <StepDish stepNumber="03" title="We built dedicated landing pages.">
                  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.2)]">
                    <rect x="3.5" y="4.5" width="21" height="19" rx="3.5" stroke="#0062FF" strokeWidth="2.2" fill="#EBF3FF" />
                    <path d="M3.5 10H24.5" stroke="#0062FF" strokeWidth="2.2" />
                    <path d="M7 7.5H8.5" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M11 7.5H12.5" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" />
                    <rect x="7.5" y="13.5" width="5.5" height="6.5" rx="1.5" stroke="#0062FF" strokeWidth="1.8" fill="white" />
                    <path d="M16 14.5H20.5M16 17.5H19" stroke="#0062FF" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </StepDish>
              </Reveal>

              {/* Step 04 */}
              <Reveal delay={0.16} direction="up">
                <StepDish stepNumber="04" title="We tracked calls and forms.">
                  <svg width="30" height="30" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.2)]">
                    <path
                      d="M7.5 4.5C6.4 4.5 5.5 5.4 5.5 6.5C5.5 14.8 12.2 21.5 20.5 21.5C21.6 21.5 22.5 20.6 22.5 19.5V16.8C22.5 16.1 22 15.5 21.3 15.3L18.2 14.4C17.6 14.2 16.9 14.5 16.5 15L15.3 16.2C12.8 14.9 10.9 13 9.6 10.5L10.8 9.3C11.3 8.9 11.6 8.2 11.4 7.6L10.5 4.5C10.3 3.8 9.7 3.3 9 3.3H7.5Z"
                      fill="#0062FF"
                    />
                  </svg>
                </StepDish>
              </Reveal>
            </div>

            {/* ── BOTTOM ROW: STEPS 05 TO 07 ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 max-w-[840px] mx-auto mt-12 sm:mt-16 items-start relative z-10">
              {/* Step 05 */}
              <Reveal delay={0.20} direction="up">
                <StepDish stepNumber="05" title="We cut irrelevant searches.">
                  <svg width="30" height="30" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.2)]">
                    <path
                      d="M4 5.5H24L16 15V22L12 24V15L4 5.5Z"
                      stroke="#0062FF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="#EBF3FF"
                    />
                  </svg>
                </StepDish>
              </Reveal>

              {/* Step 06 */}
              <Reveal delay={0.24} direction="up">
                <StepDish stepNumber="06" title="We watched where the money was actually going.">
                  <svg width="30" height="30" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.2)]">
                    <path d="M4 23H24" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" />
                    <rect x="6.5" y="15" width="3.5" height="8" rx="1" fill="#0062FF" />
                    <rect x="12" y="11" width="3.5" height="12" rx="1" fill="#0062FF" />
                    <rect x="17.5" y="7" width="3.5" height="16" rx="1" fill="#0062FF" />
                    <path d="M7 11L13 6L18 10L23.5 3" stroke="#0052EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 3H23.5V6.5" stroke="#0052EA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </StepDish>
              </Reveal>

              {/* Step 07 */}
              <Reveal delay={0.28} direction="up">
                <StepDish stepNumber="07" title="Then we pushed budget into what was working.">
                  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" className="drop-shadow-[0_2px_4px_rgba(0,98,255,0.2)]">
                    <path
                      d="M17.5 4C17.5 4 23.5 5 24 10.5C24.5 16 19.5 22 19.5 22L16.5 19L19 16.5L16.5 14L14 16.5L11 13.5C11 13.5 17 8.5 17.5 4Z"
                      fill="#EBF3FF"
                      stroke="#0062FF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="18.5" cy="9.5" r="2" fill="#0062FF" />
                    <path d="M10 17.5L5.5 19L7 14.5" stroke="#0062FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 22C6 22 8 20.5 8 19C8 17.5 6 16.5 6 16.5" stroke="#0062FF" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </StepDish>
              </Reveal>
            </div>

          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════
            PRETTY SIMPLE IDEA CALLOUT CARD (FINAL CTA SECTION)
        ════════════════════════════════════════════════════════════ */}
        <div className="mt-8 sm:mt-12">
          <Reveal delay={0.1}>
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFF] to-[#EFF6FF] border border-blue-100/90 py-14 sm:py-18 lg:py-22 px-6 sm:px-12 lg:px-16 overflow-hidden flex flex-col items-center text-center shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_24px_64px_-16px_rgba(0,80,220,0.14),0_8px_24px_-8px_rgba(15,23,42,0.06),0_0_0_1px_rgba(226,238,255,0.8)]">

              {/* Specular top highlight */}
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/90 to-transparent" />

              {/* 3D Target Illustration with Arrow (Left) */}
              <TargetGraphicLeft />

              {/* Sketched Target Illustration with Arrow (Right) */}
              <TargetGraphicRight />

              {/* Eyebrow: PRETTY SIMPLE IDEA: */}
              <div className="relative inline-block mb-3 sm:mb-4 z-10">
                <p className="text-[12px] sm:text-[13.5px] font-black tracking-[0.18em] text-[#0062FF] uppercase">
                  PRETTY SIMPLE IDEA:
                </p>
                {/* Sketched underline */}
                <svg viewBox="0 0 160 8" fill="none" className="absolute -bottom-1 left-0 w-full h-[6px] text-[#0062FF]">
                  <path d="M2 4C50 1.5 110 1.5 158 4.5" stroke="#0062FF" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Main Headline */}
              <h3 className="relative z-10 text-[28px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-black tracking-tight text-[#0B1220] leading-[1.12] max-w-3xl">
                Stop paying for traffic <br />
                <span className="text-[#0062FF] relative inline-block mt-0.5">
                  that doesn’t{" "}
                  <span className="relative inline-block">
                    make money.
                    {/* Hand-drawn underline under make money. */}
                    <svg
                      viewBox="0 0 240 14"
                      fill="none"
                      className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-[10px] sm:h-[13px] text-[#0062FF]"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M3 8C70 2 170 2 237 8"
                        stroke="#0062FF"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h3>

              {/* Primary CTA Button */}
              <div className="relative z-10 mt-8 sm:mt-10">
                <button
                  onClick={() => {
                    const target =
                      document.getElementById("contact") ||
                      document.getElementById("contact-us") ||
                      document.getElementById("booking") ||
                      document.getElementById("growth-cta");
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-10 py-4 sm:py-4.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0062FF] to-[#0052EA] text-white font-black text-[12.5px] sm:text-[14px] lg:text-[14.5px] tracking-wide uppercase shadow-[0_14px_32px_-4px_rgba(0,98,255,0.48),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_18px_38px_-4px_rgba(0,98,255,0.60)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>SHOW ME WHAT THIS COULD LOOK LIKE FOR MY BUSINESS</span>
                  <ArrowRight size={16} strokeWidth={2.8} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </Reveal>
        </div>

      </div>

      {/* ── Modal Lightbox for Full Screenshot View ── */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScreenshot(null)}
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-3 sm:p-4"
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <p className="text-[14px] font-bold text-slate-900">Verified Google Ads Campaign Dashboard</p>
                </div>
                <button
                  onClick={() => setSelectedScreenshot(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="relative w-full h-[60vh] sm:h-[75vh] mt-3 rounded-xl overflow-hidden bg-slate-50">
                <Image
                  src={selectedScreenshot}
                  alt="Verified Google Ads Campaign Dashboard Full"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
