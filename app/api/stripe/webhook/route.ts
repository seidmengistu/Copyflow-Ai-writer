import { NextResponse } from "next/server";
import { getStripe, syncSubscriptionByCustomer } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RELEVANT = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const stripe = getStripe();
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !whSecret) return new NextResponse("Webhook not configured", { status: 503 });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (err) {
    return new NextResponse(`Bad signature: ${(err as Error).message}`, { status: 400 });
  }

  if (RELEVANT.has(event.type)) {
    const obj = event.data.object as { customer?: string | { id: string } };
    const customerId = typeof obj.customer === "string" ? obj.customer : obj.customer?.id;
    if (customerId) await syncSubscriptionByCustomer(customerId);
  }

  return NextResponse.json({ received: true });
}
