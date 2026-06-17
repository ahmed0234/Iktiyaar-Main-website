"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "motion/react";
import {
  Search,
  Globe,
  LayoutTemplate,
  Target,
  Phone,
  Calendar,
  TrendingUp,
  BarChart3,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Zap,
  Layers,
  Activity,
  ArrowDown,
  Sparkles,
  ChevronRight,
  MousePointerClick,
  ClipboardList,
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

// ─── Dot-grid ─────────────────────────────────────────────────────────────────
function DotGrid({
  color = "#3b82f6",
  opacity = 0.022,
  size = 28,
}: {
  color?: string;
  opacity?: number;
  size?: number;
}) {
  const id = `ge-dot-${size}-${color.replace("#", "")}`;
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

// ─── 3D Tilt card ─────────────────────────────────────────────────────────────
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

// ─── Live pulse dot ───────────────────────────────────────────────────────────
function LiveDot({ color = "blue" }: { color?: string }) {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-60`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`} />
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PATIENT ACQUISITION ENGINE — Animated flow diagram
// ═══════════════════════════════════════════════════════════════════════════════
const engineStages = [
  {
    icon: Search,
    label: "Google Search",
    sub: "High-intent dental queries",
    color: "#3b82f6",
    bg: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    stat: "8,400+ / mo",
    statLabel: "Searches",
  },
  {
    icon: Target,
    label: "Google Ads",
    sub: "Intent-matched campaigns",
    color: "#8b5cf6",
    bg: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100",
    stat: "1,920 clicks",
    statLabel: "Captured",
  },
  {
    icon: Globe,
    label: "Local SEO",
    sub: "Map pack + organic visibility",
    color: "#0ea5e9",
    bg: "bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100",
    stat: "#1–3",
    statLabel: "Rankings",
  },
  {
    icon: LayoutTemplate,
    label: "Landing Pages",
    sub: "Conversion-optimised funnels",
    color: "#f59e0b",
    bg: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    stat: "487 visits",
    statLabel: "Monthly",
  },
  {
    icon: MousePointerClick,
    label: "Lead Capture",
    sub: "Forms + click-to-call",
    color: "#06b6d4",
    bg: "bg-cyan-50 border-cyan-200",
    iconBg: "bg-cyan-100",
    stat: "183 leads",
    statLabel: "Generated",
  },
  {
    icon: Phone,
    label: "Call Tracking",
    sub: "Attributed, recorded, measured",
    color: "#10b981",
    bg: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    stat: "100%",
    statLabel: "Tracked",
  },
  {
    icon: Calendar,
    label: "Appointment Booked",
    sub: "Qualified patient acquired",
    color: "#22c55e",
    bg: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    stat: "112 / mo",
    statLabel: "Bookings",
  },
] as const;

function AcquisitionEnginePanel({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.93 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.25, ease: EASE }}
      style={{ perspective: "1000px" }}
      className="relative w-full"
    >
      <TiltCard className="relative" intensity={3}>
        {/* Ambient glow */}
        <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-blue-200/30 via-sky-100/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative rounded-2xl border border-slate-200/70 bg-white shadow-2xl shadow-slate-200/40 overflow-hidden">
          {/* Top success bar */}
          <div className="h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-500" />

          {/* Panel header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-3 py-0.5 rounded-md bg-blue-50/80 border border-blue-100 text-[12px] text-blue-700 font-bold">
                Patient Acquisition Engine — Dentish
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <LiveDot color="emerald" />
              <span className="text-[10px] font-bold text-emerald-700">Live</span>
            </div>
          </div>

          {/* Top KPIs */}
          <div className="grid grid-cols-3 gap-2 p-4 pb-2">
            {[
              { label: "Qualified Leads", val: "+312%", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
              { label: "Booking Rate", val: "+184%", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
              { label: "ROAS", val: "3.7x", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
            ].map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.08 }}
                className={`rounded-xl border ${k.bg} p-2 text-center`}
              >
                <p className={`text-base font-black ${k.color} leading-none`}>{k.val}</p>
                <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wide mt-0.5">{k.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Engine flow */}
          <div className="px-4 pb-4 space-y-1.5">
            {engineStages.map((stage, i) => {
              const Icon = stage.icon;
              const fillPct = 30 + ((engineStages.length - i) / engineStages.length) * 70;
              return (
                <React.Fragment key={stage.label}>
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.6 + i * 0.09 }}
                    className={`flex items-center gap-3 rounded-xl border ${stage.bg} px-3 py-2 group/stage hover:shadow-sm transition-all duration-200`}
                  >
                    {/* Icon */}
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${stage.color}20` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: stage.color }} />
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-slate-800 leading-tight">{stage.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{stage.sub}</p>
                    </div>

                    {/* Stat */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-[11px] font-black leading-none" style={{ color: stage.color }}>
                        {stage.stat}
                      </p>
                      <p className="text-[9px] text-slate-400 font-medium">{stage.statLabel}</p>
                    </div>

                    {/* Fill bar */}
                    <div className="w-14 h-1.5 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${fillPct}%` } : {}}
                        transition={{ duration: 1, ease: EASE, delay: 0.85 + i * 0.09 }}
                        className="h-full rounded-full"
                        style={{ background: stage.color }}
                      />
                    </div>
                  </motion.div>

                  {i < engineStages.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                      transition={{ duration: 0.25, delay: 0.75 + i * 0.09 }}
                      className="flex justify-center origin-top"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-px h-1.5 bg-gradient-to-b from-slate-200 to-blue-200" />
                        <ArrowDown className="w-2.5 h-2.5 text-blue-300" />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Revenue output */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 1.9, ease: EASE }}
              className="mt-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 p-3.5 flex items-center justify-between shadow-xl shadow-emerald-500/25"
            >
              <div>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest">End Result</p>
                <p className="text-[15px] font-black text-white leading-tight mt-0.5">
                  Predictable Revenue Growth
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-[9px] text-white/60 font-semibold text-right">Month over month</p>
                  <p className="text-2xl font-black text-white text-right leading-none">↑ ↑ ↑</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 2.1, duration: 0.6, ease: EASE }}
          className="absolute -top-5 -right-4 z-20"
        >
          <motion.div
            animate={{ y: [-5, 7, -5], rotate: [-1, 1.5, -1] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-blue-200/60 shadow-xl shadow-blue-500/10"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <div>
              <p className="text-[9px] text-slate-400 font-medium leading-none">Leads Growth</p>
              <p className="text-[12px] font-black text-blue-700">+312%</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 2.3, duration: 0.6, ease: EASE }}
          className="absolute -bottom-5 -left-4 z-20"
        >
          <motion.div
            animate={{ y: [7, -5, 7], rotate: [1, -1.5, 1] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-emerald-200/60 shadow-xl shadow-emerald-500/10"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <p className="text-[9px] text-slate-400 font-medium leading-none">ROAS</p>
              <p className="text-[12px] font-black text-emerald-700">3.7x Return</p>
            </div>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY PILLARS
// ═══════════════════════════════════════════════════════════════════════════════
const pillars = [
  {
    num: "01",
    icon: LayoutTemplate,
    title: "Building Conversion Focused Landing Pages",
    hook: "Traffic without destination is just noise.",
    body: "The first thing we built wasn't an ad. It was a destination. We designed dedicated landing pages engineered specifically to convert dental searches into patient enquiries — with clear trust signals, friction-reduced booking flows, and mobile-first experiences that matched how patients actually search.",
    results: [
      "Dedicated service pages per treatment",
      "Mobile-first booking experience",
      "Trust indicators and social proof",
      "Click-to-call conversion triggers",
    ],
    gradient: "from-amber-500 to-orange-400",
    bg: "bg-amber-50/50 border-amber-100",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-400",
    glow: "rgba(245,158,11,0.10)",
    tag: "Conversion Architecture",
    tagColor: "bg-amber-100 border-amber-200 text-amber-700",
    metricLabel: "Conversion Rate",
    metricValue: "+340%",
    metricColor: "text-amber-600",
  },
  {
    num: "02",
    icon: MapPin,
    title: "Creating Search Visibility Through SEO",
    hook: "Patients were searching. Dentish just wasn't there.",
    body: "We rebuilt Dentish's local SEO foundation from the ground up — optimising their Google Business Profile, strengthening service-specific page authority, and targeting the exact geographic searches that matter most. Within weeks, Dentish began appearing where patients were actively looking.",
    results: [
      "Google Business Profile optimisation",
      "Local keyword targeting strategy",
      "Service-area page architecture",
      "Review acquisition and management",
    ],
    gradient: "from-sky-500 to-blue-400",
    bg: "bg-sky-50/50 border-sky-100",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-400",
    glow: "rgba(14,165,233,0.10)",
    tag: "Local Visibility",
    tagColor: "bg-sky-100 border-sky-200 text-sky-700",
    metricLabel: "Map Pack Ranking",
    metricValue: "Top 3",
    metricColor: "text-sky-600",
  },
  {
    num: "03",
    icon: Target,
    title: "Capturing High Intent Demand via Google Ads",
    hook: "Not all clicks are equal. We targeted the ones that convert.",
    body: "We restructured Dentish's Google Ads from the ground up. Intent-based campaign architecture, service-specific ad groups, conversion-optimised messaging, and location targeting aligned with actual patient geography. Every pound of budget was focused on people actively seeking dental treatment.",
    results: [
      "Intent-mapped campaign structure",
      "Service-specific ad groups",
      "Negative keyword management",
      "Smart bidding strategy optimisation",
    ],
    gradient: "from-violet-500 to-purple-400",
    bg: "bg-violet-50/50 border-violet-100",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-400",
    glow: "rgba(139,92,246,0.10)",
    tag: "Paid Search",
    tagColor: "bg-violet-100 border-violet-200 text-violet-700",
    metricLabel: "Cost Per Lead",
    metricValue: "-42%",
    metricColor: "text-violet-600",
  },
  {
    num: "04",
    icon: Phone,
    title: "Turning Leads Into Real Conversations",
    hook: "Most agencies stop at the click. We didn't.",
    body: "Generating a lead is only half the system. We implemented call tracking, form attribution, and lead response workflows so every enquiry was captured, attributed, and followed up. For the first time, Dentish knew exactly where their patients came from and how to get more of them.",
    results: [
      "Dynamic call tracking implementation",
      "Form submission attribution",
      "Lead response time optimisation",
      "Source-level ROI reporting",
    ],
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50/50 border-emerald-100",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.10)",
    tag: "Lead Management",
    tagColor: "bg-emerald-100 border-emerald-200 text-emerald-700",
    metricLabel: "Calls Tracked",
    metricValue: "100%",
    metricColor: "text-emerald-600",
  },
  {
    num: "05",
    icon: BarChart3,
    title: "Tracking Everything. Guessing Nothing.",
    hook: "Growth without data is just luck. We gave them both.",
    body: "We built a complete performance visibility layer across every channel connecting Google Ads, SEO, call data, and form submissions into one unified view. For the first time, every marketing decision at Dentish was backed by real numbers, not assumptions.",
    results: [
      "Cross-channel attribution dashboard",
      "Campaign-level ROI tracking",
      "Keyword-to-appointment mapping",
      "Monthly performance reporting",
    ],
    gradient: "from-blue-600 to-blue-400",
    bg: "bg-blue-50/50 border-blue-100",
    iconBg: "bg-gradient-to-br from-blue-600 to-blue-400",
    glow: "rgba(37,99,235,0.10)",
    tag: "Analytics & Attribution",
    tagColor: "bg-blue-100 border-blue-200 text-blue-700",
    metricLabel: "Data Points Tracked",
    metricValue: "Full View",
    metricColor: "text-blue-600",
  },
] as const;

function PillarCard({
  pillar,
  index,
  inView,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = pillar.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.08 + index * 0.13 }}
      whileHover={{ y: -5, scale: 1.005 }}
      className="group/pillar relative"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover/pillar:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 32px 6px ${pillar.glow}, 0 16px 32px -10px ${pillar.glow}` }}
      />

      <div className={`relative overflow-hidden rounded-3xl border ${pillar.bg} bg-white p-6 sm:p-7 shadow-sm group-hover/pillar:shadow-2xl transition-all duration-400`}>
        {/* Top accent bar */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${pillar.gradient} origin-left`}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.13, ease: EASE }}
        />

        {/* Shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-0 group-hover/pillar:opacity-100 transition-opacity duration-500">
          <motion.div
            animate={{ x: ["-200%", "200%"] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1.5 }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
          />
        </div>

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl ${pillar.iconBg} shadow-lg`}>
                <Icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Pillar
                </p>
                <p className={`text-2xl font-black leading-none bg-gradient-to-r ${pillar.gradient} text-transparent bg-clip-text`}>
                  {pillar.num}
                </p>
              </div>
            </div>

            {/* Tag + metric */}
            <div className="text-right space-y-1.5">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${pillar.tagColor}`}>
                <Zap className="w-2.5 h-2.5" />
                {pillar.tag}
              </span>
              <div className="flex items-center gap-1 justify-end">
                <span className="text-[10px] text-slate-400 font-medium">{pillar.metricLabel}</span>
                <span className={`text-[14px] font-black ${pillar.metricColor}`}>{pillar.metricValue}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h4 className="font-poppins text-lg sm:text-xl font-black text-slate-900 mb-1.5 leading-snug">
            {pillar.title}
          </h4>

          {/* Hook line */}
          <p className={`text-[13px] font-bold mb-3 italic bg-gradient-to-r ${pillar.gradient} text-transparent bg-clip-text`}>
            {pillar.hook}
          </p>

          {/* Body */}
          <p className="text-[15px] text-slate-600  font-medium mb-4">
            {pillar.body}
          </p>

          {/* Result bullets */}
          <div className="grid sm:grid-cols-2 gap-1.5">
            {pillar.results.map((r, ri) => (
              <motion.div
                key={ri}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease: EASE, delay: 0.4 + index * 0.13 + ri * 0.06 }}
                className="flex items-start gap-2"
              >
                <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${pillar.metricColor}`} strokeWidth={2.5} />
                <span className="text-[12px] text-slate-600 font-semibold leading-snug">{r}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GROWTH METRICS COMMAND CENTRE
