import Link from "next/link";
import { ArrowRight, MessageSquare, Package, ShoppingBag } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { getAllServices } from "@/lib/data/services";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: orderCount }, { count: messageCount }] = await Promise.all([
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user!.id),
    supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user!.id),
  ]);

  const stats = [
    { label: "Active orders", value: orderCount ?? 0, icon: Package, href: "/dashboard/orders" },
    { label: "Messages", value: messageCount ?? 0, icon: MessageSquare, href: "/dashboard/messages" },
    {
      label: "Services available",
      value: getAllServices().length,
      icon: ShoppingBag,
      href: "/dashboard/shop",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Overview
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          Your workspace at a glance — {user?.email}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex flex-col gap-4 rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:scale-[1.02] hover:border-brand-200 hover:shadow-lg"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-sm shadow-brand-600/25">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-display text-3xl font-semibold text-ink-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-ink-600">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-3xl border border-dashed border-ink-200 bg-white p-8 text-center">
        <p className="text-sm leading-relaxed text-ink-600">
          Nothing here yet — once you request a service or a strategist
          reaches out, your orders, billing, and messages will show up
          automatically.
        </p>
        <Link
          href="/dashboard/shop"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
        >
          Browse services
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
