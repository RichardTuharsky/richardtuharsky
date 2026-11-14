import { TOPIC_LIST } from "@/lib/topics";

/**
 * "The route": the four topics as stops on their reserved coloured lines.
 * Each stop carries the line segment, a numbered roundel, the topic and
 * its "sounds familiar if" symptom.
 */
export default function RouteMap() {
  return (
    <section
      className="wrap border-t border-rule py-section-sm md:py-section"
      id="topics"
      aria-labelledby="topics-title"
    >
      <div className="mb-[clamp(2.25rem,5vw,3.5rem)] flex max-w-[44rem] flex-col gap-3">
        <h2
          id="topics-title"
          className="wdth-125 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.025em]"
        >
          The route
        </h2>
        <p className="max-w-[37.5rem] text-muted">
          Four stops between your customer data and a sale. Each one is a place
          campaigns go wrong, and each one is a topic here.
        </p>
      </div>
      <ol className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,14.5rem),1fr))] gap-y-12 p-0">
        {TOPIC_LIST.map((topic) => (
          <li
            key={topic.id}
            className="relative flex min-w-0 flex-col gap-2.5 pt-15 pr-7"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-[15px] h-2.5"
              style={{ background: topic.line }}
            />
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border-[5px] border-ink bg-white font-display text-[0.9375rem] font-[850]"
            >
              {topic.stop}
            </span>
            <h3 className="wdth-112 text-[1.3125rem] leading-tight font-bold">
              {topic.name}
            </h3>
            <p className="text-base">{topic.description}</p>
            <p className="text-[0.9375rem] text-muted">
              <strong className="font-display font-bold text-ink">
                Sounds familiar if
              </strong>{" "}
              {topic.symptom}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
