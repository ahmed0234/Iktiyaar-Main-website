"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  PenTool,
  ShieldCheck,
  Zap,
  Split,
  MessageSquare,
} from "lucide-react";
import WordReveal from "@/components/seo/shared/WordReveal";

const includes = [
  {
    icon: Search,
    title: "Prospect Research & List Building",
    description:
      "We identify and build targeted lists of high-quality prospects based on your ideal customer profile.",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100/50",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: PenTool,
    title: "Email Strategy & Copywriting",
    description:
      "We craft personalized, conversion-focused email sequences that encourage replies.",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100/50",
    shadow: "shadow-indigo-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Inbox Setup & Deliverability Optimization",
    description:
      "We ensure your emails land in inboxes — not spam folders.",
    gradient: "from-sky-500 to-blue-500",
    bgGradient: "from-sky-50 to-blue-50/50",
    shadow: "shadow-sky-500/20",
  },
  {
    icon: Zap,
    title: "Automated Follow-Up Sequences",
    description:
      "We create smart follow-ups that increase response rates without being intrusive.",
    gradient: "from-blue-600 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50/50",
    shadow: "shadow-blue-600/20",
  },
  {
    icon: Split,
    title: "A/B Testing & Optimization",
    description:
      "We test subject lines, messaging, and targeting to improve performance over time.",
    gradient: "from-blue-400 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50/50",
    shadow: "shadow-blue-400/20",
  },
  {
    icon: MessageSquare,
    title: "Reply Handling & Lead Qualification (Optional)",
    description:
      "We help manage responses and identify qualified leads ready for the next step.",
    gradient: "from-blue-700 to-indigo-800",
    bgGradient: "from-blue-100/30 to-indigo-100/30",
    shadow: "shadow-blue-700/20",
  },
];

export default function ColdEmailsInclude() {
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
            <WordReveal text="Everything You Need to Scale" delay={0.1} />
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

                <div className="relative h-full p-8 sm:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.12)] transition-all duration-500 flex flex-col items-center text-center group/card overflow-hidden">
                  {/* Decorative background shape */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.bgGradient} rounded-full blur-3xl opacity-0 group-hover/card:opacity-50 transition-opacity duration-700`} />
                  
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${item.bgGradient} flex items-center justify-center mb-8 shadow-lg ${item.shadow} group-hover/card:shadow-2xl transition-all duration-500 border border-white/80 relative z-10`}
                  >
                    <Icon className="w-9 h-9 text-blue-600 opacity-90 group-hover/card:scale-110 transition-transform duration-500" />
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover/card:text-blue-600 transition-colors duration-300 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed font-medium relative z-10">
                    {item.description}
                  </p>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-700 translate-y-full group-hover/card:translate-y-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
