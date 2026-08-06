import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type RsvpRow = Tables<"wedding_rsvps">;

export type RsvpStats = {
  /** Number of responses received, attending or not. */
  responses: number;
  /** Total heads expected — sums party sizes, not response count. */
  attendingHeadcount: number;
  attendingParties: number;
  decliningParties: number;
  withDietaryNeeds: number;
};

/**
 * Every RSVP, newest first.
 *
 * Reads through the session client, so RLS enforces the `wedding_admins` check
 * a second time at the database — the DAL guard is not the only thing standing
 * between a guest and the list.
 */
export async function listRsvps(): Promise<RsvpRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wedding_rsvps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load RSVPs", error);
    return [];
  }

  return data ?? [];
}

/** Derived in JS: the guest list is small enough that a second query is waste. */
export function summariseRsvps(rows: RsvpRow[]): RsvpStats {
  const attending = rows.filter((row) => row.attendance === "accepts");

  return {
    responses: rows.length,
    attendingHeadcount: attending.reduce((sum, row) => sum + row.guest_count, 0),
    attendingParties: attending.length,
    decliningParties: rows.length - attending.length,
    withDietaryNeeds: rows.filter((row) => Boolean(row.dietary?.trim())).length,
  };
}
