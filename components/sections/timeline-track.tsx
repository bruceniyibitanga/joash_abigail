"use client";

import { Reveal } from "@/components/ui/reveal";
import { useScrollProgress } from "@/lib/hooks/use-scroll-progress";
import type { SchedulePart } from "@/lib/wedding";

type TimelineTrackProps = {
  part: SchedulePart;
};

/**
 * One block of the day (ceremony, photographs, reception) as a vertical
 * timeline whose rule draws itself and lights each marker as you scroll past.
 *
 * The rule is positioned from the same column variables the rows use, so the
 * line and the dots stay aligned at every breakpoint without magic numbers.
 */
export function TimelineTrack({ part }: TimelineTrackProps) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // A little lead-in so a marker lights as it is reached, not after.
  const litCount = Math.floor(progress * part.events.length + 0.25);

  return (
    <div className="[--dot-col:2.75rem] [--time-col:3.75rem] lg:[--time-col:6rem]">
      <Reveal>
        <header className="mb-2 border-b border-cream/20 pb-5">
          <h3 className="font-display text-[1.75rem] leading-tight font-light">
            {part.label}
          </h3>
          <p className="micro mt-2.5 text-ember-200">
            {part.venue}
            <span className="mx-2.5" aria-hidden="true">
              ·
            </span>
            {part.window}
          </p>
        </header>
      </Reveal>

      <div ref={ref} className="relative">
        {/* Static rule, with the progress rule drawn over it. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-[calc(var(--time-col)+var(--dot-col)/2)] w-px bg-cream/25"
        />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-[calc(var(--time-col)+var(--dot-col)/2)] w-px origin-top bg-cream"
          style={{ transform: `scaleY(${progress})` }}
        />

        <ol>
          {part.events.map((event, index) => {
            const isLit = index < litCount;

            return (
              <li
                key={event.id}
                className="grid grid-cols-[var(--time-col)_var(--dot-col)_1fr] items-baseline py-7"
              >
                <p className="font-display text-right text-2xl leading-none font-light lg:text-[2rem]">
                  {event.time}
                </p>

                <span
                  aria-hidden="true"
                  className={`col-start-2 size-2.5 self-center justify-self-center rounded-full border transition-colors duration-500 ${
                    isLit
                      ? "border-cream bg-cream"
                      : "border-ember-200/70 bg-transparent"
                  }`}
                />

                <div>
                  <h4 className="font-display mb-1.5 text-lg font-normal lg:text-xl">
                    {event.title}
                  </h4>
                  <p className="max-w-[46ch] text-sm leading-relaxed text-cream/75">
                    {event.body}
                  </p>
                  {event.location ? (
                    <p className="micro mt-2.5 text-ember-200">
                      {event.location}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
