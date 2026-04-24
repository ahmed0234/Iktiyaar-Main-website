"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Users,
  Mail,
  Send,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import WordReveal from "../seo/shared/WordReveal";

const deliverables = [
  "Reaching the exact decision-makers with verified contact data",
  "Crafting hyper-personalized messaging that demands attention",
  "Building automated, multi-step follow-up sequences",
  "Optimizing deliverability to ensure you always land in the primary inbox",
  "Turning cold replies into booked meetings seamlessly",
];

const roadmapSteps = [
  {
    icon: Users,
    label: "Prospect List",
    description: "Building a highly targeted list of your ideal buyers.",
    color: "#3B82F6",
    bgFrom: "from-blue-50",
    bgTo: "to-blue-100/60",
    glowColor: "rgba(59,130,246,0.2)",
  },
  {
    icon: Mail,
    label: "Personalized Email",
    description: "Crafting relevant, high-converting initial messages.",
    color: "#EC4899",
    bgFrom: "from-pink-50",
    bgTo: "to-pink-100/60",
    glowColor: "rgba(236,72,153,0.2)",
  },
  {
    icon: Send,
    label: "Follow-ups",
    description: "Automated, natural-sounding follow-ups to maximize response rates.",
    color: "#8B5CF6",
    bgFrom: "from-violet-50",
    bgTo: "to-violet-100/60",
    glowColor: "rgba(139,92,246,0.2)",
  },
  {
    icon: MessageCircle,
    label: "Replies",
    description: "Generating warm conversations and booked meetings.",
    color: "#F59E0B",
    bgFrom: "from-amber-50",
    bgTo: "to-amber-100/60",
    glowColor: "rgba(245,158,11,0.2)",
  },
];

/* ── Roadmap Step ──────────────────────────────────────────── */
function RoadmapStep({
  step,
  idx,
  isInView,
  isLast,
}: {
  step: (typeof roadmapSteps)[0];
  idx: number;
  isInView: boolean;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.3 + idx * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex items-start gap-5 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Vertical timeline track ── */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* Icon node */}
        <motion.div
          animate={{
            scale: hovered ? 1.15 : 1,
            boxShadow: hovered
              ? `0 0 30px 8px ${step.glowColor}`
              : "0 8px 24px rgba(0,0,0,0.06)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.bgFrom} ${step.bgTo} flex items-center justify-center border border-white/80 cursor-default transition-colors duration-300`}
          style={{
            borderColor: hovered ? `${step.color}40` : undefined,
          }}
        >
          <Icon
            className="w-6 h-6 transition-transform duration-300"
            style={{
              color: step.color,
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          />
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{
              duration: 0.6,
              delay: 0.5 + idx * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-[2px] flex-1 min-h-[40px] mt-2 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${step.color}30, ${roadmapSteps[idx + 1]?.color ?? step.color}15)`,
            }}
          />
        )}
      </div>

      {/* ── Content card ── */}
      <motion.div
        animate={{
          x: hovered ? 6 : 0,
          y: hovered ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`flex-1 pb-8 rounded-2xl px-5 py-4 -mt-1 transition-all duration-400 cursor-default ${
          hovered
            ? "bg-white/60 backdrop-blur-md shadow-lg border border-slate-100/60"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Step badge */}
        <div className="flex items-center gap-2.5 mb-1.5">
          <span
            className="text-[10px] font-[800] uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: hovered ? step.color : "#94A3B8" }}
          >
            Step {String(idx + 1).padStart(2, "0")}
          </span>
          <motion.div
            animate={{ width: hovered ? 24 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-px rounded-full"
            style={{ backgroundColor: `${step.color}50` }}
          />
        </div>

        <h4
          className="text-[17px] font-bold text-slate-900 mb-1 tracking-tight transition-colors duration-300"
          style={{ color: hovered ? step.color : undefined }}
        >
          {step.label}
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────── */
export default function ColdEmailsSolution() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatingY = useSpring(
    useTransform(scrollYProgress, [0, 1], [40, -40]),
    { stiffness: 80, damping: 30 }
  );

  return (
    <section
      ref={ref}
      className="relative py-8 sm:py-6 overflow-hidden bg-white"
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
        className="absolute bottom-[-50px] left-[-150px] w-[500px] h-[500px] rounded-full bg-indigo-50/20 blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-16 lg:gap-6">
          {/* ── Left — Content ──────────────────────────────── */}
              <div className="w-full lg:w-[60%] lg:sticky lg:top-32">
                <motion.span
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={
                    isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                  }
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
                >
                  Strategic Outbound
                </motion.span>

                <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-6">
                  <WordReveal text="We Build Cold Email Systems" delay={0.15} />
                  <br className="hidden sm:block" />
                  <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    <WordReveal text="That Start Conversations" delay={0.5} />
                  </span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-base text-slate-500 leading-relaxed font-medium mb-4 max-w-lg"
                >
                  At Ikhtiyaar, we don&apos;t send mass emails. We create targeted outreach systems designed to get replies. From prospect research to messaging and follow-ups, everything is built to feel relevant, natural, and valuable.
                </motion.p>

                {/* Deliverables list */}
                <div className="space-y-3 mb-10">
                  {deliverables.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.7 + idx * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ x: 6, scale: 1.01 }}
                      className="group flex items-center gap-3.5 p-3 rounded-xl hover:bg-emerald-50/40 transition-all duration-300 cursor-default"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/60 flex items-center justify-center shrink-0 group-hover:shadow-md group-hover:shadow-emerald-500/10 transition-all duration-300"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                      </motion.div>
                      <p className="text-[15px] font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors duration-300">
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
                  className="relative pl-5 border-l-[3px] border-red-500/40 max-w-lg"
                >
                  <p className="text-[15px] text-red-500 leading-relaxed font-medium">
                    This is not spam.{" "}
                    <span className="font-bold">
                      This is strategic outbound lead generation.
                    </span>
                  </p>
                </motion.div>
              </div>

          {/* ── Right — Roadmap Journey ────────────────────── */}
              <div className="w-full lg:w-[40%] relative">
                {/* Decorative glow behind roadmap */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/20 via-violet-50/15 to-transparent blur-3xl pointer-events-none"
                />

                {/* Floating accent card */}
                <motion.div
                  style={{ y: floatingY }}
                  className="absolute -top-4 -right-2 sm:right-4 z-20 hidden sm:block"
                >
                  <motion.div
                    animate={{
                      y: [-6, 6, -6],
                      rotate: [-1, 1, -1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.06 }}
                    className="px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] border border-white/60 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                        Outbound Engine
                      </span>
                    </div>
                    <p className="text-xl font-[900] text-slate-800 leading-none">
                      4 Stages
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      Research → Replies
                    </p>
                  </motion.div>
                </motion.div>

                {/* Roadmap steps */}
                <div className="relative z-10 space-y-0 pt-8 lg:pt-4">
                  {roadmapSteps.map((step, idx) => (
                    <RoadmapStep
                      key={step.label}
                      step={step}
                      idx={idx}
                      isInView={isInView}
                      isLast={idx === roadmapSteps.length - 1}
                    />
                  ))}
                </div>
              </div>
        </div>

      </div>
    </section>
  );
}
