import Link from "next/link";
import DepartureBoard from "@/components/DepartureBoard";
import SignupForm from "@/components/SignupForm";

const kitConsent = (
  <>
    You&rsquo;ll also get new issues of Sync &amp; Send. Unsubscribe anytime.{" "}
    <Link href="#privacy">Privacy</Link>
  </>
);

export default function HomePage() {
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
      </div>
    </main>
  );
}
