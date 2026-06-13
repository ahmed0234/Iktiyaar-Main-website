"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";
import {
  PhoneMissed, Calendar, TrendingDown, AlertTriangle,
  Target, BarChart2, Zap, ArrowDown, Leaf, DollarSign,
  Users, EyeOff, Activity, Minus, Globe, CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS  (exact match to site ecosystem)
// bg: slate-50 | cards: white/80 backdrop-blur | border: slate-100/200
// blue-600 #2563eb · blue-500 #3b82f6 · blue-400 #60a5fa
// emerald-600 #059669 · red-500 #ef4444 (warning accent)
// headings: slate-900 · body: slate-500 · muted: slate-400
// radii: rounded-2xl / 3xl  ·  shadow-sm  ·  ease [0.16,1,0.3,1]
// ─────────────────────────────────────────────────────────────

// ── Shared hook ───────────────────────────────────────────────
function useReveal(margin = "-50px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView];
}

// ── Word-mask reveal (same as rest of site) ───────────────────
function MaskReveal({ text, delay = 0, className }) {
  const [ref, inView] = useReveal("-30px");
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
          className="mr-[0.22em]"
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "112%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.048 }}
          >
            {w}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

// ── Scene label pill ──────────────────────────────────────────
function SceneLabel({ children }) {
  const [ref, inView] = useReveal("-30px");
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-5"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200" />
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-blue-400">{children}</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200" />
    </motion.div>
  );
}

// ── Global ambient background (matches AmbientBg on rest of page) ─
function AmbientBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
      <div className="absolute top-[40%] -right-60 w-[550px] h-[550px] rounded-full bg-emerald-400/[0.04] blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-blue-600/[0.03] blur-[130px]" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="page-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#3b82f6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-dots)" />
      </svg>
    </div>
  );
}

