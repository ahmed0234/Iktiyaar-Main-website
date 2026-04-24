"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Search,
  Rocket,
  TrendingUp,
  Target,
  BarChart3,
  MousePointerClick,
} from "lucide-react";
import WordReveal from "../seo/shared/WordReveal";

const approachSteps = [
  {
    step: "01",
    title: "Strategy & Research",
    subtitle: "Build the Foundation",
    description:
      "We start by understanding your audience, search intent, and business goals to craft a data-driven advertising blueprint. Every campaign begins with clarity — not guesswork.",
    details: [
      "Extensive keyword & search intent research",
      "Competitor ad intelligence & bid analysis",
      "Custom account structure aligned to your goals",
    ],
    icon: Search,
    accentIcon: Target,
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    gradientBg: "from-blue-600/10 via-blue-500/5 to-cyan-400/10",
    color: "#3B82F6",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    step: "02",
    title: "Launch & Test",
    subtitle: "Deploy with Precision",
    description:
      "We launch campaigns with multiple ad copy variations and keyword match types, then rigorously test what performs best. Every dollar is monitored from day one.",
    details: [
      "A/B testing ad copy and extensions",
      "Match type testing & negative keyword mapping",
      "Real-time bid adjustments & budget allocation",
    ],
    icon: Rocket,
    accentIcon: MousePointerClick,
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    gradientBg: "from-violet-600/10 via-purple-500/5 to-fuchsia-400/10",
    color: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    step: "03",
    title: "Optimize & Scale",
    subtitle: "Compound Your Growth",
    description:
      "We refine winning campaigns, eliminate waste, and scale what works — turning initial traction into predictable, profitable growth that compounds month over month.",
    details: [
      "Continuous search term filtering",
      "Profitable scaling via ROAS/CPA bidding",
      "Landing page & quality score optimization",
    ],
    icon: TrendingUp,
    accentIcon: BarChart3,
    gradient: "from-emerald-600 via-green-500 to-teal-400",
    gradientBg: "from-emerald-600/10 via-green-500/5 to-teal-400/10",
    color: "#10B981",
    glowColor: "rgba(16,185,129,0.15)",
  },
];

/* ── Approach Card with 3D Tilt ──────────────────────────── */
function ApproachCard({
  step,
  idx,
  isInView,
}: {
  step: (typeof approachSteps)[0];
  idx: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 250, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springCfg
  );
  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [15, 85]),
    springCfg
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, 85]),
    springCfg
  );

  const Icon = step.icon;
  const AccentIcon = step.accentIcon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.25 + idx * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setHovered(false);
      }}
      className="group relative"
      style={{ perspective: "800px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: hovered ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="relative h-full"
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-[1px] rounded-[2rem] transition-all duration-700 pointer-events-none"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${step.glowColor}, transparent, ${step.glowColor})`
              : "transparent",
            boxShadow: hovered
              ? `0 0 60px 8px ${step.glowColor}, 0 30px 60px -20px ${step.glowColor}`
              : "none",
          }}
        />

        <div
          className={`relative h-full rounded-[2rem] overflow-hidden transition-all duration-500 ${
            hovered
              ? "bg-white shadow-2xl shadow-slate-200/50 border border-slate-100/80"
              : "bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-100/30 border border-slate-100/60"
          }`}
        >
          {/* Mouse-tracking glare */}
          <motion.div
            className="absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-400"
            style={{
              opacity: hovered ? 0.6 : 0,
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, ${step.glowColor} 10%, transparent 50%)`
              ),
            }}
          />

          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute w-[150%] h-[200%] bg-gradient-to-br from-white/30 via-transparent to-transparent"
              animate={{
                x: hovered ? ["-150%", "100%"] : "-150%",
                rotate: 25,
              }}
              transition={{
                x: hovered
                  ? { duration: 0.9, ease: "easeInOut" }
                  : { duration: 0 },
              }}
              style={{ top: "-50%", left: "-25%" }}
            />
          </motion.div>

          {/* ── Gradient header bar ── */}
          <div
            className={`relative h-2 w-full bg-gradient-to-r ${step.gradient}`}
          >
            <motion.div
              className="absolute inset-0 bg-white/30"
              animate={{ opacity: hovered ? 0 : 0.3 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="px-8 pt-8 pb-9 relative z-10">
            {/* Step number + Icon row */}
            <div className="flex items-start justify-between mb-7">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <motion.div
                  animate={{ scale: hovered ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradientBg} flex items-center justify-center transition-all duration-500`}
                  style={{
                    boxShadow: hovered
                      ? `0 12px 30px ${step.glowColor}`
                      : "none",
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: step.color }} />
                </motion.div>

                {/* Step number */}
                <div>
                  <span
                    className="text-[11px] font-[800] uppercase tracking-[0.2em] transition-colors duration-300"
                    style={{ color: hovered ? step.color : "#94A3B8" }}
                  >
                    Step {step.step}
                  </span>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {/* Accent icon watermark */}
              <div
                className={`transition-all duration-500 ${
                  hovered ? "opacity-20 scale-110" : "opacity-[0.06] scale-100"
                }`}
              >
                <AccentIcon
                  className="w-16 h-16"
                  style={{ color: step.color }}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-2xl font-[900] tracking-tight text-slate-900 mb-3 transition-colors duration-300"
              style={{ color: hovered ? step.color : undefined }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-[15px] text-slate-500 leading-relaxed font-medium mb-6">
              {step.description}
            </p>

            {/* Detail bullets */}
            <div className="space-y-2.5">
              {step.details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + idx * 0.15 + i * 0.08,
                  }}
                  className="flex items-center gap-3 group/item"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover/item:scale-150"
                    style={{ backgroundColor: step.color }}
                  />
                  <span className="text-[13px] text-slate-500 font-medium leading-snug">
                    {detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] rounded-full"
            style={{
              background: `linear-gradient(to right, ${step.color}, ${step.color}80)`,
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
export default function GoogleAdsApproach() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Atmospheric glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], x: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-80px] left-[-120px] w-[700px] h-[700px] rounded-full bg-blue-50/25 blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.05, 1, 1.05], y: [0, 25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-60px] right-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-50/20 blur-[110px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ──────────────────────────────── */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
          >
            How We Work
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-5">
            <WordReveal text="Our Google Ads" delay={0.1} />
            <br className="hidden sm:block" />{" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              <WordReveal text="Approach" delay={0.4} />
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
            className="mt-5 text-base lg:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            A proven 3-step framework that transforms ad spend into predictable
            revenue built for clarity, powered by data, designed to scale.
          </motion.p>
        </div>

        {/* ── Step connector — Desktop only ───────────────── */}
        <div className="relative hidden lg:block mb-4">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              duration: 1.4,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-0 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-blue-300/40 via-violet-300/30 to-emerald-300/40 origin-left z-0"
          />
          {/* Step dots on the connector */}
          <div className="flex justify-between px-[calc(100%/6)]">
            {approachSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + idx * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className="w-4 h-4 rounded-full border-[3px] bg-white relative -top-[7px] z-10"
                style={{ borderColor: step.color }}
              />
            ))}
          </div>
        </div>

        {/* ── Cards Grid ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {approachSteps.map((step, idx) => (
            <ApproachCard
              key={step.step}
              step={step}
              idx={idx}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Bottom tagline ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-center mt-14 lg:mt-16"
        >
          <p className="text-sm text-slate-400 font-semibold tracking-wide">
            No wasted budget. No guesswork.{" "}
            <span className="text-blue-600 font-bold">
              Just structured scaling.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
