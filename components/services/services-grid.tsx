"use client";

import { motion } from "framer-motion";

import type { ServiceItem } from "@/lib/data/services";
import { ServiceCard } from "@/components/services/service-card";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </motion.div>
  );
}
