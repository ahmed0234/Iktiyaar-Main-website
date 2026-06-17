"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import {
  Search,
  Globe,
  LayoutTemplate,
  Target,
  MapPin,
  BarChart3,
  AlertTriangle,
  TrendingDown,
  XCircle,
  HelpCircle,
  ArrowDown,
  Users,
  Phone,
  CalendarX,
  Eye,
  EyeOff,
} from "lucide-react";

// ─── Shared ease (matches site-wide system) ──────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Dot-grid background ─────────────────────────────────────────────────────
function DotGrid({
  color = "#3b82f6",
  opacity = 0.022,
  size = 28,
}: {
  color?: string;
  opacity?: number;
  size?: number;
}) {
  const id = `ch-dot-${size}`;
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

// ─── Word-by-word reveal ──────────────────────────────────────────────────────
function SplitReveal({
  text,
  delay = 0,
  className = "",
  isAccent = false,
  isDanger = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  isAccent?: boolean;
  isDanger?: boolean;
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
                : isDanger
                ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400"
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

// ─── 3D Tilt wrapper ──────────────────────────────────────────────────────────
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 22,
  });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 180,
    damping: 22,
  });
  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }
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

// ─── Pulsing Warning Dot ──────────────────────────────────────────────────────
function WarningPulse() {
  return (
    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
    </span>
  );
}

// ─── Growth Leak Pipeline (right panel) ──────────────────────────────────────
const pipelineStages = [
  {
    icon: Search,
    label: "Google Search",
    sub: "8,400+ monthly searches",
    status: "warning",
    statusLabel: "Low Capture Rate",
    dotColor: "#94a3b8",
    leak: "72% not finding Dentish",
    leakVisible: true,
  },
  {
    icon: Globe,
    label: "Website Visit",
    sub: "Minimal landing experience",
    status: "critical",
    statusLabel: "No Conversion Path",
    dotColor: "#f87171",
    leak: "Patients leaving without action",
    leakVisible: true,
  },
  {
    icon: LayoutTemplate,
    label: "Landing Page",
    sub: "No optimised booking page",
    status: "critical",
    statusLabel: "Missing",
    dotColor: "#f87171",
    leak: "Zero structured patient journey",
    leakVisible: true,
  },
  {
    icon: Target,
    label: "Google Ads",
    sub: "Running without structure",
    status: "warning",
    statusLabel: "Budget Leak",
    dotColor: "#fb923c",
    leak: "High spend, low return",
    leakVisible: true,
  },
  {
    icon: Phone,
    label: "Phone Call",
    sub: "Untracked, unattributed",
    status: "critical",
    statusLabel: "No Tracking",
    dotColor: "#f87171",
    leak: "No visibility on call sources",
    leakVisible: true,
  },
  {
    icon: CalendarX,
    label: "Booked Appointment",
    sub: "Inconsistent lead flow",
    status: "critical",
    statusLabel: "Unreliable",
    dotColor: "#f87171",
    leak: "Growth was luck, not system",
    leakVisible: true,
  },
] as const;

