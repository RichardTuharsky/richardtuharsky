/** The platforms Sync & Send covers. Safe for client bundles. */
export interface Platform {
  name: string;
  description: string;
  /** ?filter= value on /articles, when the platform has one. */
  filter?: string;
  /** Extra search terms for the site search index. */
  keywords: string;
}

export const PLATFORMS: Platform[] = [
  {
    name: "Marketing Cloud Engagement",
    description: "Journeys, automations, data extensions.",
    filter: "mce",
    keywords:
      "sfmc marketing cloud engagement journey builder automation studio ampscript sql query",
  },
  {
    name: "Marketing Cloud Next",
    description: "Core-platform journeys and migration.",
    filter: "mc-next",
    keywords: "mc next marketing cloud next core platform migration data cloud native",
  },
  {
    name: "Data 360 and other CDPs",
    description: "Ingestion, segments, activation.",
    filter: "data-360",
    keywords:
      "data 360 data cloud cdp ingestion data streams segments activation identity dlo dmo",
  },
  {
    name: "Braze",
    description: "Data feeds, audiences, identifiers.",
    filter: "braze",
    keywords: "braze canvas segments catalogs connected content external id",
  },
  {
    name: "Sales Cloud and Service Cloud",
    description: "Leads, routing, Flow, handoffs.",
    keywords: "sales cloud service cloud crm leads campaigns flow routing tasks",
  },
];
