"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "motion/react";
import { CheckCircle2, ArrowRight, Leaf, Star, Quote } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// DESIGN TOKENS — exact match to site ecosystem
// slate-50 bg · white/80 cards · blue-600/500/400 · emerald-500
// slate-900 headings · slate-500 body · ease [0.16,1,0.3,1]
// font-poppins headings · font-sans body
// ─────────────────────────────────────────────────────────────────

function useReveal(margin = "-60px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

function useCountUp(to: number, duration = 2.2, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const ctrl = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v * 10) / 10),
    });
    return ctrl.stop;
  }, [trigger, to, duration]);
  return val;
}

// ─── Ambient dot-grid texture ─────────────────────────────────────
function DotGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.022 }}>
      <defs>
        <pattern id="results-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#3b82f6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#results-dots)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
//  THE ANIMATED SVG GROWTH PATH
// ─────────────────────────────────────────────────────────────────

const MILESTONES = [
  {
    pct: 0,
    month: "Start",
    label: "System Installed",
    sub: "Campaigns live. Pages deployed.",
    metric: null,
    color: "slate",
  },
  {
    pct: 0.17,
    month: "Month 1",
    label: "Visibility",
    sub: "First qualified leads arrive through Google.",
    metric: { value: 23, suffix: "", label: "leads / month" },
    color: "blue",
  },
  {
    pct: 0.34,
    month: "Month 2",
    label: "Traction",
    sub: "Conversion rates climb as data refines the system.",
    metric: { value: 41, suffix: "", label: "leads / month" },
    color: "blue",
  },
  {
    pct: 0.5,
    month: "Month 3",
    label: "Momentum",
    sub: "SEO ranking gains compound on top of paid results.",
    metric: { value: 68, suffix: "", label: "leads / month" },
    color: "blue",
  },
  {
    pct: 0.67,
    month: "Month 4",
    label: "Pipeline",
    sub: "Booking flow optimised. Revenue becomes predictable.",
    metric: { value: 8.3, suffix: "%", label: "conversion rate" },
    color: "emerald",
  },
  {
    pct: 0.83,
    month: "Month 5",
    label: "Acceleration",
    sub: "Each week outperforms the last. System self-improves.",
    metric: { value: 43, suffix: "%", label: "lower cost-per-lead" },
    color: "emerald",
  },
  {
    pct: 1,
    month: "Month 6",
    label: "System",
    sub: "Consistent, predictable, scalable lead generation.",
    metric: { value: 127, suffix: "+", label: "leads every month" },
    color: "emerald",
  },
];

// SVG viewport constants
const SVG_W = 760;
const SVG_H = 260;
const PAD_X = 40;
const PAD_Y = 40;
const DRAW_W = SVG_W - PAD_X * 2;
const DRAW_H = SVG_H - PAD_Y * 2;

// Y values per milestone — starts shaky, settles into a confident upward curve
const Y_ANCHORS = [0.88, 0.78, 0.65, 0.52, 0.36, 0.22, 0.08];

function getPoint(i: number): [number, number] {
  const x = PAD_X + MILESTONES[i].pct * DRAW_W;
  const y = PAD_Y + Y_ANCHORS[i] * DRAW_H;
  return [x, y];
}

// Build a smooth cubic bezier path through all milestone points
function buildPath(): string {
  const pts = MILESTONES.map((_, i) => getPoint(i));
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx = (prev[0] + curr[0]) / 2;
    d += ` C ${cpx} ${prev[1]}, ${cpx} ${curr[1]}, ${curr[0]} ${curr[1]}`;
  }
  return d;
}

const PATH_D = buildPath();

// Shaky ghost path for the "before" line — horizontal & noisy
const GHOST_D = `M ${PAD_X} ${PAD_Y + DRAW_H * 0.88} C ${PAD_X + 60} ${PAD_Y + DRAW_H * 0.92}, ${PAD_X + 120} ${PAD_Y + DRAW_H * 0.82}, ${PAD_X + 180} ${PAD_Y + DRAW_H * 0.87} C ${PAD_X + 240} ${PAD_Y + DRAW_H * 0.91}, ${PAD_X + 300} ${PAD_Y + DRAW_H * 0.84}, ${PAD_X + DRAW_W} ${PAD_Y + DRAW_H * 0.88}`;

