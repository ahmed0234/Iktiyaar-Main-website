"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { ArrowRight, BarChart3, TrendingUp, Users, Target, PhoneCall, Calendar, MapPin, Search, Sparkles } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function SplitReveal({ text, delay = 0, isAccent = false, accentClass = "" }: { text: string, delay?: number, isAccent?: boolean, accentClass?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} style={{ display: "inline" }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden" }} className="mr-[0.22em]">
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.05 }}
            className={isAccent ? accentClass : ""}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function TiltCard({ children, className = "", intensity = 10 }: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 150, damping: 20 });
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <section ref={ref} className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md px-4 py-1.5 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
            Client Transformations
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black tracking-tight text-slate-900 leading-[1.05] mb-8">
          <SplitReveal text="The Transformations" delay={0.1} />
          <br />
          <SplitReveal text="Behind The" delay={0.3} />{" "}
          <SplitReveal text="Numbers." delay={0.4} isAccent accentClass="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          We don't just build websites. We build predictable growth ecosystems. Explore the strategies, the systems, and the data behind our most successful partnerships.
        </motion.p>
      </div>
    </section>
  );
}

// ─── GALLERY ITEM ────────────────────────────────────────────────────────────
type CaseStudyProps = {
  id: string;
  index: number;
  industry: string;
  title: string;
  headline: string;
  description: string;
  metrics: { val: string; label: string }[];
  visualItems: { icon: any; text: string; sub: string }[];
  href: string;
  theme: "blue" | "emerald" | "cyan";
  align: "left" | "right";
};

