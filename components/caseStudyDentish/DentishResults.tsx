"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  useSpring,
  useMotionValue,
} from "motion/react";
import {
  TrendingUp,
  Target,
  Calendar,
  BarChart3,
  ArrowRight,
  MousePointerClick,
  Phone,
  Users,
  Clock,
  CheckCircle2,
  PhoneCall,
  Activity,
  Globe,
} from "lucide-react";

// ─── Shared ease ──────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(
  target: number,
  duration = 2000,
  shouldStart = false,
  decimals = 0,
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

// ─── Word-by-word reveal ──────────────────────────────────────────────────────
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
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.055 }}
            className={
              isAccent
                ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400"
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

// ─── Dot grid background ──────────────────────────────────────────────────────
function DotGrid({
  color = "#10b981", // emerald
  opacity = 0.02,
  size = 28,
}: {
  color?: string;
  opacity?: number;
  size?: number;
}) {
  const id = `res-dot-${size}`;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    >
      <defs>
        <pattern id={id} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
  intensity = 5,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 180,
    damping: 22,
  });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 180,
    damping: 22,
  });
  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { x.set(0); y.set(0); }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESULTS METRICS GRID
// ═══════════════════════════════════════════════════════════════════════════════
const coreMetrics = [
  {
    label: "Qualified Patient Leads",
    desc: "More high-intent inquiries",
    value: 312,
    prefix: "+",
    suffix: "%",
    color: "from-blue-600 to-sky-400",
    text: "text-blue-600",
    bg: "bg-blue-50/50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
    icon: Target,
    glow: "rgba(59,130,246,0.12)",
  },
  {
    label: "Monthly Appointments",
    desc: "Increase in booked appointments",
    value: 184,
    prefix: "+",
    suffix: "%",
    color: "from-emerald-500 to-teal-400",
    text: "text-emerald-600",
    bg: "bg-emerald-50/50 border-emerald-100",
    iconBg: "bg-emerald-100 text-emerald-600",
    icon: Calendar,
    glow: "rgba(16,185,129,0.12)",
  },
  {
    label: "Return On Ad Spend",
    desc: "Revenue generated vs ad cost",
    value: 3.7,
    prefix: "",
    suffix: "x",
    decimals: 1,
    color: "from-violet-600 to-purple-400",
    text: "text-violet-600",
    bg: "bg-violet-50/50 border-violet-100",
    iconBg: "bg-violet-100 text-violet-600",
    icon: BarChart3,
    glow: "rgba(139,92,246,0.12)",
  },
  {
    label: "Cost Per Acquisition",
    desc: "More efficient patient growth",
    value: 42,
    prefix: "-",
    suffix: "%",
    color: "from-amber-500 to-orange-400",
    text: "text-amber-600",
    bg: "bg-amber-50/50 border-amber-100",
    iconBg: "bg-amber-100 text-amber-600",
    icon: TrendingUp,
    glow: "rgba(245,158,11,0.12)",
  },
] as const;

