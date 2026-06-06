import { ChevronRight, Globe } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GeneratorForm } from "@/components/GeneratorForm";
import { JsonLd } from "@/components/JsonLd";
import { ToolCard } from "@/components/ToolCard";
import { ToolIcon } from "@/components/ToolIcon";
import { breadcrumbLd, faqLd, pageMetadata, softwareAppLd } from "@/lib/seo";
import { LANGUAGES } from "@/lib/languages";
import { getTool, type Tool, tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return pageMetadata({ title: "Tool not found", index: false });
  return pageMetadata({ title: tool.seoTitle, description: tool.seoDescription, path: `/tools/${tool.slug}` });
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tool.related.map(getTool).filter((t): t is Tool => Boolean(t));

  return (
    <>
      <JsonLd
        data={[
          softwareAppLd(tool.name, tool.seoDescription),
          faqLd(tool.faqs),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool.short, path: `/tools/${tool.slug}` },
          ]),
        ]}
      />

      <div className="container-app py-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="size-3.5 text-faint" />
          <Link href="/#tools" className="hover:text-ink">Tools</Link>
          <ChevronRight className="size-3.5 text-faint" />
          <span className="font-medium text-ink">{tool.short}</span>
        </nav>

        <header className="mb-8 flex items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-strong">
            <ToolIcon name={tool.icon} className="size-6" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{tool.name}</h1>
            <p className="mt-1.5 max-w-2xl text-muted">{tool.intro}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-strong">
              <Globe className="size-3.5" />
              Works in {LANGUAGES.length} languages
            </span>
          </div>
        </header>

        <GeneratorForm slug={tool.slug} fields={tool.fields} tones={tool.tones} />

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">Example {tool.name.toLowerCase()} results</h2>
          <p className="mt-1.5 text-sm text-muted">A sample of what this tool produces:</p>
          <div className="mt-4 space-y-3">
            {tool.examples.map((ex, i) => (
              <div key={i} className="card p-4 text-sm leading-relaxed">{ex}</div>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <div className="card mt-4 divide-y divide-line">
            {tool.faqs.map((f, i) => (
              <div key={i} className="p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Related tools</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
