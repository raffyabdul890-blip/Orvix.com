"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container-page py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 px-8 py-16 text-center sm:px-16"
      >
        <div className="bg-noise absolute inset-0" />
        <div className="absolute -top-24 -left-24 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 size-72 rounded-full bg-ink-950/20 blur-3xl" />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to build the version of your business that runs itself?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-brand-50/90">
            Tell us where you&apos;re stuck — site, growth, automation, security,
            or brand — and we&apos;ll map out exactly what it takes to fix it.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-700 hover:bg-white hover:text-brand-800 hover:shadow-xl hover:shadow-ink-950/20"
            >
              <Link href="/contact">
                Get a free quote
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/services">Browse all services</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
