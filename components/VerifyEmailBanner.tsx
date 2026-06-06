"use client";

import { CheckCircle2, MailWarning } from "lucide-react";
import { useState } from "react";

export function VerifyEmailBanner({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function resend() {
    setState("sending");
    try {
      const res = await fetch("/api/auth/resend-verification", { method: "POST" });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-center gap-2">
        <MailWarning className="size-5 shrink-0" />
        <span>
          Please confirm your email <strong>{email}</strong> to secure your account.
        </span>
      </span>
      {state === "sent" ? (
        <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-success">
          <CheckCircle2 className="size-4" /> Sent — check your inbox
        </span>
      ) : (
        <button
          type="button"
          onClick={resend}
          disabled={state === "sending"}
          className="shrink-0 rounded-lg bg-amber-900 px-3 py-1.5 text-xs font-semibold text-amber-50 transition-colors hover:bg-amber-800 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : state === "error" ? "Try again" : "Resend email"}
        </button>
      )}
    </div>
  );
}
