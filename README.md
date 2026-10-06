# Copyflow

Copyflow is a full-stack AI writing workspace that turns structured inputs into marketing and professional copy. It combines focused writing tools with authentication, usage limits, generation history, email verification, and optional subscription billing.

## What it demonstrates

- Production-style Next.js application architecture with server-side API routes
- Pluggable AI providers through Groq and Anthropic
- Prompt-injection resistance, input validation, and structured response parsing
- Secure password hashing and signed, HTTP-only session cookies
- PostgreSQL persistence with Prisma
- Stripe Checkout, customer portal, and webhook integration
- Anonymous, free, and paid usage tiers

## Product capabilities

- Generate social captions, blog titles, product descriptions, advertisements, emails, cover letters, and other short-form copy
- Select a tone and output language for each generation
- Return multiple copy variations in a predictable JSON format
- Continue in demo mode when no AI provider is configured
- Create an account, verify an email address, and review generation history
- Track daily usage and upgrade to a paid plan

## Architecture

```text
Browser
  -> Next.js pages and React components
  -> Next.js route handlers
      -> authentication and usage controls
      -> Groq or Anthropic
      -> Prisma -> PostgreSQL
      -> Stripe / Resend
```

| Area | Technology |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| AI | Groq API, Anthropic SDK |
| Data | PostgreSQL, Prisma ORM |
| Authentication | bcryptjs, signed JWT sessions in HTTP-only cookies |
| Billing | Stripe Checkout, customer portal, webhooks |
| Email | Resend, with a local console fallback |

## Project layout

```text
app/
  api/                 Authentication, generation, account, and billing routes
  dashboard/           Account usage and generation history
  tools/               Writing-tool pages
components/            Reusable forms, navigation, pricing, and UI components
lib/
  ai.ts                AI-provider selection and response parsing
  auth.ts              Password and session handling
  tools.ts             Tool definitions and prompt builders
  usage.ts             Anonymous and account usage limits
  stripe.ts            Subscription helpers
prisma/schema.prisma   User and generation data model
```

## Getting started

### Requirements

- Node.js 20 or newer
- PostgreSQL
- Optional: a Groq or Anthropic API key
- Optional: Stripe and Resend accounts

### 1. Install and configure

```bash
git clone https://github.com/seidmengistu/Copyflow-Ai-writer.git
cd Copyflow-Ai-writer
npm install
cp .env.example .env.local
```

Set at least the database and session values:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/copyflow
DIRECT_URL=postgresql://USER:PASSWORD@HOST:5432/copyflow
SESSION_SECRET=replace-with-a-long-random-value
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Add either `GROQ_API_KEY` or `ANTHROPIC_API_KEY` for live generations. Without one, Copyflow uses its built-in examples in demo mode. Email verification also falls back to logging the verification link locally when Resend is not configured.

### 2. Prepare the database

```bash
npx prisma generate
npx prisma db push
```

### 3. Run the application

```bash
npm run dev
```

Open `http://localhost:3000`.

## Optional Stripe setup

Set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. During local development, forward Stripe events to the webhook route:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Quality checks

```bash
npm run lint
npm run build
```

## Security notes

- Secrets belong in local environment files and must never be committed.
- Passwords are hashed with bcrypt.
- Sessions use signed tokens stored in HTTP-only, same-site cookies.
- Generation inputs are length-limited and treated as content rather than executable instructions.
- Stripe subscription state is updated through verified webhook events.

Before a public production launch, add automated tests, rate limiting backed by shared storage, monitoring, and a documented database-migration workflow.

## Author

[Seid Mengistu](https://github.com/seidmengistu)
