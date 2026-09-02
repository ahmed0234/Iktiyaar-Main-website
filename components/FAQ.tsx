"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Zap,
  Lock,
  Search,
  LayoutTemplate,
  Users,
  Award,
  ArrowRight,
  MessageCircleQuestion,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal animation wrapper                                    */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const initial =
    direction === "up"
      ? { opacity: 0, y: 22 }
      : direction === "left"
        ? { opacity: 0, x: -22 }
        : direction === "right"
          ? { opacity: 0, x: 22 }
          : { opacity: 0 };
  const animateState = inView ? { opacity: 1, y: 0, x: 0 } : initial;
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animateState}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Handwritten-style underline SVG for "No Fluff."                    */
/* ------------------------------------------------------------------ */
function CurvedUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M 4 10 C 50 3, 110 4, 150 7 C 170 8.5, 190 9, 196 6.5"
        stroke="#0062FF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hand-drawn Downward Looped Arrow (Right Header Decor)              */
/* ------------------------------------------------------------------ */
function LoopedArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 110"
      fill="none"
      className={className}
    >
      {/* Looped path curving down */}
      <path
        d="M 22 10 C 50 15, 68 32, 54 50 C 40 68, 18 52, 34 38 C 50 24, 62 48, 56 75 L 52 98"
        stroke="#0062FF"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow head pointing down */}
      <path
        d="M 40 88 L 52 100 L 64 88"
        stroke="#0062FF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  3D Glassmorphism Chat Bubble Question Graphic (Left Header Decor) */
