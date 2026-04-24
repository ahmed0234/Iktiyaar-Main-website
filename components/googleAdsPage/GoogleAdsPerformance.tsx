"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
} from "framer-motion";
import {
  TrendingUp,
  Target,
  BarChart3,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: TrendingUp,
    metric: "4.2x",
    label: "Average ROAS",
    description: "Our clients see consistent returns that far exceed industry benchmarks.",
    color: "#22D3EE",
    glowColor: "rgba(34,211,238,0.25)",
  },
  {
    icon: Target,
    metric: "–47%",
    label: "Cost Per Lead",
    description: "Precision targeting and bid optimization slash acquisition costs dramatically.",
    color: "#A78BFA",
    glowColor: "rgba(167,139,250,0.25)",
  },
  {
    icon: BarChart3,
    metric: "+186%",
    label: "Conversion Rate",
    description: "Optimized funnels and landing pages turn more clicks into revenue.",
    color: "#34D399",
    glowColor: "rgba(52,211,153,0.25)",
  },
];

/* ── Main Export ──────────────────────────────────────────────── */
export default function GoogleAdsPerformance() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0A0E1A 0%, #0D1225 35%, #0F1530 65%, #0A0E1A 100%)",
      }}
    >
      {/* ── Background Textures ─────────────────────────────── */}
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Atmospheric glow orbs */}
      <div
        className="absolute top-[-120px] right-[-180px] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-100px] left-[-150px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0.015) 50%, transparent 70%)",
        }}
      />
      {/* Cyan accent glow — center-right */}
      <div
        className="absolute top-[35%] right-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)",
        }}
      />

      {/* ── Content Container ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ═══════════════════════════════════════════════════
               LEFT — Text Content
              ═══════════════════════════════════════════════════ */}
          <div className="w-full lg:w-[48%]">
            {/* Section tag */}
            <motion.span
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={
                isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.25em] text-cyan-400 uppercase mb-5"
            >
              <Zap className="w-4 h-4" />
              Performance Dashboard
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-[2.8rem] font-[900] tracking-tight text-white leading-[1.1] mb-6"
            >
              Real-Time Insights.{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                Real Revenue Growth.
              </span>
            </motion.h2>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-slate-400 leading-relaxed font-medium mb-10 max-w-lg"
            >
              We don&apos;t just launch campaigns and hope for the best. Every
              decision is backed by live data, continuous A/B testing, and
              relentless optimization — so your ad spend works harder, every
              single day.
            </motion.p>

            {/* ── Performance Highlights ──────────────────────── */}
            <div className="space-y-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + idx * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ x: 8, scale: 1.01 }}
                    className="group relative flex items-start gap-4 p-4 rounded-2xl cursor-default transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(255,255,255,0.05)";
                      el.style.borderColor = `${item.color}30`;
                      el.style.boxShadow = `0 4px 30px ${item.glowColor}, inset 0 1px 0 ${item.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(255,255,255,0.02)";
                      el.style.borderColor = "rgba(255,255,255,0.04)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: `${item.color}12`,
                        border: `1px solid ${item.color}25`,
                      }}
                    >
                      <Icon
                        className="w-5.5 h-5.5 transition-all duration-300"
                        style={{ color: item.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 mb-1">
                        <span
                          className="text-2xl font-[900] leading-none tracking-tight"
                          style={{ color: item.color }}
                        >
                          {item.metric}
                        </span>
                        <span className="text-sm font-bold text-white/70">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Closing micro-statement */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-8 pl-5 border-l-[3px] max-w-md"
              style={{
                borderColor: "rgba(34,211,238,0.3)",
              }}
            >
              <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                Every metric is tracked. Every dollar is accounted for.{" "}
                <span className="text-cyan-400 font-bold">
                  That&apos;s the Ikhtiyaar standard.
                </span>
              </p>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════
               RIGHT — Visual Composition
              ═══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full lg:w-[52%] relative"
            style={{ perspective: "900px" }}
          >
            {/* Neon glow behind main image */}
            <div
              className="absolute inset-0 -inset-x-8 rounded-[3rem] blur-3xl pointer-events-none opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 60%, rgba(34,211,238,0.12) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
              }}
            />

            {/* Main dashboard image */}
            <motion.div
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative rounded-[2rem] overflow-hidden group transform-gpu"
            >
              {/* Glassmorphic border frame */}
              <div
                className="absolute -inset-[1px] rounded-[2rem] z-[1] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.25) 0%, rgba(59,130,246,0.1) 30%, transparent 50%, rgba(139,92,246,0.1) 70%, rgba(34,211,238,0.15) 100%)",
                }}
              />

              <div className="relative w-full aspect-[4/3] bg-slate-900/50 rounded-[2rem] overflow-hidden">
                <Image
                  src="/googleAds/performance/main_image.png"
                  alt="Google Ads ROI analytics dashboard showing maximized returns"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/60 via-transparent to-[#0A0E1A]/20 pointer-events-none" />

                {/* Neon edge glow — bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(34,211,238,0.5), rgba(59,130,246,0.3), transparent)",
                    boxShadow: "0 0 20px 2px rgba(34,211,238,0.15)",
                  }}
                />

                {/* Inner ring */}
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
              </div>
            </motion.div>

            {/* ── Floating Card — Bottom Right: CTR Stats ─────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -right-3 sm:right-4 z-20"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                whileHover={{ y: -10, scale: 1.04 }}
                className="relative px-5 py-4 rounded-2xl cursor-default overflow-hidden transform-gpu"
                style={{
                  background: "rgba(15,21,48,0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(34,211,238,0.08)",
                }}
              >
                {/* Neon glow accent — top edge */}
                <div
                  className="absolute top-0 left-4 right-4 h-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(34,211,238,0.6), transparent)",
                  }}
                />

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-wider">
                    Live Performance
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
                      CTR
                    </p>
                    <p className="text-xl font-[900] text-cyan-400 leading-none">
                      8.7%
                    </p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
                      ROAS
                    </p>
                    <p className="text-xl font-[900] text-emerald-400 leading-none">
                      5.2x
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-semibold mt-2">
                  Updated 2 min ago
                </p>
              </motion.div>
            </motion.div>

            {/* ── Floating Card — Top Left: Monitor Dashboard ──── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-4 -left-3 sm:-left-6 z-20"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="relative w-[140px] sm:w-[160px] rounded-2xl overflow-hidden cursor-default transform-gpu"
                style={{
                  background: "rgba(15,21,48,0.8)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), 0 0 25px rgba(139,92,246,0.06)",
                }}
              >
                {/* Neon glow accent — top */}
                <div
                  className="absolute top-0 left-3 right-3 h-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)",
                  }}
                />

                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/googleAds/performance/floating_image.png"
                    alt="Monitor Ad Performance — CTR, Impressions, Conversions"
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
