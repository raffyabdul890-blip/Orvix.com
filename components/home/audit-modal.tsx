"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gauge, Loader2, Send, Sparkles, X } from "lucide-react";

import { serviceCategories } from "@/lib/data/services";
import { toast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "orvix_audit_modal_seen";
const SHOW_DELAY_MS = 2000;

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "United States" },
  { code: "+44", flag: "🇬🇧", label: "United Kingdom" },
  { code: "+92", flag: "🇵🇰", label: "Pakistan" },
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+966", flag: "🇸🇦", label: "Saudi Arabia" },
  { code: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "+33", flag: "🇫🇷", label: "France" },
  { code: "+34", flag: "🇪🇸", label: "Spain" },
  { code: "+39", flag: "🇮🇹", label: "Italy" },
  { code: "+86", flag: "🇨🇳", label: "China" },
  { code: "+81", flag: "🇯🇵", label: "Japan" },
  { code: "+82", flag: "🇰🇷", label: "South Korea" },
  { code: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "+60", flag: "🇲🇾", label: "Malaysia" },
  { code: "+62", flag: "🇮🇩", label: "Indonesia" },
  { code: "+63", flag: "🇵🇭", label: "Philippines" },
  { code: "+90", flag: "🇹🇷", label: "Turkey" },
  { code: "+20", flag: "🇪🇬", label: "Egypt" },
  { code: "+234", flag: "🇳🇬", label: "Nigeria" },
  { code: "+27", flag: "🇿🇦", label: "South Africa" },
  { code: "+55", flag: "🇧🇷", label: "Brazil" },
  { code: "+52", flag: "🇲🇽", label: "Mexico" },
  { code: "+880", flag: "🇧🇩", label: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", label: "Sri Lanka" },
  { code: "+64", flag: "🇳🇿", label: "New Zealand" },
] as const;

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
    const countryCode = String(formData.get("countryCode") ?? "+1");
    const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          website: formData.get("website"),
          phone: phoneNumber ? `${countryCode} ${phoneNumber}` : "",
          interest: formData.get("interest"),
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
            className="fixed inset-0 z-[90] bg-ink-950/70 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Get a free growth audit"
              className="relative w-full max-w-md"
            >
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-500/30 via-accent-400/20 to-transparent blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-7 shadow-2xl shadow-ink-900/25 backdrop-blur-2xl sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

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
                  We&apos;ll review your site, funnel, and SEO, then send back
                  a short, no-obligation report on where you&apos;re leaving
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

                  <div className="flex gap-2">
                    <Select
                      name="countryCode"
                      defaultValue="+1"
                      aria-label="Country code"
                      className="w-[6.5rem] shrink-0 px-3"
                    >
                      {COUNTRY_CODES.map((country) => (
                        <option key={country.label} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </Select>
                    <Input
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="Phone number"
                      aria-label="Phone number"
                      className="flex-1"
                    />
                  </div>

                  <Select
                    name="interest"
                    defaultValue=""
                    required
                    aria-label="Primary interest"
                  >
                    <option value="" disabled>
                      Primary interest
                    </option>
                    {serviceCategories.map((category) => (
                      <option key={category.slug} value={category.title}>
                        {category.title} — {category.tagline}
                      </option>
                    ))}
                  </Select>

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
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
