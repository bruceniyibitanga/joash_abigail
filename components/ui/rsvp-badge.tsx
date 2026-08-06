"use client";

import { useEffect, useState } from "react";

import { WEDDING_DATE } from "@/lib/wedding";

/**
 * Rotating "RSVP" seal.
 *
 * Sits over the hero seam on load, then docks to the bottom-right corner as a
 * persistent shortcut once the hero has scrolled away.
 */
export function RsvpBadge() {
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsDocked(!entry.isIntersecting),
      // Dock once the hero's bottom passes 60% up the viewport.
      { rootMargin: "-40% 0px 0px 0px", threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const ringText = `RSVP · ${WEDDING_DATE.short} · RSVP · ${WEDDING_DATE.short} ·`;

  return (
    <a
      href="#rsvp"
      aria-label="Jump to the RSVP form"
      className={
        isDocked
          ? "badge-pop group fixed right-5 bottom-5 z-50 size-20 sm:right-7 sm:bottom-7 sm:size-23"
          : "badge-pop group absolute top-[44svh] right-5 z-30 size-24 lg:top-[40%] lg:right-auto lg:left-[45%] lg:size-28 lg:-translate-x-1/2 lg:-translate-y-1/2"
      }
    >
      <span className="relative flex size-full items-center justify-center rounded-full bg-ember-500 shadow-[0_12px_32px_rgba(42,27,18,0.28)] transition-transform duration-300 ease-out group-hover:scale-107 group-focus-visible:scale-107">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="badge-ring size-[88%]">
          <defs>
            <path
              id="rsvp-badge-ring"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
          </defs>
          <text className="fill-cream text-[11.5px] tracking-[3.4px] uppercase">
            <textPath href="#rsvp-badge-ring">{ringText}</textPath>
          </text>
        </svg>
        <span
          aria-hidden="true"
          className="font-display absolute text-xl text-cream"
        >
          ↓
        </span>
      </span>
    </a>
  );
}
