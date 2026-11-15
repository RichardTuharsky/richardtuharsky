interface StopMarkerProps {
  label: string;
  /** Surface the marker sits on. */
  tone?: "night" | "paper";
  /** Roundel ring colour; a topic's `line` from lib/topics.ts, or neutral. */
  ring?: string;
  /** Draw the branch tick to the page route line. Off for nested markers. */
  branch?: boolean;
  className?: string;
}

/**
 * Small stop marker that opens every section: a roundel plus an uppercase
 * label, e.g. "Stop 01 · Data foundations". Inside <Route> it grows a branch
 * tick back to the page route line.
 */
export default function StopMarker({
  label,
  tone = "paper",
  ring,
  branch = true,
  className = "",
}: StopMarkerProps) {
  const night = tone === "night";
  return (
    <p
      className={`${branch ? "stop-marker" : ""} label relative m-0 inline-flex items-center gap-2.5 ${
        night ? "text-on-night-muted" : "text-muted"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`size-3.5 flex-none rounded-full border-[3px] ${
          night ? "border-white bg-night" : "border-ink bg-surface"
        }`}
        style={ring ? { borderColor: ring } : undefined}
      />
      {label}
    </p>
  );
}

/** Two-digit stop number, e.g. 1 → "01". */
export function stopNumber(stop: number): string {
  return String(stop).padStart(2, "0");
}
