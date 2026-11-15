import StopMarker from "@/components/route/StopMarker";
import StageDemo from "./StageDemo";

const RULES = [
  {
    title: "Official vendor docs only",
    body: "Every link goes to the vendor's own documentation, with the date it was last checked.",
  },
  {
    title: "Evidence, not proof",
    body: "A change made before a failure is something to investigate, not the confirmed cause.",
  },
  {
    title: "Exact UI paths",
    body: "Each step names the full path to the screen, so you never have to guess where a setting lives.",
  },
  {
    title: "Every stage ends in a passing result",
    body: "You know when a stage is done and when to move on.",
  },
  {
    title: "Independent",
    body: "Not affiliated with or endorsed by Salesforce or Braze.",
  },
];

/** Section 7: the editorial rules, beside a live stage from a real guide. */
export default function WritingRules({ docsChecked }: { docsChecked: string }) {
  return (
    <section
      className="wrap py-section-sm md:py-section"
      id="how-guides-are-written"
      aria-labelledby="rules-title"
    >
      <div className="mb-[clamp(2rem,5vw,3rem)] flex max-w-[44rem] flex-col gap-4">
        <StopMarker label="How guides are written" />
        <h2
          id="rules-title"
          className="wdth-125 m-0 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.03em]"
        >
          Five rules every guide follows
        </h2>
      </div>
      <div className="grid grid-cols-1 items-start gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ol className="m-0 flex list-none flex-col p-0">
          {RULES.map((rule, index) => (
            <li
              key={rule.title}
              className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 border-t border-rule py-5 last:border-b"
            >
              <span className="label pt-1 text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="wdth-112 m-0 text-[1.25rem] leading-tight font-extrabold tracking-[-0.01em]">
                  {rule.title}
                </h3>
                <p className="m-0 text-[1.0625rem] leading-relaxed text-muted">
                  {rule.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="lg:sticky lg:top-28">
          <StageDemo docsChecked={docsChecked} />
        </div>
      </div>
    </section>
  );
}
