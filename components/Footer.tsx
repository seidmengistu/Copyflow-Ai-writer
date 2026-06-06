import { Wand2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { tools } from "@/lib/tools";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-subtle">
      <div className="container-app py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand text-brand-ink">
                <Wand2 className="size-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">Popular tools</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {tools.slice(0, 5).map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="text-muted transition-colors hover:text-brand-strong">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">Product</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/tools" className="text-muted hover:text-brand-strong">All tools</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-brand-strong">Blog</Link></li>
              <li><Link href="/pricing" className="text-muted hover:text-brand-strong">Pricing</Link></li>
              <li><Link href="/signup" className="text-muted hover:text-brand-strong">Sign up free</Link></li>
              <li><Link href="/login" className="text-muted hover:text-brand-strong">Log in</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/privacy" className="text-muted hover:text-brand-strong">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-brand-strong">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
