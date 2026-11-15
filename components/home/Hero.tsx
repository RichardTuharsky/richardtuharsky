import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import SiteSearch, { type SearchEntry } from "@/components/SiteSearch";
import StopMarker from "@/components/route/StopMarker";
import SyncWindow from "./SyncWindow";

const HEADLINE = "Your campaign is only as fresh as the data behind it.";
const WORD_STEP_MS = 85;

/**
 * Homepage hero. The headline arrives like a record syncing (pure CSS:
 * .sync-word / .synced-tick in globals.css), beside the subhead and search,
 * above the sample system window.
 */
export default function Hero({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const words = HEADLINE.split(" ");
  const lastIndex = words.length - 1;
  const tickDelay = `${lastIndex * WORD_STEP_MS + 150 + 650}ms`;

  return (
    <div className="relative overflow-hidden bg-night text-on-night">
      <div
        aria-hidden="true"
        className="night-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_80%_at_30%_20%,#000_35%,transparent_80%)]"
      />
      <section
        className="wrap relative pt-[clamp(2.5rem,7vw,5.5rem)] pb-[clamp(3rem,8vw,6rem)]"
        aria-labelledby="hero-title"
      >
        <StopMarker label="Start · Sync & Send" tone="night" />
        <div className="mt-[clamp(1.5rem,4vw,2.5rem)] grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,5fr)] lg:items-end lg:gap-14">
          <h1
            id="hero-title"
            className="wdth-125 m-0 text-[clamp(1.875rem,5vw_-_6px,4.125rem)] leading-[0.98] font-[880] tracking-[-0.03em]"
          >
            {words.map((word, index) =>
              index < lastIndex ? (
                <span key={index}>
                  <span
                    className="sync-word inline-block"
                    style={{ "--i": index } as CSSProperties}
                  >
                    {word}
                  </span>{" "}
                </span>
              ) : (
                <span key={index} className="whitespace-nowrap">
                  <span
                    className="sync-word inline-block"
                    style={{ "--i": index } as CSSProperties}
                  >
                    {word}
                  </span>
                  <span
                    aria-hidden="true"
                    className="synced-tick label ml-3 inline-flex translate-y-[-0.35em] items-center gap-1 rounded-full border border-signal/50 px-2 py-0.5 align-middle text-[0.6875rem] tracking-[0.08em] text-signal"
                    style={{ "--tick-delay": tickDelay } as CSSProperties}
                  >
                    <Check size={11} strokeWidth={3.5} />
                    synced
                  </span>
                </span>
              ),
            )}
          </h1>
          <div className="relative z-20 flex flex-col gap-6">
            <p className="m-0 max-w-[34rem] text-[clamp(1.0625rem,1.5vw,1.1875rem)] leading-[1.55] text-on-night-soft">
              Practical notes on customer data, automation and marketing-to-sales
              handoffs, for the people who keep marketing and CRM systems
              running.
            </p>
            <SiteSearch index={searchIndex} />
          </div>
        </div>
        <SyncWindow />
      </section>
    </div>
  );
}
