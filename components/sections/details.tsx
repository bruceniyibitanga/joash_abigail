import { ArchFrame } from "@/components/ui/arch-frame";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { DETAILS } from "@/lib/wedding";

export function Details() {
  return (
    <section id="details" className="py-section-sm lg:py-section">
      <div className="mx-auto w-full max-w-360 px-6 lg:px-12">
        <div className="lg:ml-[8.333%]">
          <SectionHeading
            eyebrow="The Details"
            lead="Everything you need to"
            emphasis="know"
          />
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-16">
          {DETAILS.map((detail, index) => (
            <li
              key={detail.id}
              // Alternating lift gives the grid the same drift as the story row.
              className={index % 2 === 0 ? "lg:translate-y-16" : undefined}
            >
              <Reveal delay={(index % 2) * 90}>
                <article>
                  <p className="micro text-ember-600">{detail.label}</p>
                  <h3 className="font-display mt-3 text-[1.6rem] leading-tight font-normal">
                    {detail.title}
                  </h3>
                  <p className="text-ink-soft mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed">
                    {detail.body}
                  </p>
                  {detail.photo ? (
                    <ArchFrame className="mt-7 aspect-16/9.5">
                      <Photo
                        label={detail.image?.alt ?? detail.title}
                        src={detail.image?.src}
                        tone={detail.photo}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                    </ArchFrame>
                  ) : null}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
