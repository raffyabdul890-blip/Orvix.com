"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";

import {
  serviceCategories,
  getAllServices,
  getCategoryBySlug,
} from "@/lib/data/services";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicesGrid } from "@/components/services/services-grid";

const ALL_VALUE = "all";

export function CategoryTabs({
  defaultValue = ALL_VALUE,
}: {
  defaultValue?: string;
}) {
  const [active, setActive] = React.useState(defaultValue);
  const allServices = React.useMemo(() => getAllServices(), []);

  const currentServices =
    active === ALL_VALUE
      ? allServices
      : (getCategoryBySlug(active)?.services ?? allServices);

  return (
    <div className="flex flex-col gap-8">
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="flex-wrap justify-center">
          <TabsTrigger value={ALL_VALUE} className="gap-1.5">
            {active === ALL_VALUE && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-brand-600 to-brand-500"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <LayoutGrid className="relative z-10 size-3.5" />
            <span className="relative z-10">All Services</span>
          </TabsTrigger>
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger
                key={category.slug}
                value={category.slug}
                className="gap-1.5"
              >
                {active === category.slug && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-brand-600 to-brand-500"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <Icon className="relative z-10 size-3.5" />
                <span className="relative z-10">{category.title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <ServicesGrid services={currentServices} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
