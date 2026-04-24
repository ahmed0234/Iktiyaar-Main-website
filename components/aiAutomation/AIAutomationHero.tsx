"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Workflow,
  Zap,
  Database,
  BarChart3,
  MessageSquare,
  Mail,
  FileText,
  ShoppingCart,
  Calendar,
  BrainCircuit,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// ─── Node Configuration ──────────────────────────────────────────────
// All positions as % of the square container. Both the connection beams
// AND the cards use these exact values, so alignment is guaranteed.
// ═══════════════════════════════════════════════════════════════════════
const automationNodes = [
  { icon: Mail, label: "Email", color: "#8B5CF6", x: 86, y: 50, delay: 0.8, dur: 7 },
  { icon: MessageSquare, label: "Chatbot", color: "#06B6D4", x: 71, y: 80, delay: 1.0, dur: 6.5 },
  { icon: Database, label: "CRM", color: "#3B82F6", x: 29, y: 80, delay: 1.2, dur: 7.5 },
  { icon: ShoppingCart, label: "Orders", color: "#10B981", x: 14, y: 50, delay: 1.4, dur: 6 },
  { icon: Calendar, label: "Schedule", color: "#F59E0B", x: 29, y: 20, delay: 1.6, dur: 8 },
  { icon: FileText, label: "Reports", color: "#EC4899", x: 71, y: 20, delay: 1.8, dur: 7 },
];

// ─── Connection Beam (from center to node) ─────────────────────────
function ConnectionBeam({
  x,
  y,
  color,
  delay,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
}) {
  const dx = x - 50;
  const dy = y - 50;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const length = Math.sqrt(dx * dx + dy * dy);

  return (
    <>
      {/* Static beam line */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          width: `${length}%`,
          height: "1px",
          transformOrigin: "left center",
          transform: `rotate(${angle}deg)`,
          background: `linear-gradient(to right, ${color}30, ${color}08)`,
        }}
      />

      {/* Animated pulse container — same rotation as beam */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          width: `${length}%`,
          height: "6px",
          transformOrigin: "left center",
          transform: `rotate(${angle}deg) translateY(-50%)`,
        }}
      >
        {/* Outward pulse */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px 2px ${color}50` }}
          animate={{ left: ["0%", "100%"], opacity: [0, 0.9, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
        {/* Return pulse (smaller, offset timing) */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px 1px ${color}40` }}
          animate={{ left: ["100%", "0%"], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: delay + 1.3,
            ease: "easeInOut",
          }}
        />
      </div>
    </>
  );
}

