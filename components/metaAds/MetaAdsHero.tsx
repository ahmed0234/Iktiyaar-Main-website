"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

export default function MetaAdsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 40 });

  const gridRotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const gridRotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const imageRotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const imageRotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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
      id="meta-ads-hero"
      className="relative min-h-[78vh] pt-24 md:pt-16 pb-0 overflow-hidden flex items-center bg-white group/hero"
      style={{ perspective: "1200px" }}
    >
      {/* 3D Interactive Grid Background */}
      <motion.div
        style={{ rotateX: gridRotateX, rotateY: gridRotateY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none origin-center"
      >
        <div
          className="w-[200vw] h-[200vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200/60 transition-colors duration-1000 group-hover/hero:text-blue-300/40"
          style={{
            backgroundImage: `radial-gradient(circle at center, transparent 10%, white 60%), linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: `100% 100%, 70px 70px, 70px 70px`,
          }}
        />
      </motion.div>

      {/* Atmospheric orbs */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] right-[-10%] w-[700px] h-[700px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] bg-cyan-50/40 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        style={{ y: parallaxY, scale: parallaxScale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── Left — Text Content ─────────────────────────────── */}
          <div className="w-full lg:w-[60%] relative flex flex-col items-start text-left z-10 lg:pl-10 xl:pl-12">
            
            {/* Floating Element 1 - Top Left (Efficiency Score) */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hidden 2xl:flex absolute top-[-2%] -left-2 xl:-left-52 -z-10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="bg-white/70 backdrop-blur-xl rounded-[20px] p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] border border-white flex-col items-center gap-1.5 flex"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center mb-2 shadow-md shadow-blue-500/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-3xl font-[900] text-slate-800 tracking-tight">92%</div>
                <div className="text-[9px] font-bold text-slate-400 tracking-[0.15em] uppercase">Efficiency Score</div>
                <div className="w-6 h-px bg-slate-200 my-1"></div>
                <div className="text-[11px] font-bold text-blue-600">ROI-Driven Strategy</div>
                <div className="text-[10px] font-medium text-slate-400">100% Growth Focus</div>
              </motion.div>
            </motion.div>

            {/* Floating Element 2 - Bottom Left (Strategy Active) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hidden 2xl:flex absolute bottom-[10%] left-0 xl:-left-62 -z-10"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                className="bg-white/70 backdrop-blur-xl rounded-[20px] p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] border border-white flex-col gap-4 flex"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Strategy Active</div>
                    <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      Live Metrics
                    </div>
                  </div>
                </div>
                
                <div className="w-full h-px bg-slate-100"></div>
                
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">ROAS</div>
                    <div className="text-xl font-black text-blue-600 tracking-tight">+320%</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">CPA</div>
                    <div className="text-xl font-black text-slate-800 tracking-tight">$12.50</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-200/60 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 backdrop-blur-md hover:bg-blue-50/80 hover:border-blue-300/60 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                Meta Advertising Expertise
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-[900] tracking-tight text-slate-900 leading-[1.05] mb-8">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", rotateX: -40 }}
                  animate={isInView ? { y: "0%", rotateX: 0 } : { y: "100%", rotateX: -40 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "bottom center" }}
                >
                  Turn Attention into Revenue with
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", rotateX: -40 }}
                  animate={isInView ? { y: "0%", rotateX: 0 } : { y: "100%", rotateX: -40 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {" "}
                  <span className="relative inline-block">
                    <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
                      Meta Ads
                    </span>
                    <motion.svg
                      className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-3 md:h-4 text-blue-500/40 overflow-visible pointer-events-none"
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M 2 8 C 50 2 150 2 198 10"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed font-medium"
            >
              Ikhtiyaar builds and manages high-performing Meta Ads campaigns that attract the right audience, generate demand, and turn clicks into real business growth.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group/btn relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-b from-[#ff6a3d] to-[#e84e1b] px-10 py-5 font-bold text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,106,61,0.3)] hover:shadow-[0_20px_50px_rgba(255,106,61,0.45)] border border-[#ff6a3d]/40 ring-1 ring-inset ring-white/20 cursor-pointer"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#ff6a3d] via-[#ff8863] to-[#ff6a3d] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span className="relative z-10 tracking-wide text-[17px] drop-shadow-md">
                    Start Scaling Now
                  </span>
                  <ArrowRight
                    strokeWidth={2.5}
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
                  />
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          {/* ── Right — Dimensional Visual Zone (Orbit Centerpiece) ── */}
          <div
            className="w-full lg:w-[40%] relative h-[450px] sm:h-[580px] lg:h-[720px] flex items-center justify-center"
            style={{ perspective: "1100px" }}
          >
            {/* Ambient glow centerpiece */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-100/20 to-transparent blur-3xl z-0 pointer-events-none"
            />
            
            {/* Main Interactive Orbit System */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -30 }}
              animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -30 }}
              transition={{ duration: 1.1, delay: 0.2, type: "spring", stiffness: 60, damping: 20 }}
              className="relative z-20 flex items-center justify-center"
              style={{ 
                x: useTransform(springX, [-0.5, 0.5], [-30, 30]), 
                y: useTransform(springY, [-0.5, 0.5], [-30, 30]) 
              }}
            >
              <div className="relative w-36 h-36 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full bg-white shadow-[0_30px_90px_rgba(0,0,0,0.12)] flex items-center justify-center border border-slate-100/80 backdrop-blur-2xl transition-transform duration-500 hover:scale-[1.03]">
                <div className="relative w-[70%] h-[70%]">
                  <Image
                    src="/metaAdsPage/MetaCircle.png"
                    alt="Meta Logo"
                    fill
                    className="object-contain relative z-10"
                    priority
                  />
                </div>
                
                {/* Rotating floating icons track */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                  className="absolute inset-[-70px] sm:inset-[-110px] lg:inset-[-120px] border border-blue-200/40 rounded-full bg-blue-50/10 backdrop-blur-[2px]
                    [--radius:135px] sm:[--radius:210px] lg:[--radius:250px]"
                >
                  {[
                    {
                      id: "facebook",
                      color: "#1877F2",
                      icon: <FaFacebookF className="w-8 h-8" />,
                    },
                    {
                      id: "instagram",
                      color: "#E4405F",
                      icon: <FaInstagram className="w-8 h-8" />,
                    },
                    {
                      id: "whatsapp",
                      color: "#25D366",
                      icon: <FaWhatsapp className="w-8 h-8" />,
                    },
                    {
                      id: "messenger",
                      color: "#00B2FF",
                      icon: <FaFacebookMessenger className="w-8 h-8" />,
                    },
                    {
                      id: "threads",
                      color: "#000000",
                      icon: <SiThreads className="w-7 h-7" />,
                    },
                  ].map((item, index, array) => {
                    const angle = (index * 360) / array.length;
                    return (
                      <div
                        key={item.id}
                        className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 -ml-6 -mt-6 sm:-ml-8 sm:-mt-8 lg:-ml-9 lg:-mt-9"
                        style={{
                          transform: `rotate(${angle}deg) translateY(calc(-1 * var(--radius))) rotate(${-angle}deg)`,
                        }}
                      >
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                          whileHover={{ 
                            scale: 1.25, 
                            y: -8,
                            boxShadow: `0 0 30px 10px ${item.color}35`,
                            borderColor: item.color,
                          }}
                          className="w-full h-full bg-white rounded-xl sm:rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] lg:shadow-[0_20px_45px_rgba(0,0,0,0.12)] flex items-center justify-center border border-slate-100/80 transition-all duration-500 backdrop-blur-md cursor-pointer group/icon overflow-hidden"
                          style={{ color: item.color }}
                        >
                          <div className="flex items-center justify-center w-full h-full transition-transform duration-300 group-hover/icon:scale-110">
                            {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" })}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ── Right — Text Content ─────────────────────────────── */}
   

        </div>
      </motion.div>
    </section>
  );
}
