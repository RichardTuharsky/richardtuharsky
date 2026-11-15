/** Labels for the ?filter=<tag> values used by the nav dropdowns. */
export const FILTER_LABELS: Record<string, string> = {
  mce: "Marketing Cloud Engagement",
  "mc-next": "MC Next",
  "data-360": "Data 360",
  braze: "Braze",
  "customer-data": "Customer Data",
  retention: "Retention",
  ltv: "LTV",
};

export function articlesHref(filter?: string): string {
  return filter ? `/articles?filter=${filter}` : "/articles";
}
