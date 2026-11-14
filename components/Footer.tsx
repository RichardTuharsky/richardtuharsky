import PrivacyDetails from "./PrivacyDetails";

/** Site footer: copyright, trademark notice and the privacy disclosure. */
export default function Footer() {
  return (
    <div className="bg-night text-on-night">
      <footer className="wrap flex flex-col gap-4 border-t border-board-rule pt-7 pb-11 font-display text-sm text-on-night-muted">
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-2">
          <span>&copy; 2026 Richard Tuharsky</span>
          <span className="max-w-[40rem]">
            Salesforce, Marketing Cloud, Sales Cloud, Service Cloud and Data 360
            are trademarks of Salesforce, Inc. Braze is a trademark of Braze,
            Inc. This site is independent and not affiliated with or endorsed by
            Salesforce or Braze.
          </span>
        </div>
        <PrivacyDetails />
      </footer>
    </div>
  );
}
