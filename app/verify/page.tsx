import { CheckCircle2, XCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Verify email", path: "/verify", index: false });
export const dynamic = "force-dynamic";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  let ok = false;
  if (token) {
    const user = await prisma.user.findUnique({ where: { verifyToken: token } });
    if (user && (!user.verifyTokenExpiry || user.verifyTokenExpiry > new Date())) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true, verifyToken: null, verifyTokenExpiry: null },
      });
      ok = true;
    }
  }

  return (
    <div className="container-app py-20">
      <div className="card mx-auto max-w-md p-8 text-center">
        {ok ? (
          <>
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Email verified</h1>
            <p className="mt-2 text-muted">Thanks — your email address is confirmed.</p>
            <Link href="/dashboard" className="btn-primary mt-6">
              Go to dashboard
            </Link>
          </>
        ) : (
          <>
            <XCircle className="mx-auto size-12 text-faint" />
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Link invalid or expired</h1>
            <p className="mt-2 text-muted">
              This verification link is invalid, expired, or already used. You can request a fresh one from your
              dashboard.
            </p>
            <Link href="/dashboard" className="btn-outline mt-6">
              Go to dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
