import { ANCHOR_SCRIPTURE, COUPLE, WEDDING_DATE } from "@/lib/wedding";

export function SiteFooter() {
  return (
    <footer className="bg-ink px-6 py-11 text-cream lg:px-12">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-display text-2xl font-light">
            {COUPLE.displayName}
          </p>
          <p className="micro mt-2.5 text-cream/60">
            <time dateTime={WEDDING_DATE.iso}>{WEDDING_DATE.long}</time>
            <span className="mx-2.5" aria-hidden="true">
              ·
            </span>
            {WEDDING_DATE.city}
          </p>
        </div>

        <p className="max-w-[42ch] text-sm leading-relaxed text-cream/55">
          <span className="italic">“{ANCHOR_SCRIPTURE.text}”</span>{" "}
          <span className="micro mt-2 block text-cream/40">
            {ANCHOR_SCRIPTURE.reference}
          </span>
        </p>
      </div>
    </footer>
  );
}
