import type { CSSProperties } from "react";

import { Photo } from "@/components/ui/photo";
import { RsvpBadge } from "@/components/ui/rsvp-badge";
import {
  ANCHOR_SCRIPTURE,
  COUPLE,
  HERO_IMAGE,
  NAV_LINKS,
  WEDDING_DATE,
} from "@/lib/wedding";

const NAME_LINES = [`${COUPLE.groom} &`, COUPLE.bride];

export function Hero() {
  return (
    <header
      id="home"
      className="relative grid min-h-[100svh] grid-cols-1 lg:grid-cols-[45%_55%]"
    >
      {/* Photograph sits first on mobile so the page opens on an image. */}
      <div className="relative order-1 min-h-[52svh] overflow-hidden lg:order-2 lg:min-h-0">
        <div className="hero-photo-media absolute inset-0">
          <Photo
            label={HERO_IMAGE.alt}
            src={HERO_IMAGE.src}
            tone="ember"
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            // Portrait source in a wider frame crops vertically; anchor to the
            // top so the crop takes the floor rather than their faces.
            className="object-top"
          />
        </div>
      </div>

      <div className="hero-panel relative z-20 order-2 flex flex-col bg-ember-600 px-6 pt-7 pb-10 text-cream lg:order-1 lg:px-12 lg:py-11">
        <nav aria-label="Primary" className="hero-fade">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 lg:gap-x-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="micro text-cream/90 transition-opacity duration-300 hover:opacity-60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="hero-fade micro mt-12 mb-8 text-cream/80 lg:mt-auto lg:mb-9">
          <time dateTime={WEDDING_DATE.iso}>{WEDDING_DATE.short}</time>
          <span className="mx-3" aria-hidden="true">
            ·
          </span>
          {WEDDING_DATE.city}
        </p>

        <h1 className="font-display relative z-30 text-[clamp(3.4rem,15vw,6rem)] leading-[0.95] font-light tracking-[-0.02em] lg:w-[150%] lg:text-[clamp(4rem,11vw,10.5rem)]">
          {NAME_LINES.map((line, index) => (
            <span key={line} className="hero-line block overflow-hidden">
              <span style={{ "--line-delay": `${index * 120}ms` } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-8 max-w-[34ch] text-sm leading-relaxed text-cream/75 lg:mt-10">
          <span className="italic">“{ANCHOR_SCRIPTURE.text}”</span>{" "}
          <span className="micro mt-2 block text-cream/60">
            {ANCHOR_SCRIPTURE.reference}
          </span>
        </p>
      </div>

      <RsvpBadge />
    </header>
  );
}
