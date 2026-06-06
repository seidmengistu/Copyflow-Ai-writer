import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { ToolIcon } from "./ToolIcon";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="card group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_28px_-12px_rgb(79_70_229/0.35)]"
    >
      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand-strong">
        <ToolIcon name={tool.icon} className="size-5" />
      </span>
      <h3 className="mt-3 font-bold">{tool.name}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted">{tool.tagline}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong">
        Try free
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
