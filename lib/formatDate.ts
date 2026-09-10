/** Formats an ISO date (YYYY-MM-DD) as e.g. "September 10, 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
