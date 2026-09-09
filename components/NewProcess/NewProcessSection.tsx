"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PiCheckBold, PiInfoBold } from "react-icons/pi";
import { Caveat } from "next/font/google";
import { CurvedUnderline } from "@/components/hero/HeroLogos";
import { DotGrid } from "@/components/hero/Hero3DVisuals";
import {
  MarketVisual,
  CampaignVisual,
  TrafficVisual,
  TrackingVisual,
  JobsVisual,
  FlowArrow,
  FlowPath,
  DESKTOP_FLOW_GRID,
  ColumnSeparator,
} from "@/components/NewProcess/ProcessVisuals";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const initial =
    direction === "up"
      ? { opacity: 0, y: 22 }
      : direction === "down"
        ? { opacity: 0, y: -18 }
        : direction === "left"
          ? { opacity: 0, x: -22 }
          : direction === "right"
            ? { opacity: 0, x: 22 }
            : { opacity: 0 };
  const animate = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CheckLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-white">
        <PiCheckBold className="h-2.5 w-2.5" />
      </span>
      <span className="text-[14.5px] sm:text-[15px] leading-snug text-slate-600">
        {children}
      </span>
    </li>
  );
}

function AccentNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 border-l-2 border-[#0066FF] pl-3 text-[14.5px] sm:text-[15px] leading-snug font-semibold text-slate-800">
      {children}
    </p>
  );
}

