"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DepartureBoard from "./DepartureBoard";
import { GuideCard } from "./GuideCard";
import StopMarker from "@/components/route/StopMarker";
import type { TaggedGuide, UpcomingArticle } from "@/lib/articles";
import { FILTER_LABELS, articlesHref } from "@/lib/filters";

/**
 * The full article list on /articles, filtered client-side by the
 * ?filter=<tag> the nav dropdowns link with. Wrap in <Suspense>: it reads
 * useSearchParams.
 */
export default function ArticlesSection({
  guides,
  upcoming,
}: {
  guides: TaggedGuide[];
  upcoming: UpcomingArticle[];
}) {
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
      aria-label="Article list"
    >
      <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <StopMarker label={active ? "Filtered" : "All articles"} />
        {active ? (
          <p className="m-0 flex flex-wrap items-center gap-3 font-display text-sm text-muted">
            <span>Showing</span>
            <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-rule bg-white py-1 pr-1.5 pl-3 font-bold text-ink">
              {filterLabel}
              <Link
                href={articlesHref()}
                aria-label="Clear filter"
                className="relative grid size-6 place-items-center rounded-full bg-night text-[0.8125rem] leading-none text-white no-underline after:absolute after:-inset-2.5 after:content-['']"
              >
                &times;
              </Link>
            </span>
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2rem)]">
        {shownGuides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}

        {shownUpcoming.length > 0 ? <DepartureBoard items={shownUpcoming} /> : null}

        {shownGuides.length === 0 && shownUpcoming.length === 0 ? (
          <p className="m-0 font-display text-[0.9375rem] text-muted">
            Nothing published under that topic yet. Subscribe and it&rsquo;ll
            land in your inbox first.
          </p>
        ) : null}
      </div>
    </section>
  );
}
