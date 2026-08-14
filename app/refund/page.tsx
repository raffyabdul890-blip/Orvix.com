import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How Orvix approaches deposits, milestones, and refunds for project-based and ongoing work.",
};

export default function RefundPage() {
  return (
    <div className="bg-white">
      <section className="container-page pt-20 pb-24 sm:pt-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Legal
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900">
            Refund Policy
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-600">
            This page explains our general approach to deposits, milestones,
            and refunds. It is a starting point — the specific payment and
            refund terms for your project are always set out in your signed
            proposal or agreement, which takes precedence over this page.
          </p>
          <p className="mt-4 text-sm text-ink-400">Last updated: 2026</p>
        </div>

        <div className="mt-14 max-w-3xl space-y-10 border-t border-ink-100 pt-10">
          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Our general approach
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Most Orvix engagements are scoped, quoted, and agreed with the
              client before any work begins. Project-based work is typically
              organized into a deposit and one or more milestone payments
              tied to defined stages of delivery. Ongoing work, such as
              retainers for marketing or automation support, is generally
              billed on a recurring basis for the period in which the work is
              delivered. Because engagements vary in scope, the exact payment
              structure for your project is defined in your proposal, not on
              this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              When refunds may apply
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We want you to be satisfied with the work we deliver. Refunds
              may be considered, at our discretion and in line with your
              signed agreement, in situations such as:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-600">
              <li>
                A project is cancelled before meaningful work has begun on a
                paid milestone
              </li>
              <li>
                We are unable to deliver a scoped milestone and both parties
                agree the work should not proceed
              </li>
              <li>
                A billing error results in an overcharge for services not
                rendered
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              When refunds don&apos;t apply
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              As a general rule, refunds are not provided for:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-600">
              <li>Milestones that have already been completed and delivered</li>
              <li>
                Retainer or subscription periods for months already in
                progress or already delivered
              </li>
              <li>
                Third-party costs already incurred on your behalf, such as
                software licenses, ad spend, domain names, or hosting
              </li>
              <li>
                A simple change of mind after work has been approved and
                completed as scoped
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              How to request a refund
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              If you believe you are entitled to a refund, reach out through
              our{" "}
              <Link
                href="/contact"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                contact page
              </Link>{" "}
              with your project or invoice details and a brief explanation of
              your request. We will review it against your signed agreement
              and respond as soon as reasonably possible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Changes to this policy
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We may update this policy from time to time. When we do, we
              will update the &ldquo;Last updated&rdquo; date above. Changes
              to this page do not retroactively apply to agreements already
              signed.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Contact us
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              If you have any questions about this Refund Policy, reach out
              through our{" "}
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
            purposes and does not constitute legal or financial advice. It
            should be reviewed by a qualified professional and reconciled
            with your actual client agreements before being relied upon as
            finished policy.
          </p>
        </div>
      </section>
    </div>
  );
}
