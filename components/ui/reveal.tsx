"use client";

import type { CSSProperties, ReactNode } from "react";

import { useInView } from "@/lib/hooks/use-in-view";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds, for siblings revealing together. */
  delay?: number;
};

/**
 * Fades and lifts its children into view on scroll.
 *
 * The visual states live in globals.css against `[data-reveal]`, which keeps
 * the reduced-motion override in one place rather than scattered per component.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal=""
      data-visible={isInView}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
      className={className}
    >
      {children}
    </div>
  );
}
