/**
 * HTML-escape user input to prevent XSS in email body.
 * Order matters: ampersand FIRST, otherwise other escapes get re-escaped.
 */
export function escapeHtml(input: string | null | undefined): string {
  if (input === null || input === undefined) return "";
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
