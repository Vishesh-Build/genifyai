export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  tag: string;
  tool: string;
  toolHref: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "viral-caption-formulas",
    title: "10 Viral Caption Formulas That Always Work in 2025",
    description: "Discover the exact caption formulas used by top Instagram and LinkedIn creators to get massive engagement. Copy-paste ready templates included.",
    date: "2025-01-15",
    readTime: "5 min read",
    tag: "Captions",
    tool: "AI Caption Generator",
    toolHref: "/tools/caption",
    content: `
## Why Most Captions Fail

Most people write captions as an afterthought. The photo gets all the attention, and the caption ends up being a generic description. But top creators know: **the caption is what drives engagement.**

Here are the 10 formulas that consistently go viral.

## Formula 1: The Open Loop

Start with a bold claim, then deliver. Example: *"I grew my Instagram from 0 to 10K in 60 days. Here's exactly what I did 👇"*

This creates curiosity that forces people to keep reading.

## Formula 2: The Relatable Struggle

Tap into shared pain. Example: *"Me pretending to have my life together while internally panicking about everything 😂"*

Relatability = shares.

## Formula 3: The Contrast

Before vs After. Then vs Now. Example: *"6 months ago: broke, confused, no direction. Today: building something I'm proud of. The only difference? I started."*

## Formula 4: The Bold Take

Controversial (but true) opinion. Example: *"Unpopular opinion: hustle culture is ruining a generation. Rest is productive. Saying no is strategic."*

## Formula 5: The Listicle Hook

"3 things nobody tells you about X" — people cannot resist lists.

## Formula 6: The Story Arc

Mini story with a twist ending. Setup → Conflict → Resolution in 3-4 sentences.

## Formula 7: The Question Close

End with a genuine question to drive comments. Comments = algorithm boost.

## Formula 8: The Specific Number

"I sent 47 cold emails. Got 12 replies. Booked 3 clients. Here's the exact template I used:"

Specificity builds credibility.

## Formula 9: The Aesthetic One-liner

Short, poetic, visual. *"soft mornings. big dreams. slow coffee. ✨"* — works perfectly for aesthetic niches.

## Formula 10: The CTA Caption

Direct call to action. *"Save this post for when you need caption ideas. You'll thank me later 🔖"*

## Try It Yourself

Use our **AI Caption Generator** to apply any of these formulas to your specific topic — in seconds, for free.
    `
  },
  {
    slug: "ats-friendly-resume-2025",
    title: "How to Write an ATS-Friendly Resume in 2025 (Get Past Robots)",
    description: "Learn exactly how Applicant Tracking Systems work and how to optimize your resume to get past them and land more interviews.",
    date: "2025-01-10",
    readTime: "7 min read",
    tag: "Resume",
    tool: "Resume Generator",
    toolHref: "/tools/resume",
    content: `
## What is ATS and Why It Matters

Over **75% of resumes are rejected by ATS** before a human ever sees them. Applicant Tracking Systems scan your resume for keywords, formatting, and structure.

If your resume fails the robot test, it doesn't matter how qualified you are.

## How ATS Works

ATS software parses your resume into structured data. It looks for:
- **Keywords** matching the job description
- **Standard section headers** (Experience, Education, Skills)
- **Readable formatting** (no tables, no graphics)
- **Relevant dates** in a consistent format

## 7 Rules for ATS-Optimized Resumes

### Rule 1: Use Standard Section Headers
Use "Work Experience" not "My Journey". Use "Education" not "Where I Studied".

### Rule 2: Match Keywords from Job Description
Copy exact phrases from the job posting. If they say "cross-functional collaboration", use that exact phrase.

### Rule 3: No Tables or Columns
ATS parsers read left-to-right, top-to-bottom. Columns confuse them.

### Rule 4: Use Standard Fonts
Arial, Calibri, Times New Roman. No decorative fonts.

### Rule 5: Save as PDF or .docx
PDF is safest for most modern ATS systems.

### Rule 6: Quantify Everything
"Increased sales by 40%" beats "Improved sales performance".

### Rule 7: One Page for Under 5 Years Experience
Hiring managers spend 7 seconds on initial scan. Keep it tight.

## The Perfect ATS Resume Structure

1. **Contact Info** (name, email, phone, LinkedIn)
2. **Professional Summary** (3 sentences max)
3. **Work Experience** (reverse chronological)
4. **Education**
5. **Skills** (keywords rich section)

## Build Your ATS Resume Free

Our **Resume Generator** creates properly formatted, ATS-optimized resumes in under 60 seconds.
    `
  },
  {
    slug: "personality-archetypes-explained",
    title: "The 6 Personality Archetypes Explained: Which One Are You?",
    description: "A deep dive into the 6 personality archetypes — Visionary, Architect, Connector, Maverick, Guardian, and Catalyst. Discover your type and what it means.",
    date: "2025-01-05",
    readTime: "6 min read",
    tag: "Personality",
    tool: "Personality Test",
    toolHref: "/tools/personality",
    content: `
## Why Personality Archetypes Matter

Understanding your personality archetype isn't just fun — it's **career-changing, relationship-improving, and self-awareness-building**.

The right archetype insight can explain why you work the way you do, why certain environments energize you, and where your blind spots are.

## The 6 Archetypes

### 🔭 The Visionary
Natural big-picture thinker. You see patterns, trends, and possibilities that others miss. You thrive on innovation but struggle with follow-through on details.

**Famous Visionarys:** Elon Musk, Steve Jobs, Nikola Tesla

### ⚙️ The Architect
Logical, strategic, precise. You turn chaos into systems. You love frameworks and elegant solutions to complex problems.

**Famous Architects:** Bill Gates, Marie Curie, Ada Lovelace

### 🌐 The Connector
Energized by people and relationships. You build bridges, read social dynamics naturally, and make everyone feel included.

**Famous Connectors:** Oprah Winfrey, Richard Branson

### ⚡ The Maverick
Bold, unconventional, authentic. You challenge the status quo and take risks others won't. You discover paths that didn't exist before.

**Famous Mavericks:** Lady Gaga, Kanye West

### 🛡️ The Guardian
Dependable, caring, principled. You're the bedrock others lean on. You take commitments seriously and value loyalty deeply.

**Famous Guardians:** Nelson Mandela, Michelle Obama, Warren Buffett

### 🔥 The Catalyst
Passionate, persuasive, driven. You don't just join movements — you start them. You have extraordinary energy that's contagious.

**Famous Catalysts:** Martin Luther King Jr., Malala Yousafzai

## How to Use This Knowledge

Once you know your archetype:
1. **Career** — Choose roles that play to your strengths
2. **Teams** — Understand why you clash with certain personality types
3. **Growth** — Work on your specific challenge areas

## Discover Your Archetype

Take our free **AI-powered Personality Test** — 10 questions, instant results, shareable on WhatsApp.
    `
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
