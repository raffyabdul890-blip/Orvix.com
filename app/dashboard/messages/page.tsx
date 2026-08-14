import { createClient } from "@/lib/supabase/server";
import { MessagesView } from "@/components/dashboard/messages-view";

export default async function DashboardMessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: messages } = await supabase
    .from("messages")
    .select("id, sender, body, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: true });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900">
          Messages
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          A direct line to your strategist.
        </p>
      </div>

      <MessagesView userId={user!.id} initialMessages={messages ?? []} />
    </div>
  );
}
