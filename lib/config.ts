export const siteConfig = {
  name: "Copyflow",
  tagline: "Free AI writing tools that save you hours.",
  description:
    "Copyflow is a suite of free AI writing tools — generate Instagram captions, blog titles, product descriptions, cover letters, ad copy and more in seconds. No sign-up to try.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  twitter: "@copyflow",
  email: "hello@copyflow.app",
} as const;

/** Pricing + usage limits — the core of the free→paid funnel. */
export const PRO_PRICE_MONTHLY = 9;

export const LIMITS = {
  /** Generations/day for anonymous visitors (try-before-signup). */
  anonDaily: 1,
  /** Generations/day for signed-in free accounts. */
  freeDaily: 3,
  /** Variations returned per generation. */
  variationsFree: 3,
  variationsPro: 5,
} as const;

export type Plan = "free" | "pro";

export const proFeatures = [
  "Unlimited generations",
  "5 variations per request (vs 3)",
  "All current & future tools",
  "Priority AI — faster, higher quality",
  "Generation history saved",
  "No ads, cancel anytime",
];

export const freeFeatures = [
  `${LIMITS.freeDaily} generations per day`,
  `${LIMITS.variationsFree} variations per request`,
  "Access to every tool",
  "No watermark",
];

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID);
}

export function isAiConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY || process.env.ANTHROPIC_API_KEY);
}

export function dailyLimitFor(plan: Plan): number {
  return plan === "pro" ? Infinity : LIMITS.freeDaily;
}

export function variationsFor(plan: Plan): number {
  return plan === "pro" ? LIMITS.variationsPro : LIMITS.variationsFree;
}