function GrowthLeakPanel({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.94 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: EASE }}
      style={{ perspective: "1000px" }}
      className="relative w-full"
    >
      <TiltCard className="relative">
        {/* Ambient red glow */}
        <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-red-200/20 via-rose-100/10 to-transparent blur-3xl pointer-events-none" />

        {/* Main card */}
        <div className="relative rounded-2xl border border-slate-200/70 bg-white shadow-2xl shadow-slate-200/40 overflow-hidden">
          {/* Top danger bar */}
          <div className="h-1 bg-gradient-to-r from-red-500 via-rose-400 to-orange-400" />

          {/* Panel header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/60 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-3 py-0.5 rounded-md bg-red-50/80 border border-red-100 text-[13px] text-red-600 font-bold">
                Patient Journey Audit Before Ikhtiyaar
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <WarningPulse />
              <span className="text-[10px] font-bold text-red-600">Issues Detected</span>
            </div>
          </div>

          {/* Pipeline stages */}
          <div className="p-5 space-y-2">
            {pipelineStages.map((stage, i) => {
              const Icon = stage.icon;
              const isCritical = stage.status === "critical";
              return (
                <React.Fragment key={stage.label}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.1 }}
                    className="group/stage"
                  >
                    <div
                      className={`relative flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                        isCritical
                          ? "border-red-100 bg-red-50/60 hover:bg-red-50"
                          : "border-amber-100 bg-amber-50/40 hover:bg-amber-50/70"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${stage.dotColor}18` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: stage.dotColor }} />
                      </div>

                      {/* Labels */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-bold text-slate-800 leading-tight">
                          {stage.label}
                        </p>
                        <p className="text-[12px] text-slate-600 font-medium truncate">
                          {stage.sub}
                        </p>
                      </div>

                      {/* Status badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: EASE }}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg flex-shrink-0 ${
                          isCritical
                            ? "bg-red-100/80 border border-red-200"
                            : "bg-amber-100/80 border border-amber-200"
                        }`}
                      >
                        {isCritical ? (
                          <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                        )}
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider ${
                            isCritical ? "text-red-600" : "text-amber-600"
                          }`}
                        >
                          {stage.statusLabel}
                        </span>
                      </motion.div>
                    </div>

                    {/* Leak callout */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={inView ? { opacity: 1, height: "auto" } : {}}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1, ease: EASE }}
                      className="ml-11 mt-0.5 overflow-hidden"
                    >
                      <div className="flex items-center gap-1.5 pl-2 border-l-2 border-dashed border-red-200/60">
                        <TrendingDown className="w-2.5 h-2.5 text-red-400 flex-shrink-0" />
                        <span className="text-[10px] text-red-400 font-semibold italic">
                          {stage.leak}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Connector arrow between stages */}
                  {i < pipelineStages.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                      className="flex justify-center items-center origin-top"
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-px h-2 bg-gradient-to-b from-slate-200 to-red-200" />
                        <ArrowDown className="w-3 h-3 text-red-300" />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Revenue loss card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.8, ease: EASE }}
              className="mt-1 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 p-4 flex items-center justify-between shadow-xl shadow-slate-900/20"
            >
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Result
                </p>
                <p className="text-[15px] font-black text-white leading-tight mt-0.5">
                  Missed Opportunities Every Month
                </p>
              </div>
              <div className="text-right">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <HelpCircle className="w-8 h-8 text-red-400/80" />
                </motion.div>
                <p className="text-[9px] text-slate-500 font-semibold mt-1">
                  Unmeasured loss
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating warning chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 2.0, duration: 0.6, ease: EASE }}
          className="absolute -top-5 -right-4 z-20"
        >
          <motion.div
            animate={{ y: [-5, 7, -5], rotate: [-1, 1.5, -1] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-red-200/60 shadow-xl shadow-red-500/10"
          >
            <EyeOff className="w-3.5 h-3.5 text-red-500" />
            <div>
              <p className="text-[9px] text-slate-400 font-medium leading-none">Visibility</p>
              <p className="text-[11px] font-black text-red-600">Very Low</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.6, ease: EASE }}
          className="absolute -bottom-5 -left-4 z-20"
        >
          <motion.div
            animate={{ y: [7, -5, 7], rotate: [1, -1.5, 1] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-xl border border-amber-200/60 shadow-xl shadow-amber-500/10"
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
            <div>
              <p className="text-[9px] text-slate-400 font-medium leading-none">Tracking</p>
              <p className="text-[11px] font-black text-amber-600">None</p>
            </div>
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Problem cards (left side narrative) ─────────────────────────────────────
const problems = [
  {
    num: "01",
    icon: Globe,
    title: "Limited Online Presence",
    body: "Patients were actively searching for dental care in Jumeirah and Umm Suqeim every day. Dentish existed but wasn't consistently appearing where those searches were happening. The clinic was invisible at the exact moment intent was highest.",
    accentColor: "from-red-500 to-rose-400",
    bgColor: "bg-red-50/60 border-red-100/80",
    iconColor: "text-red-500",
    glowColor: "rgba(239,68,68,0.08)",
    tagColor: "bg-red-100/80 border-red-200 text-red-600",
    tag: "SEO Visibility Gap",
  },
  {
    num: "02",
    icon: LayoutTemplate,
    title: "No High-Converting Landing Pages",
    body: "The few patients who did find Dentish online had nowhere optimised to go. No dedicated booking experience. No clear call-to-action. Traffic arrived and left without ever becoming a patient. Every click was a missed conversation.",
    accentColor: "from-orange-500 to-amber-400",
    bgColor: "bg-amber-50/60 border-amber-100/80",
    iconColor: "text-amber-500",
    glowColor: "rgba(245,158,11,0.08)",
    tagColor: "bg-amber-100/80 border-amber-200 text-amber-700",
    tag: "Conversion Failure",
  },
  {
    num: "03",
    icon: Target,
    title: "Google Ads Without Clear Direction",
    body: "Advertising budget was being spent, but without a structured strategy. Campaigns lacked proper targeting, ad copy testing, and landing page alignment. High intent searches people ready to book a dentist were not being captured effectively.",
    accentColor: "from-violet-500 to-purple-400",
    bgColor: "bg-violet-50/60 border-violet-100/80",
    iconColor: "text-violet-500",
    glowColor: "rgba(139,92,246,0.08)",
    tagColor: "bg-violet-100/80 border-violet-200 text-violet-700",
    tag: "Budget Leakage",
  },
  {
    num: "04",
    icon: MapPin,
    title: "Weak Local SEO Foundation",
    body: "Competing clinics dominated the local map pack. When patients searched 'dentist near me' or 'dental clinic Jumeirah', Dentish wasn't appearing in the results that matter most. Competitors were capturing demand that should have been theirs.",
    accentColor: "from-sky-500 to-blue-400",
    bgColor: "bg-sky-50/60 border-sky-100/80",
    iconColor: "text-sky-500",
    glowColor: "rgba(14,165,233,0.08)",
    tagColor: "bg-sky-100/80 border-sky-200 text-sky-700",
    tag: "Local Rankings",
  },
  {
    num: "05",
    icon: BarChart3,
    title: "No Clear Tracking or Attribution",
    body: "There was no reliable way to know which campaigns generated calls, which keywords drove appointments, or what the actual cost per patient was. Growth decisions were being made on assumptions. Without data, there's no direction only guesswork.",
    accentColor: "from-slate-600 to-slate-500",
    bgColor: "bg-slate-50/80 border-slate-200/80",
    iconColor: "text-slate-500",
    glowColor: "rgba(100,116,139,0.08)",
    tagColor: "bg-slate-100/80 border-slate-200 text-slate-600",
    tag: "Zero Attribution",
  },
] as const;

function ProblemCard({
  problem,
  index,
  inView,
}: {
  problem: (typeof problems)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = problem.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.12 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group/problem relative"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover/problem:opacity-100 transition-all duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 28px 4px ${problem.glowColor}, 0 14px 28px -8px ${problem.glowColor}`,
        }}
      />

      <div
        className={`relative overflow-hidden rounded-2xl border ${problem.bgColor} bg-white p-5 shadow-sm group-hover/problem:shadow-xl transition-all duration-400`}
      >
        {/* Top accent bar */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${problem.accentColor} origin-left`}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.12, ease: EASE }}
        />

        {/* Shimmer on hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover/problem:opacity-100 transition-opacity duration-500">
          <motion.div
            animate={{ x: ["-200%", "200%"] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 2 }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
          />
        </div>

        <div className="relative z-10">
          {/* Problem number + icon row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${problem.accentColor} shadow-sm`}
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Problem
                </p>
                <p
                  className={`text-2xl font-black leading-none bg-gradient-to-r ${problem.accentColor} text-transparent bg-clip-text`}
                >
                  {problem.num}
                </p>
              </div>
            </div>

            {/* Tag badge */}
            <span
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${problem.tagColor}`}
            >
              <AlertTriangle className="w-2.5 h-2.5" />
              {problem.tag}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-poppins text-[17px] font-black text-slate-900 mb-2 leading-snug">
            {problem.title}
          </h4>

          {/* Body */}
          <p className="text-[15px] text-slate-700 leading-[1.7] font-medium">
            {problem.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function TheChallengeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);

  const topInView = useInView(topRef, { once: true, margin: "-40px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-60px" });
  const problemsInView = useInView(problemsRef, { once: true, margin: "-60px" });
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-60px" });

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="the-challenge"
      className="relative bg-gradient-to-b from-white via-slate-50/60 to-white py-12 lg:py-32 overflow-hidden"
    >
      {/* ── Background layer ───────────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Ambient orbs — shifted to warm/danger tones for tension */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-red-400/[0.03] blur-[150px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-rose-300/[0.025] blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] rounded-full bg-blue-300/[0.02] blur-[120px]" />
        <DotGrid color="#ef4444" opacity={0.014} size={30} />
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: `80px 80px`,
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
          className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent origin-left"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* ── Section header ────────────────────────────────────────────────── */}
        <div ref={topRef} className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={topInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200/60 bg-red-50/50 px-5 py-2 backdrop-blur-md"
          >
            <WarningPulse />
            <span className="text-[12px] font-bold text-red-600 uppercase tracking-[0.2em]">
              Before The Transformation
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="font-poppins text-4xl sm:text-5xl lg:text-[3.1rem] font-black text-slate-900 leading-[1.06] tracking-tight mb-5">
            <SplitReveal text="Great Dental Care" delay={0.05} />
            <br className="hidden sm:block" />
            <SplitReveal text="Doesn't Guarantee" delay={0.24} />{" "}
            <SplitReveal text="Growth." delay={0.44} isDanger />
          </h2>

          {/* Animated underline */}
          <motion.div
            className="mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={topInView ? { width: 64, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            <div className="h-[3px] rounded-full bg-gradient-to-r from-red-500 to-rose-400 mx-auto" />
          </motion.div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.9, ease: EASE }}
            className="text-slate-600 font-sans text-base sm:text-lg leading-[1.75] font-semibold max-w-2xl mx-auto"
          >
            Dentish was delivering exceptional dental care. Patients who found them stayed loyal for years. The problem wasn't quality it was that modern patients searching online{" "}
            <span className="text-slate-900 font-bold">simply couldn't find them</span>.
          </motion.p>
        </div>

        {/* ── Emotional story block ─────────────────────────────────────────── */}
        <div ref={storyRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-xl p-8 sm:p-10 shadow-xl shadow-slate-200/30 overflow-hidden"
          >
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-red-400" />

            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 space-y-6">
              {/* Opening line */}
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={storyInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                  className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 mt-1"
                >
                  <Eye className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
                    className="text-slate-900 text-xl sm:text-2xl font-black font-poppins leading-snug"
                  >
                    The clinic was exceptional.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                      The growth system wasn't.
                    </span>
                  </motion.p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  {
                    label: "The Reality",
                    text: "Patients who found Dentish became loyal for life. Word of mouth spread. Reviews were glowing. The clinical quality was never in question.",
                    icon: "✓",
                    color: "border-emerald-200 bg-emerald-50/60",
                    iconClass: "text-emerald-600",
                  },
                  {
                    label: "The Gap",
                    text: "But for every loyal patient, there were dozens of potential patients searching online and choosing a competitor who showed up first.",
                    icon: "↗",
                    color: "border-amber-200 bg-amber-50/60",
                    iconClass: "text-amber-600",
                  },
                  {
                    label: "The Cost",
                    text: "No tracking. No funnel. No clear acquisition system. Each month, an unknown number of qualified patients were being lost to competitors with inferior care but superior visibility.",
                    icon: "✗",
                    color: "border-red-200 bg-red-50/60",
                    iconClass: "text-red-500",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.13, ease: EASE }}
                    className={`rounded-2xl border p-4 ${item.color}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xl font-black ${item.iconClass}`}>{item.icon}</span>
                      <p className="text-[13px] font-bold text-slate-700 uppercase tracking-widest">
                        {item.label}
                      </p>
                    </div>
                    <p className="text-[14px] text-slate-700 leading-[1.65] font-medium">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Pull quote */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.75, ease: EASE }}
                className="relative pl-5 border-l-[3px] border-slate-300/60"
              >
                <p className="text-slate-700 text-base sm:text-lg leading-[1.75] font-medium italic">
                  While competitors were capturing patient demand online, Dentish was operating with{" "}
                  <span className="not-italic font-bold text-slate-900">
                    no reliable digital acquisition system
                  </span>{" "}
                   missing opportunities every single month that could have been converted into appointments, revenue, and long-term patient relationships.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Two-column: Problems left, Pipeline right ─────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-16 items-start">

          {/* Left: Problem cards */}
          <div ref={problemsRef} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={problemsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6"
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                The Real Problems
              </p>
              <h3 className="font-poppins text-2xl sm:text-3xl font-black text-slate-900 max-w-lg leading-tight">
                Five Growth Bottlenecks Hiding in Plain Sight
              </h3>
            </motion.div>

            {problems.map((problem, i) => (
              <ProblemCard
                key={problem.num}
                problem={problem}
                index={i}
                inView={problemsInView}
              />
            ))}
          </div>

          {/* Right: Growth Leak Panel (sticky on desktop) */}
          <div ref={pipelineRef} className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6"
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                Visual Audit
              </p>
              <h3 className="font-poppins text-2xl font-black text-slate-900 leading-tight">
                The Patient Journey Before
              </h3>
            </motion.div>
            <GrowthLeakPanel inView={pipelineInView} />
          </div>
        </div>

        {/* ── Transition bridge ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-300" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
                The potential was real
              </span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-200 to-slate-300" />
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-[1.75] font-semibold">
            Dentish had everything a growing clinic needs — exceptional care, a passionate team, loyal patients, and a strong local reputation.{" "}
            <span className="text-slate-900 font-bold">
              What they needed was a growth system built to match that quality.
            </span>
          </p>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex justify-center pt-2"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                The Strategy
              </span>
              <ArrowDown className="w-5 h-5 text-blue-400" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
