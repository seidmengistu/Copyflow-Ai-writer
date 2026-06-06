# Copyflow — AI writing tools SaaS

A complete, monetizable micro-SaaS: a suite of **free AI writing tools** (Instagram
captions, blog titles, product descriptions, ad copy, cover letters and more) with
a **free → Pro subscription** funnel built in.

The business model in one line: free tools rank on Google and pull in traffic →
heavy users hit a daily limit → they upgrade to **Pro ($9/mo)**. ~67 Pro users = ~$600/mo.

**It runs immediately** — no API keys required. Tools work in "demo mode" until you
add an Anthropic key, and the free→signup→limit funnel is fully functional out of the box.

---

## ✨ What's included

- **8 SEO landing pages** (one per tool), statically generated for fast indexing
- **AI generation** via Claude (Anthropic), with a demo fallback so it works key-less
- **Accounts** — email/password auth (hashed + JWT cookie sessions)
- **Usage limits** — anonymous (3/day), free account (10/day), Pro (unlimited)
- **Stripe subscriptions** — Checkout, billing portal, webhooks → auto plan sync
- **Dashboard** — plan status, usage meter, generation history
- **SEO** — per-page metadata, JSON-LD (SoftwareApplication + FAQ), `sitemap.xml`, `robots.txt`
- Pricing, login, signup, privacy & terms pages

## 🧱 Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Prisma (SQLite→Postgres) ·
Anthropic SDK · Stripe · jose + bcryptjs (auth)

---

## 🚀 Quick start

```bash
npm install
cp .env.example .env            # works as-is in demo mode
npx prisma generate
npx prisma db push              # creates the SQLite dev database
npm run dev
```

Open <http://localhost:3000>. Generate captions right away — no keys needed.

## ⚙️ Configuration

| Variable | Needed for | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Always | SQLite locally; Postgres in production. |
| `SESSION_SECRET` | Always | `openssl rand -hex 32`. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical/OG/sitemap origin. |
| `ANTHROPIC_API_KEY` | **Real AI** | Without it, tools return sample results ("demo mode"). |
| `STRIPE_SECRET_KEY` + `STRIPE_PRICE_ID` | **Payments** | A $9/mo recurring Price. |
| `STRIPE_WEBHOOK_SECRET` | Payments | From your webhook endpoint / `stripe listen`. |

### Turn on real AI
Add `ANTHROPIC_API_KEY` from <https://console.anthropic.com>. Each generation with
Claude Haiku costs roughly **$0.002** — so 1,000 generations ≈ $2.

### Turn on payments (Stripe)
1. In Stripe, create a **Product** → recurring **Price** at $9/month. Copy the price id (`price_…`) into `STRIPE_PRICE_ID`.
2. Add `STRIPE_SECRET_KEY` (test or live).
3. Add a webhook endpoint pointing at `/api/stripe/webhook` for `checkout.session.completed` and `customer.subscription.*`, and put its signing secret in `STRIPE_WEBHOOK_SECRET`. Locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## ☁️ Deploy (Vercel)

1. Create a free Postgres DB (Neon or Supabase). Set `DATABASE_URL` to it and change
   `provider = "postgresql"` in `prisma/schema.prisma`, then `npx prisma db push`.
2. Import the repo into Vercel and add all environment variables.
3. Add the Stripe webhook pointing at `https://yourdomain.com/api/stripe/webhook`.

## 📈 The growth playbook (how this makes ~$600/mo)

You have **no audience**, so the tools *are* the marketing:

1. **Programmatic SEO.** Each tool is a page targeting a real search (e.g. "free
   instagram caption generator"). More tools = more pages = more Google traffic.
   Add tools by appending one entry to [`lib/tools.ts`](lib/tools.ts) — no new code.
2. **Index it.** Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
3. **Let people try free** (no sign-up) — great for ranking signals and sharing.
4. **Convert.** Heavy users hit the daily limit → sign up → hit it again → upgrade.

**The math:** Pro is $9/mo. **$600/mo ≈ 67 Pro subscribers.** At a ~2% free→paid
rate, that's ~3,300 active free users — reachable with a few thousand organic
visits/day across 20–40 tool pages. It compounds slowly (3–9 months), then sticks.

> Be honest with yourself about timeline: SEO is a slow build, not a switch. The
> upside is near-zero running cost (AI ~$0.002/gen, hosting free to start) and
> recurring revenue once it ranks.

## ➕ Add a tool in 2 minutes

Append an entry to the `tools` array in [`lib/tools.ts`](lib/tools.ts) (slug, SEO
copy, fields, prompt, examples, FAQs). It instantly becomes a new generator page,
sitemap entry and SEO landing page.

## 🗂️ Structure

```
app/
  page.tsx                 Landing (static)
  tools/[slug]/            Tool pages (static, generateStaticParams)
  pricing · login · signup · dashboard · privacy · terms
  api/generate             AI generation + usage gating
  api/auth/*               signup · login · logout
  api/stripe/*             checkout · portal · webhook
  api/me                   client auth-state endpoint
lib/
  tools.ts                 The tool registry (your SEO surface)
  ai.ts                    Claude generation + demo fallback
  auth.ts · usage.ts       Sessions + rate limiting
  stripe.ts · config.ts · db.ts · seo.ts
prisma/schema.prisma       User + Generation models
```
