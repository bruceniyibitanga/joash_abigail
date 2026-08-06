"use client";

import { useEffect, useRef, useState } from "react";

type UseScrollProgressOptions = {
  /** Viewport fraction at which progress starts counting (0 = top of screen). */
  start?: number;
  /** Viewport fraction at which progress reaches 1. */
  end?: number;
};

/**
 * Tracks how far a element has travelled through the viewport, as 0 → 1.
 *
 * Replaces GSAP ScrollTrigger's `scrub` for the timeline rule. Reads are
 * batched into a rAF callback so the scroll listener itself stays cheap.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>({
  start = 0.75,
  end = 0.45,
}: UseScrollProgressOptions = {}) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;

    // Reduced motion: jump straight to the finished state. Deferred to a frame
    // so the effect body never sets state synchronously.
    if (prefersReducedMotion) {
      frame = requestAnimationFrame(() => {
        frame = 0;
        setProgress(1);
      });
      return () => {
        if (frame) cancelAnimationFrame(frame);
      };
    }

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Distance the element travels between the start and end trigger lines.
      const startY = viewport * start;
      const endY = viewport * end;
      const travelled = startY - rect.top;
      const distance = rect.height + startY - endY;

      if (distance <= 0) {
        setProgress(1);
        return;
      }

      const next = Math.min(1, Math.max(0, travelled / distance));
      setProgress(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // Schedule rather than measure inline, for the same reason as above.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [start, end]);

  return { ref, progress };
}
