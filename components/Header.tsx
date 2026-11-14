import Link from "next/link";

const NAV_ITEMS = [
  { href: "/#guides", label: "Guides" },
  { href: "/#checklist", label: "Checklist" },
  { href: "/#about", label: "About" },
];

/** Site header. Rendered inside a navy band; home page hero continues it. */
export default function Header() {
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
        className="flex flex-wrap items-center gap-x-5 font-display text-[0.9375rem]"
        aria-label="Main"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex min-h-11 items-center text-[#e8ecf4] no-underline hover:underline hover:underline-offset-4"
          >
            {item.label}
          </Link>
        ))}
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
