import type { User } from "@supabase/supabase-js";

export function getDisplayName(user: Pick<User, "user_metadata" | "email">): string {
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "there"
  );
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "?";
}
