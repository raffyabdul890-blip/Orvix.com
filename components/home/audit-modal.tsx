"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gauge, Loader2, Send, Sparkles, X } from "lucide-react";

import { toast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "orvix_audit_modal_seen";
const SHOW_DELAY_MS = 2000;

type Status = "idle" | "submitting" | "error";

export function AuditModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage unavailable (private mode, etc.) — treat as unseen.
    }
    if (seen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore — worst case the popup can show again next load.
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
          website: formData.get("website"),
          phone: formData.get("phone"),
          source: "audit",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      toast.success(data.message ?? "You're in — check your inbox shortly.");
      form.reset();
      setStatus("idle");
      setIsOpen(false);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[90] bg-ink-950/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Get a free growth audit"
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/90 p-7 shadow-2xl shadow-ink-900/20 backdrop-blur-lg sm:p-8"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                <X className="size-4" />
              </button>

              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-sm shadow-brand-600/30">
                <Gauge className="size-6" />
              </span>

              <h2 className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-ink-900">
                Get a{" "}
                <em className="font-accent bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent italic">
                  free growth audit.
                </em>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                We&apos;ll review your site, funnel, and SEO, then send back a
                short, no-obligation report on where you&apos;re leaving
                growth on the table.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
                <Input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  aria-label="Your name"
                />
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Work email"
                  aria-label="Work email"
                />
                <Input
                  name="website"
                  type="text"
                  autoComplete="url"
                  required
                  placeholder="Website URL"
                  aria-label="Website URL"
                />
                <Input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone (optional)"
                  aria-label="Phone (optional)"
                />

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
                      Sending
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Send my free audit
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-ink-400">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
