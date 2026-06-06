import { NextResponse } from "next/server";
import { generateVariations } from "@/lib/ai";
import { getCurrentUser } from "@/lib/auth";
import { variationsFor, type Plan } from "@/lib/config";
import { prisma } from "@/lib/db";
import { getLanguage } from "@/lib/languages";
import { getTool } from "@/lib/tools";
import { consumeForAnon, consumeForUser } from "@/lib/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { slug?: string; inputs?: Record<string, string>; tone?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const tool = getTool(String(body.slug ?? ""));
  if (!tool) return NextResponse.json({ error: "Unknown tool." }, { status: 404 });

  // Validate + sanitize inputs.
  const inputs: Record<string, string> = {};
  for (const field of tool.fields) {
    const value = typeof body.inputs?.[field.key] === "string" ? body.inputs[field.key].trim() : "";
    if (field.required && !value) {
      return NextResponse.json({ error: `Please fill in: ${field.label}` }, { status: 400 });
    }
    inputs[field.key] = value.slice(0, 1000);
  }
  const tone = tool.tones.includes(String(body.tone)) ? String(body.tone) : tool.tones[0];

  // Gate on usage (per-user if signed in, else per-anonymous-cookie).
  const user = await getCurrentUser();
  const gate = user ? await consumeForUser(user) : await consumeForAnon();
  if (!gate.ok) {
    return NextResponse.json(
      {
        error: "limit",
        message: user
          ? "You've reached today's free limit. Upgrade to Pro for unlimited generations."
          : "You've used your free tries for today. Create a free account for more.",
        requireUpgrade: Boolean(user),
        requireSignup: !user,
        usage: gate.usage,
      },
      { status: 402 },
    );
  }

  const language = getLanguage(String(body.language ?? "en")) ?? getLanguage("en")!;
  let prompt = tool.buildPrompt(inputs, tone);
  if (language.code !== "en") {
    prompt += `\n\nWrite ALL of the output in ${language.label} (${language.native}). Use natural, fluent, culturally appropriate ${language.label} — don't translate word for word.`;
  }

  const count = user ? variationsFor(user.plan as Plan) : 3;
  const { variations, demo } = await generateVariations({
    system: tool.system,
    prompt,
    count,
    fallback: tool.examples,
    taskLabel: tool.short,
  });

  if (user) {
    // Best-effort history; never block the response on it.
    prisma.generation
      .create({
        data: {
          userId: user.id,
          tool: tool.slug,
          input: JSON.stringify({ inputs, tone }),
          output: JSON.stringify(variations),
        },
      })
      .catch(() => {});
  }

  return NextResponse.json({
    variations,
    tone,
    language: language.code,
    rtl: Boolean(language.rtl),
    demo,
    usage: gate.usage,
  });
}
