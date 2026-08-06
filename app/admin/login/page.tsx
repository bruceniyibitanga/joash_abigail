import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";
import { COUPLE } from "@/lib/wedding";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  const params = await searchParams;

  return (
    <main className="flex min-h-svh flex-1 items-center justify-center bg-ember-700 px-6 py-16 text-cream">
      <div className="w-full max-w-md">
        <p className="micro text-ember-200">{COUPLE.displayName}</p>
        <h1 className="font-display mt-4 text-[clamp(2.2rem,7vw,3rem)] leading-tight font-light">
          Guest list
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-cream/70">
          Private. For the bride and groom only.
        </p>

        <LoginForm forbidden={params.error === "forbidden"} />
      </div>
    </main>
  );
}
