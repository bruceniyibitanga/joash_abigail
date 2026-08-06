import { TimelineTrack } from "@/components/sections/timeline-track";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BLESSING_SCRIPTURE, SCHEDULE, WEDDING_DATE } from "@/lib/wedding";

export function Schedule() {
  return (
    <section
      id="day"
      className="py-section-sm bg-ember-600 text-cream lg:py-section"
    >
      <div className="mx-auto w-full max-w-360 px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-16">
            <SectionHeading
              eyebrow="The Day"
              lead="How the day"
              emphasis="unfolds"
              variant="light"
            />
            <Reveal delay={160}>
              <p className="mt-7 max-w-[36ch] text-[0.95rem] leading-relaxed text-cream/75">
                <time dateTime={WEDDING_DATE.iso}>{WEDDING_DATE.long}</time>. One
                day, two venues, and a great deal of thanksgiving in between.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <blockquote className="mt-10 border-l border-cream/25 pl-5">
                <p className="font-display text-lg leading-snug font-light italic">
                  “{BLESSING_SCRIPTURE.text}”
                </p>
                <cite className="micro mt-3 block text-ember-200 not-italic">
                  {BLESSING_SCRIPTURE.reference}
                </cite>
              </blockquote>
            </Reveal>
          </div>

          <div className="flex flex-col gap-16 lg:gap-20">
            {SCHEDULE.map((part) => (
              <TimelineTrack key={part.id} part={part} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
