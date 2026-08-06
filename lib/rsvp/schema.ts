/**
 * RSVP shape and validation.
 *
 * Kept free of UI and of any database client so the same rules can run in the
 * form, in a server action, and eventually against the Supabase table.
 */

export type Attendance = "accepts" | "declines";

export type RsvpInput = {
  fullName: string;
  email: string;
  phone: string;
  attendance: Attendance | null;
  /** Total party size including the responder. Ignored when declining. */
  guestCount: number;
  dietary: string;
  hymn: string;
  message: string;
};

export type RsvpErrors = Partial<Record<keyof RsvpInput, string>>;

export const MAX_GUESTS = 8;

export const EMPTY_RSVP: RsvpInput = {
  fullName: "",
  email: "",
  phone: "",
  attendance: null,
  guestCount: 1,
  dietary: "",
  hymn: "",
  message: "",
};

// Deliberately permissive: a wedding RSVP should never reject a real address.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRsvp(input: RsvpInput): RsvpErrors {
  const errors: RsvpErrors = {};

  if (!input.fullName.trim()) {
    errors.fullName = "Please tell us your name.";
  }

  if (!input.email.trim()) {
    errors.email = "We need an email to confirm your response.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "That email address does not look quite right.";
  }

  if (!input.attendance) {
    errors.attendance = "Please let us know if you can join us.";
  }

  if (input.attendance === "accepts") {
    if (!Number.isInteger(input.guestCount) || input.guestCount < 1) {
      errors.guestCount = "Please enter at least one guest.";
    } else if (input.guestCount > MAX_GUESTS) {
      errors.guestCount = `Please contact us directly for parties over ${MAX_GUESTS}.`;
    }
  }

  return errors;
}

export function hasErrors(errors: RsvpErrors): boolean {
  return Object.keys(errors).length > 0;
}
