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
    A $4 click can be <b className="font-semibold text-red-600">expensive</b>.
  </>,
  <>
    If you spend $1,000 and get{" "}
    <b className="font-semibold text-red-600">nothing</b>&hellip; even $1 clicks
    were <b className="font-semibold text-red-600">expensive</b>.
  </>,
  <>
    They optimize for more <b className="font-semibold text-red-600">traffic</b>
    , more <b className="font-semibold text-red-600">clicks</b>, more vanity{" "}
    <b className="font-semibold text-red-600">metrics</b>.
  </>,
];

const RIGHT_ITEMS = [
  <>
    A $70 click can be <b className="font-semibold text-emerald-600">cheap</b>.
  </>,
  <>
    If you spend $1,000 and make{" "}
    <b className="font-semibold text-blue-600">$20,000 </b> from the jobs&hellip;
    that traffic was <b className="font-semibold text-emerald-600">cheap</b>.
  </>,
  <>
    We optimize for{" "}
    <b className="font-semibold text-emerald-600">profitable jobs</b>,{" "}
    <b className="font-semibold text-emerald-600">real results</b>, and{" "}
    <b className="font-semibold text-emerald-600">real growth</b>.
  </>,
];

const QUESTIONS = [
  {
    icon: TrendingUp,
    text: (
      <>
        What <b className="font-semibold text-blue-600">services</b> make you
        the most money?
      </>
    ),
  },
  {
    icon: DollarSign,
    text: (
      <>
        What is your{" "}
        <b className="font-semibold text-blue-600">average project</b> worth?
      </>
    ),
  },
  {
    icon: Users,
    text: (
      <>
        What <b className="font-semibold text-blue-600">jobs</b> do you actually
        want more of?
      </>
    ),
  },
  {
    icon: MapPin,
    text: (
      <>
        What <b className="font-semibold text-blue-600">areas</b> do you want to{" "}
        <b className="font-semibold text-blue-600">work</b> in?
      </>
    ),
  },
  {
    icon: Percent,
    text: (
      <>
        What <b className="font-semibold text-blue-600">percentage</b> of
        estimates do you close?
      </>
    ),
  },
  {
    icon: Target,
    text: (
      <>
        How much can you realistically{" "}
        <b className="font-semibold text-blue-600">spend</b> to acquire a new
        customer?
      </>
    ),
  },
];

