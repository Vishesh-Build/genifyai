"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-violet-500/10 mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Ad slot */}
        <div className="ad-slot h-16 mb-12 max-w-2xl mx-auto flex items-center justify-center text-xs text-slate-700 font-mono rounded-xl"
          data-ad-slot="footer-banner">
          Advertisement · Google AdSense
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/GenifyAi.png" alt="GenifyAI" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Genify<span className="gradient-text">AI</span>
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
              {[
                ["Caption Generator", "/tools/caption"],
                ["Resume Builder", "/tools/resume"],
                ["Personality Test", "/tools/personality"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                ["About", "/about"],
                ["Privacy Policy", "/privacy"],
                ["Contact", "/contact"],
                ["Blog", "/blog"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-violet-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-500/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© {year} GenifyAI. All rights reserved.</p>
          <p className="text-slate-700 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            Create. Generate. Go Viral — GenifyAI
          </p>
        </div>
      </div>
    </footer>
  );
}
