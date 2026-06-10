"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Service Data ─────────────────────────────────────────────────────────────
const services = [
  {
    title: "Customer Acquisition",
    description:
      "Ads, SEO, & demand generation designed for profitable growth.",
    icon: "/services/customeraquisition.png",
    features: ["Google & Meta Ads", "SEO & Local Search", "Lead Generation"],
  },
  {
    title: "Conversion & Revenue",
    description:
      "Websites, funnels, & optimization that turn traffic into money.",
    icon: "/services/conversion.png",
    features: ["Landing Pages", "Funnel Design", "A/B Testing"],
  },
  {
    title: "Operations & Automation",
    description: "CRMs, workflows, and reporting that eliminate chaos.",
    icon: "/services/operations.png",
    features: ["CRM Setup", "Workflow Automation", "Analytics"],
  },
  {
    title: "Staffing & Execution",
    description: "We hire, manage, and execute — so you don't.",
    icon: "/services/staffing.png",
    features: ["Dedicated Teams", "Project Management", "Quality Assurance"],
  },
];

// ─── Split Text Animation ─────────────────────────────────────────────────────
function SplitTextReveal({
  text,
  className,
  delay = 0,
  isBlue = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  isBlue?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-flex overflow-hidden mr-[0.3em]"
        >
          <motion.span
            initial={{ y: "110%", rotateX: -80 }}
            animate={
              isInView ? { y: "0%", rotateX: 0 } : { y: "110%", rotateX: -80 }
            }
            transition={{
              duration: 0.8,
              delay: delay + wordIndex * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block will-change-transform ${
              isBlue
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

// ─── Curved SVG Divider between cards ─────────────────────────────────────────
function CurvedDivider({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Each divider has a slightly different curve
  const paths = [
    "M 1 0 C 1 30, 0 70, 1 100",
    "M 0 0 C 0 25, 2 75, 0 100",
    "M 1 0 C 1 40, -0.5 60, 1 100",
  ];

  return (
    <div
      ref={ref}
      className="hidden lg:flex items-center justify-center self-stretch py-8"
    >
      <motion.svg
        width="3"
        height="100%"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
        className="h-[70%] overflow-visible"
        fill="none"
      >
        <defs>
          <linearGradient
            id={`divider-grad-${index}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="30%" stopColor="rgba(59,130,246,0.25)" />
            <stop offset="50%" stopColor="rgba(96,165,250,0.4)" />
            <stop offset="70%" stopColor="rgba(59,130,246,0.25)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={paths[index % paths.length]}
          stroke={`url(#divider-grad-${index})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: 0.4 + index * 0.15,
            ease: "easeOut",
          }}
        />
        {/* Glowing dot that travels along the divider */}
        <motion.circle
          r="2"
          fill="rgba(96,165,250,0.8)"
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0, 1, 1, 0],
                  cy: [0, 50, 50, 100],
                  cx: [1, 0.5, 1.5, 1],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 3,
            delay: 1.5 + index * 0.2,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          <animate
            attributeName="filter"
            values="blur(0px);blur(2px);blur(0px)"
            dur="3s"
            repeatCount="indefinite"
          />
        </motion.circle>
      </motion.svg>
    </div>
  );
}

// ─── Service Card with 3D depth ───────────────────────────────────────────────
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse-based 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig,
  );

  // Glare follow
  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [20, 80]),
    springConfig,
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [20, 80]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex-1 min-w-0 relative group/card"
      style={{ perspective: "800px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: isHovered ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-full"
      >
        {/* Outer glow ring */}
        <div
          className="absolute -inset-[1px] rounded-3xl transition-all duration-700 pointer-events-none"
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(96,165,250,0.08), rgba(59,130,246,0.12))"
              : "transparent",
            boxShadow: isHovered
              ? "0 0 60px 8px rgba(59,130,246,0.08), 0 30px 60px -20px rgba(59,130,246,0.15)"
              : "none",
          }}
        />

        {/* Card body */}
        <div
          className={`relative h-full rounded-3xl px-8 py-10 transition-all duration-500 overflow-hidden ${
            isHovered
              ? "bg-white border border-blue-100/60 shadow-2xl shadow-blue-500/[0.06]"
              : "bg-white/60 border border-slate-100/80 shadow-lg shadow-slate-200/20 backdrop-blur-sm"
          }`}
        >
          {/* Mouse-following glare */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.6 : 0,
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(59,130,246,0.06) 0%, transparent 60%)`,
              ),
            }}
          />

          {/* Shine sweep on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute w-[150%] h-[200%] bg-gradient-to-br from-white/30 via-transparent to-transparent"
              animate={{
                x: isHovered ? ["-150%", "100%"] : "-150%",
                rotate: 25,
              }}
              transition={{
                x: isHovered
                  ? { duration: 1, ease: "easeInOut" }
                  : { duration: 0 },
              }}
              style={{ top: "-50%", left: "-25%" }}
            />
          </motion.div>

          {/* Icon container */}
          <motion.div
            className="relative z-10 mb-7"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                isHovered
                  ? "bg-gradient-to-br from-blue-50 to-blue-100/80 shadow-lg shadow-blue-500/10"
                  : "bg-gradient-to-br from-slate-50 to-blue-50/50"
              }`}
            >
              {/* Ambient glow behind icon */}
              <div
                className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 ${
                  isHovered ? "opacity-60" : "opacity-0"
                } bg-blue-400/20`}
              />
              <div className="relative w-12 h-12">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3 tracking-tight">
            {service.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-[15px] text-slate-500 leading-relaxed mb-6 font-medium">
            {service.description}
          </p>

          {/* Feature chips */}
          <div className="relative z-10 flex flex-wrap gap-2 mb-8">
            {service.features.map((feature, fi) => (
              <motion.span
                key={fi}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-400 ${
                  isHovered
                    ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/5"
                    : "bg-slate-50 text-slate-400"
                }`}
                animate={{ scale: isHovered ? 1.03 : 1 }}
                transition={{ delay: fi * 0.04 }}
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* Learn More link */}
          <motion.a
            href="#"
            className="relative z-10 inline-flex items-center gap-2 text-sm font-bold tracking-wide group/link cursor-pointer"
            animate={{
              color: isHovered ? "rgb(37, 99, 235)" : "rgb(100, 116, 139)",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="relative">
              LEARN MORE
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-[-3px] left-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
            <motion.span
              animate={{
                x: isHovered ? 4 : 0,
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Services Section ────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-16 lg:py-8 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white"
    >
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large soft blue orb top-right */}
        <div className="absolute top-[-100px] right-[-200px] w-[700px] h-[700px] rounded-full bg-blue-100/25 blur-[120px]" />
        {/* Smaller accent orb bottom-left */}
        <div className="absolute bottom-[-50px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-50/30 blur-[100px]" />
        {/* Center subtle radial overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-blue-50/10 blur-[150px]" />
      </div>

      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #3b82f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          {/* Subtitle badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="text-[13px] font-bold tracking-[0.25em] text-blue-500 uppercase">
              What We Take Over
            </span>
          </motion.div>

          {/* Main title with split text animation */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            <SplitTextReveal text="Your Entire Growth Engine." delay={0.1} />
            <br className="hidden sm:block" />
            <SplitTextReveal text="Under One" delay={0.5} />{" "}
            <SplitTextReveal text="Roof." delay={0.7} isBlue />
          </h2>

          {/* Animated underline below heading */}
          <motion.div
            className="mx-auto mt-6"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 80, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 mx-auto" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-base lg:text-lg text-slate-500 max-w-xl mx-auto font-medium leading-relaxed"
          >
            Everything your business needs to acquire, convert, and retain —
            managed entirely by us.
          </motion.p>
        </div>

        {/* ─── Service Cards Grid with Curved Dividers ────────────────────── */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 mb-12">
          {services.map((service, index) => (
            <React.Fragment key={service.title}>
              <ServiceCard service={service} index={index} />
              {/* Curved divider between cards (not after the last one) */}
              {index < services.length - 1 && <CurvedDivider index={index} />}
            </React.Fragment>
          ))}
        </div>

        {/* ─── CTA Button ─────────────────────────────────────────────────── */}
        <Link href={"/contact"}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
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
              {/* Top highlight edge for 3D effect */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Bottom dark edge for depth */}
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

              {/* Hover color shift overlay */}
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
                Get My Growth Audit
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
        </Link>
      </div>
    </section>
  );
}
