"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function AiAutomationCta() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), {
    stiffness: 80,
    damping: 30,
  });
  const bgImgScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1.1, 0.95]),
    { stiffness: 50, damping: 30 },
  );

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-white"
    >
      {/* Atmospheric */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px] bg-blue-50/40 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], x: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-25%] right-[-15%] w-[800px] h-[800px] bg-indigo-50/30 rounded-full blur-[160px]"
        />
      </div>

      {/* Floating decorative shape */}
      <motion.div
        style={{ y: floatY }}
        className="absolute top-[12%] right-[6%] hidden lg:block pointer-events-none"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-2xl border border-blue-100/50 bg-blue-50/20 backdrop-blur-sm"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group/banner"
        >
          {/* Glow behind the banner */}
          <div className="absolute -inset-6 rounded-[3.5rem] bg-gradient-to-r from-blue-400/10 via-indigo-400/8 to-blue-400/10 blur-3xl opacity-0 group-hover/banner:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
            {/* Gradient base */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1e40af 0%, #3b82f6 30%, #38bdf8 70%, #60a5fa 100%)",
              }}
            />

            {/* Background image with parallax — very subtle */}
            <motion.div
              style={{ scale: bgImgScale }}
              className="absolute inset-0 mix-blend-soft-light opacity-[0.08] pointer-events-none"
            >
              <Image
                src="/seoPage/image_9.png"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </motion.div>

            {/* Noise mesh */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px, 45px 45px",
                }}
              />
            </div>

            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear",
                repeatDelay: 2,
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-15deg] pointer-events-none"
            />

            {/* Decorative floating shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 15, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-8 -top-8 sm:right-6 sm:top-4 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm"
              />
              <motion.div
                animate={{ y: [8, -12, 8], rotate: [0, -10, 0] }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-16 sm:right-28 -bottom-6 sm:bottom-2 w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              />
              <motion.div
                animate={{ y: [-8, 15, -8], x: [-5, 5, -5] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-44 sm:right-64 top-6 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hidden sm:block"
              />
            </div>

            {/* ── Banner Content ────────────────────────────── */}
            <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-14 sm:py-16 lg:py-20 flex flex-col items-center text-center gap-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-[11px] font-bold text-white/90 uppercase tracking-[0.2em]">
                  Limited Spots Available
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-[900] text-white tracking-tight leading-tight max-w-3xl"
              >
                Ready to Stop Guessing and
                <br className="hidden sm:block" /> Start Growing?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="text-base sm:text-lg text-blue-100/80 font-medium max-w-2xl leading-relaxed"
              >
                Book a free AI Automation Audit. We will show you exactly where your
                operational bottlenecks are, which workflows to automate first,
                and how to turn your business processes into a seamless,
                high efficiency growth engine.
              </motion.p>

              {/* Trust markers */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap justify-center gap-x-6 gap-y-2"
              >
                {[
                  "No obligation",
                  "Full operational audit",
                  "Custom growth roadmap",
                ].map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white/60"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />
                    {item}
                  </span>
                ))}
              </motion.div>

              {/* ── THE CTA BUTTON — The Decision Moment ─── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.06, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className="group/cta relative flex items-center gap-3 px-10 sm:px-14 py-5 sm:py-6 bg-white rounded-full font-[900] text-lg sm:text-xl text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)] cursor-pointer"
                  >
                    {/* Inner shimmer */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-full">
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "linear",
                          repeatDelay: 1.5,
                        }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent skew-x-[-30deg]"
                      />
                    </div>

                    {/* Blue gradient border glow on hover */}
                    <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 -z-10" />
                    <div className="absolute inset-0 rounded-full bg-white -z-0" />

                    <span className="relative z-10 tracking-tight">
                      Claim My Free Automation Audit
                    </span>
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative z-10"
                    >
                      <ArrowRight
                        className="w-6 h-6 text-blue-600 transition-transform duration-300 group-hover/cta:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
