import Link from "next/link";
import SignupForm from "./SignupForm";

const SAMPLE_CHECKS = [
  {
    term: "Scheduling.",
    text: "Every automation that reads synced data starts after the sync completes, not at a guessed time.",
  },
  {
    term: "Freshness.",
    text: "You can see when each key audience was last refreshed.",
  },
  {
    term: "Alerts.",
    text: "A failed step alerts a named person, not a shared inbox.",
  },
  {
    term: "Pre-send.",
    text: "A send stops or warns when its audience is empty or much smaller than usual.",
  },
  {
    term: "Recovery.",
    text: "There's a written way to rerun a failed night without sending twice.",
  },
  {
    term: "Ownership.",
    text: "Every automation has a named owner and a one-line description of what it's for.",
  },
];

/**
 * The lead magnet: an amber "Admit one" ticket with six sample checks,
 * a perforation, and the email form on the stub.
 */
export default function ChecklistTicket() {
  return (
    <section
      className="wrap border-t border-rule py-section-sm md:py-section"
      id="checklist"
      aria-labelledby="checklist-title"
    >
      <div className="flex flex-wrap items-center gap-x-16 gap-y-10">
        <div className="flex min-w-0 flex-[1_1_20rem] flex-col gap-3.5">
          <h2
            id="checklist-title"
            className="wdth-125 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.025em]"
          >
            Check your automations before your customers do
          </h2>
          <p className="text-muted">
            The Automation Reliability Checklist covers the places marketing
            automation usually breaks: scheduling, data freshness, alerts,
            pre-send checks, recovery and ownership. It&rsquo;s free when you
            subscribe.
          </p>
        </div>
        <div className="relative min-w-0 flex-[1.5_1_28.75rem] rounded-[18px] bg-signal text-ink shadow-[0_24px_48px_-28px_rgba(20,33,61,0.55)]">
          <div className="px-[clamp(1.25rem,3vw,2rem)] pt-6 pb-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-display text-sm">
              <strong className="font-bold">Admit one</strong>
              <span className="font-semibold">
                Valid on any marketing automation setup
              </span>
            </div>
            <p className="wdth-125 mt-2.5 mb-1 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.04] font-[880] tracking-[-0.02em]">
              Automation Reliability Checklist
            </p>
            <p className="mb-3 font-display text-sm font-semibold">
              Six sample checks. Tick the ones you already pass.
            </p>
            {SAMPLE_CHECKS.map(({ term, text }) => (
              <label
                key={term}
                className="flex cursor-pointer items-start gap-3 border-t-[1.5px] border-[rgba(20,33,61,0.28)] py-2.5 text-base leading-[1.45]"
              >
                <input
                  type="checkbox"
                  className="mt-1 size-[18px] flex-none cursor-pointer accent-ink"
                />
                <span>
                  <strong className="font-display">{term}</strong> {text}
                </span>
              </label>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="relative mt-5 h-0 border-t-[3px] border-dashed border-[rgba(20,33,61,0.5)] before:absolute before:-top-[18px] before:-left-4 before:size-8 before:rounded-full before:bg-paper after:absolute after:-top-[18px] after:-right-4 after:size-8 after:rounded-full after:bg-paper"
          />
          <div className="px-[clamp(1.25rem,3vw,2rem)] pt-6 pb-6">
            <SignupForm
              label="Email address"
              buttonLabel="Get the checklist"
              surface="ticket"
              consent={
                <>
                  You&rsquo;ll also get new issues of Sync &amp; Send.
                  Unsubscribe anytime. <Link href="#privacy">Privacy</Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
