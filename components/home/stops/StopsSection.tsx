import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import type { GuideMeta } from "@/lib/guides";
import { TOPIC_LIST, type TopicId } from "@/lib/topics";
import StopMarker, { stopNumber } from "@/components/route/StopMarker";
import StopsGrid from "./StopsGrid";
import DriftScreen from "./DriftScreen";
import SegmentScreen from "./SegmentScreen";
import RunLogScreen from "./RunLogScreen";
import LeadScreen from "./LeadScreen";

const SCREENS: Record<TopicId, ComponentType> = {
  "data-foundations": DriftScreen,
  "usable-audiences": SegmentScreen,
  "dependable-automation": RunLogScreen,
  "sales-handoffs": LeadScreen,
};

/**
 * The four stops: working mini-screens of the problem each topic fixes.
 * A tile links to its topic's latest guide, or to Subscribe while its
 * article is still coming up.
 */
export default function StopsSection({ guides }: { guides: GuideMeta[] }) {
  return (
    <div className="bg-night text-on-night">
      <section
        className="wrap py-section-sm md:py-section"
        id="stops"
        aria-labelledby="stops-title"
      >
        <div className="mb-[clamp(2rem,5vw,3.5rem)] flex max-w-[46rem] flex-col gap-4">
          <StopMarker label="The four stops" tone="night" />
          <h2
            id="stops-title"
            className="wdth-125 m-0 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.03em]"
          >
            One line, four stops
          </h2>
          <p className="m-0 max-w-[38rem] text-on-night-soft">
            Each guide belongs to one stop on the route from customer data to
            a sales conversation. Find the symptom you recognise.
          </p>
        </div>

        <StopsGrid>
          {TOPIC_LIST.map((topic) => {
            const Screen = SCREENS[topic.id];
            const guide = guides.find((g) => g.topic === topic.id);
            const href = guide ? `/guides/${guide.slug}` : "#subscribe";
            return (
              <article
                key={topic.id}
                data-tile
                aria-labelledby={`stop-${topic.stop}-title`}
                className="stop-tile flex flex-col gap-4 rounded-2xl border border-board-rule bg-board/70 p-[clamp(1.125rem,2.5vw,1.625rem)]"
              >
                <StopMarker
                  label={`Stop ${stopNumber(topic.stop)}`}
                  tone="night"
                  ring={topic.line}
                  branch={false}
                />
                <div className="flex flex-col gap-2">
                  <h3
                    id={`stop-${topic.stop}-title`}
                    className="wdth-125 m-0 text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.05] font-[850] tracking-[-0.02em] text-white"
                  >
                    {topic.name}
                  </h3>
                  <p className="m-0 text-[1rem] leading-snug text-on-night-soft">
                    For when {topic.symptom}
                  </p>
                </div>
                <Screen />
                <Link
                  href={href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start font-display text-[0.9375rem] font-bold text-white no-underline after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:underline"
                >
                  {guide ? "Read the guide" : "Coming up · get it by email"}
                  <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
                  <span className="sr-only">: {topic.name}</span>
                </Link>
              </article>
            );
          })}
        </StopsGrid>
      </section>
    </div>
  );
}
