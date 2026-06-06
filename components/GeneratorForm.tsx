"use client";

import { Loader2, Lock, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LANGUAGES } from "@/lib/languages";
import { CopyButton } from "./CopyButton";

interface ClientField {
  key: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  required?: boolean;
}

interface LimitState {
  message: string;
  requireUpgrade: boolean;
  requireSignup: boolean;
}

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-brand";

export function GeneratorForm({
  slug,
  fields,
  tones,
}: {
  slug: string;
  fields: ClientField[];
  tones: string[];
}) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [tone, setTone] = useState(tones[0]);
  const [language, setLanguage] = useState("en");
  const [rtl, setRtl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [demo, setDemo] = useState(false);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState<LimitState | null>(null);

  // Pre-select the output language from the visitor's BROWSER language (not IP).
  // Safe + SEO-neutral (it only sets a form default; the user can still change it).
  useEffect(() => {
    const nav = navigator.language?.slice(0, 2).toLowerCase();
    if (nav && nav !== "en" && LANGUAGES.some((l) => l.code === nav)) {
      setLanguage(nav);
    }
  }, []);

  function setField(key: string, value: string) {
    setInputs((s) => ({ ...s, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLimit(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, inputs, tone, language }),
      });
      const data = await res.json();
      if (res.status === 402) {
        setResults([]);
        setLimit({
          message: data.message,
          requireUpgrade: Boolean(data.requireUpgrade),
          requireSignup: Boolean(data.requireSignup),
        });
      } else if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResults(data.variations || []);
        setDemo(Boolean(data.demo));
        setRtl(Boolean(data.rtl));
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input */}
      <form onSubmit={handleSubmit} className="card h-fit p-5 sm:p-6">
        {fields.map((f) => (
          <div key={f.key} className="mb-4">
            <label htmlFor={f.key} className="mb-1.5 block text-sm font-semibold">
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={f.key}
                rows={3}
                required={f.required}
                value={inputs[f.key] || ""}
                onChange={(e) => setField(f.key, e.target.value)}
                placeholder={f.placeholder}
                className={`${inputClass} resize-y`}
              />
            ) : (
              <input
                id={f.key}
                required={f.required}
                value={inputs[f.key] || ""}
                onChange={(e) => setField(f.key, e.target.value)}
                placeholder={f.placeholder}
                className={inputClass}
              />
            )}
          </div>
        ))}

        <div className="mb-5">
          <span className="mb-1.5 block text-sm font-semibold">Tone</span>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  t === tone
                    ? "border-brand bg-brand/10 text-brand-strong"
                    : "border-line text-muted hover:border-brand hover:text-brand-strong"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="language" className="mb-1.5 block text-sm font-semibold">
            Output language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native}
                {l.code !== "en" ? ` — ${l.label}` : ""}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <>
              <Loader2 className="size-4 spinner" /> Generating…
            </>
          ) : (
            <>
              <Sparkles className="size-4" /> Generate
            </>
          )}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>

      {/* Output */}
      <div className="min-h-[18rem]">
        {limit ? (
          <div className="card flex h-full flex-col items-center justify-center p-8 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand-strong">
              <Lock className="size-6" />
            </span>
            <p className="mt-4 max-w-xs font-semibold">{limit.message}</p>
            {limit.requireUpgrade ? (
              <Link href="/pricing" className="btn-primary mt-5">
                Upgrade to Pro — unlimited
              </Link>
            ) : (
              <Link href="/signup" className="btn-primary mt-5">
                Create a free account
              </Link>
            )}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-3">
            {demo && (
              <div className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-2.5 text-xs font-medium text-brand-strong">
                Demo mode — add an Anthropic API key to generate live AI results.
              </div>
            )}
            {results.map((text, i) => (
              <div key={i} className="card flex items-start justify-between gap-3 p-4">
                <p
                  dir={rtl ? "rtl" : "ltr"}
                  className="min-w-0 flex-1 whitespace-pre-wrap text-sm leading-relaxed"
                >
                  {text}
                </p>
                <CopyButton text={text} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card flex h-full flex-col items-center justify-center p-8 text-center text-muted">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-subtle">
              <Wand2 className="size-6 text-faint" />
            </span>
            <p className="mt-4 text-sm">Fill in the form and hit Generate — your results appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
