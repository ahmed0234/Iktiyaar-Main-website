"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  FileSearch,
  Target,
  Settings,
  PenTool,
  Link2,
  Activity,
} from "lucide-react";
import WordReveal from "./shared/WordReveal";

const seoSteps = [
  {
    icon: FileSearch,
    title: "Deep-Dive Audit",
    description:
      "We dissect your site's technical health, content gaps, and competitive landscape to create a strategic roadmap.",
  },
  {
    icon: Target,
    title: "Keyword Strategy",
    description:
      "We identify high-intent keywords your ideal customers are searching — and map them to pages designed to convert.",
  },
  {
    icon: Settings,
    title: "Technical Optimization",
    description:
      "From site speed to schema markup, we fix every technical issue holding your rankings back.",
  },
  {
    icon: PenTool,
    title: "Content Architecture",
    description:
      "We create authoritative, conversion-focused content that Google rewards and your audience trusts.",
  },
  {
    icon: Link2,
    title: "Authority Building",
    description:
      "Strategic link acquisition and digital PR to build the domain authority that pushes you past competitors.",
  },
  {
    icon: Activity,
    title: "Tracking & Scaling",
    description:
      "Real-time dashboards, monthly reports, and continuous optimization to compound your growth month over month.",
  },
];

/* ── Process Step Card with 3D Tilt ──────────────────────────────── */
function StepCard({
  step,
  idx,
  isInView,
}: {
  step: (typeof seoSteps)[0];
  idx: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 250, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springCfg);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, 85]), springCfg);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, 85]), springCfg);

  const Icon = step.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + idx * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setHovered(false);
      }}
      className="group relative"
      style={{ perspective: "700px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full"
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-[1px] rounded-3xl transition-all duration-700 pointer-events-none"
          style={{
            background: hovered
              ? "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(96,165,250,0.06), rgba(59,130,246,0.10))"
              : "transparent",
            boxShadow: hovered
              ? "0 0 50px 6px rgba(59,130,246,0.06), 0 25px 50px -15px rgba(59,130,246,0.12)"
              : "none",
          }}
        />

        <div
          className={`relative h-full rounded-3xl px-7 py-8 transition-all duration-500 overflow-hidden ${
            hovered
              ? "bg-white border border-blue-100/60 shadow-2xl shadow-blue-500/[0.06]"
              : "bg-white/70 backdrop-blur-sm border border-slate-100/80 shadow-lg shadow-slate-100/20"
          }`}
        >
          {/* Mouse-tracking glare */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-400"
            style={{
              opacity: hovered ? 0.5 : 0,
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(59,130,246,0.07) 0%, transparent 55%)`
              ),
            }}
          />

          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute w-[150%] h-[200%] bg-gradient-to-br from-white/25 via-transparent to-transparent"
              animate={{
                x: hovered ? ["-150%", "100%"] : "-150%",
                rotate: 25,
              }}
              transition={{
                x: hovered ? { duration: 0.8, ease: "easeInOut" } : { duration: 0 },
              }}
              style={{ top: "-50%", left: "-25%" }}
            />
          </motion.div>

          {/* Step number — large watermark */}
          <div
            className={`absolute top-4 right-5 text-6xl font-[900] select-none pointer-events-none transition-colors duration-500 ${
              hovered ? "text-blue-100/70" : "text-slate-100/50"
            }`}
          >
            {String(idx + 1).padStart(2, "0")}
          </div>

          {/* Icon */}
          <motion.div
            className="relative z-10 mb-5"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                hovered
                  ? "bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg shadow-blue-500/10"
                  : "bg-gradient-to-br from-slate-50 to-blue-50/50"
              }`}
            >
              <div
                className={`absolute w-14 h-14 rounded-2xl blur-xl transition-opacity duration-500 ${
                  hovered ? "opacity-50" : "opacity-0"
                } bg-blue-400/20`}
              />
              <Icon className="w-6 h-6 text-blue-600 relative z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <h3 className="relative z-10 text-lg font-bold text-slate-900 mb-2 tracking-tight">
            {step.title}
          </h3>
          <p className="relative z-10 text-sm text-slate-500 leading-relaxed font-medium">
            {step.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function SeoProcess() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatingImgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [60, -60]),
    { stiffness: 60, damping: 30 }
  );
  const floatingImgRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [-5, 5]),
    { stiffness: 60, damping: 30 }
  );

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white"
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-blue-50/15 blur-[150px] pointer-events-none" />

      {/* ── Dimensional Floating UI Cluster ────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="max-w-[1600px] mx-auto h-full relative px-6">
          
          {/* Card 1: Traffic Growth — Top Left Area */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]) }}
            className="absolute top-[12%] left-[10%] lg:left-[2%] hidden xl:block"
          >
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-blue-500/5 flex flex-col gap-3 min-w-[180px]"
            >
              <div className="flex items-end gap-1.5 h-10">
                {[40, 60, 50, 85, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }}
                    className="w-2.5 bg-green-500/80 rounded-t-sm"
                  />
                ))}
              </div>
              <div>
                <p className="text-xl font-[900] text-green-600 leading-none">+450%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Growth Engine</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: Campaign ROAS — Top Right Area */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]) }}
            className="absolute top-[18%] right-[1%] lg:right-[2%] hidden 2xl:block"
          >
            <motion.div
              animate={{ y: [12, -12, 12], rotate: [1.5, -1.5, 1.5] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="p-6 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-blue-600/5 min-w-[220px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Strategy Active</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-green-600 uppercase">Live Metrics</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100/60 pt-4">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">ROAS</p>
                  <p className="text-sm font-[900] text-blue-600">+320%</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">CPA</p>
                  <p className="text-sm font-[900] text-slate-900">$12.50</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: Google ROI Pill — Bottom Left Area */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 120]) }}
            className="absolute bottom-[10%] left-[-10%] lg:left-[-1%] hidden xl:block opacity-80"
          >
            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/60 backdrop-blur-md border border-white/70 shadow-xl"
            >
              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                <Target className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <p className="text-[11px] font-[900] text-slate-700">
                <span className="text-orange-600">+240%</span> Organic ROI
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
          >
            Our Process
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-5">
            <WordReveal text="A Proven System" delay={0.1} />
            <br className="hidden sm:block" />{" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              <WordReveal text="For Predictable Growth" delay={0.4} />
            </span>
          </h2>
          <motion.div
            className="mx-auto mt-5"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mx-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-5 text-base lg:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            No guesswork. No vanity metrics. Every step is engineered to move the
            needle on revenue — not just rankings.
          </motion.p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seoSteps.map((step, idx) => (
            <StepCard key={idx} step={step} idx={idx} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
