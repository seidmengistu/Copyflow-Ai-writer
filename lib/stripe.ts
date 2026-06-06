import "server-only";

import Stripe from "stripe";
import { prisma } from "./db";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

/** Reflect a customer's current Stripe subscription status onto their User.plan. */
export async function syncSubscriptionByCustomer(customerId: string): Promise<void> {
  const stripe = getStripe();
  if (!stripe) return;

  const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 1 });
  const sub = subs.data[0];
  const active = sub ? ["active", "trialing", "past_due"].includes(sub.status) : false;

  await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data: { plan: active ? "pro" : "free", stripeSubId: sub?.id ?? null },
  });
}
