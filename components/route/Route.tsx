import type { ReactNode } from "react";

/**
 * Wraps a page in the single thin route line that joins its sections.
 * The line sits in the outer gutter (md and up); stop markers inside branch
 * back to it. Styling lives in globals.css (.route-scope / .route-line).
 */
export default function Route({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`route-scope relative ${className}`}>
      <span aria-hidden="true" className="route-line" />
      {children}
    </div>
  );
}
