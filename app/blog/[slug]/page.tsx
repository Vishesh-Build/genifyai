import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, blogPosts } from "@/lib/blog-data";
import { ArticleSchema, FAQSchema } from "@/components/seo/SchemaMarkup";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | GenifyAI Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

// Simple markdown-like renderer
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { elements.push(<div key={key++} className="h-3" />); continue; }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-white mt-8 mb-4" style={{ fontFamily: "var(--font-display)" }}>
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-violet-300 mt-6 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-slate-300 ml-4 mb-1 flex items-start gap-2">
          <span className="text-violet-400 mt-1 shrink-0">→</span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }} />
        </li>
      );
    } else if (trimmed.match(/^\d+\./)) {
      elements.push(
        <li key={key++} className="text-slate-300 ml-4 mb-2 list-decimal">
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^\d+\.\s/, "")) }} />
        </li>
      );
    } else {
      elements.push(
        <p key={key++} className="text-slate-300 leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
      );
    }
  }
  return elements;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-violet-300">$1</em>');
}

const faqs: Record<string, { q: string; a: string }[]> = {
  "viral-caption-formulas": [
    { q: "What makes a caption go viral?", a: "Viral captions use curiosity hooks, relatable humor, or emotional triggers that compel people to like, comment, or share." },
    { q: "How long should an Instagram caption be?", a: "Engagement peaks at 138-150 characters for feed posts, but longer captions work well for storytelling content." },
  ],
  "ats-friendly-resume-2025": [
    { q: "What is an ATS resume?", a: "An ATS (Applicant Tracking System) resume is optimized with keywords and clean formatting so automated software can parse it correctly." },
    { q: "Should I use a PDF or Word resume?", a: "PDF is safest for most modern ATS systems as it preserves formatting." },
  ],
  "personality-archetypes-explained": [
    { q: "How accurate are personality archetypes?", a: "Personality archetypes are psychologically grounded frameworks. They provide useful self-awareness insights rather than rigid categories." },
    { q: "Can your personality type change?", a: "Core traits tend to be stable, but your dominant archetype can shift with major life experiences and personal growth." },
  ],
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const postFaqs = faqs[post.slug] || [];

  return (
    <>
      <ArticleSchema title={post.title} description={post.description} datePublished={post.date} slug={post.slug} />
      {postFaqs.length > 0 && <FAQSchema faqs={postFaqs} />}

      <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="tag">{post.tag}</span>
            <span className="text-xs text-slate-600">{post.readTime}</span>
            <span className="text-xs text-slate-600">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
            {post.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">{post.description}</p>
        </div>

        {/* Top Ad */}
        <div className="ad-slot h-24 mb-8 flex items-center justify-center text-xs text-slate-700 font-mono rounded-xl">
          Advertisement
        </div>

        {/* Content */}
        <article className="glass rounded-2xl p-7 md:p-10 mb-8">
          {renderContent(post.content)}
        </article>

        {/* Mid Ad */}
        <div className="ad-slot h-48 mb-8 flex items-center justify-center text-xs text-slate-700 font-mono rounded-xl">
          Advertisement
        </div>

        {/* CTA to tool */}
        <div className="glass rounded-2xl p-7 mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ background: "radial-gradient(ellipse at center, #7c3aed, transparent 70%)" }} />
          <div className="relative z-10">
            <p className="text-slate-400 text-sm mb-2">Try it yourself — free, no signup</p>
            <h3 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {post.tool}
            </h3>
            <Link href={post.toolHref} className="btn-glow px-8 py-3 rounded-xl text-sm font-semibold text-white inline-block">
              Try {post.tool} Free →
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        {postFaqs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {postFaqs.map((faq, i) => (
                <div key={i} className="glass rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related posts */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            More Articles
          </h2>
          <div className="space-y-3">
            {blogPosts.filter((p) => p.slug !== post.slug).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="glass glass-hover rounded-xl p-4 flex items-center justify-between group block">
                <div>
                  <span className="tag text-xs mb-1 inline-flex">{p.tag}</span>
                  <p className="text-white text-sm font-medium group-hover:text-violet-300 transition-colors">{p.title}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-slate-600 group-hover:text-violet-400 shrink-0 ml-3">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Ad */}
        <div className="ad-slot h-24 flex items-center justify-center text-xs text-slate-700 font-mono rounded-xl">
          Advertisement
        </div>
      </div>
    </>
  );
}
