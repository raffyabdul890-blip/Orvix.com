import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { SiteChrome } from "@/components/layout/site-chrome";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site-config";
import { getDisplayName } from "@/lib/auth-helpers";
import { createClient } from "@/lib/supabase/server";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sessionUser = user ? { displayName: getDisplayName(user) } : null;

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${jakarta.variable} ${sora.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <SiteChrome user={sessionUser}>{children}</SiteChrome>
        <Toaster />
        <GoogleAnalytics gaId="G-H5C5H8TN5Z" />
      </body>
    </html>
  );
}
