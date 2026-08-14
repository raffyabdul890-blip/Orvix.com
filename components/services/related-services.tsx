"use client";

import { getCategoryBySlug } from "@/lib/data/services";
import { ServicesGrid } from "@/components/services/services-grid";

export function RelatedServices({
  categorySlug,
  excludeSlug,
}: {
  categorySlug: string;
  excludeSlug: string;
}) {
  const category = getCategoryBySlug(categorySlug);
  const services =
    category?.services.filter((service) => service.slug !== excludeSlug) ??
    [];

  if (services.length === 0) {
    return null;
  }

  return <ServicesGrid services={services} />;
}
