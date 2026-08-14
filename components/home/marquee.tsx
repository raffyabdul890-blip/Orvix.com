const MARQUEE_ITEMS = [
  "TikTok Ads",
  "AI Agents",
  "GoHighLevel",
  "Zapier",
  "Email & SMS",
  "Brand & Video",
  "Hosting & Security",
  "Websites",
];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((label, index) => (
        <span key={index} className="flex items-center">
          <span className="px-6 text-sm font-medium whitespace-nowrap text-ink-600 sm:text-base">
            {label}
          </span>
          <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="group border-y border-ink-100 bg-ink-50/60 py-4">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 group-hover:[animation-play-state:paused]">
          <MarqueeTrack />
          <MarqueeTrack />
        </div>
      </div>
    </div>
  );
}
