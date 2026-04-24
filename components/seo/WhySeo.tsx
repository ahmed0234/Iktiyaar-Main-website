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
import { Eye, Target, Globe } from "lucide-react";
import WordReveal from "./shared/WordReveal";

const painPoints = [
  {
    icon: Eye,
    title: "Your Competitors Are Stealing Your Customers",
    description:
      "Every day you're not on page 1, your competitors capture the clicks, leads, and revenue that should be yours.",
  },
  {
    icon: Target,
    title: "Fast Wins and Lasting Growth",
    description:
      "Ads drive immediate traffic. SEO helps you grow consistently over time.",
  },
  {
    icon: Globe,
    title: "93% of Online Experiences Start with Search",
    description:
      "If your business isn't showing up when people search, you're invisible to the majority of your potential customers.",
  },
];

export default function WhySeo() {
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
  const floatingCardY = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    { stiffness: 80, damping: 30 }
  );

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 overflow-hidden bg-white"
    >
      {/* Atmospheric orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-100px] right-[-200px] w-[700px] h-[700px] rounded-full bg-blue-50/25 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.05, 1, 1.05], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-50px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── Left — Dimensional Image Composition ───────── */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] relative"
            style={{ perspective: "800px" }}
          >
            {/* Soft shadow layer behind the image */}
            <motion.div
              style={{ y: imgParallax }}
              className="absolute inset-0 translate-y-8 translate-x-4 rounded-[2rem] bg-blue-600/8 blur-2xl pointer-events-none"
            />

            {/* Main image with broken-grid perspective feel */}
            <motion.div
              style={{ y: imgParallax }}
              whileHover={{ rotateY: 3, rotateX: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] group transform-gpu [transform-style:preserve-3d]"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/seoPage/image_4.png"
                  alt="SEO magnifying glass revealing growth insights"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-white/5 pointer-events-none" />
              {/* Subtle inner border glow */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
            </motion.div>

            {/* Floating secondary image — layered depth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ y: floatingCardY }}
              className="absolute -bottom-8 -right-6 sm:right-2 z-20 w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]"
            >
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                whileHover={{ scale: 1.08 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-2 border-white/80 transform-gpu"
              >
                <Image
                  src="/seoPage/image_5.png"
                  alt="3D growth visualization with data panels"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-5 -left-3 sm:left-2 z-20"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                whileHover={{ scale: 1.06 }}
                className="px-5 py-3.5 rounded-2xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 cursor-default"
              >
                <p className="text-3xl font-[900] text-blue-600 mb-0.5">93%</p>
                <p className="text-[11px] text-slate-500 font-semibold">
                  Start with a search engine
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right — Content ────────────────────────────────── */}
          <div className="w-full lg:w-[55%]">
            <motion.span
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
            >
              Why SEO Matters
            </motion.span>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-6">
              <WordReveal text="Every Day Without SEO" delay={0.15} />
              <br className="hidden sm:block" />
              <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                <WordReveal text="Is Revenue Lost" delay={0.5} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base text-slate-500 leading-relaxed font-medium mb-10 max-w-xl"
            >
              Businesses that invest in SEO aren&apos;t just getting traffic — they&apos;re
              building an asset that compounds over time. While paid ads stop the
              moment you stop paying, organic rankings keep working for you 24/7.
            </motion.p>

            <div className="space-y-4">
              {painPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + idx * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 8, scale: 1.01 }}
                    className="group flex gap-4 p-4 rounded-2xl hover:bg-blue-50/40 transition-all duration-300 cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.5 }}
                      className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 flex items-center justify-center shrink-0 group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
                        {point.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
