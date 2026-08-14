import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

const MAX_NAME_LENGTH = 80;
const MAX_COMPANY_LENGTH = 120;
const MAX_FEEDBACK_LENGTH = 800;

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ ok: true, reviews: [] });
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("id, rating, author_name, company, feedback, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("[reviews] Failed to fetch reviews", error);
    return NextResponse.json({ ok: true, reviews: [] });
  }

  return NextResponse.json({ ok: true, reviews: data ?? [] });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;
  const rating = Number(data.rating);
  const authorName = String(data.authorName ?? "").trim().slice(0, MAX_NAME_LENGTH);
  const company = String(data.company ?? "").trim().slice(0, MAX_COMPANY_LENGTH);
  const feedback = String(data.feedback ?? "").trim().slice(0, MAX_FEEDBACK_LENGTH);

  const fieldErrors: Partial<Record<"rating" | "authorName" | "feedback", string>> = {};

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    fieldErrors.rating = "Choose a rating between 1 and 5 stars.";
  }
  if (authorName.length < 2) {
    fieldErrors.authorName = "Enter your name.";
  }
  if (feedback.length < 10) {
    fieldErrors.feedback = "Tell us a bit more about your experience.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Reviews aren't connected yet. Please try again later." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("reviews").insert({
    rating,
    author_name: authorName,
    company: company || null,
    feedback,
    approved: false,
  });

  if (error) {
    console.error("[reviews] Failed to insert review", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks for the feedback! Your review is pending a quick approval.",
  });
}
