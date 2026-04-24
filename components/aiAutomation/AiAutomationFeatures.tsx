"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { CheckCircle2, Clock, Zap, ArrowRight } from "lucide-react";
import WordReveal from "../seo/shared/WordReveal";

const features = [
  "Reduced operational costs",
  "Faster response times",
  "Improved customer experience",
  "Higher efficiency across teams",
  "More time to focus on growth",
  "Scalable systems that grow with your business",
];

export default function AiAutomationFeatures() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgParallax = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    { stiffness: 60, damping: 25 }
  );
  
  const floatY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, -20]),
    { stiffness: 60, damping: 20 }
  );

  const floatY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-20, 20]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <section
      ref={ref}
      className="relative py-14 sm:py-14 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30"
    >
      {/* Background Orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* ── LEFT COLUMN: Text Content ── */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-6">
              <WordReveal text="What AI Automation" delay={0.1} />
              <br className="hidden sm:block" />
              <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">
                <WordReveal text="Does For Your Business" delay={0.4} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-slate-500 leading-relaxed font-medium mb-4"
            >
              When your systems run automatically, your business becomes more efficient and scalable.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-[17px] text-slate-600 leading-relaxed font-medium mb-8"
            >
              With Ikhtiyaar&apos;s <span className="font-bold text-blue-600">AI automation services</span>, you can expect:
            </motion.p>

            {/* Check List */}
            <div className="space-y-4 mb-10">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors duration-300 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium text-[16px] group-hover:text-slate-900 transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Footer Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="border-l-[3px] border-violet-400 pl-4"
            >
              <p className="text-lg sm:text-xl font-[800] text-slate-800">
                Less manual work. <span className="text-blue-600">More meaningful growth.</span>
              </p>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Visual Composite ── */}
          <div className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] max-w-lg"
              style={{ perspective: "1000px" }}
            >
              {/* Background Glass Plate */}
              <div className="absolute inset-4 sm:inset-8 bg-gradient-to-br from-blue-50/80 to-violet-50/40 rounded-[2rem] border border-white/60 shadow-[0_20px_60px_rgba(59,130,246,0.08)] backdrop-blur-xl transform-gpu rotate-3" />
              
              {/* Main Image Container */}
              <motion.div
                style={{ y: imgParallax }}
                className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl border border-slate-100/50 overflow-hidden group transform-gpu"
                whileHover={{ rotateY: -3, rotateX: 2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/AiAutomation/automation/image_1.png"
                    alt="AI Automation visualization"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Internal Glow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* ── Floating Badge: Before Automation ── */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{ y: floatY1 }}
                className="absolute top-[10%] -left-4 sm:-left-10 z-20"
              >
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100/80 max-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      Before Automation
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 leading-snug">
                    Hours lost on repetitive manual tasks
                  </p>
                </motion.div>
              </motion.div>

              {/* ── Floating Badge: After Automation ── */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                style={{ y: floatY2 }}
                className="absolute bottom-[15%] -right-4 sm:-right-8 z-20"
              >
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-violet-100 max-w-[200px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5 text-violet-600" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-violet-600 uppercase">
                      After Automation
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 leading-snug">
                    Workflows run 24/7 completely effortlessly
                  </p>
                </motion.div>
              </motion.div>

              {/* Center Connect Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden sm:flex"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center border-2 border-white/50 backdrop-blur-md">
                  <ArrowRight className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
