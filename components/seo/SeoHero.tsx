"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowRight, TrendingUp, Search, BarChart3 } from "lucide-react";

export default function SeoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 40 });

  const gridRotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const gridRotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const imageRotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const imageRotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  // Parallax for floating cards
  const floatX1 = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const floatY1 = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const floatX2 = useTransform(springX, [-0.5, 0.5], [22, -22]);
  const floatY2 = useTransform(springY, [-0.5, 0.5], [22, -22]);
  const floatX3 = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const floatY3 = useTransform(springY, [-0.5, 0.5], [14, -14]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="seo-hero"
      className="relative min-h-[78vh] pt-24 md:pt-16 pb-0 overflow-hidden flex items-center bg-white group/hero"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Interactive Grid Background */}
      <motion.div
        style={{ rotateX: gridRotateX, rotateY: gridRotateY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none origin-center"
      >
        <div
          className="w-[200vw] h-[200vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200/60 transition-colors duration-1000 group-hover/hero:text-blue-300/40"
          style={{
            backgroundImage: `radial-gradient(circle at center, transparent 10%, white 60%), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: `100% 100%, 70px 70px, 70px 70px`,
          }}
        />
      </motion.div>

      {/* Atmospheric orbs — breathing and alive */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] right-[-10%] w-[700px] h-[700px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-blue-300/15 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        style={{ y: parallaxY, scale: parallaxScale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Left — Text Content ─────────────────────────────── */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(8px)" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 inline-flex items-center space-x-2 rounded-full border border-blue-200/60 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 backdrop-blur-md hover:bg-blue-50/80 hover:border-blue-300/60 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                Search Engine Optimization
              </span>
            </motion.div>

            {/* Headline — Character-by-character reveals */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-[900] tracking-tight text-slate-900 leading-[1.05] mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", rotateX: -40 }}
                  animate={isInView ? { y: "0%", rotateX: 0 } : { y: "100%", rotateX: -40 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "bottom center" }}
                >
                  Turn Search Traffic
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", rotateX: -40 }}
                  animate={isInView ? { y: "0%", rotateX: 0 } : { y: "100%", rotateX: -40 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "bottom center" }}
                >
                  Into{" "}
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
                      Consistent Revenue
                    </span>
                    <motion.svg
                      className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-500 overflow-visible pointer-events-none"
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M 2 8 C 50 2 150 2 198 10"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 25, filter: "blur(6px)" }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium"
            >
              Ikhtiyaar builds SEO systems that rank your business where it
              matters&nbsp;&mdash; bringing in high-intent traffic that converts
              into leads, sales, and long-term growth.
            </motion.p>

            {/* CTA + Stats */}
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 25, filter: "blur(6px)" }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group/btn relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-8 py-4 font-bold text-white transition-all duration-300 shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_18px_45px_rgba(37,99,235,0.45)] border border-blue-400/40 ring-1 ring-inset ring-white/20 cursor-pointer"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-0 z-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none group-hover/btn:via-white/35 transition-all duration-500"
                  />
                  <span className="relative z-10 tracking-wide text-[16px] drop-shadow-md">
                    Get a Growth Plan
                  </span>
                  <ArrowRight
                    strokeWidth={2.5}
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                  />
                </motion.div>
              </Link>

              {/* Inline stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="flex items-center gap-6 text-sm"
              >
                <div className="flex flex-col group/stat cursor-default">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="text-2xl font-[900] text-slate-900 transition-colors duration-300 group-hover/stat:text-blue-600"
                  >
                    3x
                  </motion.span>
                  <span className="text-slate-400 font-medium text-xs">Avg. ROI</span>
                </div>
                <div className="w-px h-10 bg-slate-200/80" />
                <div className="flex flex-col group/stat cursor-default">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="text-2xl font-[900] text-slate-900 transition-colors duration-300 group-hover/stat:text-blue-600"
                  >
                    250%
                  </motion.span>
                  <span className="text-slate-400 font-medium text-xs">Traffic Growth</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right — Google Search Mockup ──────────────────── */}
          <div
            className="w-full lg:w-1/2 relative flex items-center justify-center py-4 lg:py-0"
            style={{ perspective: "900px" }}
          >
            {/* Deep ambient glow */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="absolute w-[380px] h-[380px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-blue-200/25 via-blue-100/10 to-transparent blur-3xl z-0 pointer-events-none"
            />

            {/* Main 3D tilting container */}
            <motion.div
              initial={{ y: 50, scale: 0.92, opacity: 0, filter: "blur(12px)" }}
              animate={isInView ? { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" } : { y: 50, scale: 0.92, opacity: 0, filter: "blur(12px)" }}
              transition={{
                duration: 1.0,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                rotateX: imageRotateX,
                rotateY: imageRotateY,
                x: imageX,
                y: imageY,
              }}
              className="relative z-10 w-full max-w-[480px] transform-gpu [transform-style:preserve-3d]"
            >
              {/* Drop shadow layer */}
              <div className="absolute inset-4 rounded-3xl bg-slate-900/[0.06] blur-2xl -z-10 translate-y-6" />

              {/* ── Google Search Card ──────────────────────── */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-[0_25px_60px_rgba(0,0,0,0.08),0_6px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                
                {/* Google Header Bar */}
                <div className="px-5 pt-4 pb-3 border-b border-slate-100/80">
                  {/* Google logo + actions */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5 text-[20px] font-medium select-none">
                      <span style={{ color: "#4285F4" }}>G</span>
                      <span style={{ color: "#EA4335" }}>o</span>
                      <span style={{ color: "#FBBC05" }}>o</span>
                      <span style={{ color: "#4285F4" }}>g</span>
                      <span style={{ color: "#34A853" }}>l</span>
                      <span style={{ color: "#EA4335" }}>e</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <svg className="w-3 h-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                        I
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <div className="flex-1 relative overflow-hidden">
                      <span className="text-[13px] text-slate-700 font-medium" style={{ filter: "blur(3.5px)", userSelect: "none" }}>
                        best digital marketing agency near me
                      </span>
                    </div>
                    <div className="w-px h-5 bg-slate-200" />
                    <div className="w-4 h-4 text-blue-500 shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                    </div>
                    <Search className="w-4 h-4 text-blue-500 shrink-0" />
                  </motion.div>

                  {/* Tab navigation */}
                  <div className="flex items-center gap-5 mt-3 -mb-[13px]">
                    {["All", "Images", "News", "Maps"].map((tab, i) => (
                      <span 
                        key={tab}
                        className={`text-[11px] font-medium pb-2.5 border-b-[2px] transition-colors duration-200 ${
                          i === 0 
                            ? "text-blue-600 border-blue-600" 
                            : "text-slate-500 border-transparent hover:text-slate-700"
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Search Results Area ─────────────────── */}
                <div className="px-5 py-3 space-y-3">
                  {/* Result count */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.0, duration: 0.4 }}
                    className="text-[10px] text-slate-400 font-medium"
                  >
                    About 2,340,000 results (0.32 seconds)
                  </motion.p>

                  {/* ── Sponsored Result 1 — Primary ──────── */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group/ad relative p-3.5 -mx-1 rounded-xl hover:bg-blue-50/30 transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">I</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-800 font-semibold">IKHTIYAAR</span>
                          <span className="text-[9px] font-bold text-white bg-slate-800 px-1.5 py-[1px] rounded leading-none tracking-wide">Ad</span>
                          <span className="text-[9px] font-semibold text-slate-400">· Sponsored</span>
                        </div>
                        <p className="text-[10px] text-green-700 font-medium leading-tight">www.ikhtiyaar.com/digital-growth</p>
                      </div>
                    </div>
                    
                    <h4 className="text-[15px] font-medium text-blue-700 leading-snug mb-1 group-hover/ad:underline transition-all duration-200">
                      Elevate Your Brand: Premium Digital Marketing Solutions
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                      Maximize your online presence with data-driven strategies. Ikhtiyaar delivers modern digital ads, SEO, and paid campaigns that convert. <span className="text-slate-700 font-medium">ROI Focused.</span>
                    </p>
                    
                    <div className="flex items-center gap-2.5 mt-2">
                      {["SEO Services", "Case Studies", "Contact Us"].map((link) => (
                        <span key={link} className="text-[10px] text-blue-600 font-medium hover:underline transition-all">
                          {link}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <div className="h-px bg-slate-100/80" />

                  {/* ── Sponsored Result 2 — Secondary ────── */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group/res p-3.5 -mx-1 rounded-xl hover:bg-slate-50/60 transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">I</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-800 font-semibold">IKHTIYAAR</span>
                          <span className="text-[9px] font-bold text-white bg-slate-800 px-1.5 py-[1px] rounded leading-none tracking-wide">Ad</span>
                          <span className="text-[9px] font-semibold text-slate-400">· Sponsored</span>
                        </div>
                        <p className="text-[10px] text-green-700 font-medium leading-tight">https://www.ikhtiyaar.com</p>
                      </div>
                    </div>
                    <h4 className="text-[14px] font-medium text-blue-700 leading-snug mb-1 group-hover/res:underline transition-all duration-200">
                      IKHTIYAAR — Digital Marketing Agency | Scalable Solutions
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                      Discover how Ikhtiyaar helps brands dominate search. We specialize in bespoke marketing strategies that drive growth.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Floating Stats Badge — Top Right ─────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[2%] right-[0%] lg:right-[-4%] z-20"
            >
              <motion.div style={{ x: floatX1, y: floatY1 }}>
                <motion.div
                  animate={{ y: [-8, 10, -8], rotate: [-1, 2, -1] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/70 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)] cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-50 to-green-100/60 flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wide">#1 Position</p>
                      <p className="text-sm font-[900] text-slate-900">
                        47 KWs{" "}
                        <span className="text-green-500 text-[10px] font-bold">+312%</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Floating Stats Badge — Bottom Left ──────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[4%] left-[-2%] lg:left-[-6%] z-20"
            >
              <motion.div style={{ x: floatX2, y: floatY2 }}>
                <motion.div
                  animate={{ y: [10, -8, 10], rotate: [1.5, -1.5, 1.5] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/70 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(139,92,246,0.15)] cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/60 flex items-center justify-center shadow-sm">
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wide">Domain Authority</p>
                      <p className="text-sm font-[900] text-slate-900">
                        63 <span className="text-purple-500 text-[10px] font-bold">+28pts</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
