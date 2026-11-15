"use client";

import { Pause, Play } from "lucide-react";

/**
 * Pause/play control for a looping demo (WCAG 2.2.2). Hidden when the
 * viewer prefers reduced motion, because nothing is moving then.
 */
export default function MotionToggle({
  paused,
  reduced,
  onToggle,
  tone = "night",
  className = "",
}: {
  paused: boolean;
  reduced: boolean;
  onToggle: () => void;
  tone?: "night" | "paper";
  className?: string;
}) {
  if (reduced) return null;
  const Icon = paused ? Play : Pause;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={paused ? "Play animation" : "Pause animation"}
      className={`grid size-11 flex-none cursor-pointer place-items-center rounded-full border transition-colors duration-150 ${
        tone === "night"
          ? "border-board-rule bg-board/80 text-on-night-soft hover:text-white"
          : "border-rule bg-surface text-muted hover:text-ink"
      } ${className}`}
    >
      <Icon size={15} strokeWidth={2.4} aria-hidden="true" />
    </button>
  );
}
