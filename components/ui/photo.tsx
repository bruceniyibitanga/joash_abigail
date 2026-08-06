import Image from "next/image";

import type { PhotoTone } from "@/lib/wedding";

type PhotoProps = {
  /** Descriptive label: real alt text when `src` is set, caption when it is not. */
  label: string;
  tone?: PhotoTone;
  /** Drop a real photograph in and the placeholder treatment disappears. */
  src?: string;
  /** Prioritise the hero image only; everything else lazy-loads. */
  priority?: boolean;
  /**
   * Responsive width hint for `fill` images. Required for sensible srcset
   * generation — the default assumes a roughly one-third-width column.
   */
  sizes?: string;
  className?: string;
};

const TONE_GRADIENTS: Record<PhotoTone, string> = {
  ember: "bg-[linear-gradient(160deg,#d99a63_0%,#b65327_42%,#5d2714_100%)]",
  clay: "bg-[linear-gradient(165deg,#c9a184_0%,#9c4420_45%,#3d1a0e_100%)]",
  dusk: "bg-[linear-gradient(150deg,#b58a70_0%,#7d351a_45%,#2a1b12_100%)]",
};

/**
 * Photography slot. Renders a tinted, grain-textured placeholder until a real
 * `src` is supplied, so the layout is final long before the photos are.
 */
export function Photo({
  label,
  tone = "ember",
  src,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 33vw",
  className = "",
}: PhotoProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={label}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${label} — photograph to be added`}
      className={`relative h-full w-full ${TONE_GRADIENTS[tone]} ${className}`}
    >
      {/* Film grain, so the flat gradient reads as photography rather than a block of colour. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 mix-blend-overlay opacity-95"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E\")",
        }}
      />
      <span
        aria-hidden="true"
        className="micro absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/30 px-3.5 py-2 text-[0.625rem] whitespace-nowrap text-cream/60"
      >
        {label}
      </span>
    </div>
  );
}
