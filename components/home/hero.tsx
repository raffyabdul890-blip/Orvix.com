"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

import { getAllServices } from "@/lib/data/services";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/home/lead-form";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const serviceCount = getAllServices().length;

const proofMetrics = [
  { value: String(serviceCount), label: "Services" },
  { value: "4.9★", label: "Rated" },
  { value: "48h", label: "Kickoff" },
  { value: "14d", label: "Guarantee" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8fafc]">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute top-[-10rem] right-[-10rem] -z-10 size-[32rem] rounded-full bg-brand-400/25 blur-3xl" />
      <div className="absolute top-40 left-[-8rem] -z-10 size-96 rounded-full bg-accent-400/15 blur-3xl" />

      <div className="container-page grid gap-16 py-24 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-ink-600 uppercase shadow-sm">
              <span className="size-1.5 rounded-full bg-brand-600" />
              The growth operating system for ambitious businesses
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
          >
            Run every system your business needs{" "}
            <em className="font-accent italic">from</em>{" "}
            <strong className="font-display font-bold text-brand-600">
              one platform.
            </strong>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-600"
          >
            Websites, funnels, ads, SEO, automation, AI agents, and brand —
            built, deployed, and managed by Orvix. One senior team, one
            operating system.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild variant="brand" size="lg">
              <Link href="/dashboard">
                Explore the platform
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View {serviceCount} services</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid w-full max-w-md grid-cols-4 gap-4 border-t border-ink-100 pt-8"
          >
            {proofMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-display flex items-center gap-1 text-2xl font-semibold text-ink-900 sm:text-3xl">
                  {metric.label === "Rated" && (
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                  )}
                  {metric.value}
                </p>
                <p className="mt-1 text-xs tracking-wide text-ink-400 uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-400/20 to-accent-400/20 blur-2xl" />
          <div className="rounded-3xl border border-ink-100 bg-white/90 p-7 shadow-2xl shadow-ink-900/10 backdrop-blur-xl sm:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
              Start your{" "}
              <em className="font-accent bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent italic">
                growth plan.
              </em>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Tell us where you want to grow. A senior strategist will reach
              out shortly.
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
