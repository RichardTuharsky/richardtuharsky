import Image from "next/image";
import StopMarker from "@/components/route/StopMarker";
import { UPCOMING } from "@/lib/articles";
import { PLATFORMS } from "@/lib/platforms";
import { TOPIC_LIST } from "@/lib/topics";
import richardPhoto from "@/assets/rt.png";
import CountUp from "./CountUp";

/** Section 5: About Richard, with a pull line from his own copy. */
export default function About() {
  const figures = [
    { value: 5, label: "years on enterprise Salesforce and Marketing Cloud projects" },
    { value: TOPIC_LIST.length, label: "stops on the route" },
    { value: PLATFORMS.length, label: "platforms covered" },
    { value: UPCOMING.length, label: "guides coming up" },
  ];

  return (
    <section
      className="wrap py-section-sm md:py-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="mb-[clamp(2rem,5vw,3rem)]">
        <StopMarker label="About" />
        <h2 id="about-title" className="sr-only">
          About Richard
        </h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <figure className="m-0 flex max-w-[22rem] flex-col gap-3">
          <Image
            src={richardPhoto}
            alt="Richard Tuharsky"
            placeholder="blur"
            sizes="(min-width: 48rem) 22rem, 100vw"
            className="h-auto w-full rounded-2xl"
          />
          <figcaption className="label text-muted">
            Richard Tuharsky · Author
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-col gap-6">
          <blockquote className="m-0">
            <p className="wdth-112 m-0 font-display text-[clamp(1.625rem,3.4vw,2.75rem)] leading-[1.12] font-extrabold tracking-[-0.025em] text-ink">
              &ldquo;The part I like most is the technical layer: the syncs,
              queries and automations that decide whether a campaign reaches
              the right person at the right time.&rdquo;
            </p>
          </blockquote>
          <div className="flex max-w-[40rem] flex-col gap-4">
            <p className="m-0">
              I&rsquo;ve spent five years on enterprise Salesforce and Marketing
              Cloud projects at large consulting companies, in testing,
              technical and client-facing roles.
            </p>
            <p className="m-0">
              Sync &amp; Send is where I write down what I&rsquo;ve learned about
              keeping that layer reliable.
            </p>
          </div>

          <dl className="m-0 grid grid-cols-2 gap-px border-y border-rule bg-rule lg:grid-cols-4">
            {figures.map((figure) => (
              <div
                key={figure.label}
                className="flex flex-col gap-1.5 bg-paper px-4 py-5 first:pl-0 lg:[&:nth-child(3)]:pl-4 max-lg:[&:nth-child(3)]:pl-0"
              >
                <dt className="order-2 font-display text-sm leading-snug text-muted">
                  {figure.label}
                </dt>
                <dd className="wdth-125 order-1 m-0 font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-[880] tracking-[-0.03em] text-ink">
                  <CountUp value={figure.value} />
                </dd>
              </div>
            ))}
          </dl>

          <p className="m-0 text-[0.9375rem] text-muted">
            Views here are my own and don&rsquo;t represent any employer or
            client.
          </p>
        </div>
      </div>
    </section>
  );
}
