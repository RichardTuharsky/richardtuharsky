"use client";

import { useRef, useState } from "react";
import { Search } from "lucide-react";

export interface SearchEntry {
  title: string;
  description: string;
  kind: "Guide" | "Article" | "Platform" | "About" | "Page";
  url: string;
  keywords: string;
}

/**
 * Client-side site search under the hero. Matches against a small index
 * built server-side (guides, upcoming articles, platforms, about,
 * subscribe) — enough until Pagefind lands with 5+ guides.
 */
export default function SiteSearch({ index }: { index: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = terms.length
    ? index
        .map((entry) => {
          const haystack =
            `${entry.title} ${entry.description} ${entry.keywords}`.toLowerCase();
          let score = 0;
          for (const term of terms) {
            if (entry.title.toLowerCase().includes(term)) score += 3;
            else if (haystack.includes(term)) score += 1;
            else return null;
          }
          return { entry, score };
        })
        .filter((m): m is { entry: SearchEntry; score: number } => m !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
    : [];

  const showList = open && terms.length > 0;

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[34rem] text-left font-display"
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <form
        role="search"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          const first = matches[0];
          if (first) window.location.href = first.entry.url;
        }}
      >
        <label htmlFor="site-search" className="sr-only">
          Search Sync &amp; Send
        </label>
        <div className="group relative flex items-center">
          <Search
            size={19}
            strokeWidth={2}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 text-[#6b7588] transition-colors duration-200 group-focus-within:text-night"
          />
          <input
            id="site-search"
            type="search"
            placeholder="Search guides, topics and platforms"
            role="combobox"
            aria-expanded={showList}
            aria-controls="site-search-results"
            aria-autocomplete="list"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
            className="min-h-[54px] w-full rounded-xl border-2 border-transparent bg-white py-3 pr-4 pl-12 font-display text-base text-ink shadow-[0_0_0_0_rgba(255,183,3,0)] transition-[border-color,box-shadow] duration-200 outline-none [appearance:none] placeholder:text-[#6b7588] focus:border-signal focus:shadow-[0_0_0_5px_rgba(255,183,3,0.25)] [&::-webkit-search-cancel-button]:[-webkit-appearance:none]"
          />
        </div>
      </form>
      {showList ? (
        <ul
          id="site-search-results"
          role="listbox"
          aria-label="Search results"
          className="animate-menu-in absolute top-[calc(100%+0.5rem)] right-0 left-0 z-30 m-0 max-h-92 list-none overflow-y-auto rounded-xl bg-white p-0 text-ink shadow-[0_28px_54px_-26px_rgba(0,0,0,0.7)]"
        >
          {matches.length === 0 ? (
            <li className="px-4 py-3.5 text-sm text-muted">
              No matches. Try &ldquo;Data 360&rdquo;, &ldquo;audiences&rdquo; or
              &ldquo;automation&rdquo;.
            </li>
          ) : (
            matches.map(({ entry }) => (
              <li
                key={entry.url + entry.title}
                role="option"
                aria-selected={false}
                className="border-t border-rule first:border-t-0"
              >
                <a
                  href={entry.url}
                  onClick={() => setOpen(false)}
                  className="flex flex-col gap-0.5 px-4 py-3 no-underline transition-[background-color,padding] duration-150 hover:bg-[#eef1f6] hover:pl-5 focus-visible:bg-[#eef1f6]"
                >
                  <span className="text-[0.6875rem] font-bold tracking-[0.06em] text-muted uppercase">
                    {entry.kind}
                  </span>
                  <span className="text-[0.9375rem] leading-snug font-bold">
                    {entry.title}
                  </span>
                  <span className="text-[0.8125rem] leading-normal text-muted">
                    {entry.description}
                  </span>
                </a>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
