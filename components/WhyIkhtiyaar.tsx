"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import { ArrowRight, Zap, Users, TrendingUp, CheckCircle } from "lucide-react";

// ─── Narrative Data ─────────────────────────────────────────────────────────────
const narrativeBlocks = [
  {
    badge: "THE PROBLEM",
    badgeColor: "text-rose-500",
    badgeBg: "bg-rose-50",
    badgeBorder: "border-rose-200/50",
    heading: "If Growth Depends on You,",
    headingAccent: "You Don't Have a Business.",
    body: [
      "Right now, you're probably paying too much and getting too little.",
      "Different agencies. Confusing reports. No clear answers. You're working harder, but revenue isn't moving the way it should.",
    ],
    emphasis: "We fix that.",
    image: "/whyikthtiyaar/image_1.png",
    imageAlt: "Founder working alone at desk",
    icon: Zap,
    stats: [
      { value: "73%", label: "of founders feel overwhelmed by marketing" },
      { value: "4.2", label: "agencies hired on average before finding the right one" },
    ],
  },
  {
    badge: "THE SOLUTION",
    badgeColor: "text-blue-500",
    badgeBg: "bg-blue-50",
    badgeBorder: "border-blue-200/50",
    heading: "One Team. One System.",
    headingAccent: "Total Alignment.",
    body: [
      "We cut waste, connect execution, and run growth like an internal leadership team.",
      "No micromanaging agencies. No stitching together freelancers. One integrated team that owns your growth from strategy to execution.",
    ],
    emphasis: "You don't manage anything. You just redeem the profits.",
    image: "/whyikthtiyaar/image_2.png",
    imageAlt: "Collaborative team meeting at Ikhtiyaar",
    icon: Users,
    stats: [
      { value: "100%", label: "end-to-end ownership of your growth" },
      { value: "1", label: "team replaces 4+ agencies" },
    ],
  },
  {
    badge: "THE RESULT",
    badgeColor: "text-emerald-500",
    badgeBg: "bg-emerald-50",
    badgeBorder: "border-emerald-200/50",
    heading: "Your Business Runs.",
    headingAccent: "You Scale.",
    body: [
      "With systems in place and a dedicated team executing daily, your business stops being a job and starts being a machine.",
      "Predictable revenue. Clear reporting. Real growth — without you being in every meeting.",
    ],
    emphasis: "This is what operational freedom looks like.",
    image: "/whyikthtiyaar/image_3.png",
    imageAlt: "Scaled creative team working in synergy",
    icon: TrendingUp,
    stats: [
      { value: "3.2×", label: "average revenue increase in 6 months" },
      { value: "60%", label: "less time spent managing vendors" },
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

// ─── Floating Stat Card ─────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  delay,
  direction,
}: {
  value: string;
  label: string;
  delay: number;
  direction: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: direction === "left" ? -30 : 30,
        y: 20,
        scale: 0.9,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: direction === "left" ? -30 : 30, y: 20, scale: 0.9 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex items-start gap-3 group"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/80 flex items-center justify-center shadow-sm">
        <CheckCircle className="w-5 h-5 text-blue-500" strokeWidth={2} />
      </div>
      <div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
          {value}
        </div>
        <div className="text-[13px] text-slate-500 font-medium mt-0.5 leading-tight">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Image Block with 3D Depth ──────────────────────────────────────────────────
function ImageBlock({
  src,
  alt,
  index,
  isReversed,
}: {
  src: string;
  alt: string;
  index: number;
  isReversed: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: isReversed ? -60 : 60, scale: 0.92 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: isReversed ? -60 : 60, scale: 0.92 }
      }
      transition={{
        duration: 1,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full lg:w-[55%] shrink-0"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Glow behind image */}
        <div
          className="absolute -inset-4 rounded-[28px] blur-2xl opacity-40 pointer-events-none"
          style={{
            background:
              index === 0
                ? "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(251,113,133,0.08))"
                : index === 1
                ? "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(96,165,250,0.08))"
                : "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.08))",
          }}
        />

        {/* Main image container */}
        <div className="relative rounded-[20px] overflow-hidden shadow-2xl shadow-slate-200/40 border border-slate-100/60 group">
          {/* Image with parallax */}
          <motion.div
            style={{ y: smoothImageY }}
            className="relative w-full aspect-[16/11] scale-110"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 55vw"
              quality={90}
            />
          </motion.div>

          {/* Glassmorphic overlay gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isReversed
                ? "linear-gradient(to left, transparent 50%, rgba(255,255,255,0.06) 100%)"
                : "linear-gradient(to right, transparent 50%, rgba(255,255,255,0.06) 100%)",
            }}
          />

          {/* Corner accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`absolute bottom-0 h-[3px] bg-gradient-to-r ${
              index === 0
                ? "from-rose-400 to-rose-300"
                : index === 1
                ? "from-blue-500 to-blue-300"
                : "from-emerald-400 to-emerald-300"
            } ${isReversed ? "right-0 origin-right" : "left-0 origin-left"}`}
            style={{ width: "40%" }}
          />
        </div>

        {/* Decorative floating element */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${
            isReversed ? "-left-6 -bottom-6" : "-right-6 -bottom-6"
          } w-16 h-16 rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-xl shadow-xl flex items-center justify-center z-10`}
          style={{ transform: "translateZ(40px)" }}
        >
          {index === 0 && <Zap className="w-7 h-7 text-rose-400" />}
          {index === 1 && <Users className="w-7 h-7 text-blue-500" />}
          {index === 2 && <TrendingUp className="w-7 h-7 text-emerald-500" />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Narrative Block ────────────────────────────────────────────────────────────
function NarrativeBlock({
  block,
  index,
}: {
  block: (typeof narrativeBlocks)[0];
  index: number;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { once: true, margin: "-80px" });
  const isReversed = index % 2 !== 0;

  return (
    <div ref={blockRef} className="relative">
      <div
        className={`flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-12 lg:gap-16`}
      >
        {/* Image Side */}
        <ImageBlock
          src={block.image}
          alt={block.imageAlt}
          index={index}
          isReversed={isReversed}
        />

        {/* Text Side */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-[0.2em] uppercase border ${block.badgeBg} ${block.badgeColor} ${block.badgeBorder}`}
            >
              <block.icon className="w-3.5 h-3.5" strokeWidth={2.5} />
              {block.badge}
            </span>
          </motion.div>

          {/* Heading */}
          <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            <SplitTextReveal text={block.heading} delay={0.1} />
            <br />
            <SplitTextReveal
              text={block.headingAccent}
              delay={0.4}
              isAccent
            />
          </h3>

          {/* Body paragraphs */}
          <div className="space-y-4 mb-6">
            {block.body.map((paragraph, pi) => (
              <motion.p
                key={pi}
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 15 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.5 + pi * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[15px] sm:text-base text-slate-500 leading-relaxed font-medium"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Emphasis line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-5 mb-8"
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full ${
                index === 0
                  ? "bg-gradient-to-b from-rose-400 to-rose-200"
                  : index === 1
                  ? "bg-gradient-to-b from-blue-500 to-blue-300"
                  : "bg-gradient-to-b from-emerald-400 to-emerald-300"
              }`}
            />
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
              {block.emphasis}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6">
            {block.stats.map((stat, si) => (
              <StatCard
                key={si}
                value={stat.value}
                label={stat.label}
                delay={0.9 + si * 0.15}
                direction={si === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Connecting Thread (vertical line between blocks) ───────────────────────────
function ConnectingThread({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="flex justify-center py-4 lg:py-8">
      <div className="relative flex flex-col items-center">
        {/* Animated line */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-[2px] h-16 lg:h-24 origin-top"
          style={{
            background:
              "linear-gradient(to bottom, rgba(59,130,246,0.3), rgba(59,130,246,0.08))",
          }}
        />
        {/* Glowing dot at bottom */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/40"
        />
        {/* Pulse ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView
              ? {
                  scale: [1, 2.5],
                  opacity: [0.4, 0],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 2,
            delay: 1.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute bottom-0 w-3 h-3 rounded-full bg-blue-400"
        />
      </div>
    </div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────────
export default function WhyIkhtiyaar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [ctaHovered, setCtaHovered] = React.useState(false);

  return (
    <section
      ref={sectionRef}
      id="why-ikhtiyaar"
      className="relative py-10 lg:py-4 lg:pb-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/20 to-white"
    >
      {/* ─── Background effects ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large ambient blue orb */}
        <div className="absolute top-[20%] right-[-15%] w-[700px] h-[700px] rounded-full bg-blue-100/20 blur-[150px]" />
        {/* Smaller accent orb */}
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50/25 blur-[120px]" />
        {/* Center radial glow */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full bg-blue-50/10 blur-[180px]" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #3b82f6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-16 lg:mb-24">
          {/* Subtitle badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase">
              Why Ikhtiyaar
            </span>
          </motion.div>

          {/* Main heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            <SplitTextReveal text="Stop Managing." delay={0.1} />
            <br className="hidden sm:block" />
            <SplitTextReveal text="Start" delay={0.4} />
            {" "}
            <SplitTextReveal text="Growing." delay={0.55} isAccent />
          </h2>

          {/* Animated underline */}
          <motion.div
            className="mx-auto mt-6"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 80, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mx-auto" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-5 text-base lg:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Most founders are buried in execution. We take over the entire
            growth engine — so you can focus on the vision.
          </motion.p>
        </div>

        {/* ─── Narrative Blocks ───────────────────────────────────────────── */}
        <div className="space-y-4">
          {narrativeBlocks.map((block, index) => (
            <React.Fragment key={block.badge}>
              <NarrativeBlock block={block} index={index} />
              {index < narrativeBlocks.length - 1 && (
                <ConnectingThread index={index} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ─── CTA ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center mt-20 lg:mt-28"
        >
          {/* Label above CTA */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-slate-400 font-semibold tracking-wide mb-5"
          >
            Ready to stop doing everything yourself?
          </motion.p>

          <motion.button
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group/cta relative flex items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-5 font-bold text-white text-[16px] tracking-wide transition-all duration-500 cursor-pointer"
            style={{
              background:
                "linear-gradient(to top, #0f172a 0%, #1e293b 40%, #334155 100%)",
              boxShadow: ctaHovered
                ? "0 20px 50px -12px rgba(15,23,42,0.5), 0 8px 20px -8px rgba(15,23,42,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 10px 30px -8px rgba(15,23,42,0.35), 0 4px 12px -4px rgba(15,23,42,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Top highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {/* Bottom depth */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-900/50 to-transparent" />

            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ["-200%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "linear",
              }}
              className="absolute inset-0 z-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-[-25deg] pointer-events-none group-hover/cta:via-white/[0.15] transition-all duration-500"
            />

            {/* Hover color overlay */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(to top, #1e293b 0%, #334155 50%, #475569 100%)",
                opacity: ctaHovered ? 1 : 0,
              }}
            />

            {/* Side glow accents */}
            <div
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-opacity duration-500 pointer-events-none"
              style={{
                opacity: ctaHovered ? 0.5 : 0,
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-opacity duration-500 pointer-events-none"
              style={{
                opacity: ctaHovered ? 0.5 : 0,
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
              }}
            />

            <span className="relative z-10 drop-shadow-md">
              Read More
            </span>
            <motion.span
              className="relative z-10"
              animate={{
                x: ctaHovered ? 3 : 0,
                scale: ctaHovered ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
