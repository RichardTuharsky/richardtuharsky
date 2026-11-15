import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ArticlesSection from "@/components/ArticlesSection";
import PlatformRow from "@/components/PlatformRow";
import SignupForm from "@/components/SignupForm";
import SiteSearch, { type SearchEntry } from "@/components/SiteSearch";
import { UPCOMING, getTaggedGuides } from "@/lib/articles";
import { articlesHref } from "@/lib/filters";
import { TOPICS } from "@/lib/topics";
import richardPhoto from "@/assets/rt.png";

export default function HomePage() {
  const guides = getTaggedGuides();

  const searchIndex: SearchEntry[] = [
    ...guides.map((guide) => ({
      title: guide.title,
      description: guide.summary,
      kind: "Guide" as const,
      url: `/guides/${guide.slug}`,
      keywords: `${TOPICS[guide.topic].name} ${guide.tags.join(" ")} salesforce crm data cloud cdp ingestion troubleshooting sync`,
    })),
    ...UPCOMING.map((item) => ({
      title: item.title,
      description: `Coming up. ${item.summary}`,
      kind: "Article" as const,
      url: articlesHref(),
      keywords: `${item.topic ? TOPICS[item.topic].name : item.label} ${item.tags.join(" ")}`,
    })),
    {
      title: "Marketing Cloud Engagement",
      description: "Journeys, automations, data extensions.",
      kind: "Platform",
      url: articlesHref("mce"),
      keywords:
        "sfmc marketing cloud engagement journey builder automation studio ampscript sql query",
    },
    {
      title: "Marketing Cloud Next",
      description: "Core-platform journeys and migration.",
      kind: "Platform",
      url: articlesHref("mc-next"),
      keywords: "mc next marketing cloud next core platform migration data cloud native",
    },
    {
      title: "Data 360 and other CDPs",
      description: "Ingestion, segments, activation.",
      kind: "Platform",
      url: articlesHref("data-360"),
      keywords:
        "data 360 data cloud cdp ingestion data streams segments activation identity dlo dmo",
    },
    {
      title: "Braze",
      description: "Data feeds, audiences, identifiers.",
      kind: "Platform",
      url: articlesHref("braze"),
      keywords: "braze canvas segments catalogs connected content external id",
    },
    {
      title: "Sales Cloud and Service Cloud",
      description: "Leads, routing, Flow, handoffs.",
      kind: "Platform",
      url: "/#platforms",
      keywords: "sales cloud service cloud crm leads campaigns flow routing tasks",
    },
    {
      title: "About Richard",
      description:
        "Five years on enterprise Salesforce and Marketing Cloud projects.",
      kind: "About",
      url: "/#about",
      keywords: "about richard tuharsky salesforce consultant author keep know engage expand protect",
    },
    {
      title: "Subscribe",
      description: "Get new issues of Sync & Send by email.",
      kind: "Page",
      url: "/#subscribe",
      keywords: "subscribe newsletter email signup updates news",
    },
  ];

  return (
    <main>
      <div className="bg-night text-on-night">
        <section
          className="wrap flex min-h-[min(62vh,34rem)] flex-col items-center justify-center gap-7 pt-[clamp(3rem,9vw,6.5rem)] pb-[clamp(3.5rem,10vw,7rem)] text-center"
          aria-labelledby="hero-title"
        >
          <h1
            id="hero-title"
            className="wdth-125 max-w-[50rem] text-[clamp(1.875rem,5vw_-_6px,4.125rem)] leading-[0.98] font-[880] tracking-[-0.03em]"
          >
            Your campaign is only as fresh as the data behind it.
          </h1>
          <p className="max-w-[40rem] text-[clamp(1.125rem,1.7vw,1.25rem)] leading-[1.55] text-on-night-soft">
            Practical notes on customer data, automation and marketing-to-sales
            handoffs, for the people who keep marketing and CRM systems
            running.
          </p>
          <SiteSearch index={searchIndex} />
        </section>
      </div>

      <Suspense>
        <ArticlesSection guides={guides} upcoming={UPCOMING} />
      </Suspense>

      <section
        className="wrap border-t border-rule py-section-sm md:py-section"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="flex flex-wrap items-center gap-x-14 gap-y-8">
          <Image
            src={richardPhoto}
            alt="Richard Tuharsky"
            placeholder="blur"
            sizes="220px"
            className="h-auto w-[220px] flex-none rounded-2xl"
          />
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
        <div id="platforms" className="pt-[clamp(2rem,5vw,3.5rem)]">
          <PlatformRow />
        </div>

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
              Subscribe to get the latest news, guides and practical notes you
              can apply to your own setup.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_23.75rem]">
            <SignupForm
              label="Email address"
              buttonLabel="Subscribe"
              surface="night"
              consent={
                <>
                  New issues of Sync &amp; Send. Unsubscribe anytime.{" "}
                  <Link href="#privacy">Privacy</Link>
                </>
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
