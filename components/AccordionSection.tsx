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
import { ChevronDown, Bot, Megaphone, Search, UsersRound, Share2, MapPin } from "lucide-react";

// ─── Accordion Data ─────────────────────────────────────────────────────────────
const accordionItems = [
  {
    id: "ai-automation",
    icon: Bot,
    title: "AI Automation of Internal Processes",
    content: [
      "We automate the work that slows your team down — follow-ups, lead handling, reporting, internal workflows, and repetitive tasks.",
      'The goal isn\'t "AI for the sake of AI."',
      "The goal is fewer mistakes, faster execution, and more time spent on decisions that matter.",
    ],
  },
  {
    id: "paid-ads",
    icon: Megaphone,
    title: "Paid Ads",
    content: [
      "We don’t run ads to “test things out” on your budget. We build campaigns around clear economics, who you want, what it costs to acquire them, and how fast you can scale. From funnel structure to ad angles, everything is tied to one thing: profitable growth, not vanity metrics.",
    ],
  },
  {
    id: "seo",
    icon: Search,
    title: "Search Engine Optimization",
    content: [
      "Paid ads stop the moment you stop paying. SEO compounds. We engineer search visibility that consistently brings in high-intent customers, reducing your dependency on ads while increasing margins month after month.",
    ],
  },
  {
    id: "staffing",
    icon: UsersRound,
    title: "Staffing & Team Infrastructure",
    content: [
      "We don’t just hire people. We design lean teams with clear roles, KPIs, and workflows,so work gets done without bottlenecks, micromanagement, or bloated payroll. The right people, in the right seats, producing measurable output.",
    ],
  },
  {
    id: "social-media",
    icon: Share2,
    title: "Social Media Management",
    content: [
      "We manage social media with one goal: influence buying decisions. From positioning to content to consistency, we turn social platforms into trust-building assets that support sales instead of chasing likes.",
    ],
  },
  {
    id: "local-search",
    icon: MapPin,
    title: "Local Search Optimization",
    content: [
      "When people search with intent, we make sure your business shows up first. We optimize your local presence so nearby customers find you, trust you, and choose you, without wasting money on low-quality traffic.",
    ],
  },
];

