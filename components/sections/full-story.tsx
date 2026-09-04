import { ArchFrame } from "@/components/ui/arch-frame";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  FULL_STORY_CLOSING,
  FULL_STORY_INTRO,
  FULL_STORY_PHASES,
} from "@/lib/wedding";

export function FullStory() {
  return (
    <>
      <section className="py-section-sm lg:py-section">
        <div className="mx-auto w-full max-w-360 px-6 lg:px-12">
          <div className="lg:ml-[8.333%]">
            <SectionHeading
              eyebrow={FULL_STORY_INTRO.eyebrow}
              lead={FULL_STORY_INTRO.headingLead}
              emphasis={FULL_STORY_INTRO.headingEm}
            />
            <Reveal delay={160}>
              <p className="text-ink-soft mt-7 max-w-[50ch] text-[0.95rem] leading-relaxed">
                {FULL_STORY_INTRO.body}
              </p>
            </Reveal>
          </div>

          <div className="mt-24 flex flex-col gap-24 lg:mt-28 lg:gap-32">
            {FULL_STORY_PHASES.map((phase, phaseIndex) => {
              const imageOnRight = phaseIndex % 2 === 1;

              return (
                <article
                  key={phase.id}
                  className={
                    phaseIndex > 0
                      ? "border-ember-600/12 border-t pt-20 lg:pt-24"
                      : undefined
                  }
                >
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-14">
                    {/* Media column */}
                    <div
                      className={`lg:col-span-4 ${
                        imageOnRight ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <Reveal>
                        <div className="relative lg:sticky lg:top-16">
                          <ArchFrame className="aspect-[4/5]">
                            <Photo
                              label={
                                phase.image?.alt ?? `${phase.title} — photo to be added`
                              }
                              src={phase.image?.src}
                              tone={phase.tone}
                              sizes="(max-width: 1024px) 100vw, 33vw"
                            />
                          </ArchFrame>
                          <span
                            aria-hidden="true"
                            className="font-display absolute right-5 bottom-4 z-10 text-[clamp(3.2rem,5vw,5rem)] leading-none font-light text-cream drop-shadow-[0_2px_18px_rgba(42,27,18,0.55)]"
                          >
                            {phase.index}
                          </span>
                        </div>
                      </Reveal>
                    </div>

                    {/* Copy column */}
                    <div
                      className={`lg:col-span-8 ${
                        imageOnRight ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <Reveal delay={90}>
                        <p className="micro text-ember-600">{phase.dateLabel}</p>
                        <h3 className="font-display mt-2.5 text-[clamp(1.8rem,4vw,2.5rem)] leading-tight font-normal text-balance">
                          {phase.title}
                        </h3>
                      </Reveal>

                      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">
                        {phase.voices.map((voice, voiceIndex) => (
                          <Reveal
                            key={voice.name}
                            delay={140 + voiceIndex * 90}
                          >
                            <div>
                              <p className="micro border-ember-600/25 text-ember-700 mb-4 border-b pb-3">
                                {voice.name}
                              </p>
                              <div className="text-ink-soft flex flex-col gap-4 text-[0.9375rem] leading-relaxed">
                                {voice.paragraphs.map((paragraph, index) => (
                                  <p key={index}>{paragraph}</p>
                                ))}
                              </div>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ember-700 px-6 py-20 text-cream lg:px-12 lg:py-28">
        <Reveal>
          <p className="font-display mx-auto max-w-[24ch] text-center text-[clamp(1.8rem,4.5vw,3rem)] leading-tight font-light italic">
            {FULL_STORY_CLOSING}
          </p>
        </Reveal>
      </section>
    </>
  );
}
