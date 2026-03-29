"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AdSlot } from "@/components/ui/AdSlot";
import Link from "next/link";

const questions = [
  { id: 1, text: "When facing a major problem, your first instinct is to...", options: ["Brainstorm wild, creative solutions", "Map out a logical, step-by-step plan", "Talk it through with people you trust", "Challenge whether the problem needs solving at all"] },
  { id: 2, text: "At a social event, you're most likely to...", options: ["Be the one pitching an idea to strangers", "Hang back and observe before engaging", "Work the room and connect everyone", "Find the most interesting person and go deep"] },
  { id: 3, text: "Your ideal work environment is...", options: ["A fast-moving startup with no clear rules", "A well-organized team with clear processes", "A collaborative space full of diverse people", "Solo with the freedom to experiment"] },
  { id: 4, text: "When a project fails, you typically...", options: ["Immediately think about what to try next", "Analyze exactly what went wrong", "Make sure the team is okay emotionally", "Question whether it was the right project"] },
  { id: 5, text: "People come to you most for...", options: ["Fresh, out-of-the-box ideas", "Reliable execution and follow-through", "Emotional support and connection", "Honest, unfiltered perspective"] },
  { id: 6, text: "Your relationship with rules is...", options: ["Rules are obstacles to creativity", "Rules exist for good reasons — follow them", "Rules are meant to be discussed as a group", "Which rules? I make my own path"] },
  { id: 7, text: "When you imagine your legacy, you want to be known as...", options: ["The person who changed how we think", "The person who built something that lasts", "The person who brought people together", "The person who lived completely authentically"] },
  { id: 8, text: "Your biggest fear is...", options: ["Dying with unrealized potential", "Failing to meet your own standards", "Being isolated or disconnected", "Losing your sense of self"] },
  { id: 9, text: "A perfect Saturday looks like...", options: ["Working on a new passion project", "Completing items on your organized to-do list", "Hosting friends for a long dinner", "Spontaneously going wherever the day takes you"] },
  { id: 10, text: "When you read the word 'success', you think of...", options: ["Impact — changing something significant", "Excellence — doing something extremely well", "Belonging — being deeply loved", "Freedom — living on your own terms"] },
];

interface Archetype {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  traits: string[];
  color: string;
  strengths: string;
  challenge: string;
  celebrities: string[];
  // AI-enhanced fields
  aiEnhanced?: boolean;
  uniqueInsight?: string;
  careerMatches?: string[];
  relationshipStyle?: string;
  growthTip?: string;
}

