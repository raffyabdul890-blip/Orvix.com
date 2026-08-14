"use client";

import { motion, type Variants } from "framer-motion";
import { Layers, Lock, Rocket, Users } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "One integrated stack",
    description:
      "Your site, SEO, ads, automations, and infrastructure are built to work together from day one — not stitched together after the fact.",
  },
  {
    icon: Rocket,
    title: "Built for speed",
    description:
      "Modern tooling and hand-written code mean faster load times, faster launches, and fewer moving parts to maintain.",
  },
  {
    icon: Lock,
    title: "Security by default",
    description:
      "Hardened infrastructure, access controls, and monitoring are standard practice, not an afterthought or add-on.",
  },
  {
    icon: Users,
    title: "A team, not a ticket queue",
    description:
      "You work directly with the people building your project, with clear timelines and no offshore hand-offs.",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhyUs() {
  return (
    <section className="bg-ink-950 py-24">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold tracking-wide text-accent-400 uppercase">
              Why Orvix
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Everything a growing business needs, nothing it doesn&apos;t
            </h2>
            <p className="mt-4 text-balance leading-relaxed text-ink-400">
              Most agencies specialize in one slice of the stack. We built
              Orvix so you never have to manage five different vendors to
              ship one idea.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-accent-400/30 hover:bg-white/[0.06]"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent-400/10 text-accent-400">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
