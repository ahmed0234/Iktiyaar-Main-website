"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Caveat } from "next/font/google";
import {
  Target,
  X,
  Check,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  DollarSign,
  Users,
  MapPin,
  Percent,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const LEFT_ITEMS = [
  <>
    A $4 click can be <b className="font-extrabold text-red-600">expensive</b>.
  </>,
  <>
    If you spend $1,000 and get{" "}
    <b className="font-extrabold text-red-600">nothing</b>&hellip; even $1
    clicks were <b className="font-extrabold text-red-600">expensive</b>.
  </>,
  <>
    They optimize for more{" "}
    <b className="font-extrabold text-red-600">traffic</b>, more{" "}
    <b className="font-extrabold text-red-600">clicks</b>, more vanity{" "}
    <b className="font-extrabold text-red-600">metrics</b>.
  </>,
];

const RIGHT_ITEMS = [
  <>
    A $70 click can be <b className="font-extrabold text-emerald-600">cheap</b>.
  </>,
  <>
    If you spend $1,000 and make{" "}
    <b className="font-extrabold text-[#0066FF]">$20,000</b> from the
    jobs&hellip; that traffic was{" "}
    <b className="font-extrabold text-emerald-600">cheap</b>.
  </>,
  <>
    We optimize for{" "}
    <b className="font-extrabold text-emerald-600">profitable jobs</b>,{" "}
    <b className="font-extrabold text-emerald-600">real results</b>, and{" "}
    <b className="font-extrabold text-emerald-600">real growth</b>.
  </>,
];

const QUESTIONS = [
  {
    icon: TrendingUp,
    text: (
      <>
        What <span className="font-extrabold text-[#0066FF]">services</span>{" "}
        make you the most money?
      </>
    ),
  },
  {
    icon: DollarSign,
    text: (
      <>
        What is your{" "}
        <span className="font-extrabold text-[#0066FF]">average project</span>{" "}
        worth?
      </>
    ),
  },
  {
    icon: Users,
    text: (
      <>
        What <span className="font-extrabold text-[#0066FF]">jobs</span> do you
        actually want more of?
      </>
    ),
  },
  {
    icon: MapPin,
    text: (
      <>
        What <span className="font-extrabold text-[#0066FF]">areas</span> do you
        want to <span className="font-extrabold text-[#0066FF]">work</span> in?
      </>
    ),
  },
  {
    icon: Percent,
    text: (
      <>
        What <span className="font-extrabold text-[#0066FF]">percentage</span>{" "}
        of estimates do you close?
      </>
    ),
  },
  {
    icon: Target,
    text: (
      <>
        How much can you realistically{" "}
        <span className="font-extrabold text-[#0066FF]">spend</span> to acquire
        a new customer?
      </>
    ),
  },
];

export default function PositioningSection() {
  const rootRef = useRef<HTMLElement>(null);
  const headerRefs = useRef<HTMLElement[]>([]);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  const arrowLeftRef = useRef<SVGSVGElement>(null);
  const arrowRightRef = useRef<SVGSVGElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const bottomBoxRef = useRef<HTMLDivElement>(null);

  headerRefs.current = [];
  questionRefs.current = [];
  numberRefs.current = [];

  const collect = useCallback(
    <T extends HTMLElement>(bucket: React.MutableRefObject<T[]>) =>
      (el: T | null) => {
        if (el && !bucket.current.includes(el)) bucket.current.push(el);
      },
    [],
  );
  const addHeaderRef = collect(headerRefs);
  const addQuestionRef = collect(questionRefs);
  const addNumberRef = collect(numberRefs);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const scrollStart = { trigger: rootRef.current, start: "top 82%" };

      gsap.set(headerRefs.current, { opacity: 0, y: 15 });
      gsap.set([leftCardRef.current, rightCardRef.current], { opacity: 0 });
      gsap.set(leftCardRef.current, { x: -24 });
      gsap.set(rightCardRef.current, { x: 24 });
      gsap.set(vsRef.current, { opacity: 0, scale: 0.7 });
      gsap.set([arrowLeftRef.current, arrowRightRef.current], {
        opacity: 1,
        scale: 0.95,
      });
      gsap.set(bubbleRef.current, { opacity: 0, y: 12 });
      gsap.set(bottomBoxRef.current, { opacity: 0, y: 14 });

      const tl = gsap.timeline({ scrollTrigger: scrollStart });

      // Fast, snappy, unified entrance with zero lag
      tl.to(headerRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.08,
      })
        .to(
          [leftCardRef.current, rightCardRef.current],
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.25",
        )
        .to(
          [arrowLeftRef.current, arrowRightRef.current],
          { scale: 1, duration: 0.4, ease: "power2.out" },
          "<",
        )
        .to(
          vsRef.current,
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
          "-=0.3",
        )
        .to(
          [bubbleRef.current, bottomBoxRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.05,
          },
          "-=0.25",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FD] to-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      {/* premium grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "#F8FAFE",
          backgroundImage: `
            radial-gradient(ellipse 65% 55% at 50% 0%, transparent 0%, #F8FAFE 78%),
            linear-gradient(to right, rgba(0,102,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,102,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 42px 42px, 42px 42px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-200/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ---------- Header ---------- */}
        <div className="mb-12 text-center lg:mb-16">
          <h2
            ref={addHeaderRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.14] tracking-tight text-slate-900"
          >
            We Don&rsquo;t Optimize For Clicks.
            <br />
            <span className="relative inline-block text-[#0066FF]">
              We Optimize For Profitable Jobs.
              <svg
                aria-hidden
                viewBox="0 0 320 14"
                className="absolute -bottom-2 left-0 h-3 w-full text-[#0066FF]"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 C 80 2, 240 2, 318 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h2>

          <p
            ref={addHeaderRef}
            className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg font-normal leading-relaxed"
          >
            Traffic without profit is just expensive. We focus on what{" "}
            <b className="font-bold text-[#0066FF]">actually</b> moves your
            business forward.
          </p>
        </div>

        {/* ---------- Top Versus Cards ---------- */}
        <div className="relative">
          {/* hand-drawn dashed arrows pointing up at the blue heading */}
          <svg
            ref={arrowLeftRef}
            aria-hidden
            viewBox="0 0 120 460"
            className="pointer-events-none absolute -left-8 -top-24 hidden h-[300px] w-16 text-red-400 sm:h-[340px] sm:w-20 lg:-left-10 lg:block xl:-left-16 xl:h-[380px] xl:w-24 2xl:-left-24 2xl:h-[420px] 2xl:w-28"
            fill="none"
          >
            <path
              d="M32,440 L58,398 L14,360 L64,312 L12,266 L60,218 L22,166 L68,112 L100,45"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray="9 8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M100,45 L99,62 M100,45 L87,56"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            ref={arrowRightRef}
            aria-hidden
            viewBox="0 0 120 460"
            className="pointer-events-none absolute -right-8 -top-24 hidden h-[300px] w-16 text-emerald-400 sm:h-[340px] sm:w-20 lg:-right-10 lg:block xl:-right-16 xl:h-[380px] xl:w-24 2xl:-right-24 2xl:h-[420px] 2xl:w-28"
            fill="none"
          >
            <path
              d="M88,440 L62,398 L106,360 L56,312 L108,266 L60,218 L98,166 L52,112 L20,45"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray="9 8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20,45 L21,62 M20,45 L33,56"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* shared soft backdrop */}
          <div className="absolute inset-x-0 top-6 bottom-0 -z-10 hidden rounded-[32px] bg-gradient-to-r from-red-50/60 via-white to-emerald-50/60 lg:block" />

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left card */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-y-4 rounded-3xl bg-red-200/30 blur-lg"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-y-2 rounded-3xl bg-red-100/50"
              />
              <div
                ref={leftCardRef}
                className="relative rounded-3xl border border-red-100 bg-gradient-to-b from-white to-red-50/40 p-6 pt-9 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_14px_18px_-10px_rgba(220,38,38,0.14),0_30px_50px_-20px_rgba(220,38,38,0.22)] sm:p-7 sm:pt-9"
              >
                <span className="absolute -top-4 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-4 py-1.5 text-base sm:text-base lg:text-lg font-semibold text-white shadow-md shadow-red-500/20 sm:left-8">
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white/25">
                    <X size={11} strokeWidth={3} />
                  </span>
                  What Most Agencies Focus On
                </span>

                <div className="mt-3 space-y-3">
                  {LEFT_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 sm:p-4.5 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)]"
                    >
                      <span className="mt-0.5 flex h-7.5 w-7.5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50">
                        <X
                          size={15}
                          className="text-red-500"
                          strokeWidth={2.8}
                        />
                      </span>
                      <p className="text-[15.5px] sm:text-[17px] md:text-[17.5px] lg:text-[16.5px] xl:text-[17.5px] leading-relaxed text-slate-800 font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3.5 rounded-2xl bg-red-50 p-4 sm:p-4.5 border border-red-100/80">
                  <span className="text-2xl">😟</span>
                  <p className="text-[15.5px] sm:text-[17px] md:text-[17.5px] leading-relaxed text-slate-900 font-bold">
                    More clicks. More spend.{" "}
                    <b className="font-extrabold text-red-600">
                      More frustration.
                    </b>
                  </p>
                </div>
              </div>
            </div>

            {/* VS circle */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-2xl" />
              <div
                ref={vsRef}
                className="relative flex h-20 w-20 items-center justify-center rounded-full border border-slate-100 bg-white shadow-xl"
              >
                <div className="absolute inset-1.5 rounded-full border border-slate-100" />
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  VS
                </span>
              </div>
            </div>

            {/* mobile VS divider */}
            <div className="-my-3 flex justify-center lg:hidden">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-100 bg-white font-extrabold text-slate-900 shadow-md">
                VS
              </div>
            </div>

            {/* Right card */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-y-4 rounded-3xl bg-blue-200/30 blur-lg"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-y-2 rounded-3xl bg-blue-100/50"
              />
              <div
                ref={rightCardRef}
                className="relative rounded-3xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 p-6 pt-9 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_14px_18px_-10px_rgba(37,99,235,0.14),0_30px_50px_-20px_rgba(37,99,235,0.22)] sm:p-7 sm:pt-9"
              >
                <span className="absolute -top-4 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0066FF] to-blue-600 px-4 py-1.5 text-base sm:text-base lg:text-lg font-semibold text-white shadow-md shadow-blue-500/20 sm:left-8">
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white/25">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  How We Think (And Build)
                </span>

                <div className="mt-3 space-y-3">
                  {RIGHT_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 sm:p-4.5 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)]"
                    >
                      <span className="mt-0.5 flex h-7.5 w-7.5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
                        <Check
                          size={15}
                          className="text-emerald-500"
                          strokeWidth={2.8}
                        />
                      </span>
                      <p className="text-[15.5px] sm:text-[17px] md:text-[17.5px] lg:text-[16.5px] xl:text-[17.5px] leading-relaxed text-slate-800 font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3.5 rounded-2xl bg-emerald-50 p-4 sm:p-4.5 border border-emerald-100/80">
                  <span className="text-2xl">🤩</span>
                  <p className="text-[15.5px] sm:text-[17px] md:text-[17.5px] leading-relaxed text-slate-900 font-bold">
                    Better leads. Better jobs.{" "}
                    <b className="font-extrabold text-emerald-600">
                      More profit.
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ COMPACT BOTTOM QUESTIONS CARD WITH 3D DEPTH ════════════════ */}
        <div className="relative mt-12 sm:mt-14 md:mt-16">
          {/* Ambient 3D Shadow Backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 translate-y-4 rounded-3xl bg-blue-500/5 blur-xl pointer-events-none"
          />

          {/* Overlapping Floating Speech Bubble Badge */}
          <div className="absolute -top-5 sm:-top-5.5 left-1/2 -translate-x-1/2 z-20">
            <div
              ref={bubbleRef}
              className="relative inline-flex items-center gap-2.5 rounded-full border-2 border-blue-200/90 bg-white px-5 sm:px-7 py-1.5 sm:py-2 shadow-[0_6px_20px_-4px_rgba(0,102,255,0.16)]"
            >
              <div className="flex h-6 w-6 sm:h-6.5 sm:w-6.5 items-center justify-center rounded-full bg-[#0066FF] shadow-xs shadow-blue-500/30 shrink-0">
                <MessageCircle size={13} className="text-white fill-white" />
              </div>
              <span className="text-xs sm:text-sm md:text-[15px] font-bold text-[#0066FF] tracking-tight whitespace-nowrap">
                So before we build anything, I want to know:
              </span>

              {/* Downward triangle pointer notch */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-blue-200/90 rotate-45 pointer-events-none" />
            </div>
          </div>

          {/* Main Compact Elevated White Questions Box */}
          <div
            ref={bottomBoxRef}
            className="relative rounded-3xl sm:rounded-[32px] border border-blue-100/90 bg-gradient-to-b from-white via-white to-blue-50/20 px-4 sm:px-6 lg:px-6 pt-11 sm:pt-12 pb-6 sm:pb-7 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_16px_40px_-12px_rgba(0,102,255,0.08),0_8px_20px_-8px_rgba(15,23,42,0.04)]"
          >
            {/* 6 Column Responsive Layout with Proper Widths & Zero Overlap */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-2 sm:gap-x-3 gap-y-7 lg:gap-y-0">
              {QUESTIONS.map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  ref={addQuestionRef}
                  className="relative flex flex-col items-center justify-between px-1.5 sm:px-2 text-center lg:border-r lg:border-dashed lg:border-blue-200/70 lg:last:border-r-0 group"
                >
                  {/* Top Circular Icon Badge */}
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-blue-50/90 border border-blue-100/80 shadow-xs mb-3 group-hover:scale-105 group-hover:bg-blue-100/80 transition-all duration-300 shrink-0">
                    <Icon
                      size={21}
                      className="text-[#0066FF]"
                      strokeWidth={2.2}
                    />
                  </div>

                  {/* Question Text (Clean inline text flow, never splits into flex items) */}
                  <div className="flex-1 flex items-center justify-center w-full min-h-[48px] mb-3 px-1">
                    <p className="text-base sm:text-base xl:text-lg font-semibold text-slate-800 leading-[1.35] tracking-tight text-center break-normal">
                      {text}
                    </p>
                  </div>

                  {/* Step Number Badge */}
                  <div className="mt-auto flex justify-center pt-0.5">
                    <span
                      ref={addNumberRef}
                      className="relative z-10 flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0066FF] text-[11px] sm:text-xs font-black text-white shadow-[0_3px_10px_rgba(0,102,255,0.35)] border-2 border-white group-hover:scale-110 transition-transform duration-300"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Connecting Dashed Horizontal Line across all 6 columns on desktop */}
            <div className="absolute left-8 right-8 bottom-[28px] sm:bottom-[30px] hidden lg:block border-t-2 border-dashed border-blue-200/90 pointer-events-none" />
          </div>
        </div>

        {/* ════════════════ COMPACT BOTTOM TAKEAWAY CARD WITH 3D DEPTH ════════════════ */}
        <div className="mt-7 sm:mt-9 flex justify-center">
          <div className="relative max-w-2xl w-full">
            {/* Soft ambient glow */}
            <div
              aria-hidden
              className="absolute inset-0 translate-y-3 rounded-2xl bg-blue-200/25 blur-lg pointer-events-none"
            />
            <div className="relative flex flex-col items-center gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border border-blue-100/90 bg-gradient-to-b from-white to-blue-50/40 p-5 sm:p-6 text-center sm:flex-row sm:text-left shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_12px_24px_-8px_rgba(0,102,255,0.1),0_20px_40px_-16px_rgba(15,23,42,0.1)]">
              {/* Lightbulb 3D Tile with Sparkles */}
              <div className="relative shrink-0">
                <svg
                  aria-hidden
                  viewBox="0 0 30 30"
                  className="pointer-events-none absolute -left-2.5 -top-2.5 h-6 w-6 text-blue-300"
                >
                  <path
                    d="M4 20 L10 14 M2 12 L9 10 M8 4 L11 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white border border-blue-100/80 shadow-[0_8px_16px_-4px_rgba(0,102,255,0.16)]">
                  <Lightbulb
                    size={26}
                    className="text-amber-500 fill-amber-400/20"
                    strokeWidth={2.2}
                  />
                </div>
              </div>

              {/* Takeaway Text with Handwritten Accent */}
              <p className="text-lg sm:text-xl font-extrabold leading-snug text-slate-900">
                Then we build backwards from there.{" "}
                <span
                  className={`${caveat.className} relative inline-block -rotate-1 text-2xl sm:text-3xl font-bold leading-none text-[#0066FF]`}
                >
                  That&rsquo;s the difference.
                  <svg
                    aria-hidden
                    viewBox="0 0 240 14"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 h-2.5 w-full text-[#0066FF]"
                  >
                    <path
                      d="M3 9 C 45 2, 90 12, 130 6 C 165 2, 205 9, 237 4"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
