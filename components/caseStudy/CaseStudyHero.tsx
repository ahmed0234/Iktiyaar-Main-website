"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Phone,
  DollarSign,
  Target,
  Clock,
  BarChart3,
  CheckCircle2,
  Star,
  Quote,
  Zap,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import Link from "next/link";

// ─── Ease constant used across the site ──────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

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

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setValue(Number((easedProgress * target).toFixed(decimals)));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, shouldStart, decimals]);

  return value;
}

// ─── Split Text Reveal (matching site pattern) ──────────────────────────────
function SplitTextReveal({
  text,
  className,
  delay = 0,
  isAccent = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  isAccent?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: "120%", rotateX: -80 }}
            animate={
              isInView ? { y: "0%", rotateX: 0 } : { y: "120%", rotateX: -80 }
            }
            transition={{
              duration: 0.85,
              delay: delay + i * 0.07,
              ease: EASE,
            }}
            className={`inline-block will-change-transform ${
              isAccent
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
                : ""
            }`}
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── KPI Data ────────────────────────────────────────────────────────────────
const kpiData = [
  {
    value: 312,
    prefix: "+",
    suffix: "",
    label: "Qualified Leads",
    icon: Target,
    color: "from-blue-500 to-blue-400",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    value: 38,
    prefix: "-",
    suffix: "%",
    label: "Cost Per Lead",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-400",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    value: 4.2,
    prefix: "",
    suffix: "X",
    label: "ROAS",
    icon: BarChart3,
    color: "from-violet-500 to-violet-400",
    bgColor: "bg-violet-50",
    textColor: "text-violet-600",
    glowColor: "rgba(139,92,246,0.15)",
    decimals: 1,
  },
  {
    value: 180,
    prefix: "",
    suffix: "",
    label: "Booked Appointments",
    icon: Phone,
    color: "from-amber-500 to-amber-400",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    glowColor: "rgba(245,158,11,0.15)",
  },
  {
    value: 22,
    prefix: "$",
    suffix: "K",
    label: "Revenue Generated",
    icon: DollarSign,
    color: "from-blue-600 to-indigo-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    glowColor: "rgba(59,130,246,0.18)",
    decimals: 1,
  },
  {
    value: 60,
    prefix: "",
    suffix: " Days",
    label: "Timeframe",
    icon: Clock,
    color: "from-sky-500 to-cyan-400",
    bgColor: "bg-sky-50",
    textColor: "text-sky-600",
    glowColor: "rgba(14,165,233,0.15)",
  },
];