// ── Organic leaf shape (landscaping atmosphere) ───────────────
function LeafShape({ className }) {
  return (
    <svg viewBox="0 0 200 220" className={`absolute pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 C155 10 188 55 182 100 C176 148 148 192 100 210 C52 192 24 148 18 100 C12 55 45 10 100 10Z" fill="#059669" />
    </svg>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SECTION HEADER  (center-aligned, display scale)
// ═════════════════════════════════════════════════════════════════
function SectionHeader() {
  const [ref, inView] = useReveal("-40px");
  return (
    <div ref={ref} className="relative text-center pb-8 pt-12 px-4">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50/70 text-red-600 text-xs font-semibold uppercase tracking-widest">
          <AlertTriangle className="w-3 h-3" /> Before The Growth Engine
        </span>
      </motion.div>

      {/* Display heading */}
      <h2 className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black text-slate-900  tracking-tight mb-5">
        <MaskReveal text="The Reality" delay={0.08} />
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
          <MaskReveal text="Before Growth." delay={0.22} />
        </span>
      </h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        className="text-slate-500 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto"
      >
        Exceptional craftsmanship built the reputation.
        <br className="hidden sm:block" />
        <span className="text-slate-700 font-medium"> Predictable growth was still missing.</span>
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        className="mt-8 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-blue-300 to-transparent origin-center"
      />
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SCENE 1 — Split screen: craft vs. reality
// ═════════════════════════════════════════════════════════════════
function Scene1() {
  const wrapRef = useRef(null);
  const [ref, inView] = useReveal("-40px");
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const leftY  = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const calGrid = [0,1,0,0,0,1,0, 0,0,0,1,0,0,0, 0,0,1,0,0,0,0];

  const LandscapeScene = () => (
    <svg viewBox="0 0 520 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sc1-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
        <linearGradient id="sc1-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id="sc1-house" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <filter id="sc1-shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000018"/>
        </filter>
      </defs>
      <rect width="520" height="320" fill="url(#sc1-sky)" />
      {/* Sun with glow */}
      <circle cx="450" cy="48" r="32" fill="#fef08a" opacity="0.45" />
      <circle cx="450" cy="48" r="22" fill="#fde047" opacity="0.8" />
      <circle cx="450" cy="48" r="14" fill="#facc15" />
      {/* Ground */}
      <rect x="0" y="218" width="520" height="102" fill="url(#sc1-grass)" />
      {/* Retaining wall */}
      <rect x="18" y="212" width="484" height="16" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      {[18,70,122,174,226,278,330,382,434,486].map((x,i)=>(
        <line key={i} x1={x} y1="212" x2={x} y2="228" stroke="#94a3b8" strokeWidth="1.2"/>
      ))}
      {/* Patio */}
      <rect x="148" y="190" width="224" height="58" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#sc1-shadow)" />
      {[0,1,2,3].map(c=>[0,1].map(r=>(
        <rect key={`${c}${r}`} x={156+c*54} y={195+r*25} width="48" height="21" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.8"/>
      )))}
      {/* House */}
      <rect x="116" y="72" width="288" height="144" rx="3" fill="url(#sc1-house)" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#sc1-shadow)" />
      {/* Roof */}
      <polygon points="100,76 260,20 420,76" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5" />
      {/* Chimney */}
      <rect x="310" y="32" width="20" height="30" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1"/>
      {/* Windows */}
      {[140,244,330].map((x,i)=>(
        <g key={i}>
          <rect x={x} y="100" width="50" height="38" rx="3" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1.2"/>
          <line x1={x+25} y1="100" x2={x+25} y2="138" stroke="#bfdbfe" strokeWidth="1"/>
          <line x1={x} y1="119" x2={x+50} y2="119" stroke="#bfdbfe" strokeWidth="1"/>
          <rect x={x} y="100" width="50" height="38" rx="3" fill="#fbbf24" opacity="0.05"/>
        </g>
      ))}
      {/* Door */}
      <rect x="222" y="150" width="56" height="66" rx="3" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.2"/>
      <rect x="225" y="153" width="24" height="59" rx="2" fill="#eff6ff"/>
      <rect x="251" y="153" width="24" height="59" rx="2" fill="#eff6ff"/>
      <circle cx="272" cy="186" r="2.5" fill="#60a5fa"/>
      {/* Garden beds */}
      <ellipse cx="68" cy="220" rx="50" ry="18" fill="#86efac" opacity="0.9"/>
      <ellipse cx="452" cy="220" rx="50" ry="18" fill="#86efac" opacity="0.9"/>
      {/* Shrubs */}
      {[44,70,96,428,452,476].map((x,i)=>(
        <ellipse key={i} cx={x} cy={205} rx="19" ry="21" fill={i%2===0?"#4ade80":"#22c55e"} opacity="0.92"/>
      ))}
      {/* Flower accents */}
      {[55,80,440,465].map((x,i)=>(
        <circle key={i} cx={x} cy={194} r="4" fill="#fb923c" opacity="0.7"/>
      ))}
      {/* Trees */}
      <rect x="32" y="122" width="8" height="78" fill="#92400e" rx="2"/>
      <ellipse cx="36" cy="112" rx="26" ry="30" fill="#15803d"/>
      <ellipse cx="36" cy="100" rx="17" ry="20" fill="#166534"/>
      <rect x="476" y="122" width="8" height="78" fill="#92400e" rx="2"/>
      <ellipse cx="480" cy="112" rx="26" ry="30" fill="#15803d"/>
      <ellipse cx="480" cy="100" rx="17" ry="20" fill="#166534"/>
      {/* Branded truck */}
      <rect x="6" y="244" width="100" height="46" rx="4" fill="#1d4ed8" filter="url(#sc1-shadow)"/>
      <rect x="6" y="244" width="40" height="30" rx="3" fill="#1e3a8a"/>
      <rect x="10" y="248" width="28" height="17" rx="2" fill="#bfdbfe" opacity="0.75"/>
      <text x="50" y="262" fontSize="7" fill="white" fontWeight="bold" opacity="0.6">GREENSCAPE</text>
      <circle cx="28" cy="291" r="7.5" fill="#1e293b"/><circle cx="28" cy="291" r="4.5" fill="#475569"/>
      <circle cx="88" cy="291" r="7.5" fill="#1e293b"/><circle cx="88" cy="291" r="4.5" fill="#475569"/>
      {/* Path to door */}
      <rect x="234" y="216" width="32" height="32" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.8"/>
      {/* Clouds */}
      {[[68,36],[190,22],[330,32]].map(([x,y],i)=>(
        <g key={i} opacity="0.55">
          <ellipse cx={x}    cy={y}   rx="24" ry="13" fill="white"/>
          <ellipse cx={x+20} cy={y+3} rx="20" ry="12" fill="white"/>
          <ellipse cx={x-14} cy={y+4} rx="16" ry="10" fill="white"/>
        </g>
      ))}
    </svg>
  );

  return (
    <section ref={wrapRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <SceneLabel>Scene 01 · The Surface</SceneLabel>

      {/* Headline */}
      <div className="text-center mb-10">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Everything Looked Fine" delay={0.05} />
          <br />
          <MaskReveal text="From The Outside." delay={0.22} />
        </h3>
      </div>

      {/* Split panel */}
      <div ref={ref} className="grid lg:grid-cols-2 gap-2 rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50">

        {/* LEFT — beautiful craft */}
        <motion.div style={{ y: leftY }} className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50 min-h-[380px]">
          <div className="absolute inset-0">
            <LandscapeScene />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.55 }}
            className="absolute bottom-7 left-7 right-7"
          >
            <div className="bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-2xl p-4 shadow-sm">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-2">
                <Leaf className="w-3 h-3" /> The Work
              </span>
              <p className="text-xl font-black text-slate-900 leading-tight">
                The craftsmanship was exceptional.
              </p>
              <p className="text-xs text-slate-500 mt-1">Premium projects. Happy clients. Beautiful results.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — the hidden reality */}
        <motion.div
          style={{ y: rightY }}
          className="relative bg-white/95 p-8 flex flex-col justify-between gap-5 min-h-[380px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-transparent pointer-events-none rounded-r-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-3">
              <AlertTriangle className="w-3 h-3" /> The Reality
            </span>
            <p className="text-3xl font-black text-slate-900 leading-tight">
              The growth wasn't.
            </p>
            <p className="text-base text-slate-600 font-medium mt-1.5 leading-relaxed">
              Behind every beautiful project, the business was quietly running on hope, luck, and word of mouth.
            </p>
          </div>

          {/* Sparse calendar */}
          <div className="relative space-y-2.5">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">June — Booked Appointments</p>
            <div className="grid grid-cols-7 gap-1.5">
              {["M","T","W","T","F","S","S"].map((d, i)=>(
                <p key={i} className="text-[8px] text-slate-300 text-center font-bold">{d}</p>
              ))}
              {calGrid.map((booked, i)=>(
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.85 + i * 0.04, duration: 0.3 }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[9px] font-bold border transition-colors
                    ${booked
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "bg-slate-50 border-slate-100 text-slate-200"
                    }`}
                >
                  {booked ? "✓" : ""}
                </motion.div>
              ))}
            </div>
            <p className="text-[12px] text-red-500 font-semibold">Most days: the calendar sat empty</p>
          </div>

          {/* Missed signals */}
          <div className="relative space-y-2">
            {[
              { label: "Missed inquiry — no follow-up system", time: "Tue 9:14 am", icon: PhoneMissed },
              { label: "Missed inquiry — source unknown",      time: "Thu 2:38 pm", icon: PhoneMissed },
              { label: "$80 ad spend · 0 tracked conversions", time: "Fri all day",  icon: DollarSign  },
            ].map((item, i)=>(
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.3 + i * 0.14 }}
                className="flex items-center gap-3 bg-red-50/70 border border-red-100 rounded-xl px-3.5 py-2.5"
              >
                <item.icon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-600 flex-1">{item.label}</span>
                <span className="text-[11px] text-slate-500 font-semibold">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Beat quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.0 }}
        className="mt-10 text-center"
      >
        <p className="text-lg sm:text-2xl font-semibold text-slate-500 italic leading-relaxed max-w-xl mx-auto">
          "The crews were talented. The projects were beautiful.{" "}
          <span className="text-slate-700 not-italic">But nobody could predict when the next job would come in."</span>
        </p>
      </motion.blockquote>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SCENE 2 — The Referral Trap (particle ecosystem)
