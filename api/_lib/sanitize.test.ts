import { describe, expect, test } from "vitest";
import { escapeHtml } from "./sanitize";

describe("escapeHtml", () => {
  test("escapes ampersand exactly once (no double-escape)", () => {
    expect(escapeHtml("Stefano's Café & Co.")).toBe("Stefano&#39;s Café &amp; Co.");
  });

  test("escapes angle brackets", () => {
    expect(escapeHtml("<script>alert(1)</script>")).toBe(
      "&lt;script&gt;alert(1)&lt;/script&gt;"
    );
  });

  test("escapes double quotes", () => {
    expect(escapeHtml('say "hi"')).toBe("say &quot;hi&quot;");
  });

  test("preserves umlauts and emojis (UTF-8 passthrough)", () => {
    expect(escapeHtml("Müller 🍕")).toBe("Müller 🍕");
  });

  test("returns empty string for empty input", () => {
    expect(escapeHtml("")).toBe("");
  });

  test("handles null/undefined gracefully", () => {
    expect(escapeHtml(null as unknown as string)).toBe("");
    expect(escapeHtml(undefined as unknown as string)).toBe("");
  });
});
