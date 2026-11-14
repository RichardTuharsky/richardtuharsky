/**
 * The four topics ("stops") of Sync & Send, each bound to its reserved
 * route-line colour. Single source of truth: RouteMap, guide cards and
 * guide pages all read from here so a topic is never recoloured.
 */
export type TopicId =
  | "data-foundations"
  | "usable-audiences"
  | "dependable-automation"
  | "sales-handoffs";

export interface Topic {
  id: TopicId;
  stop: 1 | 2 | 3 | 4;
  name: string;
  /** CSS colour value of the reserved route line. */
  line: string;
  /** Tailwind token name, e.g. for bg-line-1 / text-line-1 classes. */
  lineToken: "line-1" | "line-2" | "line-3" | "line-4";
  description: string;
  symptom: string;
}

export const TOPICS: Record<TopicId, Topic> = {
  "data-foundations": {
    id: "data-foundations",
    stop: 1,
    name: "Data foundations",
    line: "#ff5d73",
    lineToken: "line-1",
    description:
      "Where customer data originates, how it moves between CRM and marketing systems, and whether you can trust it when it gets there.",
    symptom:
      "records don't match between systems, or nobody can say which one is the source of truth.",
  },
  "usable-audiences": {
    id: "usable-audiences",
    stop: 2,
    name: "Usable audiences",
    line: "#ffb703",
    lineToken: "line-2",
    description:
      "Segments that reflect today's customers. Queries and filters that stay correct as the data underneath them changes.",
    symptom:
      "audiences are rebuilt by hand or start life as a spreadsheet export.",
  },
  "dependable-automation": {
    id: "dependable-automation",
    stop: 3,
    name: "Dependable automation",
    line: "#2ec4b6",
    lineToken: "line-3",
    description:
      "Scheduling dependencies, error handling, monitoring and recovery, so a failed step gets noticed and fixed before the send.",
    symptom:
      "automations fail quietly and campaigns go out late, or not at all.",
  },
  "sales-handoffs": {
    id: "sales-handoffs",
    stop: 4,
    name: "Marketing-to-sales handoffs",
    line: "#8c7cff",
    lineToken: "line-4",
    description:
      "Getting engaged leads into the CRM with the context a salesperson needs to act on them, and proving that it happened.",
    symptom: "sales says marketing leads never arrive, or arrive without context.",
  },
};

export const TOPIC_LIST: Topic[] = Object.values(TOPICS);
