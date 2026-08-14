"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/auth/google-button";

type Status = "idle" | "submitting";

export function SignInForm({ next = "/dashboard" }: { next?: string }) {
  const router = useRouter();
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("idle");
      setErrorMessage(error.message);
      return;
    }

    toast.success("Welcome back!");
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
      <div>
        <label htmlFor="signin-email" className="mb-1.5 block text-sm font-medium text-ink-900">
          Email
        </label>
        <Input
          id="signin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="jordan@company.com"
        />
      </div>
      <div>
        <label htmlFor="signin-password" className="mb-1.5 block text-sm font-medium text-ink-900">
          Password
        </label>
        <Input
          id="signin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="mt-1 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in
          </>
        ) : (
          <>
            Sign in
            <LogIn className="size-4" />
          </>
        )}
      </Button>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-ink-100" />
        <span className="text-xs text-ink-400">or</span>
        <span className="h-px flex-1 bg-ink-100" />
      </div>

      <GoogleButton next={next} />
    </form>
  );
}
