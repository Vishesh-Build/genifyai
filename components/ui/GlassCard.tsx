"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glow?: "purple" | "blue" | "cyan" | "none";
}

const glowColors = {
  purple: "hover:shadow-glow",
  blue: "hover:shadow-glow-blue",
  cyan: "hover:shadow-glow-cyan",
  none: "",
};

export function GlassCard({ children, className = "", hover = true, delay = 0, glow = "purple" }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass ${hover ? `glass-hover ${glowColors[glow]}` : ""} p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
