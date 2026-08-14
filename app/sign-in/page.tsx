import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Orvix client accounts are launching soon.",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-ink-50/50">
      <div className="container-page flex flex-col items-center py-20">
        <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-sm shadow-ink-900/5 sm:p-10">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-ink-900 text-white">
            <Lock className="size-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900">
            Accounts aren&apos;t live yet
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            We&apos;re building a client portal for tracking projects,
            approvals, and reporting. If you&apos;re an active client, reach
            out and we&apos;ll get you sorted directly.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3">
            <Button asChild variant="brand" size="lg" className="w-full">
              <Link href="/sign-up">
                Join the waitlist
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/contact">Contact your strategist</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
