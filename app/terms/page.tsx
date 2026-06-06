import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms of Service", path: "/terms" });

export default function TermsPage() {
  return (
    <div className="container-app py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-faint">Last updated: June 2026</p>

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            By using {siteConfig.name} you agree to these terms. This is a template and should be reviewed by a
            professional before launch.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Using the service</h2>
          <p>
            {siteConfig.name} generates text with AI. You are responsible for reviewing and editing generated
            content before publishing it. Do not use the service for unlawful, harmful, or abusive content.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Your content</h2>
          <p>
            You own the inputs you provide and the outputs you generate, and you&apos;re free to use generated
            content commercially. AI output may be similar to content generated for other users.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Plans &amp; billing</h2>
          <p>
            The free plan includes a daily usage limit. Pro is billed monthly via Stripe and can be cancelled
            anytime; access continues until the end of the paid period.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">No warranty</h2>
          <p>
            The service is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for
            how generated content is used.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Contact</h2>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-strong">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
