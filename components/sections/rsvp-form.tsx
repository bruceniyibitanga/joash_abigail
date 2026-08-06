"use client";

import { useId, useState, useTransition } from "react";

import { submitRsvp } from "@/lib/rsvp/actions";
import {
  EMPTY_RSVP,
  MAX_GUESTS,
  hasErrors,
  validateRsvp,
  type Attendance,
  type RsvpErrors,
  type RsvpInput,
} from "@/lib/rsvp/schema";
import { RSVP_CONTENT } from "@/lib/wedding";

const FIELD_CLASS =
  "w-full border-b border-cream/35 bg-transparent px-0.5 py-3.5 text-base text-cream outline-none transition-colors duration-300 placeholder:text-cream/40 focus:border-cream";

export function RsvpForm() {
  const formId = useId();
  const [values, setValues] = useState<RsvpInput>(EMPTY_RSVP);
  const [errors, setErrors] = useState<RsvpErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = <K extends keyof RsvpInput>(key: K, value: RsvpInput[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    // Clear a field's error as soon as the guest starts correcting it.
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const setAttendance = (attendance: Attendance) => update("attendance", attendance);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validateRsvp(values);
    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      return;
    }

    startTransition(async () => {
      const result = await submitRsvp(values);

      if (result.ok) {
        setIsDone(true);
        return;
      }

      if ("errors" in result) {
        setErrors(result.errors);
        return;
      }

      setSubmitError(result.message);
    });
  };

  if (isDone) {
    return (
      <div className="py-14 text-center" role="status">
        <h3 className="font-display text-[2.2rem] leading-tight font-light">
          {RSVP_CONTENT.successTitle}
        </h3>
        <p className="mx-auto mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-cream/75">
          {RSVP_CONTENT.successBody}
        </p>
      </div>
    );
  }

  const isAttending = values.attendance === "accepts";

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-14 text-left">
      <Field
        id={`${formId}-name`}
        label="Full name"
        error={errors.fullName}
      >
        <input
          id={`${formId}-name`}
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={values.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          className={FIELD_CLASS}
        />
      </Field>

      <Field id={`${formId}-email`} label="Email" error={errors.email}>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          className={FIELD_CLASS}
        />
      </Field>

      <Field
        id={`${formId}-phone`}
        label="Phone number (optional)"
        error={errors.phone}
      >
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+254 700 000 000"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          className={FIELD_CLASS}
        />
      </Field>

      <fieldset className="mb-10">
        <legend className="micro mb-3 text-ember-200">
          Will you be joining us?
        </legend>
        <div className="flex flex-col gap-4 sm:flex-row">
          <AttendanceButton
            isSelected={values.attendance === "accepts"}
            onSelect={() => setAttendance("accepts")}
          >
            Joyfully accepts
          </AttendanceButton>
          <AttendanceButton
            isSelected={values.attendance === "declines"}
            onSelect={() => setAttendance("declines")}
          >
            Regretfully declines
          </AttendanceButton>
        </div>
        {errors.attendance ? (
          <p className="mt-3 text-sm text-ember-100">{errors.attendance}</p>
        ) : null}
      </fieldset>

      {/* Guest count only matters if they are coming. */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          isAttending
            ? "mb-10 grid-rows-[1fr] opacity-100"
            : "mb-0 grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!isAttending}
      >
        <div className="overflow-hidden">
          <Field
            id={`${formId}-guests`}
            label="Number of guests, including you"
            error={errors.guestCount}
          >
            <input
              id={`${formId}-guests`}
              name="guestCount"
              type="number"
              min={1}
              max={MAX_GUESTS}
              inputMode="numeric"
              value={values.guestCount}
              disabled={!isAttending}
              onChange={(event) =>
                update("guestCount", Number(event.target.value))
              }
              aria-invalid={Boolean(errors.guestCount)}
              className={FIELD_CLASS}
            />
          </Field>
        </div>
      </div>

      <Field
        id={`${formId}-dietary`}
        label="Dietary requirements"
        error={errors.dietary}
      >
        <input
          id={`${formId}-dietary`}
          name="dietary"
          type="text"
          placeholder="Vegetarian, allergies, anything we should know"
          value={values.dietary}
          onChange={(event) => update("dietary", event.target.value)}
          className={FIELD_CLASS}
        />
      </Field>

      <Field
        id={`${formId}-hymn`}
        label="A hymn or worship song you would love to hear"
        error={errors.hymn}
      >
        <input
          id={`${formId}-hymn`}
          name="hymn"
          type="text"
          placeholder="Title, and the artist if you know it"
          value={values.hymn}
          onChange={(event) => update("hymn", event.target.value)}
          className={FIELD_CLASS}
        />
      </Field>

      <Field
        id={`${formId}-message`}
        label="A note or a prayer for us"
        error={errors.message}
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          placeholder="We would love to read it"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          className={`${FIELD_CLASS} resize-none`}
        />
      </Field>

      {submitError ? (
        <p role="alert" className="mb-6 text-sm text-ember-100">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="micro w-full cursor-pointer rounded-full border border-cream bg-cream px-6 py-5 text-ink transition-colors duration-300 hover:bg-transparent hover:text-cream disabled:cursor-wait disabled:opacity-70"
      >
        {isPending ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <label htmlFor={id} className="micro mb-2.5 block text-ember-200">
        {label}
      </label>
      {children}
      {error ? <p className="mt-2.5 text-sm text-ember-100">{error}</p> : null}
    </div>
  );
}

function AttendanceButton({
  isSelected,
  onSelect,
  children,
}: {
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`font-display flex-1 cursor-pointer rounded-full border px-5 py-4.5 text-center text-[1.05rem] transition-colors duration-300 ${
        isSelected
          ? "border-cream bg-cream text-ink"
          : "border-cream/35 text-cream hover:border-cream"
      }`}
    >
      {children}
    </button>
  );
}
