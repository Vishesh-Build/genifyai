"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Caption AI", href: "/tools/caption" },
  { label: "Resume", href: "/tools/resume" },
  { label: "Personality", href: "/tools/personality" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav
        className={`max-w-6xl mx-auto rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass shadow-glow-sm" : "bg-transparent border border-transparent"
        }`}
        style={{ backdropFilter: scrolled ? "blur(24px)" : "none" }}
      >
        <Link href="/" className="flex items-center gap-2 group">
         <img 
  src="/GenifyAi.png" 
  alt="GenifyAI Logo" 
  width={36} 
  height={36} 
  className="rounded-lg"
/>
          <span className="font-display font-bold text-white text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Genify<span className="gradient-text">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-violet-400 bg-violet-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >{link.label}</Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/tools" className="btn-glow px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
            Try Free →
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors">
          <span className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-slate-300 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto mt-2 glass rounded-2xl p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-violet-400 bg-violet-500/10" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}>{link.label}</Link>
            ))}
            <div className="border-t border-violet-500/10 mt-2 pt-3">
              <Link href="/tools" onClick={() => setMobileOpen(false)}
                className="btn-glow w-full block text-center px-5 py-3 rounded-xl text-sm font-semibold text-white">
                Try Free →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
