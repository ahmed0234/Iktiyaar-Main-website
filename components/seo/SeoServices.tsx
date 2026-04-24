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
import { Layers, CheckCircle2, Sparkles } from "lucide-react";
import WordReveal from "./shared/WordReveal";

const serviceFeatures = [
  {
    category: "On-Page SEO",
    icon: "🔍",
    items: [
      "Meta title & description optimization",
      "Header tag hierarchy (H1-H6)",
      "Internal linking architecture",
      "Image optimization & alt text",
      "Schema markup implementation",
      "Core Web Vitals optimization",
    ],
  },
  {
    category: "Off-Page SEO",
    icon: "🔗",
    items: [
      "Strategic link building campaigns",
      "Digital PR & brand mentions",
      "Guest posting on authority sites",
      "Local citation building",
      "Competitor backlink analysis",
      "Toxic link disavowal",
    ],
  },
  {
    category: "Technical SEO",
    icon: "⚙️",
    items: [
      "Site architecture optimization",
      "Page speed optimization",
      "Mobile-first indexing compliance",
      "XML sitemap management",
      "Crawl budget optimization",
      "Structured data implementation",
    ],
  },
  {
    category: "Content Strategy",
    icon: "✍️",
    items: [
      "Keyword gap analysis",
      "Content calendar planning",
      "Blog & pillar content creation",
      "Landing page copywriting",
      "Content refresh & optimization",
      "Topical authority building",
    ],
  },
];

export default function SeoServices() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatingY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    { stiffness: 60, damping: 30 }
  );
  const floatingRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [8, -8]),
    { stiffness: 60, damping: 30 }
  );

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-16 overflow-hidden bg-white"
    >
      {/* Atmospheric orbs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], x: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-80px] left-[-180px] w-[600px] h-[600px] rounded-full bg-blue-50/30 blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.05, 1, 1.05], y: [0, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-80px] right-[-180px] w-[600px] h-[600px] rounded-full bg-indigo-50/20 blur-[100px] pointer-events-none"
      />

      {/* ── Dimensional Floating Trust Card ────────────────── */}
      <motion.div
        style={{ y: floatingY, rotate: floatingRotate }}
        className="absolute right-[5%] top-[25%] hidden xl:block z-0 pointer-events-none"
      >
        <motion.div
          animate={{ 
            y: [-12, 12, -12],
            rotateZ: [-2, 2, -2],
            rotateX: [-3, 3, -3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9, 
            ease: "easeInOut" 
          }}
          className="pointer-events-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-6 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl shadow-blue-500/5 group/tcard relative overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-blue-400/10 to-transparent opacity-50 group-hover/tcard:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-[900] text-slate-900 tracking-tight leading-none mb-1">92%</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-3">Efficiency Score</p>
              <div className="h-px w-12 bg-slate-200/60 mb-3" />
              <p className="text-[11px] font-bold text-blue-600 leading-tight">
                ROI-Driven Strategy<br/>
                <span className="text-slate-400 font-medium">100% Growth Focus</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
          >
            What&apos;s Included
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-5">
            <WordReveal text="Everything You Need" delay={0.1} />
            <br className="hidden sm:block" />{" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              <WordReveal text="To Dominate Search" delay={0.4} />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-base lg:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            A comprehensive SEO service designed to cover every angle so nothing
            falls through the cracks.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceFeatures.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + catIdx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative p-8 rounded-3xl bg-white/75 backdrop-blur-sm border border-slate-100/80 shadow-lg shadow-slate-100/20 hover:shadow-2xl hover:shadow-blue-50/50 hover:border-blue-100/50 transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-blue-400/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Shine sweep on hover */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent"
                  initial={{ x: "-200%", y: "-200%", rotate: 30 }}
                  whileHover={{ x: "50%", y: "50%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/60 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300 text-xl"
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors duration-300">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + catIdx * 0.12 + itemIdx * 0.05,
                      }}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 group/item cursor-default"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="mt-0.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 group-hover/item:text-blue-600 transition-colors" />
                      </motion.div>
                      <span className="text-sm text-slate-600 font-medium leading-relaxed group-hover/item:text-slate-800 transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
