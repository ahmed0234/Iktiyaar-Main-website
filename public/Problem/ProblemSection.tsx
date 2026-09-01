"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── CURVED HAND-DRAWN UNDERLINES ─────────────────────────────────────────────
function HeadingCurveUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 340 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12C90 4.5 250 4.5 336 12"
        stroke="#0066FF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M24 15.5C110 8 230 8 316 15.5"
        stroke="#0066FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

function AccentCurveUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 360 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12C95 4.5 260 4.5 356 12"
        stroke="#0066FF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M24 15.5C110 8.5 240 8.5 336 15.5"
        stroke="#0066FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

const STATEMENTS = [
  "We\u2019ll get you more leads.",
  "We\u2019ll increase your visibility.",
  "We\u2019ll optimize your campaigns.",
  "We\u2019ll get you to the top of Google.",
];

const REPORT_METRICS = ["Impressions.", "Clicks.", "CTR.", "Traffic."];

export default function ProblemSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const pinInnerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const phrases = phraseRefs.current.filter(Boolean) as HTMLDivElement[];

      if (reduceMotion) {
        gsap.set(phrases, { opacity: 1, y: 0, scale: 1 });
        if (headerRef.current) gsap.set(headerRef.current, { opacity: 1 });
        if (closingRef.current) gsap.set(closingRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Initial state: hide statements far below, hide closing section below
      gsap.set(phrases, { opacity: 0, y: 600, scale: 0.70 });
      if (closingRef.current) {
        gsap.set(closingRef.current, {
          opacity: 0,
          y: 350,
          pointerEvents: "none",
        });
      }

      // Pinned ScrollTrigger Timeline with generous scroll distance and deliberate delays
      if (pinWrapRef.current && pinInnerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: pinInnerRef.current,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ── 4 Red Statements Sequence (With Generous Delays & Scroll Travel) ──
        phrases.forEach((phrase, index) => {
          // 1. Slowly emerge from FAR BELOW & scale into center focus
          tl.fromTo(
            phrase,
            { y: 600, opacity: 0, scale: 0.70 },
            {
              y: 0,
              opacity: 1,
              scale: 1.06,
              duration: 2.6,
              ease: "power2.out",
            }
          );

          // 2. Settle & hold center stage for ample reading time
          tl.to(phrase, {
            scale: 1.0,
            duration: 2.2,
            ease: "none",
          });

          // 3. Smoothly exit upward
          tl.to(phrase, {
            y: -380,
            opacity: 0,
            scale: 0.88,
            duration: 2.2,
            ease: "power2.in",
          });

          // 4. Scroll delay buffer between statements so user scrolls more for the next text
          if (index < phrases.length - 1) {
            tl.to({}, { duration: 2.0 });
          }
        });

        // ── Seamless Transition to Closing Section (Zero Empty Gap) ──
        if (headerRef.current && stageRef.current && closingRef.current) {
          // Fade out top header and statement stage
          tl.to(
            [headerRef.current, stageRef.current],
            {
              opacity: 0,
              y: -50,
              duration: 1.5,
              ease: "power2.inOut",
            },
            ">-0.2"
          );

          // Immediately slide and reveal the closing section in the same viewport
          tl.fromTo(
            closingRef.current,
            { y: 350, opacity: 0, pointerEvents: "none" },
            {
              y: 0,
              opacity: 1,
              pointerEvents: "auto",
              duration: 2.5,
              ease: "power2.out",
            },
            "<0.2"
          );

          // Hold the closing section in view for deliberate reading before unpinning
          tl.to(closingRef.current, {
            duration: 3.2,
            ease: "none",
          });
        }
      }

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="problem-section"
      className="relative bg-white text-slate-900 overflow-hidden"
    >
      {/* ─── AMBIENT ATMOSPHERIC BACKGROUND GLOWS ─── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-blue-100/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[550px] h-[350px] bg-sky-50/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ════════════════ UNIFIED PINNED EXPERIENCE ════════════════ */}
      <div ref={pinWrapRef} className="relative" style={{ height: "980vh" }}>
        <div
          ref={pinInnerRef}
          className="h-screen w-full flex flex-col justify-start items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-8 overflow-hidden z-20"
        >
          {/* ─── 1. TOP PINNED HEADER (Safely below floating navbar) ─── */}
          <div
            ref={headerRef}
            className="w-full max-w-4xl mx-auto text-center flex flex-col items-center shrink-0 transition-opacity duration-300"
          >
            {/* Opening Main Headline with "Google Ads Before." in Blue + Hand-Drawn Underline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.14]">
              You&rsquo;ve Probably Been Pitched{" "}
              <span className="relative inline-block text-[#0066FF] font-black whitespace-nowrap">
                Google Ads Before.
                <HeadingCurveUnderline className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#0066FF]" />
              </span>
            </h2>

            {/* Tight Supporting Lines */}
            <div className="mt-6 sm:mt-8 space-y-0.5 sm:space-y-1">
              <p className="text-sm sm:text-base md:text-lg text-slate-700 font-medium tracking-tight">
                Maybe 10 times this month.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-slate-700 font-medium tracking-tight">
                Maybe 10 times this week.
              </p>
            </div>

            {/* Pinned Dominant Blue Anchor Header */}
            <div className="mt-5 sm:mt-7 md:mt-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] font-black text-[#0066FF] tracking-tight leading-tight">
                Every agency says the same thing.
              </h3>
            </div>
          </div>

          {/* ─── 2. STATEMENT STAGE: RED STATEMENTS FROM FAR BELOW ─── */}
          <div
            ref={stageRef}
            className="relative w-full max-w-4xl flex-1 flex items-center justify-center overflow-hidden min-h-[200px] sm:min-h-[240px]"
          >
            {STATEMENTS.map((statement, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  phraseRefs.current[idx] = el;
                }}
                className="absolute inset-0 flex items-center justify-center text-center px-4 will-change-transform"
              >
                <span className="text-red-600 font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[62px] tracking-tight leading-tight select-none drop-shadow-sm">
                  &ldquo;{statement}&rdquo;
                </span>
              </div>
            ))}
          </div>

          {/* ─── 3. SEAMLESS CLOSING DIALOGUE (Rises directly into view with ZERO gap) ─── */}
          <div
            ref={closingRef}
            className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pt-16 sm:pt-20 text-center"
          >
            {/* Empathy Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/90 text-[#0066FF] text-xs sm:text-[13px] font-bold uppercase tracking-wider shadow-xs mb-3">
              THE CONTRACTOR REALITY
            </div>

            {/* Main Empathy Headline with "this stuff anymore ?" in Blue + Curved Underline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]">
              I get why contractors don&rsquo;t trust{" "}
              <span className="relative inline-block text-[#0066FF] font-black whitespace-nowrap">
                this stuff anymore ?
                <HeadingCurveUnderline className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#0066FF]" />
              </span>
            </h3>

            {/* Conversational Narrative */}
            <div className="mt-4 sm:mt-5 space-y-1.5 text-base sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl">
              <p className="text-slate-800">
                Because a lot of you have already paid somebody.
              </p>
              <p className="text-slate-500">
                Then three months later you got a nice looking report showing:
              </p>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 my-5 sm:my-6 w-full max-w-xl">
              {REPORT_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col items-center justify-center text-center shadow-xs"
                >
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                    Metric
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-800">
                    {metric}
                  </span>
                </div>
              ))}
            </div>

            {/* Deadpan "Cool." & Emotional Question */}
            <div className="space-y-3 pt-1">
              <p className="text-lg sm:text-xl font-extrabold text-slate-400 italic">
                Cool.
              </p>
              <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-[1.12]">
                Did any of it turn into jobs?
              </h4>
              <div className="pt-2">
                <div className="relative inline-block">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-black text-[#0066FF] tracking-tight leading-tight block">
                    That is the number I care about !
                  </span>
                  <AccentCurveUnderline className="w-full h-3 sm:h-3.5 mt-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
