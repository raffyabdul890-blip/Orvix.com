import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { serviceCategories } from "@/lib/data/services";

export default function DashboardShopPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Shop
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          Browse every service Orvix offers. Request one and a strategist
          will follow up to scope it.
        </p>
      </div>

      {serviceCategories.map((category) => (
        <div key={category.slug}>
          <div className="flex items-center gap-2.5">
            <category.icon className="size-4.5 text-brand-600" />
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink-900">
              {category.title}
            </h2>
            <span className="text-xs text-ink-400">{category.tagline}</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => (
              <div
                key={service.slug}
                className="flex flex-col rounded-2xl border border-ink-100 bg-white p-5 transition-all duration-300 hover:scale-[1.02] hover:border-brand-200 hover:shadow-lg"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-accent-300/20 text-brand-600">
                  <service.icon className="size-4.5" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">
                  {service.name}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-600">
                  {service.shortDescription}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                  <span className="text-sm font-semibold text-ink-900">
                    {service.startingPrice}
                    <span className="ml-1 text-xs font-normal text-ink-400">
                      {service.priceNote}
                    </span>
                  </span>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                  >
                    Request
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
