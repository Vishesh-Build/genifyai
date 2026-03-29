"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <div>
        <span className="tag mb-4 inline-flex">Contact</span>
        <h1 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <div className="glass rounded-2xl p-8 space-y-5">
          <p className="text-slate-400 leading-relaxed">We would love to hear from you. Send us a message and we will get back to you soon.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
              <input type="text" className="input-glass w-full px-4 py-3 text-sm" placeholder="Alex Johnson" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input type="email" className="input-glass w-full px-4 py-3 text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
              <textarea className="input-glass w-full h-28 px-4 py-3 resize-none text-sm" placeholder="Tell us anything..." />
            </div>
          </div>
          <button className="btn-glow w-full py-3.5 rounded-xl text-sm font-semibold text-white">Send Message</button>
        </div>
      </div>
    </div>
  );
}
