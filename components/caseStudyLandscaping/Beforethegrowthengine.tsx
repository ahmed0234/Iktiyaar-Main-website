"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import {
  Phone,
  PhoneMissed,
  Calendar,
  TrendingDown,
  AlertTriangle,
  Globe,
  Target,
  BarChart2,
  Zap,
  ArrowDown,
  Leaf,
  Clock,
  DollarSign,
  Users,
  EyeOff,
  WifiOff,
  Activity,
  Minus,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ═══════════════════════════════════════════════════════════════

function useReveal(margin = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView];
}

// Word-by-word mask reveal
function MaskReveal({ text, delay = 0, className, as: Tag = "span" }) {
  const [ref, inView] = useReveal("-60px");
  return (
    <Tag ref={ref} className={className} style={{ display: "block" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
          className="mr-[0.22em]"
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.05,
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

// Cinematic divider
function CinematicDivider({ label }) {
  const [ref, inView] = useReveal("-40px");
  return (
    <div ref={ref} className="flex items-center gap-4 my-4">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200 origin-left"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400"
      >
        {label}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-200 origin-right"
      />
    </div>
  );
}

// Floating ambient orb
function Orb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 1 — Split screen: beautiful work vs ugly reality
// ═══════════════════════════════════════════════════════════════

function Scene1() {
  const [ref, inView] = useReveal("-40px");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // landscaping SVG panels (Daytime)
  const LeftVisual = () => (
    <svg
      viewBox="0 0 480 320"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky */}
      <defs>
        <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="grassDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="patioDay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="20%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="320" fill="url(#skyDay)" />
      <rect width="480" height="320" fill="url(#sunGlow)" />
      
      {/* Sun */}
      <circle cx="80" cy="60" r="24" fill="#fef08a" opacity="0.9" />

      {/* Clouds */}
      <g fill="#ffffff" opacity="0.8">
        <path d="M 320 80 Q 330 60 350 70 Q 370 60 380 80 Q 390 90 370 100 L 330 100 Q 310 90 320 80" />
        <path d="M 120 40 Q 130 20 150 30 Q 170 20 180 40 Q 190 50 170 60 L 130 60 Q 110 50 120 40" transform="scale(0.6) translate(150, 60)" />
      </g>

      {/* Ground */}
      <rect x="0" y="220" width="480" height="100" fill="url(#grassDay)" />
      {/* Patio */}
      <rect x="120" y="200" width="240" height="80" rx="4" fill="url(#patioDay)" />
      {/* Patio stones */}
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={130 + col * 58}
            y={204 + row * 24}
            width="52"
            height="20"
            rx="2"
            fill="#f8fafc"
            opacity="0.5"
          />
        )),
      )}
      {/* House wall */}
      <rect x="100" y="80" width="280" height="145" fill="#f1f5f9" />
      <rect x="100" y="80" width="280" height="6" fill="#cbd5e1" />
      {/* Windows */}
      {[130, 250, 340].map((x, i) => (
        <g key={i}>
          <rect x={x} y="100" width="50" height="40" rx="3" fill="#e0f2fe" />
          <rect
            x={x + 2}
            y="102"
            width="22"
            height="36"
            rx="2"
            fill="#bae6fd"
            opacity="0.8"
          />
          <rect
            x={x + 26}
            y="102"
            width="22"
            height="36"
            rx="2"
            fill="#bae6fd"
            opacity="0.8"
          />
          {/* subtle reflection */}
          <path d={`M ${x+10} 102 L ${x+40} 138`} stroke="#ffffff" strokeWidth="3" opacity="0.4" />
        </g>
      ))}
      {/* Door */}
      <rect x="205" y="155" width="70" height="70" rx="4" fill="#334155" />
      <rect
        x="209"
        y="159"
        width="28"
        height="62"
        rx="2"
        fill="#475569"
        opacity="0.7"
      />
      <rect
        x="241"
        y="159"
        width="28"
        height="62"
        rx="2"
        fill="#475569"
        opacity="0.7"
      />
      {/* Garden beds */}
      <ellipse cx="80" cy="225" rx="60" ry="20" fill="#16a34a" opacity="0.9" />
      <ellipse cx="400" cy="225" rx="60" ry="20" fill="#16a34a" opacity="0.9" />
      {/* Shrubs */}
      {[55, 80, 105, 375, 400, 425].map((x, i) => (
        <ellipse
          key={i}
          cx={x}
          cy={210}
          rx="20"
          ry="22"
          fill={i % 2 === 0 ? "#22c55e" : "#16a34a"}
          opacity="0.95"
        />
      ))}
      {/* Retaining wall */}
      <rect x="20" y="218" width="440" height="14" rx="2" fill="#cbd5e1" />
      {[20, 68, 116, 164, 212, 260, 308, 356, 404, 452].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="218"
          x2={x}
          y2="232"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
      ))}
      {/* Trees */}
      <rect x="50" y="130" width="8" height="70" fill="#78350f" />
      <ellipse cx="54" cy="120" rx="28" ry="32" fill="#22c55e" />
      <ellipse cx="54" cy="108" rx="18" ry="22" fill="#16a34a" />
      <rect x="420" y="130" width="8" height="70" fill="#78350f" />
      <ellipse cx="424" cy="120" rx="28" ry="32" fill="#22c55e" />
      <ellipse cx="424" cy="108" rx="18" ry="22" fill="#16a34a" />
      {/* Truck */}
      <rect x="10" y="248" width="100" height="48" rx="4" fill="#3b82f6" />
      <rect x="10" y="248" width="40" height="32" rx="3" fill="#2563eb" />
      <rect
        x="14"
        y="252"
        width="28"
        height="18"
        rx="2"
        fill="#93c5fd"
        opacity="0.8"
      />
      <circle cx="30" cy="300" r="8" fill="#1e293b" />
      <circle cx="30" cy="300" r="5" fill="#94a3b8" />
      <circle cx="90" cy="300" r="8" fill="#1e293b" />
      <circle cx="90" cy="300" r="5" fill="#94a3b8" />
    </svg>
  );

  const calDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calData = [
    0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center py-20 bg-slate-50"
    >
      <div ref={ref} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scene label */}
        <CinematicDivider label="Scene 01 · The Surface" />

        {/* Main headline */}
        <div className="text-center mb-16 space-y-4">
          <MaskReveal
            text="Everything Looked Fine From The Outside."
            delay={0.05}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight"
          />
        </div>

        {/* Split screen */}
        <div className="grid lg:grid-cols-2 gap-2 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
          {/* Left — beautiful work */}
          <motion.div
            style={{ y: leftY }}
            className="relative overflow-hidden rounded-l-3xl bg-slate-100"
            style={{ minHeight: 420 }}
          >
            <LeftVisual />
            {/* overlay label */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 left-8 right-8"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full uppercase tracking-widest mb-3 backdrop-blur-sm">
                <Leaf className="w-3 h-3" /> The Craftsmanship
              </span>
              <p className="text-2xl font-black text-white leading-tight">
                The work was exceptional.
              </p>
              <p className="text-white/80 text-sm mt-1">
                Premium landscaping. Satisfied clients. Beautiful results.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — the reality */}
          <motion.div
            style={{ y: rightY }}
            className="relative bg-white rounded-r-3xl p-8 flex flex-col justify-between overflow-hidden"
            style={{ minHeight: 420 }}
          >
            <Orb className="w-60 h-60 -top-20 -right-20 bg-red-400/10" />

            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase tracking-widest mb-5">
                <AlertTriangle className="w-3 h-3" /> The Reality
              </span>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="text-2xl font-black text-slate-900 mb-2 leading-tight"
              >
                The growth wasn't.
              </motion.p>
            </div>

            {/* Sparse calendar */}
            <div className="space-y-3 relative z-10">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                June — Appointments
              </p>
              <div className="grid grid-cols-7 gap-1">
                {calDays.map((d) => (
                  <p
                    key={d}
                    className="text-[8px] text-slate-400 text-center font-bold"
                  >
                    {d}
                  </p>
                ))}
                {calData.map((booked, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + i * 0.04 }}
                    className={`aspect-square rounded-md flex items-center justify-center text-[8px] font-bold
                      ${
                        booked
                          ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                          : "bg-slate-50 border border-slate-100 text-slate-300"
                      }`}
                  >
                    {booked ? "✓" : "—"}
                  </motion.div>
                ))}
              </div>
              <p className="text-[10px] text-red-500 font-medium">
                Most days: no inquiries.
              </p>
            </div>

            {/* Missed call log */}
            <div className="space-y-2 mt-4 relative z-10">
              {[
                {
                  label: "Missed Inquiry",
                  time: "Tue 9:14am",
                  icon: PhoneMissed,
                },
                {
                  label: "Missed Inquiry",
                  time: "Thu 2:38pm",
                  icon: PhoneMissed,
                },
                {
                  label: "Ad spend: $0 leads",
                  time: "Fri all day",
                  icon: DollarSign,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.4 + i * 0.15 }}
                  className="flex items-center gap-2.5 bg-red-50/80 border border-red-100 rounded-xl px-3 py-2"
                >
                  <item.icon className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span className="text-xs text-slate-600 font-medium flex-1">
                    {item.label}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pause beat quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.9 }}
          className="mt-16 text-center"
        >
          <p className="text-xl sm:text-2xl font-semibold text-slate-400 italic leading-relaxed max-w-2xl mx-auto">
            "The crews were skilled. The projects were beautiful.
            <br />
            <span className="text-slate-700">
              But the phone wasn't ringing often enough."
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 2 — Referral Particle System
// ═══════════════════════════════════════════════════════════════

