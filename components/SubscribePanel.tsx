import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import StopMarker from "@/components/route/StopMarker";

/**
 * Subscribe band: one hairline-divided panel on night, heading and copy on
 * one side, the Kit form on the other. Used on the homepage and after guides.
 */
export default function SubscribePanel({
  title,
  body,
  consent,
}: {
  title: string;
  body: string;
  consent: string;
}) {
  return (
    <div className="bg-night text-on-night">
      <section
        className="wrap py-section-sm md:py-section"
        id="subscribe"
        aria-labelledby="subscribe-title"
      >
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-board-rule md:grid-cols-2">
          <div className="flex flex-col gap-4 p-[clamp(1.5rem,4vw,3rem)]">
            <StopMarker label="Subscribe" tone="night" />
            <h2
              id="subscribe-title"
              className="wdth-125 m-0 text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-[880] tracking-[-0.03em]"
            >
              {title}
            </h2>
            <p className="m-0 max-w-[30rem] text-on-night-soft">{body}</p>
          </div>
          <div className="flex flex-col justify-center border-t border-board-rule p-[clamp(1.5rem,4vw,3rem)] md:border-t-0 md:border-l">
            <SignupForm
              label="Email address"
              buttonLabel="Subscribe"
              surface="night"
              consent={
                <>
                  {consent} <Link href="#privacy">Privacy</Link>
                </>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
