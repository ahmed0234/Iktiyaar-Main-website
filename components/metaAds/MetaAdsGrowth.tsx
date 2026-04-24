"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Users,
  Palette,
  MousePointerClick,
  ShoppingCart,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import WordReveal from "../seo/shared/WordReveal";

const funnelSteps = [
  {
    icon: Users,
    label: "Audience",
    color: "#3B82F6",
    bgFrom: "from-blue-50",
    bgTo: "to-blue-100/60",
    glowColor: "rgba(59,130,246,0.15)",
    description: "Precision targeting to reach your ideal customers",
  },
  {
    icon: Palette,
    label: "Creative",
    color: "#8B5CF6",
    bgFrom: "from-violet-50",
    bgTo: "to-violet-100/60",
    glowColor: "rgba(139,92,246,0.15)",
    description: "Scroll-stopping visuals designed to convert",
  },
  {
    icon: MousePointerClick,
    label: "Click",
    color: "#F59E0B",
    bgFrom: "from-amber-50",
    bgTo: "to-amber-100/60",
    glowColor: "rgba(245,158,11,0.15)",
    description: "Compelling CTAs that drive qualified traffic",
  },
  {
    icon: ShoppingCart,
    label: "Conversion",
    color: "#10B981",
    bgFrom: "from-emerald-50",
    bgTo: "to-emerald-100/60",
    glowColor: "rgba(16,185,129,0.15)",
    description: "Optimized funnels that turn clicks into customers",
  },
  {
    icon: RotateCcw,
    label: "Retargeting",
    color: "#EF4444",
    bgFrom: "from-red-50",
    bgTo: "to-red-100/60",
    glowColor: "rgba(239,68,68,0.15)",
    description: "Re-engage visitors to maximize every impression",
  },
];

/* ── Funnel Step Card ──────────────────────────────────────── */
function FunnelCard({
  step,
  idx,
  isInView,
}: {
  step: (typeof funnelSteps)[0];
  idx: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 250, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    springCfg
  );

  const Icon = step.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.3 + idx * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setHovered(false);
      }}
      className="group relative flex-1 min-w-[160px]"
      style={{ perspective: "700px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full"
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-[1px] rounded-3xl transition-all duration-700 pointer-events-none"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${step.glowColor}, transparent, ${step.glowColor})`
              : "transparent",
            boxShadow: hovered
              ? `0 0 50px 6px ${step.glowColor}, 0 25px 50px -15px ${step.glowColor}`
              : "none",
          }}
        />

        <div
          className={`relative h-full rounded-3xl px-6 py-8 transition-all duration-500 overflow-hidden text-center ${
            hovered
              ? "bg-white border border-blue-100/60 shadow-2xl"
              : "bg-white/70 backdrop-blur-sm border border-slate-100/80 shadow-lg shadow-slate-100/20"
          }`}
        >
          {/* Step number watermark */}
          <div
            className={`absolute top-3 right-4 text-5xl font-[900] select-none pointer-events-none transition-colors duration-500 ${
              hovered ? "text-blue-100/60" : "text-slate-100/40"
            }`}
          >
            {String(idx + 1).padStart(2, "0")}
          </div>

          {/* Icon */}
          <motion.div
            className="relative z-10 mb-5 flex justify-center"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.bgFrom} ${step.bgTo} flex items-center justify-center transition-all duration-500 ${
                hovered ? "shadow-lg" : ""
              }`}
              style={{
                boxShadow: hovered
                  ? `0 12px 30px ${step.glowColor}`
                  : "none",
              }}
            >
              <div
                className={`absolute w-16 h-16 rounded-2xl blur-xl transition-opacity duration-500 ${
                  hovered ? "opacity-50" : "opacity-0"
                }`}
                style={{ backgroundColor: `${step.color}20` }}
              />
              <Icon
                className="w-7 h-7 relative z-10"
                style={{ color: step.color }}
              />
            </div>
          </motion.div>

          {/* Label */}
          <h3
            className="relative z-10 text-lg font-bold text-slate-900 mb-2 tracking-tight"
            style={{ color: hovered ? step.color : undefined }}
          >
            {step.label}
          </h3>
          <p className="relative z-10 text-[13px] text-slate-500 leading-relaxed font-medium">
            {step.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] rounded-full"
            style={{
              background: `linear-gradient(to right, ${step.color}, ${step.color}99)`,
            }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────── */
export default function MetaAdsGrowth() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative py-22 sm:py-6 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-blue-50/15 blur-[150px] pointer-events-none" />

      {/* Dimensional Floating UI elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="max-w-[1600px] mx-auto h-full relative px-6">
          {/* Floating card — Top Left */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [80, -80]),
            }}
            className="absolute top-[8%] left-[2%] hidden xl:block"
          >
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [-1.5, 1.5, -1.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
              className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-blue-500/5 flex flex-col gap-2 min-w-[170px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Funnel Active
                </span>
              </div>
              <p className="text-xl font-[900] text-slate-800 leading-none">
                5-Step System
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Structured Scaling
              </p>
            </motion.div>
          </motion.div>

          {/* Floating card — Bottom Right */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [-40, 120]),
            }}
            className="absolute bottom-[12%] right-[-3%] hidden xl:block opacity-80"
          >
            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
              }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/60 backdrop-blur-md border border-white/70 shadow-xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[11px] font-[900] text-slate-700">
                <span className="text-emerald-600">+380%</span> Conversion
                Lift
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ──────────────────────────────────────── */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
          >
            Our Approach
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-5">
            <WordReveal text="We Turn Social Media" delay={0.1} />
            <br className="hidden sm:block" />{" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              <WordReveal text="Into a Growth Channel" delay={0.4} />
            </span>
          </h2>

          <motion.div
            className="mx-auto mt-5"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mx-auto" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 text-base lg:text-lg text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            At Ikhtiyaar, Meta Ads are not just about running campaigns —
            they&apos;re about building a system that drives consistent
            results. We combine{" "}
            <span className="text-slate-800 font-bold">data</span>,{" "}
            <span className="text-slate-800 font-bold">
              creative strategy
            </span>
            , and{" "}
            <span className="text-slate-800 font-bold">
              audience targeting
            </span>{" "}
            to deliver campaigns that don&apos;t just reach people — they
            convert them.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-4 text-base text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            From ad creatives to funnel alignment, everything is built with
            one goal:{" "}
            <span className="text-blue-600 font-bold">
              profitable growth
            </span>
            .
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="mt-3 text-sm text-slate-400 font-semibold tracking-wide"
          >
            No random boosting. No guesswork. Just structured scaling.
          </motion.p>
        </div>

        {/* ── Funnel Pipeline ─────────────────────────────── */}
        <div className="relative">
          {/* Connecting line behind cards */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-200/60 via-violet-200/40 to-emerald-200/60 z-0 origin-left"
          />

          {/* Chevron connectors */}
          <div className="hidden lg:flex absolute top-[60px] left-[10%] right-[10%] z-[2] justify-between px-[calc(50%/5)]">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.8 + i * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                className="w-7 h-7 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center"
              >
                <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
              </motion.div>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-[5]">
            {funnelSteps.map((step, idx) => (
              <FunnelCard
                key={step.label}
                step={step}
                idx={idx}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
