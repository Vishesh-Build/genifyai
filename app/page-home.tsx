import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "GenifyAI — Free AI Caption Generator, Resume Builder & Personality Test",
  description: "3 free AI tools in one platform. Generate viral captions, build professional resumes, and discover your personality. No signup. Instant results.",
  keywords: "free AI caption generator, resume builder free, personality test online, AI tools no signup, viral captions instagram",
  openGraph: {
    title: "GenifyAI — Create. Generate. Go Viral.",
    description: "3 free AI tools. No signup. Instant results.",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
