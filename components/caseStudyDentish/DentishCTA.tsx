"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  PhoneCall,
  LayoutGrid,
  TrendingUp,
  Star,
  Users,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";

// ─── Shared ease ──────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Word-by-word reveal ──────────────────────────────────────────────────────
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
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300"
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

// ─── Ambient Particles ────────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30 blur-[1px]"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// ─── Social Proof Strip ───────────────────────────────────────────────────────
const stats = [
  { icon: Users, val: "150+", label: "Businesses Scaled" },
  { icon: CalendarCheck, val: "12k+", label: "Appointments Booked" },
  { icon: TrendingUp, val: "$2M+", label: "Revenue Influenced" },
  { icon: Star, val: "99%", label: "Client Retention" },
];

function SocialProofStrip({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
      className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 border-y border-white/10"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <Icon className="w-4 h-4 text-blue-300" />
            </div>
            <div className="text-left">
              <p className="text-[15px] font-black text-white leading-none mb-0.5">{stat.val}</p>
              <p className="text-[10px] text-blue-200/60 font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

// ─── "The Open Seat" Visual Concept ───────────────────────────────────────────
function OpenSeatVisual({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[280px] sm:h-[320px] flex items-center justify-center mt-12 mb-8 perspective-1000">
      
      {/* Background Completed Card (Left) */}
      <motion.div
        initial={{ opacity: 0, x: 40, rotateY: -15, scale: 0.85 }}
        animate={inView ? { opacity: 0.3, x: -100, rotateY: -10, scale: 0.9 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="absolute w-[240px] h-[300px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-2xl flex flex-col justify-between hidden sm:flex"
      >
        <div>
          <div className="w-12 h-4 rounded bg-white/10 mb-4" />
          <div className="w-3/4 h-3 rounded bg-white/10 mb-2" />
          <div className="w-1/2 h-3 rounded bg-white/10" />
        </div>
        <div className="w-full h-24 rounded-xl bg-white/5" />
      </motion.div>

      {/* Background Completed Card (Right) */}
      <motion.div
        initial={{ opacity: 0, x: -40, rotateY: 15, scale: 0.85 }}
        animate={inView ? { opacity: 0.3, x: 100, rotateY: 10, scale: 0.9 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        className="absolute w-[240px] h-[300px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-2xl flex flex-col justify-between hidden sm:flex"
      >
        <div>
          <div className="w-12 h-4 rounded bg-white/10 mb-4" />
          <div className="w-3/4 h-3 rounded bg-white/10 mb-2" />
          <div className="w-1/2 h-3 rounded bg-white/10" />
        </div>
        <div className="w-full h-24 rounded-xl bg-white/5" />
      </motion.div>

      {/* The Empty Seat (Center) */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        className="relative z-10 w-full max-w-[320px] h-[320px] rounded-3xl border border-blue-400/30 bg-gradient-to-b from-blue-900/40 to-slate-900/60 backdrop-blur-xl p-8 shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center text-center group"
      >
        {/* Shimmer line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
        
        {/* Glowing orb behind content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 bg-blue-500/20 blur-[40px] rounded-full group-hover:bg-blue-400/30 transition-all duration-700" />
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl border border-blue-300/30 bg-blue-500/10 flex items-center justify-center mb-6 shadow-inner"
        >
          <Sparkles className="w-6 h-6 text-blue-300" />
        </motion.div>

        <p className="text-[12px] font-bold text-blue-300 uppercase tracking-widest mb-3">
          Your Business
        </p>
        <h4 className="text-2xl font-black text-white leading-tight mb-2">
          Reserved For The Next Success Story.
        </h4>
        <p className="text-sm text-blue-200/60 font-medium">
          Will it be you?
        </p>
      </motion.div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function DentishCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-24 lg:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]"
    >
      {/* ── Immersive Background ────────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Deep mesh gradient */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/30 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-slate-800/40 blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full bg-sky-900/20 blur-[100px]" />
        
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        
        <Particles />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* ── Badge ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-[12px] font-bold text-blue-300 uppercase tracking-[0.2em]">
            The Next Case Study Could Be Yours
          </span>
        </motion.div>

        {/* ── Massive Headline ──────────────────────────────────────────────── */}
        <h2 className="font-poppins text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8 max-w-4xl">
          <SplitReveal text="What If Your Business" delay={0.1} />
          <br />
          <SplitReveal text="Was The Next" delay={0.3} />{" "}
          <SplitReveal text="Success Story?" delay={0.4} isAccent />
        </h2>

        {/* ── Persuasive Copy ───────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto space-y-6 mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="text-slate-300 text-lg sm:text-xl font-medium leading-[1.7]"
          >
            Most businesses don't have a traffic problem. They have a conversion problem. A visibility problem. <span className="text-white font-bold">A systems problem.</span>
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            className="text-slate-400 text-base sm:text-lg font-medium leading-[1.7]"
          >
            The clinics that grow consistently aren't relying on luck. They're operating with a strategy designed to attract, convert, and retain patients predictably. That's exactly what we build.
          </motion.p>
        </div>

        {/* ── Social Proof Strip ────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mb-12">
          <SocialProofStrip inView={inView} />
        </div>

        {/* ── Visual Concept: The Open Seat ─────────────────────────────────── */}
        <OpenSeatVisual inView={inView} />

        {/* ── CTA Buttons ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          {/* Primary Button */}
          <Link href="/contact" className="group relative inline-flex items-center justify-center w-full sm:w-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 opacity-60 blur-lg group-hover:opacity-100 group-hover:blur-xl transition-all duration-500" />
            <div className="relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 sm:px-10 sm:py-5 text-[15px] font-bold text-slate-900 transition-transform duration-300 group-hover:scale-[1.02]">
              <PhoneCall className="w-5 h-5 text-blue-600" />
              <span>Book A Growth Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
            </div>
          </Link>

          {/* Secondary Button */}
          <Link href="/case-studies" className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 sm:px-10 sm:py-5 text-[15px] font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 w-full sm:w-auto justify-center">
            <LayoutGrid className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            <span>View More Case Studies</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
