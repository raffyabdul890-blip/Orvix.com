"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/auth/google-button";

type Status = "idle" | "submitting";

export function SignUpForm() {
  const router = useRouter();
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("idle");
      setErrorMessage(error.message);
      return;
    }

    if (data.session) {
      toast.success("Account created — welcome to Orvix!");
      router.push("/");
      router.refresh();
      return;
    }

    toast.success("Check your email to confirm your account.");
    setStatus("idle");
    router.push("/sign-in");
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
      <div>
        <label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium text-ink-900">
          Full name
        </label>
        <Input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Jordan Rivera"
        />
      </div>
      <div>
        <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-ink-900">
          Work email
        </label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="jordan@company.com"
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-ink-900">
          Password
        </label>
        <Input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="At least 6 characters"
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
            Creating account
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Create account
          </>
        )}
      </Button>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-ink-100" />
        <span className="text-xs text-ink-400">or</span>
        <span className="h-px flex-1 bg-ink-100" />
      </div>

      <GoogleButton label="Sign up with Google" />
    </form>
  );
}
