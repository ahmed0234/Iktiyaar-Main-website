"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  MapPin,
  Leaf,
  TrendingUp,
  PhoneCall,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Star,
  Quote,
  Zap,
  Users,
  BarChart2,
  Clock,
  Target,
  Search,
  ChevronRight,
  Activity,
  Sparkles,
  Phone,
} from "lucide-react";
import Image from "next/image";

// ─── Design tokens (same ecosystem as RoofingCaseStudy) ───────────────────────
// blue-600 #2563eb | blue-500 #3b82f6 | blue-400 #60a5fa
// emerald accent for landscaping: #10b981 / #34d399
// slate-900 headings, slate-500 body, white cards

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useCountUp(to, duration = 2, trigger) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const c = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return c.stop;
  }, [trigger, to, duration]);
  return val;
}

function Badge({ children, variant = "blue" }) {
  const styles = {
    blue: "border-blue-200 bg-blue-50/80 text-blue-700",
    green: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    dark: "border-white/20 bg-white/10 text-white/80",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

// ─── Dot grid (reused pattern) ─────────────────────────────────────────────────
function DotGrid({ color = "#3b82f6", opacity = 0.03, size = 24 }) {
  const id = `dots-${color.replace("#", "")}-${size}`;
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

// ─── Split word reveal ─────────────────────────────────────────────────────────
function SplitReveal({ text, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
          className="mr-[0.22em]"
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.045,
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

// ─── Magnetic hover wrapper ────────────────────────────────────────────────────
function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── Pulsing live dot ──────────────────────────────────────────────────────────
function LiveDot({ color = "emerald" }) {
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

// ─── GROWTH COMMAND CENTER (right panel) ──────────────────────────────────────
function GrowthCommandCenter({ inView }) {
  // ── Lead flow ticker ──
  const leads = [
    {
      name: "Lawn Maintenance",
      area: "Westlake",
      time: "2m ago",
      type: "Google Ads",
    },
    {
      name: "Full Landscaping",
      area: "Cedar Park",
      time: "11m ago",
      type: "Local SEO",
    },
    {
      name: "Irrigation Install",
      area: "Bee Cave",
      time: "23m ago",
      type: "Google Ads",
    },
    {
      name: "Spring Cleanup",
      area: "Rollingwood",
      time: "41m ago",
      type: "SEO",
    },
    {
      name: "Hardscape Design",
      area: "Lakeway",
      time: "1h ago",
      type: "Google Ads",
    },
  ];

  // ── Channel bars ──
  const channels = [
    { label: "Google Ads", pct: 52, color: "bg-blue-500" },
    { label: "Local SEO", pct: 31, color: "bg-emerald-500" },
    { label: "Referral", pct: 12, color: "bg-amber-400" },
    { label: "Direct", pct: 5, color: "bg-slate-300" },
  ];

  // ── Calendar dots ──
  const cal = [
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 0],
  ];

  const leadsCount = useCountUp(127, 2.2, inView);
  const cplCount = useCountUp(43, 2.0, inView);
  const rateCount = useCountUp(8, 1.8, inView);

  return (
    <div className="relative w-full h-full flex flex-col gap-3">
      {/* ── Top row: KPIs ── */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          {
            label: "Monthly Leads",
            value: leadsCount,
            suffix: "+",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50 border-blue-100",
          },
          {
            label: "CPL Reduction",
            value: cplCount,
            suffix: "%",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
          },
          {
            label: "Conv. Rate",
            value: rateCount,
            suffix: ".3%",
            icon: Activity,
            color: "text-violet-600",
            bg: "bg-violet-50 border-violet-100",
          },
        ].map((k, i) => (
          <motion.div
            key={k.label + 10 + i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4 + i * 0.1,
            }}
            className={`rounded-2xl border ${k.bg} p-3 text-center backdrop-blur-sm`}
          >
            <k.icon className={`w-3.5 h-3.5 ${k.color} mx-auto mb-1`} />
            <p className={`text-xl font-black ${k.color}`}>
              {k.value}
              <span className="text-sm">{k.suffix}</span>
            </p>
            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wide leading-tight mt-0.5">
              {k.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Middle row: lead feed + booked calendar ── */}
      <div className="grid grid-cols-5 gap-2.5 flex-1 min-h-0">
        {/* Lead feed — col-span 3 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="col-span-3 rounded-2xl bg-white/90 border border-slate-100 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-50">
            <div className="flex items-center gap-1.5">
              <LiveDot />
              <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                Live Leads
              </p>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
              +127 this mo
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            {leads.map((lead, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.7 + i * 0.1,
                }}
                className="flex items-center gap-2.5 px-3.5 py-2 border-b border-slate-50/80 last:border-0 hover:bg-blue-50/30 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-slate-800 truncate">
                    {lead.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {lead.area} · {lead.time}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0
                  ${lead.type === "Google Ads" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}
                >
                  {lead.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Calendar + mini channel bars — col-span 2 */}
        <div className="col-span-2 flex flex-col gap-2.5">
          {/* Booked calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="rounded-2xl bg-white/90 border border-slate-100 backdrop-blur-sm shadow-sm p-3 flex-1"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                Booked Jobs
              </p>
              <Calendar className="w-3 h-3 text-slate-400" />
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <p
                  key={i}
                  className="text-[7px] font-bold text-slate-300 text-center"
                >
                  {d}
                </p>
              ))}
              {cal.flat().map((booked, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.85 + i * 0.02 }}
                  className={`aspect-square rounded-sm ${booked ? "bg-emerald-400" : "bg-slate-100"}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-2 h-2 rounded-sm bg-emerald-400" />
              <p className="text-[8px] text-slate-400">Confirmed estimates</p>
            </div>
          </motion.div>

          {/* Channel breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="rounded-2xl bg-white/90 border border-slate-100 backdrop-blur-sm shadow-sm p-3 flex-1"
          >
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2.5">
              Lead Sources
            </p>
            <div className="space-y-1.5">
              {channels.map((ch, i) => (
                <div key={ch.label}>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="font-medium text-slate-600">
                      {ch.label}
                    </span>
                    <span className="font-bold text-slate-700">{ch.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${ch.pct}%` } : {}}
                      transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.9 + i * 0.1,
                      }}
                      className={`h-full rounded-full ${ch.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: funnel visualization ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        className="rounded-2xl bg-white/90 border border-slate-100 backdrop-blur-sm shadow-sm p-3.5"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">
            Lead-to-Booked Funnel
          </p>
          <span className="text-[8px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full">
            This Month
          </span>
        </div>
        <div className="flex items-end gap-1.5">
          {[
            { label: "Clicks", value: 1840, h: "h-10", color: "bg-slate-200" },
            { label: "Visitors", value: 892, h: "h-8", color: "bg-blue-200" },
            { label: "Leads", value: 127, h: "h-6", color: "bg-blue-400" },
            { label: "Estimates", value: 84, h: "h-5", color: "bg-blue-500" },
            { label: "Booked", value: 61, h: "h-4", color: "bg-emerald-500" },
          ].map((step, i) => (
            <div
              key={step.label}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-[11px] font-bold text-slate-600">
                {step.value.toLocaleString()}
              </span>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.0 + i * 0.08,
                }}
                style={{ transformOrigin: "bottom" }}
                className={`w-full ${step.h} ${step.color} rounded-t-md`}
              />
              <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">
                {step.label}
              </span>
            </div>
          ))}

          {/* arrow */}
          <div className="flex-shrink-0 pb-4">
            <ArrowRight className="w-3 h-3 text-emerald-500" />
          </div>

          {/* revenue output */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex-shrink-0 font-semibold rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 p-2 text-center shadow-sm shadow-emerald-500/20"
          >
            <p className="text-[8px] font-bold text-white/70">Revenue</p>
            <p className="text-xs font-black text-white">+$214k</p>
            <p className="text-[7px] text-white/60">/ mo avg</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── MAIN HERO ─────────────────────────────────────────────────────────────────
export default function LandscapingCaseStudyHero() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-40px" });
  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroOpY = useTransform(scrollYProgress, [0, 0.6], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-slate-50 overflow-hidden flex items-center"
    >
      {/* ── Ambient background layer ── */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
        <div className="absolute top-1/3 -right-80 w-[700px] h-[700px] rounded-full bg-emerald-500/[0.04] blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/[0.03] blur-[120px]" />
        <DotGrid color="#3b82f6" opacity={0.025} size={28} />
      </motion.div>

      {/* ── Thin top accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent origin-left"
        />
      </div>

      <motion.div
        style={{ y: heroOpY }}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
      >
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-start">
          {/* ══════════════════════════════════════════
              LEFT — Story side
          ══════════════════════════════════════════ */}
          <div ref={leftRef} className="space-y-2">
            {/* Case study badge + company logo row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Badge variant="green">
                <Sparkles className="w-4 h-4" /> Case Study
              </Badge>

              {/* Company logo pill */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-100 rounded-full px-3 py-1.5 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center">
                  <Leaf className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  GreenScape Pro
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <MapPin className="w-3 h-3" />
                <span>Austin, TX</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-slate-400">Landscaping</span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black text-slate-900  tracking-tight">
                <SplitReveal text="From Waiting For Leads to" delay={0.05} />{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">
                  <SplitReveal text="Generating" delay={0.2} />
                </span>
                <br />
                <SplitReveal text="Them on Demand" delay={0.35} />
              </h1>
            </div>

            {/* Transformation summary */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-slate-600 text-base leading-[1.65] max-w-lg font-medium"
            >
              GreenScape Pro relied on referrals and seasonal luck for over a
              decade. We rebuilt their entire lead generation system from Google
              Ads to landing pages to call tracking and turned unpredictable
              growth into a repeatable monthly machine.
            </motion.p>

            {/* Key metrics strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap gap-3"
            >
              {[
                {
                  label: "Leads / mo",
                  value: "127+",
                  sub: "was 18",
                  color: "border-blue-100 bg-blue-50/60",
                  text: "text-blue-700",
                  sub_c: "text-blue-400",
                },
                {
                  label: "Cost per lead",
                  value: "−43%",
                  sub: "vs before",
                  color: "border-emerald-100 bg-emerald-50/60",
                  text: "text-emerald-700",
                  sub_c: "text-emerald-400",
                },
                {
                  label: "Conv. rate",
                  value: "8.3%",
                  sub: "was 1.9%",
                  color: "border-violet-100 bg-violet-50/60",
                  text: "text-violet-700",
                  sub_c: "text-violet-400",
                },
                {
                  label: "Booked jobs",
                  value: "61/mo",
                  sub: "avg Q3",
                  color: "border-amber-100 bg-amber-50/60",
                  text: "text-amber-700",
                  sub_c: "text-amber-400",
                },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={leftInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.8 + i * 0.07,
                  }}
                  className={`flex flex-col rounded-2xl border ${m.color} px-4 py-2.5 backdrop-blur-sm`}
                >
                  <span className={`text-xl font-black ${m.text} leading-none`}>
                    {m.value}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 mt-0.5">
                    {m.label}
                  </span>
                  <span className={`text-[9px] ${m.sub_c} font-medium`}>
                    {m.sub}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Owner testimonial block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 1.0,
              }}
              className="relative rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden"
            >
              {/* top emerald accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400" />

              <div className="p-5 space-y-4">
                {/* large opening quote mark */}
                <Quote className="w-8 h-8 text-slate-100 -mb-1" />

                <p className="text-slate-700 text-base leading-[1.7] font-medium">
                  "For years, we relied almost entirely on referrals. Some
                  months were great, while others were painfully slow. We knew
                  we needed a system that could generate consistent landscaping
                  leads{" "}
                  <span className="font-bold text-slate-900">
                    without relying on luck
                  </span>{" "}
                  but every agency we tried made promises they couldn't keep."
                </p>

                {/* owner identity */}
                <div className="flex items-center gap-3 pt-1">
                  {/* avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                      {/* <svg
                        viewBox="0 0 40 40"
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="40" height="40" fill="#d1fae5" />
                        <circle cx="20" cy="16" r="9" fill="#6ee7b7" />
                        <ellipse
                          cx="20"
                          cy="38"
                          rx="13"
                          ry="10"
                          fill="#6ee7b7"
                        />
                        <circle cx="20" cy="16" r="7" fill="#a7f3d0" />
                        <circle
                          cx="17"
                          cy="15"
                          r="1.5"
                          fill="#065f46"
                          opacity="0.7"
                        />
                        <circle
                          cx="23"
                          cy="15"
                          r="1.5"
                          fill="#065f46"
                          opacity="0.7"
                        />
                        <path
                          d="M17 20 Q20 23 23 20"
                          stroke="#065f46"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          opacity="0.7"
                        />
                      </svg> */}
                      <Image
                        src="https://images.unsplash.com/photo-1720805752653-10ddccea4c94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="James Harmon, founder of GreenScape Pro, reviewing landscaping plans on-site in Austin"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="rounded-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIRAAAQQCAgMAAAAAAAAAAAAAAQIDBBEABRIhMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amk1W9Y7MhSiIUE8RlMlJOMZGM9xVl0pbdO2WPFjxWY6GUBCUoTgAClKUH//Z"
                        priority
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      Daniel Reyes
                    </p>
                    <p className="text-xs text-slate-500">
                      Founder & Owner · GreenScape Pro
                    </p>
                  </div>

                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-amber-400 fill-amber-400"
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
              transition={{ duration: 0.6, delay: 1.15 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <Magnetic>
                <motion.a
                  href="#case-study"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow group"
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative">Read The Full Story</span>
                  <ChevronRight className="w-4 h-4 relative group-hover:translate-x-0.5 transition-transform" />
                </motion.a>
              </Magnetic>

              <a
                href="#results"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                <BarChart2 className="w-4 h-4" /> See all results
              </a>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════
              RIGHT — Growth Command Center
          ══════════════════════════════════════════ */}
          <div ref={rightRef} className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/8 to-emerald-500/6 blur-2xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={rightInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25,
              }}
              className="relative rounded-3xl border border-slate-200/80 bg-slate-50/90 backdrop-blur-xl shadow-2xl shadow-slate-900/8 p-4 overflow-hidden"
            >
              {/* inner dot texture */}
              <DotGrid color="#10b981" opacity={0.03} size={20} />

              {/* panel header */}
              <div className="relative flex items-center justify-between mb-3.5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center shadow-sm">
                    <Leaf className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800">
                      GreenScape Growth Center
                    </p>
                    <p className="text-[9px] text-slate-400">
                      Real-time performance · Austin, TX
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <LiveDot color="emerald" />
                  <span className="text-[9px] font-semibold text-emerald-600">
                    Live
                  </span>
                </div>
              </div>

              {/* command center content */}
              <div className="relative" style={{ minHeight: "460px" }}>
                <GrowthCommandCenter inView={rightInView} />
              </div>

              {/* floating "before" ghost card — top right corner */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={rightInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="absolute -top-0 -right-0 bg-white/90 backdrop-blur border border-red-100 rounded-2xl px-3 py-2 shadow-lg"
              >
                <p className="text-[8px] font-bold text-red-500 uppercase tracking-widest mb-0.5">
                  Before
                </p>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-red-400" />
                  <p className="text-xs font-black text-slate-800">
                    18 leads / mo
                  </p>
                </div>
                <p className="text-[8px] text-slate-400 mt-0.5">
                  $142 cost per lead
                </p>
              </motion.div>

              {/* floating "after" callout — bottom left */}
              {/* <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={rightInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="absolute -bottom-3 -left-3 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl px-3 py-2 shadow-lg shadow-emerald-500/25"
              >
                <p className="text-[8px] font-bold text-white/70 uppercase tracking-widest mb-0.5">
                  After System
                </p>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-white" />
                  <p className="text-xs font-black text-white">
                    127+ leads / mo
                  </p>
                </div>
                <p className="text-[8px] text-white/70 mt-0.5">
                  $81 cost per lead
                </p>
              </motion.div> */}
            </motion.div>

            {/* Services used — floating pills below panel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-2 mt-5 justify-center"
            >
              {[
                { icon: Target, label: "Google Ads" },
                { icon: Search, label: "Local SEO" },
                { icon: Zap, label: "Landing Pages" },
                { icon: PhoneCall, label: "Call Tracking" },
                { icon: Activity, label: "CRO" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={rightInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.5 + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-1.5 bg-white/80 backdrop-blur border border-slate-100 rounded-full px-3 py-1.5 shadow-sm hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-default"
                >
                  <s.icon className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-semibold text-slate-600">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest">
          Scroll to read the story
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
