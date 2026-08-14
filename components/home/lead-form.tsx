"use client";

import * as React from "react";
import { Loader2, Send } from "lucide-react";

import { serviceCategories } from "@/lib/data/services";
import { toast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "error";

export function LeadForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
          phone: formData.get("phone"),
          interest: formData.get("interest"),
          message: formData.get("message"),
          smsOptIn: formData.get("smsOptIn") === "on",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      toast.success(data.message ?? "Thanks — we'll be in touch shortly.");
      form.reset();
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-ink-900">
          Your name
        </label>
        <Input id="lead-name" name="name" type="text" autoComplete="name" required placeholder="Jordan Rivera" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-sm font-medium text-ink-900">
            Work email
          </label>
          <Input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jordan@company.com"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-medium text-ink-900">
            Phone
          </label>
          <Input id="lead-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 010-2030" />
        </div>
      </div>

      <div>
        <label htmlFor="lead-interest" className="mb-1.5 block text-sm font-medium text-ink-900">
          Primary interest
        </label>
        <Select id="lead-interest" name="interest" defaultValue="">
          <option value="">Not sure yet</option>
          {serviceCategories.map((category) => (
            <option key={category.slug} value={category.title}>
              {category.title} — {category.tagline}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="lead-message" className="mb-1.5 block text-sm font-medium text-ink-900">
          What are you trying to grow?
        </label>
        <Textarea
          id="lead-message"
          name="message"
          rows={3}
          required
          placeholder="e.g. more qualified leads from our website"
        />
      </div>

      <div className="flex flex-col gap-2.5 pt-1">
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-600">
          <Checkbox name="consent" required />
          I agree to be contacted about my inquiry by email or phone. This
          isn&apos;t a condition of purchase.
        </label>
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-400">
          <Checkbox name="smsOptIn" />
          I&apos;d also like to receive marketing texts from Orvix. Msg &amp;
          data rates may apply, message frequency varies. Reply STOP to opt
          out, HELP for help.
        </label>
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        disabled={status === "submitting"}
        className="mt-1 w-full"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting
          </>
        ) : (
          <>
            Submit
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
