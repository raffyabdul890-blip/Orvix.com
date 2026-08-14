import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
        <Compass className="size-8" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        404 — Page not found
      </h1>
      <p className="mt-3 max-w-md text-balance text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="brand">
          <Link href="/">
            Back to home
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">Browse services</Link>
        </Button>
      </div>
    </div>
  );
}
