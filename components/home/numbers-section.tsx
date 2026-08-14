"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";

const STATS = [
  { value: "284%", label: "Average organic growth" },
  { value: "6.4x", label: "Blended paid ROAS" },
  { value: "41%", label: "Conversion lift" },
  { value: "98%", label: "Client retention" },
];

export function NumbersSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container-page"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge variant="brand">The numbers</Badge>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Results our clients can bank on
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-ink-600">
            We track outcomes, not vanity metrics. Here&apos;s the blended
            average across active accounts over the last 12 months.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center rounded-3xl border border-ink-100 bg-ink-50/50 px-6 py-10 text-center transition-all duration-300 hover:scale-[1.02] hover:border-brand-200 hover:bg-white hover:shadow-lg"
            >
              <p className="font-display bg-gradient-to-br from-brand-700 to-brand-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-snug text-ink-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
