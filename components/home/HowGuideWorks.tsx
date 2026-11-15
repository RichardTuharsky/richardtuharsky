import { Goal, Pass, Path, StartTable, Stage, Steps } from "@/components/guide/mdx";
import StopMarker from "@/components/route/StopMarker";
import GuideWalkthrough from "./GuideWalkthrough";

const GUIDE = "/guides/data-360-crm-data-stream-troubleshooting";

const STEPS = [
  {
    title: "Find your starting point",
    body: "Each guide opens with a table that matches what you see to the stage where you should start.",
    caption: "From the guide · Find your starting point",
  },
  {
    title: "Work through the stages",
    body: "Every stage has one goal, numbered steps and the exact path to each screen.",
    caption: "From the guide · Stage 01",
  },
  {
    title: "Confirm a passing result",
    body: "A stage is done when you can show its passing result. Then you move on.",
    caption: "From the guide · Stage 01, passing result",
  },
];

/** Section 4: how a guide works, shown with the real guide components. */
export default function HowGuideWorks() {
  const panels = [
    <StartTable key="start">
      <tr>
        <td>A stream failed and you don&rsquo;t know why</td>
        <td>
          <a href={`${GUIDE}#stage-1`}>Stage 1: capture the error</a>
        </td>
      </tr>
      <tr>
        <td>Authentication or trust errors, particularly after a sandbox refresh</td>
        <td>
          <a href={`${GUIDE}#stage-2`}>Stage 2: verify the connection</a>
        </td>
      </tr>
      <tr>
        <td>Ingestion succeeds, but the required modeled data is missing</td>
        <td>
          <a href={`${GUIDE}#stage-6`}>Stage 6: inspect the DLO and DMO</a>
        </td>
      </tr>
    </StartTable>,
    <Stage key="stage" id="walkthrough-stage" num="Stage 01" title="Capture the actual failure" level={3}>
      <Goal>
        <strong>Goal:</strong> identify the failing stream and operation before
        changing configuration.
      </Goal>
      <Steps>
        <li>
          In Data 360, open <Path>Data Streams</Path> and select the affected
          stream.
        </li>
        <li>
          Open <Path>Refresh History</Path>. Record the failed operation&rsquo;s
          timestamp, status, refresh mode and record statistics.
        </li>
        <li>
          Record what changed before the failure. Treat this as evidence to
          investigate, rather than proof of the cause.
        </li>
      </Steps>
    </Stage>,
    <div key="pass" className="flex flex-col gap-4">
      <Pass>
        <strong>Passing result:</strong> you can name the failed operation and
        its exact error, or establish that no operation has started.
      </Pass>
      <p className="m-0 font-display text-[0.9375rem] text-muted">
        Next: <a href={`${GUIDE}#stage-2`} className="font-semibold text-ink">Stage 02 · Verify the correct CRM connection</a>
      </p>
    </div>,
  ];

  return (
    <section
      className="wrap py-section-sm md:py-section"
      id="how-it-works"
      aria-labelledby="how-title"
    >
      <div className="mb-[clamp(2rem,5vw,3rem)] flex max-w-[44rem] flex-col gap-4">
        <StopMarker label="How a guide works" />
        <h2
          id="how-title"
          className="wdth-125 m-0 text-[clamp(1.875rem,4vw,2.75rem)] leading-none font-[850] tracking-[-0.03em]"
        >
          Start where you are. Stop when it passes.
        </h2>
      </div>
      <GuideWalkthrough steps={STEPS} panels={panels} />
    </section>
  );
}
