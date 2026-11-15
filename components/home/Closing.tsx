import StopMarker from "@/components/route/StopMarker";

/** Section 10: a closing line in the site's voice, above the footer wordmark. */
export default function Closing() {
  return (
    <div className="bg-night text-on-night">
      <section
        className="wrap flex flex-col gap-6 pt-section-sm md:pt-section"
        aria-labelledby="closing-title"
      >
        <StopMarker label="End of the line" tone="night" />
        <h2
          id="closing-title"
          className="wdth-125 m-0 max-w-[16ch] text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[0.95] font-[880] tracking-[-0.04em]"
        >
          Check the data before you send.
        </h2>
      </section>
    </div>
  );
}
