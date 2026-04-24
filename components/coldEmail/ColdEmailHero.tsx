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
  TrendingUp,
  Target,
  Mail,
  Send,
  Users,
  MessageCircle,
  BarChart3,
  MailOpen,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";

// ─── Animated Analytics Graph ─────────────────────────────────────────
function AnimatedGraph() {
  const [points, setPoints] = useState<number[]>([]);
  const [targetPoints, setTargetPoints] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with upward-trending data
    const initial = Array.from({ length: 12 }, (_, i) => {
      const trend = 30 + (i / 11) * 40;
      return trend + (Math.random() - 0.4) * 15;
    });
    setPoints(initial);
    setTargetPoints(initial);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetPoints((prev) => {
        if (prev.length === 0) return prev;
        return prev.map((p, i) => {
          const trend = 30 + (i / 11) * 40;
          const newVal = trend + (Math.random() - 0.4) * 18;
          return Math.max(10, Math.min(85, newVal));
        });
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (targetPoints.length === 0) return;
    let raf: number;
    const animate = () => {
      setPoints((prev) => {
        if (prev.length === 0) return targetPoints;
        return prev.map((p, i) => p + (targetPoints[i] - p) * 0.08);
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [targetPoints]);

  if (points.length === 0) return null;

  const width = 280;
  const height = 90;
  const stepX = width / (points.length - 1);

  const pathData = points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - (p / 100) * height;
      if (i === 0) return `M ${x} ${y}`;
      const prevX = (i - 1) * stepX;
      const prevY = height - (points[i - 1] / 100) * height;
      const cpx1 = prevX + stepX * 0.4;
      const cpx2 = x - stepX * 0.4;
      return `C ${cpx1} ${prevY} ${cpx2} ${y} ${x} ${y}`;
    })
    .join(" ");

  const areaPath = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="graphGradientCE" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="lineGradientCE" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((y) => (
        <line
          key={y}
          x1="0"
          y1={height * y}
          x2={width}
          y2={height * y}
          stroke="#e2e8f0"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />
      ))}
      <path d={areaPath} fill="url(#graphGradientCE)" />
      <path
        d={pathData}
        fill="none"
        stroke="url(#lineGradientCE)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={width}
        cy={height - (points[points.length - 1] / 100) * height}
        r="4"
        fill="#3b82f6"
        stroke="white"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          values="4;6;4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx={width}
        cy={height - (points[points.length - 1] / 100) * height}
        r="8"
        fill="#3b82f6"
        opacity="0.15"
      >
        <animate
          attributeName="r"
          values="8;14;8"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.15;0.05;0.15"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Live Email Activity Feed ─────────────────────────────────────────────
function LiveEmailNotifications() {
  const notifications = [
    { text: "Email opened by CEO at Acme Corp", icon: MailOpen, color: "#3b82f6" },
    { text: "Reply received — 'Let's chat'", icon: MessageCircle, color: "#10b981" },
    { text: "Meeting booked with TechFlow", icon: CheckCircle2, color: "#8b5cf6" },
    { text: "Follow-up sequence activated", icon: Send, color: "#f59e0b" },
    { text: "Link clicked in campaign", icon: Target, color: "#3b82f6" },
  ];

  const [currentNotif, setCurrentNotif] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotif((prev) => (prev + 1) % notifications.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const notif = notifications[currentNotif];
  const Icon = notif.icon;

  return (
    <div className="h-7 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNotif}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 absolute inset-0"
        >
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${notif.color}15` }}
          >
            <Icon className="w-3 h-3" style={{ color: notif.color }} />
          </div>
          <span className="text-[10px] text-slate-600 font-medium whitespace-nowrap">
            {notif.text}
          </span>
          <span className="relative flex h-1.5 w-1.5 ml-auto shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: notif.color }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ backgroundColor: notif.color }}
            />
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Flowing Envelopes Animation ─────────────────────────────────────
function FlowingEnvelopes() {
  const envelopeColors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -50, y: 50 + Math.random() * 100, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: 400 + Math.random() * 50,
            y: -50 + Math.random() * -100,
            scale: [0.5, 1, 1, 0.5],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ left: "-10%", bottom: "20%" }}
        >
          <div
            className="w-8 h-6 rounded-md shadow-sm border border-white/50 backdrop-blur-sm flex items-center justify-center"
            style={{
              backgroundColor: `${envelopeColors[i % envelopeColors.length]}15`,
            }}
          >
            <Send
              className="w-3.5 h-3.5"
              style={{ color: envelopeColors[i % envelopeColors.length] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════
// ─── Main Hero Component ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
export default function ColdEmailHero() {
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

  // ─── Metric data for animated mini cards ───────────────────────────
  const metrics = [
    { label: "Emails Sent", value: "1,250", color: "#3b82f6", icon: Send, trend: "↑ 32%" },
    { label: "Replies", value: "180", color: "#10b981", icon: MessageCircle, trend: "↑ 24%" },
    { label: "Qualified Leads", value: "45", color: "#8b5cf6", icon: Users, trend: "↑ 28%" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="cold-email-hero"
      className="relative min-h-[85vh] pt-24 md:pt-16 overflow-hidden flex items-center bg-white group/hero"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Interactive Grid Background */}
      <motion.div
        style={{ rotateX: gridRotateX, rotateY: gridRotateY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none origin-center"
      >
        <div
          className="w-[200vw] h-[200vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-100/60 transition-colors duration-1000 group-hover/hero:text-blue-200/50"
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
        className="absolute top-[-5%] right-[-10%] w-[700px] h-[700px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        style={{ y: parallaxY, scale: parallaxScale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ═══════════════════════════════════════════════════════
               LEFT SIDE — Text Content
              ═══════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left z-10 order-2 lg:order-1 pt-10 lg:pt-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: -20, filter: "blur(8px)" }
              }
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-200/60 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 backdrop-blur-md hover:bg-blue-50/80 hover:border-blue-300/60 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                Targeted Outreach
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
                  Turn Cold Outreach
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
                  className="inline-block will-change-transform pb-2"
                  style={{ transformOrigin: "bottom center" }}
                >
                  Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Warm Opportunities</span>
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="text-[1.05rem] lg:text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-medium"
            >
              Ikhtiyaar builds targeted cold email systems that connect you with the right prospects, start real conversations, and generate consistent, qualified leads.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/contact" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
                <button className="relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  Get a Lead Generation Plan
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════
               RIGHT SIDE — Dynamic Animated Visual System
              ═══════════════════════════════════════════════════════ */}
          <div
            className="w-full lg:w-[52%] relative flex items-center justify-center py-4 lg:py-0 order-1 lg:order-2"
            style={{ perspective: "900px" }}
          >
            {/* Ambient glow */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="absolute w-[380px] h-[380px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/20 to-transparent blur-3xl z-0 pointer-events-none"
            />

            {/* Main 3D Tilting Visual Container */}
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
              className="relative z-10 w-full max-w-[540px] transform-gpu [transform-style:preserve-3d]"
            >
              <FlowingEnvelopes />
              
              {/* Drop shadow layer */}
              <div className="absolute inset-4 rounded-3xl bg-slate-900/[0.06] blur-2xl -z-10 translate-y-6" />

              {/* ── Dashboard Card ──────────────────────────── */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_25px_60px_rgba(0,0,0,0.08),0_6px_20px_rgba(0,0,0,0.04)] overflow-hidden relative">
                
                {/* Header — Campaign Dashboard */}
                <div className="px-5 pt-4 pb-3 border-b border-slate-100/80 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-[15px] font-bold text-slate-800 tracking-tight block">
                          Cold Email Campaign
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Sending active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Metrics Row ────────────────────────────── */}
                <div className="px-5 py-4 grid grid-cols-3 gap-3 border-b border-slate-100/60">
                  {metrics.map((slot, i) => {
                    const Icon = slot.icon;
                    return (
                      <motion.div
                        key={slot.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                        className="group/metric flex flex-col items-start p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-default relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-slate-50 rounded-full blur-xl -translate-y-8 translate-x-8 group-hover/metric:to-blue-50 transition-colors" />
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center mb-2 transition-transform duration-300 group-hover/metric:scale-110"
                          style={{ backgroundColor: `${slot.color}15` }}
                        >
                          <Icon
                            className="w-3.5 h-3.5"
                            style={{ color: slot.color }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase mb-0.5">
                          {slot.label}
                        </span>
                        <div className="flex items-baseline gap-1.5 w-full">
                          <span className="text-sm font-[900] text-slate-800">
                            {slot.value}
                          </span>
                          <span className="text-[9px] font-bold text-emerald-500 ml-auto">
                            {slot.trend}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Analytics Graph ───────────────────────── */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-slate-400" />
                      <span className="text-[12px] font-bold text-slate-700 tracking-wide">
                        Response Rate
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <ChevronUp className="w-3 h-3 text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-600">
                        +14.2%
                      </span>
                    </div>
                  </div>
                  <div className="h-[90px] relative">
                    <AnimatedGraph />
                  </div>
                </div>

                {/* ── Live Activity Feed ────────────────────── */}
                <div className="px-5 pb-5 pt-1 bg-slate-50/30">
                  <div className="bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase">
                        Recent Activity
                      </span>
                      <span className="flex items-center gap-1 text-[9px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <LiveEmailNotifications />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Flow Roadmap Badges ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-[5%] lg:top-[-5%] right-[-5%] lg:right-[-16%] z-20 hidden sm:block"
            >
              <motion.div style={{ x: floatX1, y: floatY1 }}>
                <motion.div
                  animate={{ y: [-8, 10, -8] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Step 1</p>
                    <p className="text-xs font-bold text-slate-800">Target Prospects</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-[45%] right-[-5%] lg:right-[-12%] z-20 hidden sm:block"
            >
              <motion.div style={{ x: floatX2, y: floatY2 }}>
                <motion.div
                  animate={{ y: [10, -8, 10] }}
                  transition={{
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Send className="w-4 h-4 text-indigo-600 ml-1" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Step 2</p>
                    <p className="text-xs font-bold text-slate-800">Email Sequence</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-[5%] lg:bottom-[-10%] left-[10%] lg:left-[-10%] z-20 hidden sm:block"
            >
              <motion.div style={{ x: floatX1, y: floatY1 }}>
                <motion.div
                  animate={{ y: [-5, 8, -5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6.5,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Step 3</p>
                    <p className="text-xs font-bold text-slate-800">Reply & Convert</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </motion.div>
    </section>
  );
}
