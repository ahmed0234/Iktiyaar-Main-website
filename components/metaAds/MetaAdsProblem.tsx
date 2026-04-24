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
import { XCircle, AlertTriangle } from "lucide-react";
import WordReveal from "../seo/shared/WordReveal";

const struggles = [
  "Ads look good but don't convert",
  "Targeting is too broad or inaccurate",
  "Creatives are not tested or optimized",
  "No clear strategy behind campaigns",
];

export default function MetaAdsProblem() {
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

  return (
    <section
      ref={ref}
      className="relative py-2 sm:py-28 overflow-hidden bg-gradient-to-b from-slate-50/80 via-blue-50/20 to-white"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Atmospheric orbs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], x: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-80px] right-[-120px] w-[600px] h-[600px] rounded-full bg-blue-100/20 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.05, 1, 1.05], y: [0, 25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-60px] left-[-100px] w-[450px] h-[450px] rounded-full bg-indigo-50/25 blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── Left — Dimensional Image Composition ────────── */}
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
              className="absolute inset-0 translate-y-8 translate-x-4 rounded-[2rem] bg-blue-600/8 blur-2xl pointer-events-none"
            />

            {/* Main image */}
            <motion.div
              style={{ y: imgParallax }}
              whileHover={{ rotateY: 3, rotateX: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] group transform-gpu [transform-style:preserve-3d]"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/metaAdsPage/sales_likes.png"
                  alt="Social media vanity metrics vs real business ROI"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/5 pointer-events-none" />
              {/* Inner border glow */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
            </motion.div>

            {/* Floating warning card */}
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
                    Common Trap
                  </p>
                </div>
                <p className="text-2xl font-[900] text-slate-800 leading-none">
                  1,500 Likes
                </p>
                <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                  0 Conversions
                </p>
              </motion.div>
            </motion.div>

            {/* Floating ROI pill */}
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
                  <XCircle className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-[12px] font-[800] text-slate-700">
                  <span className="text-red-500">–67%</span> Wasted Ad Spend
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right — Content ──────────────────────────────── */}
          <div className="w-full lg:w-[55%]">
            <motion.span
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
            >
              The Real Problem
            </motion.span>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-6">
              <WordReveal text="Getting Views Is Easy." delay={0.15} />
              <br className="hidden sm:block" />
              <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                <WordReveal text="Getting Results Is Not." delay={0.5} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base text-slate-500 leading-relaxed font-medium mb-8 max-w-xl"
            >
              Running ads on Facebook and Instagram is simple, but making them
              profitable is a different story. Most businesses struggle because:
            </motion.p>

            {/* Pain points */}
            <div className="space-y-3.5 mb-10">
              {struggles.map((item, idx) => (
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
                  className="group flex items-center gap-4 p-3.5 rounded-2xl hover:bg-red-50/40 transition-all duration-300 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-50 to-red-100/60 flex items-center justify-center shrink-0 group-hover:shadow-md group-hover:shadow-red-500/10 transition-all duration-300"
                  >
                    <XCircle className="w-4.5 h-4.5 text-red-500" />
                  </motion.div>
                  <p className="text-[15px] font-semibold text-slate-700 group-hover:text-red-600 transition-colors duration-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="relative pl-5 border-l-[3px] border-blue-500/40 max-w-lg"
            >
              <p className="text-[15px] text-slate-500 leading-relaxed font-medium italic">
                You may be getting likes, clicks, or impressions — but none of
                that guarantees revenue.{" "}
                <span className="text-slate-800 font-bold not-italic">
                  Without the right system, Meta Ads become unpredictable.
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
