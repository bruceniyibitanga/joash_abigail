"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type SignInResult = { ok: false; message: string };

/**
 * Signs an admin in.
 *
 * On success this redirects and never returns; it only returns a value when
 * sign-in failed, which is what the form renders.
 */
export async function signIn(
  _prevState: SignInResult | null,
  formData: FormData,
): Promise<SignInResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, message: "Please enter your email and password." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    // Deliberately vague: do not reveal whether the address has an account.
    return { ok: false, message: "That email or password was not correct." };
  }

  // Signed in, but is this account allowed into the wedding dashboard?
  const { data: admin } = await supabase
    .from("wedding_admins")
    .select("id")
    .eq("id", data.user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { ok: false, message: "That account does not have access." };
  }

  // Narrow SECURITY DEFINER function: touches only last_login_at, only for
  // the caller's own row. Best-effort — never block sign-in on it.
  await supabase.rpc("touch_wedding_admin_login");

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
