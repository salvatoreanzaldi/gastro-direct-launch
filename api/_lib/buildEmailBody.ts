import { escapeHtml } from "./sanitize";

export interface ContactForm {
  name: string;
  restaurant: string;
  plz: string;
  phone: string;
  email: string;
  message: string;
  products: string[];
  datenschutz: boolean;
}

export function buildEmailSubject(form: ContactForm): string {
  const restaurant = (form.restaurant ?? "").trim();
  return restaurant
    ? `Neue Kontaktanfrage: ${form.name} (${restaurant})`
    : `Neue Kontaktanfrage: ${form.name}`;
}

export function buildEmailBody(form: ContactForm): string {
  // ESCAPE ZUERST, dann \n → <br>. Reihenfolge ist kritisch:
  // sonst entsteht "&lt;br&gt;" statt "<br>" im Output.
  const messageHtml = escapeHtml(form.message).replace(/\r?\n/g, "<br>");

  const restaurant = escapeHtml(form.restaurant).trim() || "—";
  const plz = escapeHtml(form.plz).trim() || "—";
  const products =
    form.products.length > 0
      ? escapeHtml(form.products.join(", "))
      : "(keine Auswahl)";

  const timestamp = new Date().toISOString();

  return `<h2>Neue Kontaktanfrage</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr><td style="padding: 6px;"><strong>Name:</strong></td><td style="padding: 6px;">${escapeHtml(form.name)}</td></tr>
  <tr><td style="padding: 6px;"><strong>Restaurant:</strong></td><td style="padding: 6px;">${restaurant}</td></tr>
  <tr><td style="padding: 6px;"><strong>PLZ:</strong></td><td style="padding: 6px;">${plz}</td></tr>
  <tr><td style="padding: 6px;"><strong>Telefon:</strong></td><td style="padding: 6px;">${escapeHtml(form.phone)}</td></tr>
  <tr><td style="padding: 6px;"><strong>E-Mail:</strong></td><td style="padding: 6px;">${escapeHtml(form.email)}</td></tr>
  <tr><td style="padding: 6px;"><strong>Interessiert an:</strong></td><td style="padding: 6px;">${products}</td></tr>
  <tr><td colspan="2" style="padding: 6px;"><strong>Nachricht:</strong></td></tr>
  <tr><td colspan="2" style="padding: 6px; background: #f5f5f5;">${messageHtml}</td></tr>
  <tr><td style="padding: 6px;"><strong>Datenschutz:</strong></td><td style="padding: 6px;">✅ akzeptiert</td></tr>
  <tr><td style="padding: 6px;"><strong>Eingegangen:</strong></td><td style="padding: 6px;">${timestamp}</td></tr>
</table>`;
}
