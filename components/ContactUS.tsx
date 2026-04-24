"use client";

import ContactForm from "./ContactForm";
import {
  Mail, Phone, MapPin, Clock,
  ArrowRight, Layers
} from "lucide-react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaLinkedin as Linkedin, FaXTwitter as Twitter } from "react-icons/fa6"

/* ── Contact info item ───────────────────────────────────── */
function ContactItem({ icon: IconComp, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-4 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-md group-hover:shadow-blue-200 transition-all duration-300">
        <IconComp size={17} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{label}</span>
        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
          {value}
        </span>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}

/* ── Social button ───────────────────────────────────────── */
function SocialBtn({ icon: IconComp, label, href = "#" }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200"
    >
      <IconComp size={15} />
    </a>
  );
}

/* ── Stat block ──────────────────────────────────────────── */
function Stat({ value, label }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</span>
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}

/* ── Trust pill ──────────────────────────────────────────── */
function TrustPill({ text }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
      {text}
    </span>
  );
}

/* ── ContactUS ───────────────────────────────────────────── */
export default function ContactUS() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Subtle background texture — soft radial blobs, no animation */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Top-left blob */}
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-blue-100/40 blur-3xl" />
        {/* Bottom-right blob */}
        <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full bg-sky-100/50 blur-3xl" />
        {/* Center hint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-blue-50/30 blur-3xl" />
      </div>

      {/* Top accent line */}
      <div className=" relative z-10 h-[3px] w-full bg-gradient-to-r from-blue-700 via-blue-400 to-transparent" />


      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-32 lg:py-24 lg:pt-44">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-10">

            {/* Eyebrow + heading + description */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">
                  Get in touch
                </span>
              </div>

              <h1 className="text-4xl sm:text-[3.2rem] font-extrabold text-slate-900 leading-[1.06] tracking-tight">
                Let's talk about<br />
                <span className="text-blue-600">your growth.</span>
              </h1>

              <p className="text-base text-slate-500 leading-relaxed max-w-[400px]">
                Tell us about your business and we'll show you how to cut costs,
                increase revenue, and build systems that scale.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 py-6 border-y border-slate-100">
              <Stat value="500+" label="Clients served" />
              <div className="w-px h-10 bg-slate-200" />
              <Stat value="98%" label="Satisfaction rate" />
              <div className="w-px h-10 bg-slate-200" />
              <Stat value="24h" label="Response time" />
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              <ContactItem icon={Mail}    label="Email us"       value="support@ikhtiyaar.com"           href="mailto:support@ikhtiyaar.com" />
              <ContactItem icon={Phone}   label="Call us"        value="+(251) 385-6294"                 href="tel:+12513856294" />
              <ContactItem icon={MapPin}  label="Visit us"       value="30 N Gould St, Sheridan, WY 82801" />
              <ContactItem icon={Clock}   label="Business hours" value="Mon–Fri, 9 AM – 6 PM (MST)" />
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Follow us
              </span>
              <div className="flex items-center gap-2">
                <SocialBtn icon={Facebook}  label="Facebook" />
                <SocialBtn icon={Instagram} label="Instagram" />
                <SocialBtn icon={Twitter}   label="Twitter / X" />
                <SocialBtn icon={Linkedin}  label="LinkedIn" />
              </div>
            </div>
          </div>

          {/* ── Right column: form card ── */}
          <div id="form" className="w-full">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/60 overflow-hidden">

              {/* Card header */}
              <div className="px-7 sm:px-8 pt-7 sm:pt-8 pb-6 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                      Free Consultation
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      Fill in the form and our team will reach out to discuss your goals.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
                    <Mail size={17} className="text-white" />
                  </div>
                </div>

                {/* Trust pills */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-slate-100">
                  <TrustPill text="Private & secure" />
                  <TrustPill text="Fast response" />
                  <TrustPill text="No commitment" />
                </div>
              </div>

              {/* Form body */}
              <div className="px-7 sm:px-8 py-7 sm:py-8">
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}