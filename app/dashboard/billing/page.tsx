import { CreditCard } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

function formatAmount(cents: number | null) {
  if (cents === null) return "—";
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export default async function DashboardBillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, service_name, status, amount_cents, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const billable = (orders ?? []).filter((order) => order.amount_cents !== null);
  const totalCents = billable.reduce((sum, order) => sum + (order.amount_cents ?? 0), 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Billing
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          Invoices and charges tied to your account.
        </p>
      </div>

      <div className="rounded-3xl border border-ink-100 bg-white p-6">
        <p className="text-sm text-ink-600">Total billed to date</p>
        <p className="mt-1 font-display text-3xl font-semibold text-ink-900">
          {formatAmount(totalCents)}
        </p>
      </div>

      {billable.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-10 text-center">
          <CreditCard className="mx-auto size-8 text-ink-200" />
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            No billing history yet. Invoices will appear here once a project
            is underway.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-100 bg-ink-50/50 text-xs tracking-wide text-ink-400 uppercase">
              <tr>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {billable.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-4 font-medium text-ink-900">
                    {order.service_name}
                  </td>
                  <td className="px-5 py-4 text-ink-900">
                    {formatAmount(order.amount_cents)}
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