export default function PersonalityPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ archetype: Archetype; score: number } | null>(null);
  const [started, setStarted] = useState(false);

  function selectAnswer(idx: number) {
    setSelected(idx);
    setTimeout(async () => {
      const newAnswers = [...answers, idx + 1];
      setAnswers(newAnswers);
      setSelected(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setLoading(true);
        try {
          const res = await fetch("/api/personality-result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: newAnswers }),
          });
          const data = await res.json();
          if (data.archetype) {
            setResult(data);
            if (data.archetype.aiEnhanced) {
              toast.success("AI ne aapka personalized result ready kar diya! ✨");
            }
          } else {
            toast.error("Something went wrong.");
          }
        } catch {
          toast.error("Failed to get result.");
        } finally {
          setLoading(false);
        }
      }
    }, 350);
  }

  function shareOnWhatsApp() {
    if (!result) return;
    const text = `Maine GenifyAi Personality Test diya aur main hoon "${result.archetype.name}" ${result.archetype.emoji}!\n\n"${result.archetype.tagline}"\n\nMera score: ${result.score}/100\n\nApna discover karo → https://viraiai.app/tools/personality`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  function shareOnTwitter() {
    if (!result) return;
    const text = `I'm "${result.archetype.name}" ${result.archetype.emoji} according to GenifyAi's personality test!\n\n"${result.archetype.tagline}"\n\nTake the free test →`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://viraiai.app/tools/personality")}`, "_blank");
  }

  function reset() {
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
    setStarted(false);
    setSelected(null);
  }

  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <AdSlot slot="personality-top" label="Advertisement" height={80} className="mb-10" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-6">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Back to Tools
        </Link>
        <span className="tag mb-4 inline-flex">◉ Personality</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Personality <span className="gradient-text">Test</span>
        </h1>
        <p className="text-slate-400 text-lg">10 questions. AI analyzes your answers. Discover your archetype.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ── Intro ── */}
        {!started && !result && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass rounded-2xl p-10 text-center">
            <div className="text-6xl mb-6">◉</div>
            <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Discover Your Archetype
            </h2>
            <p className="text-slate-400 mb-2">10 deep questions · AI-powered analysis · Shareable results</p>
            <p className="text-slate-500 text-sm mb-8">Takes about 3 minutes · 6 unique archetypes · Free forever</p>

            {/* AI badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
              <span className="text-violet-400 text-sm">✦</span>
              <span className="text-violet-300 text-sm font-medium">Powered by Llama3 AI — Personalized just for you</span>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              {["🔭", "⚙️", "🌐", "⚡", "🛡️", "🔥"].map((e, i) => (
                <div key={i} className="glass rounded-xl py-3 text-2xl flex items-center justify-center">{e}</div>
              ))}
            </div>
            <button onClick={() => setStarted(true)}
              className="btn-glow px-10 py-4 rounded-2xl text-base font-semibold text-white">
              Start the Test →
            </button>
          </motion.div>
        )}

        {/* ── Questions ── */}
        {started && !result && !loading && (
          <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-600 font-mono">Question {currentQ + 1} of {questions.length}</span>
                <span className="text-xs text-violet-400 font-mono">{Math.round(progress)}% complete</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }} />
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {questions[currentQ].text}
              </p>
              <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                  <button key={idx} onClick={() => selectAnswer(idx)}
                    className={`w-full text-left px-5 py-4 rounded-xl text-sm leading-relaxed transition-all duration-200 ${
                      selected === idx ? "text-violet-300" : "text-slate-300 hover:text-white"
                    }`}
                    style={{
                      background: selected === idx ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
                      border: selected === idx ? "1px solid rgba(139,92,246,0.6)" : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: selected === idx ? "0 0 20px rgba(139,92,246,0.2)" : "none",
                    }}>
                    <span className="font-mono text-xs text-slate-600 mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass rounded-2xl p-16 text-center">
            <div className="flex justify-center mb-6"><LoadingSpinner size={48} /></div>
            <p className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
              AI aapka result analyze kar raha hai...
            </p>
            <p className="text-slate-500 text-sm">Llama3 aapke jawaabon ko deeply analyze kar raha hai</p>
          </motion.div>
        )}

        {/* ── Result ── */}
        {result && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>

            {/* AI badge if enhanced */}
            {result.archetype.aiEnhanced && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
                  <span className="text-violet-400 text-sm">✦</span>
                  <span className="text-violet-300 text-sm font-medium">AI-Personalized Result — Unique to your answers</span>
                </div>
              </motion.div>
            )}

            <div className="glass rounded-2xl overflow-hidden mb-6">
              {/* Header */}
              <div className="p-8 text-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${result.archetype.color}18, transparent)` }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ background: `radial-gradient(ellipse at center, ${result.archetype.color}, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="text-7xl mb-4">{result.archetype.emoji}</div>
                  <div className="tag mb-3 inline-flex" style={{ color: result.archetype.color, background: `${result.archetype.color}15`, borderColor: `${result.archetype.color}30` }}>
                    Your Archetype
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {result.archetype.name}
                  </h2>
                  <p className="text-lg mb-4" style={{ color: result.archetype.color }}>
                    "{result.archetype.tagline}"
                  </p>
                  <div className="max-w-xs mx-auto">
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>Score</span><span>{result.score}/100</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${result.archetype.color}, #06b6d4)` }}
                        initial={{ width: 0 }} animate={{ width: `${result.score}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7 space-y-6">
                {/* Description */}
                <p className="text-slate-300 leading-relaxed">{result.archetype.description}</p>

                {/* Unique AI Insight */}
                {result.archetype.uniqueInsight && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="rounded-xl p-5 relative overflow-hidden"
                    style={{ background: `${result.archetype.color}10`, border: `1px solid ${result.archetype.color}25` }}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: result.archetype.color }}>
                          AI Insight — Sirf Aapke Liye
                        </h3>
                        <p className="text-slate-200 text-sm leading-relaxed">{result.archetype.uniqueInsight}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Traits */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: result.archetype.color }}>Core Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.archetype.traits.map((t) => (
                      <span key={t} className="text-sm px-3 py-1.5 rounded-full font-medium"
                        style={{ background: `${result.archetype.color}12`, color: result.archetype.color, border: `1px solid ${result.archetype.color}25` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Matches (AI) */}
                {result.archetype.careerMatches && result.archetype.careerMatches.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Best Career Matches</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.archetype.careerMatches.map((c) => (
                        <span key={c} className="text-sm text-slate-300 px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Superpower</h4>
                    <p className="text-slate-300 text-sm">{result.archetype.strengths}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Growth Area</h4>
                    <p className="text-slate-300 text-sm">{result.archetype.challenge}</p>
                  </div>
                </div>

                {/* Relationship Style (AI) */}
                {result.archetype.relationshipStyle && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Relationship Style</h4>
                    <p className="text-slate-300 text-sm">{result.archetype.relationshipStyle}</p>
                  </div>
                )}

                {/* Growth Tip (AI) */}
                {result.archetype.growthTip && (
                  <div className="rounded-xl p-4" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#10b981" }}>
                      🌱 Your #1 Growth Tip
                    </h4>
                    <p className="text-slate-300 text-sm">{result.archetype.growthTip}</p>
                  </div>
                )}

                {/* Famous examples */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                    Famous {result.archetype.name}s
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.archetype.celebrities.map((c) => (
                      <span key={c} className="text-sm text-slate-400 px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-bold text-white mb-1">Share your result 🚀</h3>
              <p className="text-slate-500 text-xs mb-4">Apne dosto ko bhi batao — viral hota hai ye!</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={shareOnWhatsApp}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-100"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp pe Share Karo
                </button>
                <button onClick={shareOnTwitter}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-100"
                  style={{ background: "linear-gradient(135deg, #1DA1F2, #0d8bd9)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X pe Share Karo
                </button>
                <button onClick={reset}
                  className="btn-outline-glow px-5 py-3 rounded-xl text-sm font-medium">
                  ↺ Dobara Do
                </button>
              </div>
            </div>

            <AdSlot slot="personality-result" label="Advertisement" height={200} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
