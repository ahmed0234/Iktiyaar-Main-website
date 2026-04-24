"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings for performance and responsiveness
    const lenis = new Lenis({
      autoRaf: true, // Internal RAF management is usually more optimized than manual loops
      lerp: 0.1, // Linear interpolation (0.1 provides a good balance of responsiveness and smoothness)
      wheelMultiplier: 1.1, // Slightly increase wheel sensitivity to counter "heavy" feeling
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Optional: Log scrolling for debugging locally if needed
    // lenis.on('scroll', (e) => {
    //   console.log(e)
    // })

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
