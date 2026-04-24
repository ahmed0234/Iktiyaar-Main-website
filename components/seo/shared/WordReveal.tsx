"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WordReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-[0.3em]">
          <motion.span
            initial={{ y: "110%", rotateX: -60 }}
            animate={
              isInView
                ? { y: "0%", rotateX: 0 }
                : { y: "110%", rotateX: -60 }
            }
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block will-change-transform"
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
