import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Tag } from "lucide-react";

import {
  getAllServices,
  getCategoryForService,
  getServiceBySlug,
} from "@/lib/data/services";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RelatedServices } from "@/components/services/related-services";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const category = getCategoryForService(slug);

  if (!service || !category) {
    notFound();
  }

  const Icon = service.icon;
  const hasRelatedServices = category.services.length > 1;

  return (
    <div className="bg-white">
      <section className="container-page pt-16 sm:pt-20">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
        >
          <ArrowLeft className="size-4" />
          Back to all services
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <Badge variant="brand">
              <category.icon className="size-3.5" />
              {category.title}
            </Badge>

            <div className="mt-5 flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-sm shadow-brand-600/25">
                <Icon className="size-7" />
              </span>
              <h1 className="text-balance font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                {service.name}
              </h1>
            </div>

            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-600">
              {service.description}
            </p>

            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                What&apos;s included
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-2xl border border-ink-100 bg-ink-50/50 px-4 py-3 text-sm text-ink-800"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-ink-100 bg-ink-50/50 p-7">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-ink-900">
                  {service.startingPrice}
                </span>
                <span className="text-sm text-ink-400">
                  {service.priceNote}
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-ink-100 pt-5 text-sm text-ink-600">
                <div className="flex items-center gap-2.5">
                  <Clock className="size-4 text-brand-600" />
                  Delivery: {service.deliveryTime}
                </div>
                <div className="flex items-center gap-2.5">
                  <Tag className="size-4 text-brand-600" />
                  Category: {category.title}
                </div>
              </div>

              <Button asChild variant="brand" size="lg" className="mt-7 w-full">
                <Link href="/contact">
                  Request this service
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-ink-400">
                Free scoping call, no obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {hasRelatedServices && (
        <section className="container-page py-24">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
              More in {category.title}
            </h2>
            <Link
              href={`/services?category=${category.slug}`}
              className="hidden items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline sm:inline-flex"
            >
              View category
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8">
            <RelatedServices
              categorySlug={category.slug}
              excludeSlug={service.slug}
            />
          </div>
        </section>
      )}
    </div>
  );
}
