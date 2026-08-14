import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getDisplayName } from "@/lib/auth-helpers";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?next=/dashboard");
  }

  const displayName = getDisplayName(user);
  const isGoogle = user.app_metadata?.provider === "google";

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-ink-100 bg-white px-4 py-3 sm:px-8">
          <p className="text-sm text-ink-600">
            {isGoogle ? (
              <>
                Signed in with Google. Welcome,{" "}
                <span className="font-semibold text-ink-900">{displayName}</span>!
              </>
            ) : (
              <>
                Welcome back,{" "}
                <span className="font-semibold text-ink-900">{displayName}</span>!
              </>
            )}
          </p>
        </div>
        <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
