import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateContactForm } from "./_lib/validate";
import { buildEmailBody, buildEmailSubject } from "./_lib/buildEmailBody";
import { checkRateLimit } from "./_lib/rateLimit";
import { parseRecipients } from "./_lib/recipients";

const SENDER = "Gastro Master Kontakt <onboarding@resend.dev>";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Method check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Fail-fast on missing config
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[api/contact] RESEND_API_KEY missing");
    return res.status(500).json({
      error: "Server-Konfiguration unvollständig. Bitte direkt an info@gastro-master.de mailen.",
    });
  }

  const recipients = parseRecipients(process.env.CONTACT_RECIPIENTS);
  if (recipients.length === 0) {
    console.error(
      "[api/contact] CONTACT_RECIPIENTS missing or contains no valid addresses",
    );
    return res.status(500).json({
      error: "Server-Konfiguration unvollständig. Bitte direkt an info@gastro-master.de mailen.",
    });
  }

  const resend = new Resend(apiKey);

  // Validation (incl. honeypot, email format, datenschutz, length)
  const validation = validateContactForm(req.body);

  if (validation.ok === false && "honeypot" in validation) {
    // Silent success: bot doesn't learn anything
    return res.status(200).json({ success: true });
  }
  if (validation.ok === false) {
    return res.status(validation.status).json({ error: validation.error });
  }

  // Rate-Limit (fail-open on KV outage)
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
    req.socket?.remoteAddress ??
    "unknown";
  const rl = await checkRateLimit(ip);
  if (!rl.allowed) {
    return res.status(429).json({
      error: "Zu viele Anfragen. Bitte später erneut versuchen.",
    });
  }

  // Apply truncation if message was too long
  const formData = {
    ...req.body,
    message: validation.truncatedMessage ?? req.body.message,
  };

  // Send email via Resend (multi-recipient)
  try {
    const { error } = await resend.emails.send({
      from: SENDER,
      to: recipients,
      replyTo: formData.email,
      subject: buildEmailSubject(formData),
      html: buildEmailBody(formData),
    });

    if (error) {
      console.error("[api/contact] Resend error:", error);
      return res.status(500).json({
        error: "E-Mail konnte nicht gesendet werden. Bitte direkt an info@gastro-master.de mailen.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return res.status(500).json({
      error: "Ein unerwarteter Fehler ist aufgetreten. Bitte direkt an info@gastro-master.de mailen.",
    });
  }
}
