"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Database, BrainCircuit, Zap } from "lucide-react";
import WordReveal from "../seo/shared/WordReveal";

const steps = [
  {
    id: "input",
    title: "1. Data Input & Triggers",
    description: "Leads, emails, and CRM updates flow securely into the system.",
    icon: Database,
    color: "text-blue-500",
    bg: "bg-blue-50/80",
    borderColor: "border-blue-200/60",
    glow: "shadow-blue-500/20",
  },
  {
    id: "process",
    title: "2. Intelligent Processing",
    description: "Our custom AI analyzes, routes, and processes the data instantly.",
    icon: BrainCircuit,
    color: "text-violet-500",
    bg: "bg-violet-50/80",
    borderColor: "border-violet-200/60",
    glow: "shadow-violet-500/20",
  },
  {
    id: "output",
    title: "3. Automated Output",
    description: "Tasks are completed, emails sent, and dashboards updated.",
    icon: Zap,
    color: "text-emerald-500",
    bg: "bg-emerald-50/80",
    borderColor: "border-emerald-200/60",
    glow: "shadow-emerald-500/20",
  },
];

const benefits = [
  "You Save Time",
  "You Reduce Costs",
  "You Scale Faster",
];

export default function AiAutomationSolution() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
            {/* ── LEFT COLUMN: Creative Visual Flow ── */}
              <div className="w-full lg:w-1/2 relative order-2 lg:order-1 flex justify-center lg:justify-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-[480px] p-8 sm:p-10 rounded-[2.5rem] bg-slate-50/60 border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden backdrop-blur-xl"
                >
                  {/* Atmospheric background within the card */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-100/40 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* The Path Flow */}
                  <div className="relative">
                    {/* Continuous Connecting Line */}
                    <div className="absolute left-[1.75rem] top-8 bottom-8 w-[2px] bg-slate-200/80" />
                    
                    {/* Animated Particle on the Line */}
                    <div className="absolute left-[1.75rem] top-8 bottom-8 w-[2px] overflow-hidden">
                      <motion.div
                        className="w-full h-24 bg-gradient-to-b from-transparent via-violet-500 to-transparent"
                        animate={{ y: ["-100%", "400%"] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    <div className="space-y-10 relative z-20">
                      {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 + idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ x: 6 }}
                            className="flex items-start gap-6 group cursor-default"
                          >
                            {/* Node Icon */}
                            <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl ${step.bg} border ${step.borderColor} shadow-sm group-hover:shadow-lg group-hover:${step.glow} transition-all duration-300 shrink-0 bg-white/80 backdrop-blur-sm group-hover:scale-110`}>
                              <Icon className={`w-6 h-6 ${step.color}`} />
                              
                              {/* Ping animation behind icon */}
                              <div className={`absolute inset-0 rounded-2xl border ${step.borderColor} opacity-0 group-hover:animate-ping`} />
                            </div>

                            {/* Content */}
                            <div className="pt-1.5 flex-1">
                              <h3 className="text-[17px] font-bold text-slate-900 mb-1.5 group-hover:text-violet-600 transition-colors duration-300">
                                {step.title}
                              </h3>
                              <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                                {step.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── RIGHT COLUMN: Text & Key Points ── */}
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <motion.span
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-[13px] font-bold tracking-[0.25em] text-blue-600 uppercase mb-4 block"
                >
                  The Solution
                </motion.span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-6">
                  <WordReveal text="We Build AI Systems" delay={0.1} />
                  <br className="hidden sm:block" />
                  <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">
                    <WordReveal text="That Work For You" delay={0.4} />
                  </span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base sm:text-[17px] text-slate-500 leading-relaxed font-medium mb-6"
                >
                  At Ikhtiyaar, we design and implement AI automation systems that handle your business processes automatically. From lead handling to internal workflows, we connect your tools, automate tasks, and create systems that run without constant input.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-base sm:text-[17px] text-slate-800 leading-relaxed font-bold mb-10"
                >
                  This isn&apos;t just automation. It&apos;s business optimization powered by AI.
                </motion.p>

                <div className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + idx * 0.15 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 group-hover:scale-110 group-hover:bg-emerald-200 transition-transform duration-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-800 font-bold text-[17px] group-hover:text-emerald-700 transition-colors duration-300">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

              </div>
        </div>
      </div>
    </section>
  );
}
