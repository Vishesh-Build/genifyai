"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AdSlot } from "@/components/ui/AdSlot";

const tools = [
  {
    icon: "✦",
    title: "AI Caption Generator",
    desc: "Transform any topic into 5 high-converting captions for Instagram, Twitter, and LinkedIn.",
    href: "/tools/caption",
    badge: "🔥 Most Popular",
    accent: "#8b5cf6",
    features: ["5 unique captions", "Mood selector", "One-click copy", "Multiple platforms"],
    timeEstimate: "~10 seconds",
  },
  {
    icon: "◈",
    title: "Resume Generator",
    desc: "Professional ATS-ready resume from a simple form. Download as PDF in seconds.",
    href: "/tools/resume",
    badge: "⚡ New",
    accent: "#3b82f6",
    features: ["Clean PDF export", "ATS-optimized", "Professional layout", "Instant download"],
    timeEstimate: "~60 seconds",
  },
  {
    icon: "◉",
    title: "Personality Test",
    desc: "10 questions reveal your archetype. Get shareable results to post everywhere.",
    href: "/tools/personality",
    badge: "🚀 Viral",
    accent: "#06b6d4",
    features: ["10 deep questions", "6 archetypes", "WhatsApp share", "Score breakdown"],
    timeEstimate: "~3 minutes",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function ToolsDashboard() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <AdSlot slot="tools-top" label="Advertisement" height={80} className="mb-10" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <span className="tag mb-4 inline-flex">◈ Dashboard</span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Your AI <span className="gradient-text">Toolkit</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">Three premium tools, zero cost. Pick one and start creating.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
        {tools.map((tool) => (
          <motion.div key={tool.href} variants={item}>
            <Link href={tool.href} className="group block h-full">
              <div className="glass glass-hover h-full rounded-2xl overflow-hidden relative">
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${tool.accent}, transparent)` }} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${tool.accent}15`, border: `1px solid ${tool.accent}30`, color: tool.accent }}>
                      {tool.icon}
                    </div>
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: `${tool.accent}12`, color: tool.accent, border: `1px solid ${tool.accent}25` }}>
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{tool.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{tool.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 3.5" stroke={tool.accent} strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600" style={{ fontFamily: "var(--font-mono)" }}>⏱ {tool.timeEstimate}</span>
                    <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: tool.accent }}>
                      Launch
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <AdSlot slot="tools-mid" label="Advertisement" height={200} />
    </div>
  );
}
