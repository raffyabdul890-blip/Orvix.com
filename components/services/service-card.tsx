"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import type { ServiceItem } from "@/lib/data/services";
import { Badge } from "@/components/ui/badge";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/10"
    >
      <Link
        href={`/services/${service.slug}`}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
      >
        <span className="sr-only">View {service.name} details</span>
      </Link>

      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-300/20 text-brand-600 transition-colors duration-300 group-hover:from-brand-600 group-hover:to-accent-500 group-hover:text-white">
        <Icon className="size-6" />
      </span>

      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-900">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
        {service.shortDescription}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4">
        <div className="flex flex-col">
          <span className="font-display text-base font-semibold text-ink-900">
            {service.startingPrice}
            <span className="ml-1 text-xs font-normal text-ink-400">
              {service.priceNote}
            </span>
          </span>
          <Badge variant="outline" className="mt-1.5 w-fit">
            {service.deliveryTime}
          </Badge>
        </div>
        <span className="relative z-20 flex size-9 items-center justify-center rounded-full bg-ink-100 text-ink-900 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.div>
  );
}
