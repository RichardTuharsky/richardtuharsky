"use client";

import { Check } from "lucide-react";
import MotionToggle from "@/components/route/MotionToggle";
import { useLoop } from "@/components/route/useLoop";

/*
 * Hero system window. One clearly fictional sample record travels
 * CRM → Data 360 → audience → send along the route line, with a
 * "last changed" time that updates every cycle.
 */

const STATIONS = [
  { name: "CRM", event: (v: string) => `Status changed to “${v}”` },
  { name: "Data 360", event: () => "Ingested into the data model" },
  { name: "Audience", event: () => "Segment membership updated" },
  { name: "Send", event: () => "Included in the next send" },
];
const STATUSES = ["Renewed", "Upgraded to annual", "Renewal due"];
/** Seconds after the CRM change at which each station sees the record. */
const OFFSETS = [0, 4, 9, 15];
const BASE = 2 * 3600 + 14 * 60 + 7; // 02:14:07, a fictional clock
const DURATIONS = [1500, 1300, 1300, 1300, 2600];

function clock(seconds: number): string {
  const s = ((seconds % 86400) + 86400) % 86400;
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export default function SyncWindow() {
  const { ref, step, cycle, paused, reduced, togglePaused } =
    useLoop<HTMLDivElement>(DURATIONS);

  // Station the record has reached (the last step holds at Send).
  const at = Math.min(step, STATIONS.length - 1);
  const synced = step === STATIONS.length;
  const changedAt = BASE + cycle * 133;
  const status = STATUSES[cycle % STATUSES.length];
  const position = (at / (STATIONS.length - 1)) * 100;

  return (
    <div ref={ref} className="mt-[clamp(2.5rem,6vw,4.5rem)] [perspective:1400px]">
      <div className="sit-up overflow-hidden rounded-2xl border border-board-rule bg-board/90 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-board-rule py-1.5 pr-1.5 pl-4">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-board-rule" />
            <span className="size-2.5 rounded-full bg-board-rule" />
            <span className="size-2.5 rounded-full bg-board-rule" />
          </span>
          <span className="label min-w-0 flex-1 truncate text-on-night-muted">
            Sample record · fictional data
          </span>
          <span aria-hidden="true" className="label hidden text-on-night-muted sm:inline">
            Last changed{" "}
            <span className="text-white">{clock(changedAt)}</span>
          </span>
          <MotionToggle paused={paused} reduced={reduced} onToggle={togglePaused} />
        </div>

        <p className="sr-only">
          Animated example with fictional data: a contact record&rsquo;s status
          changes in the CRM, then reaches Data 360, the audience and the send,
          with the time each step happened.
        </p>

        <div aria-hidden="true" className="flex flex-col gap-6 p-[clamp(1rem,3vw,1.75rem)]">
          {/* Route track */}
          <div className="relative mx-[12.5%] h-16">
            <span className="absolute top-[11px] right-0 left-0 h-[3px] rounded-full bg-board-rule" />
            <span
              className="absolute top-[11px] left-0 h-[3px] rounded-full bg-on-night-soft transition-[width] duration-700 ease-out"
              style={{ width: `${position}%` }}
            />
            {STATIONS.map((station, index) => {
              const reached = index <= at;
              return (
                <span
                  key={station.name}
                  className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-2"
                  style={{ left: `${(index / (STATIONS.length - 1)) * 100}%` }}
                >
                  <span
                    className={`grid size-[25px] place-items-center rounded-full border-[3px] transition-colors duration-500 ${
                      reached
                        ? "border-white bg-white text-night"
                        : "border-board-rule bg-board text-transparent"
                    }`}
                  >
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  <span
                    className={`label whitespace-nowrap transition-colors duration-500 ${
                      reached ? "text-white" : "text-on-night-muted"
                    }`}
                  >
                    {station.name}
                  </span>
                </span>
              );
            })}
            {/* The travelling record */}
            <span
              className="absolute top-[3px] size-[19px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_0_6px_rgb(255_255_255/0.14),0_0_24px_4px_rgb(255_255_255/0.35)] transition-[left] duration-700 ease-[cubic-bezier(0.6,0,0.3,1)]"
              style={{ left: `${position}%` }}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* Record card */}
            <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 rounded-xl border border-board-rule bg-night/60 p-4 font-display text-sm">
              <dt className="label self-center text-on-night-muted">Contact</dt>
              <dd className="m-0 truncate text-white">Alex Example</dd>
              <dt className="label self-center text-on-night-muted">Email</dt>
              <dd className="m-0 truncate text-white">alex@example.com</dd>
              <dt className="label self-center text-on-night-muted">Status</dt>
              <dd className="m-0 truncate font-semibold text-white">{status}</dd>
              <dt className="label self-center text-on-night-muted">Changed</dt>
              <dd className="m-0 text-white tabular-nums">{clock(changedAt)}</dd>
            </dl>

            {/* Event log: every line is always laid out, so nothing shifts. */}
            <ol className="m-0 flex list-none flex-col gap-1.5 rounded-xl border border-board-rule bg-night/60 p-4 font-display text-sm">
              {STATIONS.map((station, index) => (
                <li
                  key={station.name}
                  className={`grid grid-cols-[4.75rem_5.5rem_minmax(0,1fr)] items-baseline gap-2 transition-opacity duration-500 max-sm:grid-cols-[4.75rem_minmax(0,1fr)] ${
                    index <= at ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-on-night-muted tabular-nums">
                    {clock(changedAt + OFFSETS[index])}
                  </span>
                  <span className="label self-center text-white max-sm:hidden">
                    {station.name}
                  </span>
                  <span className="truncate text-on-night-soft">
                    {station.event(status)}
                  </span>
                </li>
              ))}
              <li
                className={`label mt-1 flex items-center gap-2 text-white transition-opacity duration-500 ${
                  synced ? "opacity-100" : "opacity-0"
                }`}
              >
                <Check size={14} strokeWidth={3} />
                In sync across all four systems
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
