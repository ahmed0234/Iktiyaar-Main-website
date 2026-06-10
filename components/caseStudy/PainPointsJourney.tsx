"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle,
  TrendingDown,
  DollarSign,
  PhoneMissed,
  MousePointerClick,
  ArrowRight,
  Quote,
  Activity,
  AlertOctagon,
  CalendarX,
  Users
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function useCountUp(target: number, duration = 2000, start = false, prefix = "", suffix = "") {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setValue(Number(((1 - Math.pow(1 - p, 3)) * target).toFixed(0)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return `${prefix}${value}${suffix}`;
}

const QuoteBlock = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="max-w-3xl mx-auto my-16 relative"
    >
      <div className="absolute -top-6 -left-6 opacity-10">
        <Quote className="w-16 h-16 text-slate-900" />
      </div>
      <p className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed text-center relative z-10 italic">
        "{text}"
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?q=80&w=200&auto=format&fit=crop" alt="Marcus" className="w-full h-full object-cover" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-slate-900">Marcus Holloway</p>
          <p className="text-xs text-slate-500">Founder, Holloway Roofing Co.</p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Problem 1: Ad Spend Hemorrhage ──────────────────────────────────────
const ProblemAdSpend = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const wastedMoney = useCountUp(4200, 2500, inView, "$");

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="order-2 lg:order-1 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase">
            <AlertOctagon className="w-3.5 h-3.5" />
            Critical Issue 01
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Google Ads <span className="text-red-500">Money Leak</span>
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            They were pouring budget into search campaigns, but the money was evaporating. Broad match keywords were draining funds on irrelevant clicks.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="relative pl-6 space-y-6 border-l-2 border-red-100">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">The Action</p>
            <p className="text-lg font-semibold text-slate-800">$4,200/month in ad spend</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="relative">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-orange-400" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">The Result</p>
            <p className="text-lg font-semibold text-slate-800">Only 7 qualified leads generated</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.6 }} className="relative">
            <div className="absolute -left-[35px] top-0 w-5 h-5 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <p className="text-sm font-bold text-red-500 uppercase tracking-wider mb-1">The Consequence</p>
            <p className="text-xl font-bold text-slate-900">Cost per lead became completely unsustainable ($600+/lead).</p>
          </motion.div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-3xl bg-white border border-red-100 shadow-2xl shadow-red-500/5 p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -z-10" />
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Wasted Ad Spend</p>
              <div className="text-5xl font-black text-red-500 tracking-tighter mt-2 flex items-center gap-2">
                {wastedMoney} <span className="text-xl text-red-300 font-medium tracking-normal mt-2">/mo</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-500" />
            </div>
          </div>
          
          <div className="h-32 relative flex items-end gap-2">
            {[40, 50, 70, 60, 80, 90, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={inView ? { height: `${h}%` } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: EASE }}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-red-100 to-red-400"
              />
            ))}
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: EASE }}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0,60 L15,50 L30,30 L45,40 L60,20 L75,10 L100,0" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            </motion.svg>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl p-3">
            <TrendingDown className="w-4 h-4" /> Burning budget with zero ROI visibility
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Problem 2: Conversion Black Hole ────────────────────────────────────
const ProblemConversion = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="order-2 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase">
            <AlertTriangle className="w-3.5 h-3.5" />
            Critical Issue 02
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Hidden <span className="text-orange-500">Conversion Killer</span>
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed font-semibold">
            Traffic was being sent to a generic homepage with no clear call to action. Potential customers were arriving, getting confused, and leaving immediately.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="relative pl-6 space-y-6 border-l-2 border-orange-100">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">The Action</p>
            <p className="text-lg font-semibold text-slate-800">Expensive paid traffic arrives</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="relative">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-orange-400" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">The Result</p>
            <p className="text-lg font-semibold text-slate-800">Users land on a generic homepage</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.6 }} className="relative">
            <div className="absolute -left-[35px] top-0 w-5 h-5 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            </div>
            <p className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-1">The Consequence</p>
            <p className="text-xl font-bold text-slate-900">85% Bounce Rate. Thousands in lost opportunities every week.</p>
          </motion.div>
        </div>
      </div>

      <div className="order-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-3xl bg-slate-900 p-8 relative overflow-hidden shadow-2xl"
        >
          {/* Animated particles simulating traffic bouncing */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ top: "-10%", left: "50%", opacity: 0, scale: 0 }}
                animate={inView ? { 
                  top: ["10%", "50%", `${60 + Math.random() * 40}%`], 
                  left: ["50%", "50%", `${(Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 80)}%`],
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 0.5]
                } : {}}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]"
              />
            ))}
          </div>

          <div className="relative z-10 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-6">
              <MousePointerClick className="w-8 h-8 text-orange-400" />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Traffic Leakage</p>
              <div className="text-6xl font-black text-white tracking-tighter">85<span className="text-3xl text-orange-400">%</span></div>
              <p className="text-lg text-slate-300 font-medium">Bounce Rate</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-8 flex justify-between items-center backdrop-blur-sm">
              <div className="text-left">
                <p className="text-xs text-slate-400 font-semibold mb-1">Visitors In</p>
                <p className="text-xl font-bold text-white">450</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-600" />
              <div className="text-right">
                <p className="text-xs text-orange-400 font-semibold mb-1">Leads Out</p>
                <p className="text-xl font-bold text-orange-500">6</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Problem 3: The Feast or Famine Cycle ────────────────────────────────
