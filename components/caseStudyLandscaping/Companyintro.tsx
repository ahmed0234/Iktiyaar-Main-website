"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "10+", label: "Years in business" },
  { value: "120", label: "Projects completed" },
  { value: "3★", label: "Average rating" },
  { value: "85%", label: "Client retention" },
];

const clientSaw = [
  "Beautiful, lasting transformations",
  "Happy homeowners, every time",
  "A skilled, reliable team",
  "A reputation worth recommending",
];

const ownerFelt = [
  "Seasonal slowdowns with no warning",
  "Inconsistent inquiry flow",
  "Unpredictable demand, month to month",
  "Growth that felt out of their control",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CompanyIntro() {
  const sectionRef = useRef(null);
  const contrastRef = useRef(null);
  const bridgeRef = useRef(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const contrastInView = useInView(contrastRef, { once: true, margin: "-100px" });
  const bridgeInView = useInView(bridgeRef, { once: true, margin: "-100px" });

  return (
    <section
      aria-label="Meet GreenScape Pro — company introduction"
      className="py-24 md:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Ambient backgrounds matching the rest of the ecosystem */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-400/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Centered Introduction ── */}
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-blue-500/40" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500">
                Company Profile
              </span>
              <span className="block w-8 h-px bg-blue-500/40" />
            </div>

            <h2 className="font-poppins text-4xl sm:text-6xl lg:text-[4rem] font-black text-slate-900 tracking-tight mb-6">
              Meet GreenScape <span className="text-blue-500">Pro</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
              A local reputation built <em className="not-italic text-blue-500">one yard at a time</em>, entirely through word-of-mouth.
            </p>
          </motion.div>
        </div>

        {/* ── Split Layout ── */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch mb-24 md:mb-32"
        >
          {/* Left — Editorial Image */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-slate-100 w-full shadow-2xl shadow-slate-200/50 min-h-[500px] border border-slate-200"
          >
            <Image
              src="https://images.unsplash.com/photo-1720805752653-10ddccea4c94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="James Harmon, founder of GreenScape Pro, reviewing landscaping plans on-site in Austin"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIRAAAQQCAgMAAAAAAAAAAAAAAQIDBBEABRIhMUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amk1W9Y7MhSiIUE8RlMlJOMZGM9xVl0pbdO2WPFjxWY6GUBCUoTgAClKUH//Z"
              priority
            />

            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

            {/* Owner badge */}
            <div className="absolute bottom-6 left-6 right-6 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-sm">
              <p className="text-white text-lg font-bold font-poppins tracking-wide">
                James Harmon
              </p>
              <p className="text-white/80 text-[13px] font-medium mt-1">
                Founder & Owner, GreenScape Pro
              </p>
            </div>
          </motion.div>

          {/* Right — Narrative Content */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-10">
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="space-y-5 text-base md:text-lg leading-[1.8] text-slate-500 font-medium"
            >
              <p className="text-xl md:text-2xl text-slate-800 font-bold font-poppins leading-snug mb-6 tracking-tight">
                GreenScape Pro didn&apos;t grow through flashy ads or aggressive sales pitches. They grew because they did great work, plain and simple.
              </p>
              <p>
                For over ten years, James and his team transformed backyards across Austin. Every project led to a referral. A neighbor would see a stunning new patio or a perfectly landscaped lawn, ask who did it, and the phone would ring.
              </p>
              <p>
                They had the craftsmanship, a dedicated crew, and incredibly loyal clients. By any normal standard, they were a successful local business. But relying solely on word-of-mouth meant they never truly controlled their own growth.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map(({ value, label }) => {
                const numberPart = value.replace(/[^0-9.]/g, '');
                const symbolPart = value.replace(/[0-9.]/g, '');
                return (
                  <div key={label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-3xl font-black font-poppins text-slate-900 mb-1.5 flex items-baseline gap-0.5 tracking-tight">
                      {numberPart}
                      {symbolPart && <span className="text-lg text-blue-500 font-bold">{symbolPart}</span>}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                      {label}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Owner quote */}
            <motion.blockquote
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              className="relative bg-blue-50/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-blue-100 mt-2 shadow-sm"
            >
              <div className="absolute top-6 left-6 text-7xl text-blue-200/40 font-poppins font-black leading-none select-none">
                "
              </div>
              <p className="relative z-10 font-poppins text-lg md:text-xl italic leading-relaxed text-slate-700 mb-6 mt-4 md:ml-4 font-medium">
                We knew the quality of our work spoke for itself. What we
                didn&apos;t have was a predictable way to keep new projects coming
                in when the referrals slowed down.
              </p>
              <cite className="relative z-10 not-italic text-[10px] font-bold tracking-[0.15em] uppercase text-blue-600 md:ml-4 flex items-center gap-3">
                <span className="w-6 h-px bg-blue-600"></span>
                James Harmon
              </cite>
            </motion.blockquote>
          </div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          variants={fadeIn}
          custom={0}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-20"
        />

        {/* ── Contrast Cards ── */}
        <motion.div
          ref={contrastRef}
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={contrastInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24 md:mb-32 max-w-5xl mx-auto"
        >
          {/* What clients saw */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 md:p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
            
            <h3 className="text-[14px] tracking-[0.1em] font-poppins font-bold  uppercase text-slate-900 mb-8 flex items-center gap-3 relative z-10 ">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              What clients saw
            </h3>
            <ul className="space-y-5 relative z-10">
              {clientSaw.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-sm sm:text-base lg:text-lg font-medium text-slate-600"
                >
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What the owner felt */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 md:p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors duration-500" />

            <h3 className="text-[14px] font-bold tracking-[0.1em] uppercase text-slate-900 mb-8 flex items-center gap-3 relative z-10 font-poppins">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              What the owner experienced
            </h3>
            <ul className="space-y-5 relative z-10">
              {ownerFelt.map((item) => (
                <li
                  key={item}
                  className="flex items-start ext-sm sm:text-base lg:text-lg gap-4 text-sm font-medium text-slate-600"
                >
                  <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Cinematic Bridge ── */}
        <motion.div
          ref={bridgeRef}
          initial="hidden"
          animate={bridgeInView ? "visible" : "hidden"}
          className="text-center px-4"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="font-poppins font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-slate-900 mb-10 max-w-3xl mx-auto tracking-tight"
          >
            <span className="text-slate-300">The craftsmanship was proven.</span>
            <br />
            <span className="text-slate-400">
              The reputation was established.
            </span>
            <br />
            <span className="text-blue-600 mt-3 block">But growth remained unpredictable.</span>
          </motion.div>

          <motion.div
            custom={0.2}
            variants={fadeIn}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <span className="block w-16 h-px bg-blue-500/20" />
            <span className="block w-2 h-2 rounded-full bg-blue-500/40" />
            <span className="block w-16 h-px bg-blue-500/20" />
          </motion.div>

          <motion.div
            custom={0.35}
            variants={fadeUp}
            className="inline-flex flex-col items-center"
          >
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500 mb-6">
              That&apos;s where the real challenge began
            </p>
            <span className="animate-bounce text-blue-400 border border-blue-200 rounded-full p-2 bg-blue-50/50 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
