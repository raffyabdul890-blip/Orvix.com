"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  Globe,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquare,
  Package,
  ShoppingBag,
  UserCircle,
  Wrench,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/shop", label: "Shop", icon: ShoppingBag },
  { href: "/dashboard/services", label: "Services", icon: Wrench },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/account", label: "Account", icon: UserCircle },
];

const FOOTER_ITEMS = [
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/", label: "Public site", icon: Globe },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-6 font-display text-lg font-semibold text-ink-900"
      >
        <Image
          src="/orvix-logo.png"
          alt={siteConfig.name}
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-lg"
        />
        {siteConfig.name}
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              )}
            >
              <Icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-ink-100 px-3 py-4">
        {FOOTER_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50 hover:text-ink-900"
            >
              <Icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}
        <SignOutButton className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-ink-600 transition-colors hover:bg-red-50 hover:text-red-600" />
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <aside className="hidden h-full w-64 shrink-0 border-r border-ink-100 bg-white lg:flex">
        <SidebarContent />
      </aside>

      <div className="flex h-14 items-center justify-between border-b border-ink-100 bg-white px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2 font-display text-base font-semibold text-ink-900">
          <Image
            src="/orvix-logo.png"
            alt={siteConfig.name}
            width={28}
            height={28}
            className="size-7 shrink-0 rounded-lg"
          />
          {siteConfig.name}
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
          className="flex size-9 items-center justify-center rounded-full text-ink-900 hover:bg-ink-100"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-ink-950/50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden"
            >
              <div className="flex justify-end px-3 pt-3">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full text-ink-900 hover:bg-ink-100"
                >
                  <X className="size-5" />
                </button>
              </div>
              <SidebarContent onNavigate={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
