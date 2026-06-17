"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import {
  MapPin,
  Users,
  Star,
  Award,
  Heart,
  Zap,
  ShieldCheck,
  Smile,
  Clock,
  Quote,
  CheckCircle2,
  Sparkles,
  BadgeCheck,
  CalendarDays,
  Trophy,
} from "lucide-react";

// ─── Shared ease ─────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Dot-grid background (matches site pattern) ──────────────────────────────
function DotGrid({
  color = "#3b82f6",
  opacity = 0.022,
  size = 28,
}: {
  color?: string;
  opacity?: number;
  size?: number;
}) {
  const id = `md-dot-${size}`;
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

// ─── Word-by-word reveal (site-wide pattern) ─────────────────────────────────
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

// ─── 3-D tilt wrapper ─────────────────────────────────────────────────────────
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
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 180,
    damping: 22,
  });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
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

// ─── Clinic Key Facts ─────────────────────────────────────────────────────────
const facts = [
  {
    icon: CalendarDays,
    value: "2014",
    label: "Year Founded",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-100",
    glow: "rgba(37,99,235,0.10)",
  },
  {
    icon: MapPin,
    value: "Dubai, UAE",
    label: "Location",
    color: "text-sky-600",
    bg: "bg-sky-50 border-sky-100",
    glow: "rgba(14,165,233,0.10)",
  },
  {
    icon: Users,
    value: "12+",
    label: "Team Members",
    color: "text-violet-600",
    bg: "bg-violet-50 border-violet-100",
    glow: "rgba(139,92,246,0.10)",
  },
  {
    icon: Smile,
    value: "4,800+",
    label: "Patients Treated",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
    glow: "rgba(16,185,129,0.10)",
  },
  {
    icon: Star,
    value: "4.9 / 5",
    label: "Average Rating",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-100",
    glow: "rgba(245,158,11,0.10)",
  },
  {
    icon: Trophy,
    value: "18+",
    label: "Services Offered",
    color: "text-rose-600",
    bg: "bg-rose-50 border-rose-100",
    glow: "rgba(244,63,94,0.10)",
  },
] as const;

// ─── What Makes Dentish Different ─────────────────────────────────────────────
const pillars = [
  {
    icon: Heart,
    title: "Patient-First Philosophy",
    desc: "Every decision at Dentish starts with one question: what is best for this patient? Not the schedule, not the revenue the patient.",
    color: "from-rose-500 to-pink-400",
    bg: "bg-rose-50/60 border-rose-100",
    iconColor: "text-rose-500",
    glow: "rgba(244,63,94,0.08)",
  },
  {
    icon: Zap,
    title: "Modern Technology",
    desc: "Digital X-rays, 3D imaging, and same day crown technology deliver faster, more accurate treatments without the traditional discomfort.",
    color: "from-amber-500 to-yellow-400",
    bg: "bg-amber-50/60 border-amber-100",
    iconColor: "text-amber-500",
    glow: "rgba(245,158,11,0.08)",
  },
  {
    icon: ShieldCheck,
    title: "Clinically Verified Results",
    desc: "Every treatment plan is evidence-based and outcome-tracked. Patients leave with clarity on their dental health, not just a bill.",
    color: "from-blue-500 to-sky-400",
    bg: "bg-blue-50/60 border-blue-100",
    iconColor: "text-blue-500",
    glow: "rgba(37,99,235,0.08)",
  },
  {
    icon: Smile,
    title: "Comfort Centred Experience",
    desc: "From the moment patients walk in, the environment is designed to ease anxiety. Warm lighting, friendly staff, and zero judgment.",
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50/60 border-emerald-100",
    iconColor: "text-emerald-500",
    glow: "rgba(16,185,129,0.08)",
  },
] as const;

