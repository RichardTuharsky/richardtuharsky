"use client";

import { Check, RefreshCw } from "lucide-react";
import { useLoop } from "@/components/route/useLoop";
import { TOPICS } from "@/lib/topics";
import ScreenFrame from "./ScreenFrame";

/*
 * Stop 2, Usable audiences: a segment count recalculating as rows change,
 * with "last synced" and "last changed" disagreeing until they match.
 */

const ACCENT = TOPICS["usable-audiences"].line;
// 0 up to date · 1 row changes · 2 another row changes · 3 syncing · 4 up to date
const DURATIONS = [1500, 1500, 1500, 1500, 2800];

const ROWS = [
  { name: "Alex Example", flipsAt: -1 },
  { name: "Jordan Sample", flipsAt: 1 },
  { name: "Riley Test", flipsAt: 2 },
  { name: "Sam Placeholder", flipsAt: -1 },
];

export default function SegmentScreen() {
  const { ref, step, paused, reduced, togglePaused } =
    useLoop<HTMLDivElement>(DURATIONS);

  const changed = step >= 2 ? "02:47" : step === 1 ? "02:41" : "01:52";
  const synced = step >= 3 ? "03:00" : "02:00";
  const stale = step === 1 || step === 2;
  const syncing = step === 3;
  const count = step >= 3 ? "1,286" : "1,284";

  return (
    <ScreenFrame
      title="Segment · fictional data"
      description="Animated example with fictional data: rows in a renewal segment change, so the last-changed time moves past the last-synced time. The segment then syncs, its count recalculates from 1,284 to 1,286, and the two times agree again."
      paused={paused}
      reduced={reduced}
      onToggle={togglePaused}
      screenRef={ref}
    >
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="label truncate text-on-night-muted">
              Renewal due in 30 days
            </span>
            <span className="wdth-112 text-[1.75rem] leading-none font-extrabold text-white tabular-nums">
              {count}
            </span>
          </div>
          <span
            className={`label inline-flex items-center gap-1.5 transition-opacity duration-300 ${
              stale || syncing ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: ACCENT }}
          >
            <RefreshCw
              size={12}
              strokeWidth={3}
              className={syncing ? "animate-spin" : ""}
            />
            {syncing ? "Recalculating" : "Count is stale"}
          </span>
        </div>

        <ul className="m-0 flex flex-1 list-none flex-col gap-1 p-0">
          {ROWS.map((row) => {
            const flipped = row.flipsAt !== -1 && step >= row.flipsAt;
            const inSegment = row.flipsAt === -1 ? true : flipped;
            const justChanged = row.flipsAt === step && stale;
            return (
              <li
                key={row.name}
                className="flex items-center justify-between gap-3 rounded-md px-2 py-1 transition-colors duration-500"
                style={{
                  background: justChanged ? "rgb(255 183 3 / 0.12)" : "transparent",
                }}
              >
                <span className="truncate text-on-night-soft">{row.name}</span>
                <span
                  className={`label ${inSegment ? "text-white" : "text-on-night-muted"}`}
                >
                  {inSegment ? "In" : "Out"}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="grid grid-cols-2 gap-2 border-t border-board-rule pt-2.5">
          <div className="flex flex-col">
            <span className="label text-[0.625rem] text-on-night-muted">Last changed</span>
            <span
              className="tabular-nums transition-colors duration-500"
              style={{ color: stale ? ACCENT : "#ffffff" }}
            >
              {changed}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="label text-[0.625rem] text-on-night-muted">Last synced</span>
            <span className="inline-flex items-center gap-1.5 text-white tabular-nums">
              {synced}
              <Check
                size={13}
                strokeWidth={3.5}
                className={`transition-opacity duration-300 ${
                  step === 0 || step === 4 ? "opacity-100" : "opacity-0"
                }`}
                style={{ color: ACCENT }}
              />
            </span>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
