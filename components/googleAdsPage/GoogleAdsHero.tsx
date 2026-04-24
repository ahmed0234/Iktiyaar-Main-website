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
  Search,
  BarChart3,
  MousePointerClick,
  Target,
  Zap,
  Eye,
  DollarSign,
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
        <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4285F4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4285F4" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#34A853" />
          <stop offset="100%" stopColor="#4285F4" />
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
      <path d={areaPath} fill="url(#graphGradient)" />
      <path
        d={pathData}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Current point indicator */}
      <circle
        cx={width}
        cy={height - (points[points.length - 1] / 100) * height}
        r="4"
        fill="#4285F4"
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
        fill="#4285F4"
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

// ─── Typing Search Bar ────────────────────────────────────────────────
function TypingSearchBar() {
  const queries = [
    "best plumber near me",
    "digital marketing agency",
    "buy running shoes online",
    "emergency dentist open now",
    "web design services Dubai",
  ];
  const [currentQuery, setCurrentQuery] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const query = queries[currentQuery];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < query.length) {
      timeout = setTimeout(
        () => {
          setDisplayed(query.slice(0, displayed.length + 1));
        },
        60 + Math.random() * 40,
      );
    } else if (!isDeleting && displayed.length === query.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => {
          setDisplayed(displayed.slice(0, -1));
        },
        25 + Math.random() * 15,
      );
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentQuery((prev) => (prev + 1) % queries.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentQuery]);

  return (
    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-0.5 text-[14px] font-medium select-none shrink-0">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
      </div>
      <div className="w-px h-4 bg-slate-200" />
      <div className="flex-1 relative overflow-hidden">
        <span className="text-[12px] text-slate-700 font-medium whitespace-nowrap">
          {displayed}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block w-[2px] h-[13px] bg-blue-500 ml-[1px] align-middle"
          />
        </span>
      </div>
      <Search className="w-3.5 h-3.5 text-blue-500 shrink-0" />
    </div>
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

// ─── Live Ad Notification ─────────────────────────────────────────────
function LiveAdNotifications() {
  const notifications = [
    {
      text: "Ad clicked — 'plumber near me'",
      icon: MousePointerClick,
      color: "#4285F4",
    },
    { text: "Conversion tracked — Lead form", icon: Target, color: "#34A853" },
    { text: "Impression — Shopping Ad", icon: Eye, color: "#FBBC05" },
    { text: "CPC optimized — $0.47", icon: DollarSign, color: "#4285F4" },
    { text: "Quality Score → 9/10", icon: Zap, color: "#34A853" },
    {
      text: "Ad clicked — 'buy shoes online'",
      icon: MousePointerClick,
      color: "#EA4335",
    },
  ];

  const [currentNotif, setCurrentNotif] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotif((prev) => (prev + 1) % notifications.length);
    }, 3000);
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

