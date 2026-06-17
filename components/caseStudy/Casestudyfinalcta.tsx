"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Calendar,
  BarChart2,
  Target,
  Shield,
  Lock,
  Clock,
  Users,
  Zap,
  ChevronRight,
  Star,
  Activity,
  MousePointerClick,
  Building2,
  DollarSign,
  X,
  Sparkles,
  Eye,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useCountUp(to, duration = 2, inView) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, to, duration]);
  return val;
}

function Badge({ children, light }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border
      ${
        light
          ? "border-white/20 bg-white/10 text-white/80"
          : "border-blue-200 bg-blue-50/70 text-blue-700"
      }`}
    >
      {children}
    </span>
  );
}

// ─── Ambient background dots ──────────────────────────────────────────────────
function DotGrid({ opacity = 0.04 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="cgdots"
          x="0"
          y="0"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill="#3b82f6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cgdots)" />
    </svg>
  );
}

// ─── Crossroads Visual (Option A vs B) ────────────────────────────────────────
function CrossroadsCard({ side, title, items, color, active, onClick }) {
  const isA = side === "A";
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden
        ${
          isA
            ? "bg-white/80 border-red-100 shadow-sm"
            : "bg-gradient-to-br from-blue-600 to-blue-500 border-blue-400/30 shadow-xl shadow-blue-500/20"
        }
        ${active ? "ring-4 " + (isA ? "ring-red-200" : "ring-blue-300") : ""}
      `}
    >
      {!isA && (
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="cgp"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.5" cy="1.5" r="1.5" fill="#fff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cgp)" />
          </svg>
        </div>
      )}
      <div className="relative p-7 space-y-5">
        <div className="flex items-start justify-between">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg
            ${isA ? "bg-red-50 text-red-400 border border-red-100" : "bg-white/20 text-white border border-white/30"}`}
          >
            {side}
          </div>
          {active && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${isA ? "bg-red-100 text-red-600" : "bg-white/20 text-white"}`}
            >
              {isA ? "Where you are" : "Where you could be"}
            </motion.div>
          )}
        </div>
        <p
          className={`text-lg font-black leading-tight ${isA ? "text-slate-800" : "text-white"}`}
        >
          {title}
        </p>
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {isA ? (
                <X className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-white/90 mt-0.5 flex-shrink-0" />
              )}
              <span
                className={`text-sm leading-snug ${isA ? "text-slate-600" : "text-white/90"}`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── 90-Day Roadmap ───────────────────────────────────────────────────────────
function RoadmapTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const steps = [
    {
      day: "Day 1",
      label: "Deep-Dive Audit",
      desc: "We map every gap in your current funnel ads, tracking, copy, targeting.",
      icon: Eye,
      color: "from-violet-500 to-violet-400",
    },
    {
      day: "Day 7",
      label: "Strategy Built",
      desc: "Custom growth plan written for your market, service area, and goals.",
      icon: Target,
      color: "from-blue-500 to-blue-400",
    },
    {
      day: "Day 14",
      label: "Campaigns Live",
      desc: "Optimized Google Ads launch. Landing pages deployed. Tracking confirmed.",
      icon: Zap,
      color: "from-cyan-500 to-cyan-400",
    },
    {
      day: "Day 30",
      label: "First Results",
      desc: "Lead volume climbs. Cost per lead drops. Patterns emerge for optimization.",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-400",
    },
    {
      day: "Day 60",
      label: "Flywheel Spinning",
      desc: "SEO compounds, ads optimize themselves, attribution is crystal clear.",
      icon: Activity,
      color: "from-amber-500 to-amber-400",
    },
    {
      day: "Day 90",
      label: "Predictable Growth",
      desc: "You can forecast next month's revenue. The guesswork is gone for good.",
      icon: BarChart2,
      color: "from-blue-600 to-blue-500",
    },
  ];

  return (
    <div ref={ref} className="relative">
      {/* connecting spine */}
      <div className="absolute left-[28px] top-8 bottom-8 w-px bg-gradient-to-b from-violet-300 via-blue-300 to-blue-500 hidden sm:block" />

      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.day}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.1,
            }}
            className="flex items-start gap-4"
          >
            {/* icon node */}
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm relative z-10`}
            >
              <step.icon className="w-5 h-5 text-white" />
            </div>
            {/* content */}
            <div className="flex-1 bg-white/80 backdrop-blur border border-slate-100 rounded-2xl px-4 py-3.5 shadow-sm">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                  {step.day}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-sm font-black text-slate-900">
                  {step.label}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Trust pillars ────────────────────────────────────────────────────────────
function TrustPillar({ icon: Icon, title, body, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="bg-white/80 backdrop-blur border border-slate-100 rounded-2xl p-5 shadow-sm"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center mb-3 shadow-sm">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <p className="text-sm font-bold text-slate-800 mb-1">{title}</p>
      <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
    </motion.div>
  );
}

// ─── Pulsing live indicator ───────────────────────────────────────────────────
function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
    </span>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CaseStudyFinalCTA() {
  const [chosenPath, setChosenPath] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const leads = useCountUp(110, 1.8, statsInView);
  const cpl = useCountUp(48, 1.8, statsInView);
  const conv = useCountUp(9, 1.6, statsInView);

  return (
    <section className="relative bg-slate-50 overflow-hidden">
      {/* ── subtle page-separator line ────────────────────────────────── */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent origin-left"
        />
      </div>

      <div className="relative py-28 space-y-28">
        {/* ════════════════════════════════════════════════════════════════
            1.  FUTURE-PACING HERO
        ════════════════════════════════════════════════════════════════ */}
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Badge>
                <Sparkles className="w-3 h-3" /> The Question Worth Asking
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.05] tracking-tight"
            >
              Today it's their success story{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  Tomorrow it could be yours
                </span>
                {/* underline squiggle */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 400 6"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 0 3 Q 50 0 100 3 Q 150 6 200 3 Q 250 0 300 3 Q 350 6 400 3"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={heroInView ? { pathLength: 1, opacity: 0.6 } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </svg>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-600 font-sans font-semibold text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Holloway Roofing wasn't special. They didn't have a bigger budget,
              a better product, or a lucky break. They just stopped guessing and
              started operating with a system. That system is available to you
              right now.
            </motion.p>

            {/* live social proof ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2.5 bg-white border border-slate-100 rounded-full px-4 py-2 shadow-sm text-xs"
            >
              <LiveDot />
              <span className="text-slate-500">
                Reviewing{" "}
                <strong className="text-slate-800">3 new applications</strong>{" "}
                this week ·{" "}
                <strong className="text-blue-600">2 spots remaining</strong>
              </span>
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            2.  CROSSROADS — Option A vs B
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              You are standing at a crossroads
            </p>
            <p className="text-slate-600 text-sm">
              Every month you wait is a month of leads that go to a competitor
              who didn't.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <CrossroadsCard
              side="A"
              title="Keep doing what you're doing"
              items={[
                "Inconsistent leads month to month",
                "Budget spent without clear attribution",
                "Sales team sitting idle in slow weeks",
                "Revenue impossible to forecast",
                "Competitors building systems while you wait",
              ]}
              active={chosenPath === "A"}
              onClick={() => setChosenPath("A")}
            />
            <CrossroadsCard
              side="B"
              title="Build a predictable growth system"
              items={[
                "110+ qualified leads arriving every month",
                "Know exactly where every dollar goes",
                "Sales calendar booked weeks in advance",
                "Revenue forecast within 10% accuracy",
                "A system that compounds over time",
              ]}
              active={chosenPath === "B"}
              onClick={() => {
                setChosenPath("B");
                setTimeout(() => setFormOpen(true), 600);
              }}
            />
          </div>

          <AnimatePresence>
            {chosenPath === "A" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 flex items-start gap-3"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  That's a valid choice — but remember, Marcus made the same one
                  for two years before he reached out. The leads you don't
                  capture today don't pause; they go to someone else.{" "}
                  <button
                    onClick={() => {
                      setChosenPath("B");
                      setTimeout(() => setFormOpen(true), 400);
                    }}
                    className="underline font-semibold text-amber-900 hover:text-amber-700"
                  >
                    See what Option B actually looks like →
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            3.  90-DAY ROADMAP
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left: copy */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <Badge>
                <Clock className="w-3 h-3" /> Your Next 60 Days
              </Badge>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Picture This Time{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  Next Quarter
                </span>
              </h3>
              <p className="text-slate-500 text-base leading-relaxed">
                Not a vague promise. A sequenced, milestone-driven process that
                moves your business from where it is now to a place where growth
                feels like a system — not a wish.
              </p>

              {/* mini stat recap */}
              <div ref={statsRef} className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Leads / mo",
                    value: leads,
                    suffix: "+",
                    sub: "avg after 90 days",
                  },
                  {
                    label: "CPL reduction",
                    value: cpl,
                    suffix: "%",
                    sub: "lower cost per lead",
                  },
                  {
                    label: "Conv. rate",
                    value: conv,
                    suffix: ".4%",
                    sub: "up from 2.1%",
                  },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="bg-white/80 border border-slate-100 rounded-2xl p-3.5 text-center shadow-sm"
                  >
                    <p className="text-2xl font-black text-slate-900">
                      {s.value}
                      <span className="text-base font-semibold text-blue-500">
                        {s.suffix}
                      </span>
                    </p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide mt-0.5">
                      {s.label}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 italic">
                Results from the Holloway Roofing engagement · Individual
                results vary based on market and budget.
              </p>
            </div>

            {/* Right: timeline */}
            <div>
              <RoadmapTimeline />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            4.  TRUST PILLARS
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <Badge>
              <Shield className="w-3 h-3" /> How We Work
            </Badge>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              No Vanity Metrics.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                No Inflated Reports.
              </span>
            </h3>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Every decision we make is trackable and tied to business outcomes
              — not impressions or click-through rates that don't pay the bills.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Activity,
                title: "Full attribution tracking",
                body: "Every lead traced back to the exact keyword, ad, or page that triggered it. No more guessing what's working.",
                delay: 0,
              },
              {
                icon: BarChart2,
                title: "Transparent reporting",
                body: "Monthly reports that show real numbers: cost per lead, conversion rate, booked calls nothing hidden.",
                delay: 0.08,
              },
              {
                icon: Zap,
                title: "Continuous optimization",
                body: "We test constantly. Headlines, bids, audiences, landing pages. The system improves every single month.",
                delay: 0.16,
              },
              {
                icon: ThumbsUp,
                title: "Honest fit assessment",
                body: "If we don't believe we can move the needle for your business, we'll tell you in the first call. No hard sell.",
                delay: 0.24,
              },
            ].map((p) => (
              <TrustPillar key={p.title} {...p} />
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            5.  EXCLUSIVITY
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white/80 backdrop-blur shadow-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-transparent pointer-events-none" />
            <DotGrid opacity={0.025} />
            <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-center lg:text-left space-y-2">
                <p className="text-xl font-black text-slate-900">
                  We work with a limited number of clients at a time.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  Every business we take on gets our full attention strategy
                  calls, weekly reviews, hands-on optimization. That's only
                  possible when our roster is intentionally small. We prioritize
                  fit over volume, always.
                </p>
              </div>
              <div className="flex-shrink-0 text-center space-y-1">
                <div className="w-24 h-24 rounded-full border-4 border-blue-100 flex items-center justify-center bg-blue-50 mx-auto">
                  <div className="text-center">
                    <p className="text-2xl font-black text-blue-600">2</p>
                    <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wide leading-tight">
                      spots
                      <br />
                      left
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">Q3 2025 intake</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            6.  CTA — THE MAIN EVENT
        ════════════════════════════════════════════════════════════════ */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent" />
            <DotGrid opacity={0.04} />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]" />

            <div className="relative grid lg:grid-cols-2 gap-12 p-8 lg:p-16 items-center">
              <div className="space-y-6">
                <h2 className="text-xl sm:text-xl lg:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400 tracking-tight flex items-center gap-3 pb-2">
                  <Calendar className="w-10 h-10 text-blue-500 flex-shrink-0" /> Free Strategy Call
                </h2>
                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                  Find Out Exactly What's Holding Your Growth Back
                </h3>
                <p className="text-white/95 text-base leading-relaxed">
                  In a 30-minute call, we'll audit your current lead generation,
                  identify the biggest gaps, and show you a clear path to
                  predictable growth with no obligation to move forward.
                </p>

                <div className="space-y-2.5">
                  {[
                    "A complete audit of your current ad spend and ROI",
                    "Identification of your highest-value lead opportunities",
                    "A custom 60 day growth roadmap for your business",
                    "Honest assessment of whether we're a fit",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "No pressure",
                    "No commitment",
                    "No sales tactics",
                    "100% free",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-white/50 border border-white/10 bg-white/5 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 space-y-5">
                <p className="text-white font-bold text-lg">
                  Check if your business qualifies
                </p>
                <p className="text-white/40 text-xs">
                  Takes 60 seconds. We'll review and reach out within 24 hours.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      label: "Your name",
                      placeholder: "Marcus Holloway",
                      type: "text",
                    },
                    {
                      label: "Business name",
                      placeholder: "Holloway Roofing Co.",
                      type: "text",
                    },
                    {
                      label: "Your email",
                      placeholder: "marcus@hollowayroof.com",
                      type: "email",
                    },
                    {
                      label: "Monthly ad budget (approx.)",
                      placeholder: "$2,000 – $5,000",
                      type: "text",
                    },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-semibold text-white/50 mb-1.5">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200"
                      />
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full rounded-xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400" />
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative flex items-center justify-center gap-2 text-white font-bold py-3.5 text-sm">
                    Get My Free Growth Plan{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                <p className="text-center text-[10px] text-white/25 leading-relaxed">
                  We review every application personally. If we don't believe we
                  can help, we'll be upfront. No hard sell — ever.
                </p>
              </div>
            </div>
          </motion.div>
        </div> */}

        {/* ════════════════════════════════════════════════════════════════
            7.  RISK REVERSAL — address the burned-before buyer
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-black text-slate-800">
              We know what you've been through.
            </h4>
            <p className="text-slate-500 text-sm mt-1">
              You've probably been burned by an agency that promised the world
              and disappeared after the contract was signed. Here's how we're
              different.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              {
                icon: Shield,
                title: "We'll tell you if we can't help",
                body: "If your budget, market, or business model isn't a fit for our system, we'll say so on the first call.",
              },
              {
                icon: Eye,
                title: "You own everything",
                body: "Your ad accounts, landing pages, tracking — all yours. We never hold your data hostage.",
              },
              {
                icon: Activity,
                title: "Results you can verify yourself",
                body: "Every metric we show you is verifiable directly in your own Google Ads and Analytics accounts.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/80 border border-slate-100 rounded-2xl p-5 shadow-sm text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto">
                  <item.icon className="w-4 h-4 text-slate-600" />
                </div>
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            8.  FINAL EMOTIONAL CLOSE
        ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-8"
          >
            {/* divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200" />
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-200" />
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                The bottom line
              </p>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                The businesses that grow consistently{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  aren't guessing.
                </span>
              </p>
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl mx-auto">
                They built a system. Holloway Roofing built one. The next
                success story we publish could be yours but only if you decide
                to stop waiting and start building.
              </p>
            </div>

            {/* Final CTA strip */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow text-sm group overflow-hidden"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Link href={`/contact`}>
                  <span className="relative">Get My Free Growth Plan</span>
                </Link>
                <ChevronRight className="w-4 h-4 relative group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            </div>

            {/* final reassurance */}
            <p className="text-xs text-slate-400">
              Free strategy call · No commitment · Reviewed within 24 hours
            </p>

            {/* stars row */}
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
              <span className="text-xs text-slate-500 ml-1.5">
                Rated 4.9/5 across 38 client reviews
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
