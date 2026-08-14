import {
  Bot,
  CalendarCheck,
  Clapperboard,
  ClipboardList,
  Code2,
  FileSearch,
  FileStack,
  Globe,
  Headset,
  KeyRound,
  Lock,
  MapPin,
  Megaphone,
  MessageSquareText,
  Palette,
  PenTool,
  Plug,
  Repeat,
  RefreshCw,
  Rocket,
  SearchCheck,
  Server,
  Share2,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategorySlug =
  | "development"
  | "grow"
  | "automations"
  | "security"
  | "branding";

export interface ServiceItem {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  features: string[];
  startingPrice: string;
  priceNote: string;
  deliveryTime: string;
  icon: LucideIcon;
}

export interface ServiceCategory {
  slug: ServiceCategorySlug;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "development",
    title: "Development",
    tagline: "Sites & Funnels",
    description:
      "Websites and funnels engineered to load fast, look sharp, and turn visitors into customers.",
    icon: Code2,
    services: [
      {
        slug: "wordpress-portfolio-site",
        name: "WordPress Portfolio Site",
        shortDescription:
          "A polished single-page portfolio built on WordPress to showcase your work and convert visitors into leads.",
        description:
          "A clean, single-page WordPress build designed to put your best work front and center. We handle the theme setup, layout, and lead capture so you have a professional online presence you can point clients to right away.",
        features: [
          "Custom WordPress theme setup",
          "Mobile-first responsive layout",
          "Contact & lead capture form",
          "Basic on-page SEO foundations",
        ],
        startingPrice: "$349",
        priceNote: "one-time",
        deliveryTime: "3–5 business days",
        icon: Globe,
      },
      {
        slug: "wordpress-business-site",
        name: "WordPress Business Site (5–7 pages, custom layouts)",
        shortDescription:
          "A full multi-page WordPress site with custom-designed layouts for growing businesses.",
        description:
          "A complete business website spanning five to seven pages, each with a custom-designed layout instead of a generic template. Built for businesses that need more than a landing page — service pages, an about story, and a clear path to contact.",
        features: [
          "5–7 custom-designed pages",
          "Content management training",
          "On-brand design system",
          "Speed & SEO optimized build",
        ],
        startingPrice: "$899",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: Rocket,
      },
      {
        slug: "custom-website-sales-funnel",
        name: "Custom Designed Website / Sales Funnel",
        shortDescription:
          "A hand-coded, conversion-focused website or funnel designed around a single measurable goal.",
        description:
          "No page builders, no templates — a fully custom-coded site or funnel designed around one job: converting the right visitors. Every section is built with intent, from the first scroll to the final call-to-action.",
        features: [
          "Custom UI/UX design (no templates)",
          "Conversion-optimized funnel structure",
          "Framer Motion micro-interactions",
          "Analytics & event tracking setup",
        ],
        startingPrice: "$1,899",
        priceNote: "one-time",
        deliveryTime: "2–3 weeks",
        icon: Sparkles,
      },
      {
        slug: "custom-site-funnel-integrations",
        name: "Custom Site / Funnel + Integrations",
        shortDescription:
          "Everything in our custom build, plus deep integrations with your CRM, payments, and automation stack.",
        description:
          "Our custom site or funnel build, wired directly into the tools that run your business — CRM, payment processing, email platforms, and automation triggers — so leads and sales flow in without manual work.",
        features: [
          "Custom site or funnel build",
          "CRM & email platform integration",
          "Payment gateway setup",
          "Webhook & API connections",
        ],
        startingPrice: "$2,999",
        priceNote: "one-time",
        deliveryTime: "3–4 weeks",
        icon: Plug,
      },
      {
        slug: "ecommerce-store",
        name: "E-commerce Store (up to 25 products)",
        shortDescription:
          "A conversion-ready online store with secure checkout, product catalog, and order management.",
        description:
          "A fully functional online store for up to 25 products, covering catalog setup, secure checkout, and order management — ready to take payments from day one.",
        features: [
          "Up to 25 products configured",
          "Secure checkout & payment setup",
          "Inventory & order management",
          "Product photography guidelines",
        ],
        startingPrice: "$1,499",
        priceNote: "one-time",
        deliveryTime: "2–3 weeks",
        icon: ShoppingCart,
      },
    ],
  },
  {
    slug: "grow",
    title: "Grow",
    tagline: "SEO, Ads & Social",
    description:
      "Search, paid, and social programs built to put your business in front of the people already looking for it.",
    icon: TrendingUp,
    services: [
      {
        slug: "local-seo-setup",
        name: "Local SEO Setup (GBP + citations)",
        shortDescription:
          "Get found in local search with a fully optimized Google Business Profile and consistent citations.",
        description:
          "We optimize your Google Business Profile and build consistent citations across the directories that matter, so your business shows up when nearby customers are searching.",
        features: [
          "Google Business Profile optimization",
          "Citation building across top directories",
          "NAP consistency audit",
          "Local keyword targeting",
        ],
        startingPrice: "$299",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: MapPin,
      },
      {
        slug: "technical-seo-audit",
        name: "Technical SEO Audit",
        shortDescription:
          "A deep technical crawl of your site surfacing indexing, speed, and structure issues holding back rankings.",
        description:
          "A full technical crawl of your website to uncover the indexing, performance, and structural issues quietly capping your search rankings, delivered as a prioritized, actionable roadmap.",
        features: [
          "Full site crawl & indexing review",
          "Core Web Vitals assessment",
          "Site structure & schema review",
          "Prioritized fix roadmap",
        ],
        startingPrice: "$399",
        priceNote: "one-time",
        deliveryTime: "3–5 business days",
        icon: SearchCheck,
      },
      {
        slug: "on-page-seo",
        name: "On-Page SEO (per 10 pages)",
        shortDescription:
          "Keyword-mapped, search-optimized copy and metadata for a batch of ten pages.",
        description:
          "Hands-on on-page optimization across a batch of ten pages — keyword mapping, metadata, headers, and internal links — tuned to rank without sacrificing readability.",
        features: [
          "Keyword mapping per page",
          "Title, meta & header optimization",
          "Internal linking strategy",
          "Content readability improvements",
        ],
        startingPrice: "$449",
        priceNote: "per 10 pages",
        deliveryTime: "1 week",
        icon: FileSearch,
      },
      {
        slug: "monthly-seo-retainer-programmatic-seo",
        name: "Monthly SEO Retainer & Programmatic SEO Build",
        shortDescription:
          "Ongoing SEO management plus scalable programmatic page templates that grow your organic footprint.",
        description:
          "Continuous SEO management paired with programmatic page templates that scale your organic footprint across hundreds of long-tail search terms without hundreds of hand-built pages.",
        features: [
          "Monthly keyword & content strategy",
          "Programmatic page template build",
          "Ongoing technical monitoring",
          "Monthly performance reporting",
        ],
        startingPrice: "$699",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: Repeat,
      },
      {
        slug: "ads-setup-management",
        name: "Ads Setup & Management (Google, Meta, TikTok)",
        shortDescription:
          "Full-funnel paid campaigns across Google, Meta, and TikTok, built, launched, and optimized.",
        description:
          "Paid campaigns built, launched, and actively optimized across Google, Meta, and TikTok — with clear conversion tracking so you always know what your ad spend is actually producing.",
        features: [
          "Campaign strategy & audience research",
          "Ad creative & copy direction",
          "Conversion tracking setup",
          "Weekly optimization & reporting",
        ],
        startingPrice: "$599",
        priceNote: "/month + ad spend",
        deliveryTime: "Ongoing",
        icon: Megaphone,
      },
      {
        slug: "social-media-management",
        name: "Social Media Management",
        shortDescription:
          "Consistent, on-brand content and posting across your social channels to grow engaged audiences.",
        description:
          "Consistent, on-brand content planning, design, and posting across your social channels, plus community engagement, so your audience keeps growing even when you're not online.",
        features: [
          "Monthly content calendar",
          "Platform-native post design",
          "Community engagement & replies",
          "Monthly growth reporting",
        ],
        startingPrice: "$499",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: Share2,
      },
    ],
  },
  {
    slug: "automations",
    title: "Automations",
    tagline: "AI & CRM",
    description:
      "AI agents and CRM workflows that handle the repetitive work so your team can focus on what needs a human.",
    icon: Bot,
    services: [
      {
        slug: "ai-web-chatbot-knowledge-base",
        name: "AI Web Chatbot / Knowledge Base",
        shortDescription:
          "A trained AI chatbot that answers visitor questions instantly using your own knowledge base.",
        description:
          "An AI chatbot trained directly on your content and documentation, embedded on your site to answer visitor questions instantly, capture leads, and hand off to your team when a human is needed.",
        features: [
          "Custom-trained on your content",
          "24/7 instant visitor responses",
          "Lead capture & handoff rules",
          "Embeddable on any website",
        ],
        startingPrice: "$799",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: MessageSquareText,
      },
      {
        slug: "ai-customer-support-agent",
        name: "AI Customer Support Agent",
        shortDescription:
          "An AI agent that resolves common support tickets and escalates complex cases to your team.",
        description:
          "An AI support agent that triages incoming tickets, resolves the common ones automatically, and escalates anything complex to your team with full context attached.",
        features: [
          "Multi-channel support coverage",
          "Ticket triage & auto-resolution",
          "Human escalation workflows",
          "Continuous response tuning",
        ],
        startingPrice: "$1,199",
        priceNote: "one-time + monthly care",
        deliveryTime: "2 weeks",
        icon: Headset,
      },
      {
        slug: "ai-sales-appointment-setter",
        name: "AI Sales & Appointment Setter",
        shortDescription:
          "An AI agent that qualifies leads and books appointments directly onto your calendar.",
        description:
          "An AI agent that engages inbound leads, qualifies them against your criteria, and books appointments straight onto your calendar — with automated follow-up for anyone who goes quiet.",
        features: [
          "Lead qualification scripting",
          "Calendar & CRM integration",
          "Automated follow-up sequences",
          "Booking confirmation workflows",
        ],
        startingPrice: "$1,299",
        priceNote: "one-time + monthly care",
        deliveryTime: "2 weeks",
        icon: CalendarCheck,
      },
      {
        slug: "ai-admin-task-assistant-data-bot",
        name: "AI Admin / Task Assistant & Data Processing Bot",
        shortDescription:
          "A custom AI assistant that automates repetitive admin work and processes data on a schedule.",
        description:
          "A custom-built AI assistant that takes repetitive admin work off your plate — processing documents, organizing data, and generating reports on whatever schedule your business runs on.",
        features: [
          "Repetitive task automation",
          "Document & data processing",
          "Scheduled report generation",
          "Custom trigger workflows",
        ],
        startingPrice: "$999",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: ClipboardList,
      },
      {
        slug: "ghl-full-setup-snapshot",
        name: "GoHighLevel (GHL) Full Setup & Snapshot Customization",
        shortDescription:
          "Complete GoHighLevel account build-out with a fully customized snapshot for your business.",
        description:
          "A ground-up GoHighLevel build-out — pipelines, calendars, funnels, and automations — configured around a snapshot customized specifically for how your business actually operates.",
        features: [
          "Full account configuration",
          "Custom snapshot import & tuning",
          "Pipeline & funnel setup",
          "Calendar & automation build",
        ],
        startingPrice: "$899",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: Workflow,
      },
      {
        slug: "crm-automations",
        name: "CRM Automations (Zoho, Zapier, Custom Workflows)",
        shortDescription:
          "Custom-built automations connecting your CRM to the rest of your business tools.",
        description:
          "Custom automation workflows across Zoho, Zapier, and your other business tools, so data moves between systems automatically instead of relying on manual entry.",
        features: [
          "Zoho / Zapier workflow builds",
          "Cross-platform data syncing",
          "Custom trigger & action logic",
          "Automation testing & handoff docs",
        ],
        startingPrice: "$549",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: RefreshCw,
      },
    ],
  },
  {
    slug: "security",
    title: "Security",
    tagline: "Hosting & Infrastructure",
    description:
      "Hardened infrastructure and access controls so your sites, data, and accounts stay yours.",
    icon: ShieldCheck,
    services: [
      {
        slug: "vps-setup-hardening",
        name: "VPS Setup & Hardening",
        shortDescription:
          "A production-ready VPS configured and locked down according to security best practices.",
        description:
          "A production-ready virtual private server, provisioned and hardened against common attack vectors — firewall rules, restricted access, automated backups, and monitoring included.",
        features: [
          "Server provisioning & configuration",
          "Firewall & access hardening",
          "Automated backup setup",
          "Monitoring & alerting",
        ],
        startingPrice: "$399",
        priceNote: "one-time",
        deliveryTime: "3–5 business days",
        icon: Server,
      },
      {
        slug: "dns-ssl-configuration",
        name: "DNS & SSL Configuration",
        shortDescription:
          "Correctly configured DNS records and SSL certificates for a fast, secure, trusted domain.",
        description:
          "Properly configured DNS records and SSL certificates so your domain resolves fast, serves securely over HTTPS, and your email actually lands in inboxes instead of spam.",
        features: [
          "DNS record configuration & audit",
          "SSL certificate installation",
          "HTTPS enforcement",
          "Email deliverability records (SPF/DKIM/DMARC)",
        ],
        startingPrice: "$149",
        priceNote: "one-time",
        deliveryTime: "1–2 business days",
        icon: Globe,
      },
      {
        slug: "website-security-implementation",
        name: "Website Security Implementation",
        shortDescription:
          "Hardened website security covering malware protection, firewalls, and vulnerability patching.",
        description:
          "A full security pass on your existing website — malware scanning and removal, a web application firewall, and patched vulnerabilities — plus ongoing monitoring to catch issues early.",
        features: [
          "Malware scanning & removal",
          "Web application firewall setup",
          "Vulnerability patching",
          "Security monitoring setup",
        ],
        startingPrice: "$349",
        priceNote: "one-time",
        deliveryTime: "3–5 business days",
        icon: ShieldAlert,
      },
      {
        slug: "2fa-rbac-setup",
        name: "2FA + RBAC Setup",
        shortDescription:
          "Two-factor authentication and role-based access control configured across your team's tools.",
        description:
          "Two-factor authentication rolled out across your team's tools, paired with role-based access control so every person only has the access their role actually requires.",
        features: [
          "Two-factor authentication rollout",
          "Role-based access control design",
          "Least-privilege permission audit",
          "Team onboarding documentation",
        ],
        startingPrice: "$249",
        priceNote: "one-time",
        deliveryTime: "2–3 business days",
        icon: KeyRound,
      },
      {
        slug: "api-security-hardening",
        name: "API Security Hardening",
        shortDescription:
          "Locked-down API authentication, rate limiting, and validation to protect your endpoints.",
        description:
          "A focused security pass on your APIs — authentication review, rate limiting, and input validation — closing the gaps that leave endpoints exposed to abuse.",
        features: [
          "Authentication & token audit",
          "Rate limiting & throttling",
          "Input validation review",
          "Security testing & report",
        ],
        startingPrice: "$449",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: Lock,
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    tagline: "Identity & Creative",
    description:
      "Visual identity and creative assets that make your business instantly recognizable, everywhere it shows up.",
    icon: Palette,
    services: [
      {
        slug: "logo-design",
        name: "Logo Design",
        shortDescription:
          "A distinctive, versatile logo designed to represent your brand across every touchpoint.",
        description:
          "A distinctive, versatile logo built to work everywhere your brand shows up — from a favicon to a storefront sign — delivered with every file format you'll ever need.",
        features: [
          "Multiple initial concepts",
          "Unlimited revision rounds",
          "Full source & export files",
          "Favicon & social avatar versions",
        ],
        startingPrice: "$199",
        priceNote: "one-time",
        deliveryTime: "3–5 business days",
        icon: PenTool,
      },
      {
        slug: "full-brand-identity-kit",
        name: "Full Brand Identity Kit",
        shortDescription:
          "A complete visual identity system covering logo, color, typography, and brand guidelines.",
        description:
          "A complete visual identity system — logo suite, color palette, typography, and a documented brand guideline — so everything you put out looks like it came from the same company.",
        features: [
          "Logo suite & brand marks",
          "Color palette & typography system",
          "Brand guidelines document",
          "Business card & letterhead design",
        ],
        startingPrice: "$699",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: Sparkles,
      },
      {
        slug: "short-form-video-scriptwriting",
        name: "Short-Form Video Scriptwriting",
        shortDescription:
          "Scroll-stopping scripts for Reels, TikTok, and Shorts written to hook, hold, and convert.",
        description:
          "Scroll-stopping scripts written specifically for Reels, TikTok, and Shorts — structured hooks, pacing, and calls-to-action built for how people actually watch short-form video.",
        features: [
          "Platform-native hook writing",
          "Scene-by-scene script structure",
          "On-brand tone & messaging",
          "Batch scripting for content calendars",
        ],
        startingPrice: "$29",
        priceNote: "per script",
        deliveryTime: "2–3 business days",
        icon: Clapperboard,
      },
      {
        slug: "canva-creative-design",
        name: "Canva Creative Design",
        shortDescription:
          "On-brand social posts, ads, and marketing graphics designed in ready-to-edit Canva templates.",
        description:
          "On-brand social posts, ad creative, and marketing graphics designed as ready-to-edit Canva templates, so your team can keep producing on-brand content long after we hand it off.",
        features: [
          "Custom Canva template design",
          "On-brand color & type system",
          "Editable source files",
          "Batch graphics for campaigns",
        ],
        startingPrice: "$149",
        priceNote: "per batch",
        deliveryTime: "3–5 business days",
        icon: Palette,
      },
      {
        slug: "digital-marketing-collateral-pack",
        name: "Digital Marketing Collateral Pack",
        shortDescription:
          "A complete set of on-brand marketing assets ready for launches, campaigns, and sales outreach.",
        description:
          "A complete set of on-brand marketing collateral — flyers, email templates, a pitch deck, and social ad creative — ready to deploy for your next launch or campaign.",
        features: [
          "Flyers & one-pagers",
          "Email & newsletter templates",
          "Pitch deck design",
          "Social ad creative set",
        ],
        startingPrice: "$399",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: FileStack,
      },
    ],
  },
];

export function getAllServices(): ServiceItem[] {
  return serviceCategories.flatMap((category) => category.services);
}

export function getCategoryBySlug(
  slug: string
): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return getAllServices().find((service) => service.slug === slug);
}

export function getCategoryForService(
  slug: string
): ServiceCategory | undefined {
  return serviceCategories.find((category) =>
    category.services.some((service) => service.slug === slug)
  );
}
