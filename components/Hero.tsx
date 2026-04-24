"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position values for parallax (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate relative mouse position
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    // Reset to center gently
    mouseX.set(0);
    mouseY.set(0);
  };

  // Grid background perspective transforms
  const gridRotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const gridRotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  // Main Image perspective transforms
  const imageRotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const imageRotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  // Floating icon parallax transforms
  const floatX1 = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const floatY1 = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const floatX2 = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const floatY2 = useTransform(springY, [-0.5, 0.5], [30, -30]);

  const floatX3 = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const floatY3 = useTransform(springY, [-0.5, 0.5], [15, -15]);

  const floatX4 = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const floatY4 = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] pt-28 pb-12 overflow-hidden flex items-center bg-white group/hero"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Interactive Grid Background */}
      <motion.div
        style={{ rotateX: gridRotateX, rotateY: gridRotateY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none origin-center"
      >
        <div
          className="w-[200vw] h-[200vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-1000 text-blue-200/70 group-hover/hero:text-blue-400/40"
          style={{
            backgroundImage: `radial-gradient(circle at center, transparent 10%, white 60%), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: `100% 100%, 80px 80px, 80px 80px`,
            backgroundPosition: `center, center, center`,
          }}
        />
      </motion.div>

      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Swapped layout: Text on Right, Visuals on Left (as requested) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          {/* Left Side: Main Content Zone */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10 pl-0 lg:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-4 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs sm:text-[12px] ">
                CUT YOUR COSTS BY 50%. GROW REVENUE BY 20%
              </span>
            </motion.div>

            <div className="text-4xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[0.95] mb-6 flex flex-wrap gap-y-2">
              {"We Run The Business You"
                .split(" ")
                .map((word, wordIndex, array) => {
                  const previousCharsCount = array
                    .slice(0, wordIndex)
                    .join("").length;
                  return (
                    <span
                      key={`word-${wordIndex}`}
                      className="inline-flex whitespace-nowrap mr-[0.3em]"
                    >
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={`char-${wordIndex}-${charIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay:
                              1.6 + (previousCharsCount + charIndex) * 0.03,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  );
                })}
              <div className="w-full hidden lg:block" />
              <span className="relative inline-block whitespace-nowrap mt-2">
                <span className="flex">
                  {"Keep The Profits".split("").map((char, i) => (
                    <motion.span
                      key={`blue-char-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 2.2 + i * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block whitespace-pre text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-sm"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                {/* Curved Underline */}
                <motion.svg
                  className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-5 text-blue-500 overflow-visible pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 2 8 C 50 2 150 2 198 10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 3.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lg text-slate-600 mb-6 max-w-lg leading-relaxed font-medium"
            >
              Ikhtiyaar takes full control of your marketing, systems, and
              staffing so your business runs leaner, smarter, and more
              profitable without you managing anything.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 3.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group/btn relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-b from-blue-500 to-blue-700 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-[0_5px_15px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)] border border-blue-400/40 ring-1 ring-inset ring-white/20"
              >
                {/* Hover Glow Sweep */}
                <div className="absolute inset-0 z-0 bg-linear-to-r from-blue-500 via-blue-400 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Continuous Idle Glassy Shimmer */}
                <motion.div
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 z-0 h-full w-1/3 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none group-hover/btn:via-white/40 group-hover/btn:w-1/2 transition-all duration-500"
                />

                <span className="relative z-10 drop-shadow-md font-bold text-[17px] tracking-wide cursor-pointer">
                  Get a free consultation
                </span>
                <ArrowRight
                  strokeWidth={2.5}
                  className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side: Creative Visual Zone */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[550px] flex items-center justify-center">
            {/* Primary soft backdrop circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
              className="absolute w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-linear-to-br from-blue-100/40 via-blue-50/20 to-transparent blur-3xl z-0 pointer-events-none"
            />

            {/* Deep core ambient lighting behind image */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
              style={{ x: imageX, y: imageY }}
              className="absolute w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] rounded-full bg-blue-400/20 blur-[70px] z-0 pointer-events-none"
            />

            {/* Main Focal Image */}
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
              whileHover={{ scale: 1.03 }}
              transition={{
                duration: 1.0,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                rotateX: imageRotateX,
                rotateY: imageRotateY,
                x: imageX,
                y: imageY,
              }}
              className="relative z-10 w-full h-full transform-gpu [transform-style:preserve-3d]"
            >
              <img
                src="/HeroImages/main_hero_image.png"
                alt="Ikhtiyaar Dashboard Experience"
                className="object-contain drop-shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 hover:drop-shadow-[0_30px_60px_rgba(37,99,235,0.25)]"
              />
            </motion.div>

            {/* Floating Element 1 - Google */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-[8%] left-[8%] lg:left-[2%] z-20"
            >
              <motion.div style={{ x: floatX1, y: floatY1 }}>
                <motion.div
                  animate={{
                    y: [-15, 25, -15],
                    x: [-10, 15, -10],
                    rotate: [-3, 5, -3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6.5,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-slate-200/60 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
                >
                  <div className="relative w-full h-full">
                    <img
                      src="/HeroImages/google.png"
                      alt="Google"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Element 2 - Facebook */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-[20%] right-[5%] lg:-right-[6%] z-20"
            >
              <motion.div style={{ x: floatX2, y: floatY2 }}>
                <motion.div
                  animate={{
                    y: [10, -30, 10],
                    x: [15, -10, 15],
                    rotate: [4, -4, 4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7.2,
                    ease: "easeInOut",
                  }}
                  className="w-[85px] h-[85px] rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-slate-200/60 flex items-center justify-center p-3 hover:scale-110 transition-transform duration-300"
                >
                  <div className="relative w-full h-full">
                    <img
                      src="/HeroImages/facebook.png"
                      alt="Facebook"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Element 3 - GMB */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-[22%] left-[5%] lg:-left-[12%] z-20"
            >
              <motion.div style={{ x: floatX3, y: floatY3 }}>
                <motion.div
                  animate={{
                    y: [-20, 15, -20],
                    x: [10, -15, 10],
                    rotate: [-5, 3, -5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5.8,
                    ease: "easeInOut",
                  }}
                  className="w-[95px] h-[95px] rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-slate-200/60 flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
                >
                  <div className="relative w-full h-full">
                    <img
                      src="/HeroImages/googlemap.png"
                      alt="Google My Business"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Element 4 - Outlook */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-[10%] right-[10%] lg:right-[0%] z-20"
            >
              <motion.div style={{ x: floatX4, y: floatY4 }}>
                <motion.div
                  animate={{
                    y: [25, -15, 25],
                    x: [-15, 10, -15],
                    rotate: [3, -5, 3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6.2,
                    ease: "easeInOut",
                  }}
                  className="w-[82px] h-[82px] rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-slate-200/60 flex items-center justify-center p-3 hover:scale-110 transition-transform duration-300"
                >
                  <div className="relative w-full h-full hover:scale-110 transition-transform">
                    <img
                      src="/HeroImages/googleoutlook.png"
                      alt="Outlook"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
