import { describe, expect, test } from "vitest";
import { buildEmailBody, buildEmailSubject, type ContactForm } from "./buildEmailBody";

const baseForm: ContactForm = {
  name: "Max Mustermann",
  restaurant: "Stefano's Café & Co.",
  plz: "61250",
  phone: "+49 123 456",
  email: "max@example.com",
  message: "Hallo,\n\nich brauche Beratung.\nGrüße",
  products: ["Webshop", "Kassensystem"],
  datenschutz: true,
};

describe("buildEmailSubject", () => {
  test("includes restaurant in parens when present", () => {
    expect(buildEmailSubject(baseForm)).toBe(
      "Neue Kontaktanfrage: Max Mustermann (Stefano's Café & Co.)"
    );
  });

  test("omits parens when restaurant is empty", () => {
    expect(buildEmailSubject({ ...baseForm, restaurant: "" })).toBe(
      "Neue Kontaktanfrage: Max Mustermann"
    );
  });

  test("omits parens when restaurant is whitespace-only", () => {
    expect(buildEmailSubject({ ...baseForm, restaurant: "   " })).toBe(
      "Neue Kontaktanfrage: Max Mustermann"
    );
  });
});

describe("buildEmailBody", () => {
  test("escapes ampersand in restaurant exactly once", () => {
    const html = buildEmailBody(baseForm);
    expect(html).toContain("Stefano&#39;s Café &amp; Co.");
    expect(html).not.toContain("&amp;amp;");
  });

  test("converts \\n to <br> in message (after escape)", () => {
    const html = buildEmailBody(baseForm);
    expect(html).toContain("Hallo,<br><br>ich brauche Beratung.<br>Grüße");
  });

  test("converts CRLF (\\r\\n) to <br> for cross-platform safety", () => {
    const form = { ...baseForm, message: "line1\r\nline2" };
    const html = buildEmailBody(form);
    expect(html).toContain("line1<br>line2");
    expect(html).not.toContain("\r");
  });

  test("does not produce &lt;br&gt; (escape order: escape FIRST, then \\n→<br>)", () => {
    const html = buildEmailBody(baseForm);
    expect(html).not.toContain("&lt;br&gt;");
  });

  test("shows '—' for empty restaurant in table", () => {
    const html = buildEmailBody({ ...baseForm, restaurant: "" });
    expect(html).toMatch(/<strong>Restaurant:<\/strong><\/td><td[^>]*>—/);
  });

  test("shows '—' for empty plz in table", () => {
    const html = buildEmailBody({ ...baseForm, plz: "" });
    expect(html).toMatch(/<strong>PLZ:<\/strong><\/td><td[^>]*>—/);
  });

  test("shows '(keine Auswahl)' when products array is empty", () => {
    const html = buildEmailBody({ ...baseForm, products: [] });
    expect(html).toContain("(keine Auswahl)");
  });

  test("includes all form fields in HTML output", () => {
    const html = buildEmailBody(baseForm);
    expect(html).toContain("Max Mustermann");
    expect(html).toContain("61250");
    expect(html).toContain("+49 123 456");
    expect(html).toContain("max@example.com");
    expect(html).toContain("Webshop, Kassensystem");
  });

  test("includes ISO timestamp", () => {
    const html = buildEmailBody(baseForm);
    expect(html).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
  });
});
