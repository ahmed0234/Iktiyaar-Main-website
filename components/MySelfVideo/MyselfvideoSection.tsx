"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Check,
  ShieldCheck,
  Clock,
  Volume2,
  Settings,
  Maximize2,
  SkipForward,
  X,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";

// ─── BOLD, ENERGETIC HAND-DRAWN SVGS & DIRECTIONAL ARROWS ─────────────────────

// 1. Double Underline under "just 2 minutes!"
function DoubleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 160 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6C48 2.5 110 2.5 156 6"
        stroke="#0066FF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M16 12C58 9 105 9 146 12"
        stroke="#0066FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 2. Curved Hand-Drawn Heading Underline under "Before You Decide Anything."
function CurvedHeadingUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 380 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12C95 4.5 270 4.5 376 12"
        stroke="#0066FF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M28 15.5C120 8.5 250 8.5 352 15.5"
        stroke="#0066FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

// 2b. Bold Hand-Drawn Arrow pointing down-left toward "2 Minutes"
function HeadingTwoMinutesArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bold curved shaft, top-right to lower-left */}
      <path
        d="M88 12 C 64 8, 38 18, 22 46"
        stroke="#0066FF"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Clean triangular arrowhead, tip aligned with shaft's direction of travel */}
      <polygon points="13,61 14,40 31,50" fill="#0066FF" />
    </svg>
  );
}
// 3. Top-Center Curved Hand-Drawn Arrow (pointing down-right into video)
function CenterTopCurvedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 90 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 10 C45 6, 75 22, 78 56"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M62 44 L78 58 L84 38"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 4. Bold Left Hand-Drawn Arrow (pointing right into video)
function BigBoldLeftArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 85 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 14 C24 20, 50 35, 74 52"
        stroke="#0066FF"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M48 52 L76 54 L66 30"
        stroke="#0066FF"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 5. Very Bold, Thick Curved Swoop Arrow on the Right (pointing in to video)
function BigBoldRightSwoopArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 110 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M102 8 C88 38, 64 70, 20 78"
        stroke="#0066FF"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M52 60 L16 80 L38 94"
        stroke="#0066FF"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 6. Right Lower Curved Arrow (pointing left into bottom of video)
function RightLowerCurvedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 85 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M76 8 C58 26, 38 34, 12 40"
        stroke="#0066FF"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <path
        d="M32 24 L10 41 L30 50"
        stroke="#0066FF"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 7. Right Top Radial Burst Rays (3 sparkles)
