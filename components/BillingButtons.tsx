"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

async function postJson(url: string) {
  const res = await fetch(url, { method: "POST" });
  return { res, data: await res.json().catch(() => ({})) };
}

export function UpgradeButton({
  className = "btn-primary",
  children = "Upgrade to Pro",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setLoading(true);
    setError("");
    try {
      const { res, data } = await postJson("/api/stripe/checkout");
      if (res.status === 401) {
        window.location.href = "/signup";
        return;
      }
      if (!res.ok || !data.url) {
        setError(data.error || "Could not start checkout.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={go} disabled={loading} className={className}>
        {loading ? "Redirecting…" : children}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </>
  );
}

export function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function go() {
    setLoading(true);
    setError("");
    try {
      const { res, data } = await postJson("/api/stripe/portal");
      if (!res.ok || !data.url) {
        setError(data.error || "Could not open billing portal.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error.");
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={go} disabled={loading} className="btn-outline">
        {loading ? "Opening…" : "Manage billing"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function go() {
    setLoading(true);
    await postJson("/api/auth/logout");
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={go} disabled={loading} className="text-sm font-semibold text-muted transition-colors hover:text-ink">
      {loading ? "Logging out…" : "Log out"}
    </button>
  );
}
