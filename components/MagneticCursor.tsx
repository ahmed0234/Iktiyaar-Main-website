"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Spring configs ────────────────────────────────────────────────────────────
const RING_SPRING = { damping: 28, stiffness: 280, mass: 0.5 };
const DOT_SPRING  = { damping: 20, stiffness: 400, mass: 0.3 };

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  decay: number;
  size: number;
  hue: number;
}

interface TrailNode {
  x: number; y: number;
  life: number;
}

// ─── Canvas hook — all rendering in RAF, zero React state ─────────────────────
function useCursorCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const particles: Particle[] = [];
    const trail: TrailNode[]    = [];
    let raf = 0;

    // Resize
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse → always spawn trail nodes + particles
    let prevX = -999, prevY = -999;
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Trail node — added unconditionally every event
      trail.push({ x, y, life: 1 });
      if (trail.length > 90) trail.shift();

      // Particles — minimum 2 guaranteed, more when moving fast
      const dx    = x - prevX;
      const dy    = y - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(2 + Math.floor(speed * 0.3), 7);

      for (let i = 0; i < count; i++) {
        particles.push({
          x:     x + (Math.random() - 0.5) * 6,
          y:     y + (Math.random() - 0.5) * 6,
          vx:    (Math.random() - 0.5) * 1.2 - dx * 0.04,
          vy:    (Math.random() - 0.5) * 1.2 - dy * 0.04,
          life:  1,
          decay: 0.016 + Math.random() * 0.018,
          size:  1.8 + Math.random() * 2.8,
          hue:   205 + Math.random() * 35,
        });
      }

      prevX = x; prevY = y;
    };
    window.addEventListener("mousemove", onMove);

    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Trail ribbon ─────────────────────────────────────────────────────────
      // Decay each node per frame so the ribbon fades even when mouse is still
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.03;
        if (trail[i].life <= 0) trail.splice(i, 1);
      }

      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1];
          const b = trail[i];
          const alpha = Math.min(a.life, b.life);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle   = `rgba(96,165,250,${alpha * 0.75})`;
          ctx.lineWidth     = alpha * 3.5;
          ctx.lineCap       = "round";
          ctx.shadowColor   = `rgba(96,165,250,${alpha * 0.5})`;
          ctx.shadowBlur    = 10;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // ── Particles ────────────────────────────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x    += p.vx;
        p.y    += p.vy;
        p.vx   *= 0.95;
        p.vy   *= 0.95;
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const a = p.life;
        const r = p.size * a;

        // Outer glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
        grd.addColorStop(0,   `hsla(${p.hue},90%,60%,${a * 0.65})`);
        grd.addColorStop(0.5, `hsla(${p.hue},90%,52%,${a * 0.25})`);
        grd.addColorStop(1,   `hsla(${p.hue},90%,50%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${a * 0.85})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MagneticCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState({
    isHovering: false,
    isClicking: false,
    isVisible:  false,
  });

  const ringX   = useMotionValue(0);
  const ringY   = useMotionValue(0);
  const springX = useSpring(ringX, RING_SPRING);
  const springY = useSpring(ringY, RING_SPRING);

  const dotX       = useMotionValue(0);
  const dotY       = useMotionValue(0);
  const springDotX = useSpring(dotX, DOT_SPRING);
  const springDotY = useSpring(dotY, DOT_SPRING);

  useCursorCanvas(canvasRef);

  useEffect(() => {
    let visible = false;

    const onMove = (e: MouseEvent) => {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (!visible) {
        visible = true;
        setState(s => ({ ...s, isVisible: true }));
      }

      const target = e.target as HTMLElement;
      const isPointer =
        target.tagName === "A"      ||
        target.tagName === "BUTTON" ||
        !!target.closest("a")       ||
        !!target.closest("button")  ||
        target.getAttribute("role") === "button" ||
        getComputedStyle(target).cursor === "pointer";

      setState(s => ({ ...s, isHovering: isPointer }));
    };

    const onDown  = () => setState(s => ({ ...s, isClicking: true  }));
    const onUp    = () => setState(s => ({ ...s, isClicking: false }));
    const onLeave = () => { visible = false; setState(s => ({ ...s, isVisible: false })); };
    const onEnter = () => { visible = true;  setState(s => ({ ...s, isVisible: true  })); };

    window.addEventListener("mousemove",    onMove);
    window.addEventListener("mousedown",    onDown);
    window.addEventListener("mouseup",      onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.style.cursor = "";
    };
  }, [ringX, ringY, dotX, dotY]);

  const ringSize = state.isHovering ? 48 : state.isClicking ? 18 : 32;
  const opacity  = state.isVisible  ? 1  : 0;

  return (
    <>
      {/* Canvas: trail ribbon + particles */}
      <canvas
        ref={canvasRef}
        style={{
          position:      "fixed",
          inset:         0,
          pointerEvents: "none",
          zIndex:        9996,
        }}
      />

      {/* Spring-lagged ring */}
      <motion.div
        style={{
          position:      "fixed",
          left:          springX,
          top:           springY,
          x:             "-50%",
          y:             "-50%",
          borderRadius:  "50%",
          border:        "1.5px solid rgba(99,179,237,0.75)",
          pointerEvents: "none",
          zIndex:        9998,
          mixBlendMode:  "screen",
          backdropFilter:"blur(0.5px)",
        }}
        animate={{
          width:  ringSize,
          height: ringSize,
          opacity,
          borderColor:
            state.isClicking ? "rgba(190,227,248,0.95)"
            : state.isHovering ? "rgba(144,205,244,0.85)"
            : "rgba(99,179,237,0.75)",
          boxShadow:
            state.isHovering
              ? "0 0 22px 5px rgba(66,153,225,0.55), inset 0 0 10px rgba(99,179,237,0.12)"
              : "0 0 10px 2px rgba(66,153,225,0.3)",
        }}
        transition={{ duration: 0.18 }}
      >
        <motion.div
          style={{
            position:     "absolute",
            inset:        3,
            borderRadius: "50%",
            border:       "0.5px solid rgba(190,227,248,0.18)",
            background:   state.isHovering
              ? "radial-gradient(circle, rgba(99,179,237,0.07) 0%, transparent 70%)"
              : "transparent",
          }}
          animate={{ rotate: state.isHovering ? 360 : 0 }}
          transition={
            state.isHovering
              ? { repeat: Infinity, duration: 3, ease: "linear" }
              : { duration: 0.3 }
          }
        />
      </motion.div>

      {/* Core dot */}
      <motion.div
        style={{
          position:      "fixed",
          left:          springDotX,
          top:           springDotY,
          x:             "-50%",
          y:             "-50%",
          pointerEvents: "none",
          zIndex:        9999,
          mixBlendMode:  "screen",
        }}
        animate={{ opacity }}
      >
        <motion.div
          style={{
            position:     "absolute",
            inset:        -8,
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(99,179,237,0.32) 0%, rgba(49,130,206,0.08) 55%, transparent 100%)",
            filter:       "blur(4px)",
          }}
          animate={{ scale: state.isClicking ? 0.45 : state.isHovering ? 1.7 : 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.div
          style={{
            width:        6,
            height:       6,
            borderRadius: "50%",
            background:   "rgba(190,227,248,1)",
            boxShadow:    "0 0 6px 2px rgba(99,179,237,0.9), 0 0 14px 4px rgba(49,130,206,0.55)",
          }}
          animate={{ scale: state.isClicking ? 0.35 : state.isHovering ? 0 : 1 }}
          transition={{ duration: 0.14 }}
        />
      </motion.div>
    </>
  );
}