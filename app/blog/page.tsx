import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: `Practical guides on copywriting, social media, SEO and careers from ${siteConfig.name}.`,
  path: "/blog",
});

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="container-app py-14">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">The {siteConfig.name} Blog</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
          Practical guides on writing, social media, SEO and careers.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-5">
        {sorted.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card group block p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-faint">{p.category}</span>
            <h2 className="mt-2 text-xl font-bold transition-colors group-hover:text-brand-strong">{p.title}</h2>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-faint">
              <time dateTime={p.date}>
                {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </time>
              <span>·</span>
              <span>{p.readMins} min read</span>
              <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-strong">
                Read <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
