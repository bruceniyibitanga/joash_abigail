import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export type WeddingAdmin = {
  id: string;
  email: string;
  fullName: string;
};

/**
 * The authorization boundary for everything under /admin.
 *
 * Deliberately uses `getUser()`, which revalidates the token with Supabase,
 * rather than `getSession()`, which trusts a cookie the browser could forge.
 * Memoised with `cache()` so the layout and page share one round trip.
 *
 * Being signed in is not sufficient — the user must also hold an active
 * `wedding_admins` row. That keeps wedding access separate from the reggie
 * app's `admin_users`, whose members can read and delete live camp bookings.
 */
export const requireWeddingAdmin = cache(async (): Promise<WeddingAdmin> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("wedding_admins")
    .select("id, email, full_name")
    .eq("id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!admin) {
    // Authenticated but not a wedding admin — send them back to sign in as
    // someone who is, rather than leaking that the account exists.
    redirect("/admin/login?error=forbidden");
  }

  return { id: admin.id, email: admin.email, fullName: admin.full_name };
});