// ─── Founder Spotlight Card ───────────────────────────────────────────────────
function FounderCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <TiltCard className="relative">
        {/* Ambient glow behind card */}
        <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-blue-200/30 via-sky-100/20 to-transparent blur-3xl pointer-events-none" />

        <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/40">
          {/* Top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500" />

          {/* Founder image area */}
          <div className="relative h-72 sm:h-80 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
            <Image
              src="https://images.unsplash.com/photo-1685760259914-ee8d2c92d2e0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Dr. Sarah Mitchell, founder and owner of Dentish Dental Clinic"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 460px"
              priority
            />
            {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.6, ease: EASE }}
              className="absolute top-4 right-4"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-xl border border-blue-100 shadow-lg shadow-blue-500/10"
              >
                <BadgeCheck className="w-4 h-4 text-blue-600" />
                <span className="text-[11px] font-bold text-slate-700">
                  BDS, MDS — 14 yrs exp.
                </span>
              </motion.div>
            </motion.div>

            {/* Floating badge — top left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
              className="absolute top-4 left-4"
            >
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-100 shadow-lg shadow-amber-500/10"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-slate-700">
                  4.9 · 620+ reviews
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Founder details */}
          <div className="px-6 pb-6 -mt-2 relative z-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h3 className="font-poppins text-xl font-black text-slate-900 leading-tight">
                  Dr. Sarah Mitchell
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Founder & Principal Dentist · Dentish
                </p>
              </div>
              {/* Location badge */}
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                <MapPin className="w-3 h-3" />
                Dubai, UAE
              </span>
            </div>

            {/* Quote */}
            <div className="relative pl-4 border-l-[3px] border-blue-400/50">
              <Quote className="absolute -left-3 -top-1 w-5 h-5 text-blue-200 bg-white" />
              <p className="text-[15px] text-slate-700 leading-[1.5] font-medium italic">
                "We started Dentish with a simple belief exceptional dental
                care should feel accessible, comfortable, and completely
                trustworthy. Ten years later, that belief hasn't changed. It's
                only grown stronger."
              </p>
            </div>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Google Verified",
                "DHA Licensed",
                "ISO Certified",
              ].map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-700 uppercase tracking-wider"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Clinic Story (right side) ────────────────────────────────────────────────
function ClinicStory({ inView }: { inView: boolean }) {
  const milestones = [
    { year: "2014", event: "Dentish opens its first single chair practice in Jumeirah, Dubai, with Dr. Mitchell as the only dentist." },
    { year: "2017", event: "Expands to a full 4 chair clinic. Introduces digital X-ray and 3D scanning technology." },
    { year: "2020", event: "Weathers the pandemic by pivoting to emergency only care and building an online presence for the first time." },
    { year: "2022", event: "Crosses 3,000 active patients. Wins 'Best Dental Practice Dubai South' community award." },
    { year: "2024", event: "Partners with Ikhtiyaar to build a scalable patient acquisition system. Growth accelerates." },
  ];

  return (
    <div className="space-y-8">
      {/* Section intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
        className="space-y-4"
      >
        <p className="text-slate-700 text-base sm:text-[18px] leading-[1.75] font-medium">
          Dentish was never meant to be the biggest dental clinic in Dubai. It
          was meant to be the{" "}
          <span className="font-bold text-slate-900">most trusted one</span> in
          the neighbourhood.
        </p>
        <p className="text-slate-700 text-lg leading-[1.75] font-medium">
          Dr. Mitchell founded the practice after noticing a pattern: patients
          were leaving dental appointments more anxious than when they arrived,
          rushed through consultations, and unclear about their treatment options.
          She set out to fix that one appointment at a time.
        </p>
        <p className="text-slate-700 text-lg leading-[1.75] font-medium">
          A decade later, Dentish has become the go to clinic for families across
          Jumeirah and Umm Suqeim not through paid ads or aggressive marketing,
          but through{" "}
          <span className="font-semibold text-slate-700">
            word of mouth, 5 star reviews, and a relentless focus on patient
            outcomes.
          </span>
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
        className="space-y-0"
      >
        <p className="text-[14px] font-bold text-slate-700 uppercase tracking-[0.2em] mb-4">
          Growth Timeline
        </p>

        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.09 }}
            className="relative flex gap-4 pb-5 last:pb-0 group/mile"
          >
            {/* vertical line */}
            {i < milestones.length - 1 && (
              <div className="absolute left-[19px] top-[28px] bottom-0 w-px bg-gradient-to-b from-blue-200 to-slate-100" />
            )}

            {/* Year node */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center shadow-sm group-hover/mile:border-blue-400 group-hover/mile:shadow-md transition-all duration-300 z-10">
              <span className="text-[12px] font-black text-blue-600 leading-none text-center">
                {m.year.slice(2)}
                <br />
                <span className="text-[9px] opacity-60">{m.year.slice(0, 2)}</span>
              </span>
            </div>

            {/* Event text */}
            <div className="pt-2 pb-1">
              <p className="text-[14px] text-slate-600 leading-[1.6] font-medium group-hover/mile:text-slate-800 transition-colors duration-200">
                <span className="font-bold text-slate-800 mr-1">{m.year}.</span>
                {m.event}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission statement card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE, delay: 0.9 }}
        className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-gradient-to-br from-blue-50/60 to-white p-5 shadow-sm"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-sky-400" />
        <Sparkles className="w-5 h-5 text-blue-400 mb-2" />
        <p className="text-[13px] font-bold text-slate-500 uppercase tracking-widest mb-1">
          Mission
        </p>
        <p className="text-slate-800 text-lg font-semibold leading-[1.65]">
          "To make every patient feel seen, heard, and genuinely cared for 
          with clinical excellence that doesn't require them to compromise on
          comfort or clarity."
        </p>
        <p className="text-[14px] text-slate-500 font-semibold mt-2">
          — Dr. Sarah Mitchell, Founder
        </p>
      </motion.div>
    </div>
  );
}

