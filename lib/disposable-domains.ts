/**
 * Common disposable / temporary email domains to reject at sign-up.
 *
 * This is a lightweight, zero-friction filter — it blocks the obvious throwaway
 * providers without inconveniencing real users or sending any email. It is NOT
 * exhaustive (there are thousands), but it catches the bulk of casual junk
 * sign-ups. For true reachability, pair this with (soft) email verification.
 */
export const DISPOSABLE_EMAIL_DOMAINS = new Set<string>([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "grr.la",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "tempmail.net",
  "tempr.email",
  "tempmailo.com",
  "throwawaymail.com",
  "yopmail.com",
  "yopmail.fr",
  "getnada.com",
  "nada.email",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "trashmail.com",
  "trashmail.de",
  "mailnesia.com",
  "mohmal.com",
  "emailondeck.com",
  "moakt.com",
  "mintemail.com",
  "spamgourmet.com",
  "tempinbox.com",
  "discard.email",
  "spam4.me",
  "33mail.com",
  "mailcatch.com",
  "1secmail.com",
  "1secmail.org",
  "wegwerfmail.de",
  "cuvox.de",
  "armyspy.com",
  "dayrep.com",
  "einrot.com",
  "fleckens.hu",
  "jourrapide.com",
  "rhyta.com",
  "superrito.com",
  "teleworm.us",
  "byom.de",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
}
