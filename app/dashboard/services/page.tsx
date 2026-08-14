import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function DashboardServicesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, service_name, status, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const activeServices = (orders ?? []).filter(
    (order) => order.status !== "cancelled"
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Your services
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          Services currently active or in progress on your account.
        </p>
      </div>

      {activeServices.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
          <Wrench className="mx-auto size-8 text-ink-200" />
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            No active services yet. Once a project kicks off, it&apos;ll show
            up here automatically.
          </p>
          <Link
            href="/dashboard/shop"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
          >
            Browse the shop
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {activeServices.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-ink-100 bg-white p-5"
            >
              <p className="text-sm font-semibold text-ink-900">
                {order.service_name}
              </p>
              <p className="mt-1 text-xs text-ink-400 capitalize">
                {order.status.replace("_", " ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
