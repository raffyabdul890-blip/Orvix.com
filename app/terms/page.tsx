import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Orvix website and engagement with our services.",
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="container-page pt-20 pb-24 sm:pt-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Legal
          </span>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink-900">
            Terms of Service
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-ink-600">
            These terms govern your use of the Orvix website and, at a
            general level, our working relationship as a client or
            prospective client. Please read them before using the site or
            engaging our services.
          </p>
          <p className="mt-4 text-sm text-ink-400">Last updated: 2026</p>
        </div>

        <div className="mt-14 max-w-3xl space-y-10 border-t border-ink-100 pt-10">
          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Acceptance of terms
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              By accessing or using this website, submitting a form, or
              engaging Orvix for services, you agree to these Terms of
              Service. If you do not agree with any part of these terms,
              please do not use the site or our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Description of services
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Orvix is a digital agency offering services across five broad
              disciplines: development, growth marketing, automation,
              security, and branding. The specific scope, deliverables,
              timeline, and cost of any engagement are agreed separately with
              each client and are not defined by this page. Nothing on this
              website constitutes a binding offer to provide services on
              specific terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Use of the site
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              You agree to use this website only for lawful purposes and in a
              way that does not infringe the rights of, or restrict or
              inhibit the use and enjoyment of, this site by anyone else.
              This includes not attempting to gain unauthorized access to our
              systems, not submitting false or misleading information through
              our forms, and not using the site to distribute harmful or
              unlawful content.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Intellectual property
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              Unless otherwise stated, the content on this website — including
              text, graphics, logos, and design — is the property of Orvix or
              its licensors and is protected by applicable intellectual
              property laws. You may view and share pages of this site for
              personal, non-commercial reference, but you may not reproduce,
              copy, or repurpose the content for commercial use without our
              prior written permission. Ownership of deliverables produced as
              part of a client engagement is addressed separately in that
              client&apos;s agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Payment &amp; engagement terms
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              This website is informational and does not itself process
              payments or create a service agreement. Pricing, payment
              schedules, milestones, and the specific terms of any project or
              retainer are set out in a separate proposal or agreement signed
              with each client, and those terms govern the engagement rather
              than anything stated on this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Limitation of liability
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              This website and its content are provided on an &ldquo;as
              is&rdquo; and &ldquo;as available&rdquo; basis, without
              warranties of any kind, express or implied. To the fullest
              extent permitted, Orvix is not liable for any indirect,
              incidental, or consequential loss or damage arising from your
              use of this website. This section does not limit any liability
              that cannot be excluded or limited under applicable law, and
              does not affect the specific liability terms set out in a
              signed client agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Changes to these terms
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              We may update these Terms of Service from time to time to
              reflect changes to our website, services, or legal
              requirements. When we do, we will update the &ldquo;Last
              updated&rdquo; date above. Continued use of the site after
              changes are posted means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink-900">
              Contact us
            </h2>
            <p className="mt-3 leading-relaxed text-ink-600">
              If you have any questions about these Terms of Service, reach
              out through our{" "}
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
            a finished, legally binding agreement.
          </p>
        </div>
      </section>
    </div>
  );
}
