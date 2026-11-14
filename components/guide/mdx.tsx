import type { ReactNode } from "react";

/*
 * Structural chrome for guide MDX files. The guide text stays verbatim in
 * content/guides/*.mdx; these components carry the Night run styling for
 * stages, goal/pass/note rows, step lists and resource links.
 */

/** A clickable Setup path, e.g. "Setup → Object Manager". */
export function Path({ children }: { children: ReactNode }) {
  return (
    <span className="font-display text-[0.95em] font-semibold">{children}</span>
  );
}

/** Opening paragraphs; the first is set larger. */
export function Intro({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 [&>p:first-child]:text-xl [&>p:first-child]:leading-[1.55]">
      {children}
    </div>
  );
}

/** An unnumbered section, e.g. "Find your starting point". */
export function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-6 flex-col gap-4"
    >
      <h2
        id={`${id}-title`}
        className="wdth-112 text-[clamp(1.5rem,2.6vw,1.875rem)] leading-[1.12] font-extrabold tracking-[-0.015em]"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/** A numbered stage with its roundel label. */
export function Stage({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-6 flex-col gap-4"
    >
      <p className="flex items-center gap-2.5 font-display text-sm font-bold text-muted tabular-nums before:size-3.5 before:rounded-full before:border-[3px] before:border-ink before:bg-surface">
        {num}
      </p>
      <h2
        id={`${id}-title`}
        className="wdth-112 text-[clamp(1.5rem,2.6vw,1.875rem)] leading-[1.12] font-extrabold tracking-[-0.015em]"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Goal({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg [&>strong]:font-display [&_a]:font-semibold">
      {children}
    </p>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="m-0 flex list-decimal flex-col gap-3 pl-6 marker:font-display marker:font-bold marker:text-muted">
      {children}
    </ol>
  );
}

export function Note({
  warn = false,
  children,
}: {
  warn?: boolean;
  children: ReactNode;
}) {
  return (
    <p
      className={`flex gap-3 rounded-xl border p-4 text-base ${
        warn
          ? "border-[#f1d79a] bg-warn-bg before:bg-warn before:font-display before:content-['!']"
          : "border-rule bg-surface before:bg-ink before:font-body before:italic before:content-['i']"
      } before:mt-0.5 before:grid before:size-6 before:flex-none before:place-items-center before:rounded-full before:text-sm before:font-bold before:text-white`}
    >
      <span>{children}</span>
    </p>
  );
}

function PassCheck() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 size-6 flex-none rounded-full bg-pass p-1 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 12.5l4 4 8-9" />
    </svg>
  );
}

export function Pass({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-3 rounded-xl bg-pass-bg p-4 text-base [&_strong]:font-display [&_strong]:text-pass">
      <PassCheck />
      <span>{children}</span>
    </p>
  );
}

/** "Official resource(s)" row; children are the links. */
export function Resources({
  label = "Official resources",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <p className="flex flex-wrap gap-x-5 gap-y-1.5 font-display text-[0.9375rem] text-muted [&_a]:text-[#2b3fa8]">
      <span className="w-full font-bold text-ink">{label}</span>
      {children}
    </p>
  );
}

/** The "Find your starting point" table. Children are <tr> rows. */
export function StartTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-rule bg-surface text-base">
        <thead>
          <tr>
            <th
              scope="col"
              className="bg-[#eceee8] px-4 py-3 text-left font-display text-[0.8125rem] font-bold text-muted"
            >
              What you see
            </th>
            <th
              scope="col"
              className="bg-[#eceee8] px-4 py-3 text-left font-display text-[0.8125rem] font-bold text-muted"
            >
              Start here
            </th>
          </tr>
        </thead>
        <tbody className="[&_td]:border-t [&_td]:border-rule [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td:last-child]:font-display [&_td:last-child]:text-[0.9375rem] [&_td:last-child]:font-semibold [&_td:last-child]:lg:whitespace-nowrap">
          {children}
        </tbody>
      </table>
    </div>
  );
}

/** Acceptance checklist at the end of a guide. Items are plain strings. */
export function Resolved({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-[10px] border border-rule bg-surface px-4 py-3 text-base"
        >
          <input
            type="checkbox"
            className="mt-1 size-[18px] flex-none accent-pass"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export const guideComponents = {
  Path,
  Intro,
  Block,
  Stage,
  Goal,
  Steps,
  Note,
  Pass,
  Resources,
  StartTable,
  Resolved,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded bg-[#e8eae4] px-1.5 py-0.5 font-mono text-[0.9em]"
    />
  ),
};
