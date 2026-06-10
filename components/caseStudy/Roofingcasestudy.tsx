"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  animate,
} from "motion/react";
import {
  AlertTriangle,
  TrendingDown,
  PhoneMissed,
  DollarSign,
  Users,
  BarChart2,
  Target,
  Search,
  Globe,
  PhoneCall,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Star,
  Quote,
  ChevronRight,
  Activity,
  Award,
  Layers,
  MousePointerClick,
} from "lucide-react";
import Image from "next/image";
import PainPointsJourney from "./PainPointsJourney";

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ from, to, suffix = "", prefix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, from, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Split Text Reveal ─────────────────────────────────────────────────────────
function SplitReveal({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
          className="mr-[0.25em]"
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.04,
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

// ─── Ambient Background ────────────────────────────────────────────────────────
function AmbientBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-blue-400/6 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-600/4 blur-[100px]" />
      {/* dot grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#3b82f6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

// ─── Section Badge ─────────────────────────────────────────────────────────────
function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50/70 text-blue-700 text-xs font-semibold uppercase tracking-widest">
      {children}
    </span>
  );
}

// ─── Pain Card ─────────────────────────────────────────────────────────────────
function PainCard({ icon: Icon, title, body, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative rounded-2xl border border-red-100 bg-white/80 backdrop-blur-sm p-5 shadow-sm shadow-red-50/40 overflow-hidden cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-red-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 mb-0.5">{title}</p>
          <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Growth Engine ─────────────────────────────────────────────────────────────
function GrowthEngine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const inputs = [
    { icon: Target, label: "Google Ads", color: "from-blue-500 to-blue-400" },
    { icon: Search, label: "SEO", color: "from-violet-500 to-violet-400" },
    { icon: Globe, label: "Landing Pages", color: "from-cyan-500 to-cyan-400" },
    {
      icon: PhoneCall,
      label: "Call Tracking",
      color: "from-emerald-500 to-emerald-400",
    },
    {
      icon: MousePointerClick,
      label: "CRO",
      color: "from-amber-500 to-amber-400",
    },
  ];

  const outputs = [
    { label: "Qualified Leads", icon: Users, color: "text-blue-600" },
    {
      label: "Booked Estimates",
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
    { label: "Revenue Growth", icon: TrendingUp, color: "text-violet-600" },
  ];

  return (
    <div
      ref={ref}
      className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16"
    >
      {/* Inputs */}
      <div className="flex flex-col gap-4 w-full max-w-[250px]">
        {inputs.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1 + i * 0.1,
            }}
            className="flex items-center gap-2.5 bg-white/90 border border-slate-100 rounded-xl px-3 py-2.5 shadow-sm"
          >
            <div
              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
            >
              <item.icon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-700">
              {item.label}
            </span>
            {/* animated dot */}
            <motion.div
              animate={inView ? { x: [0, 8, 0], opacity: [1, 0.4, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.3 }}
              className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
            />
          </motion.div>
        ))}
      </div>

      {/* Flow lines + Engine */}
      <div className="relative flex items-center justify-center">
        {/* flowing lines */}
        <svg
          className="hidden lg:block absolute left-[-80px] w-[80px] h-[260px]"
          viewBox="0 0 80 260"
          fill="none"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path
              key={i}
              d={`M 0 ${26 + i * 52} C 40 ${26 + i * 52} 40 130 80 130`}
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Central engine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          {/* Rings */}
          {[1, 0.7, 0.45].map((scale, i) => (
            <motion.div
              key={i}
              animate={inView ? { rotate: i % 2 === 0 ? 360 : -360 } : {}}
              transition={{
                repeat: Infinity,
                duration: 8 + i * 4,
                ease: "linear",
              }}
              style={{ scale }}
              className="absolute inset-0 rounded-full border border-blue-400/30"
            />
          ))}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)]">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -inset-2 rounded-full bg-blue-500/10 blur-md"
          />
        </motion.div>

        {/* right lines */}
        <svg
          className="hidden lg:block absolute right-[-80px] w-[80px] h-[180px]"
          viewBox="0 0 80 180"
          fill="none"
        >
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M 0 90 C 40 90 40 ${30 + i * 60} 80 ${30 + i * 60}`}
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.0 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Outputs */}
      <div className="flex flex-col gap-3 w-full max-w-[200px]">
        {outputs.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.1 + i * 0.1,
            }}
            className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600/5 to-blue-400/5 border border-blue-100 rounded-xl px-3 py-2.5 shadow-sm"
          >
            <item.icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
            <span className="text-xs font-semibold text-slate-700">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────
function KPICard({
  label,
  from,
  to,
  suffix,
  prefix,
  sub,
  color,
  delay,
  icon: Icon,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl bg-white/90 backdrop-blur border border-slate-100 p-6 shadow-sm overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-[80px] bg-gradient-to-bl from-blue-50 to-transparent" />
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${color}`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5"
        >
          <TrendingUp className="w-3 h-3" /> Up
        </motion.div>
      </div>
      <p className="text-3xl font-black text-slate-900 tracking-tight">
        {inView ? (
          <AnimatedCounter
            from={from}
            to={to}
            suffix={suffix}
            prefix={prefix}
          />
        ) : (
          `${prefix ?? ""}${from}${suffix ?? ""}`
        )}
      </p>
      <p className="text-sm font-semibold text-slate-700 mt-0.5">{label}</p>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </motion.div>
  );
}

