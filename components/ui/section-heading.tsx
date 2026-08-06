import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  /** Plain opening words of the heading. */
  lead: string;
  /** Emphasised closing words, set in display italic. */
  emphasis: string;
  /** `light` inverts the eyebrow colour for use on ember backgrounds. */
  variant?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  lead,
  emphasis,
  variant = "dark",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <p
          className={`micro mb-5 ${
            variant === "light" ? "text-ember-200" : "text-ember-600"
          }`}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[1.04] font-light tracking-tight text-balance">
          {lead}{" "}
          <em className="font-light italic">{emphasis}</em>
        </h2>
      </Reveal>
    </div>
  );
}
