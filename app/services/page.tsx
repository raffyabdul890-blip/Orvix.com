import type { Metadata } from "next";

import { CategoryTabs } from "@/components/services/category-tabs";
import { getAllServices, serviceCategories } from "@/lib/data/services";

const serviceCount = getAllServices().length;
const categoryCount = serviceCategories.length;

export const metadata: Metadata = {
  title: "Services",
  description: `Browse all ${serviceCount} services across ${serviceCategories
    .map((category) => category.title.toLowerCase())
    .join(", ")} — everything Orvix offers to help your business grow.`,
};

const CATEGORY_SLUGS = serviceCategories.map((category) => category.slug);

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const defaultValue =
    category && CATEGORY_SLUGS.includes(category as (typeof CATEGORY_SLUGS)[number])
      ? category
      : "all";

  return (
    <div className="bg-white">
      <section className="container-page pt-20 pb-4 text-center sm:pt-24">
        <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
          Services
        </span>
        <h1 className="mx-auto mt-3 max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
          Everything we build, grow, automate & protect
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance text-ink-600">
          {serviceCount} services across {categoryCount} disciplines. Filter
          by category or browse everything at once.
        </p>
      </section>

      <section className="container-page pb-24">
        <CategoryTabs defaultValue={defaultValue} />
      </section>
    </div>
  );
}