export default function PositioningSection() {
  const rootRef = useRef(null);
  const headerRefs = useRef([]);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const vsRef = useRef(null);
  const arrowLeftRef = useRef(null);
  const arrowRightRef = useRef(null);
  const bubbleRef = useRef(null);
  const questionRefs = useRef([]);
  const numberRefs = useRef([]);
  const bottomBoxRef = useRef(null);

  headerRefs.current = [];
  questionRefs.current = [];
  numberRefs.current = [];

  const collect = useCallback(
    (bucket) => (el) => {
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

      const scrollStart = { trigger: rootRef.current, start: "top 78%" };

      gsap.set(headerRefs.current, { opacity: 0, y: 20 });
      gsap.set([leftCardRef.current, rightCardRef.current], { opacity: 0 });
      gsap.set(leftCardRef.current, { x: -36 });
      gsap.set(rightCardRef.current, { x: 36 });
      gsap.set(vsRef.current, { opacity: 0, scale: 0.6 });
      gsap.set([arrowLeftRef.current, arrowRightRef.current], {
        opacity: 1,
        scale: 0.9,
      });
      gsap.set(bubbleRef.current, { opacity: 0, y: 16 });
      gsap.set(questionRefs.current, { opacity: 0, y: 18 });
      gsap.set(numberRefs.current, { opacity: 0, scale: 0.5 });
      gsap.set(bottomBoxRef.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ scrollTrigger: scrollStart });

      tl.to(headerRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      })
        .to(
          [leftCardRef.current, rightCardRef.current],
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.2",
        )
        .to(
          [arrowLeftRef.current, arrowRightRef.current],
          { scale: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
          "<",
        )
        .to(
          vsRef.current,
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)" },
          "-=0.35",
        )
        .to(
          bubbleRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.1",
        )
        .to(
          questionRefs.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.07,
          },
          "-=0.2",
        )
        .to(
          numberRefs.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            stagger: 0.05,
          },
          "-=0.35",
        )
        .to(
          bottomBoxRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.15",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FD] to-white px-6 py-24 lg:py-32"
    >
      {/* premium grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "#F8FAFE",
          backgroundImage: `
            radial-gradient(ellipse 65% 55% at 50% 0%, transparent 0%, #F8FAFE 78%),
            linear-gradient(to right, rgba(37,99,235,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37,99,235,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 42px 42px, 42px 42px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-200/20 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ---------- Header ---------- */}
        <div className="mb-16 text-center lg:mb-20">
          <h2
            ref={addHeaderRef}
            className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            We Don&rsquo;t Optimize For Clicks.
            <br />
            <span className="relative inline-block text-blue-600">
              We Optimize For Profitable Jobs.
              <svg
                aria-hidden
                viewBox="0 0 320 14"
                className="absolute -bottom-2 left-0 h-3 w-full text-blue-500"
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
            className="mx-auto mt-7 max-w-2xl text-base text-slate-500 sm:text-lg"
          >
            Traffic without profit is just expensive. We focus on what{" "}
            <b className="font-semibold text-blue-600">actually</b> moves your
            business forward.
          </p>
        </div>

        {/* ---------- Cards ---------- */}
        <div className="relative">
          {/* decorative curved dashed arrows (desktop only) */}
          <svg
            ref={arrowLeftRef}
            aria-hidden
            viewBox="0 0 120 460"
            className="pointer-events-none absolute -left-24 -top-16 hidden h-[420px] w-28 text-red-400 lg:block"
            fill="none"
          >
            <path
              d="M95 22 C 30 55, 8 200, 34 440"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
            <path
              d="M84 12 L95 22 L88 35"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            ref={arrowRightRef}
            aria-hidden
            viewBox="0 0 120 460"
            className="pointer-events-none absolute -right-24 -top-16 hidden h-[420px] w-28 text-emerald-400 lg:block"
            fill="none"
          >
            <path
              d="M25 22 C 90 55, 112 200, 86 440"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
            <path
              d="M36 12 L25 22 L32 35"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* shared soft backdrop */}
          <div className="absolute inset-x-0 top-6 bottom-0 -z-10 hidden rounded-[32px] bg-gradient-to-r from-red-50/60 via-white to-emerald-50/60 lg:block" />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left card */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-y-4 rounded-3xl bg-red-200/40 blur-lg"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-y-2 rounded-3xl bg-red-100/60"
              />
              <div
                ref={leftCardRef}
                className="relative rounded-3xl border border-red-100 bg-gradient-to-b from-white to-red-50/40 p-6 pt-9 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_14px_18px_-10px_rgba(220,38,38,0.16),0_35px_65px_-20px_rgba(220,38,38,0.28)] sm:p-8 sm:pt-10"
              >
                <span className="absolute -top-4 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-500/20 sm:left-8">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
                    <X size={12} strokeWidth={3} />
                  </span>
                  What Most Agencies Focus On
                </span>

                <div className="mt-3 space-y-3">
                  {LEFT_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-[0_2px_6px_-2px_rgba(15,23,42,0.06)]"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50">
                        <X
                          size={14}
                          className="text-red-500"
                          strokeWidth={2.5}
                        />
                      </span>
                      <p className="text-base leading-relaxed text-slate-700 sm:text-[17px]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-4">
                  <span className="text-2xl">😟</span>
                  <p className="text-base leading-relaxed text-slate-800 sm:text-[17px]">
                    More clicks. More spend.{" "}
                    <b className="font-semibold text-red-600">
                      More frustration.
                    </b>
                  </p>
                </div>
              </div>
            </div>

            {/* VS circle */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-2xl" />
              <div
                ref={vsRef}
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-slate-100 bg-white shadow-xl"
              >
                <div className="absolute inset-2 rounded-full border border-slate-100" />
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  VS
                </span>
              </div>
            </div>

            {/* mobile VS divider */}
            <div className="-my-4 flex justify-center lg:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white font-extrabold text-slate-900 shadow-lg">
                VS
              </div>
            </div>

            {/* Right card */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-y-4 rounded-3xl bg-blue-200/40 blur-lg"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-y-2 rounded-3xl bg-blue-100/60"
              />
              <div
                ref={rightCardRef}
                className="relative rounded-3xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 p-6 pt-9 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_14px_18px_-10px_rgba(37,99,235,0.16),0_35px_65px_-20px_rgba(37,99,235,0.28)] sm:p-8 sm:pt-10"
              >
                <span className="absolute -top-4 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 sm:left-8">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  How We Think (And Build)
                </span>

                <div className="mt-3 space-y-3">
                  {RIGHT_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-[0_2px_6px_-2px_rgba(15,23,42,0.06)]"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
                        <Check
                          size={14}
                          className="text-emerald-500"
                          strokeWidth={2.5}
                        />
                      </span>
                      <p className="text-base leading-relaxed text-slate-700 sm:text-[17px]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-4">
                  <span className="text-2xl">🤩</span>
                  <p className="text-base leading-relaxed text-slate-800 sm:text-[17px]">
                    Better leads. Better jobs.{" "}
                    <b className="font-semibold text-emerald-600">
                      More profit.
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Message bubble ---------- */}
        <div className="relative z-10 mt-16 flex justify-center lg:mt-20">
          <div
            ref={bubbleRef}
            className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-6 py-4 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.25)]"
          >
            <MessageCircle size={22} className="text-blue-600" />
            <span className="text-lg font-bold text-blue-600 sm:text-xl">
              So before we build anything, I want to know:
            </span>
          </div>
        </div>
        <div className="relative z-0 mx-auto -mt-1 h-3 w-3 rotate-45 border-b border-r border-blue-100 bg-white" />

        {/* ---------- Questions box ---------- */}
        <div
          ref={bottomBoxRef}
          className="relative mt-4 rounded-3xl border border-slate-100 bg-white px-6 py-10 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.15)] sm:px-10"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-2">
            {QUESTIONS.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                ref={addQuestionRef}
                className="relative flex flex-col items-center gap-3 px-2 text-center lg:border-l lg:border-dashed lg:border-slate-200 lg:first:border-l-0"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                  <Icon size={22} className="text-blue-600" strokeWidth={2} />
                </div>
                <p className="text-sm leading-snug text-slate-700">{text}</p>
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white lg:hidden">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* desktop connecting dashed line + numbers */}
          <div className="relative mt-8 hidden items-center justify-between px-2 lg:flex">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 border-t-2 border-dashed border-blue-200" />
            {QUESTIONS.map((_, i) => (
              <span
                key={i}
                ref={addNumberRef}
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Bottom lightbulb note ---------- */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-6 text-center shadow-[0_15px_40px_-25px_rgba(15,23,42,0.2)] sm:flex-row sm:text-left">
            <svg
              aria-hidden
              viewBox="0 0 30 30"
              className="pointer-events-none absolute -left-3 -top-3 hidden h-8 w-8 text-slate-300 sm:block"
            >
              <path
                d="M4 20 L10 14 M2 12 L9 10 M8 4 L11 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <Lightbulb size={22} className="text-amber-500" />
            </div>
            <p className="text-[15px] font-semibold text-slate-900 sm:text-base">
              Then we build backwards from there.{" "}
              <span
                className={`${caveat.className} text-xl text-blue-600 underline decoration-blue-300 decoration-2 underline-offset-4 sm:text-2xl`}
              >
                That&rsquo;s the difference.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
