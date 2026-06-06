"use client";

import { Wand2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

interface AuthState {
  authed: boolean;
  plan: string | null;
}

/**
 * Client-rendered auth state so the layout (and therefore the marketing + tool
 * pages) can stay static for SEO. Auth is resolved after mount via /api/me.
 */
export function Header() {
  const pathname = usePathname();
  const [auth, setAuth] = useState<AuthState | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => active && setAuth(d))
      .catch(() => active && setAuth({ authed: false, plan: null }));
    return () => {
      active = false;
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand text-brand-ink">
            <Wand2 className="size-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted sm:flex">
          <Link href="/tools" className="transition-colors hover:text-ink">Tools</Link>
          <Link href="/blog" className="transition-colors hover:text-ink">Blog</Link>
          <Link href="/pricing" className="transition-colors hover:text-ink">Pricing</Link>
        </nav>

        <div className="flex min-h-9 min-w-[128px] items-center justify-end gap-2.5">
          {auth === null ? null : auth.authed ? (
            <>
              {auth.plan === "pro" && (
                <span className="hidden rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand-strong sm:inline">
                  PRO
                </span>
              )}
              <Link href="/dashboard" className="btn-outline">Dashboard</Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-semibold text-muted transition-colors hover:text-ink sm:inline"
              >
                Log in
              </Link>
              <Link href="/signup" className="btn-primary">Sign up free</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
