import { describe, expect, test } from "vitest";
import { validateContactForm, MAX_MESSAGE_LENGTH } from "./validate";

const validForm = {
  name: "Max",
  restaurant: "Test GmbH",
  plz: "61250",
  phone: "+49 123",
  email: "max@example.com",
  message: "Hallo",
  products: ["Webshop"],
  datenschutz: true,
  website: "", // honeypot
};

describe("validateContactForm", () => {
  test("accepts valid form", () => {
    expect(validateContactForm(validForm)).toEqual({ ok: true });
  });

  test("rejects missing name", () => {
    expect(validateContactForm({ ...validForm, name: "" })).toEqual({
      ok: false,
      status: 400,
      error: "Bitte alle Pflichtfelder ausfüllen.",
    });
  });

  test("rejects missing phone", () => {
    expect(validateContactForm({ ...validForm, phone: "" }).ok).toBe(false);
  });

  test("rejects missing message", () => {
    expect(validateContactForm({ ...validForm, message: "" }).ok).toBe(false);
  });

  test("rejects datenschutz=false", () => {
    expect(validateContactForm({ ...validForm, datenschutz: false })).toEqual({
      ok: false,
      status: 400,
      error: "Bitte Datenschutz akzeptieren.",
    });
  });

  test("rejects invalid email format", () => {
    expect(validateContactForm({ ...validForm, email: "not-an-email" })).toEqual({
      ok: false,
      status: 400,
      error: "Bitte gültige E-Mail eingeben.",
    });
  });

  test("flags honeypot when website field is filled", () => {
    expect(validateContactForm({ ...validForm, website: "spam-bot.com" })).toEqual({
      ok: false,
      status: 200,
      honeypot: true,
    });
  });

  test("truncates message > MAX_MESSAGE_LENGTH", () => {
    const longMsg = "a".repeat(MAX_MESSAGE_LENGTH + 100);
    const result = validateContactForm({ ...validForm, message: longMsg });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.truncatedMessage).toBeDefined();
      expect(result.truncatedMessage!.length).toBeLessThanOrEqual(MAX_MESSAGE_LENGTH + 20);
      expect(result.truncatedMessage!).toContain("[gekürzt]");
    }
  });

  test("does not truncate message at MAX_MESSAGE_LENGTH", () => {
    const exactMsg = "a".repeat(MAX_MESSAGE_LENGTH);
    const result = validateContactForm({ ...validForm, message: exactMsg });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.truncatedMessage).toBeUndefined();
    }
  });
});
