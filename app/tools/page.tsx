import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ToolCard } from "@/components/ToolCard";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { toolCategories, tools } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
  title: "All Free AI Writing Tools",
  description: `Browse all ${tools.length} free AI writing tools from ${siteConfig.name} — Instagram captions, blog titles, product descriptions, cover letters, ad copy and more. Free to try, no sign-up.`,
  path: "/tools",
});

export default function ToolsIndexPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free AI writing tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/tools/${t.slug}`,
      name: t.name,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <div className="container-app py-14">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">All free AI writing tools</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
            {tools.length} purpose-built tools — free to try, no sign-up needed.
          </p>
        </div>

        <div className="space-y-12">
          {toolCategories.map((category) => (
            <div key={category}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-faint">{category}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tools
                  .filter((t) => t.category === category)
                  .map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
