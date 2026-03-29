"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <div>
        <span className="tag mb-4 inline-flex">Legal</span>
        <h1 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <div className="glass rounded-2xl p-8 space-y-5 text-slate-300 leading-relaxed text-sm">
          <p className="text-slate-500">Last updated: January 2026</p>
          <p>GenifyAI does not collect personal data. No account creation is required. Your inputs are processed temporarily to generate results and are not stored on our servers.</p>
          <h2 className="text-white font-semibold text-lg">Cookies & Analytics</h2>
          <p>We may use anonymous analytics to improve the platform. No personally identifiable information is collected.</p>
          <h2 className="text-white font-semibold text-lg">Advertising</h2>
          <p>We use Google AdSense to display relevant ads. Google may use cookies to serve ads based on prior visits. You can opt out via Google's Ad Settings.</p>
          <h2 className="text-white font-semibold text-lg">Contact</h2>
          <p>Questions? Email us at genifyaiofc@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
