"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Target, BarChart3, Rocket, Layers, Sparkles } from "lucide-react";

const processSteps = [
  {
    id: "01",
    title: "Analyze",
    description: "We start by auditing your business from the inside out. We look for leaks, wasted spend, and manual work that should not exist in 2026. Repetitive tasks are identified and immediately automated using AI and systems so you start saving time and money early. This creates breathing room before any growth work begins.",
    icon: BarChart3,
  },
  {
    id: "02",
    title: "Optimize",
    description: "Once inefficiencies are visible, we cut unnecessary costs. Software, tools, vendors, and staffing structures are reviewed and replaced with leaner alternatives where needed. The goal is not to slow the business down, but to maintain or improve output while reducing how much it costs to operate.",
    icon: Zap,
  },
  {
    id: "03",
    title: "Acquire",
    description: "With costs reduced, we redirect that saved money into demand generation. Instead of asking you to spend more, we use what was already being wasted to run targeted advertising. This brings in high-quality leads without increasing your overall budget and turns efficiency into growth.",
    icon: Target,
  },
  {
    id: "04",
    title: "Execute",
    description: "As leads come in, execution becomes the bottleneck. We remove it. We place and manage a trained remote team member at a significantly lower cost than in-house hires. They handle day-to-day tasks and lead follow-ups so the business keeps moving without pulling you back into operations.",
    icon: Layers,
  },
  {
    id: "05",
    title: "Compound",
    description: "Once the engine is running, we focus on sustainability. We build SEO and social presence to reduce dependency on ads and short-term tactics. Over time, acquisition costs drop, authority increases, and growth becomes predictable instead of reactive.",
    icon: Rocket,
  },
];

export default function OurProcess() {
  const containerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const centerPoint = scrollLeft + clientWidth / 2;
      
      const children = Array.from(scrollRef.current.children) as HTMLElement[];
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(centerPoint - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current && scrollRef.current.children[index]) {
      scrollRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-8 sm:py-10 md:py-10 relative overflow-hidden bg-white"
      id="process"
    >
      {/* Immersive 3D Atmospheric Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-100/20 rounded-full blur-[100px] sm:blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-indigo-50/30 rounded-full blur-[100px] sm:blur-[140px]"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-stretch">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-8 sm:space-y-10"
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 sm:w-10 h-0.5 bg-blue-500/30 rounded-full" />
                <span className="text-blue-600 font-bold uppercase tracking-[0.25em] text-[9px] sm:text-[11px]">Methodology</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] text-slate-900 leading-[1.1] tracking-tight"
              >
                Our proven <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-800 to-blue-400">
                  roadmap.
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed"
              >
                An engineered system designed to build predictable revenue and operational freedom for founders.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center"
            >
              <Link href="/contact" className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-1 text-sm sm:text-base">
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 text-blue-600" />
                </span>
              </Link>
            </motion.div>

            {/* Navigation Progress Info */}
            <div className="space-y-6 sm:space-y-8 pt-8 sm:pt-10 border-t border-slate-100">
              <div className="flex items-center justify-between pr-4 sm:pr-8">
                <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"> {processSteps[activeIndex].title}</p>
                <span className="text-blue-600 font-bold font-mono tracking-tighter text-sm sm:text-base">PHASE 0{activeIndex + 1}</span>
              </div>
              
              <div className="flex gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {processSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollTo(idx)}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 shrink-0 ${
                      idx === activeIndex 
                        ? "w-10 sm:w-20 bg-blue-600" 
                        : "w-4 sm:w-8 bg-slate-100 hover:bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-slate-900 font-black text-2xl sm:text-3xl tracking-tight">
                    {processSteps[activeIndex].title}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side: Interactive Scroller Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[480px] sm:h-[620px] lg:h-[680px] group"
          >
            {/* Scroller Base Layer */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 via-white to-slate-50/50 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-100/80 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.03)] overflow-hidden">
             
              {/* Soft Gradient Accents */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute -top-[10%] -right-[10%] w-[80%] h-[80%] bg-linear-to-br from-blue-100/40 to-indigo-50/30 rounded-full blur-[80px] sm:blur-[100px]" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[80%] h-[80%] bg-linear-to-tr from-sky-50/40 to-blue-50/30 rounded-full blur-[80px] sm:blur-[100px]" />
              </div>

              {/* Scroll Area */}
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 sm:px-12 py-10 sm:py-16 gap-4 sm:gap-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {processSteps.map((step, idx) => (
                  <ProcessCard 
                    key={step.id} 
                    step={step} 
                    isActive={idx === activeIndex}
                  />
                ))}
              </div>

              {/* Navigation Indicators */}
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 flex items-center gap-2 sm:gap-3">
                {processSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollTo(idx)}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                      idx === activeIndex 
                        ? "w-6 sm:w-8 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2)]" 
                        : "w-1.5 bg-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* Controls (Tablet & Desktop Only) */}
              <div className="absolute right-8 sm:right-12 bottom-6 sm:bottom-8 hidden sm:flex gap-3">
                <button 
                  onClick={() => scrollTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-all hover:text-blue-600 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 disabled:opacity-0"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button 
                  onClick={() => scrollTo(activeIndex + 1)}
                  disabled={activeIndex === processSteps.length - 1}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-all hover:text-blue-600 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 disabled:opacity-0"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, isActive }: { step: typeof processSteps[0], isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isActive || typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    setRotate({ x: dy / 30, y: -dx / 30 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX: rotate.x, 
        rotateY: rotate.y,
        scale: isActive ? 1 : 0.94,
        opacity: isActive ? 1 : 0.4,
      }}
      className={`shrink-0 w-[82vw] sm:w-[450px] h-full snap-center rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col justify-between select-none transition-all duration-700 ${
        isActive 
          ? "bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] ring-1 ring-slate-100" 
          : "bg-transparent border border-transparent"
      }`}
      style={{ 
        transformStyle: "preserve-3d",
      }}
    >
      <div className="space-y-6 sm:space-y-10" style={{ transform: "translateZ(50px)" }}>
        <div className="flex items-center justify-between">
          <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isActive ? "bg-blue-50 text-blue-600 shadow-inner" : "bg-slate-50 text-slate-300"
          }`}>
            <step.icon className="w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tighter leading-none">{step.id}</p>
        </div>
        
        <div className="space-y-3 sm:space-y-5">
          <h3 className={`text-xl sm:text-3xl font-[900] transition-colors duration-500 leading-tight ${
            isActive ? "text-slate-900" : "text-slate-400"
          }`}>
            {step.title}
          </h3>
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium transition-colors duration-500 ${
            isActive ? "text-slate-500" : "text-slate-300"
          }`}>
            {step.description}
          </p>
        </div>
      </div>

      <div 
        className="flex items-center gap-3"
        style={{ transform: "translateZ(30px)" }}
      >
        <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${
           isActive ? "text-blue-600/50" : "text-slate-200"
        }`}>
          Verified Process
        </span>
        <div className={`h-px grow bg-linear-to-r transition-all duration-500 ${
          isActive ? "from-blue-100 to-transparent" : "from-slate-100 to-transparent"
        }`} />
      </div>
    </motion.div>
  );
}
