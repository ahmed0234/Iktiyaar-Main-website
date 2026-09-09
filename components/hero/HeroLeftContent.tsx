'use client';

import { ArrowRight, Check, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { CurvedUnderline, GoogleGLogo, HostingerLogo } from './HeroLogos';

const ownershipBenefits = [
  'You own the campaigns.',
  'You own the landing pages.',
  'You own the data.',
];

export default function HeroLeftContent() {
  return (
    <div className="flex flex-col items-start text-left w-full space-y-4 sm:space-y-4.5">
      {/* 1. Top Glassy Trust Badges (Google Search Partner & Hostinger Partner) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-2.5 sm:gap-3"
      >
        {/* Google Search Partner */}
        <div className="relative overflow-hidden inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-b from-white/95 via-white/85 to-white/70 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/[0.07] shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.02)] hover:ring-blue-400/40 hover:shadow-[0_4px_20px_-2px_rgba(37,99,235,0.14),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-0.5 transition-all duration-300 group cursor-default">
          {/* Top specular reflection line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />

          <GoogleGLogo className="w-4 h-4 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.04)]" />
          <div className="flex items-center gap-2 text-xs sm:text-[13px]">
            <span className="font-bold text-slate-800 tracking-tight">
              Google Search
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 px-2 py-0.5 rounded-full bg-gradient-to-b from-blue-50 to-blue-100/50 border border-blue-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(37,99,235,0.04)]">
              Partner
            </span>
          </div>
        </div>

        {/* Hostinger Partner */}
        <div className="relative overflow-hidden inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-b from-white/95 via-white/85 to-white/70 backdrop-blur-xl border border-white/90 ring-1 ring-slate-900/[0.07] shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.02)] hover:ring-purple-400/40 hover:shadow-[0_4px_20px_-2px_rgba(103,61,230,0.14),inset_0_1px_1px_rgba(255,255,255,1)] hover:-translate-y-0.5 transition-all duration-300 group cursor-default">
          {/* Top specular reflection line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />

          <HostingerLogo className="w-4.5 h-4.5 shrink-0 drop-shadow-[0_1px_2px_rgba(103,61,230,0.12)]" />
          <div className="flex items-center gap-2 text-xs sm:text-[13px]">
            <span className="font-bold text-slate-800 tracking-tight">
              Hostinger
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#673DE6] px-2 py-0.5 rounded-full bg-gradient-to-b from-purple-50 to-purple-100/50 border border-purple-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_2px_rgba(103,61,230,0.04)]">
              Partner
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2. Main Headline: Exactly 2 lines across all devices, balanced & polished */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <h1 className="flex flex-col items-start font-extrabold tracking-tight text-left">
          {/* Primary Heading: Line 1 */}
          <span className="block whitespace-nowrap text-slate-900 text-[26px] min-[390px]:text-[29px] sm:text-[35px] md:text-[40px] lg:text-[38px] xl:text-[46px] 2xl:text-[50px] leading-[1.1] sm:leading-[1.08]">
            Stop Buying Leads
          </span>

          {/* Secondary Line: Line 2 - Accent Blue & Balanced Typography */}
          <span className="relative inline-block whitespace-nowrap text-[#0066FF] text-[17px] min-[390px]:text-[19px] min-[440px]:text-[21px] sm:text-[23px] md:text-[26px] lg:text-[25px] xl:text-[31px] 2xl:text-[34px] leading-[1.15] mt-1 sm:mt-1.5 pb-1 sm:pb-1.5">
            Build Your Own Source of Estimates
            <CurvedUnderline className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-2.5 sm:h-3.5 text-[#0066FF]" />
          </span>
        </h1>
      </motion.div>

      {/* 3. Supporting Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl pt-0.5"
      >
        We help contractors turn Google Search{' '}
        <strong className="font-semibold text-slate-900">
          into a predictable source of homeowner estimate requests
        </strong>{' '}
        without relying only on referrals, Angi, HomeAdvisor, or shared leads.
      </motion.p>

      {/* 4. Ownership & Solution Cards */}
      <div className="w-full max-w-xl space-y-2 pt-0.5">
        {ownershipBenefits.map((text, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.38,
              delay: 0.18 + idx * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-3.5 px-4.5 py-2.5 sm:py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:border-emerald-200/90 hover:bg-white/95 hover:shadow-[0_4px_16px_-2px_rgba(16,185,129,0.08)] transition-all duration-200 group"
          >
            <div className="w-5.5 h-5.5 rounded-full border border-emerald-200/90 bg-emerald-50/90 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 group-hover:bg-emerald-100 group-hover:border-emerald-300 transition-all shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-[15px] sm:text-base font-medium text-slate-700">
              {text}
            </span>
          </motion.div>
        ))}

        {/* 5. Solution Card (Visually prominent) */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start sm:items-center gap-3.5 px-4.5 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-blue-50/60 to-white/70 backdrop-blur-md border border-blue-200/90 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.08)] hover:border-blue-300 transition-all duration-200"
        >
          <div className="w-5.5 h-5.5 rounded-full bg-blue-100/90 border border-blue-300 flex items-center justify-center text-[#0066FF] shrink-0 mt-0.5 sm:mt-0 shadow-xs">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <p className="text-[15px] sm:text-base text-slate-700 leading-snug font-semibold">
            We just build and manage the system that{' '}
            <span className="font-semibold text-[#0066FF]">
              brings the opportunities in.
            </span>
          </p>
        </motion.div>

        {/* 6. Proof / Outcome Card */}
        {/* <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-white/90 to-blue-50/60 backdrop-blur-md border border-blue-200/90 shadow-[0_8px_28px_-6px_rgba(37,99,235,0.10)] relative overflow-hidden group hover:border-blue-300 transition-all duration-300"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-100/90 border border-blue-200 flex items-center justify-center text-[#0066FF] shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
            <TrendingUp className="w-6 h-6 stroke-[2.2]" />
          </div>
          <p className="text-base sm:text-[17px] text-slate-700 leading-relaxed sm:leading-relaxed">
            One client turned{' '}
            <span className="relative inline-block font-bold text-slate-900 whitespace-nowrap">
              $7,000 in Google Ads spend
              <CurvedUnderline className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2 sm:h-2.5 text-[#0066FF]" />
            </span>{' '}
            into{' '}
            <span className="relative inline-block font-extrabold text-lg sm:text-xl text-[#0066FF] whitespace-nowrap">
              $200,000 in revenue.
              <CurvedUnderline className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-2 sm:h-2.5 text-[#0066FF]" />
            </span>
          </p>
        </motion.div> */}
      </div>

      {/* 7. Primary CTA Button + Friction Reducer */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl pt-1.5 space-y-2.5"
      >
        <Link
          href="/contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white font-poppins font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group cursor-pointer text-center"
        >
          <span>See If Google Ads Makes Sense In Your Market</span>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
        <p className="text-slate-500 text-xs sm:text-[13.5px] text-center sm:text-left font-medium leading-relaxed">
          No long-term contract. No generic lead lists. No shared leads.
        </p>
      </motion.div>
    </div>
  );
}
