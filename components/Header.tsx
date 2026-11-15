"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { articlesHref } from "@/lib/filters";

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
        className="flex flex-col gap-1 text-on-night no-underline"
        aria-label="Sync and Send, home"
      >
        <span className="wdth-125 font-display text-[1.375rem] leading-none font-[850] tracking-[-0.01em]">
          Sync{" "}
          <span className="font-body font-medium italic text-signal">&amp;</span>{" "}
          Send
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
          className="nav-link inline-flex min-h-11 items-center text-[#e8ecf4] no-underline"
        >
          About
        </Link>
        <Link
          href="/#subscribe"
          className="inline-flex min-h-11 items-center rounded-full bg-signal px-4.5 font-bold text-night no-underline shadow-[0_0_0_0_rgba(255,183,3,0)] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_-6px_rgba(255,183,3,0.65)] hover:brightness-105 active:translate-y-0"
        >
          Subscribe
        </Link>
      </nav>
    </header>
  );
}
