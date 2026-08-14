"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingBag,
  Cpu,
  type LucideIcon,
} from "lucide-react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";

interface Industry {
  icon: LucideIcon;
  label: string;
}

const INDUSTRIES: Industry[] = [
  { icon: Cpu, label: "SaaS & Tech" },
  { icon: ShoppingBag, label: "Ecommerce & DTC" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Landmark, label: "Finance & Fintech" },
  { icon: Building2, label: "Real Estate" },
  { icon: Briefcase, label: "B2B Services" },
  { icon: Plane, label: "Hospitality & Travel" },
  { icon: GraduationCap, label: "Education" },
];

export function IndustriesSection() {
  return (
    <section className="relative bg-white py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container-page"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge variant="brand">Industries</Badge>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Built for the industries that move fast
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-ink-600">
            We&apos;ve shipped growth systems across categories with very
            different buyers, sales cycles, and compliance needs.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.label}
                variants={fadeUp}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-100 bg-ink-50/50 px-5 py-5 transition-all duration-300 hover:scale-[1.02] hover:border-brand-200 hover:bg-white hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-accent-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-medium text-ink-900">
                    {industry.label}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 -translate-x-1 text-ink-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-brand-600 group-hover:opacity-100"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
