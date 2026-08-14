"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquarePlus, Quote, Star } from "lucide-react";

import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ReviewFormModal,
  type ReviewSubmission,
} from "@/components/home/review-form-modal";

interface Review {
  id: string;
  rating: number;
  author_name: string;
  company: string | null;
  feedback: string;
  created_at: string;
  pending?: boolean;
}

const AVATAR_PALETTE = [
  "from-brand-600 to-accent-500",
  "from-accent-500 to-brand-400",
  "from-brand-500 to-brand-800",
  "from-accent-400 to-brand-600",
];

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "?";
}

function paletteFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(
            "size-4",
            value <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-white/15"
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleSubmitted(submission: ReviewSubmission) {
    const optimistic: Review = {
      id: `local-${Date.now()}`,
      rating: submission.rating,
      author_name: submission.authorName,
      company: submission.company || null,
      feedback: submission.feedback,
      created_at: new Date().toISOString(),
      pending: true,
    };
    setReviews((prev) => [optimistic, ...prev]);
    setIsModalOpen(false);
    toast.success("Thanks for the feedback! Your review is pending a quick approval.");
  }

  return (
    <section className="relative bg-white py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container-page"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <Badge variant="brand">Client reviews</Badge>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Don&apos;t just take our word for it
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-ink-600">
            Real feedback from teams we&apos;ve built, grown, and automated
            for.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-7"
            onClick={() => setIsModalOpen(true)}
          >
            <MessageSquarePlus className="size-4" />
            Leave a review
          </Button>
        </motion.div>

        <div className="mt-14">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="h-56 animate-pulse rounded-3xl border border-ink-100 bg-ink-50/50"
                />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <motion.div
              variants={fadeUp}
              className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-dashed border-ink-200 px-8 py-14 text-center"
            >
              <Quote className="size-8 text-ink-200" />
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                No reviews yet — be the first to share what it&apos;s like
                working with Orvix.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={fadeUp}
                  className="flex flex-col rounded-3xl border border-ink-100 bg-ink-50/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-brand-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <StarRow rating={review.rating} />
                    {review.pending && (
                      <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-ink-600 uppercase">
                        Pending
                      </span>
                    )}
                  </div>

                  <Quote className="mt-4 size-6 text-ink-200" />
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                    {review.feedback}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-4">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
                        paletteFor(review.author_name)
                      )}
                    >
                      {initialsFor(review.author_name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-900">
                        {review.author_name}
                      </p>
                      {review.company && (
                        <p className="truncate text-xs text-ink-400">{review.company}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <ReviewFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </section>
  );
}
