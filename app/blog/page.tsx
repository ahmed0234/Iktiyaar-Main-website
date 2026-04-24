"use client";

import { Sparkles, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BlogComingSoon() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes customFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: customFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />

      {/* h-screen ensures it takes up the full viewport height */}
      <div className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-white px-6 font-sans selection:bg-blue-100 selection:text-blue-900">
        
        {/* Soft Background Orbs for Depth */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-blue-50/80 rounded-full blur-[100px] opacity-70" />
          <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-sky-100/60 rounded-full blur-[90px] opacity-60" />
          <div className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-100/40 rounded-full blur-[120px] opacity-80" />
        </div>

        {/* Main Content Card (Glassmorphism) */}
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center p-10 md:p-16 rounded-[3rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.06)] transition-all duration-700 group">
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/10 rounded-[3rem] pointer-events-none" />

          <div className="relative z-20 flex flex-col items-center">
            {/* Animated Icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] bg-blue-50/80 flex items-center justify-center border border-blue-100/50 shadow-inner mb-8 animate-fade-up group-hover:scale-110 group-hover:bg-blue-100/60 transition-all duration-500 ease-out">
              <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-500" />
            </div>

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-100 shadow-sm backdrop-blur-md mb-6 animate-fade-up delay-100">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                In Development
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-fade-up delay-200 leading-[1.1]">
              Blogs <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                Coming Soon.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-lg md:text-xl text-slate-500 mb-10 animate-fade-up delay-300 leading-relaxed font-medium">
              We're curating deep dives, expert insights, and actionable strategies to help you scale your business. The wait will be worth it.
            </p>

            {/* Return Link (Interactive Element) */}
            <div className="animate-fade-up delay-300">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 font-semibold hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 group/link"
              >
                <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </Link>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
