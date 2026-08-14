import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { serviceCategories, type ServiceCategorySlug } from "@/lib/data/services";

export function ServicesOverviewPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {serviceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              href={`/services?category=${category.slug}`}
              onClick={onNavigate}
              className="group flex flex-col gap-3 rounded-2xl border border-ink-100 p-4 transition-colors hover:border-brand-200 hover:bg-ink-50/60"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                <Icon className="size-4.5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {category.title}
                </p>
                <p className="mt-0.5 text-xs text-ink-400">
                  {category.services.length} services
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
        <p className="text-sm text-ink-600">27 services across 5 disciplines.</p>
        <Link
          href="/services"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
        >
          Browse all services
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export function CategoryPanel({
  categorySlug,
  onNavigate,
}: {
  categorySlug: ServiceCategorySlug;
  onNavigate?: () => void;
}) {
  const category = serviceCategories.find((item) => item.slug === categorySlug);

  if (!category) return null;

  const Icon = category.icon;

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 p-5 text-white">
        <div>
          <span className="flex size-10 items-center justify-center rounded-xl bg-white/15">
            <Icon className="size-5" />
          </span>
          <p className="mt-4 font-display text-lg font-semibold">
            {category.title}
          </p>
          <p className="text-sm text-white/80">{category.tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/85">
            {category.description}
          </p>
        </div>
        <Link
          href={`/services?category=${category.slug}`}
          onClick={onNavigate}
          className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition-transform hover:scale-[1.02]"
        >
          View all {category.title}
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
        {category.services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            onClick={onNavigate}
            className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
          >
            <service.icon className="size-4 shrink-0 text-brand-600" />
            <span className="truncate">{service.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
