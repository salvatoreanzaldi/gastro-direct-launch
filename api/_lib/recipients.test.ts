import { describe, expect, test } from "vitest";
import { parseRecipients } from "./recipients";

describe("parseRecipients", () => {
  test("parses comma-separated list", () => {
    expect(parseRecipients("a@x.de,b@x.de,c@x.de")).toEqual([
      "a@x.de",
      "b@x.de",
      "c@x.de",
    ]);
  });

  test("trims whitespace around addresses", () => {
    expect(parseRecipients(" a@x.de , b@x.de ")).toEqual(["a@x.de", "b@x.de"]);
  });

  test("filters empty entries (e.g. trailing comma)", () => {
    expect(parseRecipients("a@x.de,,b@x.de,")).toEqual(["a@x.de", "b@x.de"]);
  });

  test("filters invalid email addresses (no @)", () => {
    expect(parseRecipients("a@x.de,not-an-email,b@x.de")).toEqual([
      "a@x.de",
      "b@x.de",
    ]);
  });

  test("returns empty array for undefined input", () => {
    expect(parseRecipients(undefined)).toEqual([]);
  });

  test("returns empty array for empty string", () => {
    expect(parseRecipients("")).toEqual([]);
  });

  test("returns empty array for whitespace-only", () => {
    expect(parseRecipients("   ")).toEqual([]);
  });

  test("preserves multi-recipient ordering (for Reply-All consistency)", () => {
    const result = parseRecipients("info@x.de,rene@x.de,sanjaya@x.de,salva@x.de");
    expect(result[0]).toBe("info@x.de");
    expect(result[3]).toBe("salva@x.de");
  });
});
