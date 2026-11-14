const ROWS: {
  time: string;
  step: string;
  state: string;
  tone: "late" | "ok" | "missed";
}[] = [
  { time: "02:00", step: "CRM data sync", state: "Delayed, arrived 02:41", tone: "late" },
  { time: "02:20", step: "Audience query", state: "Left before the sync arrived", tone: "late" },
  { time: "03:00", step: "Journey entry", state: "On time, with yesterday's audience", tone: "ok" },
  { time: "08:00", step: "Email send", state: "On time", tone: "ok" },
  { time: "09:00", step: "Sales follow-up", state: "Missed connection: new leads", tone: "missed" },
];

const TONE_CLASS: Record<string, string> = {
  late: "text-line-2",
  ok: "text-line-3",
  missed: "text-line-1",
};

/**
 * The "Overnight departures" board: one example night where every step
 * reported success and the campaign still left with yesterday's audience.
 * Status cells flip in like split-flap tiles on load (the site's single
 * animation); reduced-motion users see the settled board immediately.
 */
export default function DepartureBoard() {
  return (
    <div className="min-w-0 flex-[1_1_27.5rem] rounded-2xl border border-board-rule bg-board px-[clamp(1.1rem,2.4vw,1.6rem)] py-6 font-display shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 border-board-rule pb-3.5">
        <h2
          id="board-title"
          className="wdth-112 text-lg font-bold text-white"
        >
          Overnight departures
        </h2>
        <span className="text-[0.8125rem] text-on-night-muted">
          An example run
        </span>
      </div>
      <table className="w-full border-collapse" aria-labelledby="board-title">
        <thead>
          <tr>
            <th
              scope="col"
              className="w-[4.5rem] pt-3 pr-4 pb-1.5 text-left text-xs font-semibold text-on-night-muted"
            >
              Time
            </th>
            <th
              scope="col"
              className="pt-3 pb-1.5 text-left text-xs font-semibold text-on-night-muted"
            >
              Step and status
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, index) => (
            <tr
              key={row.time}
              className="border-t border-board-rule last:border-b"
            >
              <td className="py-3.5 pr-4 align-top text-[1.375rem] leading-tight font-extrabold text-signal tabular-nums">
                {row.time}
              </td>
              <td className="py-3.5 align-top [perspective:400px]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <span className="text-[1.0625rem] font-semibold text-white">
                    {row.step}
                  </span>
                  <span
                    className={`animate-board-flip text-sm font-semibold motion-reduce:animate-none ${TONE_CLASS[row.tone]}`}
                    style={{ animationDelay: `${300 + index * 140}ms` }}
                  >
                    {row.state}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 flex items-start gap-2.5 text-sm leading-normal text-on-night-soft">
        <span
          aria-hidden="true"
          className="mt-[0.32rem] size-2.5 flex-none rounded-full bg-line-1"
        />
        Every step reported success. Yesterday&rsquo;s sign-ups still missed the
        trip.
      </p>
    </div>
  );
}
