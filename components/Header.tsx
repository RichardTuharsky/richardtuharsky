"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { articlesHref } from "@/lib/filters";
import { TOPIC_LIST } from "@/lib/topics";

const RESOURCE_ITEMS = [
  { filter: "mce", label: "Marketing Cloud Engagement" },
  { filter: "mc-next", label: "MC Next" },
  { filter: "data-360", label: "Data 360" },
  { filter: "braze", label: "Braze" },
];

const ARTICLE_ITEMS = [
  { filter: "", label: "All articles" },
  { filter: "customer-data", label: "Customer Data" },
  { filter: "retention", label: "Retention" },
  { filter: "ltv", label: "LTV" },
];

function NavDropdown({
  label,
  items,
  open,
  onToggle,
  onNavigate,
}: {
  label: string;
  items: { filter: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const menuId = `menu-${label.toLowerCase()}`;
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={onToggle}
        className="nav-link inline-flex min-h-11 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-display text-[0.9375rem] text-[#e8ecf4]"
      >
        {label}
        <ChevronDown
          size={13}
          strokeWidth={2.2}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          id={menuId}
          className="animate-menu-in absolute top-[calc(100%+0.3rem)] left-0 z-40 m-0 min-w-64 list-none rounded-xl bg-white p-1.5 text-ink shadow-[0_26px_50px_-26px_rgba(0,0,0,0.7)] max-sm:right-0 max-sm:left-auto"
        >
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={articlesHref(item.filter)}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-2.5 text-[0.9375rem] text-ink no-underline transition-[background-color,padding] duration-150 hover:bg-[#eef1f6] hover:pl-4 focus-visible:bg-[#eef1f6]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Four-stop route line: one segment per topic, each filling in its colour as
 * the page scrolls. Progress is written to a CSS variable, so scrolling never
 * re-renders React.
 */
function RouteProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      node.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 flex h-[3px] gap-[3px] bg-night md:absolute md:top-auto md:bottom-0 md:bg-transparent"
      style={{ "--p": 0 } as React.CSSProperties}
    >
      {TOPIC_LIST.map((topic, index) => (
        <span key={topic.id} className="relative flex-1 bg-board-rule">
          <span
            className="absolute inset-0 origin-left"
            style={{
              background: topic.line,
              transform: `scaleX(clamp(0, calc(var(--p) * 4 - ${index}), 1))`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

/** Site header: wordmark, nav with topic dropdowns, and the route progress line. */
export default function Header() {
  const [openMenu, setOpenMenu] = useState<"" | "resources" | "articles">("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu("");
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu("");
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  return (
    <div className="relative z-40 border-b border-board-rule bg-night/95 text-on-night backdrop-blur-md md:sticky md:top-0">
      <header className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3.5">
        <Link
          href="/"
          className="flex min-h-11 flex-col justify-center gap-0.5 text-on-night no-underline"
          aria-label="Sync and Send, home"
        >
          <span className="wdth-125 font-display text-[1.25rem] leading-none font-[850] tracking-[-0.01em]">
            Sync{" "}
            <span className="font-body font-medium italic text-signal">&amp;</span>{" "}
            Send
          </span>
          <span className="label text-[0.6875rem] text-on-night-muted">
            by Richard Tuharsky
          </span>
        </Link>
        <nav
          ref={navRef}
          className="flex flex-wrap items-center gap-x-4 font-display text-[0.9375rem] sm:gap-x-5"
          aria-label="Main"
        >
          <NavDropdown
            label="Resources"
            items={RESOURCE_ITEMS}
            open={openMenu === "resources"}
            onToggle={() =>
              setOpenMenu(openMenu === "resources" ? "" : "resources")
            }
            onNavigate={() => setOpenMenu("")}
          />
          <NavDropdown
            label="Articles"
            items={ARTICLE_ITEMS}
            open={openMenu === "articles"}
            onToggle={() => setOpenMenu(openMenu === "articles" ? "" : "articles")}
            onNavigate={() => setOpenMenu("")}
          />
          <Link
            href="/#about"
            className="nav-link inline-flex min-h-11 items-center text-[#e8ecf4] no-underline max-[400px]:hidden"
          >
            About
          </Link>
          <Link
            href="/#subscribe"
            className="inline-flex min-h-11 items-center rounded-full bg-signal px-4.5 font-bold text-night no-underline transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_-6px_rgba(255,183,3,0.65)] hover:brightness-105 active:translate-y-0"
          >
            Subscribe
          </Link>
        </nav>
      </header>
      <RouteProgress />
    </div>
  );
}
