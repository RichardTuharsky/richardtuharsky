import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DepartureBoard from "@/components/DepartureBoard";
import { GuideCard } from "@/components/GuideCard";
import StopMarker from "@/components/route/StopMarker";
import type { TaggedGuide, UpcomingArticle } from "@/lib/articles";
import { articlesHref } from "@/lib/filters";

/** Section 2: the published guide as a featured card, then the departure board. */
export default function Latest({
  guides,
  upcoming,
}: {
  guides: TaggedGuide[];
  upcoming: UpcomingArticle[];
}) {
  return (
    <section
      className="wrap py-section-sm md:py-section"
      id="articles"
      aria-labelledby="articles-title"
    >
      <div className="mb-[clamp(2rem,5vw,3rem)] flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex max-w-[44rem] flex-col gap-4">
          <StopMarker label="Latest" />
          <h2
            id="articles-title"
            className="wdth-125 m-0 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.03em]"
          >
            Latest articles and resources
          </h2>
          <p className="m-0 max-w-[37.5rem] text-muted">
            The first guide is out. Subscribe to get the rest when they&rsquo;re
            published.
          </p>
        </div>
        <Link
          href={articlesHref()}
          className="inline-flex min-h-11 items-center gap-1.5 font-display text-[0.9375rem] font-bold text-ink no-underline hover:underline"
        >
          All articles
          <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </div>

      <div className="flex flex-col gap-[clamp(1.5rem,3vw,2rem)]">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
        <DepartureBoard items={upcoming} />
      </div>
    </section>
  );
}
