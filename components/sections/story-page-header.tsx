import Link from "next/link";

import { COUPLE, WEDDING_DATE } from "@/lib/wedding";

/**
 * A slimmer stand-in for `Hero` on secondary pages — same ember panel and
 * type rhythm, without the full-bleed photograph or RSVP badge.
 */
export function StoryPageHeader() {
  return (
    <header className="bg-ember-600 px-6 pt-7 pb-14 text-cream lg:px-12 lg:pt-9 lg:pb-20">
      <div className="mx-auto w-full max-w-360">
        <nav aria-label="Primary">
          <Link
            href="/"
            className="micro group inline-flex items-center gap-2.5 text-cream/90 transition-opacity duration-300 hover:opacity-60"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to the wedding
          </Link>
        </nav>

        <p className="micro mt-14 mb-6 text-cream/80 lg:mt-20">
          <time dateTime={WEDDING_DATE.iso}>{WEDDING_DATE.short}</time>
          <span className="mx-3" aria-hidden="true">
            ·
          </span>
          {WEDDING_DATE.city}
        </p>

        <h1 className="font-display text-[clamp(2.6rem,9vw,5rem)] leading-[0.98] font-light tracking-[-0.02em]">
          {COUPLE.groom} <em className="italic">&amp;</em> {COUPLE.bride}
        </h1>
      </div>
    </header>
  );
}
