"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X, Plus, Minus } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "SEO", href: "/services/seo" },
      // { name: "Meta Ads", href: "/services/meta-ads" },
      { name: "Google Ads", href: "/services/google-ads" },
      // { name: "AI Automation", href: "/services/ai-automation" },
      // { name: "Cold Email Marketing", href: "/services/cold-email" },
    ],
  },

  { name: "Contact Us", href: "/contact" },
  { name: "Case Studies", href: "/case-studies" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileDropdown = (name: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === name ? null : name);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`font-sans fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={` flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled || isMobileMenuOpen
                ? "bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-slate-200/60 px-4 py-2"
                : "bg-transparent px-2 border border-transparent"
            }`}
          >
            {/* Logo Section */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="shrink-0 relative group z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 relative flex items-center justify-center w-[160px] md:w-[190px] h-[44px] md:h-[50px] rounded-full bg-linear-to-b from-[#2563EB] to-[#1E3A8A] shadow-[0_4px_20px_rgba(37,99,235,0.4)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(37,99,235,0.6)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Inner highlight for 3D effect */}
                  <div className="absolute inset-0 rounded-full border-t border-white/30" />
                  <img
                    src="/navlogo.png"
                    alt="Ikhtiyaar Logo"
                    className="object-contain p-2"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center justify-center gap-1 px-6 py-2 md:py-2.5 rounded-full bg-white/40 backdrop-blur-lg border border-slate-200/65 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.dropdown ? (
                      <div className="flex items-center space-x-1 px-4 py-2 rounded-full text-[15px] font-medium text-slate-600 hover:text-blue-600 transition-colors duration-300 relative group cursor-pointer">
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 text-slate-400 group-hover:text-blue-600 ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                        {/* Hover highlight line */}
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 opacity-0 group-hover:w-1/2 group-hover:opacity-100" />
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="flex items-center space-x-1 px-4 py-2 rounded-full text-[15px] font-medium text-slate-600 hover:text-blue-600 transition-colors duration-300 relative group"
                      >
                        <span>{link.name}</span>
                        {/* Hover highlight line */}
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 opacity-0 group-hover:w-1/2 group-hover:opacity-100" />
                      </Link>
                    )}
                  </motion.div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 12,
                          scale: 0.96,
                          filter: "blur(4px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                          scale: 0.96,
                          filter: "blur(4px)",
                        }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-white/80 backdrop-blur-2xl border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden"
                      >
                        <div className="py-2 flex flex-col">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-5 py-3 text-[15px] font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50/80 transition-colors duration-200 relative group"
                            >
                              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 inline-block">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex flex-1 justify-end">
              <Link href={`/contact`}>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: 20,
                    filter: "blur(8px)",
                  }}
                  animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="shrink-0 cursor-pointer"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer relative overflow-hidden group flex items-center justify-center px-6 py-2.5 rounded-full font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-blue-500 shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)]"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center gap-2 text-sm lg:text-base">
                      Free Analysis
                    </span>
                  </motion.button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <div className="flex md:hidden items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-white/50 border border-slate-200 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-slate-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-slate-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[80] bg-white/40 backdrop-blur-md md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[90] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.1)] md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-28 pb-10 px-6">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <div
                      key={link.name}
                      className="flex flex-col border-b border-slate-50 last:border-0 py-2"
                    >
                      <div className="flex items-center justify-between">
                        {link.dropdown ? (
                          <button
                            onClick={() => toggleMobileDropdown(link.name)}
                            className="text-xl font-semibold text-slate-800 py-3 flex-1 text-left flex items-center justify-between group"
                          >
                            <span>{link.name}</span>
                            <div className="p-3 text-slate-400">
                              {mobileActiveDropdown === link.name ? (
                                <Minus className="w-5 h-5" />
                              ) : (
                                <Plus className="w-5 h-5" />
                              )}
                            </div>
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-xl font-semibold text-slate-800 py-3 flex-1"
                          >
                            {link.name}
                          </Link>
                        )}
                      </div>

                      <AnimatePresence>
                        {link.dropdown &&
                          mobileActiveDropdown === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-slate-50/50 rounded-2xl"
                            >
                              <div className="flex flex-col py-2 px-4 space-y-1">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-3 px-3 text-slate-600 font-medium flex items-center justify-between group"
                                  >
                                    <span>{item.name}</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-10">
                  <Link href={`/`} onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3"
                    >
                      Free Analysis
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>

                  <div className="mt-8 text-center text-slate-400 text-sm">
                    <p>© 2026 Ikhtiyaar. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
