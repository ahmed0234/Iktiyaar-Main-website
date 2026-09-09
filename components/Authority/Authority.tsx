"use client";

import { useRef, type ComponentType } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Caveat } from "next/font/google";
import {
  Target,
  Shield,
  Crown,
  Ban,
  ChevronRight,
  TrendingUp,
  X,
} from "lucide-react";
import { PiArrowRightBold } from "react-icons/pi";
import { CurvedUnderline } from "@/components/hero/HeroLogos";
import { DotGrid } from "@/components/hero/Hero3DVisuals";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const GLASS_PANEL =
  "relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-white/70 backdrop-blur-md border border-[#D7E7FB] shadow-[0_24px_50px_-18px_rgba(15,23,42,0.12),0_10px_24px_-12px_rgba(0,102,255,0.10),inset_0_1px_1px_rgba(255,255,255,0.95)]";

const questions = [
  "How much does the average job make you?",
  "How many leads become estimates?",
  "How many estimates become jobs?",
  "What can you afford to pay to acquire a customer?",
] as const;

const excludedServices = [
  "SEO.",
  "Facebook Ads.",
  "Social media management.",
  "Web design retainers.",
  "Ten different marketing services bundled together.",
] as const;

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

function Specular() {
  return (
    <div
      className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent"
      aria-hidden
    />
  );
}

function CoolSpark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden
    >
      <path d="M14 2 L14 8" stroke="#0066FF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22.5 5.5 L18.5 9.5" stroke="#0066FF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M26 14 L20 14" stroke="#0066FF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function AnnotationArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 48"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 8 C 28 10, 46 22, 54 40"
        stroke="#0066FF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M44 36 L54 42 L48 28"
        stroke="#0066FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoneyUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 16"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      <path
        d="M3 9 C 70 3, 160 14, 277 8"
        stroke="#0066FF"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M18 12 C 90 7, 180 15, 260 10"
        stroke="#0066FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
    </svg>
  );
}

function CoolUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 14"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      <path
        d="M3 8 C 18 3, 42 12, 67 7"
        stroke="#0066FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FooterUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden
    >
      <path
        d="M3 8 C 55 3, 130 12, 217 7"
        stroke="#0066FF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionBadge({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-b from-white to-[#E4EFFF] border border-white ring-1 ring-[#D4E3F4] text-[#0066FF] shadow-[0_6px_12px_-4px_rgba(0,102,255,0.25),inset_0_1px_1px_rgba(255,255,255,1)]">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="rounded-full bg-[#EEF4FF] border border-[#CCE0FF] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0066FF]">
        {label}
      </span>
    </div>
  );
}

