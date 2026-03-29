"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AdSlot } from "@/components/ui/AdSlot";
import Link from "next/link";

const moods = [
  { value: "funny", label: "😂 Funny", color: "#f59e0b" },
  { value: "motivational", label: "🔥 Motivational", color: "#ef4444" },
  { value: "professional", label: "💼 Professional", color: "#3b82f6" },
  { value: "aesthetic", label: "🌸 Aesthetic", color: "#ec4899" },
  { value: "viral", label: "🚀 Viral", color: "#8b5cf6" },
];

export default function CaptionPage() {
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("viral");
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("Please enter a topic first!");
      return;
    }
    setLoading(true);
    setCaptions([]);
    try {
      const res = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, mood }),
      });
      const data = await res.json();
      if (data.captions) {
        setCaptions(data.captions);
        toast.success("5 captions generated!");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyCaption(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    toast.success("Caption copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <AdSlot slot="caption-top" label="Advertisement" height={80} className="mb-10" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-6">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Back to Tools
        </Link>
        <span className="tag mb-4 inline-flex">✦ Caption AI</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          AI Caption <span className="gradient-text">Generator</span>
        </h1>
        <p className="text-slate-400 text-lg">Enter your topic, choose a mood, get 5 viral captions instantly.</p>
      </motion.div>

      {/* Input Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-7 mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Topic or Niche *
        </label>
        <textarea
          className="input-glass w-full h-28 px-4 py-3 resize-none text-sm"
          placeholder="e.g. morning coffee ritual, gym motivation, travel photography, startup life..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleGenerate(); }}
        />
        <p className="text-xs text-slate-600 mt-2">Tip: Be specific for better results. Cmd+Enter to generate.</p>

        {/* Mood selector */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-300 mb-3">Caption Mood</label>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button key={m.value} onClick={() => setMood(m.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  mood === m.value ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
                style={mood === m.value ? {
                  background: `${m.color}20`,
                  border: `1px solid ${m.color}60`,
                  color: m.color,
                  boxShadow: `0 0 16px ${m.color}25`,
                } : {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="btn-glow w-full mt-6 py-4 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><LoadingSpinner size={20} /><span>Generating captions...</span></>
          ) : (
            <><span>✦ Generate 5 Captions</span></>
          )}
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {captions.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-violet-400" style={{ fontFamily: "var(--font-mono)" }}>
                ✦ {captions.length} CAPTIONS GENERATED
              </span>
              <div className="flex-1 h-px bg-violet-500/20" />
            </div>
            <div className="space-y-4">
              {captions.map((caption, idx) => (
                <motion.div key={idx}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass rounded-xl p-5 group relative hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-bold text-slate-700 pt-0.5 shrink-0"
                      style={{ fontFamily: "var(--font-mono)" }}>
                      0{idx + 1}
                    </span>
                    <p className="text-slate-200 leading-relaxed flex-1 text-sm whitespace-pre-line">{caption}</p>
                    <button
                      onClick={() => copyCaption(caption, idx)}
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                      style={{
                        background: copied === idx ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(139,92,246,0.3)",
                      }}
                      title="Copy caption"
                    >
                      {copied === idx ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 3.5" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <rect x="5" y="5" width="9" height="9" rx="2" stroke="#8b5cf6" strokeWidth="1.4"/>
                          <path d="M11 5V4a1 1 0 00-1-1H4a2 2 0 00-2 2v6a1 1 0 001 1h1" stroke="#8b5cf6" strokeWidth="1.4"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-6 flex gap-3 flex-wrap">
              <button onClick={() => { setCaptions([]); setTopic(""); }}
                className="btn-outline-glow px-5 py-2.5 rounded-xl text-sm font-medium">
                ↺ Start Over
              </button>
              <button onClick={handleGenerate}
                className="btn-glow px-5 py-2.5 rounded-xl text-sm font-semibold text-white">
                ↻ Regenerate
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12">
        <AdSlot slot="caption-bottom" label="Advertisement" height={200} />
      </div>
    </div>
  );
}
