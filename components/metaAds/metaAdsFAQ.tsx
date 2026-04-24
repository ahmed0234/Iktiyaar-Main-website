"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { HelpCircle } from "lucide-react";
import WordReveal from "@/components/seo/shared/WordReveal";

const faqs = [
  {
    question: "How soon will I see results from my Meta Ads?",
    answer:
      "Meta Ads deliver traffic instantly. However, the first 7–14 days are the 'Learning Phase' where the algorithm optimizes. Most clients see stabilized, profitable ROAS within the first 2 to 4 weeks as we refine creatives and audience targeting.",
  },
  {
    question: "What makes your Meta Ads strategy different from other agencies?",
    answer:
      "We focus on 'Performance Creative' the single biggest lever for success today. We don't just set up campaigns we engineer high-converting visual assets and psychological triggers that stop the scroll and turn passive scrollers into active buyers.",
  },
  {
    question: "How much ad spend do I need to start with?",
    answer:
      "Budget depends on your specific industry and conversion goals. We typically recommend a starting test budget that allows for at least 50 conversions per week to help the Meta algorithm exit the learning phase and optimize for the lowest possible cost per acquisition.",
  },
  {
    question: "How do you track and report on actual ROAS?",
    answer:
      "We use a combination of Meta Pixel, Conversions API (CAPI), and third-party attribution tools to ensure data accuracy. You'll get a real-time dashboard showing exactly where your profit is coming from, with no vanity metrics in sight.",
  },
  {
    question: "Do you handle the creative production (images & videos)?",
    answer:
      "Absolutely. In the current Meta ecosystem, creative is the new targeting. Our in-house team produces scroll-stopping images, high-energy Reels/Shorts, and high-converting ad copy designed specifically to drive business outcomes.",
  },
];

/* ── Individual FAQ Item ─────────────────────────────────────────── */
function FaqItem({
  faq,
  idx,
  isInView,
}: {
  faq: (typeof faqs)[0];
  idx: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.5,
        delay: 0.15 + idx * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.998 }}
        className={`w-full flex items-center justify-between gap-4 p-6 rounded-2xl backdrop-blur-sm border shadow-sm transition-all duration-300 text-left cursor-pointer ${
          isOpen
            ? "bg-blue-50/40 border-blue-100/60 shadow-md shadow-blue-50/30"
            : "bg-white/75 border-slate-100/80 hover:shadow-lg hover:shadow-blue-50/20 hover:border-blue-100/40"
        }`}
      >
        <span className="text-[15px] sm:text-base font-bold text-slate-900 pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{
            rotate: isOpen ? 135 : 0,
            backgroundColor: isOpen ? "rgb(219 234 254)" : "rgb(241 245 249)",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors duration-300"
        >
          <span className="text-blue-600 font-bold text-lg leading-none">+</span>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-6 pb-6 pt-3"
            >
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function MetaAdsFaq() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const floatingY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    { stiffness: 50, damping: 25 }
  );
  const floatingRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [10, -10]),
    { stiffness: 50, damping: 25 }
  );

  return (
    <section
      ref={ref}
      className="relative py-6 sm:py-12 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white"
    >
      {/* Atmospheric */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-blue-50/15 blur-[140px] pointer-events-none" />

      {/* ── Dimensional Floating Status Badges ────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="max-w-7xl mx-auto h-full relative px-4 sm:px-6">
          
          {/* Badge 1: Left Side Top */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [40, -40]) }}
            className="absolute left-[3%] lg:left-[5%] top-[20%] hidden md:block"
          >
            <motion.div
              animate={{ y: [-6, 6, -6], rotateZ: [-1.5, 1.5, -1.5] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="px-4 py-2.5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-blue-500/5 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">98% Satisfaction</span>
            </motion.div>
          </motion.div>

          {/* Badge 2: Right Side Mid */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]) }}
            className="absolute right-[3%] lg:right-[5%] top-[50%] hidden md:block"
          >
            <motion.div
              animate={{ y: [6, -6, 6], rotateZ: [1.5, -1.5, 1.5] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="px-4 py-2.5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-blue-500/5 flex items-center gap-2"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Expert Support</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase mb-4 block"
          >
            Common Questions
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-[900] tracking-tight text-slate-900 leading-[1.1] mb-4">
            <WordReveal text="Got Questions?" delay={0.1} />{" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              <WordReveal text="We've Got Answers" delay={0.3} />
            </span>
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} faq={faq} idx={idx} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