function StepNumber({ value }: { value: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-b from-white via-[#F3F8FF] to-[#E4EFFF] border border-white ring-1 ring-[#D4E3F4] shadow-[0_8px_14px_-6px_rgba(0,102,255,0.28),0_2px_4px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,102,255,0.08)]">
      <span className="relative text-[16px] font-black tracking-tight text-[#0066FF]">
        {value}
      </span>
    </div>
  );
}

const steps = [
  {
    id: "01",
    title: "We Check Your Market",
    visual: MarketVisual,
    content: (
      <>
        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          Before we spend a dollar, we look at whether Google Ads can actually
          work in your market.
        </p>
        <ul className="mt-4 space-y-2">
          <CheckLine>Search volume.</CheckLine>
          <CheckLine>Competition.</CheckLine>
          <CheckLine>Cost per click.</CheckLine>
          <CheckLine>Your average project value.</CheckLine>
          <CheckLine>Your margins.</CheckLine>
        </ul>
        <div className="mt-4 inline-flex items-start gap-2 rounded-full bg-[#EEF4FF] border border-[#CCE0FF] px-3 py-2">
          <PiInfoBold className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066FF]" />
          <p className="text-[12.5px] sm:text-[13px] font-semibold leading-snug text-[#0A1128]">
            If the numbers don&apos;t make sense, we&apos;ll tell you.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "02",
    title: "We Build The Campaign",
    visual: CampaignVisual,
    content: (
      <>
        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          We structure the campaign around the services that actually make you
          money.
        </p>
        <p className="mt-3.5 text-[14.5px] sm:text-[15px] font-semibold leading-snug text-[#0066FF]">
          Not every service you happen to offer.
        </p>
        <p className="mt-3.5 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          High-profit work. Tight targeting.{" "}
          <span className="font-black text-[#0066FF]">Simple.</span>
        </p>
      </>
    ),
  },
  {
    id: "03",
    title: "We Send The Traffic Somewhere Built To Convert",
    visual: TrafficVisual,
    content: (
      <>
        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          We don&apos;t send paid traffic to a homepage that tries to do
          everything.
        </p>
        <p className="mt-3.5 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          Each campaign goes to a focused page built to convert that specific
          search.
        </p>
        <AccentNote>
          So the ad, keyword and landing page all work together.
        </AccentNote>
      </>
    ),
  },
  {
    id: "04",
    title: "We Track What Actually Happens",
    visual: TrackingVisual,
    content: (
      <>
        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          We don&apos;t guess. We track:
        </p>
        <ul className="mt-4 space-y-2">
          <CheckLine>Calls.</CheckLine>
          <CheckLine>Forms.</CheckLine>
          <CheckLine>Estimate requests.</CheckLine>
          <CheckLine>Cost per lead.</CheckLine>
          <CheckLine>Which keywords are producing opportunities.</CheckLine>
          <CheckLine>Which ones are burning money.</CheckLine>
        </ul>
        <AccentNote>
          We cut what isn&apos;t working and put more money behind what is.
        </AccentNote>
      </>
    ),
  },
  {
    id: "05",
    title: "You Close The Jobs",
    visual: JobsVisual,
    content: (
      <>
        <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          A qualified homeowner becomes an estimate. An estimate becomes a job.
        </p>
        <p className="mt-3.5 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
          You close the work. We keep the engine running.
        </p>
        <AccentNote>
          The better your sales process is, the more valuable the campaign
          becomes.
        </AccentNote>
      </>
    ),
  },
] as const;

const NewProcessSection = () => {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden bg-linear-to-b from-white via-[#FCFDFF] to-white py-12 sm:py-12 lg:py-12 xl:py-12"
      aria-label="Process: Here's How It Works"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <DotGrid
          className="absolute top-8 right-6 sm:right-16 opacity-70"
          rows={8}
          cols={8}
        />
        <DotGrid
          className="absolute bottom-10 left-4 sm:left-10 opacity-60"
          rows={7}
          cols={7}
        />
        <div className="absolute right-[12%] bottom-0 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative w-full px-5 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal delay={0} direction="none">
              <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
                <span className="h-px w-6 bg-[#0066FF]/50" />
                <span className="text-[11.5px] sm:text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#0066FF]">
                  Process
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05} direction="up">
              <h2 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[44px] xl:text-[50px] font-black tracking-[-0.035em] leading-[1.08] text-[#0A1128]">
                Here&apos;s{" "}
                <span className="relative inline-block">
                  How It Works
                  <CurvedUnderline className="absolute -bottom-2 left-0 h-3 w-full text-[#0066FF] sm:-bottom-2.5 sm:h-4" />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} direction="up">
              <p className="mt-4 max-w-xl text-[14.5px] sm:text-[16px] leading-relaxed text-slate-500">
                A simple system designed to turn the right searches into real
                jobs — not just cheap leads.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.15}
            direction="left"
            className="hidden lg:block pb-1"
          >
            <div className="flex flex-col items-end">
              <span
                className={`${caveat.className} text-[24px] xl:text-[28px] font-bold tracking-wide text-[#0066FF] -rotate-2`}
              >
                Same strategy. Real results.
              </span>
              <div className="mt-0 w-40 xl:w-48">
                <CurvedUnderline className="h-3 w-full text-[#0066FF]" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Desktop: each step is its own column, separated by a vertical rule */}
        <div className="relative mt-14 hidden xl:block">
          <div className="relative overflow-visible">
            <FlowPath />
            <div className={`relative grid ${DESKTOP_FLOW_GRID} items-start`}>
              {steps.map((step, index) => {
                const Visual = step.visual;
                return (
                  <div key={step.id} className="contents">
                    <Reveal delay={0.08 + index * 0.05} direction="up">
                      <article className="px-1">
                        <Visual />
                        <div className="mt-8">
                          <StepNumber value={step.id} />
                          <h3 className="mt-3 text-[16px] 2xl:text-[17.5px] font-black tracking-tight leading-snug text-[#0A1128]">
                            {step.title}
                          </h3>
                          <div className="mt-4">{step.content}</div>
                        </div>
                      </article>
                    </Reveal>
                    {index < steps.length - 1 ? <ColumnSeparator /> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: same chapters, vertical spine */}
        <div className="relative mt-10 xl:hidden">
          <div
            className="absolute left-[13px] top-6 bottom-8 w-px bg-linear-to-b from-[#B7D4FF] via-[#0066FF]/35 to-[#B7D4FF]"
            aria-hidden
          />
          <div className="space-y-14">
            {steps.map((step, index) => {
              const Visual = step.visual;
              return (
                <Reveal key={step.id} delay={index * 0.05} direction="up">
                  <div className="grid grid-cols-[28px_1fr] gap-4 sm:gap-5">
                    <div className="relative z-10 pt-1">
                      <FlowArrow vertical />
                    </div>
                    <div>
                      <Visual />
                      <div className="mt-8">
                        <StepNumber value={step.id} />
                      </div>
                      <h3 className="mt-3 text-[20px] sm:text-[22px] font-black tracking-tight leading-snug text-[#0A1128]">
                        {step.title}
                      </h3>
                      <div className="mt-4 max-w-lg">{step.content}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p
            className={`${caveat.className} mt-8 text-center text-[22px] font-bold text-[#0066FF] lg:hidden`}
          >
            Same strategy. Real results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewProcessSection;
