"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-violet-500/10 mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Ad slot */}
        <div className="ad-slot h-16 mb-12 max-w-2xl mx-auto" data-ad-slot="footer-banner">
          Advertisement · Google AdSense
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg btn-glow flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Viral<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Free AI-powered tools to supercharge your creativity. No signup, no credit card. Just create.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="tag">Free</span>
              <span className="tag">No Signup</span>
              <span className="tag">AI-Powered</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Tools</h3>
            <ul className="space-y-3">
              {[["Caption Generator", "/tools/caption"], ["Resume Builder", "/tools/resume"], ["Personality Test", "/tools/personality"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Company</h3>
            <ul className="space-y-3">
              {[["About", "/about"], ["Privacy Policy", "/privacy"], ["Contact", "/contact"], ["Blog", "/blog"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-500/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© {year} ViralAI. All rights reserved.</p>
          <p className="text-slate-700 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            Built with Next.js · Powered by Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
}
