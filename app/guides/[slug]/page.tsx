import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import SignupForm from "@/components/SignupForm";
import { guideComponents } from "@/components/guide/mdx";
import { formatLongDate, getAllGuides, getGuide, getGuideSlugs } from "@/lib/guides";
import { TOPICS } from "@/lib/topics";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!getGuideSlugs().includes(slug)) return {};
  const { meta } = getGuide(slug);
  return {
    title: meta.headline,
    description: meta.summary,
    openGraph: {
      title: meta.headline,
      description: meta.summary,
      type: "article",
      publishedTime: meta.publishedAt,
      authors: ["Richard Tuharsky"],
    },
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  if (!getGuideSlugs().includes(slug)) notFound();
  const { meta, body } = getGuide(slug);
  const topic = TOPICS[meta.topic];

  return (
    <main>
      {/* Masthead */}
      <div className="bg-night text-on-night">
        <div className="wrap flex max-w-none flex-col gap-4 pt-[clamp(1.5rem,4vw,3rem)] pb-[clamp(2.5rem,5vw,4rem)]">
          <nav
            aria-label="Breadcrumb"
            className="font-display text-sm text-on-night-muted"
          >
            <ol className="flex list-none flex-wrap gap-1.5 p-0">
              <li className="after:ml-1.5 after:content-['/']">
                <Link href="/" className="text-on-night-muted">
                  Home
                </Link>
              </li>
              <li className="after:ml-1.5 after:content-['/']">
                <Link href="/#guides" className="text-on-night-muted">
                  Guides
                </Link>
              </li>
              <li>
                <span aria-current="page">{meta.crumb}</span>
              </li>
            </ol>
          </nav>
          <div className="flex max-w-[52rem] flex-col gap-4">
            <p className="flex items-center gap-2 font-display text-sm font-semibold text-on-night-soft">
              <span
                aria-hidden="true"
                className="size-3 rounded-full"
                style={{ background: topic.line }}
              />
              {meta.stopTag ?? `Stop ${topic.stop}: ${topic.name}`}
            </p>
            <h1 className="wdth-125 text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-[870] tracking-[-0.025em]">
              {meta.headline}
            </h1>
            <p className="max-w-[40rem] text-[clamp(1.125rem,1.8vw,1.3125rem)] text-on-night-soft">
              {meta.summary}
            </p>
            <p className="flex flex-wrap gap-x-6 gap-y-2 pt-1.5 font-display text-sm text-on-night-muted">
              <span>
                By{" "}
                <strong className="font-semibold text-white">
                  Richard Tuharsky
                </strong>
              </span>
              <span>{meta.readTime} min read</span>
              <span>{meta.toc.filter((t) => t.num).length} stages</span>
              <span>
                Documentation checked {formatLongDate(meta.docsChecked)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Body with table of contents */}
      <div className="wrap grid grid-cols-[minmax(0,1fr)] justify-between gap-8 pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(3rem,7vw,5rem)] lg:grid-cols-[15rem_minmax(0,44rem)] lg:gap-16">
        <aside
          className="sticky top-6 hidden self-start font-display lg:block"
          aria-labelledby="toc-title"
        >
          <p id="toc-title" className="mb-3.5 text-[0.9375rem] font-bold">
            In this guide
          </p>
          <ol className="relative m-0 list-none p-0">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-1.5 w-1 rounded-sm"
              style={{ background: topic.line }}
            />
            {meta.toc.map((entry) => (
              <li
                key={entry.id}
                className="relative pl-6.5 before:absolute before:top-2.5 before:left-0 before:size-4 before:rounded-full before:border-[3px] before:border-ink before:bg-surface"
              >
                <a
                  href={`#${entry.id}`}
                  className="block py-1.5 text-sm leading-snug text-ink no-underline hover:underline"
                >
                  {entry.num ? (
                    <span className="block text-xs font-bold text-muted tabular-nums">
                      {entry.num}
                    </span>
                  ) : null}
                  {entry.label}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="flex min-w-0 flex-col gap-14">
          <details className="rounded-xl border border-rule bg-surface px-4.5 py-3.5 font-display lg:hidden">
            <summary className="cursor-pointer text-[0.9375rem] font-bold">
              In this guide
            </summary>
            <ol className="mt-3 flex list-decimal flex-col pl-5 text-[0.9375rem]">
              {meta.toc.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="inline-flex min-h-11 items-center text-ink"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          {/* Local, trusted content: allow expression attributes (items={[…]}).
              blockDangerousJS stays on. */}
          <MDXRemote
            source={body}
            components={guideComponents}
            options={{ blockJS: false }}
          />

          <div className="flex flex-wrap justify-between gap-3 border-t border-rule pt-6 font-display text-[0.9375rem]">
            <Link href="/#guides" className="font-semibold text-ink">
              Back to all guides
            </Link>
            <a href="#top" className="font-semibold text-ink">
              Back to top
            </a>
          </div>
        </article>
      </div>

      {/* Closing band */}
      <div className="bg-night text-on-night">
        <section
          className="wrap flex flex-wrap items-end gap-x-16 gap-y-8 pt-[clamp(3.5rem,8vw,5.5rem)] pb-[clamp(2.5rem,6vw,4rem)]"
          id="subscribe"
          aria-labelledby="subscribe-title"
        >
          <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-3.5">
            <h2
              id="subscribe-title"
              className="wdth-125 text-[clamp(2rem,4.4vw,3.5rem)] leading-none font-[880] tracking-[-0.03em]"
            >
              Get the next guide by email
            </h2>
            <p className="text-on-night-soft">
              Practical troubleshooting for CRM, Data 360 and Marketing Cloud
              data, plus the Automation Reliability Checklist when you join.
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
