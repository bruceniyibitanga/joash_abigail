"use client";

import type { ReactNode } from "react";

import { useInView } from "@/lib/hooks/use-in-view";

type ArchFrameProps = {
  children: ReactNode;
  /** Tailwind aspect ratio utility, e.g. `aspect-[3/4.4]`. */
  className?: string;
};

/**
 * The arched photo frame, with a slow scale-down as it scrolls into view.
 *
 * Keeping the observer here means `Photo` stays a server component.
 */
export function ArchFrame({ children, className = "" }: ArchFrameProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <div ref={ref} className={`arch relative ${className}`}>
      <div
        data-settle=""
        data-visible={isInView}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
