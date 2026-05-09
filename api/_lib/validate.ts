export const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ValidationResult =
  | { ok: true; truncatedMessage?: string }
  | { ok: false; status: 200; honeypot: true }
  | { ok: false; status: 400; error: string };

export function validateContactForm(input: any): ValidationResult {
  // 1. Honeypot — silent reject
  if (input?.website && String(input.website).trim() !== "") {
    return { ok: false, status: 200, honeypot: true };
  }

  // 2. Required fields
  const name = String(input?.name ?? "").trim();
  const phone = String(input?.phone ?? "").trim();
  const email = String(input?.email ?? "").trim();
  const message = String(input?.message ?? "").trim();

  if (!name || !phone || !email || !message) {
    return {
      ok: false,
      status: 400,
      error: "Bitte alle Pflichtfelder ausfüllen.",
    };
  }

  // 3. Email format
  if (!EMAIL_REGEX.test(email)) {
    return {
      ok: false,
      status: 400,
      error: "Bitte gültige E-Mail eingeben.",
    };
  }

  // 4. Datenschutz
  if (input?.datenschutz !== true) {
    return {
      ok: false,
      status: 400,
      error: "Bitte Datenschutz akzeptieren.",
    };
  }

  // 5. Length-Limit
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: true,
      truncatedMessage: message.slice(0, MAX_MESSAGE_LENGTH) + " [gekürzt]",
    };
  }
  return { ok: true };
}
