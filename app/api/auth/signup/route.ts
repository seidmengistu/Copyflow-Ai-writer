import { NextResponse } from "next/server";
import { createSession, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isDisposableEmail } from "@/lib/disposable-domains";
import { newVerificationToken, sendVerificationEmail } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  const e = String(email ?? "").trim().toLowerCase();
  const p = String(password ?? "");

  if (!EMAIL_RE.test(e)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (isDisposableEmail(e)) {
    return NextResponse.json(
      { error: "Please use a permanent email address — temporary email providers aren't allowed." },
      { status: 400 },
    );
  }
  if (p.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email: e } });
  if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });

  const token = newVerificationToken();
  const user = await prisma.user.create({
    data: {
      email: e,
      passwordHash: await hashPassword(p),
      verifyToken: token,
      verifyTokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  await createSession(user.id);
  // Soft, non-blocking verification — never let an email failure break sign-up.
  await sendVerificationEmail(e, token);
  return NextResponse.json({ ok: true });
}
