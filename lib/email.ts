import { Resend } from "resend";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  interest?: string;
  message: string;
  smsOptIn?: boolean;
  source: "hero" | "contact" | "waitlist" | "audit";
}

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "Orvix Leads <leads@orvix.com>";
const TO_EMAIL = process.env.LEAD_TO_EMAIL;

export async function sendLeadNotification(
  lead: LeadPayload
): Promise<{ sent: boolean }> {
  if (!resend || !TO_EMAIL) {
    console.warn(
      "[lead] RESEND_API_KEY or LEAD_TO_EMAIL is not configured — lead was captured but no email was sent.",
      { name: lead.name, email: lead.email, source: lead.source }
    );
    return { sent: false };
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: lead.email,
    subject: `New lead: ${lead.name} (${lead.source})`,
    html: renderLeadEmailHtml(lead),
  });

  if (error) {
    console.error("[lead] Failed to send lead notification email", error);
    return { sent: false };
  }

  return { sent: true };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderLeadEmailHtml(lead: LeadPayload) {
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
  ];

  if (lead.phone) rows.push(["Phone", lead.phone]);
  if (lead.company) rows.push(["Company", lead.company]);
  if (lead.website) rows.push(["Website", lead.website]);
  if (lead.interest) rows.push(["Primary interest", lead.interest]);
  const sourceLabel =
    lead.source === "hero"
      ? "Hero lead form"
      : lead.source === "contact"
        ? "Contact page"
        : lead.source === "audit"
          ? "Free growth audit popup"
          : "Account waitlist";
  rows.push(["Source", sourceLabel]);
  rows.push(["Marketing SMS opt-in", lead.smsOptIn ? "Yes" : "No"]);

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 12px 6px 0;color:#7a8099;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:#12141f;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#12141f;font-size:18px;margin-bottom:16px;">New lead from orvix.com</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">${rowsHtml}</table>
      <p style="color:#7a8099;font-size:13px;margin-bottom:4px;">Message</p>
      <p style="color:#12141f;font-size:14px;white-space:pre-wrap;line-height:1.6;">${escapeHtml(lead.message)}</p>
    </div>
  `;
}