// ─── Node Card (positioned at beam endpoint) ───────────────────────
function NodeCard({
  icon: Icon,
  label,
  color,
  x,
  y,
  delay,
  dur,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  x: number;
  y: number;
  delay: number;
  dur: number;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 30,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay, type: "spring", stiffness: 120 }}
      >
        <motion.div
          animate={{
            y: [-4, 4, -4],
            rotate: [-0.8, 0.8, -0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: dur,
            ease: "easeInOut",
            delay: delay * 0.3,
          }}
          whileHover={{
            scale: 1.12,
            y: -10,
            boxShadow: `0 0 30px 8px ${color}20`,
          }}
          className="group/node relative flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-white/80 cursor-default transition-all duration-300"
        >
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover/node:shadow-lg"
            style={{ backgroundColor: `${color}12`, boxShadow: `0 4px 12px ${color}10` }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Live Processing Feed ─────────────────────────────────────────────
function ProcessingFeed() {
  const tasks = [
    { text: "Lead captured → CRM updated", icon: Database, color: "#3B82F6" },
    { text: "Email sequence triggered", icon: Mail, color: "#8B5CF6" },
    { text: "Invoice generated automatically", icon: FileText, color: "#10B981" },
    { text: "Workflow optimized → 3.2s saved", icon: Zap, color: "#F59E0B" },
    { text: "Customer reply → AI responded", icon: MessageSquare, color: "#06B6D4" },
    { text: "Report compiled & delivered", icon: BarChart3, color: "#EC4899" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % tasks.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const task = tasks[current];
  const TaskIcon = task.icon;

  return (
    <div className="h-7 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 absolute inset-0"
        >
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${task.color}15` }}
          >
            <TaskIcon className="w-3 h-3" style={{ color: task.color }} />
          </div>
          <span className="text-[10px] text-slate-600 font-medium whitespace-nowrap">
            {task.text}
          </span>
          <span className="relative flex h-1.5 w-1.5 ml-auto shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: task.color }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ backgroundColor: task.color }}
            />
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Animated Efficiency Meter ────────────────────────────────────────
function EfficiencyMeter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const target = 94;
    const step = target / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="3"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="url(#meterGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(value / 100) * 94.2} 94.2`}
            initial={{ strokeDasharray: "0 94.2" }}
            animate={{ strokeDasharray: `${(value / 100) * 94.2} 94.2` }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="meterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-[900] text-slate-700">
            {value}%
          </span>
        </div>
      </div>
      <div>
        <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
          Efficiency
        </p>
        <p className="text-xs font-[800] text-slate-800">Optimized</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ─── Main Hero Component ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
export default function AIAutomationHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 40 });

  const gridRotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const gridRotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const visualRotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const visualRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const visualX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const visualY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const floatX1 = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const floatY1 = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const floatX2 = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const floatY2 = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="ai-automation-hero"
      className="relative min-h-[85vh] pt-24 md:pt-16 overflow-hidden flex items-center bg-white group/hero"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Interactive Grid Background — Consistent with other pages */}
      <motion.div
        style={{ rotateX: gridRotateX, rotateY: gridRotateY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none origin-center"
      >
        <div
          className="w-[200vw] h-[200vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200/60 transition-colors duration-1000 group-hover/hero:text-blue-300/40"
          style={{
            backgroundImage: `radial-gradient(circle at center, transparent 10%, white 60%), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: `100% 100%, 70px 70px, 70px 70px`,
          }}
        />
      </motion.div>

      {/* Atmospheric orbs */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] right-[-10%] w-[700px] h-[700px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] bg-violet-50/40 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-cyan-200/15 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        style={{ y: parallaxY, scale: parallaxScale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ═══════════════════════════════════════════════════════
               LEFT SIDE — AI Core Visual System
              ═══════════════════════════════════════════════════════ */}
          <div
            className="w-full lg:w-[52%] relative flex items-center justify-center py-4 lg:py-0 order-2 lg:order-2"
            style={{ perspective: "900px" }}
          >
            {/* Ambient glow */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="absolute w-[380px] h-[380px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-br from-blue-200/30 via-violet-100/15 to-transparent blur-3xl z-0 pointer-events-none"
            />

            {/* Main 3D Tilting Container */}
            <motion.div
              initial={{ y: 50, scale: 0.92, opacity: 0, filter: "blur(12px)" }}
              animate={
                isInView
                  ? { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
                  : { y: 50, scale: 0.92, opacity: 0, filter: "blur(12px)" }
              }
              transition={{
                duration: 1.0,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                rotateX: visualRotateX,
                rotateY: visualRotateY,
                x: visualX,
                y: visualY,
              }}
              className="relative z-10 w-full max-w-[580px] aspect-square transform-gpu [transform-style:preserve-3d] overflow-visible"
            >
              {/* ── Orbital Rings (CSS) ── */}
              <div className="absolute inset-[35%] border border-blue-200/20 rounded-full pointer-events-none" />
              <motion.div
                className="absolute inset-[22%] border border-dashed border-violet-200/15 rounded-full pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[12%] border border-blue-200/10 rounded-full pointer-events-none"
                animate={{ rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[4%] border border-dashed border-slate-200/8 rounded-full pointer-events-none" />

              {/* ── Connection Beams (same coordinate system as cards) ── */}
              {automationNodes.map((node) => (
                <ConnectionBeam
                  key={`beam-${node.label}`}
                  x={node.x}
                  y={node.y}
                  color={node.color}
                  delay={node.delay}
                />
              ))}

              {/* ── Central AI Core ── */}
              <div
                className="absolute"
                style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 40px 10px rgba(59,130,246,0.12), 0 0 80px 30px rgba(139,92,246,0.06)",
                      "0 0 50px 15px rgba(59,130,246,0.18), 0 0 100px 40px rgba(139,92,246,0.10)",
                      "0 0 40px 10px rgba(59,130,246,0.12), 0 0 80px 30px rgba(139,92,246,0.06)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-3xl bg-white/95 backdrop-blur-2xl border border-blue-200/60 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                >
                  {/* Gradient shimmer behind logo */}
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(135deg, #3B82F615, #8B5CF615, #06B6D415)",
                        "linear-gradient(135deg, #8B5CF615, #06B6D415, #3B82F615)",
                        "linear-gradient(135deg, #06B6D415, #3B82F615, #8B5CF615)",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 pointer-events-none"
                  />

                  {/* AI Brain Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <div className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 text-white" />
                    </div>
                  </motion.div>
                  <span className="text-[9px] sm:text-[10px] font-[900] text-slate-600 tracking-[0.15em] uppercase mt-2 relative z-10">
                    AI Core
                  </span>

                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-3xl border-2 border-blue-400/30 pointer-events-none"
                  />
                </motion.div>
              </div>

              {/* ── Node Cards (same coordinate system as beams) ── */}
              {automationNodes.map((node) => (
                <NodeCard key={node.label} {...node} />
              ))}
            </motion.div>

            {/* ── Floating Badge — Top Right: Tasks Automated ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-[2%] lg:top-[0%] right-[0%] lg:right-[-18%] z-20 hidden sm:block"
            >
              <motion.div style={{ x: floatX1, y: floatY1 }}>
                <motion.div
                  animate={{ y: [-8, 10, -8], rotate: [-1, 2, -1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/70 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)] cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100/60 flex items-center justify-center shadow-sm">
                      <Workflow className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                        Tasks Automated
                      </p>
                      <p className="text-sm font-[900] text-slate-900">
                        2,847{" "}
                        <span className="text-violet-500 text-[10px] font-bold">
                          /month
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Floating Badge — Bottom Left: Time Saved ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-[4%] lg:bottom-[-2%] left-[-2%] lg:left-[-10%] z-20 hidden sm:block"
            >
              <motion.div style={{ x: floatX2, y: floatY2 }}>
                <motion.div
                  animate={{
                    y: [10, -8, 10],
                    rotate: [1.5, -1.5, 1.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/70 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(16,185,129,0.15)] cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 flex items-center justify-center shadow-sm">
                      <Zap className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                        Hours Saved Weekly
                      </p>
                      <p className="text-sm font-[900] text-slate-900">
                        120+{" "}
                        <span className="text-emerald-500 text-[10px] font-bold">
                          hrs
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════
               RIGHT SIDE — Text Content
              ═══════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left z-10 order-1 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: 20, filter: "blur(8px)" }
              }
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-6 inline-flex items-center space-x-2 rounded-full border border-violet-200/60 bg-violet-50/50 px-4 py-1.5 text-sm font-semibold text-violet-700 backdrop-blur-md hover:bg-violet-50/80 hover:border-violet-300/60 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600" />
              </span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                AI Automation
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-[900] tracking-tight text-slate-900 leading-[1.05] mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", rotateX: -40 }}
                  animate={
                    isInView
                      ? { y: "0%", rotateX: 0 }
                      : { y: "100%", rotateX: -40 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "bottom center" }}
                >
                  Automate. Optimize.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", rotateX: -40 }}
                  animate={
                    isInView
                      ? { y: "0%", rotateX: 0 }
                      : { y: "100%", rotateX: -40 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "bottom center" }}
                >
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-500 to-blue-400">
                      Scale Intelligently
                    </span>
                    <motion.svg
                      className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-violet-500/40 overflow-visible pointer-events-none"
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M 2 8 C 50 2 150 2 198 10"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={
                          isInView
                            ? { pathLength: 1, opacity: 1 }
                            : { pathLength: 0, opacity: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          delay: 1.2,
                          ease: "easeOut",
                        }}
                      />
                    </motion.svg>
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 25, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.6,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lg text-slate-500 mb-5 max-w-lg leading-relaxed font-medium"
            >
              Ikhtiyaar builds powerful AI automation systems that streamline
              your operations, eliminate manual work, and help your business
              run smarter&nbsp;&mdash; 24/7.
            </motion.p>

            {/* Live Processing Mini Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mb-8 w-full max-w-sm"
            >
              <div className="bg-slate-50/60 rounded-xl px-4 py-2.5 border border-slate-100/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold text-slate-400 tracking-[0.15em] uppercase">
                    Live Automations
                  </span>
                  <EfficiencyMeter />
                </div>
                <ProcessingFeed />
              </div>
            </motion.div>

            {/* CTA + Stats */}
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 25, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.6,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group/btn relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-[#ff6a3d] to-[#e84e1b] px-10 py-5 font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,106,61,0.3)] hover:shadow-[0_20px_50px_rgba(255,106,61,0.45)] border border-[#ff6a3d]/40 ring-1 ring-inset ring-white/20 cursor-pointer"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#ff6a3d] via-[#ff8863] to-[#ff6a3d] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute inset-0 z-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none group-hover/btn:via-white/35 transition-all duration-500"
                  />
                  <span className="relative z-10 tracking-wide text-[17px] drop-shadow-md">
                    Get Your Custom Plan
                  </span>
                  <ArrowRight
                    strokeWidth={2.5}
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                  />
                </motion.div>
              </Link>

              {/* Inline stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex items-center gap-6 text-sm"
              >
                <div className="flex flex-col group/stat cursor-default">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="text-2xl font-[900] text-slate-900 transition-colors duration-300 group-hover/stat:text-violet-600"
                  >
                    10x
                  </motion.span>
                  <span className="text-slate-400 font-medium text-xs">
                    Faster Ops
                  </span>
                </div>
                <div className="w-px h-10 bg-slate-200/80" />
                <div className="flex flex-col group/stat cursor-default">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="text-2xl font-[900] text-slate-900 transition-colors duration-300 group-hover/stat:text-violet-600"
                  >
                    24/7
                  </motion.span>
                  <span className="text-slate-400 font-medium text-xs">
                    Always On
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
