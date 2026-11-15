import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ArticlesSection from "@/components/ArticlesSection";
import SubscribePanel from "@/components/SubscribePanel";
import Route from "@/components/route/Route";
import StopMarker from "@/components/route/StopMarker";
import { UPCOMING, getTaggedGuides } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles and resources",
  description:
    "Guides and practical notes on customer data, marketing automation and marketing-to-sales handoffs, by platform and theme.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <main>
      <Route>
        <div className="relative overflow-hidden bg-night text-on-night">
          <div
            aria-hidden="true"
            className="night-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_90%_at_20%_0%,#000_30%,transparent_80%)]"
          />
          <div className="wrap relative flex flex-col gap-5 pt-[clamp(1.5rem,4vw,3rem)] pb-[clamp(2.5rem,5vw,4rem)]">
            <nav
              aria-label="Breadcrumb"
              className="font-display text-sm text-on-night-muted"
            >
              <ol className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                <li className="after:ml-1.5 after:content-['/']">
                  <Link href="/" className="text-on-night-muted">
                    Home
                  </Link>
                </li>
                <li>
                  <span aria-current="page">Articles</span>
                </li>
              </ol>
            </nav>
            <StopMarker label="Articles" tone="night" />
            <div className="flex max-w-[52rem] flex-col gap-4">
              <h1 className="wdth-125 m-0 text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-[870] tracking-[-0.03em]">
                Articles and resources
              </h1>
              <p className="m-0 max-w-[40rem] text-[clamp(1.125rem,1.8vw,1.3125rem)] text-on-night-soft">
                The first guide is out. Subscribe to get the rest when
                they&rsquo;re published.
              </p>
            </div>
          </div>
        </div>

        <Suspense>
          <ArticlesSection guides={getTaggedGuides()} upcoming={UPCOMING} />
        </Suspense>

        <SubscribePanel
          title="Catch the next issue"
          body="Subscribe to get the latest news, guides and practical notes you can apply to your own setup."
          consent="New issues of Sync & Send. Unsubscribe anytime."
        />
      </Route>
    </main>
  );
}
