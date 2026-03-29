"use client";

import { useEffect } from "react";

interface AdSenseProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSense({ slot, format = "auto", className = "", style }: AdSenseProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && publisherId) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {}
  }, [publisherId]);

  // Show placeholder in development
  if (!publisherId) {
    return (
      <div
        className={`ad-slot flex items-center justify-center text-xs text-slate-700 font-mono ${className}`}
        style={style}
      >
        AD SLOT — {slot}
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Pre-built ad placements for consistent sizing
export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <AdSense
      slot="1234567890"
      format="horizontal"
      className={`w-full min-h-[90px] ${className}`}
    />
  );
}

export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <AdSense
      slot="0987654321"
      format="rectangle"
      className={`w-full min-h-[250px] ${className}`}
    />
  );
}

export function AdInArticle({ className = "" }: { className?: string }) {
  return (
    <AdSense
      slot="1122334455"
      format="auto"
      className={`w-full my-6 ${className}`}
    />
  );
}
