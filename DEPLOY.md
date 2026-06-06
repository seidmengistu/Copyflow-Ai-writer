# Deploying Copyflow (Vercel + Neon Postgres)

The app is production-ready. These are the account-specific steps only you can do
(they need your logins). Total time: **~15 minutes.**

> **Why Postgres?** Local dev uses SQLite (a file), which Vercel's serverless
> hosting can't persist. Production needs a real database — Neon's free tier is
> perfect and takes 2 minutes.

---

## 1. Create a Postgres database (Neon — free)

1. Sign up at **[neon.tech](https://neon.tech)** → create a project.
2. From the dashboard, copy **two** connection strings:
   - **Pooled** (the host contains `-pooler`) → this becomes `DATABASE_URL`
   - **Direct** (no `-pooler`) → this becomes `DIRECT_URL`

## 2. Switch Prisma to Postgres

In **`prisma/schema.prisma`**, replace the `datasource` block with:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## 3. Create the tables in Neon

From the project folder, with the Neon URLs in your `.env`:

```bash
npx prisma db push
```

(You can run the app locally against Neon too — just keep those URLs in `.env`.)

## 4. Push the code to GitHub

```bash
git init && git add -A && git commit -m "Copyflow"
# create an empty repo on github.com, then:
git remote add origin https://github.com/<you>/copyflow.git
git push -u origin main
```

## 5. Import into Vercel

- **[vercel.com](https://vercel.com)** → **New Project** → import your repo.
- Framework preset: **Next.js** (auto-detected). Leave build settings default —
  the build script already runs `prisma generate && next build`.

## 6. Set environment variables in Vercel

Project → **Settings → Environment Variables** (add for Production):

| Key | Value |
| --- | --- |
| `DATABASE_URL` | Neon **pooled** URL |
| `DIRECT_URL` | Neon **direct** URL |
| `SESSION_SECRET` | a long random string — run `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | your live URL, e.g. `https://copyflow.vercel.app` (no trailing slash) |
| `GROQ_API_KEY` | your Groq key |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` |
| `RESEND_API_KEY` | _(optional — for verification emails)_ |
| `EMAIL_FROM` | _(optional, e.g. `Copyflow <noreply@yourdomain.com>`)_ |
| `STRIPE_SECRET_KEY` / `STRIPE_PRICE_ID` / `STRIPE_WEBHOOK_SECRET` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | _(when you turn on payments)_ |

Then click **Deploy**.

## 7. Add a custom domain (recommended for SEO/brand)

Vercel → **Settings → Domains** → add your domain. Then update
`NEXT_PUBLIC_SITE_URL` to match and redeploy.

## 8. Stripe webhook (only when taking payments)

Stripe Dashboard → **Developers → Webhooks → Add endpoint**:
- URL: `https://yourdomain.com/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.*`
- Copy the **Signing secret** into `STRIPE_WEBHOOK_SECRET` in Vercel, redeploy.

## 9. Real emails (only when you want them)

In Resend, **verify your domain**, then set `EMAIL_FROM=noreply@yourdomain.com`.
(Until then, leave `RESEND_API_KEY` blank — verify links log to the server console.)

---

## 10. 🚀 Get indexed — the SEO payoff

This is the step that actually starts traffic:

1. **[Google Search Console](https://search.google.com/search-console)** → add your
   domain → verify (DNS or HTML tag).
2. **Submit your sitemap:** `https://yourdomain.com/sitemap.xml`
3. Use **URL Inspection → Request indexing** for the homepage + your top tool pages.
4. (Optional, easy extra traffic) repeat in **[Bing Webmaster Tools](https://www.bing.com/webmasters)**.

After that, the 40+ pages you built will start getting crawled and ranked. Then
the growth loop is: **add more tools + blog posts → get a few backlinks → repeat.**

---

### Quick checklist
- [ ] Neon DB created, pooled + direct URLs copied
- [ ] `schema.prisma` provider → `postgresql` (+ `directUrl`)
- [ ] `npx prisma db push`
- [ ] Code on GitHub
- [ ] Vercel project imported
- [ ] All env vars set (incl. `NEXT_PUBLIC_SITE_URL`)
- [ ] Deployed ✅
- [ ] Custom domain added
- [ ] Sitemap submitted to Search Console