function ReferralParticle({
  delay,
  duration,
  startX,
  amplitude,
  color = "#10b981", // emerald-500
}) {
  const y = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.3],
        y: [0, -Math.random() * 80 - 40],
        x: [(Math.random() - 0.5) * 60],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 6 + 3,
        ease: "easeOut",
      }}
      style={{ left: startX, bottom: 0, position: "absolute" }}
      className="flex flex-col items-center gap-1"
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-white"
        style={{ border: `1px solid ${color}40` }}
      >
        <Users className="w-3.5 h-3.5" style={{ color }} />
      </div>
      <div
        className="w-0.5 h-4 rounded-full"
        style={{ background: `${color}60` }}
      />
    </motion.div>
  );
}

function Scene2() {
  const [ref, inView] = useReveal("-60px");
  const particles = [
    { delay: 0.5, duration: 3.5, startX: "8%", amplitude: 60 },
    { delay: 4.2, duration: 4.0, startX: "22%", amplitude: 80 },
    {
      delay: 1.8,
      duration: 3.2,
      startX: "38%",
      amplitude: 50,
      color: "#3b82f6", // blue-500
    },
    { delay: 8.0, duration: 3.8, startX: "51%", amplitude: 70 },
    {
      delay: 2.5,
      duration: 4.2,
      startX: "64%",
      amplitude: 60,
      color: "#8b5cf6", // violet-500
    },
    { delay: 11.5, duration: 3.0, startX: "78%", amplitude: 90 },
    { delay: 6.0, duration: 3.6, startX: "88%", amplitude: 55 },
  ];

  return (
    <div className="relative py-24 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicDivider label="Scene 02 · The Referral Trap" />

        <div className="text-center mb-16 space-y-4">
          <MaskReveal
            text="Referrals Are Valuable."
            delay={0.05}
            className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1]"
          />
          <MaskReveal
            text="They Are Not Predictable."
            delay={0.3}
            className="text-4xl sm:text-5xl font-black leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500"
          />
        </div>

        {/* Particle ecosystem */}
        <div className="relative h-72 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">
          <Orb className="w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-400/10" />

          {/* central business node */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                boxShadow: [
                  "0 0 0px rgba(16,185,129,0)",
                  "0 0 30px rgba(16,185,129,0.2)",
                  "0 0 0px rgba(16,185,129,0)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 3.5 }}
              className="w-16 h-16 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center mb-2 shadow-md"
            >
              <Leaf className="w-7 h-7 text-emerald-500" />
            </motion.div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              GreenScape Pro
            </span>
          </div>

          {/* particles — only show when in view */}
          {inView &&
            particles.map((p, i) => <ReferralParticle key={i} {...p} />)}

          {/* long dead zones */}
          {[
            { left: "30%", label: "5 weeks — no referrals", delay: 2 },
            { left: "65%", label: "11 days — silence", delay: 3.5 },
          ].map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 0.9, 0.9, 0] } : {}}
              transition={{
                delay: d.delay,
                duration: 4,
                repeat: Infinity,
                repeatDelay: 8,
              }}
              style={{ left: d.left }}
              className="absolute top-8 bg-red-50 border border-red-100 rounded-xl px-3 py-1.5 shadow-sm"
            >
              <span className="text-[9px] text-red-600 font-semibold uppercase tracking-wide">
                {d.label}
              </span>
            </motion.div>
          ))}

          {/* overlay caption fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <p className="text-lg text-slate-500 leading-relaxed font-medium italic">
            "We built a reputation people trusted. The problem was we couldn't
            control when those referrals would arrive — or if they'd arrive at
            all."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <span className="text-[8px] font-black text-emerald-600">DR</span>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Daniel Reyes · GreenScape Pro
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 3 — The Leaking Funnel
// ═══════════════════════════════════════════════════════════════

function LeakParticle({ x, delay, sectionInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={
        sectionInView
          ? {
              opacity: [0, 0.8, 0],
              y: [0, 60 + Math.random() * 40],
              x: [0, (Math.random() - 0.5) * 80],
              scale: [1, 0.5],
            }
          : {}
      }
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2 + 1,
        ease: "easeIn",
      }}
      style={{ left: x }}
      className="absolute w-2 h-2 rounded-full bg-red-500 shadow-sm"
    />
  );
}

function Scene3() {
  const [ref, inView] = useReveal("-60px");

  const funnelSteps = [
    {
      label: "Website Visitors",
      value: "2,400/mo",
      width: "100%",
      color: "from-slate-100 to-slate-200",
      textColor: "text-slate-500",
      valColor: "text-slate-800",
      drop: "—",
    },
    {
      label: "Landing Experience",
      value: "1,100",
      width: "76%",
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-600",
      valColor: "text-blue-900",
      drop: "−54%",
    },
    {
      label: "Engaged Visitors",
      value: "440",
      width: "54%",
      color: "from-blue-400 to-blue-500",
      textColor: "text-white",
      valColor: "text-white",
      drop: "−60%",
    },
    {
      label: "Inquiry Submitted",
      value: "46",
      width: "32%",
      color: "from-emerald-400 to-emerald-500",
      textColor: "text-white",
      valColor: "text-white",
      drop: "−90%",
    },
    {
      label: "Qualified Opportunity",
      value: "22",
      width: "18%",
      color: "from-violet-400 to-violet-500",
      textColor: "text-white",
      valColor: "text-white",
      drop: "−52%",
    },
    {
      label: "Booked Project",
      value: "9",
      width: "8%",
      color: "from-red-400 to-red-500",
      textColor: "text-white",
      valColor: "text-white",
      drop: "−59%",
    },
  ];

  return (
    <div className="relative py-24 bg-slate-50">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicDivider label="Scene 03 · The Leaking Business" />

        <div className="text-center mb-16 space-y-3">
          <MaskReveal
            text="Visitors Were Arriving."
            delay={0.05}
            className="text-4xl sm:text-5xl font-black text-slate-900"
          />
          <MaskReveal
            text="Opportunities Were Leaving."
            delay={0.3}
            className="text-4xl sm:text-5xl font-black text-red-500"
          />
        </div>

        {/* Funnel */}
        <div className="relative space-y-1.5 flex flex-col items-center z-10">
          {funnelSteps.map((step, i) => (
            <div
              key={step.label}
              className="relative w-full flex flex-col items-center"
            >
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.15,
                }}
                style={{ width: step.width, transformOrigin: "center" }}
                className={`relative h-14 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-between px-5 overflow-visible shadow-sm`}
              >
                <span className={`text-xs font-bold ${step.textColor}`}>
                  {step.label}
                </span>
                <div className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      {step.drop}
                    </span>
                  )}
                  <span className={`text-sm font-black ${step.valColor}`}>
                    {step.value}
                  </span>
                </div>

                {/* Leak particles at each step except first */}
                {i > 0 && i < funnelSteps.length - 1 && (
                  <div className="absolute inset-0 overflow-visible pointer-events-none">
                    {[...Array(4)].map((_, j) => (
                      <LeakParticle
                        key={j}
                        x={`${10 + j * 22}%`}
                        delay={j * 0.35 + i * 0.2}
                        sectionInView={inView}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Connector arrow */}
              {i < funnelSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.15 + 0.5 }}
                  className="w-0.5 h-3 bg-slate-200 my-0.5"
                />
              )}
            </div>
          ))}

          {/* Final loss callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-8 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 text-center shadow-sm"
          >
            <p className="text-sm font-bold text-red-700">
              Of every 2,400 monthly visitors — only{" "}
              <span className="text-red-500">9 became booked projects.</span>
            </p>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              That's a 0.4% end-to-end conversion rate.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 4 — The Investigation Board
// ═══════════════════════════════════════════════════════════════

function EvidenceCard({
  title,
  body,
  icon: Icon,
  delay,
  inView,
  color = "red",
  x = 0,
  y = 0,
}) {
  const colors = {
    red: {
      bg: "bg-white",
      border: "border-red-100",
      text: "text-slate-800",
      icon: "text-red-500",
      pin: "bg-red-500",
    },
    amber: {
      bg: "bg-white",
      border: "border-amber-100",
      text: "text-slate-800",
      icon: "text-amber-500",
      pin: "bg-amber-500",
    },
    orange: {
      bg: "bg-white",
      border: "border-orange-100",
      text: "text-slate-800",
      icon: "text-orange-500",
      pin: "bg-orange-500",
    },
  };
  const c = colors[color];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: x > 0 ? 2 : -2 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
      className={`relative rounded-2xl ${c.bg} border ${c.border} p-4 shadow-sm hover:shadow-md transition-shadow cursor-default`}
    >
      {/* pin dot */}
      <div
        className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${c.pin} border-2 border-white shadow-sm`}
      />
      <Icon className={`w-4 h-4 ${c.icon} mb-2`} />
      <p
        className={`text-xs font-black ${c.text} mb-1 uppercase tracking-wide`}
      >
        {title}
      </p>
      <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{body}</p>
    </motion.div>
  );
}

function Scene4() {
  const [ref, inView] = useReveal("-60px");

  const findings = [
    {
      title: "No Tracking",
      body: "Zero call tracking in place. No way to know which channel drove each inquiry.",
      icon: EyeOff,
      color: "red",
      delay: 0.3,
    },
    {
      title: "No Attribution",
      body: "Ad spend went out. Results came in. Nobody knew which caused what.",
      icon: Target,
      color: "red",
      delay: 0.45,
    },
    {
      title: "No Landing Pages",
      body: "Every ad pointed to the homepage. Generic pages don't convert specific intent.",
      icon: Globe,
      color: "amber",
      delay: 0.6,
    },
    {
      title: "No Conversion Strategy",
      body: "No A/B testing. No CRO. No intentional design for turning visitors into inquiries.",
      icon: Activity,
      color: "amber",
      delay: 0.75,
    },
    {
      title: "No Performance Data",
      body: "Management was flying blind. Monthly reports showed traffic. Not leads. Not revenue.",
      icon: BarChart2,
      color: "orange",
      delay: 0.9,
    },
    {
      title: "No Qualification Flow",
      body: "Every inquiry was treated equally. No filtering for project size, location, or fit.",
      icon: Users,
      color: "orange",
      delay: 1.05,
    },
    {
      title: "No Testing Framework",
      body: "Same ads ran for months unchanged. No iteration. No compounding improvement.",
      icon: Zap,
      color: "red",
      delay: 1.2,
    },
    {
      title: "No System",
      body: "Each month started fresh. No flywheel. No compounding. No predictable lead flow.",
      icon: AlertTriangle,
      color: "red",
      delay: 1.35,
    },
  ];

  return (
    <div className="relative py-24 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicDivider label="Scene 04 · The Investigation" />

        <div className="text-center mb-16 space-y-3">
          <MaskReveal
            text="The Diagnostic."
            delay={0.05}
            className="text-4xl sm:text-5xl font-black text-slate-900"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed font-medium"
          >
            Every growth problem has a root cause. We investigated everything.
            Here's what we found.
          </motion.p>
        </div>

        {/* Board */}
        <div className="relative bg-white/80 backdrop-blur-md border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl p-8 overflow-hidden z-10">
          <Orb className="w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-400/5" />

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 relative z-20">
            {findings.map((f) => (
              <EvidenceCard key={f.title} {...f} inView={inView} />
            ))}
          </div>

          {/* Connecting SVG lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="25%"
              y1="30%"
              x2="75%"
              y2="70%"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <line
              x1="50%"
              y1="20%"
              x2="50%"
              y2="80%"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <line
              x1="10%"
              y1="60%"
              x2="90%"
              y2="40%"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        {/* Revelation quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8 }}
          className="mt-10 text-center"
        >
          <p className="text-lg text-slate-500 italic font-medium">
            "None of these problems were about the quality of the work.
            <br />
            <span className="text-slate-800 font-bold">
              Every single one was about the system."
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 5 — Hidden Cost: floating glass cards
// ═══════════════════════════════════════════════════════════════

function FloatingCostCard({ title, body, sub, delay, icon: Icon, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 rounded-2xl p-6 overflow-hidden group cursor-default z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative space-y-2 z-10">
        <Icon className="w-5 h-5 text-red-500" />
        <p className="text-sm font-black text-slate-800">{title}</p>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">{body}</p>
        {sub && (
          <p className="text-[10px] text-red-600 font-semibold mt-3 pt-3 border-t border-slate-100">
            {sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function Scene5() {
  const [ref, inView] = useReveal("-60px");

  const costs = [
    {
      title: "Lost Inquiry Value",
      body: "Every missed call wasn't just a lost lead. It was a $4,000–$18,000 project that went to a competitor.",
      sub: "~23 missed inquiries / month",
      icon: PhoneMissed,
      delay: 0.2,
    },
    {
      title: "Idle Crew Capacity",
      body: "Paid staff. Parked equipment. Slow weeks with full payroll and empty schedules.",
      sub: "Real cost: $1,200–$2,400 / slow week",
      icon: Users,
      delay: 0.35,
    },
    {
      title: "Wasted Ad Spend",
      body: "Campaigns ran to the homepage. Generic landing. No conversion. Thousands spent for almost no return.",
      sub: "$2,800/mo in untracked ad spend",
      icon: DollarSign,
      delay: 0.5,
    },
    {
      title: "Unbooked Capacity",
      body: "The crews had availability. The calendar had gaps. There just wasn't a system to fill them consistently.",
      sub: "Avg 30–40% unused crew capacity in slow periods",
      icon: Calendar,
      delay: 0.65,
    },
    {
      title: "Marketing Blind Spots",
      body: "No attribution. No reporting. No feedback loop. Every dollar disappeared into a black hole of unknown ROI.",
      sub: "0 trackable conversions over 6 months",
      icon: EyeOff,
      delay: 0.8,
    },
    {
      title: "Competitor Advantage",
      body: "While GreenScape relied on referrals, competitors with systems were filling their calendars month after month.",
      sub: "Local competitors: 3–5x more review volume",
      icon: TrendingDown,
      delay: 0.95,
    },
  ];

  return (
    <div className="relative py-24 bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicDivider label="Scene 05 · The Hidden Cost" />

        <div className="text-center mb-16 space-y-3">
          <MaskReveal
            text="Every Missed Inquiry Wasn't Just a Lead."
            delay={0.05}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900"
          />
          <MaskReveal
            text="It Was a Project That Never Happened."
            delay={0.35}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-500"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {costs.map((c) => (
            <FloatingCostCard key={c.title} {...c} inView={inView} />
          ))}
        </div>

        {/* Total cost estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 }}
          className="mt-10 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10"
        >
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
              Estimated Monthly Opportunity Cost
            </p>
            <p className="text-3xl font-black text-slate-900">
              $38,000{" "}
              <span className="text-base font-medium text-slate-400">
                — $72,000
              </span>
            </p>
          </div>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed text-right font-medium">
            Calculated across lost project revenue, idle crew time, and
            unattributed ad spend.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 6 — A Week Inside The Business
// ═══════════════════════════════════════════════════════════════

function Scene6() {
  const [ref, inView] = useReveal("-60px");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-56%"]);

  const days = [
    {
      day: "Monday",
      headline: "Silence.",
      items: [
        "No new inquiries",
        "0 form submissions",
        "1 website visitor from ad",
      ],
      mood: "dead",
      icon: WifiOff,
    },
    {
      day: "Tuesday",
      headline: "One referral.",
      items: [
        "A friend-of-a-client",
        "Project unclear in scope",
        "No way to track the source",
      ],
      mood: "flicker",
      icon: Phone,
    },
    {
      day: "Wednesday",
      headline: "No estimates booked.",
      items: ["Follow-up email sent", "No response", "Calendar stays empty"],
      mood: "dead",
      icon: Calendar,
    },
    {
      day: "Thursday",
      headline: "Ads increased.",
      items: [
        "Daily spend bumped to $80",
        "No change in inquiry volume",
        "No visibility into why",
      ],
      mood: "burn",
      icon: DollarSign,
    },
    {
      day: "Friday",
      headline: "Zero visibility.",
      items: [
        "No reporting available",
        "No attribution data",
        "Revenue forecast: unknown",
      ],
      mood: "dead",
      icon: EyeOff,
    },
    {
      day: "Saturday",
      headline: "Open crew.",
      items: [
        "Full team availability",
        "No weekend bookings",
        "Payroll runs regardless",
      ],
      mood: "burn",
      icon: Users,
    },
    {
      day: "Sunday",
      headline: "Hope.",
      items: [
        "Maybe next week is different",
        "No system to ensure it",
        "The cycle continues",
      ],
      mood: "flicker",
      icon: Clock,
    },
  ];

  const moodStyle = {
    dead: {
      bg: "bg-white",
      border: "border-slate-200",
      tag: "bg-slate-100 text-slate-500 border-slate-200",
      icon: "text-slate-400",
      text: "text-slate-500",
    },
    flicker: {
      bg: "bg-amber-50/80",
      border: "border-amber-200",
      tag: "bg-amber-100 text-amber-700 border-amber-200",
      icon: "text-amber-500",
      text: "text-amber-700/80",
    },
    burn: {
      bg: "bg-red-50/80",
      border: "border-red-200",
      tag: "bg-red-100 text-red-700 border-red-200",
      icon: "text-red-500",
      text: "text-red-700/80",
    },
  };

  return (
    <div ref={containerRef} className="relative py-24 overflow-hidden bg-slate-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicDivider label="Scene 06 · A Week Inside" />

        <div className="text-center mb-16 space-y-3">
          <MaskReveal
            text="Seven Days. The Same Pattern."
            delay={0.05}
            className="text-4xl sm:text-5xl font-black text-slate-900"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-slate-500 font-medium text-base max-w-md mx-auto"
          >
            Every week that passed without a system was a week the business
            couldn't grow by design.
          </motion.p>
        </div>

        {/* Horizontal scroll timeline */}
        <div className="relative overflow-hidden z-10">
          <motion.div style={{ x }} className="flex gap-5 w-max pb-4 px-4">
            {days.map((day, i) => {
              const style = moodStyle[day.mood];
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1 + i * 0.1,
                  }}
                  className={`w-64 flex-shrink-0 rounded-2xl ${style.bg} border ${style.border} p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${style.tag}`}
                    >
                      {day.day}
                    </span>
                    <day.icon className={`w-4 h-4 ${style.icon}`} />
                  </div>
                  <p className="text-xl font-black text-slate-800 leading-tight">
                    {day.headline}
                  </p>
                  <div className="space-y-2 pt-2 border-t border-slate-200/50">
                    {day.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Minus className={`w-3 h-3 ${style.icon} mt-0.5 flex-shrink-0`} />
                        <span className={`text-[11px] font-medium leading-snug ${style.text}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* repeat indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="w-40 flex-shrink-0 flex flex-col items-center justify-center gap-3"
            >
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 rounded-full bg-slate-300"
                  />
                ))}
              </div>
              <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                Repeats
                <br />
                next week
              </p>
            </motion.div>
          </motion.div>

          {/* fade edges */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE 7 — The Climax: NO SYSTEM
// ═══════════════════════════════════════════════════════════════

function Scene7() {
  const [ref, inView] = useReveal("-100px");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3100),
      setTimeout(() => setPhase(5), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const crossed = [
    "Not Traffic.",
    "Not Competition.",
    "Not Pricing.",
    "Not Service Quality.",
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden bg-slate-50">
      <Orb className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-400/10" />

      <div
        ref={ref}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10"
      >
        <CinematicDivider label="Scene 07 · The Diagnosis" />

        {/* Noise items — crossed out */}
        <div className="space-y-3 mb-10">
          {crossed.map((item, i) => (
            <AnimatePresence key={item}>
              {phase >= i + 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative inline-flex items-center gap-3"
                >
                  <span
                    className={`text-2xl sm:text-3xl font-black transition-all duration-700 ${phase >= 5 ? "text-slate-200" : "text-slate-400"}`}
                  >
                    {item}
                  </span>
                  {/* strikethrough line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-y-1/2 left-0 right-0 h-1 bg-red-500 origin-left"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* THE REVEAL */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* glow behind */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute inset-0 blur-3xl bg-red-400/20 rounded-full scale-150"
              />
              <p className="relative text-7xl sm:text-8xl lg:text-[9rem] font-black leading-none tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
                  NO
                </span>
              </p>
              <p className="relative text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter text-red-600 drop-shadow-sm">
                SYSTEM.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TRANSITION — Chaos → Order
// ═══════════════════════════════════════════════════════════════

function TransitionBridge() {
  const [ref, inView] = useReveal("-80px");

  return (
    <div ref={ref} className="relative py-32 overflow-hidden bg-slate-50">
      {/* Animated grid appearing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg width="100%" height="100%" className="opacity-[0.4]">
          <defs>
            <pattern
              id="bridgegrid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#bae6fd" /* blue-200 */
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bridgegrid)" />
        </svg>
      </motion.div>

      {/* Connecting nodes materialising */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[
          [15, 30],
          [50, 20],
          [80, 35],
          [30, 65],
          [65, 60],
          [90, 70],
        ].map(([x, y], i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.8 } : {}}
            transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute w-3 h-3 rounded-full bg-emerald-400 shadow-md border-2 border-white"
          />
        ))}
        {/* SVG connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[
            [15, 30, 50, 20],
            [50, 20, 80, 35],
            [30, 65, 65, 60],
            [65, 60, 90, 70],
            [50, 20, 30, 65],
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#34d399" /* emerald-400 */
              strokeWidth="2"
              strokeOpacity="0.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 1.2 + i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm font-bold text-emerald-600 uppercase tracking-[0.3em] bg-emerald-50 inline-block px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm"
        >
          The Turning Point
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.06] tracking-tight"
        >
          <span className="text-slate-900">What If Growth</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
            Was Predictable?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-slate-600 font-medium text-lg leading-relaxed max-w-xl mx-auto"
        >
          The problem was never the craftsmanship, the crew, or the market. It
          was the absence of a system designed to generate consistent,
          trackable, predictable demand.
        </motion.p>

        {/* Forward arrow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-3 pt-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center shadow-md"
          >
            <ArrowDown className="w-5 h-5 text-emerald-600" />
          </motion.div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            The System
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════

export default function BeforeTheGrowthEngine() {
  return (
    <div className="relative bg-slate-50 overflow-hidden font-sans">
      {/* Global ambient orbs */}
      <Orb className="w-[700px] h-[700px] -top-80 -left-80 bg-blue-400/10" />
      <Orb className="w-[500px] h-[500px] top-1/3 -right-60 bg-emerald-400/10" />
      <Orb className="w-[600px] h-[600px] bottom-0 left-1/4 bg-slate-300/30" />

      {/* Entry bar */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" /> Before The Growth Engine
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.04] tracking-tight max-w-3xl"
        >
          The Reality
          <br />
          <span className="text-slate-400">Before Growth.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-500 font-medium text-base mt-6 max-w-lg leading-relaxed"
        >
          This is the unfiltered story of what GreenScape Pro's business
          actually looked like before any system existed.
        </motion.p>
      </div>

      {/* Scenes */}
      <div className="relative z-10">
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
