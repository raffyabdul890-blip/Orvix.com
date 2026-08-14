import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MessageCircle, Send } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Orvix about your project and get a free scoping call — no obligation.",
};

const infoItems = [
  {
    icon: Send,
    title: "Message us",
    description: "Use the form and we'll reply by email",
    href: "#contact-form",
  },
  {
    icon: Clock,
    title: "Response time",
    description: "Within one business day",
  },
  {
    icon: MessageCircle,
    title: "First call",
    description: "Free scoping call, no pressure",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="container-page grid gap-14 pt-20 pb-24 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Contact
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            Let&apos;s build something that works
          </h1>
          <p className="mt-4 max-w-md text-balance leading-relaxed text-ink-600">
            Share a few details about your project and we&apos;ll follow up with
            next steps — usually within one business day.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {infoItems.map((infoItem) => {
              const Icon = infoItem.icon;
              const content = (
                <div className="flex items-center gap-3.5 rounded-2xl border border-ink-100 bg-ink-50/50 px-5 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">
                      {infoItem.title}
                    </p>
                    <p className="text-sm text-ink-600">
                      {infoItem.description}
                    </p>
                  </div>
                </div>
              );

              return infoItem.href ? (
                <Link
                  key={infoItem.title}
                  href={infoItem.href}
                  className="transition-opacity hover:opacity-80"
                >
                  {content}
                </Link>
              ) : (
                <div key={infoItem.title}>{content}</div>
              );
            })}
          </div>
        </div>

        <div
          id="contact-form"
          className="scroll-mt-24 rounded-3xl border border-ink-100 bg-white p-6 shadow-sm shadow-ink-900/5 sm:p-8"
        >
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
