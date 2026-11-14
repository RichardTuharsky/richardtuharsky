"use client";

import { useId, useState } from "react";

const KIT_FORM_ACTION = process.env.NEXT_PUBLIC_KIT_FORM_ACTION ?? "";

interface SignupFormProps {
  /** Visible label above the email field. */
  label: string;
  buttonLabel: string;
  /**
   * Surface the form sits on. Controls button and status colours:
   * "night" renders an amber button on navy, "ticket" a navy button on amber.
   */
  surface: "night" | "ticket";
  consent: React.ReactNode;
}

/**
 * Kit signup form. Shared by the hero, the checklist ticket stub and the
 * closing band. Posts to NEXT_PUBLIC_KIT_FORM_ACTION; without it, submits
 * are intercepted with a "not connected yet" status so nothing is lost
 * silently in development.
 */
export default function SignupForm({
  label,
  buttonLabel,
  surface,
  consent,
}: SignupFormProps) {
  const inputId = useId();
  const [status, setStatus] = useState<{
    tone: "" | "error" | "info";
    message: string;
  }>({ tone: "", message: "" });
  const [invalid, setInvalid] = useState(false);

  const onNight = surface === "night";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const input = form.elements.namedItem("email_address") as HTMLInputElement;
    const value = input.value.trim();

    if (!value || !input.checkValidity()) {
      event.preventDefault();
      setInvalid(true);
      setStatus({
        tone: "error",
        message: "Enter an email address, like name@company.com.",
      });
      input.focus();
      return;
    }

    setInvalid(false);
    if (!KIT_FORM_ACTION) {
      event.preventDefault();
      setStatus({
        tone: "info",
        message:
          "Sign-up isn't connected yet. Set NEXT_PUBLIC_KIT_FORM_ACTION to go live.",
      });
    }
  }

  return (
    <form
      className="flex max-w-[32.5rem] flex-col gap-2.5"
      action={KIT_FORM_ACTION || undefined}
      method={KIT_FORM_ACTION ? "post" : undefined}
      noValidate
      onSubmit={handleSubmit}
    >
      <label
        htmlFor={inputId}
        className={`font-display text-sm font-semibold ${onNight ? "text-[#e8ecf4]" : "text-ink"}`}
      >
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={inputId}
          type="email"
          name="email_address"
          autoComplete="email"
          placeholder="name@company.com"
          required
          aria-invalid={invalid || undefined}
          onChange={() => {
            if (invalid) {
              setInvalid(false);
              setStatus({ tone: "", message: "" });
            }
          }}
          className={`min-h-[50px] min-w-0 flex-[1_1_14rem] rounded-[10px] border-2 bg-white px-4 py-3 font-display text-base text-ink placeholder:text-[#6b7588] ${
            invalid ? "border-line-1" : "border-transparent"
          }`}
        />
        <button
          type="submit"
          className={`min-h-[50px] flex-none cursor-pointer rounded-[10px] border-0 px-5.5 py-3 font-display text-base font-bold hover:brightness-105 ${
            onNight ? "bg-signal text-night" : "bg-night text-white"
          }`}
        >
          {buttonLabel}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-[1.3em] font-display text-sm font-semibold ${
          onNight
            ? status.tone === "error"
              ? "text-[#ff8a9a]"
              : "text-signal"
            : "text-ink"
        }`}
      >
        {status.message}
      </p>
      <p
        className={`font-display text-[0.8125rem] leading-normal ${
          onNight ? "text-on-night-muted [&_a]:text-on-night-muted" : "text-ink"
        }`}
      >
        {consent}
      </p>
    </form>
  );
}