const ProblemUnpredictable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="order-2 lg:order-1 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold tracking-widest uppercase">
            <CalendarX className="w-3.5 h-3.5" />
            Critical Issue 03
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            The Unpredictable Lead <span className="text-slate-500">Flow</span>
          </h3>
          <p className="text-slate-600 text-lg font-semibold leading-relaxed">
            Relying purely on referrals and unpredictable ad campaigns meant they had zero control over their pipeline. 
          </p>
        </div>

        {/* Journey Steps */}
        <div className="relative pl-6 space-y-6 border-l-2 border-slate-200">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">The Action</p>
            <p className="text-lg font-semibold text-slate-800">Referrals naturally slow down</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="relative">
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-400" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">The Result</p>
            <p className="text-lg font-semibold text-slate-800">The phone stops ringing completely</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.6 }} className="relative">
            <div className="absolute -left-[35px] top-0 w-5 h-5 rounded-full bg-slate-200 border-2 border-slate-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
            </div>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-1">The Consequence</p>
            <p className="text-xl font-bold text-slate-900">Crews sit idle. Revenue projection becomes impossible. Panic sets in.</p>
          </motion.div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-8 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pipeline Health</p>
              <div className="text-3xl font-black text-slate-800 mt-2">Zero Predictability</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-slate-500" />
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {[...Array(28)].map((_, i) => {
              // Simulate random idle days
              const isIdle = [3, 4, 10, 11, 12, 17, 18, 24, 25, 26].includes(i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  className={`aspect-square rounded-md ${isIdle ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'} flex items-center justify-center`}
                >
                  {isIdle && <Users className="w-3 h-3 text-red-300" />}
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-emerald-600"><div className="w-3 h-3 rounded-sm bg-emerald-100 border border-emerald-200" /> Booked Days</div>
            <div className="flex items-center gap-2 text-red-500"><div className="w-3 h-3 rounded-sm bg-red-50 border border-red-200" /> Idle Crews</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function PainPointsJourney() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-1 font-sans">
      <div className="text-center space-y-6 mb-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-bold tracking-widest uppercase shadow-lg">
          <Activity className="w-4 h-4" /> The Autopsy
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
        A Company on the <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">Edge.</span>
        </h2>
        <p className="text-slate-600 font-poppins font-semibold text-lg sm:text-xl leading-relaxed">
          Before we stepped in, Holloway Roofing was running blind. We didn't just find minor inefficiencies we uncovered massive structural leaks threatening their growth.
        </p>
      </div>

      <div className="space-y-16 lg:space-y-32">
        <ProblemAdSpend />
        <QuoteBlock text="We knew we were losing opportunities, but we couldn't figure out where. The money was going out, but the leads just weren't coming in." />
        <ProblemConversion />
        <QuoteBlock text="Some weeks we had crews ready to work but no jobs booked. The inconsistency was the hardest part to deal with." />
        <ProblemUnpredictable />
      </div>
    </div>
  );
}
