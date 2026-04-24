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
import { Zap, LineChart, Sparkles, Globe } from "lucide-react";
import WordReveal from "@/components/seo/shared/WordReveal";

const differentiators = [
  {
    icon: Zap,
    title: "Intent-Driven Strategy",
    description:
      "We don't just bid on broad terms. We target high-intent keywords to capture customers at the exact moment they are ready to convert.",
  },
  {
    icon: LineChart,
    title: "Precision Optimization",
    description:
      "We leverage advanced bidding and continuous testing to maximize your click-through rates, driving down your cost per acquisition.",
  },
  {
    icon: Sparkles,
    title: "High-Converting Copy",
    description:
      "We write sharp, benefit-driven ad copy that dominates search results and instantly captures high-quality leads from your ideal audience.",
  },
  {
    icon: Globe,
    title: "End-to-End Tracking",
    description:
      "We seamlessly connect your campaigns to your backend systems, ensuring precise attribution so you know exactly what drives the highest ROI.",
  },
];

export default function WhyIkhtiyaarGoogleAds() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgParallax = useSpring(
    useTransform(scrollYProgress, [0, 1], [40, -50]),
    { stiffness: 60, damping: 30 }
  );
  const secondaryY = useSpring(
    useTransform(scrollYProgress, [0, 1], [25, -45]),
    { stiffness: 50, damping: 25 }
  );
  const badgeY = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, -30]),
    { stiffness: 70, damping: 30 }
  );

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-white"
    >
      {/* Atmospheric orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-50px] right-[-150px] w-[500px] h-[500px] rounded-full bg-blue-50/25 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-50/15 blur-[80px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── Left — Content ─────────────────────────────── */}
          <div className="w-full lg:w-1/2">
            <motion.span
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5 }}
              className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
            >
              Why Ikhtiyaar
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.3rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-6">
              <WordReveal text="Google Ads That Don’t Spend" delay={0.1} />
              <br className="hidden sm:block" />
              <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                <WordReveal text="They Print Revenue" delay={0.4} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base text-slate-500 leading-relaxed font-medium mb-10 max-w-xl"
            >
              Most agencies waste budgets on irrelevant clicks and vanity metrics. We obsess over search intent and conversions. Every keyword we target, every ad we write,
              and every campaign we scale is built with one mission: to capture high-quality leads and maximize your ROI.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {differentiators.map((diff, idx) => {
                const Icon = diff.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + idx * 0.12,
                    }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group p-5 rounded-2xl bg-slate-50/60 border border-slate-100/80 hover:bg-blue-50/30 hover:border-blue-100/50 hover:shadow-lg hover:shadow-blue-50/30 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 flex items-center justify-center mb-3 group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <h3 className="text-[15px] font-bold text-slate-900 mb-1.5 group-hover:text-blue-700 transition-colors duration-300">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {diff.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right — Dimensional Image Composition ─────── */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative"
            style={{ perspective: "800px" }}
          >
            {/* Shadow layer */}
            <div className="absolute inset-4 rounded-[2rem] bg-blue-600/6 blur-2xl translate-y-6 pointer-events-none" />

            {/* Main image */}
            <motion.div
              style={{ y: imgParallax }}
              whileHover={{ rotateY: -3, rotateX: 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] group transform-gpu [transform-style:preserve-3d]"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="/googleAds/whyGoogleAds/Main_image.png"
                  alt="Digital ad campaign management visualization"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-white/5 pointer-events-none" />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
            </motion.div>

            {/* Floating secondary image — green holographic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{ y: secondaryY }}
              className="absolute -bottom-6 -left-4 sm:left-2 z-20 w-[120px] h-[150px] sm:w-[140px] sm:h-[175px]"
            >
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-2 border-white/70 transform-gpu"
              >
                <Image
                  src="/googleAds/whyGoogleAds/floating_image.png"
                  alt="3D Google floating icon"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              style={{ y: badgeY }}
              className="absolute -top-5 -right-3 sm:right-4 z-20"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                animate={{ y: [-4, 6, -4] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 cursor-default"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-slate-900">
                    Precision Targeting
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