// ═════════════════════════════════════════════════════════════════

// Individual floating referral node
function ReferralNode({ delay, duration, startX, color = "#059669", label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale:  [0, 1, 1, 0.3],
        y: [0, -(50 + Math.random() * 60)],
        x: [(Math.random() - 0.5) * 48],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 3.5 + Math.random() * 5.5,
        ease: "easeOut",
      }}
      style={{ left: startX, bottom: "2rem", position: "absolute" }}
      className="flex flex-col items-center gap-1.5"
    >
      <div
        className="w-9 h-9 rounded-full bg-white border shadow-md flex items-center justify-center"
        style={{ borderColor: `${color}50`, boxShadow: `0 2px 14px ${color}22` }}
      >
        <Users className="w-3.5 h-3.5" style={{ color }} />
      </div>
      {label && (
        <span
          className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full border bg-white/80"
          style={{ color, borderColor: `${color}30` }}
        >
          {label}
        </span>
      )}
      <motion.div
        animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: Math.random() }}
        className="w-0.5 h-5 rounded-full"
        style={{ background: `${color}40` }}
      />
    </motion.div>
  );
}

function Scene2() {
  const [ref, inView] = useReveal("-50px");

  const nodes = [
    { delay: 0.4,  duration: 3.2, startX: "6%",  color: "#059669", label: "Lawn Care"    },
    { delay: 5.2,  duration: 3.7, startX: "20%", color: "#3b82f6", label: "Patio Design" },
    { delay: 1.8,  duration: 3.4, startX: "35%", color: "#059669", label: "Sod Install"  },
    { delay: 10.5, duration: 4.0, startX: "50%", color: "#a855f7", label: "Hardscape"    },
    { delay: 3.0,  duration: 3.2, startX: "65%", color: "#059669", label: "Irrigation"   },
    { delay: 13.0, duration: 3.6, startX: "79%", color: "#3b82f6", label: "Cleanup"      },
    { delay: 6.5,  duration: 3.9, startX: "91%", color: "#059669", label: "Tree Service" },
  ];

  return (
    <section ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <SceneLabel>Scene 02 · The Referral Trap</SceneLabel>

      <div className="text-center mb-10 space-y-2">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Referrals Built the Business." delay={0.05} />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
            <MaskReveal text="They Couldn't Reliably Grow It." delay={0.3} />
          </span>
        </h3>
      </div>

      {/* Ecosystem visualiser */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 shadow-sm" style={{ height: 300 }}>
        {/* Dot grid inside panel */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
          <defs><pattern id="s2-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#3b82f6"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#s2-dots)"/>
        </svg>

        {/* Horizontal "time passes" timeline */}
        <div className="absolute top-6 left-8 right-8 flex items-center gap-2">
          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Jan</span>
          {[...Array(11)].map((_,i)=>(
            <div key={i} className="flex-1 h-px bg-slate-100"/>
          ))}
          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Dec</span>
        </div>

        {/* Central business node */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(5,150,105,0)", "0 0 0 12px rgba(5,150,105,0.08)", "0 0 0 0 rgba(5,150,105,0)"] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="w-14 h-14 rounded-2xl bg-white border border-emerald-200 shadow-md flex items-center justify-center mb-1.5"
          >
            <Leaf className="w-6 h-6 text-emerald-600" />
          </motion.div>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">GreenScape Pro</span>
        </div>

        {/* Referral nodes */}
        {inView && nodes.map((n, i) => <ReferralNode key={i} {...n} />)}

        {/* Dead zone labels */}
        {[
          { left: "8%",  label: "5 weeks · no referrals",  delay: 2.8 },
          { left: "60%", label: "11 days · silence",        delay: 4.5 },
        ].map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
            transition={{ delay: d.delay, duration: 3.6, repeat: Infinity, repeatDelay: 8 }}
            style={{ left: d.left, top: "44px" }}
            className="absolute bg-white/90 backdrop-blur-sm border border-red-100 rounded-xl px-3 py-1.5 shadow-sm"
          >
            <span className="text-[9px] text-red-500 font-semibold">{d.label}</span>
          </motion.div>
        ))}

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </div>

      {/* Owner quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7 }}
        className="mt-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm text-center"
      >
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium italic">
          "We built a reputation people trusted. The problem was we couldn't control when those referrals would arrive or whether they'd show up at all in a slow month."
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <span className="text-[9px] font-black text-emerald-700">DR</span>
          </div>
          <span className="text-xs text-slate-500 font-semibold">Daniel Reyes · Founder, GreenScape Pro</span>
        </div>
      </motion.div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SCENE 3 — The Leaking Funnel
// ═════════════════════════════════════════════════════════════════

function LeakDrop({ x, delay, trigger }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={trigger
        ? { opacity: [0, 0.65, 0], y: [0, 48], x: [(Math.random() - 0.5) * 36] }
        : {}}
      transition={{
        duration: 1.1,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 1.8 + 0.5,
        ease: "easeIn",
      }}
      style={{ left: x, bottom: -4, position: "absolute" }}
      className="w-1.5 h-1.5 rounded-full bg-red-400/60"
    />
  );
}

function Scene3() {
  const [ref, inView] = useReveal("-50px");

  const steps = [
    { label: "Website Visitors",      value: "2,400 /mo", pct: "100%", bg: "from-slate-200 to-slate-300",     text: "text-slate-700",  drops: 0 },
    { label: "Landing Experience",    value: "1,100",     pct: "76%",  bg: "from-blue-200 to-blue-300",       text: "text-blue-800",   drops: 3 },
    { label: "Engaged Visitors",      value: "440",       pct: "52%",  bg: "from-blue-300 to-blue-400",       text: "text-blue-900",   drops: 4 },
    { label: "Inquiry Submitted",     value: "46",        pct: "28%",  bg: "from-blue-400 to-blue-500",       text: "text-white",      drops: 4 },
    { label: "Qualified Opportunity", value: "22",        pct: "16%",  bg: "from-violet-400 to-violet-500",   text: "text-white",      drops: 3 },
    { label: "Booked Project",        value: "9",         pct: "7%",   bg: "from-red-400 to-red-500",         text: "text-white",      drops: 0 },
  ];

  const dropPcts = ["10%","28%","48%","68%"];

  return (
    <section ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Subtle tinted background band */}
      <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none rounded-3xl" />

      <SceneLabel>Scene 03 · The Leaking Business</SceneLabel>

      <div className="relative text-center mb-10 space-y-2">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Visitors Were Arriving." delay={0.05} />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
            <MaskReveal text="Opportunities Were Leaving." delay={0.3} />
          </span>
        </h3>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="text-slate-600 text-base font-semibold max-w-md mx-auto"
        >
          Without dedicated landing pages, conversion strategy, or tracking the funnel was a sieve.
        </motion.p>
      </div>

      {/* Funnel — horizontal bar chart, text always outside the bar */}
      <div className="flex flex-col gap-2 w-full max-w-3xl mx-auto">
        {steps.map((step, i) => {
          const barPct = parseInt(step.pct);
          return (
            <div key={step.label} className="relative w-full flex flex-col">
              {/* Row */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Label — fixed width on the left */}
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.13 }}
                  className="w-[130px] sm:w-[180px] flex-shrink-0 text-[11px] sm:text-sm font-bold text-slate-700 text-right leading-tight"
                >
                  {step.label}
                </motion.span>

                {/* Bar track */}
                <div className="flex-1 relative h-9 sm:h-11 flex items-center">
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.13 }}
                    style={{ width: `${barPct}%`, transformOrigin: "left center" }}
                    className={`relative h-full rounded-xl bg-gradient-to-r ${step.bg} shadow-sm`}
                  >
                    {/* Leak drops inside bar (overflow-visible so they drip out) */}
                    {step.drops > 0 && (
                      <div className="absolute inset-0 overflow-visible pointer-events-none">
                        {dropPcts.slice(0, step.drops).map((x, j) => (
                          <LeakDrop key={j} x={x} delay={j * 0.28 + i * 0.14} trigger={inView} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Value + drop% — fixed right side */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.13 + 0.15 }}
                  className="w-[90px] sm:w-[120px] flex-shrink-0 flex items-center gap-1.5 sm:gap-2"
                >
                  {i > 0 && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-red-500 bg-white border border-red-100 px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                      −{Math.round((1 - barPct / parseInt(steps[i-1].pct)) * 100)}%
                    </span>
                  )}
                  <span className="text-sm sm:text-base font-black text-slate-800 whitespace-nowrap">
                    {step.value}
                  </span>
                </motion.div>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.13 + 0.4 }}
                  className="w-0.5 h-2 bg-slate-200 ml-[calc(130px+8px)] sm:ml-[calc(180px+12px)] mt-0.5"
                />
              )}
            </div>
          );
        })}
      </div>


      {/* Callout */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2 }}
        className="mt-6 bg-white/80 backdrop-blur-sm border border-red-100 rounded-2xl px-6 py-4 text-center shadow-sm max-w-xl mx-auto"
      >
        <p className="text-base font-bold text-slate-800">
          Of every 2,400 monthly visitors,{" "}
          <span className="text-red-500">only 9 became booked projects.</span>
        </p>
        <p className="text-sm text-slate-500 font-medium mt-1">
          A 0.4% end-to-end conversion rate with no system in place to improve it.
        </p>
      </motion.div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SCENE 4 — The Diagnostic Board
