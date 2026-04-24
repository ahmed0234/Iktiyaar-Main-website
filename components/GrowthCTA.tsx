"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
} from "lucide-react";

/* ─── Proof Points ─────────────────────────────────────────────────────────── */
const proofPoints = [
  { icon: TrendingUp, label: "20%+ Revenue Growth" },
  { icon: Shield, label: "50% Cost Reduction" },
  { icon: Clock, label: "Fast turnaround with real outcomes" },
  { icon: Zap, label: "AI-Powered Systems" },
];

/* ─── Split Word Reveal ────────────────────────────────────────────────────── */
function WordReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: "110%", rotateX: -60 }}
            animate={
              isInView
                ? { y: "0%", rotateX: 0 }
                : { y: "110%", rotateX: -60 }
            }
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block will-change-transform"
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Main Export ───────────────────────────────────────────────────────────── */
export default function GrowthCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* Parallax for floating shapes */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const floatY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), {
    stiffness: 80,
    damping: 30,
  });
  const floatY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-30, 50]),
    { stiffness: 80, damping: 30 }
  );

  return (
    <section
      ref={sectionRef}
      id="growth-cta"
      className="relative py-6 sm:py-10 lg:py-16 overflow-hidden bg-white"
    >
      {/* ── Atmospheric Background ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large ambient blobs */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px] bg-blue-50/40 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-25%] right-[-15%] w-[800px] h-[800px] bg-indigo-50/30 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-sky-50/20 rounded-full blur-[120px]"
        />

        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Floating Geometric Accents ─────────────────────────────────── */}
      <motion.div
        style={{ y: floatY }}
        className="absolute top-[15%] right-[8%] hidden lg:block pointer-events-none"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-2xl border border-blue-100/50 bg-blue-50/20 backdrop-blur-sm"
        />
      </motion.div>
      <motion.div
        style={{ y: floatY2 }}
        className="absolute bottom-[20%] left-[6%] hidden lg:block pointer-events-none"
      >
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 rounded-xl border border-indigo-100/40 bg-indigo-50/15 backdrop-blur-sm"
        />
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top: Headline Block */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/40 px-5 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-blue-700 uppercase tracking-[0.2em]">
              Ready to Scale
            </span>
          </motion.div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[900] text-slate-900 leading-[1.08] tracking-tight mb-6 sm:mb-8">
            <WordReveal text="Stop Managing Everything." delay={0.1} />
            <br className="hidden sm:block" />{" "}
            <span className="inline sm:hidden"> </span>
            <WordReveal text="Start Scaling" delay={0.5} />
            {" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              <WordReveal text="Smarter." delay={0.75} />
            </span>
          </h2>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            If you&apos;re ready to cut costs, increase revenue, and build a
            system that works without you&nbsp;&mdash; it starts with one
            conversation. Let&apos;s make your growth predictable.
          </motion.p>
        </div>

        {/* ── Proof Points Row ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 sm:mb-20"
        >
          {proofPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 1.0 + idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors duration-300 whitespace-nowrap">
                  {point.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── CTA Banner Card ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: 1.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative group/banner"
        >
          {/* Glow behind the banner */}
          <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-blue-400/10 via-indigo-400/8 to-blue-400/10 blur-2xl opacity-0 group-hover/banner:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
            {/* Gradient base */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #3b82f6 30%, #38bdf8 70%, #60a5fa 100%)",
              }}
            />

            {/* Animated noise mesh overlay */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px, 45px 45px",
                }}
              />
            </div>

            {/* Soft inner lighting sweeps */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear",
                repeatDelay: 2,
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-15deg] pointer-events-none"
            />

            {/* Decorative floating 3D shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-8 -top-8 sm:right-6 sm:top-4 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm"
              />
              <motion.div
                animate={{
                  y: [8, -12, 8],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-16 sm:right-28 -bottom-6 sm:bottom-2 w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              />
              <motion.div
                animate={{
                  y: [-8, 15, -8],
                  x: [-5, 5, -5],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-44 sm:right-64 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hidden sm:block"
              />
            </div>

            {/* Banner Content */}
            <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Left: Text */}
              <div className="text-center lg:text-left flex-1 space-y-4">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 1.5 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-[900] text-white tracking-tight leading-tight"
                >
                  Book a free Growth Audit
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 1.65 }}
                  className="text-sm sm:text-base text-blue-100/80 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed"
                >
                  See exactly where you&apos;re losing money and what it would
                  take to fix it&nbsp;&mdash; in a single call.
                </motion.p>

                {/* Trust markers */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 pt-2"
                >
                  {[
                    "No obligation",
                    "100% confidential",
                    "Actionable insights",
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-xs font-semibold text-white/60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right: CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="shrink-0"
              >
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/cta relative flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-white/15 backdrop-blur-xl rounded-[1.25rem] font-bold text-base sm:text-lg text-white border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden transition-all duration-500 hover:bg-white/25 hover:border-white/60 hover:shadow-[0_20px_50px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.1)]"
                  >
                    {/* High-end Shimmer Sweep */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "linear",
                          repeatDelay: 1.5,
                        }}
                        className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg]"
                      />
                    </div>

                    <span className="relative z-10 tracking-tight text-center">
                      Get A Free Growth Audit
                    </span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </motion.div>
                    
                    {/* Inner Reflection Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
