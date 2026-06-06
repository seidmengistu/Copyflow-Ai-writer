import { ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ToolIcon } from "@/components/ToolIcon";
import { getPost, posts } from "@/lib/blog";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return pageMetadata({ title: "Post not found", index: false });
  return pageMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}` });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const tool = getTool(post.tool);

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            title: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            datePublished: post.date,
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="container-app py-10">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <ChevronRight className="size-3.5 text-faint" />
            <Link href="/blog" className="hover:text-ink">Blog</Link>
          </nav>

          <span className="text-xs font-bold uppercase tracking-widest text-faint">{post.category}</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.readMins} min read</span>
          </div>

          {/* Body is trusted, authored HTML from lib/blog.ts */}
          <div className="prose-cf mt-8" dangerouslySetInnerHTML={{ __html: post.body }} />

          {tool && (
            <div className="card mt-12 flex flex-col gap-4 bg-subtle p-6 sm:flex-row sm:items-center">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand-strong">
                <ToolIcon name={tool.icon} className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold">Try the free {tool.name}</h2>
                <p className="text-sm text-muted">{tool.tagline}</p>
              </div>
              <Link href={`/tools/${tool.slug}`} className="btn-primary shrink-0">
                Open tool
                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
