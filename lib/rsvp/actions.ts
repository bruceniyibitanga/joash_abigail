"use server";

import { createAdminClient } from "@/lib/supabase/admin";

import { hasErrors, validateRsvp, type RsvpErrors, type RsvpInput } from "./schema";

export type RsvpResult =
  | { ok: true }
  | { ok: false; errors: RsvpErrors }
  | { ok: false; message: string };

/** Trims, and collapses empty optional fields to null rather than "". */
function optional(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Records an RSVP, keyed on the guest's email so resubmitting updates their
 * previous answer instead of creating a duplicate — which is what the form's
 * confirmation message promises.
 *
 * Runs through the service-role client because guests are not signed in and
 * `wedding_rsvps` deliberately exposes no anon policies. See lib/supabase/admin.ts.
 */
export async function submitRsvp(input: RsvpInput): Promise<RsvpResult> {
  // Never trust the client's own validation pass.
  const errors = validateRsvp(input);
  if (hasErrors(errors)) {
    return { ok: false, errors };
  }

  const isAttending = input.attendance === "accepts";

  try {
    const supabase = createAdminClient();

    const { error } = await supabase.from("wedding_rsvps").upsert(
      {
        full_name: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        phone: optional(input.phone),
        // Validation above guarantees attendance is set by this point.
        attendance: isAttending ? "accepts" : "declines",
        // Declines contribute nothing to the headcount.
        guest_count: isAttending ? input.guestCount : 0,
        dietary: optional(input.dietary),
        hymn: optional(input.hymn),
        message: optional(input.message),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" },
    );

    if (error) {
      console.error("RSVP upsert failed", error);
      return {
        ok: false,
        message: "We could not save that just now. Please try again.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("RSVP submission error", error);
    return {
      ok: false,
      message: "We could not save that just now. Please try again.",
    };
  }
}
