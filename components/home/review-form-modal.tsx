"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send, Star, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface ReviewSubmission {
  rating: number;
  authorName: string;
  company: string;
  feedback: string;
}

type Status = "idle" | "submitting" | "error";

export function ReviewFormModal({
  open,
  onClose,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitted: (review: ReviewSubmission) => void;
}) {
  const [rating, setRating] = React.useState(5);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const authorName = String(formData.get("authorName") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const feedback = String(formData.get("feedback") ?? "").trim();

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, authorName, company, feedback }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      onSubmitted({ rating, authorName, company, feedback });
      form.reset();
      setRating(5);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-ink-950/70 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Leave a review"
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/90 p-7 shadow-2xl shadow-ink-900/25 backdrop-blur-2xl sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                <X className="size-4" />
              </button>

              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
                Leave a review
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Worked with us? Tell other visitors what it was like.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
                <div>
                  <p className="mb-1.5 text-sm font-medium text-ink-900">Your rating</p>
                  <div
                    className="flex items-center gap-1"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-label={`${value} star${value === 1 ? "" : "s"}`}
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        className="p-0.5 transition-transform duration-150 hover:scale-110"
                      >
                        <Star
                          className={cn(
                            "size-6 transition-colors",
                            (hoverRating || rating) >= value
                              ? "fill-amber-400 text-amber-400"
                              : "fill-transparent text-ink-200"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  name="authorName"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  aria-label="Your name"
                />
                <Input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company / role (optional)"
                  aria-label="Company or role"
                />
                <Textarea
                  name="feedback"
                  required
                  rows={4}
                  placeholder="What was it like working with us?"
                  aria-label="Your feedback"
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
                      Submitting
                    </>
                  ) : (
                    <>
                      Submit review
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
