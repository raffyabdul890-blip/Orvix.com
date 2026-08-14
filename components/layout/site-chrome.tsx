"use client";

import { usePathname } from "next/navigation";

import { Header, type SessionUser } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";

export function SiteChrome({
  user,
  children,
}: {
  user: SessionUser | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWorkspace = pathname.startsWith("/dashboard");

  if (isWorkspace) {
    return <>{children}</>;
  }

  return (
    <>
      <Header user={user} />
      <main className="pt-18">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
