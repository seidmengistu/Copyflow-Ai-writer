import "server-only";

import { cookies } from "next/headers";
import type { User } from "@prisma/client";
import { LIMITS } from "./config";
import { prisma } from "./db";

export interface UsageState {
  used: number;
  limit: number | null; // null = unlimited (Pro)
  remaining: number | null;
  plan: "anon" | "free" | "pro";
}

const ANON_COOKIE = "cf_anon";

function nextMidnight(from = new Date()): Date {
  const d = new Date(from);
  d.setHours(24, 0, 0, 0);
  return d;
}

/** Check + atomically consume one generation for a signed-in user. */
export async function consumeForUser(user: User): Promise<{ ok: boolean; usage: UsageState }> {
  if (user.plan === "pro") {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { dailyCount: { increment: 1 } },
    });
    return { ok: true, usage: { used: updated.dailyCount, limit: null, remaining: null, plan: "pro" } };
  }

  const now = new Date();
  let count = user.dailyCount;
  let resetAt = user.dailyResetAt;
  if (now >= resetAt) {
    count = 0;
    resetAt = nextMidnight(now);
  }

  const limit = LIMITS.freeDaily;
  if (count >= limit) {
    await prisma.user.update({ where: { id: user.id }, data: { dailyCount: count, dailyResetAt: resetAt } });
    return { ok: false, usage: { used: count, limit, remaining: 0, plan: "free" } };
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { dailyCount: count + 1, dailyResetAt: resetAt },
  });
  return {
    ok: true,
    usage: { used: updated.dailyCount, limit, remaining: limit - updated.dailyCount, plan: "free" },
  };
}

/** Check + consume for an anonymous visitor, tracked in a signed-ish cookie. */
export async function consumeForAnon(): Promise<{ ok: boolean; usage: UsageState }> {
  const store = await cookies();
  const today = new Date().toISOString().slice(0, 10);
  let count = 0;
  const raw = store.get(ANON_COOKIE)?.value;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { d: string; c: number };
      if (parsed.d === today) count = parsed.c || 0;
    } catch {
      /* ignore malformed cookie */
    }
  }

  const limit = LIMITS.anonDaily;
  if (count >= limit) {
    return { ok: false, usage: { used: count, limit, remaining: 0, plan: "anon" } };
  }

  count += 1;
  store.set(ANON_COOKIE, JSON.stringify({ d: today, c: count }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return { ok: true, usage: { used: count, limit, remaining: limit - count, plan: "anon" } };
}
