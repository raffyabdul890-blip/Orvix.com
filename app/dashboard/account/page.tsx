import { Mail, Shield, UserCircle } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

export default async function DashboardAccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name || user?.user_metadata?.name || "—";
  const provider = user?.app_metadata?.provider ?? "email";
  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "—";

  const rows = [
    { label: "Name", value: displayName, icon: UserCircle },
    { label: "Email", value: user?.email ?? "—", icon: Mail },
    { label: "Sign-in method", value: provider, icon: Shield, capitalize: true },
  ];

  return (
    <div className="flex max-w-xl flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Account
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          Your account details. Member since {joined}.
        </p>
      </div>

      <div className="divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="flex items-center gap-4 px-6 py-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-brand-600">
                <Icon className="size-4.5" />
              </span>
              <div>
                <p className="text-xs tracking-wide text-ink-400 uppercase">
                  {row.label}
                </p>
                <p
                  className={`text-sm font-medium text-ink-900 ${row.capitalize ? "capitalize" : ""}`}
                >
                  {row.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <SignOutButton className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600" />
    </div>
  );
}
