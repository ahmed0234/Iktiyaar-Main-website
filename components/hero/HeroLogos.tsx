import React from "react";

export function GoogleGLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12c0 2.02.45 3.84 1.24 5.42l4.04-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleAdsLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.4 34.2L20.2 12c1.7-3 5.6-4 8.6-2.3 3 1.7 4 5.6 2.3 8.6L18.3 40.5c-1.7 3-5.6 4-8.6 2.3-3-1.7-4-5.6-2.3-8.6z"
        fill="#FBBC04"
      />
      <path
        d="M40.6 34.2l-12.8-22.2c-1.7-3-5.6-4-8.6-2.3-3 1.7-4 5.6-2.3 8.6l12.8 22.2c1.7 3 5.6 4 8.6 2.3 3-1.7 4-5.6 2.3-8.6z"
        fill="#4285F4"
      />
      <circle cx="9.6" cy="38.4" r="5.6" fill="#34A853" />
    </svg>
  );
}

export function HostingerLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#673DE6" fillOpacity="0.1" />
      <path
        d="M9 7.5L14 10.5V21.5L9 18.5V7.5Z"
        fill="#673DE6"
      />
      <path
        d="M23 10.5L18 7.5V18.5L23 21.5V10.5Z"
        fill="#8C68F2"
      />
      <path
        d="M14 13.5L18 16V24.5L14 22V13.5Z"
        fill="#5120D1"
      />
    </svg>
  );
}

export function CurvedUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 320 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 13.5C65 4.5 160 3.5 317 11.5"
        stroke="#0066FF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M18 15.5C85 8 190 7 305 14"
        stroke="#0066FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

export function GoogleMicIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#4285F4" />
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#34A853" />
      <path d="M12 18.5c-.86 0-1.67-.22-2.39-.6l-1.46 1.46C9.28 20.08 10.58 20.5 12 20.5s2.72-.42 3.85-1.14l-1.46-1.46c-.72.38-1.53.6-2.39.6z" fill="#FBBC05" />
      <path d="M7 11H5c0 1.93.78 3.68 2.05 4.95l1.41-1.41C7.57 13.65 7 12.39 7 11z" fill="#EA4335" />
    </svg>
  );
}
