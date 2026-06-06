import "server-only";

import crypto from "node:crypto";
import { siteConfig } from "./config";

export function newVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Sends a verification email via Resend. If RESEND_API_KEY is not set, it runs
 * in "console mode" — logging the verify link so the flow is fully testable
 * before any email provider is configured. Never throws: verification is a
 * soft, non-blocking nicety, so it must never break sign-up.
 */
export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const verifyUrl = `${siteConfig.url}/verify?token=${token}`;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`\n[email] (no RESEND_API_KEY — console mode)\n[email] Verify ${to}: ${verifyUrl}\n`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || `${siteConfig.name} <onboarding@resend.dev>`,
        to: [to],
        subject: `Confirm your email for ${siteConfig.name}`,
        html: buildHtml(verifyUrl),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[email] Resend ${res.status}: ${detail.slice(0, 200)}`);
      console.log(`[email] Verify ${to}: ${verifyUrl}`);
    }
  } catch (err) {
    console.error("[email] send failed:", (err as Error).message);
  }
}

function buildHtml(verifyUrl: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;padding:32px;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e8e9f1;border-radius:16px;padding:32px;">
    <h1 style="font-size:20px;margin:0 0 8px;color:#0f1222;">Confirm your email</h1>
    <p style="color:#565d75;font-size:14px;line-height:1.6;margin:0 0 16px;">Thanks for joining ${siteConfig.name}! Tap the button below to confirm your email address.</p>
    <a href="${verifyUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:12px;">Confirm email</a>
    <p style="color:#9398ad;font-size:12px;line-height:1.6;margin:20px 0 0;">Or paste this link into your browser:<br>${verifyUrl}</p>
    <p style="color:#9398ad;font-size:12px;margin:12px 0 0;">If you didn't sign up, you can safely ignore this email.</p>
  </div></body></html>`;
}
