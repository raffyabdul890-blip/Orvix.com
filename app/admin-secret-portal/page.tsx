import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AdminInboxView } from "@/components/admin/admin-inbox-view";

// NOTE on metadata: PWA installability requires a <link rel="manifest">
// that's present in the page's HTML unconditionally — Next resolves
// metadata as a separate stream from the page body, so making it depend on
// the admin check doesn't actually hide it (verified: even when the body
// correctly renders the 404, conditionally-generated metadata still landed
// in the client hydration payload and overwrote the tab title/manifest
// after JS loaded). The real secret is the route path itself, which is
// never linked and never indexed; the actual lead/message DATA below stays
// fully gated by the is_admin() check regardless of what the tab title says.
export const metadata: Metadata = {
  title: "Admin Console",
  robots: { index: false, follow: false, nocache: true },
  manifest: "/admin-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Admin Console",
  },
  icons: {
    apple: "/orvix-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default async function AdminSecretPortalPage() {
  const supabase = await createClient();

  // auth.getUser() shouldn't throw, but a network blip talking to Supabase's
  // auth server could still reject the promise — treat that the same as
  // "not signed in" rather than letting it crash the page with a 500.
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.error("admin-secret-portal: auth.getUser() failed", err);
  }

  if (!user) {
    notFound();
  }

  // is_admin() is a security-definer RPC — it's the only way to check
  // admin_users, since that table's RLS blocks direct reads for every
  // role, admins included (see supabase/schema.sql). Any failure here
  // (RPC missing, network error, etc.) must fail closed to notFound(),
  // never bubble up as an unhandled exception.
  let isAdmin = false;
  try {
    const { data, error } = await supabase.rpc("is_admin");
    if (error) {
      console.error("admin-secret-portal: is_admin() check failed", error);
    } else {
      isAdmin = Boolean(data);
    }
  } catch (err) {
    console.error("admin-secret-portal: is_admin() check threw", err);
  }

  if (!isAdmin) {
    notFound();
  }

  let leads: NonNullable<Awaited<ReturnType<typeof fetchLeads>>["data"]> = [];
  let messages: NonNullable<Awaited<ReturnType<typeof fetchMessages>>["data"]> = [];
  let profiles: NonNullable<Awaited<ReturnType<typeof fetchProfiles>>["data"]> = [];
  let hasLoadError = false;

  try {
    const [leadsRes, messagesRes, profilesRes] = await Promise.all([
      fetchLeads(supabase),
      fetchMessages(supabase),
      fetchProfiles(supabase),
    ]);

    if (leadsRes.error) {
      console.error("admin-secret-portal: leads fetch failed", leadsRes.error);
      hasLoadError = true;
    } else {
      leads = leadsRes.data ?? [];
    }

    if (messagesRes.error) {
      console.error("admin-secret-portal: messages fetch failed", messagesRes.error);
      hasLoadError = true;
    } else {
      messages = messagesRes.data ?? [];
    }

    if (profilesRes.error) {
      console.error("admin-secret-portal: profiles fetch failed", profilesRes.error);
      hasLoadError = true;
    } else {
      profiles = profilesRes.data ?? [];
    }
  } catch (err) {
    console.error("admin-secret-portal: inbox data fetch threw", err);
    hasLoadError = true;
  }

  return (
    <AdminInboxView
      leads={leads}
      messages={messages}
      profiles={profiles}
      hasLoadError={hasLoadError}
    />
  );
}

function fetchLeads(supabase: Awaited<ReturnType<typeof createClient>>) {
  return supabase
    .from("leads")
    .select(
      "id, created_at, name, email, phone, company, website, interest, message, source, status"
    )
    .order("created_at", { ascending: false });
}

function fetchMessages(supabase: Awaited<ReturnType<typeof createClient>>) {
  return supabase
    .from("messages")
    .select("id, created_at, user_id, body")
    .eq("sender", "user")
    .order("created_at", { ascending: false });
}

function fetchProfiles(supabase: Awaited<ReturnType<typeof createClient>>) {
  return supabase.from("profiles").select("id, email, full_name");
}
