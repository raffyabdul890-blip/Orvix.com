import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your Orvix account.",
};

export default function SignUpPage() {
  return (
    <div className="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden bg-white">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,black,transparent)]" />
      <div className="absolute top-[-8rem] left-[-8rem] -z-10 size-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-8rem] -z-10 size-96 rounded-full bg-accent-400/20 blur-3xl" />

      <div className="container-page flex flex-col items-center py-20">
        <AuthCard>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-sm shadow-brand-600/30">
            <Sparkles className="size-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            Sign up to track projects, approvals, and reporting in one place.
          </p>
          <div className="mt-7 w-full">
            <SignUpForm />
          </div>
        </AuthCard>

        <p className="mt-6 text-sm text-ink-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-ink-600 hover:text-ink-900">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
