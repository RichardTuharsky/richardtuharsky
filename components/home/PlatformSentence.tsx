"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ArrowRight } from "lucide-react";
import { articlesHref } from "@/lib/filters";
import { PLATFORMS } from "@/lib/platforms";

/**
 * The platforms as one giant sentence. Hovering (mouse), focusing or tapping
 * a name shows its one-line description in the caption below, so nothing
 * depends on hover. No vendor logos.
 */
export default function PlatformSentence() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : PLATFORMS[active];

  return (
    <div className="flex flex-col gap-6">
      <p className="wdth-125 m-0 font-display text-[clamp(1.75rem,4.6vw,3.75rem)] leading-[1.18] font-[850] tracking-[-0.03em] text-on-night-muted">
        Guides cover{" "}
        {PLATFORMS.map((platform, index) => {
          const isActive = active === index;
          const separator =
            index === PLATFORMS.length - 1
              ? "."
              : index === PLATFORMS.length - 2
                ? ", and "
                : ", ";
          return (
            <Fragment key={platform.name}>
              {/* Inline span, not <button>: buttons are inline-block and
                  long names could not wrap inside the sentence. */}
              <span
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-controls="platform-caption"
                onClick={() => setActive(isActive ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(isActive ? null : index);
                  }
                }}
                onFocus={() => setActive(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(index);
                }}
                className={`cursor-pointer rounded-md py-2 underline decoration-2 underline-offset-[0.18em] transition-colors duration-200 [box-decoration-break:clone] ${
                  active === null || isActive
                    ? "text-white decoration-on-night-muted/60"
                    : "text-on-night-muted decoration-transparent"
                } ${isActive ? "decoration-white" : ""}`}
              >
                {platform.name}
              </span>
              {separator}
            </Fragment>
          );
        })}
      </p>

      <div
        id="platform-caption"
        aria-live="polite"
        className="flex min-h-[3.25rem] flex-wrap items-center gap-x-6 gap-y-2 border-t border-board-rule pt-4 font-display"
      >
        {current ? (
          <>
            <p className="m-0 text-[1.0625rem] text-on-night-soft">
              <span className="label mr-3 text-white">{current.name}</span>
              {current.description}
            </p>
            {current.filter ? (
              <Link
                href={articlesHref(current.filter)}
                className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-bold text-white no-underline hover:underline"
              >
                See articles
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            ) : null}
          </>
        ) : (
          <p className="m-0 text-[1.0625rem] text-on-night-muted">
            Choose a platform to see what the guides cover there.
          </p>
        )}
      </div>
    </div>
  );
}
