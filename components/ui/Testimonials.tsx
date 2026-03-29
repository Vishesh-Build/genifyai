"use client";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Instagram Creator · 45K followers",
    avatar: "PS",
    text: "GenifyAI ka caption generator use kiya — pehle hi week mein 3 posts viral ho gayi! Seriously game changer hai yaar.",
    rating: 5,
    tool: "Caption AI",
    color: "#8b5cf6",
  },
  {
    name: "Rahul Mehta",
    role: "Fresh Graduate · Software Engineer",
    avatar: "RM",
    text: "Resume tool ne mera CV itna polished bana diya ki mujhe believe nahi hua. 2 din mein 3 interview calls aaye!",
    rating: 5,
    tool: "Resume Builder",
    color: "#3b82f6",
  },
  {
    name: "Anjali Verma",
    role: "Marketing Manager",
    avatar: "AV",
    text: "Personality test result share kiya WhatsApp pe — 40+ log ne test diya same din. Bilkul accurate result tha mera!",
    rating: 5,
    tool: "Personality Test",
    color: "#06b6d4",
  },
  {
    name: "Karan Singh",
    role: "LinkedIn Creator · 12K followers",
    avatar: "KS",
    text: "Professional mood mein captions generate kiye — LinkedIn pe engagement 3x ho gayi. Totally free hai ye sab!",
    rating: 5,
    tool: "Caption AI",
    color: "#8b5cf6",
  },
  {
    name: "Sneha Patel",
    role: "HR Professional",
    avatar: "SP",
    text: "Mere team ke 5 members ne resume banaya iss tool se. Sab ke sab impressed the results se. Highly recommend!",
    rating: 5,
    tool: "Resume Builder",
    color: "#3b82f6",
  },
  {
    name: "Arjun Nair",
    role: "College Student",
    avatar: "AN",
    text: "Personality test itna accurate tha ki meri dost boli 'ye tumhare baare mein maine likha hai kya?' 😂 Must try!",
    rating: 5,
    tool: "Personality Test",
    color: "#06b6d4",
  },
];

export function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <div className="text-center mb-12">
        <span className="tag mb-4 inline-flex">⭐ Reviews</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Loved by <span className="gradient-text">thousands</span>
        </h2>
        <p className="text-slate-400">Real users. Real results. No signup required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div key={i} className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-violet-500/25 transition-all duration-300">
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(t.rating)].map((_, s) => (
                <svg key={s} width="14" height="14" viewBox="0 0 16 16" fill="#f59e0b">
                  <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"/>
                </svg>
              ))}
            </div>

            {/* Text */}
            <p className="text-slate-300 text-sm leading-relaxed flex-1">"{t.text}"</p>

            {/* Tool tag */}
            <span className="text-xs px-2.5 py-1 rounded-full w-fit"
              style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}25` }}>
              {t.tool}
            </span>

            {/* User */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${t.color}, #06b6d4)` }}>
                {t.avatar}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust bar */}
      <div className="mt-10 glass rounded-2xl p-5 flex flex-wrap items-center justify-center gap-8 text-center">
        {[
          { value: "4.9/5", label: "Average Rating" },
          { value: "50K+", label: "Happy Users" },
          { value: "0₹", label: "Forever Free" },
          { value: "No Signup", label: "Required" },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-xl font-bold gradient-text" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
