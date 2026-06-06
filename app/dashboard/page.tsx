import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton, ManageBillingButton, UpgradeButton } from "@/components/BillingButtons";
import { VerifyEmailBanner } from "@/components/VerifyEmailBanner";
import { getCurrentUser } from "@/lib/auth";
import { isStripeConfigured, LIMITS } from "@/lib/config";
import { prisma } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";
import { getStripe, syncSubscriptionByCustomer } from "@/lib/stripe";
import { getTool } from "@/lib/tools";

export const metadata = pageMetadata({ title: "Dashboard", path: "/dashboard", index: false });

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  let user = await getCurrentUser();
  if (!user) redirect("/login");

  const sp = await searchParams;
  // Self-heal plan status after returning from Stripe Checkout (handy in dev
  // before webhooks are wired up).
  if (sp.upgraded && user.stripeCustomerId && getStripe()) {
    await syncSubscriptionByCustomer(user.stripeCustomerId);
    const fresh = await getCurrentUser();
    if (fresh) user = fresh;
  }

  const isPro = user.plan === "pro";
  const usedToday = new Date() < user.dailyResetAt ? user.dailyCount : 0;
  const recent = await prisma.generation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div className="container-app py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
        </div>
        <LogoutButton />
      </div>

      {sp.upgraded && isPro && (
        <div className="mt-6 rounded-xl border border-success/30 bg-success/5 px-4 py-3 text-sm font-medium text-success">
          🎉 You&apos;re on Pro — enjoy unlimited generations!
        </div>
      )}

      {!user.emailVerified && <VerifyEmailBanner email={user.email} />}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Your plan</h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                isPro ? "bg-brand/10 text-brand-strong" : "bg-subtle text-muted"
              }`}
            >
              {isPro ? "PRO" : "FREE"}
            </span>
          </div>

          {isPro ? (
            <>
              <p className="mt-3 text-sm text-muted">
                Unlimited generations, 5 variations per request, and access to every tool.
              </p>
              <div className="mt-5">
                {isStripeConfigured() ? (
                  <ManageBillingButton />
                ) : (
                  <span className="text-xs text-faint">Billing portal is available once Stripe is configured.</span>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-muted">
                You&apos;ve used <strong>{usedToday}</strong> of <strong>{LIMITS.freeDaily}</strong> free
                generations today.
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-subtle">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${Math.min(100, (usedToday / LIMITS.freeDaily) * 100)}%` }}
                />
              </div>
              <div className="mt-5">
                <UpgradeButton>Upgrade to Pro — $9/mo</UpgradeButton>
              </div>
            </>
          )}
        </div>

        <div className="card flex flex-col p-6">
          <h2 className="text-lg font-bold">Start creating</h2>
          <p className="mt-2 flex-1 text-sm text-muted">Jump into a tool and generate something great.</p>
          <Link href="/#tools" className="btn-outline mt-4 w-full">
            Browse tools
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold">Recent generations</h2>
        {recent.length === 0 ? (
          <div className="card p-8 text-center text-sm text-muted">
            Nothing yet — your generated copy will show up here.
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((g) => {
              const tool = getTool(g.tool);
              let first = "";
              try {
                const arr = JSON.parse(g.output);
                first = Array.isArray(arr) ? String(arr[0] ?? "") : "";
              } catch {
                /* ignore */
              }
              return (
                <div key={g.id} className="card p-4">
                  <div className="flex items-center justify-between text-xs text-faint">
                    <span className="font-semibold text-brand-strong">{tool?.name ?? g.tool}</span>
                    <time>{new Date(g.createdAt).toLocaleString()}</time>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm">{first}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
