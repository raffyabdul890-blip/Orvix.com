import { supabase } from "@/lib/supabase";

export interface LeadRecord {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  interest?: string;
  message?: string;
  smsOptIn?: boolean;
  source: string;
}

export async function insertLead(lead: LeadRecord): Promise<{ stored: boolean }> {
  if (!supabase) {
    console.warn(
      "[lead] Supabase is not configured — lead was not stored in the database.",
      { name: lead.name, email: lead.email, source: lead.source }
    );
    return { stored: false };
  }

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? null,
    company: lead.company ?? null,
    website: lead.website ?? null,
    interest: lead.interest ?? null,
    message: lead.message ?? null,
    sms_opt_in: lead.smsOptIn ?? false,
    source: lead.source,
  });

  if (error) {
    console.error("[lead] Failed to store lead in Supabase", error);
    return { stored: false };
  }

  return { stored: true };
}
