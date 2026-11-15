"use client";

import type { ReactNode, Ref } from "react";
import MotionToggle from "@/components/route/MotionToggle";

/**
 * Mini-screen chrome shared by the stop tiles: a title bar with a pause
 * control, a fixed-height body (so state changes never shift layout), and a
 * screen-reader summary in place of the animated content.
 */
export default function ScreenFrame({
  title,
  description,
  paused,
  reduced,
  onToggle,
  screenRef,
  children,
}: {
  title: string;
  description: string;
  paused: boolean;
  reduced: boolean;
  onToggle: () => void;
  screenRef: Ref<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div
      ref={screenRef}
      className="relative z-10 overflow-hidden rounded-xl border border-board-rule bg-night/80"
    >
      <div className="flex items-center gap-3 border-b border-board-rule py-1 pr-1 pl-3.5">
        <span className="label min-w-0 flex-1 truncate text-on-night-muted">
          {title}
        </span>
        <MotionToggle paused={paused} reduced={reduced} onToggle={onToggle} />
      </div>
      <p className="sr-only">{description}</p>
      <div aria-hidden="true" className="h-[16.5rem] p-3.5 font-display text-sm">
        {children}
      </div>
    </div>
  );
}
