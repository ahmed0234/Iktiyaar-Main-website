"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";

// ─── Company Data ──────────────────────────────────────────────────────────────
const companies = [
  { name: "Casey Insurance", logo: "/companies/Casey Insurance.jpg" },
  { name: "Pristine Clean", logo: "/companies/Pristine Clean.png" },
  {
    name: "Ridgewell Colorado",
    logo: "/companies/Ridgewell Colorado logo.png",
  },
  { name: "SINY Dermatology", logo: "/companies/SINY Dermatology.png" },
  { name: "Swisher Capital", logo: "/companies/Swisher Capital Logo.png" },
  { name: "Blu Dental", logo: "/companies/blu dental.png" },
  { name: "Bright Smile Dental", logo: "/companies/bright smile dental.png" },
  { name: "Daio", logo: "/companies/daio.png" },
  { name: "Wellrite", logo: "/companies/wellrite.jpg" },
];

const TOTAL = companies.length;
const RADIUS = 340; // orbital radius in px

export default function TrustedCompanies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Continuous rotation angle (in radians)
  const baseAngle = useMotionValue(0);

  // Mouse influence on rotation speed
  const mouseInfluence = useMotionValue(0);
  const smoothMouseInfluence = useSpring(mouseInfluence, {
    stiffness: 80,
    damping: 30,
  });

  // Mouse Y for vertical globe tilt
  const mouseYNorm = useMotionValue(0);
  const smoothMouseY = useSpring(mouseYNorm, { stiffness: 60, damping: 25 });
  const globeTiltX = useTransform(smoothMouseY, [-1, 1], [12, -12]);

  // Mouse X for horizontal globe tilt
  const mouseXNorm = useMotionValue(0);
  const smoothMouseX = useSpring(mouseXNorm, { stiffness: 60, damping: 25 });
  const globeTiltY = useTransform(smoothMouseX, [-1, 1], [-8, 8]);

  // Continuous animation loop
  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 50);
    const mouseOffset = smoothMouseInfluence.get() * 0.001;
    const newAngle = baseAngle.get() + (0.004 + mouseOffset) * (dt / 16);
    baseAngle.set(newAngle);
  });

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseInfluence.set(normX);
      mouseXNorm.set(normX);
      mouseYNorm.set(normY);
    },
    [mouseInfluence, mouseXNorm, mouseYNorm],
  );

  const handleMouseLeave = () => {
    mouseInfluence.set(0);
    mouseXNorm.set(0);
    mouseYNorm.set(0);
  };

  return (
    <section className="relative py-16 lg:py-6 overflow-hidden bg-white">
      {/* Section heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-600 backdrop-blur-md mb-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
            </span>
            TRUSTED PARTNERS
          </span>
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Companies That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Trust Us
            </span>
          </h2>
          <p className="mt-2 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            We partner with industry leaders who trust Ikhtiyaar to drive their
            growth, optimize operations, and deliver measurable results.
          </p>
        </motion.div>
      </div>

      {/* 3D Globe Carousel */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[320px] flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {/* Ambient glow behind the globe */}
        <div className="absolute w-[600px] h-[250px] rounded-full bg-blue-100/30 blur-[90px] pointer-events-none z-0" />

        {/* The 3D globe container — tilts with mouse */}
        <motion.div
          style={{
            rotateX: globeTiltX,
            rotateY: globeTiltY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {companies.map((company, index) => (
            <GlobeCard
              key={company.name}
              company={company}
              index={index}
              total={TOTAL}
              radius={RADIUS}
              baseAngle={baseAngle}
              isHovered={hoveredIndex === index}
              isNeighborHovered={
                hoveredIndex !== null &&
                hoveredIndex !== index &&
                Math.min(
                  Math.abs(hoveredIndex - index),
                  TOTAL - Math.abs(hoveredIndex - index),
                ) <= 1
              }
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </motion.div>

        {/* Depth fade overlays — left and right edges */}
        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  );
}

// ─── Individual Globe Card ────────────────────────────────────────────────────
interface GlobeCardProps {
  company: { name: string; logo: string };
  index: number;
  total: number;
  radius: number;
  baseAngle: ReturnType<typeof useMotionValue<number>>;
  isHovered: boolean;
  isNeighborHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function GlobeCard({
  company,
  index,
  total,
  radius,
  baseAngle,
  isHovered,
  isNeighborHovered,
  onHover,
  onLeave,
}: GlobeCardProps) {
  const angleStep = (Math.PI * 2) / total;
  const cardAngle = index * angleStep;

  // Use derived motion values to avoid re-renders (High Performance)
  const x = useTransform(baseAngle, (v) => Math.sin(v + cardAngle) * radius);
  const z = useTransform(baseAngle, (v) => Math.cos(v + cardAngle) * radius);
  
  // Depth-based properties
  const depthNorm = useTransform(z, (v) => (v + radius) / (2 * radius));
  const scale = useTransform(depthNorm, [0, 1], [0.6, 1.1]);
  const opacity = useTransform(depthNorm, [0, 1], [0.4, 1]);
  const zIndex = useTransform(depthNorm, [0, 1], [0, 100]);

  // Curvature: dip slightly at the sides
  const yBase = useTransform(baseAngle, (v) => {
    const angle = v + cardAngle;
    const sideAmount = Math.abs(Math.sin(angle));
    return sideAmount * sideAmount * 40;
  });

  // Local hover variables
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 300, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 300, damping: 25 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set(((e.clientY - rect.top) / rect.height - 0.5) * -12);
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
  };

  const handleCardMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    onLeave();
  };

  // Hover state offsets
  const hoverScale = isHovered ? 1.1 : isNeighborHovered ? 1.04 : 1;
  const hoverY = isHovered ? -8 : isNeighborHovered ? -3 : 0;

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      className="absolute flex items-center justify-center cursor-pointer will-change-transform"
      style={{
        x,
        y: useTransform(yBase, (v) => v + hoverY),
        z,
        scale: useTransform(scale, (s) => s * hoverScale),
        opacity,
        zIndex: isHovered ? 200 : zIndex,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: springTiltX,
          rotateY: springTiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <div
          className="absolute -inset-3 rounded-3xl pointer-events-none transition-all duration-500"
          style={{
            boxShadow: isHovered
              ? "0 0 30px 6px rgba(96,165,250,0.2), 0 0 60px 12px rgba(59,130,246,0.08)"
              : isNeighborHovered
                ? "0 0 15px 3px rgba(96,165,250,0.08)"
                : "none",
          }}
        />

        <div
          className={`relative w-[150px] h-[105px] rounded-2xl border flex items-center justify-center p-5 transition-all duration-400 ${
            isHovered ? "bg-white border-blue-200" : "bg-white/80 border-slate-200"
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={company.logo}
              alt={company.name}
              className={`object-contain transition-opacity duration-400 ${
                isHovered ? "opacity-100" : "opacity-75"
              }`}
              sizes="150px"
            />
          </div>
        </div>

        <div
          className="absolute -bottom-9 left-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium transition-all duration-300 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: `translateX(-50%) translateY(${isHovered ? 0 : 6}px)`,
          }}
        >
          {company.name}
        </div>
      </motion.div>
    </motion.div>
  );
}
