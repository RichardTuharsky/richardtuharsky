"use client";

import { Check } from "lucide-react";
import { useLoop } from "@/components/route/useLoop";
import { TOPICS } from "@/lib/topics";
import ScreenFrame from "./ScreenFrame";

/*
 * Stop 4, Marketing-to-sales handoffs: a lead moving from form fill to a
 * sales task, picking up its context fields on the way, ending in a tick.
 */

const ACCENT = TOPICS["sales-handoffs"].line;

const STAGES = [
  { name: "Form fill", field: "Source", value: "Webinar form" },
  { name: "CRM lead", field: "Interest", value: "Data 360" },
  { name: "Routed", field: "Owner", value: "Sales rep" },
  { name: "Sales task", field: "Next step", value: "Call within 1 day" },
];
// One step per stage, then the tick.
const DURATIONS = [1200, 1200, 1200, 1200, 2800];

export default function LeadScreen() {
  const { ref, step, paused, reduced, togglePaused } =
    useLoop<HTMLDivElement>(DURATIONS);
  const done = step === STAGES.length;

  return (
    <ScreenFrame
      title="Lead · fictional data"
      description="Animated example with fictional data: a lead moves from a webinar form fill to a CRM lead, is routed to a sales rep, and becomes a sales task. It picks up its source, interest, owner and next step on the way, and ends with the task created with that context."
      paused={paused}
      reduced={reduced}
      onToggle={togglePaused}
      screenRef={ref}
    >
      <div className="flex h-full flex-col gap-2">
        <ol className="relative m-0 flex flex-1 list-none flex-col justify-between p-0 py-0.5">
          <span className="absolute top-3 bottom-3 left-[7px] w-[2px] bg-board-rule" />
          <span
            className="absolute top-3 left-[7px] w-[2px] transition-[height] duration-700 ease-out"
            style={{
              background: ACCENT,
              height: `calc((100% - 1.5rem) * ${Math.min(step, STAGES.length - 1) / (STAGES.length - 1)})`,
            }}
          />
          {STAGES.map((stage, index) => {
            const reached = index <= step;
            return (
              <li key={stage.name} className="relative flex items-center gap-3">
                <span
                  className="size-4 flex-none rounded-full border-[3px] transition-colors duration-500"
                  style={{
                    borderColor: reached ? ACCENT : "var(--color-board-rule)",
                    background: index === step ? ACCENT : "var(--color-night)",
                  }}
                />
                <span
                  className={`label w-[5.5rem] flex-none transition-colors duration-500 ${
                    reached ? "text-white" : "text-on-night-muted"
                  }`}
                >
                  {stage.name}
                </span>
                <span
                  className={`min-w-0 truncate rounded-full border px-2.5 py-0.5 text-[0.8125rem] transition-[opacity,transform] duration-500 ${
                    reached ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                  style={{ borderColor: "var(--color-board-rule)" }}
                >
                  <span className="text-on-night-muted">{stage.field}: </span>
                  <span className="text-white">{stage.value}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <p
          className={`label m-0 flex items-center gap-1.5 border-t border-board-rule pt-2.5 transition-opacity duration-500 ${
            done ? "opacity-100" : "opacity-0"
          }`}
          style={{ color: ACCENT }}
        >
          <Check size={13} strokeWidth={3.5} />
          Task created with its context
        </p>
      </div>
    </ScreenFrame>
  );
}