// ─── Lead Growth Bar ───────────────────────────────────────────────────────────
function LeadGrowthBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const before = [15, 18, 12, 20, 14, 17, 16, 19];
  const after = [15, 28, 45, 62, 78, 95, 108, 115];
  const max = 115;

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white/90 backdrop-blur border border-slate-100 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Monthly Lead Volume
          </p>
          <p className="text-xs text-slate-400">Before & After Partnership</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block" />
            Before
          </span>
          <span className="flex items-center gap-1 text-blue-600 font-semibold">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
            After
          </span>
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-36">
        {months.map((m, i) => (
          <div key={m} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full flex gap-0.5 items-end"
              style={{ height: "110px" }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={
                  inView ? { height: `${(before[i] / max) * 110}px` } : {}
                }
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 + i * 0.08,
                }}
                className="flex-1 rounded-t-md bg-slate-200"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={
                  inView ? { height: `${(after[i] / max) * 110}px` } : {}
                }
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + i * 0.08,
                }}
                className={`flex-1 rounded-t-md ${i >= 4 ? "bg-gradient-to-t from-blue-600 to-blue-400" : "bg-blue-400/60"}`}
              />
            </div>
            <span className="text-[9px] text-slate-400 font-medium">{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CPL Reduction Visual ──────────────────────────────────────────────────────
function CPLCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white/90 backdrop-blur border border-slate-100 p-6 shadow-sm"
    >
      <p className="text-sm font-semibold text-slate-800 mb-1">
        Cost Per Lead Reduction
      </p>
      <p className="text-xs text-slate-400 mb-4">
        48% lower cost per qualified lead
      </p>
      <div className="space-y-4">
        {[
          {
            label: "Before",
            value: 148,
            max: 148,
            color: "bg-red-400",
            text: "$148",
          },
          {
            label: "After",
            value: 77,
            max: 148,
            color: "bg-gradient-to-r from-blue-600 to-blue-400",
            text: "$77",
          },
        ].map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-600">{item.label}</span>
              <span
                className={`font-bold ${i === 0 ? "text-red-500" : "text-blue-600"}`}
              >
                {item.text} / lead
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={
                  inView ? { width: `${(item.value / item.max) * 100}%` } : {}
                }
                transition={{
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + i * 0.3,
                }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2"
      >
        <TrendingDown className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-semibold text-emerald-700">
          Saving $71 per lead · ~$7,810/mo at current volume
        </span>
      </motion.div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function RoofingCaseStudy() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const painPoints = [
    {
      icon: TrendingDown,
      title: "Unpredictable lead flow",
      body: "Some weeks the phone wouldn't ring at all. Revenue projections were impossible.",
    },
    {
      icon: DollarSign,
      title: "Google Ads burning cash",
      body: "Ad spend was climbing but booked jobs weren't. No one could explain where the money went.",
    },
    {
      icon: AlertTriangle,
      title: "Agencies that overpromised",
      body: "Two previous agencies promised top-of-page rankings. Neither moved the needle.",
    },
    {
      icon: Users,
      title: "No referral replacement plan",
      body: "Referrals dried up in slow seasons with zero backup system to fill the gap.",
    },
    {
      icon: BarChart2,
      title: "Traffic with no conversions",
      body: "Google Analytics showed hundreds of visits. The contact form barely got touched.",
    },
    {
      icon: PhoneMissed,
      title: "Zero lead attribution",
      body: "When a call did come in, there was no way to know which effort actually drove it.",
    },
  ];

  const services = [
    {
      icon: Target,
      label: "Google Ads Rebuild",
      color: "from-blue-500 to-blue-600",
    },
    { icon: Globe, label: "Landing Pages", color: "from-cyan-500 to-cyan-600" },
    {
      icon: Search,
      label: "Local SEO",
      color: "from-violet-500 to-violet-600",
    },
    {
      icon: PhoneCall,
      label: "Call Tracking",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: MousePointerClick,
      label: "Conversion Rate Opt.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Activity,
      label: "Analytics & Testing",
      color: "from-rose-500 to-rose-600",
    },
  ];

  const kpis = [
    {
      label: "Monthly Leads",
      from: 15,
      to: 312,
      suffix: "+",
      sub: "Up from 15/mo before",
      color: "from-blue-500 to-blue-400",
      icon: Users,
    },
    {
      label: "Conversion Rate",
      from: 2,
      to: 9,
      suffix: ".4%",
      sub: "Was 2.1% at baseline",
      color: "from-violet-500 to-violet-400",
      icon: MousePointerClick,
    },
    {
      label: "CPL Reduction",
      from: 0,
      to: 48,
      suffix: "%",
      sub: "Cost per lead cut nearly in half",
      color: "from-emerald-500 to-emerald-400",
      icon: TrendingDown,
    },
    {
      label: "ROAS",
      from: 1,
      to: 6,
      suffix: ".2×",
      sub: "Return on every ad dollar spent",
      color: "from-amber-500 to-amber-400",
      icon: BarChart2,
    },
  ];

  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden font-sans">
      <AmbientBg />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* ── 0. Section Header ─────────────────────────────────────────── */}
        <div className="text-center space-y-4 mb-16" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge>
              <Star className="w-3 h-3" /> Case Study
            </Badge>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.05] tracking-tight">
            <SplitReveal text="Behind The Growth:" delay={0.1} />
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              <SplitReveal
                text="A Roofing Company's Transformation"
                delay={0.3}
              />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed"
          >
            From chasing referrals and watching ad spend disappear, to a
            predictable system that delivers 110+ qualified leads every month.
          </motion.p>
        </div>

        {/* ── 1. Owner Introduction ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-white/80 backdrop-blur border border-slate-100 shadow-sm overflow-hidden mb-18"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row items-center gap-10 p-8 lg:p-12 ">
            {/* Portrait */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="relative inline-block">
                <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Marcus Bui"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  Verified Client
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900">
                    Marcus Holloway
                  </p>
                  <p className="text-sm text-slate-500">
                    Founder & CEO · Holloway Roofing Co.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  "Denver, CO",
                  "Est. 2014",
                  "Residential & Commercial",
                  "12-person team",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed max-w-xl">
                Marcus built his roofing business on quality craftsmanship and
                word-of-mouth but after a decade, he knew the referral engine
                alone couldn't sustain the growth he wanted. He'd tried paid ads
                and two different agencies. Neither worked.
              </p>
            </div>

            {/* Stats mini */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0 w-full lg:w-auto">
              {[
                { n: "10", unit: "yrs", label: "in business" },
                { n: "3", unit: "mo", label: "to see results" },
                { n: "110+", unit: "/mo", label: "leads today" },
                { n: "48%", unit: "↓", label: "cost per lead" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 text-center"
                >
                  <p className="text-xl font-black text-slate-900">
                    {s.n}
                    <span className="text-sm font-semibold text-blue-500">
                      {s.unit}
                    </span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 2. Pain Journey ───────────────────────────────────────────── */}
        <PainPointsJourney />

        {/* ── 3. Owner Testimonial ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          {/* subtle pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="hex"
                  width="56"
                  height="56"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M28 0 L56 14 L56 42 L28 56 L0 42 L0 14Z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="0.8"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex)" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
          <div className="relative p-8 lg:p-16 flex flex-col lg:flex-row items-start gap-8">
            <Quote className="w-14 h-14 text-blue-400/60 flex-shrink-0 mt-1" />
            <div className="space-y-6">
              <p className="text-white text-xl lg:text-2xl font-semibold leading-[1.5] tracking-tight">
                Every month felt unpredictable. Some weeks the phone wouldn't
                ring, while other weeks we'd get a handful of referrals. We knew
                we were good at roofing but we had no reliable way to generate
                new business. The feast or famine cycle was exhausting.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <Image
                    src="https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Marcus Bui"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    Marcus Holloway
                  </p>
                  <p className="text-slate-400 text-xs">
                    Founder, Holloway Roofing Co.
                  </p>
                </div>
                <div className="ml-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 4. The Turning Point ──────────────────────────────────────── */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <Badge>
              <Zap className="w-3 h-3" /> The Turning Point
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              From Chaos to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Control
              </span>
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
              We audited everything. Replaced the guesswork with a layered,
              trackable growth architecture built specifically for local
              roofing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur border border-slate-100 rounded-2xl p-4 shadow-sm text-center cursor-default"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-sm`}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-700 leading-snug">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 5. Growth Engine ──────────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <Badge>
              <Activity className="w-3 h-3" /> Architecture
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Growth Engine
              </span>
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed font-poppins font-semibold">
              Every channel feeds a central system. Leads don't fall through the
              cracks they flow through a tracked, optimized pipeline.
            </p>
          </div>
          <div className="rounded-3xl bg-white/80 backdrop-blur border border-slate-100 p-8 lg:p-14 shadow-sm">
            <GrowthEngine />
          </div>
        </div>

        {/* ── 6. Before / After ─────────────────────────────────────────── */}
        {/* <div className="space-y-8">
          <div className="text-center space-y-3">
            <Badge>
              <ArrowRight className="w-3 h-3" /> Transformation
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Before <span className="text-slate-400 font-light">vs</span> After
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
           
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-white/70 backdrop-blur border border-red-100 p-7 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <p className="font-bold text-slate-800 text-sm uppercase tracking-widest">
                  Before
                </p>
              </div>
              <div className="space-y-2.5">
                {[
                  "15–20 unpredictable leads per month",
                  "Referral-dependent with no safety net",
                  "Google Ads with no conversion tracking",
                  "Generic website, no landing pages",
                  "No idea which channel was working",
                  "$148 average cost per lead",
                  "Sales team idle for days at a time",
                  "Revenue forecast within ±60%",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-500 p-7 space-y-4 shadow-lg shadow-blue-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 relative">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                <p className="font-bold text-white text-sm uppercase tracking-widest">
                  After
                </p>
              </div>
              <div className="space-y-2.5 relative">
                {[
                  "110+ qualified leads every single month",
                  "Fully owned paid + organic channels",
                  "Every dollar tracked from click to close",
                  "Dedicated landing pages per service/area",
                  "Full attribution across every touchpoint",
                  "$77 average cost per lead (–48%)",
                  "Sales team booked weeks in advance",
                  "Revenue forecast within ±10%",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/90 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div> */}

        {/* ── 7. Results Dashboard ──────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <Badge>
              <Award className="w-3 h-3" /> Results
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The Numbers{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                Don't Lie
              </span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm">
              Metrics tracked across 8 months of continuous optimization.
            </p>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((k, i) => (
              <KPICard key={k.label} {...k} delay={i * 0.1} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <LeadGrowthBar />
            <CPLCard />
          </div>
        </div>

        {/* ── 8. Final Quote ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500" />
          <div className="absolute inset-0">
            <svg width="100%" height="100%" opacity="0.08">
              <defs>
                <pattern
                  id="grid2"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="0.8"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid2)" />
            </svg>
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

          <div className="relative p-10 lg:p-16 text-center space-y-8">
            <Quote className="w-12 h-12 text-white/30 mx-auto" />
            <p className="text-white text-xl lg:text-3xl font-semibold max-w-3xl mx-auto leading-[1.45] tracking-tight">
              For the first time, we can actually predict where our next
              customers are coming from. Instead of hoping the phone rings, we
              have a system that consistently brings in qualified roofing leads
              month after month.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                  <Image
                    src="https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Marcus Bui"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">Marcus Holloway</p>
                  <p className="text-white/60 text-xs">
                    Founder, Holloway Roofing Co.
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/20" />

              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-full text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                Get Results Like This <ChevronRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
