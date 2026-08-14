import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  in_progress: "bg-blue-50 text-blue-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
};

export default async function DashboardOrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, service_name, status, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Orders
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          Every service you&apos;ve requested, and where it stands.
        </p>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
          <Package className="mx-auto size-8 text-ink-200" />
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            No orders yet. Requests you make from the shop will land here.
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
        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/50 text-xs tracking-wide text-ink-400 uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Requested</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-4 font-medium text-ink-900">
                    {order.service_name}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                        STATUS_STYLES[order.status] ?? "bg-ink-100 text-ink-600"
                      )}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-ink-600">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
