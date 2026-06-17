"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";
import {
  Search,
  Zap,
  PhoneCall,
  BarChart2,
  Target,
  CheckCircle2,
  TrendingUp,
  ArrowDown,
  Activity,
  Globe,
  Settings,
  Layers,
  RefreshCw,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// DESIGN TOKENS (exact match to site ecosystem)
// bg: slate-50 | cards: white/80 backdrop-blur | border: slate-100/200
// blue-600 #2563eb · blue-500 #3b82f6 · blue-400 #60a5fa
// emerald-600 #059669 · red-500 #ef4444
// headings: slate-900 font-black tracking-tight
// body: slate-500 · muted: slate-400
// radii: rounded-2xl/3xl · shadow-sm · ease [0.16,1,0.3,1]
// ─────────────────────────────────────────────────────────────────

function useReveal(margin = "-50px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView] as const;
}

function useCountUp(to: number, duration = 2, trigger: boolean) {
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

// ── Word-mask reveal ───────────────────────────────────────────────
function MaskReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
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
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.048,
            }}
          >
            {w}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}

// ── Scene label pill ───────────────────────────────────────────────
function SceneLabel({ children }: { children: React.ReactNode }) {
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
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-blue-400">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200" />
    </motion.div>
  );
}

// ── Ambient background ─────────────────────────────────────────────
function AmbientBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
      <div className="absolute top-[40%] -left-60 w-[550px] h-[550px] rounded-full bg-emerald-400/[0.04] blur-[150px]" />
      <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] rounded-full bg-blue-600/[0.03] blur-[130px]" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern
            id="engine-dots"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" fill="#3b82f6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#engine-dots)" />
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
//  SCENE 1 — THE TURNING POINT
// ═════════════════════════════════════════════════════════════════
function Scene1() {
  const [ref, inView] = useReveal("-80px");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
      <SceneLabel>Scene 01 · The Turning Point</SceneLabel>

      <div ref={ref} className="text-center max-w-4xl mx-auto mb-16 space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]"
        >
          The diagnosis was clear
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-slate-900 tracking-tight leading-[1.04]"
        >
          The Problem Wasn&apos;t{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
            Demand.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl sm:text-2xl text-slate-500 font-medium leading-relaxed"
        >
          Homeowners were searching for landscaping every single day.
          <br />
          <span className="text-slate-700 font-semibold">
            GreenScape just wasn&apos;t there to be found.
          </span>
        </motion.p>
      </div>

      {/* Chaos → Order visual */}
      <div className="relative max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {/* BEFORE — scattered */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="relative rounded-3xl border border-red-100 bg-white/80 backdrop-blur-sm p-8 overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-red-400" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-500 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Before
              Ikhtiyaar
            </p>
            <div className="relative h-36 overflow-hidden">
              {[
                { label: "Google Ads", x: "10%", y: "15%", r: 0 },
                { label: "SEO?", x: "55%", y: "5%", r: -8 },
                { label: "Landing Page", x: "5%", y: "55%", r: 5 },
                { label: "Calls", x: "60%", y: "50%", r: -5 },
                { label: "Referrals", x: "30%", y: "70%", r: 3 },
                { label: "Facebook", x: "72%", y: "25%", r: 7 },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.7 + i * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  style={{ left: item.x, top: item.y, rotate: item.r }}
                  className="absolute"
                >
                  <span className="inline-block text-[12px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 shadow-sm">
                    {item.label}
                  </span>
                </motion.div>
              ))}
              {/* broken lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                {[
                  [15, 22, 60, 12],
                  [60, 12, 8, 62],
                  [8, 62, 65, 57],
                  [65, 57, 35, 75],
                ].map(([x1, y1, x2, y2], i) => (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 + i * 0.12 }}
                  />
                ))}
              </svg>
            </div>
            <p className="text-xs font-semibold text-red-500 mt-4 flex items-center gap-2">
              <span className="w-4 h-px bg-red-300" />
              Disconnected. Untracked. Unpredictable.
            </p>
          </motion.div>

          {/* AFTER — connected */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="relative rounded-3xl border border-blue-100 bg-white/80 backdrop-blur-sm p-8 overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> After
              The System
            </p>
            <div className="relative h-36">
              {/* central hub */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.1, type: "spring", stiffness: 180 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              {/* connected nodes */}
              {[
                { label: "Google Ads", x: "5%", y: "5%", angle: 0 },
                { label: "SEO", x: "62%", y: "5%", angle: 1 },
                { label: "Landing Pages", x: "2%", y: "62%", angle: 2 },
                { label: "Call Tracking", x: "62%", y: "62%", angle: 3 },
                { label: "Attribution", x: "30%", y: "0%", angle: 4 },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 1.2 + i * 0.08,
                    type: "spring",
                    stiffness: 220,
                  }}
                  style={{ left: item.x, top: item.y }}
                  className="absolute"
                >
                  <span className="inline-block text-[12px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1">
                    {item.label}
                  </span>
                </motion.div>
              ))}
              {/* connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                {[
                  [12, 12, 50, 50],
                  [70, 12, 50, 50],
                  [8, 70, 50, 50],
                  [70, 70, 50, 50],
                  [38, 4, 50, 50],
                ].map(([x1, y1, x2, y2], i) => (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 1.3 + i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </svg>
            </div>
            <p className="text-xs font-semibold text-blue-500 mt-4 flex items-center gap-2">
              <span className="w-4 h-px bg-blue-400" />
              Connected. Tracked. Predictable.
            </p>
          </motion.div>
        </div>

        {/* The statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 }}
          className="text-center space-y-3"
        >
          <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            So we built one.
          </p>
          <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
            Not a campaign. Not a quick fix. A complete, compounding lead
            generation infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
//  SCENE 2 — THE IKHTIYAAR GROWTH ENGINE (ecosystem diagram)
// ═════════════════════════════════════════════════════════════════
function Scene2() {
  const [ref, inView] = useReveal("-60px");
  const [activeIndex, setActiveIndex] = useState(-1);

  const systems = [
    {
      label: "Google Ads",
      icon: Search,
      color: "#2563eb",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      angle: -90,
    },
    {
      label: "Landing Pages",
      icon: Globe,
      color: "#2563eb",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      angle: -45,
    },
    {
      label: "Local SEO",
      icon: Target,
      color: "#059669",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      angle: 0,
    },
    {
      label: "Call Tracking",
      icon: PhoneCall,
      color: "#059669",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      angle: 45,
    },
    {
      label: "Lead Attribution",
      icon: Activity,
      color: "#7c3aed",
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      angle: 90,
    },
    {
      label: "Conversion Opt.",
      icon: TrendingUp,
      color: "#7c3aed",
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      angle: 135,
    },
    {
      label: "Reporting",
      icon: BarChart2,
      color: "#d97706",
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      angle: 180,
    },
    {
      label: "Continuous Testing",
      icon: RefreshCw,
      color: "#d97706",
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      angle: 225,
    },
  ];

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveIndex(i);
      i++;
      if (i >= systems.length) {
        clearInterval(interval);
        setActiveIndex(-1);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [inView]);

  const radius = 145;

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <SceneLabel>Scene 02 · The Growth Engine</SceneLabel>

      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Not a Campaign." delay={0.05} />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
            <MaskReveal text="An Ecosystem." delay={0.22} />
          </span>
        </h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto mt-4"
        >
          Eight interconnected systems, each feeding the next, all reporting to
          one engine.
        </motion.p>
      </div>

      <div ref={ref} className="relative flex items-center justify-center">
        {/* SVG orbit */}
        <div className="relative" style={{ width: 380, height: 380 }}>
          {/* orbit ring */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <circle
              cx="190"
              cy="190"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            {systems.map((sys, i) => {
              const angleRad = (sys.angle * Math.PI) / 180;
              const x1 = 190 + (radius - 28) * Math.cos(angleRad);
              const y1 = 190 + (radius - 28) * Math.sin(angleRad);
              return (
                <motion.line
                  key={i}
                  x1="190"
                  y1="190"
                  x2={x1}
                  y2={y1}
                  stroke={
                    activeIndex === i || activeIndex === -1
                      ? sys.color
                      : "#e2e8f0"
                  }
                  strokeWidth="1.5"
                  strokeOpacity={
                    activeIndex === -1 ? 0.4 : activeIndex === i ? 0.9 : 0.15
                  }
                  strokeDasharray={activeIndex === -1 ? "4 3" : "none"}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                />
              );
            })}
          </motion.svg>

          {/* Central hub */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative">
              {/* pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-3xl bg-blue-500/20"
              />
              <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-700 to-blue-500 shadow-2xl shadow-blue-500/30 flex flex-col items-center justify-center text-center p-2">
                <Zap className="w-7 h-7 text-white mb-1" />
                <p className="text-[9px] font-black text-white/90 uppercase tracking-wider leading-tight">
                  Ikhtiyaar
                  <br />
                  Growth Engine
                </p>
              </div>
            </div>
          </motion.div>

          {/* Satellite nodes */}
          {systems.map((sys, i) => {
            const angleRad = (sys.angle * Math.PI) / 180;
            const x = 190 + radius * Math.cos(angleRad);
            const y = 190 + radius * Math.sin(angleRad);
            const Icon = sys.icon;
            return (
              <motion.div
                key={sys.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.9 + i * 0.1,
                }}
                style={{
                  position: "absolute",
                  left: x - 28,
                  top: y - 28,
                }}
                className="cursor-default"
              >
                <motion.div
                  animate={activeIndex === i ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`relative w-14 h-14 rounded-2xl ${sys.bg} border ${sys.border} shadow-sm flex flex-col items-center justify-center gap-0.5`}
                >
                  {activeIndex === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{ boxShadow: `0 0 0 2px ${sys.color}50` }}
                    />
                  )}
                  <Icon className="w-4 h-4" style={{ color: sys.color }} />
                  <p
                    className={`text-[7px] font-bold text-center leading-tight ${sys.text} px-1`}
                  >
                    {sys.label}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Side description — shown on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="hidden lg:flex flex-col gap-3 ml-16 max-w-xs"
        >
          {[
            {
              title: "Every system feeds data back",
              body: "Nothing runs in isolation. Every ad click, form fill, and call is tracked and attributed.",
            },
            {
              title: "Every test compounds results",
              body: "Continuous A/B testing means the system gets smarter every single month.",
            },
            {
              title: "Every channel is intentional",
              body: "No spray-and-pray. Each channel serves a specific role in a deliberate funnel.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.4 + i * 0.12 }}
              className="flex gap-3 items-start"
            >
              <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
//  SCENE 3 — THE LEAD FLOW VISUALIZATION
// ═════════════════════════════════════════════════════════════════
function FlowParticle({ delay, trigger }: { delay: number; trigger: boolean }) {
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={
        trigger
          ? {
              x: ["0%", "16.6%", "33.2%", "49.8%", "66.4%", "83%", "100%"],
              opacity: [0, 1, 1, 1, 1, 1, 0],
            }
          : {}
      }
      transition={{
        duration: 3.2,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5 + delay * 0.5,
        ease: "linear",
      }}
      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"
      style={{ left: "-1%" }}
    />
  );
}

function Scene3() {
  const [ref, inView] = useReveal("-60px");

  const steps = [
    {
      label: "Google Search",
      sublabel: "User types landscaping query",
      icon: Search,
      color: "blue",
    },
    {
      label: "Landing Page",
      sublabel: "Service-specific, intent-matched",
      icon: Globe,
      color: "blue",
    },
    {
      label: "Lead Form",
      sublabel: "Frictionless, mobile-first",
      icon: Layers,
      color: "blue",
    },
    {
      label: "Call Tracking",
      sublabel: "Source attributed instantly",
      icon: PhoneCall,
      color: "emerald",
    },
    {
      label: "Qualified Lead",
      sublabel: "Scored & routed automatically",
      icon: Target,
      color: "emerald",
    },
    {
      label: "Estimate Booked",
      sublabel: "Same-day response workflow",
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      label: "Booked Project",
      sublabel: "Revenue confirmed",
      icon: TrendingUp,
      color: "emerald",
    },
  ];

  const colorMap: Record<
    string,
    { bg: string; border: string; text: string; dot: string }
  > = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <SceneLabel>Scene 03 · The Lead Flow</SceneLabel>

      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Every Lead." delay={0.05} />{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            <MaskReveal text="Every Step." delay={0.22} />
          </span>{" "}
          <MaskReveal text="Completely Visible." delay={0.38} />
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto mt-4"
        >
          For the first time, every opportunity could be tracked from first
          click to booked project.
        </motion.p>
      </div>

      <div ref={ref} className="relative">
        {/* Flow track — horizontal on desktop, vertical on mobile */}
        <div className="hidden md:block relative mb-12">
          {/* Track line */}
          <div className="relative flex items-center justify-between mb-3">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-emerald-400 origin-left"
            />

            {/* Particles */}
            {[0, 0.8, 1.6, 2.4].map((d, i) => (
              <FlowParticle key={i} delay={d} trigger={inView} />
            ))}

            {steps.map((step, i) => {
              const c = colorMap[step.color];
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.4 + i * 0.12,
                  }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${c.bg} border-2 ${c.border} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Labels below */}
          <div className="flex items-start justify-between">
            {steps.map((step, i) => {
              const c = colorMap[step.color];
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex flex-col items-center text-center max-w-[80px]"
                >
                  <p
                    className={`text-[12px] font-bold ${c.text} leading-tight mb-0.5`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[9px] text-slate-400 leading-tight">
                    {step.sublabel}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile — vertical */}
        <div className="md:hidden relative flex flex-col gap-0">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-emerald-400" />
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="relative flex items-center gap-4 pl-3 pb-5"
              >
                <div
                  className={`relative z-10 w-10 h-10 rounded-2xl ${c.bg} border-2 ${c.border} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${c.text}`}>{step.label}</p>
                  <p className="text-xs text-slate-500">{step.sublabel}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Outcome callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-8 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm max-w-2xl mx-auto"
        >
          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
              Before vs After
            </p>
            <p className="text-lg font-black text-slate-900">
              From <span className="text-red-500">9 booked projects/mo</span> to{" "}
              <span className="text-emerald-600">61 booked projects/mo</span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <p className="text-emerald-700 font-black text-lg">+578%</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
//  SCENE 4 — WHAT ACTUALLY CHANGED
// ═════════════════════════════════════════════════════════════════
function Scene4() {
  const [ref, inView] = useReveal("-60px");

  const transformations = [
    {
      before: "Marketing was a collection of disconnected activities",
      after: "Every click, call, and form submission became measurable",
      icon: Activity,
    },
    {
      before: "Ad spend left with no idea what it returned",
      after: "Every dollar traced to a business outcome estimated or booked",
      icon: BarChart2,
    },
    {
      before: "Referrals were the only reliable source of new projects",
      after: "Google Ads and SEO generated consistent, repeatable demand",
      icon: Search,
    },
    {
      before: "Seasonal slowdowns felt completely out of control",
      after:
        "Campaigns were scaled during peak seasons and throttled strategically",
      icon: Settings,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      <SceneLabel>Scene 04 · What Actually Changed</SceneLabel>

      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Not What We Did." delay={0.05} />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            <MaskReveal text="What Changed." delay={0.22} />
          </span>
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto mt-4"
        >
          Results don&apos;t come from tactics. They come from the
          transformation in how the business operates.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {transformations.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3 + i * 0.12,
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative p-6 space-y-4">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>

                {/* Before */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[8px] font-black text-red-500">
                      B
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed line-through decoration-red-300">
                    {item.before}
                  </p>
                </div>

                {/* After */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-slate-800 leading-relaxed">
                    {item.after}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
//  SCENE 5 — THE COMPOUND EFFECT
// ═════════════════════════════════════════════════════════════════
function Scene5() {
  const [ref, inView] = useReveal("-60px");

  const months = [
    {
      month: "Month 1",
      headline: "Visibility",
      body: "Search ads go live. Landing pages deployed. First qualified leads start arriving.",
      metric: "+23 leads",
      color: "blue",
    },
    {
      month: "Month 2",
      headline: "Traction",
      body: "Conversion rates improve as ad copy and landing pages are refined from real data.",
      metric: "+41 leads",
      color: "blue",
    },
    {
      month: "Month 3",
      headline: "Momentum",
      body: "SEO rankings begin climbing. Organic leads compound on top of paid results.",
      metric: "+68 leads",
      color: "blue",
    },
    {
      month: "Month 4",
      headline: "Pipeline",
      body: "Booking flow is optimized. Estimates convert at 72%. Revenue becomes predictable.",
      metric: "+94 leads",
      color: "emerald",
    },
    {
      month: "Month 5",
      headline: "Acceleration",
      body: "Growth is compounding. Each week performs better than the last. The system is self-improving.",
      metric: "+112 leads",
      color: "emerald",
    },
    {
      month: "Month 6",
      headline: "System",
      body: "127+ monthly leads. 61 booked projects. Consistent, trackable, scalable acquisition.",
      metric: "+127 leads",
      color: "emerald",
    },
  ];

  const heights = [22, 36, 50, 64, 78, 100];
  const colorMap: Record<
    string,
    { bar: string; badge: string; badgeBg: string; badgeText: string }
  > = {
    blue: {
      bar: "from-blue-400 to-blue-600",
      badge: "bg-blue-50 border-blue-200",
      badgeText: "text-blue-700",
      badgeBg: "",
    },
    emerald: {
      bar: "from-emerald-400 to-emerald-600",
      badge: "bg-emerald-50 border-emerald-200",
      badgeText: "text-emerald-700",
      badgeBg: "",
    },
  };

  return (
    <section
      ref={ref}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      <SceneLabel>Scene 05 · The Compound Effect</SceneLabel>

      <div className="text-center mb-12">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.06] tracking-tight">
          <MaskReveal text="Growth That" delay={0.05} />{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">
            <MaskReveal text="Compounds." delay={0.22} />
          </span>
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto mt-4"
        >
          Systems don&apos;t plateau. Each month of data makes the next month
          smarter.
        </motion.p>
      </div>

      {/* Growth bars */}
      {/* <div className="relative rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm p-8 mb-8 overflow-hidden max-w-5xl mx-auto">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none">
          <defs><pattern id="scene5-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#3b82f6" strokeWidth="0.8" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#scene5-grid)" />
        </svg>

        <div className="relative flex items-end justify-between gap-3 h-48 mb-6">
          {months.map((m, i) => {
            const c = colorMap[m.color];
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className={`text-[10px] font-bold ${c.badgeText}`}
                >
                  {m.metric}
                </motion.p>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 }}
                  style={{ height: `${heights[i]}%`, transformOrigin: "bottom" }}
                  className={`w-full rounded-xl bg-gradient-to-t ${c.bar} shadow-sm`}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between gap-3">
          {months.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex-1 text-center"
            >
              <p className="text-[10px] font-black text-slate-700 leading-tight">{m.month}</p>
              <p className="text-[9px] text-blue-500 font-semibold">{m.headline}</p>
            </motion.div>
          ))}
        </div>
      </div> */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {months.map((m, i) => {
          const c = colorMap[m.color];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5 + i * 0.1,
              }}
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${c.badge} ${c.badgeText}`}
                >
                  {m.month}
                </span>
                <span className={`text-[10px] font-black ${c.badgeText}`}>
                  {m.metric}
                </span>
              </div>
              <p className="text-base font-black text-slate-900">
                {m.headline}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">{m.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════
//  SCENE 6 — OWNER REACTION (editorial quote)
// ═════════════════════════════════════════════════════════════════
function Scene6() {
  const [ref, inView] = useReveal("-80px");

  return (
    <div className="relative overflow-hidden pb-20">
      {/* Full-width ambient band */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent pointer-events-none" />

      <div
        ref={ref}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center"
      >
        <SceneLabel>Scene 06 · Owner Reaction</SceneLabel>

        {/* Large quote mark */}
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[8rem] sm:text-[12rem] font-black text-blue-100 leading-none select-none -mb-10"
        >
          "
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-10 space-y-6"
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.2] tracking-tight max-w-4xl mx-auto">
            For the first time, we weren&apos;t wondering where the next project
            was coming from.
          </p>
          <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            We could see how people were finding us, what was working, and where
            our next opportunities were coming from.{" "}
            <span className="text-slate-700 font-semibold">
              It felt like we finally stopped relying on luck and started
              operating with a system.
            </span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="inline-flex flex-col items-center gap-1"
          >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center">
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">Daniel Reyes</p>
                <p className="text-xs text-slate-500">
                  Founder & Owner · GreenScape Pro, Austin TX
                </p>
              </div>
            </div>
          </motion.div>
        </motion.blockquote>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="mt-12 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-300 to-transparent origin-center"
        />

        {/* Final scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1 }}
          className="flex flex-col items-center gap-2 mt-10"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            The Results
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-blue-200 bg-blue-50 shadow-sm flex items-center justify-center"
          >
            <ArrowDown className="w-4 h-4 text-blue-500" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════
//  ROOT EXPORT
// ═════════════════════════════════════════════════════════════════
export default function BuildingTheGrowthEngine() {
  return (
    <div className="relative bg-slate-50 overflow-hidden">
      <AmbientBg />

      {/* Section header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50/70 text-blue-700 text-xs font-semibold uppercase tracking-widest">
            <Zap className="w-3 h-3" /> Building The Growth Engine
          </span>
        </motion.div>

        <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-slate-900 tracking-tight leading-[1.04] mb-6">
          <MaskReveal text="Where Everything" delay={0.08} />
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
            <MaskReveal text="Changed." delay={0.22} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="text-slate-500 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto"
        >
          Growth didn&apos;t happen because we ran ads.
          <br />
          <span className="text-slate-700 font-semibold">
            Growth happened because we installed a complete lead generation
            system.
          </span>
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="mt-10 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-blue-300 to-transparent origin-center"
        />
      </div>

      {/* Scenes */}
      <div className="relative space-y-4">
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
        <Scene5 />
        <Scene6 />
      </div>
    </div>
  );
}
