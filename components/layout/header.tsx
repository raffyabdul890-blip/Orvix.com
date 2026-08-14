"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { getInitials } from "@/lib/auth-helpers";
import { Button } from "@/components/ui/button";
import {
  getCategoryForService,
  serviceCategories,
  type ServiceCategorySlug,
} from "@/lib/data/services";
import { CategoryPanel, ServicesOverviewPanel } from "@/components/layout/nav-panels";

export interface SessionUser {
  displayName: string;
}

type NavEntry =
  | { type: "link"; key: string; label: string; href: string }
  | { type: "menu"; key: string; label: string; href: string };

const TOP_NAV_CATEGORY_SLUGS: ServiceCategorySlug[] = [
  "development",
  "grow",
  "automations",
  "security",
  "branding",
];

const navEntries: NavEntry[] = [
  { type: "link", key: "home", label: "Home", href: "/" },
  { type: "menu", key: "services", label: "Services", href: "/services" },
  ...TOP_NAV_CATEGORY_SLUGS.map((slug): NavEntry => {
    const category = serviceCategories.find((item) => item.slug === slug);
    return {
      type: "menu",
      key: slug,
      label: category?.title ?? slug,
      href: `/services?category=${slug}`,
    };
  }),
  { type: "link", key: "contact", label: "Contact", href: "/contact" },
];

const triggerClass =
  "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap";

export function Header({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpenKey, setMobileOpenKey] = React.useState<string | null>(null);
  const { scrollY } = useScroll();
  const navRef = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 12);
  });

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    if (!openMenu) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenMenu(null);
    }
    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openMenu]);

  function openWithHover(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  const activeServiceCategory = pathname.startsWith("/services/")
    ? getCategoryForService(pathname.split("/").pop() ?? "")?.slug
    : undefined;

  function isMenuEntryActive(key: string) {
    if (key === "services") {
      return pathname === "/services" || pathname.startsWith("/services/");
    }
    return activeServiceCategory === key;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled || isMenuOpen || openMenu
          ? "border-b border-ink-100 bg-white/95 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div ref={navRef} onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
        <div className="container-page flex h-18 items-center justify-between">
          <Link
            href="/"
            onMouseEnter={() => setOpenMenu(null)}
            className="group flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink-900"
          >
            <Image
              src="/orvix-logo.png"
              alt={siteConfig.name}
              width={36}
              height={36}
              priority
              className="size-9 shrink-0 rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            {siteConfig.name}
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navEntries.map((entry) => {
              const active =
                entry.type === "menu"
                  ? isMenuEntryActive(entry.key)
                  : isActive(entry.href);

              if (entry.type === "link") {
                return (
                  <Link
                    key={entry.key}
                    href={entry.href}
                    onMouseEnter={() => setOpenMenu(null)}
                    className={cn(
                      triggerClass,
                      active ? "text-ink-900" : "text-ink-600 hover:text-ink-900"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="header-nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink-100"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    {entry.label}
                  </Link>
                );
              }

              return (
                <button
                  key={entry.key}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === entry.key}
                  onMouseEnter={() => openWithHover(entry.key)}
                  onClick={() =>
                    setOpenMenu((current) => (current === entry.key ? null : entry.key))
                  }
                  className={cn(
                    triggerClass,
                    active || openMenu === entry.key
                      ? "text-ink-900"
                      : "text-ink-600 hover:text-ink-900"
                  )}
                >
                  {(active || openMenu === entry.key) && (
                    <motion.span
                      layoutId="header-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-ink-100"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {entry.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      openMenu === entry.key && "rotate-180"
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <Button asChild variant="brand" size="sm">
                <Link href="/dashboard" onMouseEnter={() => setOpenMenu(null)}>
                  <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold">
                    {getInitials(user.displayName)}
                  </span>
                  Dashboard
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onMouseEnter={() => setOpenMenu(null)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
                >
                  Sign in
                </Link>
                <Button asChild variant="brand" size="sm">
                  <Link href="/sign-up" onMouseEnter={() => setOpenMenu(null)}>
                    Create account
                  </Link>
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-100 lg:hidden"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-full hidden border-t border-ink-100 bg-white shadow-xl shadow-ink-900/5 lg:block"
            >
              <div className="container-page">
                {openMenu === "services" ? (
                  <ServicesOverviewPanel onNavigate={() => setOpenMenu(null)} />
                ) : (
                  <CategoryPanel
                    categorySlug={openMenu as ServiceCategorySlug}
                    onNavigate={() => setOpenMenu(null)}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden border-t border-ink-100 bg-white lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4">
              {navEntries.map((entry, index) => {
                if (entry.type === "link") {
                  const active = isActive(entry.href);
                  return (
                    <motion.div
                      key={entry.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        href={entry.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-ink-100 text-ink-900"
                            : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                        )}
                      >
                        {entry.label}
                      </Link>
                    </motion.div>
                  );
                }

                const expanded = mobileOpenKey === entry.key;

                return (
                  <motion.div
                    key={entry.key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileOpenKey((current) =>
                          current === entry.key ? null : entry.key
                        )
                      }
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        isMenuEntryActive(entry.key) || expanded
                          ? "bg-ink-100 text-ink-900"
                          : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                      )}
                    >
                      {entry.label}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-200",
                          expanded && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-2"
                        >
                          {entry.key === "services" ? (
                            <div className="flex flex-col gap-0.5 py-2">
                              {serviceCategories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href={`/services?category=${category.slug}`}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="rounded-lg px-4 py-2 text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                                >
                                  {category.title}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-0.5 py-2">
                              {serviceCategories
                                .find((category) => category.slug === entry.key)
                                ?.services.map((service) => (
                                  <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-lg px-4 py-2 text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navEntries.length * 0.04 }}
                className="mt-2 flex flex-col gap-2 border-t border-ink-100 pt-4"
              >
                {user ? (
                  <Button asChild variant="brand">
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold">
                        {getInitials(user.displayName)}
                      </span>
                      Dashboard
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline">
                      <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                        Sign in
                      </Link>
                    </Button>
                    <Button asChild variant="brand">
                      <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                        Create account
                      </Link>
                    </Button>
                  </>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