/* ------------------------------------------------------------------ */
function QuestionGraphic() {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 select-none pointer-events-none">
      {/* Back bubble */}
      <div className="absolute top-1 left-4 w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100/70 border border-blue-200/60 shadow-md backdrop-blur-sm -rotate-6" />

      {/* Front primary bubble */}
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-white/95 border-2 border-blue-100 shadow-[0_12px_28px_-6px_rgba(0,102,255,0.18),0_2px_8px_rgba(15,23,42,0.04)] flex items-center justify-center backdrop-blur-md rotate-3">
        <div className="relative flex items-center justify-center">
          <span className="text-[32px] sm:text-[36px] font-black text-[#0062FF] font-sans leading-none tracking-tight">
            ?
          </span>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping opacity-75" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Eyebrow Header Pill                                                */
/* ------------------------------------------------------------------ */
function FAQEyebrow() {
  return (
    <div className="inline-flex items-center justify-center gap-2.5 mb-3.5">
      <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-4 h-px bg-blue-300" />
      <span className="text-[12px] sm:text-[13px] font-extrabold tracking-[0.22em] text-[#0062FF] uppercase px-1">
        FAQ
      </span>
      <div className="w-4 h-px bg-blue-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#0062FF]" />
      <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-blue-300" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data Definition                                                */
/* ------------------------------------------------------------------ */
interface FAQItem {
  id: string;
  question: string;
  category: "Strategy & Budget" | "Leads & Growth" | "Trust & Process";
  icon: React.ElementType;
  answer: {
    summary: string;
    highlights?: string[];
    punchline?: string;
    details?: string;
  };
}

const faqList: FAQItem[] = [
  {
    id: "failed-before",
    question: "“I’ve tried Google Ads before. It didn’t work.”",
    category: "Strategy & Budget",
    icon: HelpCircle,
    answer: {
      summary:
        "We hear this from almost every contractor we speak with. Sometimes Google Ads genuinely isn't a fit, but when we audit previous accounts that failed, the issues are almost always the same:",
      highlights: [
        "Broad-match keywords bidding on low-quality, tire-kicker queries",
        "Driving paid traffic to a generic homepage instead of a high-converting landing page",
        "No negative keyword lists filtering out irrelevant, expensive searches",
        "Incorrect location radius or broken call/form conversion tracking",
        "Letting Google's automated algorithms optimize for vanity metrics rather than real, qualified estimates",
      ],
      punchline:
        "There is a huge difference between “Google Ads doesn't work” and “The campaign you ran didn't work.” We diagnose exactly which one it is before you spend a single dollar.",
    },
  },
  {
    id: "budget-spend",
    question: "“How much do I need to spend?”",
    category: "Strategy & Budget",
    icon: DollarSign,
    answer: {
      summary:
        "It depends on your market, trade, and project economics. There isn't one universal Google Ads budget for all contractors.",
      details:
        "A roofing contractor closing $25,000 replacements has very different unit economics than someone doing $1,500 repair jobs. Likewise, high-density metropolitan areas have different cost-per-click dynamics than rural territories.",
      highlights: [
        "Local search volume & real keyword cost-per-click (CPC)",
        "Expected landing page conversion rates",
        "Your average project value & gross margins",
        "Your sales close rate from inbound lead to signed job",
      ],
      punchline:
        "Math first. Budget second. We calculate the exact numbers needed to generate a positive return before setting your monthly ad spend.",
    },
  },
  {
    id: "are-ads-expensive",
    question: "“Are Google Ads expensive?”",
    category: "Strategy & Budget",
    icon: TrendingUp,
    answer: {
      summary:
        "They can be—but cost-per-click by itself means almost nothing without context.",
      details:
        "If a click costs $50 but consistently converts into high-margin $20,000 remodeling or roofing jobs, you want as many $50 clicks as possible. Conversely, if a click costs $2 and produces zero signed jobs, it is completely wasted money.",
      punchline:
        "“Expensive” and “cheap” are strictly relative to the revenue generated. Our focus is never on buying the cheapest traffic—it's maximizing the net profit generated from your total ad spend.",
    },
  },
  {
    id: "how-quickly",
    question: "“How quickly can this work?”",
    category: "Strategy & Budget",
    icon: Zap,
    answer: {
      summary:
        "Google Ads is one of the fastest channels to place your business directly in front of homeowners actively searching for your service right now.",
      details:
        "While new inquiries can start landing within the first week of launching, campaigns require real data to reach peak efficiency. Over the first 30–60 days, we continuously dial in:",
      highlights: [
        "Which high-intent keywords deliver the highest-ticket jobs",
        "Which zip codes and locations generate the best inquiries",
        "Which negative keywords must be eliminated to cut waste",
      ],
      punchline:
        "Initial speed is fast; compounding efficiency happens as we feed the campaign real job-closing data.",
    },
  },
  {
    id: "guarantee-leads",
    question: "“Do you guarantee leads?”",
    category: "Leads & Growth",
    icon: ShieldCheck,
    answer: {
      summary:
        "No serious, honest marketer can guarantee exactly how many homeowners will search for your service next month or how many will choose to hire you.",
      details:
        "What we do strictly control and optimize with mathematical precision is:",
      highlights: [
        "High-intent keyword selection and rigorous negative keyword pruning",
        "High-converting, dedicated landing page design and speed",
        "End-to-end call, form, and revenue tracking",
        "Aggressive budget reallocation away from waste and into proven winners",
      ],
      punchline:
        "We would rather show you transparent unit economics and honest tracking than sell you a fake lead guarantee full of loopholes.",
    },
  },
  {
    id: "exclusive-leads",
    question: "“Are the leads exclusive?”",
    category: "Leads & Growth",
    icon: Lock,
    answer: {
      summary:
        "Yes, 100% exclusive. We do not operate like Angie's List, HomeAdvisor, or Thumbtack.",
      details:
        "When a prospective homeowner clicks your ad, they land exclusively on your branded landing page and call or submit an inquiry directly to your office. These are private inbound inquiries generated specifically for your business—never shared, resold, or distributed to competitors.",
      punchline:
        "Your ads. Your landing page. Your exclusive client relationships.",
    },
  },
  {
    id: "account-ownership",
    question: "“Do I own the Google Ads account?”",
    category: "Trust & Process",
    icon: CheckCircle2,
    answer: {
      summary:
        "Yes, always. You own 100% of your Google Ads account, campaign data, conversion history, and billing setup.",
      details:
        "We manage your campaigns using partner access. If you ever decide to stop working with us, your account, historical data, keyword learnings, and campaign architecture remain entirely yours.",
      punchline:
        "We don't believe in holding clients hostage by locking away their marketing infrastructure.",
    },
  },
  {
    id: "new-website",
    question: "“Do I need a new website?”",
    category: "Trust & Process",
    icon: LayoutTemplate,
    answer: {
      summary:
        "Not necessarily. If your current website is fast, modern, and built to convert paid traffic, we will use it.",
      details:
        "If your existing site is generic or leaking conversions, we build dedicated, high-converting standalone landing pages tailored specifically to each service campaign. This keeps ad traffic focused on booking estimates without distraction.",
      punchline:
        "We don't rebuild things just to create extra work—we only implement what generates the highest conversion rate.",
    },
  },
  {
    id: "only-contractors",
    question: "“Do you only work with contractors?”",
    category: "Leads & Growth",
    icon: Users,
    answer: {
      summary:
        "Contractors and high-ticket local service businesses are our primary focus and where our deepest experience sits.",
      details:
        "The economics in these industries are exceptionally strong: roofing, kitchen & bath remodeling, concrete, outdoor living, waterproofing, landscaping, and custom home improvements.",
      punchline:
        "Just one or two additional signed projects per month can easily pay for months of marketing while adding substantial bottom-line profit.",
    },
  },
  {
    id: "can-you-do-seo",
    question: "“Can you also do SEO?”",
    category: "Strategy & Budget",
    icon: Search,
    answer: {
      summary:
        "Yes. While Google Ads is our primary client acquisition engine, we provide comprehensive SEO for businesses looking to build lasting organic search equity.",
      details:
        "For example, we scaled Casey Insurance Group past 1,000+ monthly organic visitors and 200+ total inbound leads through structured search positioning and content authority.",
      punchline:
        "We never push SEO into every engagement unless it aligns with your timeline, budget, and long-term expansion goals.",
    },
  },
  {
    id: "why-trust-you",
    question: "“Why should I trust you?”",
    category: "Trust & Process",
    icon: Award,
    answer: {
      summary:
        "You shouldn't trust us simply because of what is written on this website. Look at the verifiable evidence:",
      highlights: [
        "Uncut client video testimonials with verified revenue outcomes ($110K, $90K, $180K+ in 90 days)",
        "Verified live Google Search Console & Ads campaign dashboard screenshots",
        "Official Google Search Partner certification and Hostinger partnership",
        "In-depth client case studies detailing exact before-and-after results",
      ],
      punchline:
        "Schedule a short analysis call. Ask us the hardest questions about your market. Let us audit your opportunity, and make your decision based on clear, transparent data.",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("failed-before");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Strategy & Budget",
    "Leads & Growth",
    "Trust & Process",
  ];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqList
      : faqList.filter((item) => item.category === selectedCategory);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F5F8FE] via-[#EDF3FC] to-[#F1F6FE] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* ── Background subtle dot grid & ambient glows ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #B8CEF5 1.1px, transparent 1.1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 20%, black 0%, transparent 80%)",
          opacity: 0.6,
        }}
      />
      <div className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-blue-400/12 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-300/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {/* ════════════════════════════════════════════════════════════
            HEADER SECTION (MATCHES REFERENCE IMAGE)
        ════════════════════════════════════════════════════════════ */}
        <div className="relative mb-12 sm:mb-16">
          {/* Left Floating Graphic: Chat bubbles with question mark */}
          <div className="absolute left-2 lg:left-8 -top-2 hidden md:block">
            <Reveal delay={0.1} direction="left">
              <QuestionGraphic />
            </Reveal>
          </div>

          {/* Right Floating Graphic: Sketched downward looped arrow */}
          <div className="absolute right-4 lg:right-10 -top-1 hidden md:block select-none pointer-events-none">
            <Reveal delay={0.15} direction="right">
              <LoopedArrow className="w-16 h-22 lg:w-20 lg:h-28 text-[#0062FF] drop-shadow-[0_2px_8px_rgba(0,98,255,0.22)]" />
            </Reveal>
          </div>

          {/* Center Main Heading & Subtitle */}
          <Reveal className="text-center max-w-2xl mx-auto">
            <FAQEyebrow />

            <h2 className="text-[34px] sm:text-[44px] lg:text-[52px] font-black tracking-tight text-[#0B1220] leading-[1.08]">
              Straight Answers.
            </h2>

            <div className="relative inline-block mt-0.5 sm:mt-1">
              <p className="text-[34px] sm:text-[44px] lg:text-[52px] font-black tracking-tight text-[#0062FF] leading-[1.08]">
                No Fluff.
              </p>
              <CurvedUnderline className="absolute -bottom-2 left-0 w-full h-[14px] text-[#0062FF] opacity-85" />
            </div>

            <p className="text-[15px] sm:text-[16.5px] text-slate-600 font-medium leading-relaxed mt-4 sm:mt-5 max-w-[560px] mx-auto">
              The questions we get asked the most by contractors about Google
              Ads, leads and working together.
            </p>
          </Reveal>
        </div>

        {/* ════════════════════════════════════════════════════════════
            CATEGORY FILTER PILLS (DESKTOP & MOBILE SCROLLABLE)
        ════════════════════════════════════════════════════════════ */}
        <Reveal delay={0.1} className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_2px_12px_rgba(0,102,255,0.06)] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[12.5px] sm:text-[13.5px] font-bold tracking-tight transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ════════════════════════════════════════════════════════════
            ACCORDION LIST
        ════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-3.5 sm:gap-4 max-w-[920px] mx-auto">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <Reveal
                key={faq.id}
                delay={0.03 * (index % 6)}
                direction="up"
                className="w-full"
              >
                <div
                  className={`group rounded-2xl sm:rounded-[22px] transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-blue-200/90 shadow-[0_12px_32px_-8px_rgba(0,102,255,0.12),0_2px_8px_rgba(15,23,42,0.04)] ring-2 ring-blue-500/10"
                      : "bg-white/85 hover:bg-white border-slate-200/70 hover:border-blue-200/70 shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.06)]"
                  }`}
                >
                  {/* Question Button Header */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      {/* Category Icon Badge */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isOpen
                            ? "bg-blue-50 text-[#0062FF] border border-blue-100 shadow-xs"
                            : "bg-slate-50 group-hover:bg-blue-50 text-slate-500 group-hover:text-[#0062FF] border border-slate-100"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      {/* Question Text */}
                      <h3
                        className={`text-[15.5px] sm:text-[17.5px] lg:text-[18.5px] font-bold tracking-tight leading-snug transition-colors duration-200 ${
                          isOpen
                            ? "text-[#0052EA]"
                            : "text-[#0B1220] group-hover:text-blue-600"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* Chevron Indicator */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-blue-50 text-[#0062FF]"
                          : "bg-slate-100/70 group-hover:bg-blue-50 text-slate-400 group-hover:text-[#0062FF]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Accordion Content Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-slate-100/80">
                          {/* Main Summary */}
                          <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 leading-relaxed font-medium">
                            {faq.answer.summary}
                          </p>

                          {/* Optional Details Paragraph */}
                          {faq.answer.details && (
                            <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed mt-3">
                              {faq.answer.details}
                            </p>
                          )}

                          {/* Highlights List if present */}
                          {faq.answer.highlights && (
                            <div className="mt-3.5 sm:mt-4 flex flex-col gap-2 p-3.5 sm:p-4 rounded-xl bg-slate-50/90 border border-slate-100">
                              {faq.answer.highlights.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2.5"
                                >
                                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-[#0062FF]">
                                    <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                                  </div>
                                  <span className="text-[13.5px] sm:text-[14.5px] text-slate-700 leading-snug">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Punchline Callout Box */}
                          {faq.answer.punchline && (
                            <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50/90 via-blue-50/50 to-transparent border-l-3 border-[#0062FF]">
                              <p className="text-[13.5px] sm:text-[14.5px] font-bold text-[#0052EA] leading-relaxed">
                                {faq.answer.punchline}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════
            BOTTOM CTA CARD FOR ADDITIONAL QUESTIONS
        ════════════════════════════════════════════════════════════ */}
        <Reveal delay={0.2} className="mt-14 sm:mt-18 text-center">
          <div className="relative rounded-[28px] bg-white border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_-10px_rgba(0,102,255,0.08),0_2px_8px_rgba(15,23,42,0.04)] max-w-[820px] mx-auto overflow-hidden">
            {/* Top specularity highlight */}
            <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-300/60 to-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-[0_8px_20px_-4px_rgba(0,102,255,0.4)]">
                  <MessageCircleQuestion className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="text-[18px] sm:text-[20px] font-black text-slate-900 tracking-tight leading-snug">
                    Have a question specific to your market?
                  </h4>
                  <p className="text-[13.5px] sm:text-[14.5px] text-slate-500 mt-1 leading-relaxed">
                    Let us run a free competitive search audit and show you the exact numbers.
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="cursor-pointer relative overflow-hidden group flex items-center justify-center px-6 py-3 rounded-full font-bold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] shrink-0 gap-2 text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book Free Analysis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
