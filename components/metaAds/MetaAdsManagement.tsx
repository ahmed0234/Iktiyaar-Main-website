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
import WordReveal from "../seo/shared/WordReveal";

const managementServices = [
  {
    title: "Audience Research & Targeting",
    description:
      "We identify and target the right audience based on behavior, interests, and intent — so every impression counts.",
    image: "/metaAdsPage/Management_Section/Audienceresearchtargetting.png",
    accent: "#3B82F6",
    accentLight: "rgba(59,130,246,0.12)",
  },
  {
    title: "Creative Strategy & Ad Design",
    description:
      "We craft and test scroll-stopping ad creatives that capture attention and drive meaningful action.",
    image: "/metaAdsPage/Management_Section/CreativeStrategy.png",
    accent: "#8B5CF6",
    accentLight: "rgba(139,92,246,0.12)",
  },
  {
    title: "Campaign Setup & Structure",
    description:
      "We build organized, scalable campaign architectures designed for maximum performance from day one.",
    image: "/metaAdsPage/Management_Section/CompaignStructure.png",
    accent: "#F59E0B",
    accentLight: "rgba(245,158,11,0.12)",
  },
  {
    title: "Retargeting Campaigns",
    description:
      "We re-engage high-intent visitors and warm leads to maximize conversions and eliminate wasted spend.",
    image: "/metaAdsPage/Management_Section/Retargating.png",
    accent: "#EF4444",
    accentLight: "rgba(239,68,68,0.12)",
  },
  {
    title: "A/B Testing & Optimization",
    description:
      "We continuously test creatives, audiences, and messaging to uncover what drives the best results.",
    image: "/metaAdsPage/Management_Section/AB_Testing.png",
    accent: "#EC4899",
    accentLight: "rgba(236,72,153,0.12)",
  },
  {
    title: "Performance Tracking",
    description:
      "We track every metric that matters and scale the campaigns that generate real, measurable profit.",
    image: "/metaAdsPage/Management_Section/PerformanceTracking.png",
    accent: "#06B6D4",
    accentLight: "rgba(6,182,212,0.12)",
  },
];

/* ── Service Card with 3D Tilt ─────────────────────────────── */
function ServiceCard({
  service,
  idx,
  isInView,
}: {
  service: (typeof managementServices)[0];
  idx: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 250, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springCfg
  );
  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [15, 85]),
    springCfg
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, 85]),
    springCfg
  );

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
        {/* Outer glow ring */}
        <div
          className="absolute -inset-[1px] rounded-3xl transition-all duration-700 pointer-events-none"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${service.accentLight}, transparent, ${service.accentLight})`
              : "transparent",
            boxShadow: hovered
              ? `0 0 50px 6px ${service.accentLight}, 0 25px 50px -15px ${service.accentLight}`
              : "none",
          }}
        />

        <div
          className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${
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
                  `radial-gradient(circle at ${gx}% ${gy}%, ${service.accentLight} 0%, transparent 55%)`
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
                x: hovered
                  ? { duration: 0.8, ease: "easeInOut" }
                  : { duration: 0 },
              }}
              style={{ top: "-50%", left: "-25%" }}
            />
          </motion.div>

          {/* Image area */}
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className={`object-cover transition-transform duration-700 ${
                hovered ? "scale-[1.06]" : "scale-100"
              }`}
            />
            {/* Gradient overlay from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-white/40 to-transparent pointer-events-none" />
            {/* Subtle color tint on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${service.accent}08, ${service.accent}15)`,
                opacity: hovered ? 1 : 0,
              }}
            />

            {/* Step number — top-right watermark */}
            <div
              className={`absolute top-4 right-5 text-5xl font-[900] select-none pointer-events-none transition-colors duration-500 ${
                hovered ? "text-white/60" : "text-white/30"
              }`}
            >
              {String(idx + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Content area */}
          <div className="relative px-7 pb-8 pt-2">
            {/* Accent dot */}
            <div className="flex items-center gap-2.5 mb-3">
              <motion.div
                animate={{ scale: hovered ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: service.accent }}
              />
              <div
                className="h-px flex-1 transition-all duration-500"
                style={{
                  background: hovered
                    ? `linear-gradient(to right, ${service.accent}40, transparent)`
                    : "linear-gradient(to right, rgba(148,163,184,0.15), transparent)",
                }}
              />
            </div>

            <h3
              className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight transition-colors duration-300"
              style={{ color: hovered ? service.accent : undefined }}
            >
              {service.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {service.description}
            </p>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] rounded-full"
            style={{
              background: `linear-gradient(to right, ${service.accent}, ${service.accent}99)`,
            }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────── */
export default function MetaAdsManagement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Atmospheric glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-blue-50/20 blur-[150px] pointer-events-none" />

      {/* ── Floating UI Elements ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="max-w-[1600px] mx-auto h-full relative px-6">
          {/* Floating pill — Top Left */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [60, -60]),
            }}
            className="absolute top-[6%] left-[3%] hidden xl:block"
          >
            <motion.div
              animate={{
                y: [-8, 8, -8],
                rotate: [-1, 1, -1],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl"
            >
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <p className="text-[11px] font-[800] text-slate-700">
                <span className="text-blue-600">6 Services</span>{" "}
                · Full Coverage
              </p>
            </motion.div>
          </motion.div>

          {/* Floating pill — Bottom Right */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [-30, 100]),
            }}
            className="absolute bottom-[8%] right-[3%] hidden xl:block opacity-80"
          >
            <motion.div
              animate={{ x: [-6, 6, -6] }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
              }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/60 backdrop-blur-md border border-white/70 shadow-xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[11px] font-[800] text-slate-700">
                End-to-End <span className="text-emerald-600">Management</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ──────────────────────────────── */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
          >
            What&apos;s Included
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-5">
            <WordReveal text="Complete Meta Ads" delay={0.1} />
            <br className="hidden sm:block" />{" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              <WordReveal text="Management" delay={0.4} />
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
            From audience research to performance tracking — we handle every
            aspect of your Meta Ads so you can focus on growing your business.
          </motion.p>
        </div>

        {/* ── Services Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {managementServices.map((service, idx) => (
            <ServiceCard
              key={service.title}
              service={service}
              idx={idx}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
