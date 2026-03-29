"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// Track page views
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as Window & { gtag?: Function }).gtag) {
      (window as Window & { gtag?: Function }).gtag?.("config",
        process.env.NEXT_PUBLIC_GA_ID,
        { page_path: pathname }
      );
    }
  }, [pathname, searchParams]);

  return null;
}

// Track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && (window as Window & { gtag?: Function }).gtag) {
    (window as Window & { gtag?: Function }).gtag?.("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Individual event trackers
export const track = {
  captionGenerated: (mood: string) => trackEvent("generate", "caption", mood),
  captionCopied: (index: number) => trackEvent("copy", "caption", `position_${index}`),
  resumeGenerated: () => trackEvent("generate", "resume"),
  resumeDownloaded: () => trackEvent("download", "resume"),
  personalityCompleted: (archetype: string) => trackEvent("complete", "personality", archetype),
  personalityShared: (platform: string) => trackEvent("share", "personality", platform),
  toolOpened: (tool: string) => trackEvent("open", "tool", tool),
  ctaClicked: (location: string) => trackEvent("click", "cta", location),
};

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { page_path: window.location.pathname });
          `,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
