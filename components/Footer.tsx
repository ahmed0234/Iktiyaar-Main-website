"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

/* ─── Footer Link Data ─────────────────────────────────────────────────────── */
const footerLinks = {
  services: {
    title: "Services",
    links: [
      { label: "Search Engine Optimization", href: "/services/seo" },
      { label: "Meta Ads", href: "/services/meta-ads" },
      { label: "Google Ads", href: "/services/google-ads" },
      { label: "Cold Email Marketing", href: "/services/cold-email" },
      { label: "AI Automation", href: "/services/ai-automation" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Contact Us", href: "/contact" },
    ],
  },
};

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "https://x.com",
    label: "X",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.784 23.559a.75.75 0 00.917.918l4.525-1.5A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.31-.726-5.993-1.957l-.42-.31-2.689.892.892-2.689-.31-.42A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    href: "https://wa.me",
    label: "WhatsApp",
  },
  {
    icon: Mail,
    href: "mailto:support@ikhtiyaar.com",
    label: "Email",
  },
];

const contactInfo = [
  {
    icon: Phone,
    label: "(251) 385-6294",
    href: "tel:+12513856294",
  },
  {
    icon: Mail,
    label: "support@ikhtiyaar.com",
    href: "mailto:support@ikhtiyaar.com",
  },
  {
    icon: MapPin,
    label: "30 N Gould St Ste R, Sheridan, Wyoming, 82801",
    href: "#",
  },
];

/* ─── Animated Link Component ──────────────────────────────────────────────── */
function FooterLink({
  href,
  children,
  delay = 0,
  isInView,
}: {
  href: string;
  children: React.ReactNode;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        className="group flex items-center gap-2 text-[14px] text-slate-600 hover:text-blue-600 transition-colors duration-300 py-1.5"
      >
        <span className="relative">
          {children}
          <span className="absolute left-0 -bottom-px w-0 h-px bg-blue-600 group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-blue-500" />
      </Link>
    </motion.div>
  );
}

/* ─── Main Footer ──────────────────────────────────────────────────────────── */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.15 });

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-24 bg-[#fafbff]"
    >
      {/* ── Suble Dotted Grid Pattern ────────────────────────────────────── */}
      <div 
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* ── Atmospheric Effects Layer ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[5%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px]"
        />
      </div>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <div className="relative z-10">
        {/* Top Glass Panel */}
        <div className="mx-4 sm:mx-6 lg:mx-8">
          <div className="max-w-7xl mx-auto">
            {/* Minimal Card Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              <div className="px-8 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                  {/* Column 1: Brand */}
                  <div className="lg:col-span-4 space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="relative group inline-block"
                    >
                      {/* Ethereal background glow effect */}
                      <div className="absolute -inset-8 bg-blue-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
                      
                      <Link href="/" className="relative block">
                        <motion.div
                          whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                          className="relative flex items-center justify-center w-[170px] md:w-[200px] h-[48px] md:h-[54px] rounded-full bg-linear-to-tr from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] shadow-[0_8px_30px_rgba(37,99,235,0.4)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_15px_45px_rgba(37,99,235,0.6)]"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Aurora Glow Effect */}
                          <motion.div
                            animate={{
                              x: ["-20%", "20%"],
                              opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
                          />

                          {/* Depth Ring */}
                          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]" />
                          
                          {/* Moving Energy Spot */}
                          <motion.div
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute -top-1/2 -left-1/4 w-32 h-32 bg-white rounded-full blur-[40px] pointer-events-none"
                          />

                          <Image
                            src="/navlogo.png"
                            alt="Ikhtiyaar Logo"
                            fill
                            className="object-contain p-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                            priority
                          />
                        </motion.div>
                      </Link>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-sm text-slate-500 leading-relaxed max-w-xs font-medium"
                    >
                      We help businesses reduce costs, generate consistent
                      leads, and build teams that actually perform.
                    </motion.p>

                    {/* Social Icons */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      {socialLinks.map((social, idx) => {
                        const Icon = social.icon;
                        return (
                          <motion.a
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            whileHover={{ scale: 1.1, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="group w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/60 flex items-center justify-center text-slate-400 transition-all duration-500 hover:border-blue-500/50 hover:text-blue-600 hover:shadow-[0_8px_20px_rgba(37,99,235,0.15)]"
                          >
                            <Icon size={18} />
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* Column 2: Services */}
                  <div className="lg:col-span-3">
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-6"
                    >
                      {footerLinks.services.title}
                    </motion.h4>
                    <div className="space-y-1">
                      {footerLinks.services.links.map((link, idx) => (
                        <FooterLink
                          key={idx}
                          href={link.href}
                          delay={0.35 + idx * 0.06}
                          isInView={isInView}
                        >
                          {link.label}
                        </FooterLink>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Company */}
                  <div className="lg:col-span-2">
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-6"
                    >
                      {footerLinks.company.title}
                    </motion.h4>
                    <div className="space-y-1">
                      {footerLinks.company.links.map((link, idx) => (
                        <FooterLink
                          key={idx}
                          href={link.href}
                          delay={0.45 + idx * 0.06}
                          isInView={isInView}
                        >
                          {link.label}
                        </FooterLink>
                      ))}
                    </div>
                  </div>

                  {/* Column 4: Contact */}
                  <div className="lg:col-span-3">
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-6"
                    >
                      Contact Us
                    </motion.h4>
                    <div className="space-y-4">
                      {contactInfo.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <motion.a
                            key={idx}
                            href={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.5,
                              delay: 0.55 + idx * 0.08,
                            }}
                            className="group flex items-start gap-4 text-sm text-slate-500 hover:text-blue-600 transition-colors duration-300"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-500">
                              <Icon size={18} />
                            </div>
                            <span className="leading-relaxed font-semibold pt-1">
                              {item.label}
                            </span>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200/60 mt-4"
          >
            <p className="text-xs text-slate-400 font-bold text-center sm:text-left tracking-wide uppercase">
              © {new Date().getFullYear()} IKHTIYAAR. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8">
              {["Privacy Policy", "Terms of Service"].map((item, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors duration-300 font-black"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
