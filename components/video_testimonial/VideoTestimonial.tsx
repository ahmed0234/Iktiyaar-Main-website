"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  PlayCircle,
  X,
  ShieldCheck,
  Star,
  CheckCircle2,
  Quote,
  Users,
} from "lucide-react";
import Image from "next/image";
import { CurvedUnderline } from "../hero/HeroLogos";
import { DotGrid } from "../hero/Hero3DVisuals";

// ─── Decorative Hand-Drawn Dashed Arrows ──────────────────────────────────────
function LeftDashedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 200 C-10 130, 20 50, 140 30"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      {/* Arrowhead pointing towards top-right */}
      <path
        d="M125 18 L145 28 L138 48"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="18" cy="202" r="3.5" fill="#0066FF" />
    </svg>
  );
}

function RightDashedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M160 200 C200 130, 160 80, 25 35"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      {/* Arrowhead pointing towards top-left */}
      <path
        d="M40 22 L20 34 L30 52"
        stroke="#0066FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="162" cy="202" r="3.5" fill="#0066FF" />
    </svg>
  );
}

// ─── Testimonials Data ────────────────────────────────────────────────────────
interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  company: string;
  duration: string;
  statPrimary: string;
  statSecondary: string;
  thumbnail: string;
  youtubeId?: string;
  videoSrc?: string;
  quoteSnippet: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: "michael-swisher",
    name: "Michael Swisher",
    role: "Owner",
    company: "Swisher Capital",
    duration: "01:12",
    statPrimary: "$110K Revenue",
    statSecondary: "in 90 Days",
    thumbnail: "/videoTestimonialThumbnails/1stTestimonail.webp",
    youtubeId: "zLIhI9GthRs",
    quoteSnippet:
      "Working with Ikhtiyaar completely transformed our outbound acquisition engine, scaling us to over $110K in closed revenue within our first 90 days.",
  },
  {
    id: "john-hall",
    name: "John Hall",
    role: "Owner",
    company: "J & J Cash Home Buyers",
    duration: "00:58",
    statPrimary: "$90k Revenue",
    statSecondary: "in 90 Days",
    thumbnail: "/videoTestimonialThumbnails/2ndTestimonial.webp",
    youtubeId: "QLyqYDhV__I",
    quoteSnippet:
      "Ikhtiyaar built a reliable client acquisition system that helped us generate $90k in revenue within 90 days.",
  },
  {
    id: "brandon-white",
    name: "Brandon White",
    company: "B&W Remodeling",
    duration: "01:18",
    statPrimary: "$180K+ revenue",
    statSecondary: "from Google Ads",
    thumbnail: "/video_testimonial/brandon_white.webp",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    quoteSnippet:
      "Working with Ikhtiyaar felt like having an in-house CMO. Transparent tracking, high ROI, and zero fluff.",
  },
];

// ─── Avatar stack data ────────────────────────────────────────────────────────
const clientAvatars = [
  "/Clients/1.png",
  "/Clients/2.png",
  "/Clients/3.png",
  "/Clients/4.png",
];

