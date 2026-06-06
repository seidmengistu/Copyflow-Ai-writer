import { Check } from "lucide-react";
import Link from "next/link";
import { freeFeatures, PRO_PRICE_MONTHLY, proFeatures } from "@/lib/config";
import { UpgradeButton } from "./BillingButtons";

export function PricingCards({ authed = false, isPro = false }: { authed?: boolean; isPro?: boolean }) {
  return (
    <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
      <div className="card flex flex-col p-6">
        <h3 className="text-lg font-bold">Free</h3>
        <p className="mt-1 text-4xl font-extrabold">
          $0<span className="text-base font-medium text-muted">/mo</span>
        </p>
        <p className="mt-1 text-sm text-muted">Everything to get started.</p>
        <ul className="mt-5 flex-1 space-y-2.5 text-sm">
          {freeFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {f}
            </li>
          ))}
        </ul>
        <Link href="/signup" className="btn-outline mt-6 w-full">
          Get started free
        </Link>
      </div>

      <div className="card relative flex flex-col border-brand/40 p-6 ring-1 ring-brand/20">
        <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-ink">
          MOST POPULAR
        </span>
        <h3 className="text-lg font-bold">Pro</h3>
        <p className="mt-1 text-4xl font-extrabold">
          ${PRO_PRICE_MONTHLY}
          <span className="text-base font-medium text-muted">/mo</span>
        </p>
        <p className="mt-1 text-sm text-muted">For creators &amp; businesses who ship daily.</p>
        <ul className="mt-5 flex-1 space-y-2.5 text-sm">
          {proFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {isPro ? (
            <div className="btn-outline w-full cursor-default border-success/40 text-success">
              You&apos;re on Pro ✓
            </div>
          ) : authed ? (
            <UpgradeButton className="btn-primary w-full">Upgrade to Pro</UpgradeButton>
          ) : (
            <Link href="/signup" className="btn-primary w-full">
              Start with Pro
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
