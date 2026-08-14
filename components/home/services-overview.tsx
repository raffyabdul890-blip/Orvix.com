"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { getAllServices, serviceCategories } from "@/lib/data/services";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function cheapestPrice(services: { startingPrice: string }[]) {
  const amounts = services.map((service) =>
    Number(service.startingPrice.replace(/[^0-9]/g, ""))
  );
  return Math.min(...amounts).toLocaleString("en-US");
}

const serviceCount = getAllServices().length;
const categoryCount = serviceCategories.length;

export function ServicesOverview() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-24">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge variant="brand">What we do</Badge>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            {categoryCount} disciplines, one accountable team
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-ink-600">
            Every service below plugs into the others — your site feeds your
            SEO, your SEO feeds your AI agents, your infrastructure keeps it
            all secure.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const price = cheapestPrice(category.services);

            return (
              <motion.div key={category.slug} variants={fadeUp} className="group relative">
                <Link
                  href={`/services?category=${category.slug}`}
                  className="absolute inset-0 z-10 rounded-3xl focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                >
                  <span className="sr-only">Explore {category.title}</span>
                </Link>

                <div className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:border-brand-200 group-hover:shadow-xl group-hover:shadow-brand-600/10">
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-sm shadow-brand-600/25">
                      <Icon className="size-6" />
                    </span>
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-brand-700">
                      From ${price}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-900">
                    {category.title}
                  </h3>
                  <p className="text-sm font-medium text-brand-600">
                    {category.tagline}
                  </p>

                  <ul className="mt-4 flex-1 space-y-1.5">
                    {category.services.slice(0, 4).map((service) => (
                      <li
                        key={service.slug}
                        className="flex items-baseline gap-2 text-sm text-ink-600"
                      >
                        <span className="text-ink-400" aria-hidden>
                          –
                        </span>
                        <span className="line-clamp-1">{service.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-t border-ink-100 pt-4">
                    <span className="relative z-20 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors duration-300 group-hover:text-brand-600">
                      Explore
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">
              View all {serviceCount} services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
