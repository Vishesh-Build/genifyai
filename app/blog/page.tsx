import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import { WebsiteSchema } from "@/components/seo/SchemaMarkup";

export const metadata: Metadata = {
  title: "Blog — AI Tools Tips & Guides | GenifyAI",
  description: "Learn how to create viral captions, write ATS-friendly resumes, and understand personality types. Free guides from GenifyAI.",
  keywords: "AI caption tips, resume writing guide, personality types, viral content strategy",
};

export default function BlogPage() {
  return (
    <>
      <WebsiteSchema />
      <div className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="tag mb-4 inline-flex">✦ Blog</span>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Tips, Guides & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-slate-400">Practical guides to help you create better content, land more jobs, and understand yourself.</p>
        </div>

        {/* Featured post */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="group block mb-8">
          <div className="glass glass-hover rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, transparent)" }} />
            <div className="flex items-center gap-3 mb-4">
              <span className="tag">✦ Featured</span>
              <span className="tag">{blogPosts[0].tag}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}>
              {blogPosts[0].title}
            </h2>
            <p className="text-slate-400 mb-4 leading-relaxed">{blogPosts[0].description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span>{blogPosts[0].date}</span>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <span className="text-violet-400 text-sm font-medium group-hover:gap-3 flex items-center gap-2">
                Read Article →
              </span>
            </div>
          </div>
        </Link>

        {/* Rest of posts */}
        <div className="space-y-4">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="glass glass-hover rounded-2xl p-6 flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag text-xs">{post.tag}</span>
                    <span className="text-xs text-slate-600">{post.readTime}</span>
                  </div>
                  <h2 className="text-white font-semibold group-hover:text-violet-300 transition-colors mb-1">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-1">{post.description}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"
                  className="text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA to tools */}
        <div className="mt-12 glass rounded-2xl p-7 text-center">
          <p className="text-slate-400 mb-4">Ready to put these tips into action?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[["Try Caption AI →", "/tools/caption"], ["Build Resume →", "/tools/resume"], ["Take Personality Test →", "/tools/personality"]].map(([l, h]) => (
              <Link key={h} href={h} className="btn-outline-glow px-5 py-2.5 rounded-xl text-sm font-medium">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
