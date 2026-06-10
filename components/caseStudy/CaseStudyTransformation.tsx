"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  AlertTriangle, TrendingDown, XCircle, Search, Target,
  Layout, PhoneCall, Filter, RefreshCw, CheckCircle2,
  ArrowRight, ArrowUpRight, TrendingUp, DollarSign,
  BarChart3, Calendar, Zap, Settings, Rocket,
  ClipboardCheck, Activity, ShieldCheck, ChevronRight,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Count-up Hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setValue(Number(((1 - Math.pow(1 - p, 3)) * target).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, decimals]);
  return value;
}

// ─── Split Text Reveal ────────────────────────────────────────────────────────
function SplitText({ text, delay = 0, accent = false, className = "" }: {
  text: string; delay?: number; accent?: boolean; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: "120%", rotateX: -80 }}
            animate={inView ? { y: "0%", rotateX: 0 } : { y: "120%", rotateX: -80 }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: EASE }}
            className={`inline-block will-change-transform ${accent ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400" : ""}`}
            style={{ transformOrigin: "bottom center" }}
          >{word}</motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ badge, badgeIcon: BadgeIcon, title, accent, sub, badgeColor = "blue" }: {
  badge: string; badgeIcon: React.ElementType; title: string; accent: string; sub: string; badgeColor?: "blue" | "red" | "emerald";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const colors = {
    blue:    "bg-blue-50 text-blue-600 border-blue-200/50",
    red:     "bg-red-50 text-red-500 border-red-200/50",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200/50",
  };
  return (
    <div ref={ref} className="mb-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }} className="flex items-center gap-3 mb-3">
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase border ${colors[badgeColor]}`}>
          <BadgeIcon className="w-3 h-3" strokeWidth={2.5} />{badge}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
      </motion.div>
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] font-poppins mb-3">
        <SplitText text={title} delay={0.1} />
        {accent && <><br className="hidden sm:block" /><SplitText text={accent} delay={0.4} accent /></>}
      </h2>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
        className="text-base text-slate-500 font-medium leading-relaxed max-w-lg">{sub}</motion.p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PHASE 1 — BEFORE vs AFTER  (left/right split)
// ══════════════════════════════════════════════════════════════
const beforeItems = [
  { label: "CPL Rising +40%",        detail: "Cost per lead up $42 in 3 months" },
  { label: "80% Junk Leads",         detail: "Unqualified or spam inquiries" },
  { label: "Zero Tracking",          detail: "No visibility into what converts" },
  { label: "Wasted $3.2K/mo",        detail: "Budget on non-converting keywords" },
  { label: "Unstable Revenue ±$15K", detail: "Wild monthly swings, zero predictability" },
];
const afterItems = [
  { label: "+312 Qualified Leads",   metric: "+550%",   color: "text-emerald-600" },
  { label: "Cost Per Lead $18",      metric: "-73%",    color: "text-blue-600" },
  { label: "4.2× ROAS",             metric: "+425%",   color: "text-violet-600" },
  { label: "180 Appointments",       metric: "+533%",   color: "text-emerald-600" },
  { label: "$22K Monthly Revenue",   metric: "+175%",   color: "text-blue-600" },
];

function BeforeAfterPhase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* ─── BEFORE ─── */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative overflow-hidden rounded-2xl border border-rose-200/60 bg-rose-50/40 backdrop-blur-sm p-7">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
            <TrendingDown className="w-4.5 h-4.5 text-rose-500" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-rose-600 uppercase tracking-wider">Before</p>
            <p className="text-[12px] text-slate-400 font-medium">The pain they lived with</p>
          </div>
          <div className="ml-auto px-2.5 py-1 rounded-full bg-rose-100 border border-rose-200/60">
            <span className="text-[11px] font-bold text-rose-500">6 months of bleeding</span>
          </div>
        </div>
        {/* Items */}
        <div className="space-y-3">
          {beforeItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE }}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-rose-100/60">
              <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{item.label}</p>
                <p className="text-[12px] text-slate-400 font-medium">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Declining mini-chart */}
        <div className="mt-5 pt-4 border-t border-rose-100">
          <div className="flex items-end gap-1.5 h-10">
            {[65, 58, 50, 54, 44, 40, 36, 42, 30, 26, 30, 22].map((h, i) => (
              <motion.div key={i} initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.04, ease: EASE }}
                className="flex-1 rounded-t-sm origin-bottom"
                style={{ height: `${h}%`, background: "linear-gradient(to top, #fca5a5, #fecaca)" }}
              />
            ))}
          </div>
          <p className="text-[10px] text-rose-400 font-medium mt-1 text-center tracking-wide">Revenue declining month over month</p>
        </div>
      </motion.div>

      {/* ─── AFTER ─── */}
      <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="relative overflow-hidden rounded-2xl border border-blue-200/60 bg-blue-50/30 backdrop-blur-sm p-7">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <TrendingUp className="w-4.5 h-4.5 text-blue-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">After Ikhtiyaar</p>
            <p className="text-[12px] text-slate-400 font-medium">60 days of execution</p>
          </div>
          <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-600">Verified Results</span>
          </div>
        </div>
        {/* Items */}
        <div className="space-y-3 relative z-10">
          {afterItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: EASE }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-blue-100/60 shadow-sm">
              <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <p className="text-sm font-bold text-slate-800 flex-1">{item.label}</p>
              <span className={`text-[12px] font-extrabold ${item.color} bg-white px-2 py-0.5 rounded-lg border border-slate-100`}>
                {item.metric}
              </span>
            </motion.div>
          ))}
        </div>
        {/* Rising mini-chart */}
        <div className="mt-5 pt-4 border-t border-blue-100 relative z-10">
          <div className="flex items-end gap-1.5 h-10">
            {[22, 28, 35, 32, 45, 52, 50, 62, 70, 78, 85, 95].map((h, i) => (
              <motion.div key={i} initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.04, ease: EASE }}
                className="flex-1 rounded-t-sm origin-bottom"
                style={{
                  height: `${h}%`,
                  background: i >= 9
                    ? "linear-gradient(to top, #3b82f6, #60a5fa)"
                    : "linear-gradient(to top, #e2e8f0, #cbd5e1)",
                }}
              />
            ))}
          </div>
          <p className="text-[10px] text-blue-500 font-medium mt-1 text-center tracking-wide">Revenue growing every month</p>
        </div>
      </motion.div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PHASE 2 — DISCOVERY + STRATEGY  (left/right split)
// ══════════════════════════════════════════════════════════════
const discoveries = [
  { icon: Layout,    title: "Landing Page Leakage",     detail: "67% of paid traffic bounced before seeing the form" },
  { icon: BarChart3, title: "No Conversion Tracking",   detail: "Google Ads had zero conversion events — optimizing blind" },
  { icon: PhoneCall, title: "Calls Completely Untracked", detail: "Phone calls (the #1 lead source) weren't attributed" },
  { icon: Target,    title: "Wrong Keyword Intent",      detail: "Budget on broad terms, not purchase-ready searches" },
];
const strategies = [
  { icon: Target,    label: "Google Ads Restructure",   sub: "Intent-based campaign architecture" },
  { icon: Layout,    label: "CRO Landing Page Overhaul", sub: "Above-fold form + mobile-first UX" },
  { icon: PhoneCall, label: "Call Tracking Setup",       sub: "End-to-end attribution from click to close" },
  { icon: Filter,    label: "Negative Keyword Pruning",  sub: "Eliminate waste, raise lead quality" },
  { icon: RefreshCw, label: "Retargeting System",        sub: "Multi-touch re-engagement flows" },
];

function DiscoveryStrategyPhase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* ─── DISCOVERY ─── */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="rounded-2xl border border-amber-200/60 bg-amber-50/30 p-7">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
            <Search className="w-4 h-4 text-amber-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-700">What We Discovered</p>
            <p className="text-[12px] text-slate-400 font-medium">The real problems, hidden in the data</p>
          </div>
        </div>
        <div className="space-y-3">
          {discoveries.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, ease: EASE }}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-amber-100/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-amber-600" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">{d.title}</p>
                  <p className="text-[12px] text-slate-400 font-medium leading-snug mt-0.5">{d.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Aha moment callout */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, ease: EASE }}
          className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100/60">
          <p className="text-[13px] font-bold text-blue-700 leading-relaxed">
            💡 The campaigns weren&apos;t broken. <span className="text-slate-700 font-extrabold">The conversion system was.</span>
          </p>
        </motion.div>
      </motion.div>

      {/* ─── STRATEGY ─── */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="rounded-2xl border border-blue-200/60 bg-white p-7 shadow-lg shadow-slate-200/20">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <Settings className="w-4 h-4 text-blue-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-600">What We Built</p>
            <p className="text-[12px] text-slate-400 font-medium">5 precision-targeted pillars</p>
          </div>
        </div>
        <div className="space-y-3">
          {strategies.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, ease: EASE }}
                className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200/60 hover:bg-blue-50/30 hover:shadow-sm transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100/60 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                  <Icon className="w-4 h-4 text-blue-600" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-slate-800">{s.label}</p>
                  <p className="text-[12px] text-slate-400 font-medium">{s.sub}</p>
                </div>
                <motion.div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CheckCircle2 className="w-3 h-3 text-blue-500" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-2">
            <span>Implementation Progress</span><span className="text-blue-600">Completed</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <motion.div initial={{ width: "0%" }} animate={inView ? { width: "100%" } : {}}
              transition={{ duration: 2, delay: 1.0, ease: EASE }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PHASE 3 — TIMELINE + KEY METRICS  (left/right split)
// ══════════════════════════════════════════════════════════════
const timelineItems = [
  { week: "Wk 1", label: "Audit & Tracking", icon: ClipboardCheck, color: "bg-blue-100 text-blue-600", line: "from-blue-200" },
  { week: "Wk 2", label: "Campaign Rebuild",  icon: Settings,       color: "bg-violet-100 text-violet-600", line: "from-violet-200" },
  { week: "Wk 3", label: "CRO Launch",        icon: Rocket,         color: "bg-emerald-100 text-emerald-600", line: "from-emerald-200" },
  { week: "Wk 4-6", label: "Scale & Optimize", icon: TrendingUp,   color: "bg-amber-100 text-amber-600", line: "" },
];
const kpis = [
  { value: 312, prefix: "+", suffix: "",  label: "Qualified Leads",     color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100", decimals: 0 },
  { value: 73,  prefix: "-", suffix: "%", label: "Cost Per Lead",        color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", decimals: 0 },
  { value: 4.2, prefix: "",  suffix: "×", label: "ROAS Achieved",        color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100", decimals: 1 },
  { value: 175, prefix: "+", suffix: "%", label: "Revenue Growth",       color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100", decimals: 0 },
];

function KPIBadge({ kpi, shouldStart }: { kpi: typeof kpis[0]; shouldStart: boolean }) {
  const count = useCountUp(kpi.value, 2000, shouldStart, kpi.decimals);
  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${kpi.border} ${kpi.bg} text-center`}>
      <p className={`text-3xl font-[900] tracking-tight leading-none ${kpi.color}`}>
        {kpi.prefix}{count}{kpi.suffix}
      </p>
      <p className="text-[11px] text-slate-500 font-semibold mt-1.5 uppercase tracking-wider">{kpi.label}</p>
    </div>
  );
}

