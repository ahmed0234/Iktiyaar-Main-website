"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  animate,
} from "motion/react";
import {
  ArrowRight,
  TrendingUp,
  Phone,
  DollarSign,
  Target,
  BarChart3,
  CheckCircle2,
  Star,
  Quote,
  ArrowUpRight,
  Activity,
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;
// Dentish accent: cyan/teal overtones on top of the site's blue system
const ACCENT = {
  primary: "#2563eb", // blue-600
  light: "#60a5fa", // blue-400
  glow: "rgba(37,99,235,0.15)",
  cyan: "#0ea5e9", // sky-500
  teal: "#06b6d4", // cyan-500
};

// ─── Count-up Hook ───────────────────────────────────────────────────────────
function useCountUp(
  target: number,
  duration: number = 2000,
  shouldStart: boolean = false,
  decimals: number = 0,
) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const ctrl = animate(0, target, {
      duration: duration / 1000,
      ease: EASE,
      onUpdate: (v) => setValue(Number(v.toFixed(decimals))),
    });
    return ctrl.stop;
  }, [target, duration, shouldStart, decimals]);
  return value;
}

// ─── Split-Word Reveal (matching site-wide pattern) ──────────────────────────
function SplitReveal({
  text,
  delay = 0,
  className = "",
  isAccent = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  isAccent?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
          className="mr-[0.22em]"
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: delay + i * 0.055,
            }}
            className={
              isAccent
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400"
                : ""
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Live Pulsing Dot ────────────────────────────────────────────────────────
function LiveDot({ color = "blue" }: { color?: string }) {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-60`}
      />
      <span
        className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`}
      />
    </span>
  );
}

