"use client";

import { Check } from "lucide-react";
import { useLoop } from "@/components/route/useLoop";
import { TOPICS } from "@/lib/topics";
import ScreenFrame from "./ScreenFrame";

/*
 * Stop 1, Data foundations: the same contact in CRM and in marketing.
 * Fields drift apart, then reconcile under a "source of truth" badge.
 */

const ACCENT = TOPICS["data-foundations"].line;
// 0 in sync · 1 email drifts · 2 lifecycle drifts · 3 reconciling · 4 matched
const DURATIONS = [1400, 1500, 1600, 1500, 2800];

const CRM = { email: "alex@example.com", stage: "Customer", phone: "+00 555 0100" };
const DRIFTED = { email: "alex.e@example.com", stage: "Lead", phone: "+00 555 0100" };

function Field({
  label,
  value,
  off,
}: {
  label: string;
  value: string;
  off: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="label text-[0.625rem] text-on-night-muted">{label}</span>
      <span
        className="relative block min-w-0 truncate transition-colors duration-500"
        style={{ color: off ? ACCENT : "#ffffff" }}
      >
        <span
          className="absolute top-1/2 -left-[7px] size-1.5 -translate-y-1/2 rounded-full transition-opacity duration-300"
          style={{ background: ACCENT, opacity: off ? 1 : 0 }}
        />
        {value}
      </span>
    </div>
  );
}

export default function DriftScreen() {
  const { ref, step, paused, reduced, togglePaused } =
    useLoop<HTMLDivElement>(DURATIONS);

  const emailOff = step === 1 || step === 2;
  const stageOff = step === 2;
  const marketing = {
    email: emailOff ? DRIFTED.email : CRM.email,
    stage: stageOff ? DRIFTED.stage : CRM.stage,
    phone: CRM.phone,
  };
  const status = [
    "In sync",
    "1 field differs",
    "2 fields differ",
    "Reconciling to CRM",
    "",
  ][step];

  return (
    <ScreenFrame
      title="Contact · fictional data"
      description="Animated example with fictional data: the same contact in the CRM and in the marketing platform. Their email and lifecycle stage drift apart, then reconcile to the CRM as the source of truth."
      paused={paused}
      reduced={reduced}
      onToggle={togglePaused}
      screenRef={ref}
    >
      <div className="flex h-full flex-col gap-3">
        <div className="grid flex-1 grid-cols-2 gap-2.5">
          {[
            { system: "CRM", values: CRM, isSource: true },
            { system: "Marketing", values: marketing, isSource: false },
          ].map(({ system, values, isSource }) => (
            <div
              key={system}
              className="flex min-w-0 flex-col gap-2 rounded-lg border p-2.5 transition-colors duration-500"
              style={{
                borderColor:
                  step === 4 && isSource ? ACCENT : "var(--color-board-rule)",
              }}
            >
              <span className="label text-white">{system}</span>
              <Field label="Email" value={values.email} off={!isSource && emailOff} />
              <Field label="Lifecycle" value={values.stage} off={!isSource && stageOff} />
              <Field label="Phone" value={values.phone} off={false} />
            </div>
          ))}
        </div>
        <div className="relative h-7">
          <span
            className={`label absolute inset-0 flex items-center text-on-night-soft transition-opacity duration-300 ${
              step === 4 ? "opacity-0" : "opacity-100"
            }`}
          >
            {status}
            {step === 3 ? (
              <span className="ml-2 inline-block h-[3px] w-10 overflow-hidden rounded-full bg-board-rule">
                <span
                  className="block h-full w-1/2 animate-pulse rounded-full"
                  style={{ background: ACCENT }}
                />
              </span>
            ) : null}
          </span>
          <span
            className={`label absolute inset-y-0 left-0 inline-flex items-center gap-1.5 rounded-full border px-2.5 transition-opacity duration-500 ${
              step === 4 ? "opacity-100" : "opacity-0"
            }`}
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            <Check size={12} strokeWidth={3.5} />
            Source of truth: CRM
          </span>
        </div>
      </div>
    </ScreenFrame>
  );
}
