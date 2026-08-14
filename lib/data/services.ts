import {
  Award,
  BarChart2,
  Bot,
  Boxes,
  CalendarCheck,
  Camera,
  Clapperboard,
  ClipboardList,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Feather,
  FileSearch,
  FileStack,
  FileText,
  Film,
  FlaskConical,
  GitBranch,
  Globe,
  Headset,
  KeyRound,
  LayoutDashboard,
  LineChart,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Mic,
  MessageSquareText,
  MousePointerClick,
  Network,
  Package,
  Palette,
  PenTool,
  PieChart,
  Plug,
  Presentation,
  Radar,
  Repeat,
  RefreshCw,
  Rocket,
  RotateCcw,
  Scissors,
  ScrollText,
  SearchCheck,
  Server,
  Share2,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  SquarePlay,
  Store,
  Target,
  TrendingUp,
  UsersRound,
  Video,
  Warehouse,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategorySlug =
  | "development"
  | "grow"
  | "automations"
  | "security"
  | "branding"
  | "commerce"
  | "content"
  | "data";

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
  {
    slug: "commerce",
    title: "Commerce",
    tagline: "Ecommerce & Marketplaces",
    description:
      "Storefronts, checkout flows, and marketplace listings built to turn browsers into repeat buyers.",
    icon: ShoppingBag,
    services: [
      {
        slug: "shopify-store-build",
        name: "Shopify Store Build",
        shortDescription:
          "A fully themed, conversion-ready Shopify store configured for your catalog and checkout.",
        description:
          "A custom-themed Shopify storefront built around your catalog, brand, and checkout flow — configured with the apps and integrations you actually need, not a bloated default install.",
        features: [
          "Custom theme setup & styling",
          "Product & collection configuration",
          "Checkout & shipping setup",
          "App & integration configuration",
        ],
        startingPrice: "$1,299",
        priceNote: "one-time",
        deliveryTime: "2–3 weeks",
        icon: Store,
      },
      {
        slug: "marketplace-listing-optimization",
        name: "Amazon & Marketplace Listing Optimization",
        shortDescription:
          "Keyword-optimized listings and imagery built to win the buy box on major marketplaces.",
        description:
          "Optimized titles, bullet points, backend keywords, and imagery for your Amazon or marketplace listings, built to improve search placement and click-through without violating platform policy.",
        features: [
          "Keyword research & indexing audit",
          "Title, bullet & description rewrite",
          "Backend search term optimization",
          "Competitor listing benchmarking",
        ],
        startingPrice: "$349",
        priceNote: "per listing",
        deliveryTime: "3–5 business days",
        icon: Package,
      },
      {
        slug: "subscription-commerce-setup",
        name: "Subscription & Membership Commerce Setup",
        shortDescription:
          "Recurring billing, member portals, and subscription logic configured end to end.",
        description:
          "A complete subscription or membership commerce build — recurring billing, plan tiers, dunning management, and a self-serve member portal — configured on the platform you already use.",
        features: [
          "Recurring billing configuration",
          "Plan tiers & upgrade/downgrade logic",
          "Failed payment & dunning flows",
          "Self-serve member portal",
        ],
        startingPrice: "$1,099",
        priceNote: "one-time",
        deliveryTime: "2 weeks",
        icon: CreditCard,
      },
      {
        slug: "abandoned-cart-recovery",
        name: "Abandoned Cart Recovery Flows",
        shortDescription:
          "Automated email and SMS sequences that win back carts before they're forgotten.",
        description:
          "Multi-step email and SMS recovery sequences triggered the moment a cart is abandoned, tuned with the timing and incentives that bring shoppers back to complete checkout.",
        features: [
          "Multi-step recovery sequence build",
          "Email & SMS channel setup",
          "Incentive & discount logic",
          "Recovery rate reporting",
        ],
        startingPrice: "$399",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: RotateCcw,
      },
      {
        slug: "product-catalog-migration",
        name: "Product Catalog Migration",
        shortDescription:
          "Clean, structured migration of your full product catalog to a new commerce platform.",
        description:
          "A structured migration of your entire product catalog — variants, images, pricing, and metadata — to a new commerce platform, with data integrity checks so nothing gets lost in transit.",
        features: [
          "Full catalog data mapping",
          "Variant, image & pricing migration",
          "SEO redirect mapping",
          "Post-migration QA pass",
        ],
        startingPrice: "$799",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: Boxes,
      },
      {
        slug: "payment-gateway-integration",
        name: "Payment Gateway Integration",
        shortDescription:
          "Secure, PCI-compliant payment processing wired into your storefront or app.",
        description:
          "Secure payment gateway integration — cards, wallets, and buy-now-pay-later options — wired directly into your storefront or app, tested against real transaction scenarios before launch.",
        features: [
          "Gateway account configuration",
          "Card, wallet & BNPL support",
          "PCI-compliant checkout flow",
          "Transaction testing & QA",
        ],
        startingPrice: "$549",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: CreditCard,
      },
      {
        slug: "inventory-pos-integration",
        name: "Inventory & POS Integration",
        shortDescription:
          "Real-time inventory sync between your online store and in-person point of sale.",
        description:
          "Real-time, two-way inventory sync between your online store and physical point-of-sale system, so stock levels stay accurate whether the sale happens online or in person.",
        features: [
          "POS & storefront sync setup",
          "Real-time inventory updates",
          "Multi-location stock tracking",
          "Low-stock alert configuration",
        ],
        startingPrice: "$899",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: Warehouse,
      },
      {
        slug: "store-conversion-rate-optimization",
        name: "Conversion Rate Optimization for Stores",
        shortDescription:
          "Data-backed testing program focused on lifting your store's checkout conversion rate.",
        description:
          "An ongoing testing program focused specifically on your storefront's conversion funnel — product pages, cart, and checkout — backed by session recordings and real experiment data, not guesswork.",
        features: [
          "Funnel & session recording audit",
          "Prioritized test roadmap",
          "A/B test build & analysis",
          "Monthly performance reporting",
        ],
        startingPrice: "$799",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: MousePointerClick,
      },
      {
        slug: "loyalty-rewards-program",
        name: "Loyalty & Rewards Program Setup",
        shortDescription:
          "A points-based loyalty program configured to increase repeat purchase rate.",
        description:
          "A fully configured points-and-rewards loyalty program — earning rules, redemption tiers, and referral bonuses — built to turn one-time buyers into repeat customers.",
        features: [
          "Points & tier structure design",
          "Redemption rules configuration",
          "Referral bonus setup",
          "Customer-facing rewards portal",
        ],
        startingPrice: "$649",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: Award,
      },
      {
        slug: "marketplace-ads-management",
        name: "Marketplace Ads Management (Amazon PPC)",
        shortDescription:
          "Sponsored product and brand campaigns managed to grow marketplace sales profitably.",
        description:
          "Sponsored product, brand, and display campaigns built and actively managed on Amazon and other marketplaces, tuned toward a target ACoS instead of just raw click volume.",
        features: [
          "Campaign structure & keyword build",
          "Bid management & optimization",
          "Negative keyword maintenance",
          "Weekly performance reporting",
        ],
        startingPrice: "$549",
        priceNote: "/month + ad spend",
        deliveryTime: "Ongoing",
        icon: Target,
      },
    ],
  },
  {
    slug: "content",
    title: "Content & Video",
    tagline: "Content Marketing & Production",
    description:
      "Writing, video, and audio built to earn attention and hold it long enough to convert.",
    icon: Video,
    services: [
      {
        slug: "blog-content-strategy-writing",
        name: "Blog Content Strategy & Writing",
        shortDescription:
          "A keyword-mapped content calendar with professionally written articles delivered monthly.",
        description:
          "A blog content program built around real search demand — topic research, a keyword-mapped calendar, and professionally written articles delivered on a predictable monthly schedule.",
        features: [
          "Keyword & topic research",
          "Monthly content calendar",
          "SEO-optimized article writing",
          "On-brand style & tone guide",
        ],
        startingPrice: "$599",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: FileText,
      },
      {
        slug: "youtube-channel-strategy-production",
        name: "YouTube Channel Strategy & Production",
        shortDescription:
          "Channel strategy, scripting, and edited video production to grow a branded YouTube presence.",
        description:
          "End-to-end YouTube support — channel strategy, video scripting, and full post-production — built to grow a consistent, on-brand presence instead of one-off uploads.",
        features: [
          "Channel & content strategy",
          "Video scripting",
          "Filming guidance & direction",
          "Full editing & thumbnail design",
        ],
        startingPrice: "$1,299",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: SquarePlay,
      },
      {
        slug: "podcast-production-editing",
        name: "Podcast Production & Editing",
        shortDescription:
          "Full podcast editing, show notes, and distribution so every episode ships polished.",
        description:
          "Full-service podcast production — episode editing, show notes, chapter markers, and multi-platform distribution — so recording is the only part left on your plate.",
        features: [
          "Episode editing & mastering",
          "Show notes & chapter markers",
          "Multi-platform distribution",
          "Audiogram & clip creation",
        ],
        startingPrice: "$249",
        priceNote: "per episode",
        deliveryTime: "3–5 business days",
        icon: Mic,
      },
      {
        slug: "email-newsletter-content",
        name: "Email Newsletter Content",
        shortDescription:
          "Written, designed, and scheduled newsletters that keep your list engaged and buying.",
        description:
          "A recurring email newsletter program — writing, design, and scheduling — built to keep your list warm and drive consistent traffic back to what you're selling.",
        features: [
          "Newsletter writing & design",
          "Segmentation & scheduling",
          "A/B subject line testing",
          "Monthly performance reporting",
        ],
        startingPrice: "$449",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: Mail,
      },
      {
        slug: "case-study-whitepaper-writing",
        name: "Case Study & Whitepaper Writing",
        shortDescription:
          "Long-form proof assets that turn your best results into a sales tool.",
        description:
          "Professionally researched and written case studies and whitepapers that turn your best client results into a credible, shareable sales asset for your team.",
        features: [
          "Client interview & research",
          "Narrative structure & writing",
          "Data & result visualization",
          "Print-ready & web-ready formats",
        ],
        startingPrice: "$549",
        priceNote: "per asset",
        deliveryTime: "1–2 weeks",
        icon: ScrollText,
      },
      {
        slug: "explainer-video-production",
        name: "Explainer Video Production",
        shortDescription:
          "A scripted, animated explainer video that simplifies your product in under 90 seconds.",
        description:
          "A fully scripted and animated explainer video that breaks your product or service down into a clear, under-90-second story — built for landing pages, ads, and sales decks.",
        features: [
          "Script & storyboard development",
          "Custom animation & voiceover",
          "Two rounds of revisions",
          "Multiple export formats",
        ],
        startingPrice: "$1,199",
        priceNote: "per video",
        deliveryTime: "2–3 weeks",
        icon: Film,
      },
      {
        slug: "product-photography",
        name: "Product Photography",
        shortDescription:
          "Studio-quality product photography ready for your store, ads, and marketplace listings.",
        description:
          "Studio-quality product photography — clean backgrounds, lifestyle shots, and detail close-ups — delivered edited and ready for your store, ads, and marketplace listings.",
        features: [
          "Studio & lifestyle shot setups",
          "Professional photo editing",
          "Multiple angles per product",
          "Web-optimized export files",
        ],
        startingPrice: "$399",
        priceNote: "per batch",
        deliveryTime: "1 week",
        icon: Camera,
      },
      {
        slug: "content-repurposing",
        name: "Content Repurposing (Long-Form to Shorts)",
        shortDescription:
          "Your long-form video or podcast cut into a month's worth of short-form social clips.",
        description:
          "Your existing long-form video or podcast content cut down into a steady stream of short-form clips for Reels, TikTok, and Shorts — captioned and formatted for each platform.",
        features: [
          "Long-form content review",
          "Clip selection & editing",
          "Platform-native captioning",
          "Batch delivery for scheduling",
        ],
        startingPrice: "$599",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: Scissors,
      },
      {
        slug: "seo-content-clusters",
        name: "SEO Content Clusters",
        shortDescription:
          "A pillar-and-cluster content structure built to dominate a topic in search.",
        description:
          "A pillar-and-cluster content structure — one authoritative pillar page supported by a network of linked articles — built to establish topical authority and compound your organic rankings.",
        features: [
          "Topic & cluster mapping",
          "Pillar page writing",
          "Supporting cluster articles",
          "Internal linking strategy",
        ],
        startingPrice: "$1,499",
        priceNote: "per cluster",
        deliveryTime: "3–4 weeks",
        icon: Network,
      },
      {
        slug: "ghostwriting-founders-executives",
        name: "Ghostwriting for Founders & Executives",
        shortDescription:
          "LinkedIn posts and articles written in your voice to build a personal brand consistently.",
        description:
          "Consistent LinkedIn posts and long-form articles ghostwritten in your voice, built from a recurring interview process so your personal brand keeps growing without eating your calendar.",
        features: [
          "Recurring voice-capture interviews",
          "Weekly post writing",
          "Content calendar management",
          "Engagement & topic reporting",
        ],
        startingPrice: "$799",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: Feather,
      },
    ],
  },
  {
    slug: "data",
    title: "Data & Insights",
    tagline: "Analytics & Reporting",
    description:
      "Tracking, dashboards, and testing programs that turn raw activity into decisions worth acting on.",
    icon: BarChart2,
    services: [
      {
        slug: "analytics-setup-ga4-mixpanel",
        name: "Analytics Setup (GA4 / Mixpanel)",
        shortDescription:
          "Properly configured event tracking so every report you pull is actually trustworthy.",
        description:
          "A ground-up analytics implementation across GA4 or Mixpanel — event tracking, conversions, and funnels — configured correctly the first time so every report downstream is trustworthy.",
        features: [
          "Event & conversion tracking setup",
          "Funnel & goal configuration",
          "Cross-domain tracking",
          "Data validation & QA",
        ],
        startingPrice: "$549",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: LineChart,
      },
      {
        slug: "custom-bi-dashboard-build",
        name: "Custom BI Dashboard Build",
        shortDescription:
          "A live, custom dashboard pulling your key metrics into one shareable view.",
        description:
          "A custom business intelligence dashboard that pulls data from your marketing, sales, and product tools into a single live view — built around the metrics your team actually checks.",
        features: [
          "Data source connection & mapping",
          "Custom dashboard design",
          "Automated data refresh",
          "Team access & sharing setup",
        ],
        startingPrice: "$1,199",
        priceNote: "one-time",
        deliveryTime: "2 weeks",
        icon: LayoutDashboard,
      },
      {
        slug: "ab-testing-cro-program",
        name: "A/B Testing & CRO Program",
        shortDescription:
          "An ongoing experimentation program that systematically lifts conversion rate.",
        description:
          "A structured, ongoing experimentation program — hypothesis backlog, test builds, and statistical analysis — that replaces one-off redesigns with compounding, data-backed conversion gains.",
        features: [
          "Hypothesis backlog & prioritization",
          "Test design & implementation",
          "Statistical significance analysis",
          "Monthly experiment reporting",
        ],
        startingPrice: "$899",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: FlaskConical,
      },
      {
        slug: "attribution-modeling",
        name: "Attribution Modeling",
        shortDescription:
          "A clear model of which channels actually drive revenue, not just last-click credit.",
        description:
          "A multi-touch attribution model built around your real customer journey, so budget decisions are based on which channels actually drive revenue instead of last-click guesswork.",
        features: [
          "Customer journey mapping",
          "Multi-touch model configuration",
          "Channel contribution reporting",
          "Budget allocation recommendations",
        ],
        startingPrice: "$999",
        priceNote: "one-time",
        deliveryTime: "1–2 weeks",
        icon: GitBranch,
      },
      {
        slug: "customer-data-platform-setup",
        name: "Customer Data Platform Setup",
        shortDescription:
          "A unified customer profile built by connecting every tool that touches customer data.",
        description:
          "A customer data platform implementation that unifies profiles across your marketing, sales, and support tools, so every system works from the same, accurate view of each customer.",
        features: [
          "Data source integration",
          "Identity resolution & merging",
          "Unified profile configuration",
          "Downstream tool syncing",
        ],
        startingPrice: "$1,599",
        priceNote: "one-time",
        deliveryTime: "2–3 weeks",
        icon: Database,
      },
      {
        slug: "competitive-intelligence-reporting",
        name: "Competitive Intelligence Reporting",
        shortDescription:
          "Ongoing tracking of competitor pricing, positioning, and marketing moves.",
        description:
          "A recurring competitive intelligence report tracking competitor pricing, positioning, ad creative, and organic moves, delivered as a concise briefing your team can actually act on.",
        features: [
          "Competitor tracking setup",
          "Pricing & positioning analysis",
          "Ad & content monitoring",
          "Monthly briefing report",
        ],
        startingPrice: "$399",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: Radar,
      },
      {
        slug: "marketing-mix-modeling",
        name: "Marketing Mix Modeling",
        shortDescription:
          "A channel-level model of marketing ROI that accounts for offline and brand effects too.",
        description:
          "A statistical marketing mix model that estimates the true ROI of each channel — including offline and brand effects that pixel-based attribution misses — to guide budget planning.",
        features: [
          "Historical spend & revenue analysis",
          "Channel-level ROI modeling",
          "Diminishing returns curves",
          "Budget scenario planning",
        ],
        startingPrice: "$1,899",
        priceNote: "one-time",
        deliveryTime: "3 weeks",
        icon: PieChart,
      },
      {
        slug: "cohort-retention-analysis",
        name: "Cohort & Retention Analysis",
        shortDescription:
          "A clear breakdown of who sticks around, who churns, and why.",
        description:
          "A detailed cohort and retention analysis segmented by acquisition source, plan, and behavior, surfacing exactly where customers drop off so you know what to fix first.",
        features: [
          "Cohort segmentation setup",
          "Retention curve analysis",
          "Churn driver identification",
          "Actionable findings report",
        ],
        startingPrice: "$699",
        priceNote: "one-time",
        deliveryTime: "1 week",
        icon: UsersRound,
      },
      {
        slug: "data-warehouse-setup",
        name: "Data Warehouse Setup",
        shortDescription:
          "A centralized warehouse that consolidates every data source into one queryable place.",
        description:
          "A centralized cloud data warehouse that consolidates every marketing, product, and sales data source into one place, built on a schema your team can actually query and trust.",
        features: [
          "Warehouse provisioning & schema design",
          "ETL pipeline configuration",
          "Source system integration",
          "Access control & documentation",
        ],
        startingPrice: "$1,799",
        priceNote: "one-time",
        deliveryTime: "2–3 weeks",
        icon: Cloud,
      },
      {
        slug: "executive-reporting-automation",
        name: "Executive Reporting Automation",
        shortDescription:
          "Automated, board-ready reports delivered on a schedule with zero manual pulling.",
        description:
          "Automated executive reporting that compiles your key metrics into a board-ready deck or document on a recurring schedule, eliminating the manual data-pulling every reporting cycle.",
        features: [
          "Key metric identification",
          "Automated report templating",
          "Scheduled delivery configuration",
          "Quarterly template refresh",
        ],
        startingPrice: "$599",
        priceNote: "/month",
        deliveryTime: "Ongoing",
        icon: Presentation,
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
