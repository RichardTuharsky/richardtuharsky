"use client";

import { useEffect, useRef } from "react";

/**
 * The privacy disclosure in the footer. Opens itself when any link on the
 * page points at #privacy (the consent lines under each signup form).
 */
export default function PrivacyDetails() {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const open = () => {
      if (window.location.hash === "#privacy" && ref.current) {
        ref.current.open = true;
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return (
    <details id="privacy" ref={ref} className="max-w-[44rem]">
      <summary className="w-max cursor-pointer font-semibold text-on-night marker:text-on-night-muted [[open]>&]:mb-2.5">
        Privacy
      </summary>
      <p className="mb-2.5 font-body text-[0.9375rem] leading-relaxed text-on-night-soft">
        When you sign up, I store your email address to send you new issues of
        Sync &amp; Send. Emails are sent through Kit, my email provider, which
        stores your address on my behalf.
      </p>
      <p className="font-body text-[0.9375rem] leading-relaxed text-on-night-soft">
        You can unsubscribe from any email with one click, or ask me to delete
        your data by writing to [YOUR CONTACT EMAIL].
      </p>
    </details>
  );
}
