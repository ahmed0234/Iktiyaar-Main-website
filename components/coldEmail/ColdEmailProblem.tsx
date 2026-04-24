"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  XCircle,
  AlertTriangle,
  TrendingDown,
  Ban,
  MailWarning,
  UserX,
  ShieldAlert,
} from "lucide-react";
import WordReveal from "../seo/shared/WordReveal";

// ─── Pain Points Data ──────────────────────────────────────────────────
const struggles = [
  {
    text: "Messages look and feel like spam",
    icon: Ban,
    description: "Generic, templated emails that prospects ignore instantly.",
  },
  {
    text: "Outdated or irrelevant targeting data",
    icon: UserX,
    description: "Sending to the wrong people or inactive email addresses.",
  },
  {
    text: "Zero personalization at scale",
    icon: MailWarning,
    description: "No compelling hook tailored to the recipient's exact pain points.",
  },
  {
    text: "Emails landing straight in spam",
    icon: ShieldAlert,
    description: "Poor technical setup destroys your sender reputation.",
  },
];

// ─── Animated Declining Metric ─────────────────────────────────────────
function DecliningMetric() {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 60 24" className="w-14 h-6" fill="none">
        <motion.path
          d="M 2 4 C 10 6 18 3 26 10 C 34 17 42 14 50 20 L 58 22"
          stroke="#EF4444"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="58"
          cy="22"
          r="2.5"
          fill="#EF4444"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ─── Main Problem Section ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════
export default function ColdEmailProblem() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgParallax = useSpring(
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    { stiffness: 80, damping: 30 }
  );

  const floatingY = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    { stiffness: 80, damping: 30 }
  );

  const floatingY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, -20]),
    { stiffness: 60, damping: 25 }
  );

  return (
    <section
      ref={ref}
      id="cold-email-problem"
      className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white"
    >
      {/* ── Ambient Background Elements ────────────────────────────── */}
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Very subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Atmospheric orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-60px] right-[-100px] w-[550px] h-[550px] rounded-full bg-red-100/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.05, 1, 1.05], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-80px] left-[-80px] w-[450px] h-[450px] rounded-full bg-blue-50/25 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-amber-100/15 blur-[110px] pointer-events-none"
      />

      {/* ── Content Container ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ═══════════════════════════════════════════════════════
               LEFT — Dimensional Image Composition
              ═══════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] relative"
            style={{ perspective: "800px" }}
          >
            {/* Shadow layer */}
            <motion.div
              style={{ y: imgParallax }}
              className="absolute inset-0 translate-y-8 translate-x-4 rounded-[2rem] bg-red-600/6 blur-2xl pointer-events-none"
            />

            {/* Main image container */}
            <motion.div
              style={{ y: imgParallax }}
              whileHover={{ rotateY: 3, rotateX: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] group transform-gpu [transform-style:preserve-3d]"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/ColdEmail/spam.png"
                  alt="Cold email failing to reach prospects"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-white/5 pointer-events-none" />
              {/* Bottom red glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
              {/* Inner border glow */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
            </motion.div>

            {/* ── Floating Badge — Top Right: Warning ──────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-5 -right-3 sm:right-4 z-20"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.06 }}
                className="px-5 py-3.5 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 cursor-default"
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                    Spam Placement
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-[900] text-slate-800 leading-none">
                    68<span className="text-sm text-slate-400 font-bold">%</span>
                  </p>
                  <DecliningMetric />
                </div>
                <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                  Domain Reputation At Risk
                </p>
              </motion.div>
            </motion.div>

            {/* ── Floating Badge — Bottom Left: Wasted Budget ─────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ y: floatingY }}
              className="absolute -bottom-6 -left-4 sm:left-4 z-20"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.08 }}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/70 shadow-xl cursor-default"
              >
                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-[12px] font-[800] text-slate-700">
                  <span className="text-red-500">0%</span> Reply Rate
                </p>
              </motion.div>
            </motion.div>

            {/* ── Floating Badge — Mid Right: Click Fraud ──────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              style={{ y: floatingY2 }}
              className="absolute bottom-[15%] -right-4 sm:-right-6 z-20 hidden sm:block"
            >
              <motion.div
                animate={{ y: [4, -6, 4], rotate: [1, -1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.06 }}
                className="px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-white/60 cursor-default"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center">
                    <XCircle className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Bounced Emails
                    </p>
                    <p className="text-sm font-[900] text-orange-600 leading-none">
                      24%
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════
               RIGHT — Content & Pain Points
              ═══════════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[55%]">
            {/* Section tag */}
            <motion.span
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[13px] font-bold tracking-[0.25em] text-red-500/80 uppercase mb-4 block"
            >
              Cold Email Reality
            </motion.span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-6">
              <WordReveal text="Sending Hundreds of Emails" delay={0.15} />
              <br className="hidden sm:block" />
              <span className="text-black bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
                <WordReveal text="But Getting No Replies?" delay={0.5} />
              </span>
            </h2>

            {/* Description paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base text-slate-500 leading-relaxed font-medium mb-8 max-w-xl"
            >
              Cold email can drive massive growth, but only when it feels personal.
              Most campaigns fail because:
            </motion.p>

            {/* ── Pain Points List ───────────────────────────────── */}
            <div className="space-y-3 mb-10">
              {struggles.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + idx * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 8, scale: 1.01 }}
                    className="group flex items-start gap-4 p-3.5 rounded-2xl hover:bg-red-50/40 transition-all duration-300 cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-50 to-red-100/60 flex items-center justify-center shrink-0 group-hover:shadow-md group-hover:shadow-red-500/10 transition-all duration-300 mt-0.5"
                    >
                      <Icon className="w-5 h-5 text-red-500" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-[15px] font-semibold text-slate-700 group-hover:text-red-600 transition-colors duration-300 mb-0.5">
                        {item.text}
                      </p>
                      <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ── Closing Statement ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="relative"
            >
              {/* Glassmorphic card for closing */}
              <div className="relative pl-5 border-l-[3px] border-red-400/50 max-w-lg">
                <p className="text-[15px] text-slate-500 leading-relaxed font-medium italic">
                  You might be hitting send—but sending doesn&apos;t equal selling.{" "}
                  <span className="text-slate-800 font-bold not-italic">
                    Without a strategic approach, your emails will just annoy prospects.
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
