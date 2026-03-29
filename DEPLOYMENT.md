# 🚀 Deployment Guide — GenifyAi

## Prerequisites
- Node.js 18+ installed
- Git installed
- Vercel account (free)

---

## 1. Local Development

```bash
# Clone or enter the project folder
cd ai-tools-viral

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit: http://localhost:3000

---

## 2. Deploy to Vercel (Recommended)

### Option A: Vercel CLI (fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Which scope: your username
# - Link to existing project: N
# - Project name: ai-tools-viral (or your choice)
# - Directory: ./  (hit Enter)
# - Override settings: N

# Deploy to production
vercel --prod
```

### Option B: GitHub + Vercel Dashboard

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ai-tools-viral.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Click **Deploy** — Vercel auto-detects Next.js
5. Done! Your site is live in ~90 seconds.

---

## 3. Environment Variables (Optional)

In Vercel Dashboard → Project → Settings → Environment Variables:

| Key | Value | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_ADSENSE_ID` | `ca-pub-XXXX` | Your Google AdSense publisher ID |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXX` | Google Analytics ID |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Your production URL |

---

## 4. Custom Domain

1. Vercel Dashboard → Project → Domains
2. Add your domain (e.g. `viraiai.com`)
3. Update DNS: add CNAME → `cname.vercel-dns.com`
4. SSL is automatic ✓

---

## 5. Google AdSense Setup

1. Sign up at https://adsense.google.com
2. Add your site URL
3. Copy your Publisher ID (ca-pub-XXXX)
4. Replace `NEXT_PUBLIC_ADSENSE_ID` in `.env.local`
5. Replace the `<AdSlot>` placeholder components with actual AdSense code

```tsx
// components/ui/AdSlot.tsx — replace with real AdSense:
<ins
  className="adsbygoogle"
  style={{ display: "block" }}
  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
  data-ad-slot="YOUR_SLOT_ID"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

---

## 6. Build Optimization

```bash
# Check bundle size
npm run build

# Analyze bundle (optional)
npm install @next/bundle-analyzer
```

---

## Folder Structure

```
ai-tools-viral/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout (navbar, footer, SEO)
│   ├── globals.css              # Global styles + design system
│   ├── tools/
│   │   ├── page.tsx             # Tools dashboard
│   │   ├── caption/page.tsx     # AI Caption Generator
│   │   ├── resume/page.tsx      # Resume Generator
│   │   └── personality/page.tsx # Personality Test
│   ├── api/
│   │   ├── generate-caption/route.ts
│   │   ├── generate-resume/route.ts
│   │   └── personality-result/route.ts
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── contact/page.tsx
│   └── blog/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Floating blur navbar
│   │   └── Footer.tsx           # Footer with links
│   └── ui/
│       ├── AdSlot.tsx           # AdSense placeholder
│       ├── GlassCard.tsx        # Reusable glass card
│       └── LoadingSpinner.tsx   # Spinner + skeleton
├── lib/
│   └── utils.ts                 # Helper utilities
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind + custom theme
├── next.config.mjs
├── tsconfig.json
├── .env.example
└── DEPLOYMENT.md                # This file
```

---

## Monetization Tips

1. **AdSense**: 3 ad slots placed (top, mid, bottom) on each page
2. **Affiliate links**: Add tool recommendations with affiliate links
3. **Premium tier**: Add a "Pro" version with more captions, resume templates
4. **Viral growth**: WhatsApp + Twitter share buttons on Personality Test results

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)  
- **Styling**: Tailwind CSS + custom CSS variables
- **Animations**: Framer Motion
- **PDF**: jsPDF
- **Notifications**: react-hot-toast
- **Deployment**: Vercel (free tier supports this fully)

