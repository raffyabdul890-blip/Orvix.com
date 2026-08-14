"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { serviceCategories } from "@/lib/data/services";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ServicesOverview() {
  return (
    <section className="container-page py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
          What we do
        </span>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Five disciplines, one accountable team
        </h2>
        <p className="mt-4 text-balance text-ink-600">
          Every service below plugs into the others — your site feeds your
          SEO, your SEO feeds your AI agents, your infrastructure keeps it
          all secure.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {serviceCategories.map((category, index) => {
          const Icon = category.icon;
          const spanLast =
            index === serviceCategories.length - 1 &&
            serviceCategories.length % 3 === 2;

          return (
            <motion.div
              key={category.slug}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`group relative flex flex-col rounded-3xl border border-ink-100 bg-ink-50/50 p-7 transition-colors duration-300 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-brand-600/10 ${
                spanLast ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <Link
                href={`/services?category=${category.slug}`}
                className="absolute inset-0 z-10 rounded-3xl focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
              >
                <span className="sr-only">Explore {category.title}</span>
              </Link>

              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-sm shadow-brand-600/25">
                  <Icon className="size-6" />
                </span>
                <span className="text-xs font-medium text-ink-400">
                  {category.services.length} services
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink-900">
                {category.title}
              </h3>
              <p className="text-sm font-medium text-brand-600">
                {category.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {category.description}
              </p>

              <span className="relative z-20 mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors duration-300 group-hover:text-brand-600">
                Explore
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/services">
            View all 27 services
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
