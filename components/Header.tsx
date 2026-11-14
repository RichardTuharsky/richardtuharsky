"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

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
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-display text-[0.9375rem] text-[#e8ecf4] hover:underline hover:underline-offset-4"
      >
        {label}
        <ChevronDown
          size={13}
          strokeWidth={2.2}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          id={menuId}
          className="absolute top-[calc(100%+0.3rem)] left-0 z-40 m-0 min-w-64 list-none rounded-xl bg-white p-1.5 text-ink shadow-[0_26px_50px_-26px_rgba(0,0,0,0.7)] max-sm:right-0 max-sm:left-auto"
        >
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.filter ? `/?filter=${item.filter}#articles` : "/#articles"}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-2.5 text-[0.9375rem] text-ink no-underline hover:bg-[#eef1f6]"
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

/** Site header: KEEP brand lockup plus nav with topic dropdowns. */
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
    <header className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6">
      <Link
        href="/"
        className="flex flex-col gap-1.5 text-on-night no-underline"
        aria-label="KEEP: Know, Engage, Expand, Protect. By Richard Tuharsky. Home"
      >
        {/* KEEP lockup: oversized coloured initials spell the acronym,
            the small caps complete each stage word. */}
        <span
          aria-hidden="true"
          className="flex flex-wrap items-baseline gap-y-1 font-display leading-none"
        >
          {[
            { big: "K", rest: "now", color: "var(--color-line-1)", meaning: "customer data" },
            { big: "E", rest: "ngage", color: "var(--color-line-2)", meaning: "journeys" },
            { big: "E", rest: "xpand", color: "var(--color-line-3)", meaning: "LTV" },
            { big: "P", rest: "rotect", color: "var(--color-line-4)", meaning: "churn prevention" },
          ].map((word, index) => (
            <span
              key={word.big + word.rest}
              title={`${word.big}${word.rest}: ${word.meaning}`}
              className={`wdth-112 inline-flex items-baseline text-[0.6875rem] font-semibold tracking-[0.04em] text-on-night-soft uppercase sm:text-[0.8125rem] ${
                index > 0
                  ? "ml-1.5 border-l border-board-rule pl-1.5 sm:ml-2.5 sm:pl-2.5"
                  : ""
              }`}
            >
              <b
                className="wdth-125 mr-[0.04em] translate-y-[0.04em] text-[1.25rem] font-[880] tracking-[-0.02em] sm:text-[1.625rem]"
                style={{ color: word.color }}
              >
                {word.big}
              </b>
              {word.rest}
            </span>
          ))}
        </span>
        <span className="font-display text-sm text-on-night-muted">
          by Richard Tuharsky
        </span>
      </Link>
      <nav
        ref={navRef}
        className="flex flex-wrap items-center gap-x-5 font-display text-[0.9375rem]"
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
          className="inline-flex min-h-11 items-center text-[#e8ecf4] no-underline hover:underline hover:underline-offset-4"
        >
          About
        </Link>
        <Link
          href="/#subscribe"
          className="inline-flex min-h-11 items-center rounded-full bg-signal px-4.5 font-bold text-night no-underline hover:brightness-105"
        >
          Subscribe
        </Link>
      </nav>
    </header>
  );
}
