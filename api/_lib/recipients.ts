const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Parse comma-separated recipient list from CONTACT_RECIPIENTS env var.
 * Filters out empty entries and invalid email formats.
 * Returns empty array if input is missing/empty.
 */
export function parseRecipients(input: string | undefined): string[] {
  if (!input) return [];
  return input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && EMAIL_REGEX.test(s));
}
