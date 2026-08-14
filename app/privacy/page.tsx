import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Orvix collects, uses, and protects information submitted through our website.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="container-page pt-20 pb-24 sm:pt-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Legal
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900">
            Privacy Policy
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-600">
            This policy explains what information Orvix collects when you
            use this website, how we use it, and the choices you have. It
            applies to orvix.com and any forms hosted on it.
          </p>
          <p className="mt-4 text-sm text-ink-400">Last updated: 2026</p>
        </div>

        <div className="mt-14 max-w-3xl space-y-10 border-t border-ink-100 pt-10">
          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Information we collect
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We collect information you choose to give us directly, most
              commonly through our contact and lead forms. This typically
              includes:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-600">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number</li>
              <li>
                The message or project details you choose to share with us
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-ink-600">
              We may also collect limited technical information automatically
              when you browse the site, such as your browser type, device
              type, and general usage patterns, through analytics tools.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              How we use your information
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We use the information you submit to:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-600">
              <li>Respond to your inquiry and follow up on project requests</li>
              <li>Understand your needs so we can scope and quote work accurately</li>
              <li>Maintain records of our communication with you</li>
              <li>
                Improve our website, services, and how we communicate with
                prospective clients
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-ink-600">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Cookies &amp; analytics
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Like most websites, we may use cookies and similar technologies
              to keep the site running smoothly and to understand how visitors
              use it. This can include standard analytics tools that report on
              page views, referral sources, and general visitor behavior in
              aggregate. You can control or disable cookies through your
              browser settings, though some parts of the site may not function
              as intended without them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Third-party services
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              When you submit a form on this site, the details you provide are
              typically processed and delivered to our team via email or a
              form-handling service, so that we can respond to you directly.
              We may also rely on third-party providers for hosting,
              analytics, and communication tools. These providers only
              receive the information needed to perform their function and
              are not permitted to use it for their own purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Data retention
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We keep the information you submit for as long as it is
              reasonably needed to respond to your inquiry, maintain a record
              of our client relationships, and meet our legitimate business
              needs. When information is no longer needed for these purposes,
              we take reasonable steps to remove or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Your rights
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              You can ask us at any time what information we hold about you,
              request a copy of it, ask us to correct it, or ask us to delete
              it. To make a request, reach out through our{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                contact page
              </Link>{" "}
              and we will respond as soon as reasonably possible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Security
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We use reasonable administrative and technical safeguards to
              protect the information you share with us. No method of
              transmission or storage is completely secure, so while we work
              to protect your information, we cannot guarantee its absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Changes to this policy
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We may update this policy from time to time to reflect changes
              to our practices or for other operational, legal, or regulatory
              reasons. When we do, we will update the &ldquo;Last
              updated&rdquo; date above. We encourage you to review this page
              periodically.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Contact us
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              If you have any questions about this Privacy Policy or how we
              handle your information, reach out through our{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                contact page
              </Link>
              .
            </p>
          </section>

          <p className="text-sm leading-relaxed text-ink-400">
            This page is a general template provided for informational
            purposes and does not constitute legal advice. It should be
            reviewed by a qualified professional before being relied upon as
            a finished, legally binding policy.
          </p>
        </div>
      </section>
    </div>
  );
}