const COLOR_MAP: Record<string, { dot: string; text: string; pill: string; pillText: string }> = {
  slate:   { dot: "bg-slate-300",   text: "text-slate-500",   pill: "bg-slate-100 border-slate-200",   pillText: "text-slate-600"   },
  blue:    { dot: "bg-blue-500",    text: "text-blue-600",    pill: "bg-blue-50 border-blue-200",       pillText: "text-blue-700"    },
  emerald: { dot: "bg-emerald-500", text: "text-emerald-600", pill: "bg-emerald-50 border-emerald-200", pillText: "text-emerald-700" },
};

// Individual milestone count-up number
function MilestoneMetric({ metric, trigger }: { metric: NonNullable<typeof MILESTONES[0]["metric"]>; trigger: boolean }) {
  const val = useCountUp(metric.value, 1.6, trigger);
  const display = Number.isInteger(metric.value) ? val : val.toFixed(1);
  return (
    <span>
      {display}
      {metric.suffix}
    </span>
  );
}

function GrowthPath() {
  const [ref, inView] = useReveal("-40px");
  const [activeMilestone, setActiveMilestone] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    MILESTONES.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveMilestone(i), 600 + i * 340));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="relative w-full">
      {/* SVG canvas */}
      <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm p-4">
        <DotGrid />
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          style={{ height: "auto" }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines (faint horizontal) */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={PAD_X}
              y1={PAD_Y + t * DRAW_H}
              x2={PAD_X + DRAW_W}
              y2={PAD_Y + t * DRAW_H}
              stroke="#e2e8f0"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
          ))}

          {/* Ghost "before" line */}
          <motion.path
            d={GHOST_D}
            fill="none"
            stroke="#fca5a5"
            strokeWidth="2"
            strokeDasharray="5 5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 1.0, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Ghost label */}
          <motion.text
            x={PAD_X + DRAW_W * 0.62}
            y={PAD_Y + DRAW_H * 0.98}
            fontSize="9"
            fill="#fca5a5"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
          >
            Before — flat &amp; unpredictable
          </motion.text>

          {/* Growth path glow / shadow */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "blur(6px)" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          />

          {/* Growth path main line */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          />

          {/* Gradient def */}
          <defs>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="60%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Milestone dots on the path */}
          {MILESTONES.map((ms, i) => {
            const [x, y] = getPoint(i);
            const isActive = activeMilestone >= i;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={isActive ? 5.5 : 4}
                fill={isActive ? (ms.color === "emerald" ? "#059669" : ms.color === "blue" ? "#2563eb" : "#94a3b8") : "#e2e8f0"}
                stroke="white"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.34, type: "spring", stiffness: 220 }}
              />
            );
          })}

          {/* Month labels below X-axis */}
          {MILESTONES.map((ms, i) => {
            const [x] = getPoint(i);
            return (
              <motion.text
                key={i}
                x={x}
                y={SVG_H - 6}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fill={activeMilestone >= i ? "#64748b" : "#cbd5e1"}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.34 }}
              >
                {ms.month}
              </motion.text>
            );
          })}
        </svg>
      </div>

      {/* Milestone detail cards — scroll-stagger below the path */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {MILESTONES.filter((ms) => ms.metric).map((ms, i) => {
          const c = COLOR_MAP[ms.color];
          const isTriggered = activeMilestone >= i + 1;
          return (
            <motion.div
              key={ms.month}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 1.2 + i * 0.12 }}
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm space-y-1.5"
            >
              <span className={`text-[9px] font-bold uppercase tracking-widest ${c.text}`}>
                {ms.month} · {ms.label}
              </span>
              <p className={`text-2xl font-black font-poppins ${c.text} tracking-tight`}>
                {ms.metric && <MilestoneMetric metric={ms.metric} trigger={isTriggered} />}
              </p>
              <p className="text-[10px] text-slate-400 font-semibold leading-tight">{ms.metric?.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  OWNER NARRATIVE — left editorial panel
// ─────────────────────────────────────────────────────────────────
function OwnerNarrative() {
  const [ref, inView] = useReveal("-40px");

  return (
    <div ref={ref} className="flex flex-col justify-between gap-10 h-full">
      {/* Chapter tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200" />
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-blue-400">
          Six Months Later
        </span>
        <div className="h-px w-8 bg-blue-200" />
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="space-y-3"
      >
        <h2 className="font-poppins text-4xl sm:text-5xl lg:text-[3.2rem] font-black text-slate-900 leading-[1.06] tracking-tight">
          The Business Feels{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
            Completely
          </span>
          <br />
          Different Today.
        </h2>
        <p className="text-base text-slate-500 font-medium leading-relaxed max-w-md">
          Not just more leads. A completely different relationship with growth — one where the outcome is known, not hoped for.
        </p>
      </motion.div>

      {/* Large pullquote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        className="relative"
      >
        <Quote className="w-10 h-10 text-blue-100 mb-3" />
        <p className="font-poppins text-xl sm:text-2xl font-semibold text-slate-800 leading-[1.45] italic">
          For years we relied on referrals and hoped the phone would ring.{" "}
          <span className="not-italic font-black text-slate-900">
            Now we know exactly where our leads come from, what&apos;s working, and how to consistently generate new landscaping projects every single month.
          </span>
        </p>
      </motion.blockquote>

      {/* Owner attribution */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex items-center gap-4"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm font-black text-slate-900 font-poppins">Daniel Reyes</p>
          <p className="text-xs text-slate-500 font-medium">Founder & Owner · GreenScape Pro</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Three supporting micro-quotes */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-4"
      >
        {[
          { em: "\"The biggest change wasn't the leads.\"", body: "It was the confidence. We stopped wondering. We started knowing." },
          { em: "\"We finally had a system.\"", body: "Month after month, the momentum kept building exactly as predicted." },
          { em: "\"Growth stopped feeling like luck.\"", body: "We could see every opportunity in the pipeline before it arrived." },
        ].map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.75 + i * 0.12 }}
            className="flex items-start gap-3"
          >
            <div className="w-1 h-full min-h-[2.5rem] rounded-full bg-gradient-to-b from-blue-400 to-blue-200 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm font-black text-slate-800 font-poppins italic">{q.em}</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{q.body}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  FINAL STATEMENT — full-width editorial closer
// ─────────────────────────────────────────────────────────────────
function FinalStatement() {
  const [ref, inView] = useReveal("-60px");

  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 via-white to-emerald-50/30 backdrop-blur-sm shadow-sm p-10 sm:p-14 text-center">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-blue-500/[0.06] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-emerald-500/[0.06] blur-[80px] pointer-events-none" />
      <DotGrid />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-6"
      >
        The Bottom Line
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="space-y-4 mb-10"
      >
        <p className="font-poppins text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight">
          The projects changed.
          <br />
          The revenue changed.
        </p>
        <p className="font-poppins text-3xl sm:text-3xl lg:text-4xl font-black leading-[1.1] tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500">
            But the biggest transformation
          </span>
          <br />
          <span className="text-slate-900">was replacing uncertainty with a system.</span>
        </p>
      </motion.div>

      {/* Outcome pillars */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {[
          { before: "Referrals", after: "Repeatable Demand" },
          { before: "Luck", after: "Predictability" },
          { before: "Guesswork", after: "Visibility" },
          { before: "Expense", after: "An Asset" },
        ].map((pill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.09 }}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm"
          >
            <span className="text-xs font-semibold text-slate-400 line-through">{pill.before}</span>
            <ArrowRight className="w-3 h-3 text-blue-400" />
            <span className="text-xs font-black text-blue-700">{pill.after}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow group"
        >
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative">Build a System Like This</span>
          <ArrowRight className="w-4 h-4 relative group-hover:translate-x-0.5 transition-transform" />
        </motion.a>
        <a
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          See more case studies
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ROOT EXPORT
// ─────────────────────────────────────────────────────────────────
export default function CaseStudyResults() {
  return (
    <div className="relative bg-slate-50 overflow-hidden" id="results">
      {/* Ambient layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-0 -left-48 w-[500px] h-[500px] rounded-full bg-emerald-400/[0.04] blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-16 space-y-20">

        {/* ── Section eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50/70 text-blue-700 text-xs font-semibold uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3" /> The Results
          </span>
        </motion.div>

        {/* ── SPLIT: Owner narrative (left) + Growth path (right) ── */}
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-14 lg:gap-20 items-start">
          <OwnerNarrative />
          <div className="flex flex-col gap-6">
            {/* Right-side label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 mb-1">
                Six-month growth trajectory
              </p>
              <p className="text-sm text-slate-500 font-medium">
                Each milestone marks a real business outcome — not a vanity metric.
              </p>
            </motion.div>
            <GrowthPath />
          </div>
        </div>

        {/* ── FINAL STATEMENT ── */}
        <FinalStatement />
      </div>
    </div>
  );
}
