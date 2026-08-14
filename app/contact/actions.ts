"use server";

import { sendLeadNotification } from "@/lib/email";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<"name" | "email" | "message", string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (name.length < 2) {
    fieldErrors.name = "Enter your full name.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (message.length < 10) {
    fieldErrors.message = "Tell us a bit more about your project.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  await sendLeadNotification({
    name,
    email,
    company: company || undefined,
    interest: service || undefined,
    message,
    source: "contact",
  });

  return {
    status: "success",
    message:
      "Thanks — your message is in. We'll get back to you within one business day.",
    fieldErrors: {},
  };
}
