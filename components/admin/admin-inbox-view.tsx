"use client";

import * as React from "react";
import {
  AlertTriangle,
  Building2,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { createClient } from "@/lib/supabase/client";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type LeadStatus = "new" | "in_progress" | "closed";

interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  interest: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
}

interface MessageRow {
  id: string;
  created_at: string;
  user_id: string;
  body: string;
}

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
}

interface InboxItem {
  id: string;
  kind: "lead" | "message";
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  interest: string | null;
  message: string;
  createdAt: string;
  status: LeadStatus | null;
  sourceLabel: string;
}

const SOURCE_LABELS: Record<string, string> = {
  hero: "Hero form",
  audit: "Growth audit",
  contact: "Contact page",
  waitlist: "Waitlist",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  in_progress: "In progress",
  closed: "Closed",
};

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-amber-50 text-amber-700",
  in_progress: "bg-blue-50 text-blue-700",
  closed: "bg-emerald-50 text-emerald-700",
};

const FILTER_TABS: Array<{ key: "all" | LeadStatus; label: string }> = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "in_progress", label: "In progress" },
  { key: "closed", label: "Closed" },
];

function buildInbox(
  leads: LeadRow[],
  messages: MessageRow[],
  profiles: ProfileRow[]
): InboxItem[] {
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));

  const leadItems: InboxItem[] = leads.map((lead) => ({
    id: `lead-${lead.id}`,
    kind: "lead",
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    website: lead.website,
    interest: lead.interest,
    message: lead.message ?? "",
    createdAt: lead.created_at,
    status: lead.status,
    sourceLabel: SOURCE_LABELS[lead.source] ?? lead.source,
  }));

  const messageItems: InboxItem[] = messages.map((msg) => {
    const profile = profileById.get(msg.user_id);
    return {
      id: `message-${msg.id}`,
      kind: "message",
      name: profile?.full_name || profile?.email?.split("@")[0] || "Workspace user",
      email: profile?.email ?? "",
      phone: null,
      company: null,
      website: null,
      interest: null,
      message: msg.body,
      createdAt: msg.created_at,
      status: null,
      sourceLabel: "Workspace message",
    };
  });

  return [...leadItems, ...messageItems].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

function mailtoHref(email: string, name: string) {
  const subject = encodeURIComponent("Re: Your inquiry to Orvix");
  const body = encodeURIComponent(`Hi ${name.split(" ")[0] || "there"},\n\n`);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

export function AdminInboxView({
  leads,
  messages,
  profiles,
  hasLoadError = false,
}: {
  leads: LeadRow[];
  messages: MessageRow[];
  profiles: ProfileRow[];
  hasLoadError?: boolean;
}) {
  const [items, setItems] = React.useState<InboxItem[]>(() =>
    buildInbox(leads, messages, profiles)
  );
  const [activeTab, setActiveTab] = React.useState<"all" | LeadStatus>("all");

  const visibleItems =
    activeTab === "all" ? items : items.filter((item) => item.status === activeTab);

  async function handleStatusChange(item: InboxItem, nextStatus: LeadStatus) {
    if (item.kind !== "lead") return;
    const leadId = item.id.replace(/^lead-/, "");

    setItems((prev) =>
      prev.map((current) =>
        current.id === item.id ? { ...current, status: nextStatus } : current
      )
    );

    const supabase = createClient();
    const { error } = await supabase
      .from("leads")
      .update({ status: nextStatus })
      .eq("id", leadId);

    if (error) {
      toast.error("Couldn't update status. Please try again.");
      setItems((prev) =>
        prev.map((current) =>
          current.id === item.id ? { ...current, status: item.status } : current
        )
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="border-b border-ink-100 bg-white px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
            <ShieldCheck className="size-4.5" />
          </span>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight text-ink-900">
              Admin Console
            </h1>
            <p className="text-xs text-ink-400">
              {items.length} total inquiries — leads and workspace messages
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-8">
        {hasLoadError && (
          <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="size-4 shrink-0" />
            <span>
              Some data couldn&apos;t be loaded just now — showing what&apos;s
              available. Refresh to try again.
            </span>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-ink-900 text-white"
                  : "bg-white text-ink-600 hover:bg-ink-100"
              )}
            >
              {tab.label}
              {tab.key !== "all" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({items.filter((item) => item.status === tab.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {visibleItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center text-sm text-ink-600">
            Nothing here yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-ink-100 bg-white p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-ink-900">
                        {item.name}
                      </h3>
                      <Badge variant="outline">{item.sourceLabel}</Badge>
                      {item.interest && (
                        <Badge variant="brand">{item.interest}</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-ink-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {item.status && (
                    <Select
                      value={item.status}
                      onChange={(event) =>
                        handleStatusChange(item, event.target.value as LeadStatus)
                      }
                      className={cn(
                        "w-auto text-xs font-medium",
                        STATUS_STYLES[item.status]
                      )}
                    >
                      {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                    </Select>
                  )}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-700 whitespace-pre-wrap">
                  {item.message || "—"}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-400">
                  {item.email && (
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="size-3.5" />
                      {item.email}
                    </span>
                  )}
                  {item.phone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="size-3.5" />
                      {item.phone}
                    </span>
                  )}
                  {item.company && (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="size-3.5" />
                      {item.company}
                    </span>
                  )}
                  {item.website && (
                    <span className="inline-flex items-center gap-1.5">
                      <Globe className="size-3.5" />
                      {item.website}
                    </span>
                  )}
                  {item.kind === "message" && (
                    <span className="inline-flex items-center gap-1.5">
                      <MessageSquare className="size-3.5" />
                      Sent from workspace
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-100 pt-4">
                  {item.email && (
                    <a
                      href={mailtoHref(item.email, item.name)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3.5 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      <Mail className="size-3.5" />
                      Reply by email
                    </a>
                  )}
                  {item.phone && (
                    <a
                      href={whatsappHref(item.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3.5 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:border-emerald-300 hover:text-emerald-700"
                    >
                      <Phone className="size-3.5" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
