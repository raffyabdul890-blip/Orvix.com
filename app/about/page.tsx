import type { Metadata } from "next";
import { Compass, Hammer, Rocket } from "lucide-react";

import { CtaSection } from "@/components/home/cta-section";
import { getAllServices, serviceCategories } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Orvix is a full-service digital partner covering development, growth marketing, AI automations, security, and branding.",
};

const stats = [
  { value: String(getAllServices().length), label: "services offered" },
  { value: String(serviceCategories.length), label: "integrated disciplines" },
  { value: "1", label: "accountable team" },
];

const process = [
  {
    icon: Compass,
    title: "Discover",
    description:
      "We start by understanding your business, your bottleneck, and what success actually looks like — not a generic checklist.",
  },
  {
    icon: Hammer,
    title: "Design & build",
    description:
      "We design and build in the open, with regular check-ins, so what ships is exactly what you approved.",
  },
  {
    icon: Rocket,
    title: "Launch & grow",
    description:
      "Launch is the start, not the finish line. We stay attached to the outcome through growth, automation, and iteration.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="container-page pt-20 pb-16 sm:pt-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            About Orvix
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            One team behind every part of your growth
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-600">
            Orvix exists because most businesses end up managing five
            disconnected vendors just to launch one idea — a web shop, an
            SEO freelancer, an ad agency, an automation consultant, and an IT
            contractor. We combined all five into one accountable team so
            every part of your stack is built to work together.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-ink-100 pt-10 sm:max-w-lg">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-50/50 py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
            How we work
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col rounded-3xl border border-ink-100 bg-white p-7"
                >
                  <span className="font-display text-sm font-semibold text-ink-200">
                    0{index + 1}
                  </span>
                  <span className="mt-3 flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