function MetricNumber({ value }: { value: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-white via-[#F3F8FF] to-[#E4EFFF] border border-white ring-1 ring-[#D4E3F4] text-[12.5px] font-black text-[#0066FF] shadow-[0_6px_12px_-5px_rgba(0,102,255,0.28),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,102,255,0.08)]">
      {value}
    </span>
  );
}

const Authority = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-linear-to-b from-white via-[#F8FBFF] to-white py-16 sm:py-20 lg:py-24"
      aria-label="Differentiation and Authority"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <DotGrid className="absolute top-8 left-6 sm:left-14 opacity-60" rows={7} cols={7} />
        <DotGrid className="absolute top-8 right-6 sm:right-14 opacity-60" rows={7} cols={7} />
        <div className="absolute top-1/3 left-1/5 h-[420px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/6 h-[380px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.05)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative w-full px-5 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-24">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 2xl:gap-12 items-stretch">
          {/* ── Left: Differentiation ── */}
          <Reveal delay={0.05} direction="up">
            <article className={`${GLASS_PANEL} h-full p-6 sm:p-8 lg:p-9`}>
              <Specular />
              <div className="pointer-events-none absolute -top-16 right-8 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.08)_0%,transparent_70%)] blur-2xl" />

              <div className="relative flex items-start justify-between gap-4">
                <SectionBadge icon={Target} label="Differentiation" />
                <div className="hidden sm:flex flex-col items-end -mt-1">
                  <span
                    className={`${caveat.className} text-[20px] xl:text-[22px] font-bold text-[#0066FF] -rotate-2 leading-none`}
                  >
                    Real results. Not just leads.
                  </span>
                  <AnnotationArrow className="mt-1 h-9 w-14 text-[#0066FF]" />
                </div>
              </div>

              <h2 className="relative mt-6 text-[34px] sm:text-[42px] xl:text-[48px] 2xl:text-[52px] font-black tracking-[-0.04em] leading-[1.05] text-[#0A1128]">
                <span className="relative inline-block">
                  Why Ikhtiyaar?
                  <CurvedUnderline className="absolute -bottom-2 left-0 h-3.5 w-full text-[#0066FF] sm:-bottom-2.5 sm:h-4" />
                </span>
              </h2>

              <p className="mt-5 max-w-md text-[15px] sm:text-[16.5px] leading-relaxed text-slate-500">
                Because we care about whether the numbers work after the lead
                comes in.
              </p>

              <div className="relative mt-7 rounded-[22px] bg-white/80 border border-[#DCEAFB] p-4 sm:p-5 shadow-[0_12px_28px_-14px_rgba(0,102,255,0.12),inset_0_1px_1px_rgba(255,255,255,1)]">
                <p className="text-[13.5px] sm:text-[14.5px] font-medium text-slate-500">
                  A lot of agencies stop at:
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full bg-[#EEF4FF] border border-[#CCE0FF] px-3 py-1.5 text-[13px] sm:text-[14px] font-semibold text-slate-700">
                    Your cost per click went down.
                  </span>
                  <span className="relative inline-flex items-start">
                    <CoolSpark className="absolute -top-3 -right-4 h-6 w-6" />
                    <span
                      className={`${caveat.className} relative text-[28px] sm:text-[32px] font-bold leading-none text-[#0066FF]`}
                    >
                      Cool.
                      <CoolUnderline className="absolute -bottom-1 left-0 h-3 w-full" />
                    </span>
                  </span>
                </div>

                <p className="relative mt-5 text-[26px] sm:text-[32px] xl:text-[34px] font-black tracking-[-0.03em] leading-[1.1] text-[#0066FF]">
                  <span className="relative inline-block">
                    But did you make money?
                    <MoneyUnderline className="absolute -bottom-1 left-0 h-3.5 w-full" />
                  </span>
                </p>
              </div>

              <ol className="mt-6 divide-y divide-[#E6EFF8]">
                {questions.map((question, index) => (
                  <li
                    key={question}
                    className="flex items-center gap-3 py-3.5 first:pt-1 last:pb-1"
                  >
                    <MetricNumber value={String(index + 1)} />
                    <p className="flex-1 text-[14.5px] sm:text-[15.5px] font-semibold leading-snug text-[#0A1128]">
                      {question}
                    </p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0066FF] text-white shadow-[0_8px_16px_-6px_rgba(0,102,255,0.45)]">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <p className="relative pt-1 text-[14.5px] sm:text-[15.5px] font-semibold leading-snug text-[#0A1128]">
                  <span className="relative inline-block">
                    That&apos;s how we decide whether a campaign is working.
                    <FooterUnderline className="absolute -bottom-1 left-0 h-3 w-[85%]" />
                  </span>
                </p>
              </div>
            </article>
          </Reveal>

          {/* Connector */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] z-20 hidden -translate-x-1/2 lg:flex items-center justify-center"
            aria-hidden
          >
            <div className="absolute -left-16 h-px w-16 bg-linear-to-r from-transparent to-[#B7D4FF]" />
            <div className="absolute -right-16 h-px w-16 bg-linear-to-l from-transparent to-[#B7D4FF]" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-[0_10px_22px_-6px_rgba(0,102,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]">
              <PiArrowRightBold className="h-4 w-4" />
            </div>
          </div>

          {/* ── Right: Authority ── */}
          <Reveal delay={0.12} direction="up">
            <article className={`${GLASS_PANEL} h-full p-6 sm:p-8 lg:p-9`}>
              <Specular />
              <div className="pointer-events-none absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.08)_0%,transparent_70%)] blur-2xl" />

              <SectionBadge icon={Shield} label="Authority" />

              <h2 className="mt-6 text-[30px] sm:text-[38px] xl:text-[42px] 2xl:text-[46px] font-black tracking-[-0.04em] leading-[1.08] text-[#0A1128]">
                Built By Google Ads{" "}
                <span className="relative inline-block">
                  Specialists. Not A
                  <CurvedUnderline className="absolute -bottom-1.5 left-0 h-3 w-full text-[#0066FF] sm:h-3.5" />
                </span>{" "}
                Full-Service Marketing Shop.
              </h2>

              <p className="mt-5 text-[15px] sm:text-[16.5px] font-medium text-slate-500">
                Google Ads is what we do.
              </p>

              <div className="relative mt-7 overflow-hidden rounded-[24px] bg-white/85 border border-[#C9DEFF] p-4 sm:p-5 shadow-[0_18px_40px_-14px_rgba(0,102,255,0.22),0_0_0_1px_rgba(0,102,255,0.06),inset_0_1px_1px_rgba(255,255,255,1)]">
                <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_20%_40%,rgba(0,102,255,0.10)_0%,transparent_55%)]" />
                <div className="relative flex items-start gap-4">
                  <div className="relative flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-[20px] bg-linear-to-b from-white to-[#EEF4FF] border border-white ring-1 ring-[#D4E3F4] shadow-[0_14px_24px_-10px_rgba(15,23,42,0.18),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-3px_6px_rgba(0,102,255,0.06)]">
                    <div className="relative h-[58px] w-[58px] overflow-hidden rounded-[14px] bg-[#070B14] ring-1 ring-black/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]">
                      <Image
                        src="/Authority/image.png"
                        alt="Google Ads"
                        fill
                        className="object-contain p-0.5"
                        sizes="58px"
                      />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[20px] sm:text-[22px] font-black tracking-tight text-[#0A1128]">
                        Google Ads
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF4FF] border border-[#CCE0FF] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0066FF]">
                        <Crown className="h-3 w-3" />
                        Our Specialty
                      </span>
                    </div>
                    <p className="mt-2 text-[13.5px] sm:text-[14.5px] leading-relaxed text-slate-500">
                      We specialize in building and managing Google Search
                      campaigns for businesses that need more qualified inbound
                      opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[13px] font-bold tracking-tight text-slate-400">
                    Other Services We Don&apos;t Offer
                  </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {excludedServices.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-2 text-[13.5px] sm:text-[14px] text-slate-400"
                    >
                      <Ban className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Authority;
