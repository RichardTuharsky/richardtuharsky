import { getAllGuides, type GuideMeta } from "./guides";
import type { TopicId } from "./topics";

export interface UpcomingArticle {
  title: string;
  summary: string;
  /**
   * Topic from the registry, or a custom theme label. Themes outside the
   * four stops get a neutral marker: route colours belong to topics only.
   */
  topic?: TopicId;
  label?: string;
  tags: string[];
}

export type TaggedGuide = GuideMeta & { tags: string[] };

/** Platform/theme tags per guide slug, used by the nav-dropdown filters. */
export const GUIDE_TAGS: Record<string, string[]> = {
  "data-360-crm-data-stream-troubleshooting": ["data-360", "customer-data"],
};

export const UPCOMING: UpcomingArticle[] = [
  {
    title: "Synced isn't the same as fresh",
    topic: "usable-audiences",
    summary:
      "How to tell when your audience data last changed, and why a successful sync can still leave you with yesterday's customers.",
    tags: ["mce", "data-360", "customer-data"],
  },
  {
    title: "The automation that failed at 3am",
    topic: "dependable-automation",
    summary:
      "Who finds out first when an overnight step breaks, and how to make sure it's you and not your customers.",
    tags: ["mce", "mc-next"],
  },
  {
    title: "The lead nobody followed up",
    topic: "sales-handoffs",
    summary:
      "Tracing one lead from form fill to sales task, and the places it usually disappears.",
    tags: ["mce", "customer-data"],
  },
  {
    title: "One person, three IDs",
    topic: "data-foundations",
    summary:
      "How duplicate records and mismatched identifiers creep in between CRM and marketing, and how to stop them.",
    tags: ["data-360", "braze", "customer-data"],
  },
  {
    title: "The segments that actually move LTV",
    label: "LTV",
    summary:
      "Turning order and engagement history into audiences worth expanding, and measuring whether the expansion paid for itself.",
    tags: ["data-360", "mce", "ltv"],
  },
  {
    title: "Churn signals you already have",
    label: "Retention",
    summary:
      "The drop-off patterns sitting in your existing event data, and how to act on them before the unsubscribe.",
    tags: ["braze", "mce", "retention"],
  },
];

export function getTaggedGuides(): TaggedGuide[] {
  return getAllGuides().map((guide) => ({
    ...guide,
    tags: GUIDE_TAGS[guide.slug] ?? [],
  }));
}