function TopRightBurstSparkles({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 40 L22 30"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16 16 L28 24"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M36 6 L30 20"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 8. White Curved Arrow inside Video Thumbnail (pointing from "Watch this first" to Play)
function WhiteCurvedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 75 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6 C8 30, 20 52, 58 56"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M44 44 L60 56 L46 66"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 9. White Underline inside Video Thumbnail
function WhiteUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 120 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6 C35 2, 85 2, 118 7"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 10. Curved Blue Underline for "Just numbers."
function BlueUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 140 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8 C40 3, 95 3, 137 9"
        stroke="#0066FF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 11. Bottom Capsule Burst Rays Left & Right
function CapsuleBurstLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 26 L16 18"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 10 L22 14"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 3 L22 12"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CapsuleBurstRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 26 L16 18"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 10 L10 14"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M8 3 L10 12"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 12. Upward Hand-Drawn Arrow for "Worth your time!"
function UpwardHandDrawnArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 34 C12 24, 14 14, 12 4"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M4 14 L12 3 L20 14"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── CHECKLIST DATA ───────────────────────────────────────────────────────────
const checklistItems = [
  "How we choose the right services.",
  "How we find the searches worth paying for.",
  "How we stop Google wasting your money.",
  "How we track calls and quote requests.",
  "And how we decide whether Google Ads even makes sense for your market.",
];

interface MyselfvideoSectionProps {
  /** Video source URL. When omitted, plays a demo video or shows high-fidelity player modal */
  videoSrc?: string;
  /** Custom thumbnail URL if needed */
  thumbnailSrc?: string;
}

export default function MyselfvideoSection({
  videoSrc,
  thumbnailSrc = "/MySelfVideo/placeholder.jpg",
}: MyselfvideoSectionProps) {
  const [isPlayingModal, setIsPlayingModal] = useState(false);

  return (
    <section
      id="myself-video"
      className="relative py-8 sm:py-10 md:py-16 bg-white overflow-hidden"
    >
      {/* ─── AMBIENT ATMOSPHERIC LIGHTING GLOWS ─── */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 via-sky-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-blue-100/40 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-50/60 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Decorative Dot Grid (Top Right) */}
      <div className="absolute top-8 right-6 lg:right-12 hidden xl:grid grid-cols-6 gap-3 opacity-25 pointer-events-none select-none -z-10">
        {Array.from({ length: 42 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-blue-500"
          />
        ))}
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── 2-COLUMN MAIN CONTENT GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* ════════════════ LEFT COLUMN (COPYWRITING & CHECKLIST) ════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left w-full">
            {/* 1. Video Introduction Pill */}
            {/* <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-[#0066FF] shadow-xs"
            >
              <Play className="w-3 h-3 fill-[#0066FF] text-[#0066FF]" />
              <span className="text-xs sm:text-[12.5px] font-extrabold tracking-wider uppercase">
                VIDEO INTRODUCTION
              </span>
            </motion.div> */}

            {/* 2. Main Headline: Exactly 2 lines on desktop */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-3xl sm:text-4xl md:text-[44px] lg:text-[42px] xl:text-[48px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mt-4"
            >
              <span className="relative inline-block whitespace-normal sm:whitespace-nowrap">
                Give Me{" "}
                <span className="relative text-[#0066FF] font-black inline-block">
                  2 Minutes
                  {/* Bold Hand-Drawn Arrow pointing down-left directly toward "2 Minutes" */}
                  <div className="absolute -top-8 sm:-top-10 -right-16 sm:-right-24 w-16 sm:w-20 h-auto pointer-events-none select-none">
                    <HeadingTwoMinutesArrow className="w-full h-auto drop-shadow-xs" />
                  </div>
                </span>
              </span>
              <span className="relative inline-block mt-1 whitespace-normal sm:whitespace-nowrap">
                Before You Decide Anything.
                <CurvedHeadingUnderline className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#0066FF]" />
              </span>
            </motion.h2>

            {/* 3. Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-slate-600 text-base sm:text-[17px] font-normal leading-relaxed mt-4 mb-5"
            >
              I&apos;ll show you exactly how we approach Google Ads for
              contractors.
            </motion.p>

            {/* 4. Checklist Items */}
            <div className="w-full space-y-0 divide-y divide-slate-100/90 border-t border-slate-100/90">
              {checklistItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.22 + idx * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3.5 py-3.5 group"
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-200">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[14.5px] sm:text-[15.5px] font-medium text-slate-700 leading-snug">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* 5. Bottom Guarantee Card ("No complicated marketing talk. Just numbers.") */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full mt-6 p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 shadow-[0_4px_20px_-4px_rgba(0,102,255,0.06)] flex items-center gap-4 group hover:border-blue-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-[#0066FF] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] sm:text-base font-bold text-slate-800 leading-snug">
                  No complicated marketing talk.
                </span>
                <div className="relative inline-block mt-0.5">
                  <span className="text-lg sm:text-xl font-extrabold text-[#0066FF] leading-tight">
                    Just numbers.
                  </span>
                  <BlueUnderline className="w-28 sm:w-32 h-2 sm:h-2.5 mt-0.5" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ════════════════ RIGHT COLUMN (3D SKEWED VIDEO SHOWCASE) ════════════════ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center relative w-full pt-8 lg:pt-0">
            {/* ── Centered Top Handwritten Callout ("Press play and give me just 2 minutes!") ── */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex justify-center mb-4 sm:mb-5 relative z-20"
            >
              <div className="relative inline-flex flex-col items-center text-center">
                <span className="font-caveat text-2xl sm:text-3xl md:text-[32px] lg:text-5xl font-bold text-[#0066FF] leading-none tracking-wide -rotate-1">
                  Press play and give me
                </span>
                <div className="relative inline-block mt-1">
                  <span className="font-caveat text-2xl sm:text-3xl md:text-[32px] lg:text-4xl font-bold text-[#0066FF] leading-none tracking-wide -rotate-1">
                    just 2 minutes!
                  </span>
                  <DoubleUnderline className="w-36 sm:w-44 h-3 mt-0.5" />
                </div>

                {/* Hand-Drawn Arrow curving down towards the video from the right of the text */}
                <div className="absolute -right-14 sm:-right-20 top-2 w-14 sm:w-18 h-auto">
                  <CenterTopCurvedArrow className="w-full h-auto" />
                </div>
              </div>
            </motion.div>

            {/* ── Bold Directional Arrows & Bursts Surrounding the Video ── */}
            {/* Left incoming bold arrow */}
            <div className="absolute -left-8 sm:-left-12 top-[45%] w-14 sm:w-20 hidden sm:block z-20 pointer-events-none">
              <BigBoldLeftArrow className="w-full h-auto drop-shadow-sm" />
            </div>

            {/* Right incoming radial sparkles */}
            <div className="absolute -right-3 sm:-right-7 top-16 w-10 sm:w-12 hidden sm:block z-20 pointer-events-none">
              <TopRightBurstSparkles className="w-full h-auto" />
            </div>

            {/* Right Big Bold Swoop Arrow */}
            <div className="absolute -right-12 sm:-right-18 top-28 w-20 sm:w-28 hidden sm:block z-20 pointer-events-none">
              <BigBoldRightSwoopArrow className="w-full h-auto drop-shadow-md" />
            </div>

            {/* Right Lower Curved Arrow */}
            <div className="absolute -right-8 sm:-right-12 bottom-16 w-16 sm:w-22 hidden sm:block z-20 pointer-events-none">
              <RightLowerCurvedArrow className="w-full h-auto drop-shadow-sm" />
            </div>

            {/* ── 3D CURVED / SKEWED VIDEO CONTAINER ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                perspective: "1200px",
              }}
              className="w-full max-w-[620px] relative z-10 group cursor-pointer"
              onClick={() => setIsPlayingModal(true)}
            >
              {/* Outer 3D Perspective Chassis with Curved Skew Style */}
              <div
                style={{
                  transform:
                    "perspective(1200px) rotateY(-7deg) rotateX(3deg) rotateZ(-0.8deg)",
                  transformOrigin: "center center",
                }}
                className="relative rounded-[32px] sm:rounded-[38px] overflow-hidden bg-slate-950 border border-slate-800 shadow-[25px_35px_65px_-15px_rgba(15,23,42,0.38),-5px_-5px_30px_rgba(0,102,255,0.06),0_0_50px_rgba(0,102,255,0.12)] group-hover:shadow-[30px_40px_75px_-12px_rgba(0,102,255,0.25)] group-hover:rotate-0 transition-all duration-500"
              >
                {/* Specular Top Border Highlight */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent z-20 pointer-events-none" />

                {/* Video / Thumbnail Aspect Container */}
                <div className="relative aspect-[16/9.6] w-full overflow-hidden bg-slate-900">
                  {/* High Quality Presenter Thumbnail Image */}
                  <Image
                    src={thumbnailSrc}
                    alt="Give Me 2 Minutes Video Introduction"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Dark Cinematic Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/40 group-hover:via-slate-950/20 transition-colors duration-300" />

                  {/* ── Handwritten Thumbnail Overlays ── */}
                  {/* Left: "Watch this first" + Arrow */}
                  <div className="absolute left-4 sm:left-6 top-1/3 flex flex-col items-start z-10 select-none pointer-events-none">
                    <span className="font-caveat text-xl sm:text-2xl md:text-[27px] font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] -rotate-6">
                      Watch this first
                    </span>
                    <div className="w-12 sm:w-16 h-auto mt-1 ml-4">
                      <WhiteCurvedArrow className="w-full h-auto drop-shadow-md" />
                    </div>
                  </div>

                  {/* Right: "It could save you thousands on Google Ads" */}
                  <div className="absolute right-4 sm:right-6 top-1/4 flex flex-col items-end text-right z-10 select-none pointer-events-none max-w-[170px] sm:max-w-[210px]">
                    <span className="font-caveat text-lg sm:text-xl md:text-[24px] font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] rotate-2 leading-tight">
                      It could save you thousands on
                    </span>
                    <div className="relative inline-block mt-0.5">
                      <span className="font-caveat text-xl sm:text-2xl md:text-[28px] font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] rotate-2">
                        Google Ads
                      </span>
                      <WhiteUnderline className="w-24 sm:w-30 h-2 mt-0.5" />
                    </div>
                  </div>

                  {/* ── Center Pulsing Glass Play Button ── */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative flex items-center justify-center">
                      {/* Outer Glowing Energy Rings */}
                      <div className="absolute w-20 h-20 sm:w-26 sm:h-26 rounded-full bg-[#0066FF]/40 blur-lg animate-ping opacity-60" />
                      <div className="absolute w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#0066FF]/35 blur-md group-hover:scale-125 transition-transform duration-500" />

                      {/* Glass Button Frame */}
                      <div className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full bg-white/20 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300">
                        <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-[#0066FF] text-[#0066FF] ml-0.5 group-hover:scale-105 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Realistic Video Player Bottom Bar ── */}
                <div className="relative z-10 px-4 sm:px-5 py-3 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-between gap-3 text-white text-xs sm:text-sm">
                  {/* Left Controls: Play, Skip, Time */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
                    <button
                      type="button"
                      aria-label="Play video"
                      className="text-white hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                    </button>
                    <button
                      type="button"
                      aria-label="Skip next"
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <span className="font-mono text-[11px] sm:text-xs text-slate-300">
                      0:00 / 2:00
                    </span>
                  </div>

                  {/* Center Progress Bar */}
                  <div className="flex-1 mx-2 relative h-1 sm:h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer group/track">
                    <div className="absolute left-0 top-0 bottom-0 w-[42%] bg-[#0066FF] rounded-full shadow-[0_0_8px_rgba(0,102,255,0.8)]" />
                  </div>

                  {/* Right Controls: Volume, Settings, Fullscreen */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-slate-400">
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 hover:text-white transition-colors cursor-pointer" />
                    <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 hover:text-white transition-colors cursor-pointer" />
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── BOTTOM CALLOUT CAPSULE ("Just 2 minutes that could save you thousands.") ─── */}
        <div className="mt-10 sm:mt-10 md:mt-8 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-flex items-center"
          >
            {/* Left Sparkle Burst */}
            <div className="absolute -left-7 sm:-left-9 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-auto hidden sm:block pointer-events-none">
              <CapsuleBurstLeft className="w-full h-auto" />
            </div>

            {/* Right Sparkle Burst */}
            <div className="absolute -right-7 sm:-right-9 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-auto hidden sm:block pointer-events-none">
              <CapsuleBurstRight className="w-full h-auto" />
            </div>

            {/* Main Floating Capsule */}
            <div className="inline-flex items-center gap-3 sm:gap-3.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/95 backdrop-blur-xl border border-blue-200/90 shadow-[0_8px_30px_-5px_rgba(0,102,255,0.10)]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF] shrink-0">
                <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
              </div>
              <p className="text-sm sm:text-base md:text-[17px] font-semibold text-slate-800 tracking-tight">
                Just{" "}
                <span className="font-extrabold text-[#0066FF]">2 minutes</span>{" "}
                that could save you{" "}
                <span className="font-extrabold text-[#0066FF]">
                  thousands.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Underneath: Upward Arrow + "Worth your time!" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col items-center mt-3 select-none"
          >
            <div className="w-5 h-auto text-[#0066FF]">
              <UpwardHandDrawnArrow className="w-full h-auto" />
            </div>
            <div className="relative inline-block mt-0.5">
              <span className="font-caveat text-xl sm:text-2xl font-bold text-slate-800 -rotate-1 inline-block">
                Worth your time!
              </span>
              <BlueUnderline className="w-28 sm:w-32 h-2 mt-0.5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── LIGHTBOX VIDEO PLAYER MODAL ─── */}
      <AnimatePresence>
        {isPlayingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsPlayingModal(false)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900/90 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-[#0066FF]">
                    <Play className="w-4 h-4 fill-[#0066FF] ml-0.5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      Give Me 2 Minutes Before You Decide Anything
                    </h3>
                    <p className="text-xs text-slate-400">
                      Our proven Google Ads approach for contractors
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPlayingModal(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {videoSrc ? (
                  <video
                    src={videoSrc}
                    poster={thumbnailSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML video.
                  </video>
                ) : (
                  <div className="flex flex-col items-center text-center p-8 text-white">
                    <PlayCircle className="w-16 h-16 text-[#0066FF] mb-4 animate-pulse" />
                    <h4 className="text-lg font-bold">
                      Video Presentation Placeholder
                    </h4>
                    <p className="text-sm text-slate-400 max-w-md mt-1">
                      Ready to swap in your 2-minute video. Pass the URL into
                      the{" "}
                      <code className="text-blue-400 font-mono text-xs">
                        videoSrc
                      </code>{" "}
                      prop in{" "}
                      <code className="text-blue-400 font-mono text-xs">
                        MyselfvideoSection.tsx
                      </code>
                      .
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
