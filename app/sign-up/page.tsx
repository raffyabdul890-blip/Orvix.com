import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { WaitlistForm } from "@/components/auth/waitlist-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Join the waitlist for Orvix client accounts.",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-ink-50/50">
      <div className="container-page flex flex-col items-center py-20">
        <div className="w-full max-w-md rounded-3xl border border-ink-100 bg-white p-8 shadow-sm shadow-ink-900/5 sm:p-10">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
            <Sparkles className="size-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900">
            Client accounts are launching soon
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            We&apos;re building a client portal to track projects, approvals,
            and reporting in one place. Join the waitlist and we&apos;ll
            email you the moment it opens.
          </p>

          <div className="mt-7">
            <WaitlistForm />
          </div>

          <p className="mt-6 text-center text-sm text-ink-400">
            Already working with us?{" "}
            <Link href="/contact" className="font-medium text-brand-600 hover:underline">
              Contact your strategist
            </Link>
          </p>
        </div>

        <p className="mt-6 text-sm text-ink-400">
          Have an account question?{" "}
          <Link href="/sign-in" className="font-medium text-ink-600 hover:text-ink-900">
            Go to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
