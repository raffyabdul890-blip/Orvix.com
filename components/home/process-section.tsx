"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Rocket, Target, TrendingUp } from "lucide-react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    icon: Compass,
    description:
      "We audit your funnel, tech stack, and market position to find the highest-leverage moves first.",
  },
  {
    number: "02",
    title: "Strategize",
    icon: Target,
    description:
      "You get a prioritized roadmap with clear timelines, owners, and success metrics — no guesswork.",
  },
  {
    number: "03",
    title: "Execute",
    icon: Rocket,
    description:
      "Our senior team builds, ships, and iterates in tight sprints, with you in the loop at every step.",
  },
  {
    number: "04",
    title: "Scale",
    icon: TrendingUp,
    description:
      "Once it's working, we systemize and automate it so growth compounds without more headcount.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-[#f8fafc] py-24">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="lg:sticky lg:top-28"
        >
          <Badge variant="brand">Process</Badge>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            A process built for momentum.
          </h2>
          <p className="mt-4 max-w-md text-balance leading-relaxed text-ink-600">
            No 12-week onboarding, no committee reviews. Just a tight loop of
            discover, ship, measure, and scale.
          </p>
          <Button asChild variant="brand" size="lg" className="mt-8">
            <Link href="/contact">
              Book a discovery call
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-4"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="group flex items-start gap-5 rounded-3xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-brand-200 hover:shadow-lg sm:p-7"
              >
                <span className="font-display shrink-0 bg-gradient-to-br from-ink-200 to-ink-100 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                  {step.number}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
