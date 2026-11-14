import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GuideMeta } from "@/lib/guides";
import { TOPICS, type TopicId } from "@/lib/topics";
import { formatLongDate } from "@/lib/guides";

/** Featured card for a published guide. */
export function GuideCard({ guide }: { guide: GuideMeta }) {
  const topic = TOPICS[guide.topic];
  return (
    <article className="relative overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_24px_48px_-32px_rgba(20,33,61,0.45)]">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-2.5"
        style={{ background: topic.line }}
      />
      <div className="flex flex-col gap-3.5 py-7 pr-[clamp(1.25rem,3vw,2rem)] pl-[calc(clamp(1.25rem,3vw,2rem)+0.625rem)]">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-display text-sm">
          <span
            className="font-bold"
            style={{ color: topic.id === "usable-audiences" ? "#8a5a00" : topic.line }}
          >
            {topic.name}
          </span>
          <span className="text-muted">{guide.readTime} min read</span>
          <span className="text-muted">
            Documentation checked {formatLongDate(guide.docsChecked)}
          </span>
        </p>
        <h3 className="wdth-112 text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.15] font-extrabold tracking-[-0.015em]">
          <Link
            href={`/guides/${guide.slug}`}
            className="no-underline hover:underline"
          >
            {guide.title}
          </Link>
        </h3>
        <p className="max-w-[40rem] text-muted">{guide.summary}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 font-display text-[0.9375rem] font-bold">
          <Link
            href={`/guides/${guide.slug}`}
            className="inline-flex min-h-11 items-center gap-1.5 no-underline hover:underline"
          >
            Read the guide
            <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </article>
  );
}

export interface UpcomingGuide {
  title: string;
  topic: TopicId;
  summary: string;
}

/** Compact, visibly secondary list of upcoming guides. */
export function UpcomingList({ items }: { items: UpcomingGuide[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-display text-sm font-semibold text-muted">
        Coming up
      </p>
      <ul className="m-0 flex list-none flex-col border-t border-rule p-0">
        {items.map((item) => {
          const topic = TOPICS[item.topic];
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
                  style={{ background: topic.line }}
                />
                {topic.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
