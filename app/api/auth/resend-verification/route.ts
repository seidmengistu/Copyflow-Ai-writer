import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { newVerificationToken, sendVerificationEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (user.emailVerified) return NextResponse.json({ ok: true, alreadyVerified: true });

  const token = newVerificationToken();
  await prisma.user.update({
    where: { id: user.id },
    data: { verifyToken: token, verifyTokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  });
  await sendVerificationEmail(user.email, token);

  return NextResponse.json({ ok: true });
}
