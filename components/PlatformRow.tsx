import { Send, Route, Database, Smartphone, IdCard } from "lucide-react";

const PLATFORMS = [
  {
    name: "Marketing Cloud Engagement",
    description: "Journeys, automations, data extensions",
    Icon: Send,
  },
  {
    name: "Marketing Cloud Next",
    description: "Core-platform journeys and migration",
    Icon: Route,
  },
  {
    name: "Data 360 and other CDPs",
    description: "Ingestion, segments, activation",
    Icon: Database,
  },
  {
    name: "Braze",
    description: "Data feeds, audiences, identifiers",
    Icon: Smartphone,
  },
  {
    name: "Sales Cloud and Service Cloud",
    description: "Leads, routing, Flow, handoffs",
    Icon: IdCard,
  },
];

/**
 * "Platforms covered here" row inside the navy band.
 * 5 columns desktop, 2 tablet (last item spans the row, so no orphan),
 * 1 mobile.
 */
export default function PlatformRow() {
  return (
    <section
      className="wrap flex flex-col gap-4 border-t border-board-rule pt-6 pb-9"
      aria-labelledby="platforms-title"
    >
      <h2
        id="platforms-title"
        className="font-display text-sm font-semibold text-on-night-muted"
      >
        Platforms covered here
      </h2>
      <ul className="grid list-none grid-cols-1 gap-x-6 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {PLATFORMS.map(({ name, description, Icon }, index) => (
          <li
            key={name}
            className={`flex min-w-0 items-center gap-3 lg:items-start lg:gap-0 lg:flex-col lg:gap-y-3 ${
              index === PLATFORMS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className="grid size-11 flex-none place-items-center rounded-xl border border-board-rule bg-board text-signal"
            >
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span className="flex min-w-0 flex-col font-display">
              <span className="text-[0.9375rem] leading-snug font-bold text-white">
                {name}
              </span>
              <span className="text-[0.8125rem] leading-snug text-on-night-muted">
                {description}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
