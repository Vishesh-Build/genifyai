import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          purple: "#7c3aed",
          violet: "#8b5cf6",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          glow: "#a855f7",
        },
        dark: {
          950: "#020008",
          900: "#06000f",
          800: "#0d0020",
          700: "#150030",
          600: "#1e0040",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.25), transparent)",
        "card-glow":
          "radial-gradient(ellipse at top, rgba(139,92,246,0.15), transparent 70%)",
        "gradient-brand":
          "linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #06b6d4 100%)",
        "gradient-text":
          "linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
      },
      backgroundSize: {
        "grid-sm": "30px 30px",
        "grid-md": "50px 50px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.2)",
        "glow-sm": "0 0 10px rgba(139,92,246,0.3)",
        "glow-blue": "0 0 20px rgba(59,130,246,0.4)",
        "glow-cyan": "0 0 20px rgba(6,182,212,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139,92,246,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(139,92,246,0.3)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
