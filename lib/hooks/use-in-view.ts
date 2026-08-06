"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number;
  /** Shrinks the viewport so elements reveal slightly before the true edge. */
  rootMargin?: string;
  /** When false, the element re-hides on exit. Defaults to reveal-once. */
  once?: boolean;
};

/**
 * Reports whether the referenced element has entered the viewport.
 *
 * Returns `true` immediately when IntersectionObserver is unavailable so that
 * content is never left permanently hidden by a missing browser API.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -12% 0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // No observer support: reveal everything rather than leave it hidden.
    // Deferred to a frame so the effect never sets state synchronously.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setIsInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
