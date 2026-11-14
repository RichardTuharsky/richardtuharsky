"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GuideCard } from "./GuideCard";
import type { GuideMeta } from "@/lib/guides";
import { TOPICS, type TopicId } from "@/lib/topics";

export const FILTER_LABELS: Record<string, string> = {
  mce: "Marketing Cloud Engagement",
  "mc-next": "MC Next",
  "data-360": "Data 360",
  braze: "Braze",
  "customer-data": "Customer Data",
  retention: "Retention",
  ltv: "LTV",
};

export interface UpcomingArticle {
  title: string;
  summary: string;
  /** Topic from the registry, or a custom label with its line colour. */
  topic?: TopicId;
  label?: string;
  line?: string;
  tags: string[];
}

interface ArticlesSectionProps {
  guides: (GuideMeta & { tags: string[] })[];
  upcoming: UpcomingArticle[];
}

/**
 * "Latest articles and resources", directly below the hero. The nav
 * dropdowns link here with ?filter=<tag>; matching is client-side.
 */
export default function ArticlesSection({
  guides,
  upcoming,
}: ArticlesSectionProps) {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  const filterLabel = FILTER_LABELS[filter];
  const active = filterLabel ? filter : "";

  const shownGuides = active
    ? guides.filter((guide) => guide.tags.includes(active))
    : guides;
  const shownUpcoming = active
    ? upcoming.filter((item) => item.tags.includes(active))
    : upcoming;

  return (
    <section
      className="wrap py-section-sm md:py-section"
      id="articles"
      aria-labelledby="articles-title"
    >
      <div className="mb-[clamp(2.25rem,5vw,3.5rem)] flex max-w-[44rem] flex-col gap-3">
        <h2
          id="articles-title"
          className="wdth-125 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.025em]"
        >
          Latest articles and resources
        </h2>
        <p className="max-w-[37.5rem] text-muted">
          The first guide is out. Subscribe to get the rest when they&rsquo;re
          published.
        </p>
      </div>

      {active ? (
        <p className="mb-6 flex flex-wrap items-center gap-3 font-display text-sm text-muted">
          <span>Showing</span>
          <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-rule bg-white py-1 pr-1.5 pl-3 font-bold text-ink">
            {filterLabel}
            <Link
              href="/#articles"
              aria-label="Clear filter"
              className="grid size-6 place-items-center rounded-full bg-night text-[0.8125rem] leading-none text-white no-underline"
            >
              &times;
            </Link>
          </span>
        </p>
      ) : null}

      <div className="flex flex-col gap-10">
        {shownGuides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}

        {shownUpcoming.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p className="font-display text-sm font-semibold text-muted">
              Coming up
            </p>
            <ul className="m-0 flex list-none flex-col border-t border-rule p-0">
              {shownUpcoming.map((item) => {
                const label = item.topic ? TOPICS[item.topic].name : item.label;
                const line = item.topic ? TOPICS[item.topic].line : item.line;
                return (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-rule py-3.5"
                  >
                    <span className="font-display text-[1.0625rem] font-semibold">
                      {item.title}
                    </span>
                    <span className="flex items-center gap-2 font-display text-[0.8125rem] font-semibold text-muted">
                      <span
                        aria-hidden="true"
                        className="size-2 rounded-full"
                        style={{ background: line }}
                      />
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {shownGuides.length === 0 && shownUpcoming.length === 0 ? (
          <p className="font-display text-[0.9375rem] text-muted">
            Nothing published under that topic yet. Subscribe and it&rsquo;ll
            land in your inbox first.
          </p>
        ) : null}
      </div>
    </section>
  );
}
