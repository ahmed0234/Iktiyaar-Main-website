import React from "react";

export function Hero3DBars({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-end gap-2 ${className}`}>
      {/* Bar 1 */}
      <div className="relative w-5 h-10 group">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-sm shadow-md" />
        <div className="absolute -top-1 left-0 right-0 h-2 bg-blue-300 rounded-t-sm transform -skew-x-12 opacity-80" />
        <div className="absolute inset-y-0 right-0 w-1 bg-blue-700 rounded-tr-sm opacity-50" />
      </div>

      {/* Bar 2 */}
      <div className="relative w-5 h-16 group">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-sm shadow-md" />
        <div className="absolute -top-1 left-0 right-0 h-2 bg-blue-300 rounded-t-sm transform -skew-x-12 opacity-80" />
        <div className="absolute inset-y-0 right-0 w-1 bg-blue-700 rounded-tr-sm opacity-50" />
      </div>

      {/* Bar 3 */}
      <div className="relative w-5 h-22 group">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-sm shadow-md" />
        <div className="absolute -top-1 left-0 right-0 h-2 bg-blue-300 rounded-t-sm transform -skew-x-12 opacity-80" />
        <div className="absolute inset-y-0 right-0 w-1 bg-blue-700 rounded-tr-sm opacity-50" />
      </div>

      {/* Bar 4 */}
      <div className="relative w-5 h-14 group">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-sm shadow-md" />
        <div className="absolute -top-1 left-0 right-0 h-2 bg-blue-300 rounded-t-sm transform -skew-x-12 opacity-80" />
        <div className="absolute inset-y-0 right-0 w-1 bg-blue-700 rounded-tr-sm opacity-50" />
      </div>

      {/* Bar 5 (Tallest highlight) */}
      <div className="relative w-6 h-28 group">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 rounded-t-sm shadow-lg shadow-blue-500/30" />
        <div className="absolute -top-1.5 left-0 right-0 h-2.5 bg-sky-200 rounded-t-sm transform -skew-x-12 opacity-90" />
        <div className="absolute inset-y-0 right-0 w-1.5 bg-blue-800 rounded-tr-sm opacity-60" />
      </div>
    </div>
  );
}

export function HeroSwoopArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="swoopGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#0066FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Curved thick arrow shaft */}
      <path
        d="M20 110C20 60 40 25 82 12"
        stroke="url(#swoopGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Arrowhead */}
      <path
        d="M62 8L88 10L82 36L72 20L62 8Z"
        fill="#0066FF"
      />
    </svg>
  );
}

export function DotGrid({ className = "", rows = 10, cols = 8 }: { className?: string; rows?: number; cols?: number }) {
  return (
    <div className={`grid gap-3.5 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-blue-400/25" />
      ))}
    </div>
  );
}