// ═════════════════════════════════════════════════════════════════

function FindingCard({ title, body, icon: Icon, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: -0.8 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl border border-red-100 bg-white/80 backdrop-blur-sm p-4 sm:p-5 shadow-sm overflow-hidden cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* pin dot */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-100 border border-red-200" />
      <div className="relative flex flex-col gap-2.5">
        {/* Icon + title on one line — always readable */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
          </div>
          <p className="text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-wide leading-tight">{title}</p>
        </div>
        {/* Body below — never constrained by icon column */}
        <p className="text-[11px] sm:text-[11px] font-medium text-slate-500 leading-relaxed pl-0">{body}</p>
      </div>
    </motion.div>
  );
}

function Scene4() {
  const [ref, inView] = useReveal("-50px");

  const findings = [
    { title: "No Call Tracking",      body: "Calls came in with no source data. Every channel went unverified.",                      icon: PhoneMissed,   delay: 0.22 },
    { title: "No Attribution",        body: "Ad spend went out and revenue came in. Nobody could connect the two.",                   icon: Target,        delay: 0.34 },
    { title: "No Landing Pages",      body: "Every campaign pointed to the homepage. Generic pages don't convert specific intent.",   icon: Globe,         delay: 0.46 },
    { title: "No CRO Strategy",       body: "No A/B tests. No conversion design. No intentional path from visitor to inquiry.",      icon: Activity,      delay: 0.58 },
    { title: "No Performance Data",   body: "Reports showed session counts. Not leads. Not booked jobs. Not revenue impact.",        icon: BarChart2,     delay: 0.70 },
    { title: "No Lead Qualification", body: "Every inquiry handled equally — no filtering by project size, area, or fit.",          icon: Users,         delay: 0.82 },
    { title: "No Testing Framework",  body: "Identical ads ran unchanged for months. No iteration. No learning curve.",             icon: Zap,           delay: 0.94 },
    { title: "No System",             body: "Every month restarted from scratch. No flywheel. No compounding. No design.",          icon: AlertTriangle, delay: 1.06 },
  ];

  return (
    <section ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <SceneLabel>Scene 04 · The Diagnostic</SceneLabel>

      <div className="text-center mb-10 space-y-2">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Eight Growth Obstacles." delay={0.05} />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            <MaskReveal text="Every One Connected." delay={0.28} />
          </span>
        </h3>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-slate-600 font-semibold text-base  max-w-md mx-auto"
        >
          We mapped every failure point. None were about craftsmanship. All were about infrastructure.
        </motion.p>
      </div>

      {/* Board */}
      <div className="relative rounded-3xl border border-slate-200 bg-white/60 backdrop-blur-sm p-4 sm:p-8 shadow-sm overflow-hidden">
        {/* Grid mesh */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none">
          <defs><pattern id="s4-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#3b82f6" strokeWidth="0.8"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#s4-grid)"/>
        </svg>

        {/* Subtle thread lines behind cards */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]">
          <line x1="25%" y1="30%" x2="75%" y2="70%" stroke="#ef4444" strokeWidth="1" strokeDasharray="5 4"/>
          <line x1="50%" y1="15%" x2="50%" y2="85%" stroke="#f97316" strokeWidth="1" strokeDasharray="5 4"/>
          <line x1="10%" y1="55%" x2="90%" y2="45%" stroke="#ef4444" strokeWidth="1" strokeDasharray="5 4"/>
        </svg>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {findings.map(f => <FindingCard key={f.title} {...f} inView={inView} />)}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.5 }}
        className="mt-7 text-center text-lg md:text-xl italic font-semibold text-slate-500 max-w-xl mx-auto"
      >
        "None of these were about quality.{" "}
        <span className="text-slate-700 not-italic">Every single one was about the missing system."</span>
      </motion.p>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SCENE 5 — Hidden Cost
// ═════════════════════════════════════════════════════════════════

function Scene5() {
  const [ref, inView] = useReveal("-50px");

  const costs = [
    { title: "Lost Inquiry Value",      body: "Every missed call wasn't a lost lead it was a $4k–$18k project that went to a competitor down the street.",  sub: "~23 missed inquiries / month",               icon: PhoneMissed,   delay: 0.14 },
    { title: "Idle Crew Capacity",      body: "Skilled staff. Parked equipment. Full payroll running through weeks with nothing scheduled.",                    sub: "$1,200–$2,400 in idle cost per slow week",   icon: Users,          delay: 0.26 },
    { title: "Wasted Ad Spend",         body: "Every dollar sent to a homepage with no conversion intention. Thousands spent, almost nothing returned.",        sub: "$2,800/mo with zero attribution",             icon: DollarSign,     delay: 0.38 },
    { title: "Unbooked Capacity",       body: "The crews had open availability. The calendar had empty slots. No mechanism existed to fill them.",             sub: "30–40% unused crew time in slow seasons",    icon: Calendar,       delay: 0.50 },
    { title: "Marketing Blind Spots",   body: "Every channel was untracked. ROI was permanently invisible. Decisions were made on gut, not data.",              sub: "0 verified conversions over 6 months",        icon: EyeOff,         delay: 0.62 },
    { title: "Widening Competitor Gap", body: "Competitors operating with systems were compounding growth. GreenScape was running on referral inertia.",       sub: "Local rivals: 3–5× more online visibility",  icon: TrendingDown,   delay: 0.74 },
  ];

  return (
    <section ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-50/20 to-transparent pointer-events-none rounded-3xl" />
      <LeafShape className="w-[280px] -top-16 -right-12 rotate-45 opacity-[0.03]" />

      <SceneLabel>Scene 05 · The Hidden Cost</SceneLabel>

      <div className="relative text-center mb-10 space-y-2">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Every Missed Inquiry" delay={0.05} />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400">
            <MaskReveal text="Was a Project That Never Happened." delay={0.3} />
          </span>
        </h3>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {costs.map(c => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: c.delay }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm p-5 shadow-sm overflow-hidden cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                <c.icon className="w-4 h-4 text-red-500" />
              </div>
              <p className="text-sm md:text-base font-black text-slate-800">{c.title}</p>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{c.body}</p>
              <p className="text-[11px] font-semibold text-red-500 pt-2 border-t border-slate-100">{c.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Opportunity cost callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2 }}
        className="mt-5 bg-white/80 backdrop-blur-sm border border-red-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
      >
        <div>
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Est. Monthly Opportunity Cost</p>
          <p className="text-3xl font-black text-slate-900">
            $38,000 <span className="text-base font-medium text-slate-400">— $72,000</span>
          </p>
        </div>
        <p className="text-sm text-slate-500 font-semibold max-w-xs leading-relaxed sm:text-right">
          Across lost project revenue, idle crew time, and unattributed advertising spend.
        </p>
      </motion.div>
    </section>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SCENE 6 — A Week Inside (scroll-driven horizontal)
// ═════════════════════════════════════════════════════════════════

function Scene6() {
  const containerRef = useRef(null);
  const [ref, inView] = useReveal("-50px");
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.88], ["0%", "-54%"]);

  const days = [
    { day: "Monday",    headline: "Silence.",                       items: ["No new inquiries", "0 form submissions", "Ads running, nothing returned"],     mood: "dead"    },
    { day: "Tuesday",   headline: "One referral call.",             items: ["Friend of a past client", "Project scope uncertain", "Source untracked"],       mood: "flicker" },
    { day: "Wednesday", headline: "No estimates confirmed.",        items: ["Follow-up email sent", "No reply received", "Calendar stays empty"],             mood: "dead"    },
    { day: "Thursday",  headline: "Ad budget raised.",              items: ["Daily spend increased to $80", "No measurable change", "No idea why it failed"], mood: "warn"    },
    { day: "Friday",    headline: "Complete visibility blackout.",  items: ["No performance reports", "No attribution data", "Revenue outlook: unknown"],     mood: "warn"    },
    { day: "Saturday",  headline: "Full crew. No projects.",        items: ["Everyone available", "Nothing scheduled", "Payroll runs regardless"],            mood: "dead"    },
    { day: "Sunday",    headline: "Hope next week is different.",   items: ["Nothing changing by design", "Pattern repeating", "The cycle continues"],        mood: "flicker" },
  ];

  const moodStyles = {
    dead:    { card: "bg-white/90 border-slate-100",    tag: "bg-slate-100 text-slate-400 border-slate-200",   hl: "text-slate-700",  dot: "bg-slate-300"  },
    flicker: { card: "bg-amber-50/80 border-amber-100", tag: "bg-amber-50 text-amber-600 border-amber-200",    hl: "text-amber-700",  dot: "bg-amber-400"  },
    warn:    { card: "bg-red-50/70 border-red-100",     tag: "bg-red-50 text-red-500 border-red-200",          hl: "text-red-600",    dot: "bg-red-400"    },
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden pb-12">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SceneLabel>Scene 06 · A Week Inside</SceneLabel>

        <div className="text-center mb-10 space-y-2">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
            <MaskReveal text="Seven Days." delay={0.05} />
            {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              <MaskReveal text="The Same Cycle." delay={0.22} />
            </span>
          </h3>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="text-slate-500 text-sm max-w-sm mx-auto"
          >
            Every week without a system was a week the business couldn't grow by design.
          </motion.p>
        </div>

        {/* Horizontal strip */}
        <div className="relative overflow-hidden">
          <motion.div style={{ x }} className="flex gap-3.5 w-max pb-2 pt-1">
            {days.map((day, i) => {
              const m = moodStyles[day.mood];
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 + i * 0.09 }}
                  className={`w-52 flex-shrink-0 rounded-2xl border ${m.card} shadow-sm p-5 space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${m.tag}`}>{day.day}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                  </div>
                  <p className={`text-sm font-black leading-snug ${m.hl}`}>{day.headline}</p>
                  <div className="space-y-1.5">
                    {day.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <Minus className="w-2.5 h-2.5 text-slate-300 mt-0.5 flex-shrink-0" />
                        <span className="text-[10px] text-slate-500 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Repeat indicator */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="w-28 flex-shrink-0 flex flex-col items-center justify-center gap-2"
            >
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div key={i}
                    animate={{ opacity: [0.15, 0.6, 0.15] }}
                    transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.18 }}
                    className="w-1.5 h-1.5 rounded-full bg-slate-300"
                  />
                ))}
              </div>
              <p className="text-[9px] text-slate-400 text-center uppercase tracking-widest font-bold leading-snug">Repeats<br/>next week</p>
            </motion.div>
          </motion.div>

          {/* Fade edge */}
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════
//  SCENE 7 — THE CLIMAX: NO SYSTEM (upgraded glow)
// ═════════════════════════════════════════════════════════════════

function Scene7() {
  const [ref, inView] = useReveal("-80px");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = [
      setTimeout(() => setPhase(1), 450),
      setTimeout(() => setPhase(2), 1100),
      setTimeout(() => setPhase(3), 1750),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setPhase(5), 3200),
    ];
    return () => t.forEach(clearTimeout);
  }, [inView]);

  const crossed = [
    "Not Traffic.",
    "Not Competition.",
    "Not Pricing.",
    "Not Service Quality.",
  ];

  return (
    <div className="relative overflow-hidden pb-1">
      {/* Full-width background band for scene 7 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent pointer-events-none" />
      <LeafShape className="w-[500px] -top-32 -left-36 -rotate-20 opacity-[0.025]" />
      <LeafShape className="w-[380px] -bottom-16 -right-24 rotate-15 opacity-[0.02]" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <SceneLabel>Scene 07 · The Root Cause</SceneLabel>

        {/* Crossed items */}
        <div className="flex flex-col items-center gap-0.5 mb-10">
          {crossed.map((item, i) => (
            <AnimatePresence key={item}>
              {phase >= i + 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative inline-flex items-center"
                >
                  <span
                    className={`text-2xl sm:text-3xl lg:text-4xl font-black transition-all duration-600
                      ${phase >= 5 ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {item}
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-[46%] left-0 right-0 h-0.5 bg-gradient-to-r from-red-300 to-red-200 origin-left"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* THE BIG REVEAL */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.72, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
            >
              {/* === ENHANCED GLOW SYSTEM === */}

              {/* Outermost haze — very soft, large */}
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -inset-20 rounded-full bg-blue-300/20 blur-[80px] pointer-events-none"
              />

              {/* Mid glow — branded blue */}
              <motion.div
                animate={{ opacity: [0.25, 0.55, 0.25], scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -inset-10 rounded-3xl bg-blue-400/15 blur-[40px] pointer-events-none"
              />

              {/* Inner tight glow — strongest */}
              <motion.div
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.4 }}
                className="absolute -inset-4 rounded-2xl bg-blue-500/12 blur-[16px] pointer-events-none"
              />

              {/* Subtle particle field — tiny blue dots */}
              <div className="absolute -inset-16 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0, 0.5, 0],
                      y: [0, -(20 + Math.random() * 30)],
                      x: [(Math.random() - 0.5) * 40],
                    }}
                    transition={{
                      duration: 2.5 + Math.random(),
                      delay: Math.random() * 3,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2,
                    }}
                    style={{
                      position: "absolute",
                      left: `${10 + Math.random() * 80}%`,
                      bottom: `${10 + Math.random() * 40}%`,
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: "#60a5fa",
                    }}
                  />
                ))}
              </div>

              {/* The words */}
              <div className="relative">
                <motion.p
                  initial={{ letterSpacing: "0.3em", opacity: 0 }}
                  animate={{ letterSpacing: "-0.04em", opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-7xl sm:text-8xl lg:text-[9rem] xl:text-[10rem] font-black leading-none text-slate-900"
                >
                  NO
                </motion.p>
                <motion.p
                  initial={{ letterSpacing: "0.3em", opacity: 0 }}
                  animate={{ letterSpacing: "-0.03em", opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                >
                  SYSTEM.
                </motion.p>

                {/* Underline accent */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-blue-300 origin-center"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Context line after reveal */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-8 text-slate-400 text-base leading-relaxed max-w-sm mx-auto"
            >
              The craft was never in question. <br />
              <span className="text-slate-600 font-semibold">The system was always the missing piece.</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════
//  TRANSITION BRIDGE — chaos → clarity → "What if?"
// ═════════════════════════════════════════════════════════════════

function TransitionBridge() {
  const [ref, inView] = useReveal("-80px");

  return (
    <div className="relative overflow-hidden pb-20">
      {/* Materialising grid — order emerging */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.4, delay: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg width="100%" height="100%" className="opacity-[0.042]">
          <defs><pattern id="bridge-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#3b82f6" strokeWidth="0.8"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#bridge-grid)"/>
        </svg>
      </motion.div>

      {/* Nodes and connections forming */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          {[[14,30,50,20],[50,20,82,34],[28,65,64,58],[64,58,90,70],[50,20,28,65],[82,34,64,58]].map(([x1,y1,x2,y2],i)=>(
            <motion.line key={i}
              x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="#3b82f6" strokeWidth="1.2" strokeOpacity="0.18" strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.1, delay: 1.0 + i * 0.16, ease: "easeInOut" }}
            />
          ))}
        </svg>
        {[[14,30],[50,20],[82,34],[28,65],[64,58],[90,70]].map(([x,y],i)=>(
          <motion.div key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.85 + i * 0.13, duration: 0.4, type: "spring", stiffness: 200 }}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute w-3 h-3 rounded-full bg-blue-400/40 border border-blue-400/20 shadow-sm shadow-blue-400/20"
          />
        ))}
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-7">

        {/* Turning point badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50/70 text-blue-700 text-xs font-semibold uppercase tracking-widest">
            <Zap className="w-3 h-3" /> The Turning Point
          </span>
        </motion.div>

        {/* Bridge headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.06] tracking-tight"
        >
          What If Growth Was{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
            Predictable?
          </span>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-slate-600 font-semibold text-lg leading-relaxed max-w-xl mx-auto"
        >
          The problem was never the craftsmanship, the crew, or the market.
          It was the absence of a system designed to generate{" "}
          <span className="text-slate-700 font-semibold">consistent, trackable, predictable demand.</span>
        </motion.p>

        {/* What changed pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap justify-center gap-2 pt-2"
        >
          {["Google Ads Rebuilt","Landing Pages Built","SEO Strategy","Call Attribution","Conversion Optimization","Full Reporting"].map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1 + i * 0.07 }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50/80 border border-blue-200 px-3 py-1 rounded-full"
            >
              <CheckCircle2 className="w-3 h-3 text-blue-500" /> {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-1.5 pt-4"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-blue-200 bg-blue-50 shadow-sm flex items-center justify-center"
          >
            <ArrowDown className="w-4 h-4 text-blue-500" />
          </motion.div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">The System That Changed Everything</span>
        </motion.div>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════
//  ROOT EXPORT
// ═════════════════════════════════════════════════════════════════

export default function BeforeTheGrowthEngine() {
  return (
    <div className="relative bg-slate-50 overflow-hidden">
      <AmbientBg />

      {/* Center-aligned section header */}
      <SectionHeader />

      {/* Continuous narrative — scenes flow into each other with minimal gap */}
      <div className="relative space-y-2">
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
        <Scene5 />
        <Scene6 />
        <Scene7 />
        <TransitionBridge />
      </div>
    </div>
  );
}