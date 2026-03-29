"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <div>
        <span className="tag mb-4 inline-flex">About</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
          About <span className="gradient-text">GenifyAI</span>
        </h1>
        <div className="glass rounded-2xl p-8 space-y-5 text-slate-300 leading-relaxed">
          <p>GenifyAI is a free platform built to give everyone access to powerful AI tools — no signup, no credit card, no friction.</p>
          <p>We believe creativity should be accessible. Whether you're a creator, a job seeker, or just curious about yourself, our tools are here to help you create, generate, and grow.</p>
          <h2 className="text-white font-bold text-xl pt-4" style={{ fontFamily: "var(--font-display)" }}>Our Tools</h2>
          <ul className="space-y-2">
            {[["AI Caption Generator", "/tools/caption"], ["Resume Generator", "/tools/resume"], ["Personality Test", "/tools/personality"]].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="text-violet-400 hover:text-violet-300 transition-colors">→ {l}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