// ═══════════════════════════════════════════════════════════════════════
// ─── Main Hero Component ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
export default function GoogleAdsHero() {
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

  // ─── Ad slot data for animated mini cards ───────────────────────────
  const adSlots = [
    { label: "Search Ads", value: "3.5x ROAS", color: "#4285F4", icon: Search },
    { label: "Display Ads", value: "2.1M Reach", color: "#34A853", icon: Eye },
    {
      label: "Shopping Ads",
      value: "$12 CPA",
      color: "#FBBC05",
      icon: DollarSign,
    },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="google-ads-hero"
      className="relative min-h-[85vh] pt-24 md:pt-16 overflow-hidden flex items-center bg-white group/hero"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Interactive Grid Background */}
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
        className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-blue-300/15 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        style={{ y: parallaxY, scale: parallaxScale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ═══════════════════════════════════════════════════════
               LEFT SIDE — Dynamic Animated Visual System
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
              className="absolute w-[380px] h-[380px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-br from-blue-200/30 via-blue-100/10 to-transparent blur-3xl z-0 pointer-events-none"
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
              className="relative z-10 w-full max-w-[500px] transform-gpu [transform-style:preserve-3d]"
            >
              {/* Drop shadow layer */}
              <div className="absolute inset-4 rounded-3xl bg-slate-900/[0.06] blur-2xl -z-10 translate-y-6" />

              {/* ── Dashboard Card ──────────────────────────── */}
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-[0_25px_60px_rgba(0,0,0,0.08),0_6px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                {/* Header — Google Ads branding */}
                <div className="px-5 pt-4 pb-3 border-b border-slate-100/80">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      {/* Google Ads Logo Triangle */}
                      <div className="w-8 h-8 relative flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" className="w-7 h-7">
                          <circle cx="6" cy="19" r="3.5" fill="#FBBC05" />
                          <path
                            d="M15.5 3.5L5.5 20l3 1.7L18.5 5.2z"
                            fill="#4285F4"
                          />
                          <path
                            d="M18.5 5.2L8.5 21.9l3 1.6L21.5 7z"
                            fill="#34A853"
                          />
                          <path
                            d="M6 16l3 1.7L18.5 5.2 15.5 3.5z"
                            fill="#4285F4"
                          />
                          <circle cx="18" cy="5" r="3.5" fill="#EA4335" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[15px] font-bold text-slate-800 tracking-tight">
                          Google Ads
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium ml-1.5">
                          Dashboard
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        Live
                      </div>
                    </div>
                  </div>

                  {/* Search Bar with typing animation */}
                  <TypingSearchBar />
                </div>

                {/* ── Metrics Row ────────────────────────────── */}
                <div className="px-5 py-3 grid grid-cols-3 gap-3 border-b border-slate-100/60">
                  {adSlots.map((slot, i) => {
                    const Icon = slot.icon;
                    return (
                      <motion.div
                        key={slot.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                        className="group/metric flex flex-col items-center text-center p-2.5 rounded-xl hover:bg-slate-50/80 transition-all duration-300 cursor-default"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-transform duration-300 group-hover/metric:scale-110"
                          style={{ backgroundColor: `${slot.color}12` }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: slot.color }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold tracking-wide">
                          {slot.label}
                        </span>
                        <span className="text-[13px] font-[900] text-slate-800">
                          {slot.value}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Analytics Graph ───────────────────────── */}
                <div className="px-5 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-bold text-slate-600 tracking-wide">
                        Campaign Performance
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChevronUp className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-500">
                        +24.7%
                      </span>
                    </div>
                  </div>
                  <div className="h-[90px] relative">
                    <AnimatedGraph />
                  </div>
                </div>

                {/* ── Live Activity Feed ────────────────────── */}
                <div className="px-5 pb-4 pt-1">
                  <div className="bg-slate-50/60 rounded-xl px-3 py-2 border border-slate-100/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-bold text-slate-400 tracking-[0.15em] uppercase">
                        Live Activity
                      </span>
                      <span className="text-[9px] text-slate-300 font-medium">
                        Just now
                      </span>
                    </div>
                    <LiveAdNotifications />
                  </div>
                </div>

                {/* ── Simulated Ad Result Preview ───────────── */}
                <div className="px-5 pb-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    className="group/ad relative p-3.5 rounded-xl border border-slate-100/80 bg-white hover:bg-blue-50/30 hover:border-blue-200/40 transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-[7px] font-bold text-white shadow-sm">
                        I
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-800 font-semibold">
                          ikhtiyaar.com
                        </span>
                        <span className="text-[8px] font-bold text-white bg-[#4285F4] px-1.5 py-[1px] rounded leading-none tracking-wide">
                          Ad
                        </span>
                      </div>
                    </div>
                    <h4 className="text-[13px] font-semibold text-blue-700 leading-snug mb-0.5 group-hover/ad:underline transition-all duration-200">
                      Ikhtiyaar — Google Ads That Drive Real Revenue
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                      3.5x avg ROAS. Data-driven campaigns built for growth.{" "}
                      <span className="text-slate-700 font-medium">
                        Free Strategy Session →
                      </span>
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Floating Badge — Top Right: CTR ──────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-[2%] lg:top-[20%] right-[0%] lg:right-[-15%] z-20 hidden sm:block"
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
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 flex items-center justify-center shadow-sm">
                      <MousePointerClick className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                        Click-Through Rate
                      </p>
                      <p className="text-sm font-[900] text-slate-900">
                        <AnimatedCounter target={8} suffix="." duration={1} />
                        <AnimatedCounter target={7} suffix="%" duration={1.5} />
                        <span className="text-blue-500 text-[10px] font-bold ml-1">
                          ↑ 2.3%
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Floating Badge — Bottom Left: Conversions ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-[4%] lg:bottom-[-6%] left-[-2%] lg:left-[-10%] z-20 hidden sm:block"
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
                  className="px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/70 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(34,197,94,0.15)] cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-50 to-green-100/60 flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                        Monthly Conversions
                      </p>
                      <p className="text-sm font-[900] text-slate-900">
                        <AnimatedCounter target={1247} duration={2} />{" "}
                        <span className="text-green-500 text-[10px] font-bold">
                          +186%
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
              className="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-200/60 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 backdrop-blur-md hover:bg-blue-50/80 hover:border-blue-300/60 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                Google Ads
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
                  Turn Ad Spend Into
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
                      Predictable Revenue
                    </span>
                    <motion.svg
                      className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-500/40 overflow-visible pointer-events-none"
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
              className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium"
            >
              Ikhtiyaar builds and manages Google Ads systems that don&apos;t
              just generate clicks&nbsp;&mdash; they drive qualified leads,
              sales, and measurable business growth.
            </motion.p>

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
                delay: 1.0,
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
                    Get a Growth Plan
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
                    className="text-2xl font-[900] text-slate-900 transition-colors duration-300 group-hover/stat:text-blue-600"
                  >
                    3.5x
                  </motion.span>
                  <span className="text-slate-400 font-medium text-xs">
                    Avg. ROAS
                  </span>
                </div>
                <div className="w-px h-10 bg-slate-200/80" />
                <div className="flex flex-col group/stat cursor-default">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="text-2xl font-[900] text-slate-900 transition-colors duration-300 group-hover/stat:text-blue-600"
                  >
                    186%
                  </motion.span>
                  <span className="text-slate-400 font-medium text-xs">
                    Conv. Growth
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
