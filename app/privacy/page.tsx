import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <div className="container-app py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-faint">Last updated: June 2026</p>

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;) handles your information. This
            is a starting template — please have it reviewed by a professional before launch.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Information we collect</h2>
          <p>
            When you create an account we store your email address and a securely hashed password. When you use
            a tool, we may store the inputs and generated outputs so you can see your history.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Payments</h2>
          <p>
            Payments are processed by Stripe. We never see or store your full card details — Stripe handles that
            securely on our behalf.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">AI processing</h2>
          <p>
            Text you submit to a tool is sent to our AI provider (Anthropic) to generate results. Do not submit
            sensitive personal information.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Cookies</h2>
          <p>
            We use a small number of cookies for sign-in sessions and to track free usage limits. They are not
            used for advertising.
          </p>

          <h2 className="pt-4 text-xl font-bold text-ink">Your choices</h2>
          <p>
            You can delete your account at any time by contacting us at{" "}
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