function GalleryItem({ study }: { study: CaseStudyProps }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yOffset = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Theme configurations
  const themes = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      glow: "rgba(37,99,235,0.15)",
      gradient: "from-blue-600 to-sky-400",
      glowBg: "bg-blue-400/20",
    },
    emerald: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      glow: "rgba(16,185,129,0.15)",
      gradient: "from-emerald-500 to-teal-400",
      glowBg: "bg-emerald-400/20",
    },
    cyan: {
      text: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      glow: "rgba(6,182,212,0.15)",
      gradient: "from-cyan-500 to-blue-400",
      glowBg: "bg-cyan-400/20",
    }
  };
  const t = themes[study.theme];
  const isLeft = study.align === "left";

  return (
    <section ref={ref} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Subtle premium grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015] text-slate-900" style={{ backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isLeft ? "" : "lg:flex-row-reverse"}`}>
          
          {/* TEXT CONTENT */}
          <div className="flex-1 space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full border ${t.border} ${t.bg} ${t.text}`}>
                {study.industry}
              </span>
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                Case Study {study.id}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight"
            >
              {study.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl"
            >
              {study.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {study.metrics.map((m, i) => (
                <div key={i}>
                  <p className={`text-3xl font-black bg-gradient-to-r ${t.gradient} text-transparent bg-clip-text leading-none mb-1`}>
                    {m.val}
                  </p>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="pt-6"
            >
              <Link href={study.href} className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-[14px] font-bold transition-transform hover:scale-105">
                View Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* VISUAL EXPERIENCE */}
          <div className="flex-1 w-full relative perspective-1000">
            {/* Subtle background glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full ${t.glowBg} blur-[80px] pointer-events-none opacity-30`} />
            
            <motion.div style={{ y: yOffset }} className="relative z-10 pl-4 sm:pl-0">
              <TiltCard intensity={5} className="relative w-full aspect-[4/3] rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden group">
                
                {/* Subtle grid pattern inside card background like the mockup */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

                {/* Dashboard Top Bar */}
                <div className="absolute inset-x-0 top-0 h-14 bg-white/80 flex items-center px-6 gap-3 z-20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  </div>
                  <div className="ml-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                    {study.title.toUpperCase()} GROWTH ENGINE
                  </div>
                </div>

                {/* Cards Container */}
                <div className="absolute inset-0 mt-14 p-6 sm:p-8 flex flex-col gap-4 z-10">
                  {study.visualItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: EASE }}
                        className="flex items-center gap-5 p-4 sm:p-5 rounded-[16px] border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transform transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${t.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-bold text-slate-800 leading-none mb-1.5 truncate">{item.text}</p>
                          <p className="text-[12px] font-semibold text-slate-400 truncate">{item.sub}</p>
                        </div>
                        <div className="w-12 h-8 flex items-end gap-1 opacity-50 shrink-0">
                          {[40, 70, 50, 90, 100].map((h, j) => (
                            <div key={j} className={`flex-1 rounded-t-sm ${t.bg}`} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom Right Decorative Circle matching mockup */}
                <svg className="absolute -bottom-16 -right-16 w-80 h-80 text-slate-200 pointer-events-none opacity-40 z-0" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                </svg>

              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const caseStudies: CaseStudyProps[] = [
  {
    id: "01",
    index: 0,
    theme: "blue",
    align: "left",
    industry: "Roofing & Construction",
    title: "Roofing Co.",
    headline: "How We Helped A Roofing Company Build A Predictable Lead Pipeline.",
    description: "This roofing contractor had the crews and capacity, but lead flow was entirely reliant on weather and word-of-mouth. We engineered a local search and paid acquisition system that consistently turns clicks into qualified calls.",
    href: "/case-studies/1",
    metrics: [
      { val: "+215%", label: "Lead Volume" },
      { val: "-38%", label: "Cost Per Lead" },
      { val: "2.8x", label: "Revenue Growth" },
    ],
    visualItems: [
      { icon: Search, text: "Search Dominance", sub: "Local Map Pack & SEO" },
      { icon: Target, text: "High-Intent Ads", sub: "Google Ads Architecture" },
      { icon: PhoneCall, text: "Lead Capture", sub: "Conversion Optimized Funnels" },
    ]
  },
  {
    id: "02",
    index: 1,
    theme: "emerald",
    align: "right",
    industry: "Landscaping",
    title: "Landscaping Pro",
    headline: "Helping A Landscaping Company Turn Local Searches Into High-Value Projects.",
    description: "Competing in a crowded market, they struggled to stand out online. We revamped their digital presence, focusing on high-ticket service visibility to build a reliable engine for estimate requests.",
    href: "/case-studies/2",
    metrics: [
      { val: "+180%", label: "Estimate Requests" },
      { val: "Top 3", label: "Local Ranking" },
      { val: "+145%", label: "High-Ticket Leads" },
    ],
    visualItems: [
      { icon: MapPin, text: "Local Authority", sub: "Service Area Expansion" },
      { icon: TrendingUp, text: "Organic Growth", sub: "Content & SEO Strategy" },
      { icon: Users, text: "Trust Signals", sub: "Reputation Management" },
    ]
  },
  {
    id: "03",
    index: 2,
    theme: "cyan",
    align: "left",
    industry: "Healthcare",
    title: "Dentish",
    headline: "How We Helped Dentish Generate More Patient Appointments.",
    description: "Dentish provided excellent care but remained invisible to high-intent local searches. We built a connected patient acquisition ecosystem that turns search intent directly into scheduled appointments.",
    href: "/case-studies/3",
    metrics: [
      { val: "+312%", label: "Patient Leads" },
      { val: "+184%", label: "Appointments" },
      { val: "3.7x", label: "Return on Ad Spend" },
    ],
    visualItems: [
      { icon: BarChart3, text: "Full Attribution", sub: "End-to-End Tracking" },
      { icon: Calendar, text: "Seamless Booking", sub: "Landing Page Optimization" },
      { icon: Target, text: "Intent Targeting", sub: "Treatment-Specific Campaigns" },
    ]
  }
];

// ─── FINAL CTA ───────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-slate-950 overflow-hidden text-center flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8"
        >
          The Next Case Study <br/> Hasn't Been Written Yet.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto"
        >
          If we built these predictable growth systems for them, imagine what we could engineer for your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="group relative inline-flex items-center justify-center w-full sm:w-auto">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 opacity-60 blur-lg group-hover:opacity-100 group-hover:blur-xl transition-all duration-500" />
            <div className="relative inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 sm:px-10 sm:py-5 text-[15px] font-bold text-slate-900 transition-transform duration-300 group-hover:scale-[1.02]">
              <PhoneCall className="w-5 h-5 text-blue-600" />
              <span>Book A Growth Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
            </div>
          </Link>

          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/20 bg-white/5 text-white text-[15px] font-bold backdrop-blur-md transition-all hover:bg-white/10 w-full sm:w-auto">
            Let's Talk
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function CaseStudiesGallery() {
  return (
    <main className="bg-white min-h-screen selection:bg-blue-200 selection:text-blue-900">
      <HeroSection />
      
      <div className="flex flex-col">
        {caseStudies.map((study) => (
          <GalleryItem key={study.id} study={study} />
        ))}
      </div>

      <FinalCTA />
    </main>
  );
}
