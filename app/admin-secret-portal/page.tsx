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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    notFound();
  }

  const [{ data: leads }, { data: messages }, { data: profiles }] = await Promise.all([
    supabase
      .from("leads")
      .select(
        "id, created_at, name, email, phone, company, website, interest, message, source, status"
      )
      .order("created_at", { ascending: false }),
    supabase
      .from("messages")
      .select("id, created_at, user_id, body")
      .eq("sender", "user")
      .order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, email, full_name"),
  ]);

  return (
    <AdminInboxView
      leads={leads ?? []}
      messages={messages ?? []}
      profiles={profiles ?? []}
    />
  );
}
