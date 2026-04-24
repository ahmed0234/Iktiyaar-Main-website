"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Workflow,
  Bot,
  Blocks,
  Mail,
  Cpu,
} from "lucide-react";
import WordReveal from "@/components/seo/shared/WordReveal";

const includes = [
  {
    icon: Users,
    title: "Lead Management Automation",
    description:
      "Automatically capture, qualify, and respond to leads without manual effort.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Streamline your internal processes with smart workflows that reduce human involvement.",
    gradient: "from-violet-500 to-violet-600",
    bgGradient: "from-violet-50 to-violet-100/50",
    shadow: "shadow-violet-500/20",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Response Systems",
    description:
      "Engage with customers instantly using AI-powered responses across your platforms.",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100/50",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: Blocks,
    title: "CRM & Tool Integration",
    description:
      "Connect your tools and systems so your business runs smoothly without data gaps.",
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100/50",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Never miss a lead with automated follow-ups that nurture and convert prospects.",
    gradient: "from-pink-500 to-pink-600",
    bgGradient: "from-pink-50 to-pink-100/50",
    shadow: "shadow-pink-500/20",
  },
  {
    icon: Cpu,
    title: "Custom AI Solutions",
    description:
      "We build tailored AI systems based on your specific business needs and goals.",
    gradient: "from-cyan-500 to-cyan-600",
    bgGradient: "from-cyan-50 to-cyan-100/50",
    shadow: "shadow-cyan-500/20",
  },
];

export default function AiAutomationIncludes() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-32 overflow-hidden bg-slate-50/50"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[140px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
          >
            What&apos;s Included
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-[900] tracking-tight text-slate-900 leading-[1.1]">
            <WordReveal text="Our AI Automation Solutions" delay={0.1} />
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {includes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                {/* Glow layer */}
                <div
                  className={`absolute inset-0 rounded-[2rem] bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative h-full p-8 sm:p-10 rounded-[2rem] bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.bgGradient} flex items-center justify-center mb-8 shadow-lg ${item.shadow} group-hover:shadow-xl transition-all duration-500 border border-white`}
                  >
                    <Icon className="w-9 h-9 text-slate-700 mix-blend-color-burn opacity-80" />
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-500 leading-relaxed font-medium">
                    {item.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-t-full bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:w-1/2 group-hover:opacity-100 transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