// ─── Split Text Reveal ──────────────────────────────────────────────────────────
function SplitTextReveal({
  text,
  className,
  delay = 0,
  isAccent = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  isAccent?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: "120%", rotateX: -80 }}
            animate={
              isInView
                ? { y: "0%", rotateX: 0 }
                : { y: "120%", rotateX: -80 }
            }
            transition={{
              duration: 0.85,
              delay: delay + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block will-change-transform ${
              isAccent
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
                : ""
            }`}
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── Single Accordion Item ──────────────────────────────────────────────────────
function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof accordionItems)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }
      }
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      {/* Divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1 + index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="h-px w-full origin-left"
        style={{
          background: isOpen
            ? "linear-gradient(to right, rgba(59,130,246,0.3), rgba(59,130,246,0.08), transparent)"
            : "linear-gradient(to right, rgba(148,163,184,0.25), rgba(148,163,184,0.08), transparent)",
        }}
      />

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 py-5 sm:py-6 text-left cursor-pointer group/btn focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
      >
        {/* Icon */}
        <motion.div
          animate={{
            background: isOpen
              ? "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(96,165,250,0.05))"
              : "linear-gradient(135deg, rgba(241,245,249,1), rgba(248,250,252,1))",
          }}
          transition={{ duration: 0.4 }}
          className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-400 ${
            isOpen
              ? "shadow-md shadow-blue-500/10"
              : "shadow-sm group-hover/btn:shadow-md"
          }`}
        >
          <Icon
            className={`w-[18px] h-[18px] sm:w-5 sm:h-5 transition-colors duration-400 ${
              isOpen
                ? "text-blue-500"
                : "text-slate-400 group-hover/btn:text-blue-400"
            }`}
            strokeWidth={2}
          />
        </motion.div>

        {/* Title */}
        <span
          className={`flex-1 text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
            isOpen
              ? "text-slate-900"
              : "text-slate-700 group-hover/btn:text-slate-900"
          }`}
        >
          {item.title}
        </span>

        {/* Chevron with rotation */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-400 ${
            isOpen
              ? "bg-blue-50 text-blue-500"
              : "bg-slate-50 text-slate-400 group-hover/btn:bg-blue-50/50 group-hover/btn:text-blue-400"
          }`}
        >
          <ChevronDown className="w-[18px] h-[18px]" strokeWidth={2.5} />
        </motion.div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.35, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 sm:pb-8 pl-14 sm:pl-[60px] pr-4">
              {/* Left accent bar */}
              <div className="relative">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute -left-5 top-0 bottom-0 w-[2px] rounded-full origin-top bg-gradient-to-b from-blue-400 to-blue-200"
                />

                {/* Content paragraphs */}
                <div className="space-y-4">
                  {item.content.map((paragraph, pi) => (
                    <motion.p
                      key={pi}
                      initial={{ opacity: 0, y: 10, x: -8 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + pi * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="text-[14px] sm:text-[15px] text-slate-500 leading-relaxed font-medium"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Left Visual Block (Image + Floating Overlays) ──────────────────────────────
function VisualBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const floatY1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [20, -20]),
    { stiffness: 100, damping: 30 }
  );
  const floatY2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [-15, 25]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 40, scale: 0.95 }
        }
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Glow behind image */}
        <div className="absolute -inset-6 rounded-[32px] bg-blue-100/30 blur-3xl pointer-events-none" />

        {/* Image container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/30 border border-slate-100/50">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/accordion/main_image.jpg"
              alt="Team member working on growth strategy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={90}
            />
          </div>

          {/* Subtle bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

          {/* Bottom accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 w-full h-[3px] origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-transparent"
          />
        </div>
      </motion.div>

      {/* Floating Element 1 — Organic Keywords Chart (top-right) */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -20, scale: 0.85 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, scale: 1 }
            : { opacity: 0, x: 40, y: -20, scale: 0.85 }
        }
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: floatY1 }}
        className="absolute -top-6 -right-4 sm:-right-8 lg:-right-10 w-[45%] sm:w-[42%] max-w-[200px] z-10"
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white/80 bg-white">
          {/* Subtle glow */}
          <div className="absolute -inset-2 rounded-2xl bg-blue-200/20 blur-xl pointer-events-none" />
          <div className="relative">
            <Image
              src="/accordion/floating_element.png"
              alt="Organic keywords growth chart"
              width={200}
              height={220}
              className="object-contain w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Floating Element 2 — SEO Checker (bottom-left) */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 20, scale: 0.85 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, scale: 1 }
            : { opacity: 0, x: -40, y: 20, scale: 0.85 }
        }
        transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: floatY2 }}
        className="absolute -bottom-8 -left-4 sm:-left-8 lg:-left-10 w-[48%] sm:w-[45%] max-w-[210px] z-10"
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white/80 bg-white">
          {/* Subtle glow */}
          <div className="absolute -inset-2 rounded-2xl bg-blue-200/20 blur-xl pointer-events-none" />
          <div className="relative">
            <Image
              src="/accordion/floating_element_2.png"
              alt="On-page SEO checker dashboard"
              width={210}
              height={240}
              className="object-contain w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────────
export default function AccordionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="relative py-8 lg:py-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f0f5ff 0%, #f5f8ff 30%, #f8faff 60%, #ffffff 100%)",
      }}
    >
      {/* ─── Background effects ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft blue orb top-left */}
        <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[140px]" />
        {/* Accent orb bottom-right */}
        <div className="absolute bottom-[-5%] right-[-8%] w-[500px] h-[500px] rounded-full bg-blue-50/30 blur-[120px]" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #3b82f6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Two-Column Layout ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* ─── Left Column: Heading + Visual ───────────────────────────── */}
          <div className="w-full lg:w-[44%] lg:sticky lg:top-32">
            {/* Section badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <span className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase">
                What We Do
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4">
              <SplitTextReveal text="We Run the System." delay={0.1} />
              <br />
              <SplitTextReveal text="You Keep the" delay={0.4} />
              {" "}
              <SplitTextReveal text="Results." delay={0.65} isAccent />
            </h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] text-slate-500 font-medium leading-relaxed mb-10 lg:mb-14 max-w-md"
            >
              From AI automation to local search, we handle the systems that
              drive growth — so you can stay focused on the big picture.
            </motion.p>

            {/* Visual block (image + floating overlays) */}
            <div className="hidden lg:block">
              <VisualBlock />
            </div>
          </div>

          {/* ─── Right Column: Accordion ─────────────────────────────────── */}
          <div className="w-full lg:w-[56%] lg:pt-2">
            {/* Mobile-only visual block (above the accordion on small screens) */}
            <div className="block lg:hidden mb-10">
              <VisualBlock />
            </div>

            {/* Accordion items */}
            <div>
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
              {/* Bottom border */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-px w-full origin-left"
                style={{
                  background:
                    "linear-gradient(to right, rgba(148,163,184,0.25), rgba(148,163,184,0.08), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
