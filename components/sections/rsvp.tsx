import { RsvpForm } from "@/components/sections/rsvp-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { RSVP_CONTENT } from "@/lib/wedding";

export function Rsvp() {
  return (
    <section
      id="rsvp"
      className="py-section-sm bg-ember-700 text-cream lg:py-section"
    >
      <div className="mx-auto w-full max-w-155 px-6 lg:px-12">
        <SectionHeading
          eyebrow={RSVP_CONTENT.eyebrow}
          lead={RSVP_CONTENT.headingLead}
          emphasis={RSVP_CONTENT.headingEm}
          variant="light"
          className="text-center"
        />
        <Reveal delay={140}>
          <p className="mx-auto mt-6 max-w-[42ch] text-center text-[0.9375rem] leading-relaxed text-cream/75">
            {RSVP_CONTENT.intro}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <RsvpForm />
        </Reveal>
      </div>
    </section>
  );
}
