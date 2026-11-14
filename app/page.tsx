import Link from "next/link";
import ChecklistTicket from "@/components/ChecklistTicket";
import DepartureBoard from "@/components/DepartureBoard";
import { GuideCard, UpcomingList, type UpcomingGuide } from "@/components/GuideCard";
import PlatformRow from "@/components/PlatformRow";
import RouteMap from "@/components/RouteMap";
import SignupForm from "@/components/SignupForm";
import { getAllGuides } from "@/lib/guides";

const UPCOMING: UpcomingGuide[] = [
  {
    title: "Synced isn't the same as fresh",
    topic: "usable-audiences",
    summary:
      "How to tell when your audience data last changed, and why a successful sync can still leave you with yesterday's customers.",
  },
  {
    title: "The automation that failed at 3am",
    topic: "dependable-automation",
    summary:
      "Who finds out first when an overnight step breaks, and how to make sure it's you and not your customers.",
  },
  {
    title: "The lead nobody followed up",
    topic: "sales-handoffs",
    summary:
      "Tracing one lead from form fill to sales task, and the places it usually disappears.",
  },
  {
    title: "One person, three IDs",
    topic: "data-foundations",
    summary:
      "How duplicate records and mismatched identifiers creep in between CRM and marketing, and how to stop them.",
  },
];

const kitConsent = (
  <>
    You&rsquo;ll also get new issues of Sync &amp; Send. Unsubscribe anytime.{" "}
    <Link href="#privacy">Privacy</Link>
  </>
);

export default function HomePage() {
  const guides = getAllGuides();
  return (
    <main>
      <div className="bg-night text-on-night">
        <section
          className="wrap flex flex-wrap items-center gap-x-14 gap-y-12 pt-[clamp(1.75rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,3.5rem)]"
          aria-labelledby="hero-title"
        >
          <div className="flex min-w-0 flex-[1_1_30rem] flex-col gap-6">
            <h1
              id="hero-title"
              className="wdth-125 text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98] font-[880] tracking-[-0.03em]"
            >
              Your campaign is only as fresh as the data behind it.
            </h1>
            <p className="max-w-[32.5rem] text-[clamp(1.125rem,1.7vw,1.25rem)] leading-[1.55] text-on-night-soft">
              Practical notes on customer data, automation and
              marketing-to-sales handoffs, for the people who keep marketing
              and CRM systems running.
            </p>
            <SignupForm
              label="Get the Automation Reliability Checklist"
              buttonLabel="Get the checklist"
              surface="night"
              consent={kitConsent}
            />
          </div>
          <DepartureBoard />
        </section>

        <PlatformRow />
      </div>

      <section
        className="wrap py-section-sm md:py-section"
        id="guides"
        aria-labelledby="guides-title"
      >
        <div className="mb-[clamp(2.25rem,5vw,3.5rem)] flex max-w-[44rem] flex-col gap-3">
          <h2
            id="guides-title"
            className="wdth-125 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.025em]"
          >
            Guides
          </h2>
          <p className="max-w-[37.5rem] text-muted">
            The first guide is out. Subscribe to get the rest when they&rsquo;re
            published.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
          <UpcomingList items={UPCOMING} />
        </div>
      </section>

      <RouteMap />
      <ChecklistTicket />

      <section
        className="wrap border-t border-rule py-section-sm md:py-section"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="flex flex-wrap items-center gap-x-14 gap-y-8">
          <div aria-hidden="true" className="relative size-[168px] flex-none">
            <span className="absolute top-[78px] left-0 h-3 w-[168px] rounded-md bg-line-1" />
            <span className="absolute top-[78px] left-0 h-3 w-[168px] rotate-45 rounded-md bg-line-2" />
            <span className="absolute top-[78px] left-0 h-3 w-[168px] rotate-90 rounded-md bg-line-3" />
            <span className="absolute top-[78px] left-0 h-3 w-[168px] rotate-[135deg] rounded-md bg-line-4" />
            <b className="wdth-125 absolute top-8 left-8 grid size-[104px] place-items-center rounded-full border-8 border-ink bg-white font-display text-[1.75rem] font-[880] tracking-[-0.03em]">
              RT
            </b>
          </div>
          <div className="flex min-w-0 max-w-[40rem] flex-[1_1_20rem] flex-col gap-4">
            <h2
              id="about-title"
              className="wdth-125 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.025em]"
            >
              About Richard
            </h2>
            <p>
              I&rsquo;ve spent five years on enterprise Salesforce and Marketing
              Cloud projects at large consulting companies, in testing,
              technical and client-facing roles.
            </p>
            <p>
              The part I like most is the technical layer: the syncs, queries
              and automations that decide whether a campaign reaches the right
              person at the right time. Sync &amp; Send is where I write down
              what I&rsquo;ve learned about keeping that layer reliable.
            </p>
            <p className="text-[0.9375rem] text-muted">
              Views here are my own and don&rsquo;t represent any employer or
              client.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-night text-on-night">
        <section
          className="wrap flex flex-wrap items-end gap-x-16 gap-y-8 pt-section-sm pb-[clamp(2.5rem,6vw,4.5rem)] md:pt-section"
          id="subscribe"
          aria-labelledby="subscribe-title"
        >
          <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-3.5">
            <h2
              id="subscribe-title"
              className="wdth-125 text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-[880] tracking-[-0.03em]"
            >
              Catch the next issue
            </h2>
            <p className="text-on-night-soft">
              Practical notes you can apply to your own setup, plus the
              checklist when you join.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_23.75rem]">
            <SignupForm
              label="Email address"
              buttonLabel="Subscribe"
              surface="night"
              consent={
                <>
                  Unsubscribe anytime. <Link href="#privacy">Privacy</Link>
                </>
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
