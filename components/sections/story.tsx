import Link from "next/link";

import { ArchFrame } from "@/components/ui/arch-frame";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { STORY_CHAPTERS, STORY_CTA, STORY_INTRO } from "@/lib/wedding";

export function Story() {
  return (
    <section id="story" className="py-section-sm lg:py-section">
      <div className="mx-auto w-full max-w-360 px-6 lg:px-12">
        <div className="lg:ml-[8.333%]">
          <SectionHeading
            eyebrow={STORY_INTRO.eyebrow}
            lead={STORY_INTRO.headingLead}
            emphasis={STORY_INTRO.headingEm}
          />
          <Reveal delay={160}>
            <p className="text-ink-soft mt-7 max-w-[46ch] text-[0.95rem] leading-relaxed">
              {STORY_INTRO.body}
            </p>
          </Reveal>
        </div>

        <ol className="mt-20 grid grid-cols-1 gap-18 lg:mt-24 lg:grid-cols-3 lg:gap-14">
          {STORY_CHAPTERS.map((chapter, index) => (
            <li
              key={chapter.id}
              // Staircase offset on desktop only; stacked cleanly on mobile.
              className={
                index === 1
                  ? "lg:translate-y-12"
                  : index === 2
                    ? "lg:translate-y-24"
                    : undefined
              }
            >
              <Reveal delay={index * 90}>
                <article>
                  {/* The numeral is anchored to the image, not the article, so
                      it can never collide with the copy at any width. */}
                  <div className="relative">
                    <ArchFrame className="aspect-[3/4.4]">
                      <Photo
                        label={chapter.image?.alt ?? `Photo ${chapter.index}`}
                        src={chapter.image?.src}
                        tone={chapter.tone}
                      />
                    </ArchFrame>

                    <span
                      aria-hidden="true"
                      className="font-display absolute right-5 bottom-4 z-10 text-[clamp(3.2rem,5vw,5rem)] leading-none font-light text-cream drop-shadow-[0_2px_18px_rgba(42,27,18,0.55)]"
                    >
                      {chapter.index}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="micro mb-2.5 text-ember-600">{chapter.date}</p>
                    <h3 className="font-display mb-2.5 text-2xl font-normal">
                      {chapter.title}
                    </h3>
                    <p className="text-ink-soft max-w-[38ch] text-[0.9375rem] leading-relaxed">
                      {chapter.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={280}>
          <div className="mt-16 lg:ml-[8.333%] lg:mt-20">
            <Link
              href={STORY_CTA.href}
              className="micro group inline-flex items-center gap-3 rounded-full border border-ember-600/35 px-6 py-4.5 text-ember-700 transition-colors duration-300 hover:border-ember-600 hover:bg-ember-600 hover:text-cream"
            >
              {STORY_CTA.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
