"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signIn, type SignInResult } from "@/lib/auth/actions";

const FIELD_CLASS =
  "w-full border-b border-cream/35 bg-transparent px-0.5 py-3.5 text-base text-cream outline-none transition-colors duration-300 placeholder:text-cream/40 focus:border-cream";

export function LoginForm({ forbidden }: { forbidden?: boolean }) {
  const [state, formAction] = useActionState<SignInResult | null, FormData>(
    signIn,
    forbidden ? { ok: false, message: "That account does not have access." } : null,
  );

  return (
    <form action={formAction} className="mt-12 text-left">
      <div className="mb-8">
        <label htmlFor="email" className="micro mb-2.5 block text-ember-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={FIELD_CLASS}
        />
      </div>

      <div className="mb-10">
        <label htmlFor="password" className="micro mb-2.5 block text-ember-200">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className={FIELD_CLASS}
        />
      </div>

      {state && !state.ok ? (
        <p role="alert" className="mb-6 text-sm text-ember-100">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="micro w-full cursor-pointer rounded-full border border-cream bg-cream px-6 py-5 text-ink transition-colors duration-300 hover:bg-transparent hover:text-cream disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}