// ═══════════════════════════════════════════════════════════════════════════════
const liveMetrics = [
  { label: "Qualified Leads / mo", value: 312, suffix: "+", color: "text-blue-600", bg: "bg-blue-50 border-blue-100", bar: "bg-blue-500", pct: 92 },
  { label: "CPA Reduction", value: 42, suffix: "%", prefix: "-", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", bar: "bg-emerald-500", pct: 78 },
  { label: "Appointment Requests", value: 184, suffix: "%", prefix: "+", color: "text-violet-600", bg: "bg-violet-50 border-violet-100", bar: "bg-violet-500", pct: 84 },
  { label: "Return on Ad Spend", value: 3.7, suffix: "x", decimals: 1, color: "text-amber-600", bg: "bg-amber-50 border-amber-100", bar: "bg-amber-500", pct: 68 },
] as const;

function MetricBar({
  metric,
  index,
  inView,
}: {
  metric: (typeof liveMetrics)[number];
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(
    metric.value,
    2200 + index * 200,
    inView,
    "decimals" in metric ? metric.decimals : 0,
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 + index * 0.12 }}
      className={`rounded-2xl border ${metric.bg} p-4`}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{metric.label}</p>
        <p className={`text-2xl font-black leading-none ${metric.color}`}>
          {"prefix" in metric ? metric.prefix : ""}{count}{metric.suffix}
        </p>
      </div>
      <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${metric.pct}%` } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 + index * 0.12 }}
          className={`h-full rounded-full ${metric.bar}`}
        />
      </div>
    </motion.div>
  );
}

function GrowthCommandCentre({ inView }: { inView: boolean }) {
  // Mini bar chart data — 12 months
  const bars = [12, 18, 24, 30, 42, 58, 74, 91, 112, 148, 187, 234];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      className="relative rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/30 overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-emerald-500" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-sm">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[14px] font-black text-slate-900 leading-tight">Growth Command Centre</p>
            <p className="text-[11px] text-slate-400 font-medium">Post-Ikhtiyaar Performance</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          <LiveDot color="emerald" />
          <span className="text-[10px] font-bold text-emerald-700">All Systems Active</span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Metric bars */}
        <div className="grid sm:grid-cols-2 gap-3">
          {liveMetrics.map((m, i) => (
            <MetricBar key={m.label} metric={m} index={i} inView={inView} />
          ))}
        </div>

        {/* Bar chart */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] font-black text-slate-800">Monthly Lead Volume</p>
              <p className="text-[10px] text-slate-400 font-medium">12-month trajectory</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-black text-emerald-700">+312%</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-16">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.5 + i * 0.045, ease: EASE }}
                className="flex-1 rounded-t-sm origin-bottom"
                style={{
                  height: `${(h / 234) * 100}%`,
                  background: i >= 9
                    ? "linear-gradient(to top, #2563eb, #60a5fa)"
                    : "linear-gradient(to top, #e2e8f0, #cbd5e1)",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 mt-1.5">
            <span>Before Ikhtiyaar</span>
            <span className="text-blue-500 font-bold">After →</span>
          </div>
        </div>

        {/* System status pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Google Ads", color: "text-violet-700 bg-violet-50 border-violet-100" },
            { label: "Local SEO", color: "text-sky-700 bg-sky-50 border-sky-100" },
            { label: "Landing Pages", color: "text-amber-700 bg-amber-50 border-amber-100" },
            { label: "Call Tracking", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
            { label: "Attribution", color: "text-blue-700 bg-blue-50 border-blue-100" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: EASE, delay: 0.6 + i * 0.06 }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${s.color}`}
            >
              <CheckCircle2 className="w-3 h-3" />
              {s.label}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function TheGrowthEngine() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  const topInView = useInView(topRef, { once: true, margin: "-40px" });
  const narrativeInView = useInView(narrativeRef, { once: true, margin: "-60px" });
  const engineInView = useInView(engineRef, { once: true, margin: "-60px" });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });
  const commandInView = useInView(commandRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="the-growth-engine"
      className="relative bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 py-12 lg:py-32 overflow-hidden"
    >
      {/* ── Background ──────────────────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-blue-400/[0.04] blur-[160px]" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full bg-sky-400/[0.03] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-400/[0.025] blur-[120px]" />
        {/* Breathing orb */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[35%] w-[500px] h-[500px] rounded-full bg-blue-500 blur-[140px]"
        />
        <DotGrid color="#3b82f6" opacity={0.018} size={30} />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* ── Top accent line ─────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent origin-left"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* ── Section Header ────────────────────────────────────────────────── */}
        <div ref={topRef} className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={topInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/50 px-5 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-[12px] font-bold text-blue-700 uppercase tracking-[0.2em]">
              The Growth Engine
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="font-poppins text-4xl sm:text-5xl lg:text-[3.1rem] font-black text-slate-900 leading-[1.06] tracking-tight mb-5">
            <SplitReveal text="We Didn't Fix One Problem." delay={0.05} />
            <br className="hidden sm:block" />
            <SplitReveal text="We Rebuilt The" delay={0.3} />{" "}
            <SplitReveal text="Entire System." delay={0.46} isAccent />
          </h2>

          {/* Underline */}
          <motion.div
            className="mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={topInView ? { width: 64, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            <div className="h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-sky-400 mx-auto" />
          </motion.div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.9, ease: EASE }}
            className="text-slate-600 font-sans text-base sm:text-lg leading-[1.75] font-semibold max-w-2xl mx-auto"
          >
            Dentish didn't need another vendor running isolated campaigns. They needed a unified patient acquisition system where every piece{" "}
            <span className="text-slate-900 font-bold">worked together as one engine</span>.
          </motion.p>
        </div>

        {/* ── Narrative pivot block ─────────────────────────────────────────── */}
        <div ref={narrativeRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={narrativeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative rounded-3xl border border-blue-100/60 bg-white/70 backdrop-blur-xl p-8 sm:p-10 shadow-xl shadow-blue-100/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-violet-400 to-emerald-400" />
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10">
              {/* The turning point */}
              <div className="flex items-start gap-4 mb-7">
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={narrativeInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                  className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 mt-0.5"
                >
                  <Layers className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={narrativeInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                    className="text-slate-900 text-xl sm:text-2xl font-black font-poppins leading-snug"
                  >
                    The turning point wasn't one campaign.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                      It was one connected system.
                    </span>
                  </motion.p>
                </div>
              </div>

              {/* System capability grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: Search, label: "Generate Demand", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
                  { icon: MousePointerClick, label: "Capture Attention", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
                  { icon: LayoutTemplate, label: "Convert Visitors", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
                  { icon: Phone, label: "Create Conversations", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
                  { icon: Calendar, label: "Book Appointments", color: "text-sky-600", bg: "bg-sky-50 border-sky-100" },
                  { icon: BarChart3, label: "Track Performance", color: "text-rose-600", bg: "bg-rose-50 border-rose-100" },
                  { icon: TrendingUp, label: "Scale Growth", color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-100" },
                  { icon: ClipboardList, label: "Report Everything", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16, scale: 0.9 }}
                      animate={narrativeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.06 }}
                      whileHover={{ y: -3, scale: 1.03 }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${item.bg} group/cap cursor-default`}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/80 shadow-sm">
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} strokeWidth={2} />
                      </div>
                      <span className={`text-[14px] font-bold ${item.color}`}>{item.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={narrativeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.85, ease: EASE }}
                className="relative pl-5 border-l-[3px] border-blue-200/60"
              >
                <p className="text-slate-700 text-base sm:text-[17px] leading-[1.75] font-medium">
                  This wasn't a campaign. It was an infrastructure rebuild. Every layer was built to feed the next from first search to booked appointment with{" "}
                  <span className="font-bold text-slate-900">zero gaps in the patient journey</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Patient Acquisition Engine (centrepiece) ──────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-start">
          {/* Left: Context */}
          <div ref={engineRef} className="space-y-6 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={engineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                The Engine
              </p>
              <h3 className="font-poppins text-3xl sm:text-4xl font-black text-slate-900 max-w-md leading-tight">
                Every Stage.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                  Connected.
                </span>
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={engineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
              className="text-slate-600 text-[16px] sm:text-[17px] leading-[1.75] font-medium max-w-lg"
            >
              What you see on the right isn't a list of services. It's the patient acquisition engine we engineered for Dentish from the moment someone types a search to the moment they book an appointment.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={engineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
              className="text-slate-600 text-[16px] sm:text-[17px] leading-[1.75] font-medium max-w-lg"
            >
              Every stage feeds the next. Nothing leaks. Every lead is captured, attributed, and followed up. Every pound of marketing spend is measured and accountable.
            </motion.p>

            {/* System promise cards */}
            <div className="space-y-3">
              {[
                {
                  icon: Zap,
                  title: "Intentional by design",
                  desc: "Every component was built for a specific job in the patient journey.",
                  color: "text-amber-600",
                  bg: "bg-amber-50 border-amber-100",
                },
                {
                  icon: Layers,
                  title: "Integrated, not isolated",
                  desc: "Google Ads feeds landing pages. Landing pages feed call tracking. Call tracking feeds reporting. One ecosystem.",
                  color: "text-blue-600",
                  bg: "bg-blue-50 border-blue-100",
                },
                {
                  icon: TrendingUp,
                  title: "Built to compound",
                  desc: "SEO builds over time. Ads optimise week over week. Growth becomes predictable, not accidental.",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50 border-emerald-100",
                },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={engineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.4 + i * 0.12 }}
                    whileHover={{ x: 4 }}
                    className={`flex items-start gap-3 p-4 rounded-2xl border ${c.bg} group/promise cursor-default`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center bg-white shadow-sm mt-0.5">
                      <Icon className={`w-4 h-4 ${c.color}`} />
                    </div>
                    <div>
                      <p className="text-[16px] font-black text-slate-900 mb-0.5">{c.title}</p>
                      <p className="text-[13px] text-slate-600 font-medium leading-snug">{c.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Engine panel */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={engineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-5"
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                Live System
              </p>
              <h3 className="font-poppins text-2xl font-black text-slate-900 leading-tight">
                Patient Journey After Ikhtiyaar
              </h3>
            </motion.div>
            <AcquisitionEnginePanel inView={engineInView} />
          </div>
        </div>

        {/* ── Five Strategy Pillars ─────────────────────────────────────────── */}
        <div ref={pillarsRef} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              How We Built It
            </p>
            <h3 className="font-poppins text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Five Pillars. One System.
            </h3>
            <p className="text-slate-600 text-base leading-[1.7] font-medium mt-3">
              Each pillar was designed to solve a specific weakness and then connect into the whole.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => (
              <PillarCard key={pillar.num} pillar={pillar} index={i} inView={pillarsInView} />
            ))}
          </div>
        </div>

        {/* ── Growth Command Centre ─────────────────────────────────────────── */}
        <div ref={commandRef} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={commandInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              The Dashboard
            </p>
            <h3 className="font-poppins text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Everything Measurable.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                Nothing Hidden.
              </span>
            </h3>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <GrowthCommandCentre inView={commandInView} />
          </div>
        </div>

        {/* ── Transition bridge ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="max-w-3xl mx-auto text-center space-y-5"
        >
          {/* Quote block */}
          <div className="relative rounded-3xl border border-blue-100/60 bg-gradient-to-br from-blue-50/60 to-white p-8 sm:p-10 shadow-lg shadow-blue-100/20 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-emerald-400" />
            <Sparkles className="w-6 h-6 text-blue-300 mx-auto mb-3" />
            <p className="text-slate-800 text-lg sm:text-xl font-black font-poppins leading-snug mb-3">
              "Within weeks, Dentish wasn't relying on hope anymore."
            </p>
            <p className="text-slate-600 text-[15px] font-medium leading-[1.7]">
              For the first time, every stage of growth was measurable. Every lead was tracked. Every campaign was accountable. The clinic finally had a predictable, scalable way to attract and convert new patients.
            </p>
          </div>

          {/* CTA bridge to results */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-300" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm">
              <ChevronRight className="w-4 h-4 text-blue-500" />
              <span className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                Now, the results
              </span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 to-slate-300" />
          </div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <div className="flex flex-col items-center gap-1">
              <ArrowDown className="w-5 h-5 text-blue-400" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
