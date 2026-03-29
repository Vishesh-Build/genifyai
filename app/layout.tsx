import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GenifyAi — Create. Generate. Go Viral.",
  description: "Free AI-powered tools: Caption Generator, Resume Builder, Personality Test. No signup needed. Generate viral content instantly.",
  keywords: "AI caption generator, resume builder, personality test, free AI tools, viral content",
  openGraph: {
    title: "GenifyAi — Create. Generate. Go Viral.",
    description: "Free AI-powered tools. No signup. Instant results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-grid antialiased min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="orb w-[700px] h-[700px] -top-48 left-1/2 -translate-x-1/2 opacity-20"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
          />
          <div
            className="orb w-[400px] h-[400px] top-1/3 -right-32 opacity-10"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
          />
          <div
            className="orb w-[350px] h-[350px] bottom-1/4 -left-24 opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10">
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(13,0,32,0.95)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#e2e8f0",
              backdropFilter: "blur(16px)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              borderRadius: "12px",
              padding: "12px 16px",
            },
            success: {
              iconTheme: { primary: "#8b5cf6", secondary: "#030010" },
            },
          }}
        />
      </body>
    </html>
  );
}
