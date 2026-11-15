import PrivacyDetails from "./PrivacyDetails";

/**
 * Site footer: the "Sync & Send" wordmark spanning the column, then
 * copyright, trademark notice and the privacy disclosure.
 */
export default function Footer() {
  return (
    <div className="bg-night text-on-night">
      <footer className="wrap flex flex-col gap-8 pt-[clamp(2.5rem,6vw,4.5rem)] pb-11">
        <div className="[container-type:inline-size]" aria-hidden="true">
          <p className="wdth-125 m-0 font-display text-[13.7cqi] leading-[0.85] font-[880] tracking-[-0.045em] whitespace-nowrap text-white">
            Sync{" "}
            <span className="font-body font-medium tracking-[-0.02em] text-signal italic">
              &amp;
            </span>{" "}
            Send
          </p>
        </div>
        <div className="flex flex-col gap-4 border-t border-board-rule pt-7 font-display text-sm text-on-night-muted">
          <div className="flex flex-wrap justify-between gap-x-8 gap-y-2">
            <span>&copy; 2026 Richard Tuharsky</span>
            <span className="max-w-[40rem]">
              Salesforce, Marketing Cloud, Sales Cloud, Service Cloud and Data
              360 are trademarks of Salesforce, Inc. Braze is a trademark of
              Braze, Inc. This site is independent and not affiliated with or
              endorsed by Salesforce or Braze.
            </span>
          </div>
          <PrivacyDetails />
        </div>
      </footer>
    </div>
  );
}