function MetricCard({
  metric,
  index,
  inView,
}: {
  metric: (typeof coreMetrics)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = metric.icon;
  const count = useCountUp(metric.value, 2000 + index * 150, inView, "decimals" in metric ? metric.decimals : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group/metric relative"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover/metric:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 30px 4px ${metric.glow}, 0 16px 30px -10px ${metric.glow}` }}
      />

      <div className={`relative h-full rounded-3xl border ${metric.bg} bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-sm group-hover/metric:shadow-xl transition-all duration-400`}>
        {/* Shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500">
          <motion.div
            animate={{ x: ["-200%", "200%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg]"
          />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
          <div className="flex items-start justify-between">
            <div className={`w-12 h-12 rounded-2xl ${metric.iconBg} flex items-center justify-center shadow-sm`}>
              <Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            {/* Tiny growth indicator */}
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${metric.bg} bg-white/50`}>
              <Activity className={`w-3 h-3 ${metric.text}`} />
              <span className={`text-[10px] font-bold ${metric.text} uppercase tracking-wider`}>Verified</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-5xl sm:text-6xl font-black tracking-tighter bg-gradient-to-r ${metric.color} text-transparent bg-clip-text`}>
                {metric.prefix}{count}{metric.suffix}
              </span>
            </div>
            <h4 className="text-[17px] font-black text-slate-900 leading-snug mb-1">
              {metric.label}
            </h4>
            <p className="text-[14px] text-slate-500 font-medium">
              {metric.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNNEL VISUALIZATION
// ═══════════════════════════════════════════════════════════════════════════════
const funnelSteps = [
  { label: "Targeted Traffic", icon: Globe, width: "100%", color: "bg-slate-100", border: "border-slate-200", text: "text-slate-600" },
  { label: "Landing Page Visits", icon: MousePointerClick, width: "85%", color: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
  { label: "Inbound Phone Calls", icon: PhoneCall, width: "65%", color: "bg-violet-50", border: "border-violet-200", text: "text-violet-600" },
  { label: "Appointments Booked", icon: Calendar, width: "45%", color: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600" },
  { label: "New Patients", icon: Users, width: "30%", color: "bg-emerald-500", border: "border-emerald-600", text: "text-white", isFinal: true },
];

function FunnelVisualization({ inView }: { inView: boolean }) {
  return (
    <div className="relative flex flex-col items-center w-full max-w-lg mx-auto py-4">
      {funnelSteps.map((step, i) => {
        const Icon = step.icon;
        return (
          <React.Fragment key={step.label}>
            <motion.div
              initial={{ opacity: 0, width: "20%", y: 10 }}
              animate={inView ? { opacity: 1, width: step.width, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: EASE }}
              className={`relative z-10 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border shadow-sm ${step.color} ${step.border}`}
            >
              <Icon className={`w-4 h-4 ${step.text}`} strokeWidth={2.5} />
              <span className={`text-[13px] font-bold tracking-wide ${step.text}`}>
                {step.label}
              </span>
            </motion.div>
            
            {i < funnelSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                className="w-px h-6 bg-slate-200 origin-top"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PERFORMANCE GRAPH (Centerpiece)
// ═══════════════════════════════════════════════════════════════════════════════
function GrowthGraph({ inView }: { inView: boolean }) {
  // Mock data points reflecting the "momentum" story
  const dataPoints = [15, 22, 35, 48, 65, 82, 105, 130, 160, 195, 240, 290];
  const max = Math.max(...dataPoints);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className="relative rounded-3xl border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/40 p-6 sm:p-8 overflow-hidden"
    >
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
            Growth Trajectory
          </p>
          <h4 className="font-poppins text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            Patient Acquisition Momentum
          </h4>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-[12px] font-bold text-emerald-700">Predictable Growth System</span>
        </div>
      </div>

      {/* The Graph Area */}
      <div className="relative h-64 sm:h-80 w-full flex items-end justify-between gap-1 sm:gap-2 pb-6 border-b border-slate-100">
        {/* Y-axis rough lines (background) */}
        <div className="absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between pointer-events-none z-0">
          {[1, 2, 3, 4].map((l) => (
            <div key={l} className="w-full h-px bg-slate-100" />
          ))}
        </div>

        {dataPoints.map((val, i) => {
          const heightPct = (val / max) * 100;
          return (
            <div key={i} className="relative flex flex-col items-center flex-1 h-full justify-end z-10 group">
              {/* Tooltip on hover */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-[10px] font-bold py-1 px-2 rounded">
                +{val}
              </div>
              
              <motion.div
                initial={{ height: 0 }}
                animate={inView ? { height: `${heightPct}%` } : {}}
                transition={{ duration: 1.2, ease: EASE, delay: 0.4 + (i * 0.05) }}
                className="w-full max-w-[40px] rounded-t-md relative overflow-hidden"
              >
                {/* Gradient bar */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-100 to-emerald-400" />
                {/* Top highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-white/30" />
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">
        <span>Month 1</span>
        <span>Month 6</span>
        <span>Month 12</span>
      </div>

      {/* Optional micro-stats underneath */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
        {[
          { label: "Response Time", val: "< 5 mins", icon: Clock },
          { label: "Call Answer Rate", val: "94%", icon: Phone },
          { label: "Show Rate", val: "88%", icon: Users },
          { label: "Lead Quality", val: "High", icon: Target },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1, ease: EASE }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <p className="text-[13px] font-black text-slate-800 leading-none mb-0.5">{stat.val}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function DentishResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const funnelRef = useRef<HTMLDivElement>(null);

  const topInView = useInView(topRef, { once: true, margin: "-40px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-60px" });
  const graphInView = useInView(graphRef, { once: true, margin: "-60px" });
  const funnelInView = useInView(funnelRef, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="dentish-results"
      className="relative bg-white py-8 lg:py-10 overflow-hidden"
    >
      {/* ── Background ──────────────────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-400/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-teal-400/[0.025] blur-[160px]" />
        <DotGrid color="#10b981" opacity={0.015} size={32} />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div ref={topRef} className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={topInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/50 px-5 py-2 backdrop-blur-md"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[12px] font-bold text-emerald-700 uppercase tracking-[0.2em]">
              The Transformation
            </span>
          </motion.div>

          <h2 className="font-poppins text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
            <SplitReveal text="The System Started" delay={0.05} />
            <br className="hidden sm:block" />
            <SplitReveal text="Producing" delay={0.2} />{" "}
            <SplitReveal text="Results." delay={0.35} isAccent />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.6, ease: EASE }}
            className="text-slate-600 font-sans text-lg sm:text-xl leading-[1.6] font-medium max-w-2xl mx-auto"
          >
            With a complete patient acquisition ecosystem in place, Dentish began attracting, converting, and booking more qualified patients consistently. Every stage of the funnel became measurable, optimised, and scalable.
          </motion.p>
        </div>

        {/* ── Metrics Grid ──────────────────────────────────────────────────── */}
        <div ref={metricsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {coreMetrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} inView={metricsInView} />
          ))}
        </div>

        {/* ── Visual Story: Graph + Funnel ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-12 xl:gap-16 items-center">
          {/* Main Graph */}
          <div ref={graphRef}>
            <GrowthGraph inView={graphInView} />
          </div>

          {/* Funnel */}
          <div ref={funnelRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={funnelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center lg:text-left"
            >
              <h3 className="font-poppins text-2xl font-black text-slate-900 mb-2">
                The Conversion Journey
              </h3>
              <p className="text-[15px] text-slate-600 font-medium">
                Visibility is meaningless without conversion. The system pulled patients seamlessly from search to chair.
              </p>
            </motion.div>

            <FunnelVisualization inView={funnelInView} />
          </div>
        </div>

      </div>
    </section>
  );
}