// ─── Dot Grid ────────────────────────────────────────────────────────────────
function DotGrid({
  color = "#3b82f6",
  opacity = 0.025,
  size = 28,
}: {
  color?: string;
  opacity?: number;
  size?: number;
}) {
  const id = `dot-${size}-${color.replace("#", "")}`;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── KPI Metrics (left side) ─────────────────────────────────────────────────
const kpiData = [
  {
    value: 312,
    prefix: "+",
    suffix: "%",
    label: "Qualified Leads",
    icon: Target,
    color: "from-blue-500 to-blue-400",
    bg: "bg-blue-50 border-blue-100",
    text: "text-blue-600",
    glow: "rgba(37,99,235,0.12)",
  },
  {
    value: 184,
    prefix: "+",
    suffix: "%",
    label: "Appointment Requests",
    icon: Calendar,
    color: "from-sky-500 to-cyan-400",
    bg: "bg-sky-50 border-sky-100",
    text: "text-sky-600",
    glow: "rgba(14,165,233,0.12)",
  },
  {
    value: 42,
    prefix: "-",
    suffix: "%",
    label: "Cost Per Acquisition",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-400",
    bg: "bg-emerald-50 border-emerald-100",
    text: "text-emerald-600",
    glow: "rgba(16,185,129,0.12)",
    decimals: 0,
  },
  {
    value: 3.7,
    prefix: "",
    suffix: "x",
    label: "Return on Ad Spend",
    icon: BarChart3,
    color: "from-violet-500 to-violet-400",
    bg: "bg-violet-50 border-violet-100",
    text: "text-violet-600",
    glow: "rgba(139,92,246,0.12)",
    decimals: 1,
  },
] as const;

// ─── KPI Tile ─────────────────────────────────────────────────────────────────
function KPITile({
  kpi,
  index,
  shouldAnimate,
}: {
  kpi: (typeof kpiData)[number];
  index: number;
  shouldAnimate: boolean;
}) {
  const count = useCountUp(
    kpi.value,
    2000 + index * 200,
    shouldAnimate,
    "decimals" in kpi ? (kpi.decimals ?? 0) : 0,
  );
  const Icon = kpi.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.55 + index * 0.1, ease: EASE }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="group/kpi relative"
    >
      {/* glow ring on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover/kpi:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 30px 6px ${kpi.glow}, 0 16px 30px -12px ${kpi.glow}`,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-slate-100/80 bg-white/75 backdrop-blur-xl p-4 shadow-lg shadow-slate-200/20 group-hover/kpi:bg-white group-hover/kpi:shadow-2xl transition-all duration-400">
        {/* shimmer */}
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover/kpi:opacity-100 transition-opacity duration-500">
          <motion.div
            animate={{ x: ["-200%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
          />
        </motion.div>

        <div className="relative z-10 flex items-start gap-3">
          <div
            className={`flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl border ${kpi.bg} transition-all duration-300 group-hover/kpi:shadow-md`}
          >
            <Icon className={`w-4 h-4 ${kpi.text}`} strokeWidth={2} />
          </div>
          <div>
            <div className="text-2xl font-[900] text-slate-900 tracking-tight leading-none">
              <span>{kpi.prefix}</span>
              {count}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${kpi.color}`}
              >
                {kpi.suffix}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
              {kpi.label}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Patient Acquisition Flow (animated funnel, right panel) ─────────────────
const flowSteps = [
  {
    label: "Google Search",
    icon: Search,
    color: "bg-slate-100 border-slate-200",
    dot: "#94a3b8",
    val: "8,400 searches / mo",
  },
  {
    label: "Google Ads",
    icon: Target,
    color: "bg-blue-50 border-blue-200",
    dot: "#3b82f6",
    val: "1,920 clicks",
  },
  {
    label: "Landing Page",
    icon: Activity,
    color: "bg-sky-50 border-sky-200",
    dot: "#0ea5e9",
    val: "487 visitors",
  },
  {
    label: "Phone Call",
    icon: Phone,
    color: "bg-cyan-50 border-cyan-200",
    dot: "#06b6d4",
    val: "183 calls tracked",
  },
  {
    label: "Booked Appointment",
    icon: Calendar,
    color: "bg-emerald-50 border-emerald-200",
    dot: "#10b981",
    val: "112 booked",
  },
] as const;

function PatientFlowPanel({ inView }: { inView: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 140,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 140,
    damping: 22,
  });

  function onMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, x: 50, scale: 0.94 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.3, ease: EASE }}
      className="relative w-full"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* ambient glow */}
        <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-blue-100/50 via-sky-50/30 to-transparent blur-2xl pointer-events-none" />

        {/* main card */}
        <div className="relative rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-200/40 overflow-hidden">
          {/* titlebar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-3 py-0.5 rounded-md bg-slate-100/80 text-[12px] text-slate-600 font-semibold">
                Patient Acquisition Engine Dentish
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <LiveDot color="emerald" />
              <span className="text-[10px] font-bold text-emerald-700">
                Live
              </span>
            </div>
          </div>

          <div className="p-5 space-y-3">
            {/* top KPI row */}
            <div className="grid grid-cols-3 gap-2.5 mb-1">
              {[
                {
                  label: "Monthly Leads",
                  val: "312+",
                  color: "text-blue-600",
                  bg: "bg-blue-50 border-blue-100",
                },
                {
                  label: "ROAS",
                  val: "3.7x",
                  color: "text-violet-600",
                  bg: "bg-violet-50 border-violet-100",
                },
                {
                  label: "CPA Reduction",
                  val: "−42%",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50 border-emerald-100",
                },
              ].map((k, i) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: 0.5 + i * 0.08,
                  }}
                  className={`rounded-xl border ${k.bg} p-2.5 text-center`}
                >
                  <p className={`text-lg font-black ${k.color} leading-none`}>
                    {k.val}
                  </p>
                  <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wide mt-0.5">
                    {k.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* patient acquisition flow */}
            <div className="rounded-xl bg-gradient-to-br from-slate-50/80 to-white border border-slate-100 p-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                Patient Acquisition Flow
              </p>

              <div className="space-y-2">
                {flowSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <React.Fragment key={step.label}>
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.45,
                          ease: EASE,
                          delay: 0.7 + i * 0.1,
                        }}
                        className={`flex items-center gap-3 rounded-xl border ${step.color} px-3 py-2 group/step hover:shadow-sm transition-all duration-200`}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${step.dot}20` }}
                        >
                          <Icon
                            className="w-3.5 h-3.5"
                            style={{ color: step.dot }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-bold text-slate-800">
                            {step.label}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium truncate">
                            {step.val}
                          </p>
                        </div>
                        {/* Animated fill bar */}
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              inView ? { width: `${100 - i * 18}%` } : {}
                            }
                            transition={{
                              duration: 1,
                              ease: EASE,
                              delay: 0.9 + i * 0.1,
                            }}
                            className="h-full rounded-full"
                            style={{ background: step.dot }}
                          />
                        </div>
                      </motion.div>

                      {/* connector line between steps */}
                      {i < flowSteps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={inView ? { scaleY: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.85 + i * 0.1 }}
                          className="w-[2px] h-3 bg-gradient-to-b from-slate-200 to-slate-100 mx-auto origin-top"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Revenue output pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="mt-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 p-3 flex items-center justify-between shadow-lg shadow-emerald-500/20"
              >
                <div>
                  <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">
                    Revenue Generated
                  </p>
                  <p className="text-lg font-black text-white leading-none">
                    Predictable Growth
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">↑</p>
                  <p className="text-[10px] text-white/70 font-semibold">
                    Month over month
                  </p>
                </div>
              </motion.div>
            </div>

            {/* mini bar chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
              className="rounded-xl border border-slate-100 bg-white p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
                    <Activity className="w-3 h-3 text-blue-600" />
                  </div>
                  <p className="text-[16px] font-sans font-bold text-slate-800">
                    Monthly Leads
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
                  <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-600">
                    +312%
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-1 h-14">
                {[18, 24, 31, 42, 58, 74, 89, 103, 126, 148, 187, 234].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 1.35 + i * 0.045,
                        ease: EASE,
                      }}
                      className="flex-1 rounded-t-sm origin-bottom"
                      style={{
                        height: `${(h / 234) * 100}%`,
                        background:
                          i >= 9
                            ? "linear-gradient(to top, #2563eb, #60a5fa)"
                            : "linear-gradient(to top, #e2e8f0, #cbd5e1)",
                      }}
                    />
                  ),
                )}
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 mt-1.5">
                <span>Before Ikhtiyaar</span>
                <span className="text-blue-500 font-semibold">After →</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* floating stat chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 1.7, duration: 0.6, ease: EASE }}
          className="absolute -top-5 -right-5 z-20"
        >
          <motion.div
            animate={{ y: [-6, 8, -6], rotate: [-1, 2, -1] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-blue-200/60 shadow-xl shadow-blue-500/10"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
                <Phone className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium leading-none">
                  Calls/mo
                </p>
                <p className="text-sm font-black text-blue-700">+183</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 1.9, duration: 0.6, ease: EASE }}
          className="absolute -bottom-5 -left-5 z-20"
        >
          <motion.div
            animate={{ y: [8, -8, 8], rotate: [1, -2, 1] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-emerald-200/60 shadow-xl shadow-emerald-500/10"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium leading-none">
                  ROAS
                </p>
                <p className="text-sm font-black text-emerald-700">3.7x</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function DentishHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: true, margin: "-40px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -25]);

  return (
    <section
      ref={sectionRef}
      id="dentish-hero"
      className="relative min-h-screen bg-white overflow-hidden flex items-center"
    >
      {/* ── Ambient Background ──────────────────────────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        {/* Large orbs */}
        <div className="absolute -top-48 -right-48 w-[900px] h-[900px] rounded-full bg-blue-500/[0.05] blur-[160px]" />
        <div className="absolute top-1/3 -left-64 w-[700px] h-[700px] rounded-full bg-sky-400/[0.04] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/[0.03] blur-[120px]" />

        {/* Animated breathing orb */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-blue-400 blur-[140px]"
        />

        {/* Dot grid */}
        <DotGrid color="#3b82f6" opacity={0.022} size={28} />

        {/* Fine grid lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: `80px 80px`,
          }}
        />
      </motion.div>

      {/* ── Top accent line ─────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent origin-left"
        />
      </div>

      <motion.div
        style={{ y: heroY }}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24  lg:py-32 lg:pb-12"
      >
        <div className="grid lg:grid-cols-[1.3fr_1.08fr] gap-12 xl:gap-20 items-start">
          {/* ════════════════════════════════════
              LEFT — Story & Conversion
          ════════════════════════════════════ */}
          <div ref={leftRef} className="space-y-6">
            {/* Badge row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              {/* Case study badge */}
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 text-blue-700 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Case Study
              </span>

              {/* Industry badge */}
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-widest shadow-sm">
                🦷 Dental Industry
              </span>

              {/* Live indicator */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 text-emerald-700 text-xs font-bold">
                <LiveDot color="emerald" />
                Verified Results
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-1 ">
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-[3.35rem] font-black text-slate-900  tracking-tight">
                <SplitReveal text="When Empty Chairs" delay={0.05} />
                <SplitReveal text="Became Fully" delay={0.22} />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                  <SplitReveal text="Booked" delay={0.38} />
                </span>
                <SplitReveal text="Days" delay={0.52} />
              </h1>
            </div>

            {/* Animated accent underline */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={leftInView ? { width: 72, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            >
              <div className="h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-sky-400" />
            </motion.div>

            {/* Sub-copy / story */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.7, ease: EASE }}
              className="text-slate-700 text-base sm:text-[17px] md:text-[18px] leading-[1.7] max-w-[520px] font-medium"
            >
              Dentish was running ads with no system behind them. Calls were
              being missed. Leads were falling through the cracks. We built a
              complete patient acquisition engine Google Ads, Local SEO, call
              tracking, and a conversion optimised booking funnel and turned
              inconsistent months into{" "}
              <span className="font-bold text-slate-900">
                predictable, compounding growth.
              </span>
            </motion.p>

            {/* 4 KPI tiles in 2×2 grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="grid grid-cols-2 gap-3"
            >
              {kpiData.map((kpi, i) => (
                <KPITile
                  key={kpi.label}
                  kpi={kpi}
                  index={i}
                  shouldAnimate={leftInView}
                />
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 1.2 }}
              className="relative rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden"
            >
              {/* top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-sky-400" />

              <div className="p-5 space-y-3">
                <Quote className="w-7 h-7 text-slate-100 -mb-0.5" />
                <p className="text-slate-800 text-[15px]  font-semibold">
                  "Before Ikhtiyaar, we were spending on ads with nothing to
                  show for it. Within 90 days we had more calls coming in than
                  we could handle.{" "}
                  <span className="font-bold text-slate-900">
                    Our schedule has been full every single week since.
                  </span>
                  "
                </p>
                <div className="flex items-center gap-3">
                  {/* avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1685760259914-ee8d2c92d2e0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Dentish"
                      width={200}
                      height={200}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      Dr. Sarah Mitchell
                    </p>
                    <p className="text-xs text-slate-500">
                      Owner · Dentish Dental Clinic
                    </p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA */}
              <Link href="#case-study-body">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group/btn relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-7 py-3.5 font-bold text-white shadow-[0_5px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)] border border-blue-400/30 ring-1 ring-inset ring-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <motion.div
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute inset-0 z-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
                  />
                  <span className="relative z-10 text-[15px] font-bold tracking-wide">
                    Read The Full Story
                  </span>
                  <ChevronRight className="relative z-10 w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </motion.button>
              </Link>

              {/* Ghost CTA */}
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Get Results Like These
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1"
            >
              {[
                "GA4 Verified",
                "Google Ads Certified",
                "100% Transparent Reporting",
              ].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ════════════════════════════════════
              RIGHT — Growth Command Center
          ════════════════════════════════════ */}
          <div ref={rightRef} className="relative">
            {/* outer glow ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/6 to-sky-400/5 blur-2xl pointer-events-none" />
            <PatientFlowPanel inView={rightInView} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
