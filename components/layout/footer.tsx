import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { serviceCategories } from "@/lib/data/services";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const FOOTER_CATEGORY_LABELS: Record<string, string> = {
  development: "Build",
  grow: "Grow",
  automations: "Automate",
  security: "Secure",
  branding: "Brand",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-200">
      <div className="container-page flex flex-col items-center gap-7 py-20 text-center">
        <p className="text-sm font-semibold tracking-wide text-accent-400 uppercase">
          Ready when you are
        </p>
        <h2 className="max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Every system above works together — so your business{" "}
          <span className="font-accent bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent italic">
            grows.
          </span>
        </h2>
        <Button asChild variant="brand" size="lg">
          <Link href="/contact">
            Start your project
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_2.4fr] lg:gap-6">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-xl font-semibold text-white"
            >
              <Image
                src="/orvix-logo.png"
                alt={siteConfig.name}
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-xl"
              />
              {siteConfig.name}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-ink-400">
              Digital marketing that rises above. Strategy, creative, and
              engineering under one roof.
            </p>
            <Button asChild variant="outline" size="sm" className="w-fit border-white/15 bg-transparent text-white hover:border-accent-400/40 hover:text-accent-400">
              <Link href="/contact">
                Contact us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {serviceCategories.map((category) => (
              <div key={category.slug} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                  {FOOTER_CATEGORY_LABELS[category.slug] ?? category.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {category.services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm text-ink-400 transition-colors hover:text-accent-400"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                Company
              </h3>
              <ul className="flex flex-col gap-2.5">
                {siteConfig.companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 transition-colors hover:text-accent-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {siteConfig.companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-accent-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
