"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { getAllServices } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

const allServices = getAllServices();

function fieldClasses(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
    hasError ? "border-red-400" : "border-ink-200"
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="brand"
      size="lg"
      className="w-full"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Sending
        </>
      ) : (
        <>
          Send message
          <Send className="size-4" />
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-brand-100 bg-brand-50 px-8 py-14 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
          Message sent
        </h3>
        <p className="max-w-sm text-sm text-ink-600">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-ink-900"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jordan Rivera"
            className={fieldClasses(Boolean(state.fieldErrors.name))}
          />
          {state.fieldErrors.name && (
            <p className="mt-1.5 text-xs text-red-500">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-ink-900"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jordan@company.com"
            className={fieldClasses(Boolean(state.fieldErrors.email))}
          />
          {state.fieldErrors.email && (
            <p className="mt-1.5 text-xs text-red-500">
              {state.fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-sm font-medium text-ink-900"
          >
            Company{" "}
            <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            className={fieldClasses(false)}
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-1.5 block text-sm font-medium text-ink-900"
          >
            Service you&apos;re interested in
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className={fieldClasses(false)}
          >
            <option value="">Not sure yet</option>
            {allServices.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-ink-900"
        >
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us what you're trying to build or fix..."
          className={cn(fieldClasses(Boolean(state.fieldErrors.message)), "resize-none")}
        />
        {state.fieldErrors.message && (
          <p className="mt-1.5 text-xs text-red-500">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.status === "error" && !Object.keys(state.fieldErrors).length && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
