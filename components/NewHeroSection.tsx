"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import HeroLeftContent from "./hero/HeroLeftContent";
import HeroRightVisual from "./hero/HeroRightVisual";

export default function NewHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive parallax for mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  const visualRotateX = useTransform(springY, [-0.5, 0.5], [2.5, -2.5]);
  const visualRotateY = useTransform(springX, [-0.5, 0.5], [-2.5, 2.5]);
  const visualTranslateX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const visualTranslateY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

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

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-white flex items-center"
      style={{ perspective: "1200px" }}
    >
      {/* ─── UNIFIED AMBIENT BACKGROUND GLOWS ─── */}
      {/* Expansive top-right atmospheric light */}
      <div className="absolute top-0 right-0 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] bg-gradient-to-bl from-blue-100/60 via-sky-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Bottom-left soft ambient glow */}
      <div className="absolute -bottom-24 -left-24 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-gradient-to-tr from-blue-50/70 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Center-right luminous depth glow */}
      <div className="absolute top-1/4 right-1/6 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-400/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* ─── MAIN 2-COLUMN HERO CONTAINER ─── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Conversational Storytelling Sales Progression */}
          <div className="lg:col-span-6 xl:col-span-6 w-full z-20 flex flex-col justify-center">
            <HeroLeftContent />
          </div>

          {/* Right Column: Integrated 3D Marketing System Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              rotateX: visualRotateX,
              rotateY: visualRotateY,
            }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: visualTranslateX,
              y: visualTranslateY,
            }}
            className="lg:col-span-6 xl:col-span-6 w-full pt-4 lg:pt-0 z-10 flex flex-col justify-center"
          >
            <HeroRightVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
