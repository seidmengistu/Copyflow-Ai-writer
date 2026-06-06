import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { siteConfig } from "@/lib/config";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST() {
  const user = await getCurrentUser();
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "No billing account found." }, { status: 400 });
  }
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "Billing isn't configured." }, { status: 503 });

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${siteConfig.url}/dashboard`,
  });
  return NextResponse.json({ url: session.url });
}
