"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import WordReveal from "./shared/WordReveal";

const results = [
  {
    metric: "312%",
    label: "Increase in Organic Keywords",
    description:
      "From 847 to 3,489 ranking keywords in 8 months of systematic content optimization.",
  },
  {
    metric: "4.7x",
    label: "Return on SEO Investment",
    description:
      "Every dollar spent on SEO generated $4.70 in revenue through organic conversions.",
  },
  {
    metric: "#1",
    label: "Rankings for 47 High-Value Keywords",
    description:
      "Achieved first-position rankings for competitive commercial-intent search terms.",
  },
  {
    metric: "68%",
    label: "Reduction in Customer Acquisition Cost",
    description:
      "By shifting budget from paid to organic, overall CAC dropped dramatically.",
  },
];

export default function SeoResults() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mainImgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    { stiffness: 60, damping: 30 }
  );
  const secondaryImgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -60]),
    { stiffness: 50, damping: 25 }
  );
  const secondaryImgRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [-6, 6]),
    { stiffness: 50, damping: 25 }
  );
  const curveX = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 50]), { stiffness: 50, damping: 20 });
  const curveY = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -20]), { stiffness: 50, damping: 20 });
  const floatingBadgeY = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, -40]),
    { stiffness: 70, damping: 30 }
  );

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800"
    >
      {/* ── Dynamic Organic Top Divider ────────────────── */}
      <div className="absolute top-0 left-0 w-full h-40 sm:h-56 overflow-hidden pointer-events-none -translate-y-[99.5%] z-[10]">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-[110%] h-full left-1/2 -translate-x-1/2"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(59, 130, 246, 0.15)" />
            </pattern>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Background Layer with Dotted Texture */}
          <motion.path
            style={{ x: useTransform(curveX, (v) => v * 0.4), y: useTransform(curveY, (v) => v * 0.8) }}
            d="M0,160 C480,300 960,100 1440,240 L1440,320 L0,320 Z"
            fill="url(#dotPattern)"
          />

          {/* Organic Layered Waves */}
          <motion.path
            style={{ x: useTransform(curveX, (v) => -v * 0.7), y: useTransform(curveY, (v) => v * 1.5) }}
            d="M0,224 C360,150 720,320 1080,220 C1260,170 1440,224 1440,224 L1440,320 L0,320 Z"
            fill="white"
            fillOpacity="0.3"
          />
          
          <motion.path
            style={{ x: curveX, y: curveY }}
            d="M0,160 C240,100 480,224 720,160 C960,96 1200,224 1440,160 L1440,320 L0,320 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Glow following the curve */}
        <motion.div 
          style={{ y: useTransform(curveY, (v) => v * 0.5) }}
          className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-blue-400/10 via-blue-500/5 to-transparent blur-3xl" 
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-sky-400/10 rounded-full blur-[80px]"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-400 uppercase mb-4 block"
          >
            Proven Results
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-[900] tracking-tight text-white leading-[1.1] mb-5">
            <WordReveal text="Rankings That" delay={0.1} />
            <br className="hidden sm:block" />{" "}
            <span className="text-white bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
              <WordReveal text="Translate To Revenue" delay={0.4} />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-base lg:text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Our clients don&apos;t just rank — they grow. Here&apos;s what happens
            when you combine the right strategy with relentless execution.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left — Dimensional Image Composition ──────── */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.93 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full lg:w-1/2 relative"
            style={{ perspective: "900px" }}
          >
            {/* Deep shadow layer */}
            <div className="absolute inset-4 rounded-3xl bg-blue-500/8 blur-2xl translate-y-6 pointer-events-none" />

            {/* Main image — tilted with depth */}
            <motion.div
              style={{ y: mainImgY }}
              whileHover={{ rotateY: 4, rotateX: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.3)] group border border-white/8 transform-gpu [transform-style:preserve-3d]"
            >
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="/seoPage/image_2.png"
                  alt="Year-over-year organic traffic growth chart"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </motion.div>

            {/* Secondary floating image — neon arrow visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ y: secondaryImgY, rotate: secondaryImgRotate }}
              className="absolute -top-8 -right-4 sm:right-6 z-20 w-[130px] h-[130px] sm:w-[155px] sm:h-[155px]"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.3)] border border-white/15 transform-gpu"
              >
                <Image
                  src="/seoPage/image_6.png"
                  alt="Neon growth arrow visualization"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Floating result badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{ y: floatingBadgeY }}
              className="absolute -bottom-8 -left-3 sm:left-4 z-20"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] border border-white/20"
              >
                <p className="text-2xl font-[900] text-white mb-0.5">+412%</p>
                <p className="text-xs text-blue-300/70 font-semibold">
                  Organic traffic in 12 months
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right — Results list ──────────────────────── */}
          <div className="w-full lg:w-1/2 space-y-5">
            {results.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ x: 8, scale: 1.01 }}
                className="group flex gap-5 p-5 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 border border-transparent hover:border-white/10 cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/15 group-hover:border-blue-400/30 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <span className="text-lg font-[900] text-blue-400">
                    {result.metric}
                  </span>
                </motion.div>
                <div>
                  <h3 className="text-[15px] font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                    {result.label}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {result.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
