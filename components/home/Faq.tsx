import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import StopMarker from "@/components/route/StopMarker";
import { PLATFORMS } from "@/lib/platforms";

/*
 * Only questions answerable from CLAUDE.md. Bracketed values are placeholders
 * Richard still has to fill in; they render as-is so they can't be missed.
 */
const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: "Who is it for?",
    a: "The people who keep marketing and CRM systems running: marketing operations, CRM administrators, Marketing Cloud and Data 360 practitioners, and consultants.",
  },
  {
    q: "Which platforms does it cover?",
    a: `${PLATFORMS.slice(0, -1)
      .map((p) => p.name)
      .join(", ")}, and ${PLATFORMS[PLATFORMS.length - 1].name}.`,
  },
  {
    q: "Is it affiliated with Salesforce or Braze?",
    a: "No. Sync & Send is independent and not affiliated with or endorsed by Salesforce or Braze. Views here are Richard's own and don't represent any employer or client.",
  },
  {
    q: "How is my email handled?",
    a: "When you sign up, your email address is stored to send you new issues of Sync & Send. Emails are sent through Kit, which stores your address on Richard's behalf. You can unsubscribe from any email with one click, or ask for your data to be deleted by writing to [YOUR CONTACT EMAIL].",
  },
  {
    q: "How often do issues go out?",
    a: "[HOW OFTEN ISSUES GO OUT]",
  },
  {
    q: "Is it free?",
    a: "[IS IT FREE]",
  },
];

/** Section 9: questions, as native disclosure widgets. */
export default function Faq() {
  return (
    <section
      className="wrap py-section-sm md:py-section"
      id="questions"
      aria-labelledby="questions-title"
    >
      <div className="grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="flex flex-col gap-4">
          <StopMarker label="Questions" />
          <h2
            id="questions-title"
            className="wdth-125 m-0 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.03em]"
          >
            Questions
          </h2>
        </div>
        <div className="border-t border-rule">
          {QUESTIONS.map(({ q, a }) => (
            <details key={q} className="group border-b border-rule">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[1.1875rem] font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  size={20}
                  strokeWidth={2.4}
                  aria-hidden="true"
                  className="flex-none text-muted transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="m-0 max-w-[44rem] pb-5 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
