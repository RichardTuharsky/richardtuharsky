"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface WalkthroughStep {
  title: string;
  body: string;
  /** Label above the panel, e.g. "From the guide: Find your starting point". */
  caption: string;
}

/**
 * "How a guide works": steps on the left, a pinned panel on the right that
 * changes per step. On large screens the step in the middle of the viewport
 * is active; everywhere, choosing a step activates it. All panels share one
 * grid cell, so the frame is as tall as the tallest and never shifts.
 */
export default function GuideWalkthrough({
  steps,
  panels,
}: {
  steps: WalkthroughStep[];
  panels: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 64rem)");
    let io: IntersectionObserver | null = null;
    const connect = () => {
      io?.disconnect();
      io = null;
      if (!wide.matches) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
              if (index !== -1) setActive(index);
            }
          }
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      for (const node of stepRefs.current) if (node) io.observe(node);
    };
    connect();
    wide.addEventListener("change", connect);
    return () => {
      wide.removeEventListener("change", connect);
      io?.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <ol className="m-0 flex list-none flex-col gap-3 p-0 lg:gap-0">
        {steps.map((step, index) => {
          const isActive = index === active;
          return (
            <li
              key={step.title}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              aria-current={isActive ? "step" : undefined}
              className="lg:min-h-[56vh] lg:pt-8"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                aria-controls="walkthrough-panel"
                className={`group flex w-full cursor-pointer gap-4 rounded-xl border bg-transparent p-4 text-left transition-[border-color,background-color] duration-300 lg:border-transparent lg:p-0 ${
                  isActive ? "border-ink bg-surface lg:bg-transparent" : "border-rule"
                }`}
              >
                <span
                  className={`label mt-1.5 grid size-9 flex-none place-items-center rounded-full border-[3px] text-[0.75rem] transition-colors duration-300 ${
                    isActive ? "border-ink bg-ink text-white" : "border-rule bg-surface text-muted"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-1.5">
                  <span
                    className={`wdth-112 font-display text-[clamp(1.25rem,2.2vw,1.625rem)] leading-tight font-extrabold tracking-[-0.015em] transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[1.0625rem] leading-relaxed text-muted">
                    {step.body}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div
          id="walkthrough-panel"
          className="overflow-hidden rounded-2xl border border-rule bg-paper shadow-[0_30px_60px_-40px_rgba(20,33,61,0.5)]"
        >
          <div className="grid">
            {panels.map((panel, index) => (
              <div
                key={index}
                aria-hidden={index !== active}
                className={`flex flex-col gap-4 p-[clamp(1rem,3vw,1.75rem)] transition-[opacity,visibility] duration-400 [grid-area:1/1] ${
                  index === active ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <p className="label m-0 text-muted">{steps[index]?.caption}</p>
                {panel}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
