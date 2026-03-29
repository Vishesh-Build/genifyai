"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AdSlot } from "@/components/ui/AdSlot";

const tools = [
  {
    icon: "✦",
    label: "Caption AI",
    title: "AI Caption Generator",
    desc: "Generate 5 viral captions instantly. Input your topic & mood — get scroll-stopping text.",
    href: "/tools/caption",
    badge: "Most Popular",
    accent: "#8b5cf6",
    tags: ["Instagram", "Twitter", "LinkedIn"],
  },
  {
    icon: "◈",
    label: "Resume",
    title: "Resume Generator",
    desc: "Craft a professional resume in 60 seconds. Fill a simple form, get a polished PDF.",
    href: "/tools/resume",
    badge: "New",
    accent: "#3b82f6",
    tags: ["PDF Export", "ATS-Friendly", "Free"],
  },
  {
    icon: "◉",
    label: "Test",
    title: "Personality Test",
    desc: "Discover your personality archetype. 10 questions. Shareable results. Go viral.",
    href: "/tools/personality",
    badge: "Viral",
    accent: "#06b6d4",
    tags: ["Fun", "Shareable", "Science-based"],
  },
];

const stats = [
  { value: "2.4M+", label: "Captions Generated" },
  { value: "180K+", label: "Resumes Created" },
  { value: "500K+", label: "Tests Taken" },
  { value: "98%", label: "Satisfaction" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* ── Top Ad ── */}
      <div className="max-w-3xl mx-auto px-6 mt-2">
        <AdSlot slot="top-banner" label="Advertisement — Google AdSense" height={80} />
      </div>

      {/* ── Hero ── */}
      <section className="relative px-6 pt-16 pb-20 text-center overflow-hidden">
        {/* Large glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, #7c3aed, transparent)" }} />

        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 tag mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-ring" />
          AI Tools · Free · No Signup Required
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Create.{" "}
          <span className="gradient-text">Generate.</span>
          <br />
          <span className="gradient-text-warm">Go Viral.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Three powerful AI tools — one premium platform. Generate viral captions, stunning resumes,
          and discover your personality. Free forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/tools" className="btn-glow px-8 py-4 rounded-2xl text-base font-semibold text-white inline-flex items-center gap-2">
            <span>Start Creating Free</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>
          <Link href="#tools" className="btn-outline-glow px-8 py-4 rounded-2xl text-base font-medium inline-flex items-center gap-2">
            View Tools
          </Link>
        </motion.div>

        {/* Floating orbs for hero */}
        <div className="absolute animate-float top-20 left-16 w-12 h-12 rounded-full opacity-20 border border-violet-500/40" style={{ animationDelay: "0s" }} />
        <div className="absolute animate-float top-32 right-20 w-8 h-8 rounded-full opacity-15 border border-cyan-500/40" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-16 left-1/4 w-6 h-6 rounded-full opacity-20 border border-blue-500/40 animate-float" style={{ animationDelay: "4s" }} />
      </section>

      {/* ── Stats ── */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <motion.div
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={item}>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1" style={{ fontFamily: "var(--font-display)" }}>
                {s.value}
              </div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Tool Cards ── */}
      <section id="tools" className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="tag mb-4 inline-flex">✦ Three Tools</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Everything you need to{" "}
            <span className="gradient-text">go viral</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No login. No limits. Just powerful AI tools ready to use in seconds.
          </p>
        </motion.div>

        <motion.div
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {tools.map((tool) => (
            <motion.div key={tool.href} variants={item}>
              <Link href={tool.href} className="group block h-full">
                <div
                  className="glass glass-hover h-full p-7 flex flex-col rounded-2xl relative overflow-hidden"
                  style={{ "--card-accent": tool.accent } as React.CSSProperties}
                >
                  {/* Subtle top glow */}
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${tool.accent}60, transparent)` }} />

                  {/* Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-2xl w-12 h-12 glass rounded-xl flex items-center justify-center"
                      style={{ color: tool.accent }}>
                      {tool.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: `${tool.accent}18`, color: tool.accent, border: `1px solid ${tool.accent}30` }}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all" style={{ fontFamily: "var(--font-display)" }}>
                    {tool.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
                    {tool.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tool.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.04)", color: "#64748b", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: tool.accent }}>
                    <span>Try {tool.label}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Mid Ad ── */}
      <div className="max-w-3xl mx-auto px-6 mb-20">
        <AdSlot slot="mid-banner" label="Advertisement — Google AdSense" height={250} />
      </div>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="tag mb-4 inline-flex">◈ Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            3 steps to <span className="gradient-text">create magic</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { step: "01", title: "Pick a tool", desc: "Choose Caption AI, Resume Builder, or Personality Test.", icon: "⊹" },
            { step: "02", title: "Enter your input", desc: "Fill a simple form — takes less than 30 seconds.", icon: "◎" },
            { step: "03", title: "Generate & share", desc: "Get premium results instantly. Copy, download, or share.", icon: "✦" },
          ].map((s) => (
            <motion.div key={s.step} variants={item}
              className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
              <div className="text-xs font-bold tracking-widest text-slate-700 mb-4" style={{ fontFamily: "var(--font-mono)" }}>
                STEP {s.step}
              </div>
              <div className="text-4xl mb-4 text-violet-400">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10"
            style={{ background: "radial-gradient(ellipse at center, #7c3aed, transparent 70%)" }} />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: "var(--font-display)" }}>
            Ready to go <span className="gradient-text">viral?</span>
          </h2>
          <p className="text-slate-400 mb-8 relative z-10">Start using GenifyAi for free. No account needed.</p>
          <Link href="/tools" className="btn-glow px-10 py-4 rounded-2xl text-base font-semibold text-white inline-flex items-center gap-2 relative z-10">
            Launch Tools Now →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
