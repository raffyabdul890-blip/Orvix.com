import { NextResponse } from "next/server";

import { sendLeadNotification } from "@/lib/email";
import { insertLead } from "@/lib/leads";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCES = new Set(["hero", "contact", "waitlist", "audit"]);

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
  const sourceInput = String(data.source ?? "hero");
  const source = (VALID_SOURCES.has(sourceInput) ? sourceInput : "hero") as
    | "hero"
    | "contact"
    | "waitlist"
    | "audit";

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const website = String(data.website ?? "").trim();
  const interest = String(data.interest ?? "").trim();
  const smsOptIn = Boolean(data.smsOptIn);
  const message =
    String(data.message ?? "").trim() ||
    (source === "waitlist"
      ? "Requested early access to Orvix accounts."
      : source === "audit"
        ? "Requested a free growth audit."
        : "");

  const fieldErrors: Partial<Record<"name" | "email" | "message", string>> = {};

  if (name.length < 2) {
    fieldErrors.name = "Enter your full name.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (message.length < 5) {
    fieldErrors.message = "Tell us a bit more about your project.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", fieldErrors },
      { status: 422 }
    );
  }

  const [emailResult] = await Promise.allSettled([
    sendLeadNotification({
      name,
      email,
      phone: phone || undefined,
      website: website || undefined,
      interest: interest || undefined,
      message,
      smsOptIn,
      source,
    }),
    insertLead({
      name,
      email,
      phone: phone || undefined,
      website: website || undefined,
      interest: interest || undefined,
      message,
      smsOptIn,
      source,
    }),
  ]);

  const sent = emailResult.status === "fulfilled" ? emailResult.value.sent : false;

  const successMessage =
    source === "waitlist"
      ? "You're on the list — we'll email you the moment account access opens."
      : source === "audit"
        ? "You're in — we'll email your free growth audit shortly."
        : "Thanks — your message is in. A senior strategist will reach out shortly.";

  return NextResponse.json({ ok: true, sent, message: successMessage });
}