// ─── Key Facts Row ─────────────────────────────────────────────────────────────
function FactsGrid({ inView }: { inView: boolean }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {facts.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -4, scale: 1.025 }}
            className="group/fact relative"
          >
            {/* hover glow */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover/fact:opacity-100 transition-all duration-500 pointer-events-none"
              style={{
                boxShadow: `0 0 24px 4px ${f.glow}, 0 12px 24px -8px ${f.glow}`,
              }}
            />

            <div className="relative overflow-hidden rounded-2xl border border-slate-100/80 bg-white/80 backdrop-blur-xl p-4 shadow-sm group-hover/fact:bg-white group-hover/fact:shadow-xl transition-all duration-300">
              {/* shimmer */}
              <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover/fact:opacity-100 transition-opacity duration-500">
                <motion.div
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg]"
                />
              </motion.div>

              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-xl border ${f.bg} mb-2.5`}>
                <Icon className={`w-4 h-4 ${f.color}`} strokeWidth={2} />
              </div>
              <p className="text-[18px] font-black text-slate-900 leading-none mb-0.5">
                {f.value}
              </p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {f.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Differentiator Pillar Cards ──────────────────────────────────────────────
function PillarCards({ inView }: { inView: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {pillars.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 28, scale: 0.93 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 + i * 0.1 }}
            whileHover={{ y: -5 }}
            className="group/pillar relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-400"
            style={{ boxShadow: `0 0 0 0 ${p.glow}` }}
          >
            {/* top gradient accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover/pillar:opacity-100 transition-opacity duration-400"
              style={{ background: `linear-gradient(to right, ${p.glow.replace("0.08", "1")}, transparent)` }}
            />

            {/* inner hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover/pillar:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ boxShadow: `inset 0 0 40px 0 ${p.glow}` }}
            />

            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 bg-gradient-to-br ${p.color} shadow-sm`}>
              <Icon className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <h4 className="font-poppins text-[15px] font-bold text-slate-900 mb-1.5">
              {p.title}
            </h4>
            <p className="text-[15px] text-slate-600 leading-[1.65] font-semibold">
              {p.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Trust & Credibility Rail ─────────────────────────────────────────────────
function TrustRail({ inView }: { inView: boolean }) {
  const items = [
    { icon: Award, label: "Best Dental Practice", sub: "Dubai South 2022", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
    { icon: BadgeCheck, label: "DHA Licensed", sub: "Dubai Health Authority", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    { icon: ShieldCheck, label: "ISO 9001:2015", sub: "Quality Certified", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
    { icon: Star, label: "4.9 ★ Average", sub: "620+ Google Reviews", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
    { icon: Heart, label: "Community Partner", sub: "Jumeirah Community", color: "text-rose-600", bg: "bg-rose-50 border-rose-100" },
  ] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.07 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${item.bg} shadow-sm hover:shadow-md transition-all duration-250 cursor-default`}
          >
            <div className={`w-7 h-7 rounded-lg ${item.bg} border flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-3.5 h-3.5 ${item.color}`} strokeWidth={2} />
            </div>
            <div>
              <p className={`text-[12px] font-bold ${item.color}`}>{item.label}</p>
              <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{item.sub}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function MeetDentish() {
  const sectionRef  = useRef<HTMLElement>(null);
  const topRef      = useRef<HTMLDivElement>(null);
  const founderRef  = useRef<HTMLDivElement>(null);
  const storyRef    = useRef<HTMLDivElement>(null);
  const factsRef    = useRef<HTMLDivElement>(null);
  const pillarsRef  = useRef<HTMLDivElement>(null);
  const trustRef    = useRef<HTMLDivElement>(null);

  const topInView     = useInView(topRef,     { once: true, margin: "-40px" });
  const founderInView = useInView(founderRef, { once: true, margin: "-40px" });
  const storyInView   = useInView(storyRef,   { once: true, margin: "-40px" });
  const factsInView   = useInView(factsRef,   { once: true, margin: "-40px" });
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-40px" });
  const trustInView   = useInView(trustRef,   { once: true, margin: "-40px" });

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="meet-dentish"
      className="relative bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 py-12 lg:py-12 overflow-hidden"
    >
      {/* ── Background layer ────────────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[700px] h-[700px] rounded-full bg-blue-400/[0.04] blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-sky-400/[0.035] blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-300/[0.03] blur-[120px]" />
        <DotGrid color="#3b82f6" opacity={0.018} size={30} />
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
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

        {/* ── Section Header ───────────────────────────────────────────────── */}
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
              The Clinic Behind The Growth Story
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="font-poppins text-4xl sm:text-5xl lg:text-[3.1rem] font-black text-slate-900 leading-[1.06] tracking-tight mb-5">
            <SplitReveal text="Meet" delay={0.05} />{" "}
            <SplitReveal text="Dentish" delay={0.12} isAccent />{" "}
            <br className="hidden sm:block" />
            <SplitReveal text="A Clinic Built On" delay={0.28} />{" "}
            <SplitReveal text="Trust." delay={0.44} />
          </h2>

          {/* Animated underline */}
          <motion.div
            className="mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={topInView ? { width: 64, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
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
            Before we get into the numbers, meet the practice we helped grow 
            a clinic with a decade of patient first care, a passionate founder,
            and a genuine reputation built through results, not promises.
          </motion.p>
        </div>

        {/* ── Founder + Clinic Story ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-12 xl:gap-16 items-start">
          {/* Founder Card */}
          <div ref={founderRef}>
            <FounderCard inView={founderInView} />
          </div>

          {/* Clinic Story */}
          <div ref={storyRef}>
            <ClinicStory inView={storyInView} />
          </div>
        </div>

        {/* ── Key Facts Grid ──────────────────────────────────────────────── */}
        <div ref={factsRef} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={factsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              By The Numbers
            </p>
            <h3 className="font-poppins text-2xl sm:text-3xl font-black text-slate-900">
              Dentish At A Glance
            </h3>
          </motion.div>
          <FactsGrid inView={factsInView} />
        </div>

        {/* ── What Makes Dentish Different ────────────────────────────────── */}
        <div ref={pillarsRef} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              The Difference
            </p>
            <h3 className="font-poppins text-2xl sm:text-3xl font-black text-slate-900 max-w-xl">
              What Makes Dentish Stand Out
            </h3>
          </motion.div>
          <PillarCards inView={pillarsInView} />
        </div>

        {/* ── Trust & Credibility Rail ─────────────────────────────────────── */}
        {/* <div ref={trustRef} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={trustInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
              Recognition & Trust
            </p>
            <h3 className="font-poppins text-xl sm:text-2xl font-black text-slate-900">
              Awards, Certifications & Community
            </h3>
          </motion.div>
          <TrustRail inView={trustInView} />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={trustInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="pt-4 flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
              Now, the challenge →
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-slate-200 to-transparent" />
          </motion.div>
        </div> */}

      </div>
    </section>
  );
}
