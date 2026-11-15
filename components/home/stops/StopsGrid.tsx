"use client";

import { useEffect, useRef, type ReactNode } from "react";

const MAX_LEAN_DEG = 3;

/**
 * 2×2 grid of stop tiles with a soft light that follows the mouse, catching
 * tile edges, while each tile leans gently toward it. Without a fine pointer
 * the light drifts as the grid scrolls past instead (no lean). Reduced motion
 * keeps a still light and no lean. Everything is written as CSS variables on
 * the [data-tile] children, so React never re-renders on pointer moves.
 */
export default function StopsGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-tile]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const light = (x: number, y: number, lean: boolean, opacity = 1) => {
      for (const tile of tiles) {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--lx", `${(x - r.left).toFixed(1)}px`);
        tile.style.setProperty("--ly", `${(y - r.top).toFixed(1)}px`);
        tile.style.setProperty("--lo", String(opacity));
        if (lean) {
          const dx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / r.width));
          const dy = Math.max(-1, Math.min(1, (y - (r.top + r.height / 2)) / r.height));
          tile.style.setProperty("--ry", `${(dx * MAX_LEAN_DEG).toFixed(2)}deg`);
          tile.style.setProperty("--rx", `${(-dy * MAX_LEAN_DEG).toFixed(2)}deg`);
        }
      }
    };

    const rest = () => {
      for (const tile of tiles) {
        tile.style.setProperty("--rx", "0deg");
        tile.style.setProperty("--ry", "0deg");
        tile.style.setProperty("--lo", "0");
      }
    };

    if (reduced) {
      const r = grid.getBoundingClientRect();
      light(r.left + r.width * 0.3, r.top, false, 0.6);
      return;
    }

    let frame = 0;
    let pending: (() => void) | null = null;
    const schedule = (fn: () => void) => {
      pending = fn;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          pending?.();
        });
      }
    };

    if (finePointer) {
      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const { clientX, clientY } = event;
        schedule(() => light(clientX, clientY, true));
      };
      const onLeave = () => schedule(rest);
      grid.addEventListener("pointermove", onMove);
      grid.addEventListener("pointerleave", onLeave);
      return () => {
        grid.removeEventListener("pointermove", onMove);
        grid.removeEventListener("pointerleave", onLeave);
        cancelAnimationFrame(frame);
      };
    }

    // No mouse: the light drifts with scroll.
    const onScroll = () =>
      schedule(() => {
        const r = grid.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        const x = r.left + r.width * (0.5 + 0.38 * Math.sin(p * Math.PI * 2));
        const y = r.top + r.height * p;
        light(x, y, false);
      });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
      {children}
    </div>
  );
}
