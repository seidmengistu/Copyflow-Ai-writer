import { PricingCards } from "@/components/PricingCards";
import { getCurrentUser } from "@/lib/auth";
import { isStripeConfigured } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description: "Simple pricing — start free, upgrade to Copyflow Pro for unlimited AI generations.",
  path: "/pricing",
});

const faqs = [
  { q: "Is there really a free plan?", a: "Yes. You can use every tool for free, with a generous daily limit. No credit card required." },
  { q: "Can I cancel anytime?", a: "Absolutely. Pro is month-to-month — cancel in one click from your dashboard and keep access until the period ends." },
  { q: "What happens when I hit my free limit?", a: "You'll be prompted to upgrade. Your limit resets every day, so you can also just come back tomorrow." },
];

export default async function PricingPage() {
  const user = await getCurrentUser();

  return (
    <div className="container-app py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Simple, honest pricing</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
          Start free. Upgrade to Pro for unlimited generations whenever you&apos;re ready.
        </p>
      </div>

      <PricingCards authed={Boolean(user)} isPro={user?.plan === "pro"} />

      {!isStripeConfigured() && (
        <p className="mt-8 text-center text-xs text-faint">
          Payments aren&apos;t enabled in this environment yet — add your Stripe keys to start charging.
        </p>
      )}

      <section className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center text-2xl font-bold tracking-tight">Pricing FAQ</h2>
        <div className="card mt-6 divide-y divide-line">
          {faqs.map((f) => (
            <div key={f.q} className="p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
