import { type SearchEntry } from "@/components/SiteSearch";
import SubscribePanel from "@/components/SubscribePanel";
import Route from "@/components/route/Route";
import StopMarker from "@/components/route/StopMarker";
import About from "@/components/home/About";
import Closing from "@/components/home/Closing";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import HowGuideWorks from "@/components/home/HowGuideWorks";
import Latest from "@/components/home/Latest";
import PlatformSentence from "@/components/home/PlatformSentence";
import WritingRules from "@/components/home/WritingRules";
import StopsSection from "@/components/home/stops/StopsSection";
import { UPCOMING, getTaggedGuides } from "@/lib/articles";
import { articlesHref } from "@/lib/filters";
import { formatLongDate } from "@/lib/format";
import { PLATFORMS } from "@/lib/platforms";
import { TOPICS } from "@/lib/topics";

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
    ...PLATFORMS.map((platform) => ({
      title: platform.name,
      description: platform.description,
      kind: "Platform" as const,
      url: platform.filter ? articlesHref(platform.filter) : "/#platforms",
      keywords: platform.keywords,
    })),
    {
      title: "About Richard",
      description:
        "Five years on enterprise Salesforce and Marketing Cloud projects.",
      kind: "About",
      url: "/#about",
      keywords: "about richard tuharsky salesforce consultant author",
    },
    {
      title: "Subscribe",
      description: "Get new issues of Sync & Send by email.",
      kind: "Page",
      url: "/#subscribe",
      keywords: "subscribe newsletter email signup updates news",
    },
  ];

  // Most recent guide's docs-checked date, for the live stage example.
  const docsChecked = guides[0] ? formatLongDate(guides[0].docsChecked) : "";

  return (
    <main>
      <Route>
        <Hero searchIndex={searchIndex} />
        <Latest guides={guides} upcoming={UPCOMING} />
        <StopsSection guides={guides} />
        <HowGuideWorks />
        <div className="border-t border-rule">
          <About />
        </div>
        <div className="bg-night text-on-night">
          <section
            className="wrap py-section-sm md:py-section"
            id="platforms"
            aria-labelledby="platforms-title"
          >
            <div className="mb-[clamp(1.5rem,4vw,2.5rem)] flex flex-col gap-4">
              <StopMarker label="Platforms" tone="night" />
              <h2 id="platforms-title" className="sr-only">
                Platforms covered here
              </h2>
            </div>
            <PlatformSentence />
          </section>
        </div>
        <WritingRules docsChecked={docsChecked} />
        <SubscribePanel
          title="Catch the next issue"
          body="Subscribe to get the latest news, guides and practical notes you can apply to your own setup."
          consent="New issues of Sync & Send. Unsubscribe anytime."
        />
        <Faq />
        <Closing />
      </Route>
    </main>
  );
}
