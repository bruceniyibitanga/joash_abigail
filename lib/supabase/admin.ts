import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

/**
 * Service-role Supabase client. **Bypasses RLS — never import from a Client
 * Component**, and never pass its results to the browser unfiltered.
 *
 * Exists for exactly one job: the public RSVP upsert. Guests are not signed in,
 * and `wedding_rsvps` intentionally has no anon policies (granting anon both
 * INSERT and UPDATE would let anyone overwrite another guest's RSVP by guessing
 * their email). Doing that one write server-side keeps the table fully private.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY. Copy .env.example to .env.local and fill it in.",
    );
  }

  return createClient<Database>(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
