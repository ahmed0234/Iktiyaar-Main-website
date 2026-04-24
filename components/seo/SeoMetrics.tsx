"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ── Animated Counter ──────────────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }
    let start = 0;
    const end = target;
    const timer = setInterval(() => {
      start += Math.ceil(end / 55);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, (duration * 1000) / end);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Metric Card with 3D tilt ──────────────────────────────────────── */
function MetricCard({
  metric,
  idx,
  isInView,
}: {
  metric: { value: number; suffix: string; label: string; accent: string };
  idx: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 250, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), springCfg);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), springCfg);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.92 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
      style={{ perspective: "600px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Outer glow ring */}
        <div
          className="absolute -inset-[1px] rounded-3xl transition-all duration-500 pointer-events-none"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${metric.accent}15, transparent, ${metric.accent}10)`
              : "transparent",
            boxShadow: hovered
              ? `0 0 40px 4px ${metric.accent}08, 0 20px 40px -15px ${metric.accent}12`
              : "none",
          }}
        />

        <div
          className={`relative text-center px-6 py-8 sm:py-10 rounded-3xl bg-white/75 backdrop-blur-md border transition-all duration-500 overflow-hidden ${
            hovered
              ? "border-blue-100/60 shadow-2xl shadow-blue-500/[0.06]"
              : "border-slate-100/80 shadow-lg shadow-slate-100/30"
          }`}
        >
          {/* Cursor-tracking glare */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-400"
            style={{
              opacity: hovered ? 0.5 : 0,
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, ${metric.accent}08 0%, transparent 60%)`
              ),
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.p
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="text-4xl sm:text-5xl font-[900] text-slate-900 mb-2 tracking-tight"
            >
              <AnimatedCounter target={metric.value} suffix={metric.suffix} />
            </motion.p>
            <p className="text-sm text-slate-500 font-semibold">{metric.label}</p>
          </div>

          {/* Decorative accent line at bottom */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${metric.accent}, transparent)` }}
            animate={{ width: hovered ? "60%" : "0%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Export ────────────────────────────────────────────────────── */
const metrics = [
  { value: 250, suffix: "%", label: "Average Traffic Increase", accent: "#3b82f6" },
  { value: 47, suffix: "+", label: "Page 1 Rankings Achieved", accent: "#6366f1" },
  { value: 3, suffix: "x", label: "Return on Investment", accent: "#0ea5e9" },
  { value: 98, suffix: "%", label: "Client Retention Rate", accent: "#8b5cf6" },
];

export default function SeoMetrics() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-12 overflow-hidden bg-gradient-to-b from-slate-50/50 to-white"
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {metrics.map((metric, idx) => (
            <MetricCard key={idx} metric={metric} idx={idx} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
