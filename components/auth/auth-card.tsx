"use client";

import { motion } from "framer-motion";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-500/25 via-accent-400/15 to-transparent blur-2xl" />
      <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 text-center shadow-2xl shadow-ink-900/10 backdrop-blur-2xl sm:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        {children}
      </div>
    </motion.div>
  );
}
