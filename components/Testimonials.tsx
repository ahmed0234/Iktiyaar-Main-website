"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { Star, StarHalf, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Testimonial Data ──────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Savannah",
    role: "COO, Just Leadz",
    avatar: "/Clients/7.png",
    rating: 5,
    text: "We were running Google Ads before but not seeing consistent results. After working with Ikhtiyaar, everything became more structured and we started getting regular inbound calls without increasing our budget. It finally feels predictable.",
  },
  {
    name: "Samantha Shakira Clarke",
    role: "Personal Trainer",
    avatar: "/Clients/6.png",
    rating: 5,
    text: "Before this, most of our work came from referrals and word of mouth. Now we're actually showing up on Google and getting calls weekly. It's helped us stay busy even during slower months, which wasn't the case before.",
  },
  {
    name: "Micheal Swisher",
    role: "Owner, Swisher Capital",
    avatar: "/Clients/5.jpeg",
    rating: 5,
    text: "We had tried cold email before with very little success. The approach here was completely different — better targeting and messaging. We're now getting replies from the right people and booking qualified calls regularly.",
  },
  {
    name: "Isiah Mccullum",
    role: "Owner, PristineClean Pros",
    avatar: "/Clients/4.png",
    rating: 4.5,
    text: "Our Meta ads used to get engagement but not many sales. The team reworked our strategy and creatives, and now we're seeing better conversions and more consistent performance across campaigns.",
  },
  {
    name: "Isabeau Miller",
    role: "Owner, Beckon Homes",
    avatar: "/Clients/3.png",
    rating: 5,
    text: "We didn't realize how much opportunity we were missing on search. After the SEO work, we started ranking for important keywords and saw a steady increase in inquiries. It's been a solid long-term investment.",
  },
  {
    name: "Dallin Cottle",
    role: "Owner, Roar Media",
    avatar: "/Clients/2.png",
    rating: 5,
    text: "The biggest change for us wasn't just more leads, but how those leads were handled. The follow-up system made everything smoother, and we're now converting more of the inquiries we get into actual clients.",
  },
];

const CARD_WIDTH = 370;
const CARD_GAP = 28;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const SET_WIDTH = testimonials.length * CARD_STEP;

// ─── Star Rating (pure, no motion) ────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={0} />);
    } else if (i - 0.5 === rating) {
      stars.push(<StarHalf key={i} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={0} />);
    } else {
      stars.push(<Star key={i} className="w-4 h-4 fill-slate-200 text-slate-200" strokeWidth={0} />);
    }
  }
  return <div className="flex gap-0.5">{stars}</div>;
}

