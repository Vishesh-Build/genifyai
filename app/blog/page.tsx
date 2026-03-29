"use client";
import Link from "next/link";

const posts = [
  { title: "10 Viral Caption Formulas That Always Work", date: "Dec 2024", tag: "Captions", href: "#" },
  { title: "How to Write an ATS-Friendly Resume in 2025", date: "Nov 2024", tag: "Resume", href: "#" },
  { title: "The 6 Personality Archetypes Explained", date: "Oct 2024", tag: "Personality", href: "#" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <div className="mb-12">
        <span className="tag mb-4 inline-flex">Blog</span>
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Latest <span className="gradient-text">Articles</span>
        </h1>
      </div>
      <div className="space-y-5">
        {posts.map((p) => (
          <Link key={p.title} href={p.href} className="glass glass-hover rounded-2xl p-6 flex items-center justify-between group block">
            <div>
              <span className="tag text-xs mb-2 inline-flex">{p.tag}</span>
              <h2 className="text-white font-semibold group-hover:text-violet-300 transition-colors">{p.title}</h2>
              <p className="text-slate-600 text-sm mt-1">{p.date}</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
