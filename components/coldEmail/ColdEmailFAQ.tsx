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
    question: "Cold email is spam.",
    answer:
      "Spam is unsolicited, irrelevant, and mass-sent. Our approach is the opposite. We use hyper-personalized, research-backed messages that provide real value to specific decision-makers who actually need your solution.",
  },
  {
    question: "Will people actually respond?",
    answer:
      "Yes, when the message is relevant. By focusing on quality over quantity and using AI to personalize every touchpoint, we consistently achieve response rates that far outperform generic outbound methods.",
  },
  {
    question: "What about deliverability?",
    answer:
      "We take deliverability seriously. We set up dedicated sending domains, implement proper SPF/DKIM/DMARC records, and use automated inbox warming to ensure your emails land in the primary inbox, not the spam folder.",
  },
  {
    question: "How do you find the leads?",
    answer:
      "We use a combination of premium data sources and custom research to build targeted lead lists. Every lead is verified for email accuracy to minimize bounce rates and protect your sender reputation.",
  },
  {
    question: "Do I need to provide the content?",
    answer:
      "Nope. Our team of expert copywriters handles everything from subject line testing to full sequence creation. We've optimized thousands of emails for maximum engagement and positive reply rates.",
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
export default function ColdEmailFAQ() {
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
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">95% Primary Inbox</span>
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
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">High Response Rate</span>
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
            <WordReveal text="Have Questions About" delay={0.1} />{" "}
            <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              <WordReveal text="Cold Outreach?" delay={0.3} />
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
