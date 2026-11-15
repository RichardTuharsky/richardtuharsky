"use client";

import { BellRing, Check, X } from "lucide-react";
import { useLoop } from "@/components/route/useLoop";
import { TOPICS } from "@/lib/topics";
import ScreenFrame from "./ScreenFrame";

/*
 * Stop 3, Dependable automation: an overnight run log where a step fails at
 * 03:00, an alert fires and the retry passes.
 */

const ACCENT = TOPICS["dependable-automation"].line;

type Result = "pass" | "fail" | "alert";
const LINES: { time: string; step: string; result: Result; note: string }[] = [
  { time: "01:00", step: "Import CRM contacts", result: "pass", note: "Passed" },
  { time: "02:00", step: "Refresh audience", result: "pass", note: "Passed" },
  { time: "03:00", step: "Build send list", result: "fail", note: "Failed: timeout" },
  { time: "03:01", step: "Alert sent to on-call", result: "alert", note: "Alert" },
  { time: "03:15", step: "Retry build send list", result: "pass", note: "Passed" },
];
// One step per line, then the summary.
const DURATIONS = [900, 900, 1400, 1200, 1400, 2800];

function Icon({ result }: { result: Result }) {
  if (result === "fail") {
    return (
      <span className="grid size-4 flex-none place-items-center rounded-full border border-white text-white">
        <X size={10} strokeWidth={3.5} />
      </span>
    );
  }
  if (result === "alert") {
    return <BellRing size={15} strokeWidth={2.4} className="flex-none text-white" />;
  }
  return (
    <span
      className="grid size-4 flex-none place-items-center rounded-full text-night"
      style={{ background: ACCENT }}
    >
      <Check size={10} strokeWidth={3.5} />
    </span>
  );
}

export default function RunLogScreen() {
  const { ref, step, paused, reduced, togglePaused } =
    useLoop<HTMLDivElement>(DURATIONS);

  return (
    <ScreenFrame
      title="Overnight run · fictional data"
      description="Animated example with fictional data: an overnight automation log. Importing contacts and refreshing the audience pass; building the send list fails at 03:00 with a timeout, an alert goes to the on-call person, and the retry at 03:15 passes."
      paused={paused}
      reduced={reduced}
      onToggle={togglePaused}
      screenRef={ref}
    >
      <div className="flex h-full flex-col gap-2">
        <ol className="m-0 flex flex-1 list-none flex-col gap-1.5 p-0">
          {LINES.map((line, index) => (
            <li
              key={line.time + line.step}
              className={`grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-md px-1.5 py-1 transition-[opacity,background-color] duration-500 ${
                index <= step ? "opacity-100" : "opacity-0"
              } ${line.result === "fail" && step === 2 ? "bg-white/10" : ""}`}
            >
              <span className="text-on-night-muted tabular-nums">{line.time}</span>
              <span
                className={`truncate ${
                  line.result === "fail" ? "text-white line-through decoration-white/50" : "text-on-night-soft"
                }`}
              >
                {line.step}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="label hidden text-[0.625rem] text-on-night-muted sm:inline">
                  {line.note}
                </span>
                <Icon result={line.result} />
              </span>
            </li>
          ))}
        </ol>
        <p
          className={`label m-0 flex items-center gap-1.5 border-t border-board-rule pt-2.5 transition-opacity duration-500 ${
            step === 5 ? "opacity-100" : "opacity-0"
          }`}
          style={{ color: ACCENT }}
        >
          <Check size={13} strokeWidth={3.5} />
          Run complete before the send · 1 retry
        </p>
      </div>
    </ScreenFrame>
  );
}
