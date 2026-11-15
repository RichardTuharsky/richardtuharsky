"use client";

import { Goal, Pass, Path, Resources, Stage, Steps } from "@/components/guide/mdx";
import MotionToggle from "@/components/route/MotionToggle";
import { useLoop } from "@/components/route/useLoop";

// 0 goal · 1–3 steps fill in · 4 passing result
const DURATIONS = [1100, 1400, 1400, 1400, 3200];

const STEP_ITEMS = [
  <>
    In the source CRM org, open <Path>Setup → Object Manager</Path>. Find the
    object and field API names from the error log and confirm they still exist.
  </>,
  <>
    Open{" "}
    <Path>
      Setup → Permission Sets → Data Cloud Salesforce Connector → Object
      Settings
    </Path>
    . Have the CRM administrator check the required object and field access.
  </>,
  <>
    Review <Path>Setup → View Setup Audit Trail</Path> around the first
    failure.
  </>,
];

/**
 * A real guide stage (Stage 03 of the Data 360 guide) that fills in its
 * steps and ends on its passing result. Every element is laid out from the
 * start, so the reveal never shifts the page.
 */
export default function StageDemo({ docsChecked }: { docsChecked: string }) {
  const { ref, step, paused, reduced, togglePaused } =
    useLoop<HTMLDivElement>(DURATIONS);

  const reveal = (visibleFrom: number) =>
    `transition-[opacity,transform] duration-500 ${
      step >= visibleFrom ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
    }`;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_30px_60px_-40px_rgba(20,33,61,0.5)]"
    >
      <div className="flex items-center gap-3 border-b border-rule bg-paper py-1.5 pr-1.5 pl-4">
        <span className="label min-w-0 flex-1 truncate text-muted">
          Live example · from the Data 360 guide
        </span>
        <MotionToggle
          paused={paused}
          reduced={reduced}
          onToggle={togglePaused}
          tone="paper"
        />
      </div>
      <div className="p-[clamp(1.125rem,3vw,2rem)]">
        <Stage
          id="demo-stage"
          num="Stage 03"
          title="Check source objects, fields and connector permissions"
          level={3}
        >
          <Goal>
            <strong>Goal:</strong> prove the connector has access to the schema
            required by the stream.
          </Goal>
          <Steps>
            {STEP_ITEMS.map((item, index) => (
              <li key={index} className={reveal(index + 1)}>
                {item}
              </li>
            ))}
          </Steps>
          <div className={reveal(4)}>
            <Pass>
              <strong>Passing result:</strong> the required schema exists and
              the connector has the documented access to it.
            </Pass>
          </div>
          <Resources>
            <a href="https://help.salesforce.com/s/articleView?id=000395797&language=en_US&type=1">
              CRM refresh errors caused by missing fields or objects
            </a>
            <a href="https://help.salesforce.com/s/articleView?id=sf.c360_a_enable_user_permissions_external_salesforce_org.htm&language=en_US&type=5">
              Salesforce CRM permissions
            </a>
            <span className="label w-full pt-1 text-muted">
              Documentation checked {docsChecked}
            </span>
          </Resources>
        </Stage>
      </div>
    </div>
  );
}