// ─── KPI Tile Component ─────────────────────────────────────────────────────
function KPITile({
  kpi,
  index,
  shouldAnimate,
}: {
  kpi: (typeof kpiData)[0];
  index: number;
  shouldAnimate: boolean;
}) {
  const count = useCountUp(
    kpi.value,
    2200 + index * 200,
    shouldAnimate,
    kpi.decimals || 0,
  );
  const Icon = kpi.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={
        shouldAnimate
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.92 }
      }
      transition={{
        duration: 0.7,
        delay: 0.6 + index * 0.1,
        ease: EASE,
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group/kpi relative"
    >
      {/* Outer glow on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover/kpi:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 30px 6px ${kpi.glowColor}, 0 20px 40px -15px ${kpi.glowColor}`,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-slate-100/80 bg-white/70 backdrop-blur-xl p-5 shadow-lg shadow-slate-200/20 group-hover/kpi:border-blue-100/60 group-hover/kpi:bg-white group-hover/kpi:shadow-2xl transition-all duration-400">
        {/* Subtle shimmer sweep */}
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

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${kpi.bgColor} mb-3 transition-all duration-300 group-hover/kpi:shadow-md`}
          >
            <Icon className={`w-5 h-5 ${kpi.textColor}`} strokeWidth={2} />
          </div>

          {/* Number */}
          <div className="text-3xl lg:text-4xl font-[900] text-slate-900 tracking-tight leading-none mb-1">
            <span
              className="text-black bg-clip-text bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
              }}
            >
              {kpi.prefix}
            </span>
            {count}
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r ${kpi.color}`}
            >
              {kpi.suffix}
            </span>
          </div>

          {/* Label */}
          <p className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider">
            {kpi.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mini Chart (revenue visualization) ─────────────────────────────────────
function MiniChart({ shouldAnimate }: { shouldAnimate: boolean }) {
  const bars = [35, 45, 30, 55, 70, 60, 85, 75, 95, 88, 100, 92];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
      className="relative overflow-hidden rounded-2xl border border-slate-100/80 bg-white/70 backdrop-blur-xl p-5 shadow-lg shadow-slate-200/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Revenue Growth</p>
            <p className="text-[11px] text-slate-400 font-medium">
              Last 12 months
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/50">
          <ArrowUpRight className="w-3 h-3 text-emerald-600" />
          <span className="text-[11px] font-bold text-emerald-600">+147%</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-20">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.6 + i * 0.06,
              ease: EASE,
            }}
            className="flex-1 rounded-t-sm origin-bottom"
            style={{
              height: `${height}%`,
              background:
                i >= bars.length - 3
                  ? "linear-gradient(to top, #3b82f6, #60a5fa)"
                  : "linear-gradient(to top, #e2e8f0, #cbd5e1)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Dashboard Mockup (right side visual) ────────────────────────────────────
function DashboardVisual({ shouldAnimate }: { shouldAnimate: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    springConfig,
  );

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
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={
        shouldAnimate
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: 60, scale: 0.92 }
      }
      transition={{ duration: 1, delay: 0.4, ease: EASE }}
      className="relative w-full"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Glow behind */}
        <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-blue-100/40 via-blue-50/20 to-transparent blur-2xl pointer-events-none" />

        {/* Main dashboard container */}
        <div className="relative rounded-[20px] overflow-hidden border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white shadow-2xl shadow-slate-200/40">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-lg bg-slate-100/80 text-[11px] text-slate-400 font-medium">
                ads.google.com/campaigns/results
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-5 space-y-4">
            {/* Campaign Performance Header */}
            <div className="flex items-center justify-between">
              <div>
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={shouldAnimate ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  className="text-sm font-bold text-slate-800"
                >
                  Campaign Performance
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={shouldAnimate ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
                  className="text-[11px] text-slate-400"
                >
                  Roofing Lead Gen — Q4 2024
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/50"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-700">
                  Live
                </span>
              </motion.div>
            </div>

            {/* Mini KPI row in dashboard */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Conversions", value: "312", change: "+24%" },
                { label: "Cost/Conv.", value: "$18.42", change: "-38%" },
                { label: "ROAS", value: "4.2x", change: "+156%" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="rounded-xl bg-slate-50/80 border border-slate-100 p-3"
                >
                  <p className="text-[10px] text-slate-400 font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {item.value}
                  </p>
                  <span
                    className={`text-[10px] font-bold ${
                      item.change.startsWith("+")
                        ? "text-emerald-600"
                        : "text-blue-600"
                    }`}
                  >
                    {item.change}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Blurred chart area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
              className="relative rounded-xl bg-gradient-to-br from-blue-50/50 to-slate-50/50 border border-slate-100 p-4 overflow-hidden"
            >
              {/* Faux line chart */}
              <svg
                viewBox="0 0 400 100"
                className="w-full h-20"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 0 80 C 40 75 60 70 100 55 C 140 40 160 50 200 35 C 240 20 260 25 300 15 C 340 5 370 8 400 3"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={
                    shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }
                  }
                  transition={{ duration: 2, delay: 1.6, ease: "easeOut" }}
                />
                <motion.path
                  d="M 0 80 C 40 75 60 70 100 55 C 140 40 160 50 200 35 C 240 20 260 25 300 15 C 340 5 370 8 400 3 L 400 100 L 0 100 Z"
                  fill="url(#chartGrad)"
                  initial={{ opacity: 0 }}
                  animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 2.2 }}
                />
              </svg>

              {/* Floating data point */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 2.5, type: "spring", stiffness: 300 }}
                className="absolute top-3 right-4"
              >
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-blue-400 animate-ping opacity-30" />
                </div>
              </motion.div>

              {/* Soft blur overlay to imply more data */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Floating stat card - top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.6, ease: EASE }}
          className="absolute -top-4 -right-4 z-20"
        >
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [-2, 2, -2],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="px-4 py-3 rounded-xl bg-white/90 backdrop-blur-xl border border-emerald-200/60 shadow-xl shadow-emerald-500/10"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Revenue
                </p>
                <p className="text-sm font-bold text-emerald-700">+147%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating stat card - bottom left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 2.0, duration: 0.6, ease: EASE }}
          className="absolute -bottom-4 -left-4 z-20"
        >
          <motion.div
            animate={{
              y: [6, -10, 6],
              rotate: [2, -2, 2],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="px-4 py-3 rounded-xl bg-white/90 backdrop-blur-xl border border-blue-200/60 shadow-xl shadow-blue-500/10"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Cost Per Lead
                </p>
                <p className="text-sm font-bold text-blue-700">-38%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Credibility Logos ───────────────────────────────────────────────────────
const credibilityBadges = [
  { label: "Google Ads", icon: "📊" },
  { label: "GA4 Verified", icon: "📈" },
  { label: "Call Tracking", icon: "📞" },
];

// ─── Main Hero Export ────────────────────────────────────────────────────────
export default function CaseStudyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 80,
    damping: 30,
  });

  return (
    <section
      ref={sectionRef}
      id="case-study-hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white"
    >
      {/* ── Background Effects ────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large ambient blue orb */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-15%] w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.05, 1, 1.05],
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-15%] w-[700px] h-[700px] bg-blue-50/40 rounded-full blur-[150px]"
        />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-indigo-50/15 rounded-full blur-[120px]" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Grid lines (matching Hero pattern) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: `80px 80px`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Split Layout ────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* ── LEFT: Headline + Metrics ──────────────────────────────────── */}
          <motion.div style={{ y: parallaxY }} className="w-full lg:w-[55%]">
            {/* Case Study Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/40 px-5 py-2 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-[13px] sm:text-xs font-bold text-blue-700 uppercase tracking-[0.2em] font-poppins">
                Case Study — Roofing Industry
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[800] text-slate-900 leading-[1.08] tracking-tight mb-6">
              <SplitTextReveal text="How We Turned $5K" delay={0.15} />
              <br className="hidden sm:block" />
              <SplitTextReveal text="Ad Spend Into" delay={0.5} />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                <SplitTextReveal text="$22K Revenue" delay={0.7} isAccent />
              </span>
              <SplitTextReveal text="in 60 Days" delay={1.0} />
            </h1>

            {/* Animated underline */}
            <motion.div
              className="mb-6"
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 80, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
            >
              <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300" />
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
              className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-medium mb-8"
            >
              See how Ikhtiyaar took a mid size roofing company from
              inconsistent leads to a fully booked pipeline using Google Ads,
              call tracking, and a conversion optimized funnel all managed end
              to end.
            </motion.p>

            {/* Credibility Badges Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {credibilityBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.6 + i * 0.08 }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-100 shadow-sm text-[12px] font-bold text-slate-700 font-poppins"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.85 }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-100/60 text-[12px] font-bold text-blue-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Results Dashboard
              </motion.div>
            </motion.div>

            {/* Testimonial Snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.7, ease: EASE }}
              className="relative mb-8 pl-5 border-l-[3px] border-blue-400/60"
            >
              <Quote className="absolute -left-3 -top-1 w-5 h-5 text-blue-300 bg-white" />
              <p className="text-[15px] text-slate-600 italic font-medium leading-relaxed">
                &ldquo;We doubled our pipeline in 6 weeks. The leads were
                qualified and the appointments were actually showing up.&rdquo;
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">
                  — Marcus R.
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Owner, Elite Roofing Co.
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.9, ease: EASE }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-blue-500 to-blue-700 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-[0_5px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)] border border-blue-400/40 ring-1 ring-inset ring-white/20"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute inset-0 z-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
                  />

                  <span className="relative z-10 drop-shadow-md font-bold text-[15px] tracking-wide">
                    Get Results Like This
                  </span>
                  <ArrowRight
                    strokeWidth={2.5}
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-4 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold text-[15px] shadow-sm hover:border-blue-200 hover:text-blue-700 hover:shadow-md transition-all duration-300"
              >
                <Zap className="w-4 h-4" />
                View Full Case Study
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Dashboard Visual ───────────────────────────────────── */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-32">
            <DashboardVisual shouldAnimate={isInView} />
          </div>
        </div>

        {/* ── KPI Metrics Bar ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-16 lg:mt-20"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <span className="text-[12px] font-bold tracking-[0.25em] text-blue-500 uppercase whitespace-nowrap">
              Hard Results — No Fluff
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </motion.div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {kpiData.map((kpi, index) => (
              <KPITile
                key={kpi.label}
                kpi={kpi}
                index={index}
                shouldAnimate={isInView}
              />
            ))}
          </div>

          {/* Revenue chart + Timeframe label below KPIs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <MiniChart shouldAnimate={isInView} />

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6, ease: EASE }}
              className="relative overflow-hidden rounded-2xl border border-slate-100/80 bg-white/70 backdrop-blur-xl p-5 shadow-lg shadow-slate-200/20 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-base font-bold text-slate-900">
                  Verified Performance Markers
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "All data verified via Google Ads & GA4 dashboards",
                  "Call tracking through dedicated phone numbers",
                  "Full transparency client has dashboard access 24/7",
                  "Zero inflated metrics only counting qualified leads",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.8 + i * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-[14px] text-slate-500 font-semibold font-poppins leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
