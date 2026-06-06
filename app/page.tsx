import { ArrowRight, Globe, Sparkles, Wand2, Zap } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PricingCards } from "@/components/PricingCards";
import { ToolCard } from "@/components/ToolCard";
import { siteConfig } from "@/lib/config";
import { LANGUAGES } from "@/lib/languages";
import { softwareAppLd } from "@/lib/seo";
import { toolCategories, tools } from "@/lib/tools";

const steps = [
  { icon: Wand2, title: "Pick a tool", body: "Choose from captions, blog titles, product descriptions, ad copy and more." },
  { icon: Sparkles, title: "Describe what you need", body: "Add a few details and pick a tone. No prompt-writing skills required." },
  { icon: Zap, title: "Generate & copy", body: "Get multiple ready-to-use options in seconds. Copy the one you love." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareAppLd(siteConfig.name, siteConfig.description)} />

      {/* Hero */}
      <section className="hero-glow">
        <div className="container-app py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted shadow-sm">
            <Sparkles className="size-3.5 text-brand" />
            Free AI writing tools · no sign-up to try
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            Write anything in seconds with <span className="text-gradient">AI that just works</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Captions, headlines, product descriptions, ad copy and more — generate scroll-stopping copy in one
            click. Try it free, no account needed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="#tools" className="btn-primary px-6 py-3 text-base">
              Browse free tools
            </Link>
            <Link href="/pricing" className="btn-outline px-6 py-3 text-base">
              See pricing
            </Link>
          </div>
          <p className="mt-4 text-xs text-faint">
            No credit card required · {tools.length} tools · {LANGUAGES.length} languages
          </p>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="container-app scroll-mt-20 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Every tool you need to create faster</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Each tool is purpose-built and free to try. Pick one and start generating.
          </p>
        </div>

        <div className="space-y-12">
          {toolCategories.map((category) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-faint">{category}</h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tools.filter((t) => t.category === category).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="container-app py-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-brand-strong shadow-sm">
          <Globe className="size-3.5" />
          {LANGUAGES.length} languages
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight">
          Create in your language — not just English
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Every tool generates in {LANGUAGES.length} languages, including Arabic, Spanish, French, German and
          Turkish. Pick a language and go.
        </p>
        <div className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {LANGUAGES.map((l) => (
            <span
              key={l.code}
              dir={l.rtl ? "rtl" : "ltr"}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium"
            >
              {l.native}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-subtle">
        <div className="container-app py-16">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">From blank page to done in 3 steps</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand-strong">
                    <s.icon className="size-5" />
                  </span>
                  <span className="text-sm font-bold text-faint">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container-app py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Simple, honest pricing</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">Start free. Upgrade when you need unlimited.</p>
        </div>
        <PricingCards authed={false} />
      </section>

      {/* CTA */}
      <section className="container-app pb-20">
        <div className="card overflow-hidden bg-ink p-10 text-center text-canvas sm:p-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Ready to write faster?</h2>
          <p className="mx-auto mt-2 max-w-md text-canvas/70">
            Join free and get more daily generations, saved history and Pro whenever you want.
          </p>
          <Link href="/signup" className="btn-primary mt-6 inline-flex px-6 py-3 text-base">
            Get started free
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
