import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GuideMeta } from "@/lib/guides";
import { TOPICS } from "@/lib/topics";
import { formatLongDate } from "@/lib/format";
import { stopNumber } from "@/components/route/StopMarker";

/** Featured card for a published guide. */
export function GuideCard({ guide }: { guide: GuideMeta }) {
  const topic = TOPICS[guide.topic];
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_24px_48px_-32px_rgba(20,33,61,0.45)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_32px_56px_-30px_rgba(20,33,61,0.55)] motion-reduce:hover:translate-y-0">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-2.5"
        style={{ background: topic.line }}
      />
      <div className="flex flex-col gap-4 py-[clamp(1.5rem,3vw,2.25rem)] pr-[clamp(1.25rem,3vw,2.25rem)] pl-[calc(clamp(1.25rem,3vw,2.25rem)+0.625rem)]">
        <p className="label m-0 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span style={{ color: topic.labelColor }}>
            Stop {stopNumber(topic.stop)} · {topic.name}
          </span>
          <span className="text-muted">{guide.readTime} min read</span>
          <span className="text-muted">
            Docs checked {formatLongDate(guide.docsChecked)}
          </span>
        </p>
        <h3 className="wdth-112 m-0 max-w-[40rem] text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1.1] font-extrabold tracking-[-0.02em]">
          <Link
            href={`/guides/${guide.slug}`}
            className="no-underline after:absolute after:inset-0 after:content-[''] hover:underline"
          >
            {guide.title}
          </Link>
        </h3>
        <p className="m-0 max-w-[40rem] text-muted">{guide.summary}</p>
        <p
          aria-hidden="true"
          className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-display text-[0.9375rem] font-bold"
        >
          Read the guide
          <ArrowRight
            size={17}
            strokeWidth={2.4}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </p>
      </div>
    </article>
  );
}
