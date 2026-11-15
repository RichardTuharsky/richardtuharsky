import type { UpcomingArticle } from "@/lib/articles";
import { TOPICS } from "@/lib/topics";
import { stopNumber } from "@/components/route/StopMarker";

/**
 * "Coming up" as a night departure board: one row per upcoming title with
 * its topic dot. No dates, by design. Themes outside the four stops get a
 * neutral hollow marker, because route colours belong to topics only.
 */
export default function DepartureBoard({ items }: { items: UpcomingArticle[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-board-rule bg-board text-on-night shadow-[0_30px_60px_-36px_rgba(12,22,48,0.8)]">
      <div className="flex items-center justify-between gap-4 border-b border-board-rule px-[clamp(1rem,3vw,1.75rem)] py-3.5">
        <p className="label m-0 text-white">Coming up</p>
        <p className="label m-0 text-on-night-muted tabular-nums">
          {items.length} {items.length === 1 ? "departure" : "departures"}
        </p>
      </div>
      <div
        aria-hidden="true"
        className="label hidden grid-cols-[9rem_minmax(0,1fr)_13rem_7rem] gap-4 border-b border-board-rule px-[clamp(1rem,3vw,1.75rem)] py-2.5 text-on-night-muted md:grid"
      >
        <span>Line</span>
        <span>Destination</span>
        <span>Topic</span>
        <span className="text-right">Status</span>
      </div>
      <ul className="m-0 list-none p-0">
        {items.map((item) => {
          const topic = item.topic ? TOPICS[item.topic] : undefined;
          const line = topic ? `Stop ${stopNumber(topic.stop)}` : item.label;
          const topicName = topic ? topic.name : item.label;
          return (
            <li
              key={item.title}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 border-b border-board-rule px-[clamp(1rem,3vw,1.75rem)] py-4 last:border-b-0 md:grid-cols-[9rem_minmax(0,1fr)_13rem_7rem]"
            >
              <span className="label col-span-2 flex items-center gap-2.5 text-on-night-soft md:col-span-1">
                <span
                  aria-hidden="true"
                  className={`size-3 flex-none rounded-full ${
                    topic ? "" : "border-2 border-on-night-muted"
                  }`}
                  style={topic ? { background: topic.line } : undefined}
                />
                {line}
              </span>
              <span className="wdth-112 font-display text-[1.0625rem] leading-snug font-bold text-white">
                {item.title}
              </span>
              <span className="label hidden text-on-night-muted md:block">
                <span className="sr-only">Topic: </span>
                {topicName}
              </span>
              <span className="label text-right text-on-night-soft">Coming up</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
