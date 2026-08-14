"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          source: "waitlist",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setSuccessMessage(data.message);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-6 py-8 text-center"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckCircle2 className="size-6" />
        </span>
        <p className="text-sm text-ink-700">{successMessage}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="waitlist-name" className="mb-1.5 block text-sm font-medium text-ink-900">
          Full name
        </label>
        <Input id="waitlist-name" name="name" type="text" autoComplete="name" required placeholder="Jordan Rivera" />
      </div>
      <div>
        <label htmlFor="waitlist-email" className="mb-1.5 block text-sm font-medium text-ink-900">
          Work email
        </label>
        <Input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="jordan@company.com"
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <Button type="submit" variant="brand" size="lg" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Joining
          </>
        ) : (
          <>
            Join the waitlist
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