// ─── Lightweight Testimonial Card (CSS-only hover, no motion values) ──────────
const TestimonialCard = React.memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div
      className="flex-shrink-0 group/card"
      style={{ width: CARD_WIDTH, marginRight: CARD_GAP }}
    >
      <div
        className="relative h-full rounded-[20px] p-7 overflow-hidden transition-all duration-300 ease-out
          bg-white/80 border border-slate-200/50 shadow-lg shadow-slate-200/20
          group-hover/card:bg-white group-hover/card:border-blue-200/50 group-hover/card:shadow-2xl group-hover/card:shadow-blue-500/10 group-hover/card:-translate-y-3"
      >
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: "0 0 40px 8px rgba(59,130,246,0.08), 0 20px 50px -15px rgba(59,130,246,0.15)" }}
        />

        {/* Quote icon */}
        <div className="mb-5">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 transition-all duration-300 group-hover/card:bg-blue-50 group-hover/card:shadow-md group-hover/card:shadow-blue-500/10">
            <Quote
              className="w-5 h-5 text-slate-300 transition-colors duration-300 group-hover/card:text-blue-500"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Text */}
        <p className="text-[15px] leading-[1.7] text-slate-600 mb-7 italic font-medium">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px w-full mb-5 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent transition-all duration-300 group-hover/card:via-blue-300/40" />

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-200/50 transition-all duration-300 flex-shrink-0 group-hover/card:ring-blue-300/60 group-hover/card:shadow-lg group-hover/card:shadow-blue-500/15">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-900 truncate">{testimonial.name}</h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mt-0.5 truncate">
              {testimonial.role}
            </p>
            <div className="mt-1.5">
              <StarRating rating={testimonial.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Single motion value for the entire track position
  const x = useMotionValue(-SET_WIDTH);
  const smoothX = useSpring(x, { stiffness: 50, damping: 25, mass: 1.2 });

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocityRef = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const autoSpeed = useRef(-0.4);

  // Active dot index
  const [activeIndex, setActiveIndex] = useState(0);

  // Infinite loop wrapper
  const wrapX = useCallback((val: number) => {
    if (val < -SET_WIDTH * 2) return val + SET_WIDTH;
    if (val > 0) return val - SET_WIDTH;
    return val;
  }, []);

  // Track active index
  useEffect(() => {
    const unsubscribe = x.on("change", (val) => {
      const offset = -val - SET_WIDTH;
      const idx = Math.round(offset / CARD_STEP) % testimonials.length;
      setActiveIndex(idx < 0 ? idx + testimonials.length : idx);
    });
    return () => unsubscribe();
  }, [x]);

  // Auto-scroll + momentum (single animation loop)
  useAnimationFrame((_, delta) => {
    if (isDragging.current) return;
    const dt = Math.min(delta, 50);
    const factor = dt / 16.667;

    if (Math.abs(velocityRef.current) > 0.15) {
      x.set(wrapX(x.get() + velocityRef.current * factor));
      velocityRef.current *= 0.965;
    } else {
      velocityRef.current = 0;
      x.set(wrapX(x.get() + autoSpeed.current * factor));
    }
  });

  // Navigation
  const navigateTo = (direction: "left" | "right") => {
    velocityRef.current = direction === "left" ? 18 : -18;
  };

  const navigateToDot = (dotIndex: number) => {
    const currentOffset = -x.get() - SET_WIDTH;
    const currentIdx = Math.round(currentOffset / CARD_STEP) % testimonials.length;
    const normalizedCurrent = currentIdx < 0 ? currentIdx + testimonials.length : currentIdx;
    let diff = dotIndex - normalizedCurrent;
    if (diff > testimonials.length / 2) diff -= testimonials.length;
    if (diff < -testimonials.length / 2) diff += testimonials.length;
    velocityRef.current = -diff * 8;
  };

  // ─── Drag handlers ─────────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    velocityRef.current = 0;
    dragStartX.current = e.clientX;
    dragStartOffset.current = x.get();
    lastDragX.current = e.clientX;
    lastDragTime.current = performance.now();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    const now = performance.now();
    const dt = now - lastDragTime.current;
    if (dt > 0) {
      velocityRef.current = ((e.clientX - lastDragX.current) / dt) * 16;
    }
    lastDragX.current = e.clientX;
    lastDragTime.current = now;
    x.set(wrapX(dragStartOffset.current + dx));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Triple the cards for seamless looping
  const loopedCards = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-blue-100/20 blur-[120px]" />
      </div>

      {/* ─── Section Heading ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Stars row */}
          <div className="flex justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Star className="w-6 h-6 fill-orange-400 text-orange-400" strokeWidth={0} />
              </motion.div>
            ))}
          </div>

          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            Real Businesses. Real
            <br />
            Growth.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Real Results.
            </span>
          </h2>
          <p className="mt-4 text-base text-blue-500 font-semibold tracking-wide">
            With our services
          </p>
        </motion.div>
      </div>

      {/* ─── Carousel (single motion.div, CSS-only cards) ────────────── */}
      <div className="relative w-full">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="cursor-grab active:cursor-grabbing select-none overflow-visible"
        >
          <motion.div
            style={{ x: smoothX }}
            className="flex items-stretch py-6 px-8"
          >
            {loopedCards.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
      </div>

      {/* ─── Navigation Controls ──────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-6 mt-6 relative z-10">
        {/* Left arrow */}
        <motion.button
          onClick={() => navigateTo("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg shadow-slate-200/30 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-200 hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateToDot(i)}
              className={`transition-all duration-400 rounded-full cursor-pointer ${
                activeIndex === i
                  ? "w-8 h-2.5 bg-gradient-to-r from-blue-500 to-blue-400 shadow-md shadow-blue-500/25"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>

        {/* Right arrow */}
        <motion.button
          onClick={() => navigateTo("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg shadow-slate-200/30 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-200 hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      </div>
    </section>
  );
}