export default function VideoTestimonial() {
  const [activeModal, setActiveModal] = useState<TestimonialItem | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    if (activeModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  return (
    <section id="video-testimonial" className="relative py-10 sm:py-10 md:py-6 overflow-hidden bg-white">
      {/* ─── AMBIENT ATMOSPHERIC BACKGROUND GLOWS ─── */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 via-sky-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-gradient-to-bl from-blue-100/40 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Decorative Dot Grids */}
      <DotGrid
        className="absolute top-28 left-6 hidden xl:grid opacity-30 pointer-events-none -z-10"
        rows={6}
        cols={5}
      />
      <DotGrid
        className="absolute top-36 right-6 hidden xl:grid opacity-30 pointer-events-none -z-10"
        rows={7}
        cols={5}
      />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16 md:mb-20 relative">
          {/* Hand-Drawn Inward Curved Arrows (Desktop & Tablet) */}
          <div className="absolute -left-20 sm:-left-28 md:-left-36 top-6 w-28 sm:w-36 md:w-44 hidden md:block">
            <LeftDashedArrow className="w-full h-auto" />
          </div>
          <div className="absolute -right-20 sm:-right-28 md:-right-36 top-10 w-28 sm:w-36 md:w-44 hidden md:block">
            <RightDashedArrow className="w-full h-auto" />
          </div>

          {/* 1. Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-[0_2px_10px_-2px_rgba(0,102,255,0.06)] backdrop-blur-md"
          >
            <Users className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              Real Contractors.{" "}
              <span className="text-[#0066FF] font-bold">Real Results.</span>
            </span>
          </motion.div>

          {/* 2. Main Heading with Curved Underline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.12]"
          >
            Don’t Take My Word For It. <br />
            <span className="relative inline-block text-[#0066FF] mt-1.5 sm:mt-2">
              Hear It From The Contractors We Work With.
              <CurvedUnderline className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#0066FF]" />
            </span>
          </motion.h2>

          {/* 3. Supporting Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 max-w-2xl text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            <p>We let our results and our clients do the talking.</p>
            <p>
              See how contractors like you are growing with our Google Ads & SEO
              systems.
            </p>
          </motion.div>
        </div>

        {/* ─── 3-COLUMN VIDEO TESTIMONIAL CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-7 lg:gap-8 items-stretch">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 + idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center"
            >
              {/* Video Thumbnail Card */}
              <div
                onClick={() => setActiveModal(item)}
                className="w-full relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12),0_0_30px_rgba(59,130,246,0.06)] hover:shadow-[0_25px_60px_-10px_rgba(0,102,255,0.18)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer aspect-[4/3.8] flex flex-col justify-between"
              >
                {/* Background Image */}
                <Image
                  src={item.thumbnail}
                  alt={`${item.name} from ${item.company}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority={idx === 0}
                />

                {/* Dark Vignette Overlay for Depth & Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35 group-hover:via-black/20 transition-colors duration-300" />

                {/* Top Duration Badge */}
                <div className="relative z-10 p-4 sm:p-5 flex items-start justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs group-hover:bg-black/60 transition-colors">
                    <Play className="w-2.5 h-2.5 fill-white text-white" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Centered Glowing Glass Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Aura */}
                    <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0066FF]/30 blur-md group-hover:bg-[#0066FF]/50 group-hover:scale-125 transition-all duration-500 animate-pulse" />

                    {/* Button Body */}
                    <div className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/70 flex items-center justify-center text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] group-hover:scale-110 group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Information Strip */}
                <div className="relative z-10 p-3 sm:p-4">
                  <div className="relative p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15)] flex items-center justify-between gap-3">
                    {/* Blue Quote Icon Pinned on Top Right */}
                    <div className="absolute -top-3 -right-2.5 w-6.5 h-6.5 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-md border-2 border-white">
                      <Quote className="w-3 h-3 fill-white text-white" />
                    </div>

                    {/* Left: Contractor info */}
                    <div className="flex flex-col min-w-0 pr-1">
                      <h4 className="text-[15px] sm:text-base font-extrabold text-slate-900 leading-snug truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs sm:text-[13px] font-semibold text-[#0066FF] truncate">
                          {item.role ? `${item.role}, ${item.company}` : item.company}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 fill-[#0066FF] text-white shrink-0" />
                      </div>
                    </div>

                    {/* Center Divider */}
                    <div className="w-px h-8 bg-slate-200/80 shrink-0" />

                    {/* Right: Key Result */}
                    <div className="flex flex-col text-right shrink-0">
                      <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-tight">
                        {item.statPrimary}
                      </span>
                      <span className="text-[10.5px] sm:text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
                        {item.statSecondary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Card "Watch [Name]'s Story" Button */}
              <button
                onClick={() => setActiveModal(item)}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-blue-50/80 border border-slate-200/90 hover:border-blue-300 text-slate-700 hover:text-[#0066FF] font-bold text-xs sm:text-[13px] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:shadow-sm transition-all duration-200 group/btn cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-[#0066FF] group-hover/btn:scale-110 transition-transform" />
                <span>Watch {item.name.split(" ")[0]}’s Story</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* ─── BOTTOM SOCIAL PROOF STRIP ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-16 md:mt-20 flex justify-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_-5px_rgba(15,23,42,0.06),0_0_20px_rgba(59,130,246,0.04)]">
            {/* Left: Shield & Trust statement */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                Trusted by contractors{" "}
                <strong className="font-bold text-[#0066FF]">
                  across the U.S.
                </strong>
              </span>
            </div>

            {/* Middle: Overlapping Avatars */}
            <div className="flex items-center -space-x-2">
              {clientAvatars.map((src, i) => (
                <div
                  key={i}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden relative shadow-xs bg-slate-100"
                >
                  <Image
                    src={src}
                    alt="Contractor client"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-[#0066FF] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                50+
              </div>
            </div>

            {/* Right: 5 Star Rating */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 sm:border-l border-slate-200">
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  5 Star Rated
                </span>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-blue-500 text-blue-500"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── INTERACTIVE LIGHTBOX VIDEO MODAL ─── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
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
                      {activeModal.name} ·{" "}
                      <span className="text-blue-400 font-semibold">
                        {activeModal.role ? `${activeModal.role}, ${activeModal.company}` : activeModal.company}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Case Study Interview · Result:{" "}
                      <span className="text-emerald-400 font-bold">
                        {activeModal.statPrimary} ({activeModal.statSecondary})
                      </span>
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                {activeModal.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeModal.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={`${activeModal.name} - Testimonial Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : activeModal.videoSrc ? (
                  <video
                    src={activeModal.videoSrc}
                    poster={activeModal.thumbnail}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support HTML video.
                  </video>
                ) : (
                  <div className="flex flex-col items-center text-center p-8 text-white">
                    <PlayCircle className="w-16 h-16 text-blue-500 mb-4 animate-pulse" />
                    <h4 className="text-lg font-bold">
                      Video Testimonial Coming Soon
                    </h4>
                    <p className="text-sm text-slate-400 max-w-md mt-1">
                      {activeModal.quoteSnippet}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer / Quote Snippet */}
              <div className="px-5 sm:px-6 py-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-slate-300">
                <p className="italic line-clamp-2">
                  &ldquo;{activeModal.quoteSnippet}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