function TimelineMetricsPhase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* ─── TIMELINE ─── */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-200/20">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Execution Timeline</p>
            <p className="text-[12px] text-slate-400 font-medium">From broken to booked in 6 weeks</p>
          </div>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.4, ease: EASE }}
            className="absolute left-[17px] top-5 bottom-5 w-[2px] bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 origin-top rounded-full" />
          <div className="space-y-5">
            {timelineItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, ease: EASE }}
                  className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0 shadow-sm z-10`}>
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-bold text-slate-800">{item.label}</p>
                      <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-full">{item.week}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Line animation: done checkmark */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.4, ease: EASE }}
          className="mt-5 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-[13px] font-bold text-emerald-700">All 4 phases completed on schedule</p>
        </motion.div>
      </motion.div>

      {/* ─── KPIs ─── */}
      <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50/40 to-white p-7">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-emerald-600" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Final Results</p>
            <p className="text-[12px] text-slate-400 font-medium">Hard numbers, no fluff</p>
          </div>
          <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold text-blue-600">GA4 Verified</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.12, ease: EASE }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="transition-transform duration-200">
              <KPIBadge kpi={kpi} shouldStart={inView} />
            </motion.div>
          ))}
        </div>
        {/* Revenue chart mini */}
        <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-bold text-slate-700">Revenue Growth Trend</p>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />+175%
            </span>
          </div>
          <div className="flex items-end gap-1.5 h-14">
            {[22, 28, 35, 45, 52, 60, 70, 78, 85, 90, 95, 100].map((h, i) => (
              <motion.div key={i} initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.05, ease: EASE }}
                className="flex-1 rounded-t-sm origin-bottom"
                style={{
                  height: `${h}%`,
                  background: i >= 9
                    ? "linear-gradient(to top, #3b82f6, #60a5fa)"
                    : "linear-gradient(to top, #e2e8f0, #cbd5e1)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  CTA BANNER
// ══════════════════════════════════════════════════════════════
function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative overflow-hidden rounded-2xl mt-10">
      {/* Gradient */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 40%, #38bdf8 100%)" }} />
      {/* Shimmer */}
      <motion.div animate={{ x: ["-100%", "200%"] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear", repeatDelay: 2 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-15deg] pointer-events-none" />
      {/* Floating shapes */}
      <motion.div animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-6 -top-6 w-28 h-28 rounded-2xl border border-white/15 bg-white/5 pointer-events-none" />
      <motion.div animate={{ y: [6, -10, 6], rotate: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-24 -bottom-4 w-16 h-16 rounded-xl border border-white/10 bg-white/5 pointer-events-none" />
      {/* Content */}
      {/* <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <motion.h3 initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-2xl sm:text-3xl font-[900] text-white tracking-tight leading-tight font-poppins">
            Want Results Like This?
          </motion.h3>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="text-sm text-blue-100/80 font-medium mt-2 max-w-md leading-relaxed">
            Book a free Growth Audit see exactly where you&apos;re losing money and what it takes to fix it.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3">
            {["No obligation", "100% confidential", "Actionable insights"].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-semibold text-white/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />{item}
              </span>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 }} className="shrink-0">
          <Link href="/contact">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-3 px-8 py-4 bg-white/15 backdrop-blur-xl rounded-xl font-bold text-base text-white border border-white/40 overflow-hidden hover:bg-white/25 hover:border-white/60 transition-all duration-400">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "linear", repeatDelay: 1 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-30deg]" />
              </div>
              <span className="relative z-10">Get A Free Growth Audit</span>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10">
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </div> */}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════════════════
export default function CaseStudyTransformation() {
  return (
    <section className="relative py-1 lg:py-1 overflow-hidden bg-gradient-to-b from-slate-50/40 via-white to-white">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/20 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/30 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-20">

        {/* ── Phase 1: Before vs After ── */}
        <div>
          <SectionHeader
            badge="The Transformation"
            badgeIcon={Zap}
            title="Before vs."
            accent="After Ikhtiyaar."
            sub="Side-by-side proof of what changed when we rebuilt the entire system in 60 days."
          />
          <BeforeAfterPhase />
        </div>

        {/* ── Phase 2: Discovery + Strategy ── */}
        <div>
          <SectionHeader
            badge="Discovery & Strategy"
            badgeIcon={Search}
            title="We Found the Real Problem."
            accent="Then Fixed It."
            sub="The campaigns weren't broken. The conversion infrastructure was. Here's what we found and what we built."
            badgeColor="blue"
          />
          <DiscoveryStrategyPhase />
        </div>

        {/* ── Phase 3: Timeline + Metrics ── */}
        <div>
          <SectionHeader
            badge="Results"
            badgeIcon={Activity}
            title="6 Weeks. Structured."
            accent="Proven."
            sub="A phased execution roadmap with verified results every metric backed by Google Ads and GA4 data."
            badgeColor="emerald"
          />
          <TimelineMetricsPhase />
        </div>

        {/* ── CTA ── */}
        <CTABanner />
      </div>
    </section>
  );
}
