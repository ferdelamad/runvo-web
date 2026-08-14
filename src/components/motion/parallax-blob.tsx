"use client";

import { useParallax } from "@/hooks/use-parallax";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";

type ParallaxBlobProps = {
  /** Negative drifts against the scroll, positive drifts with it. */
  speed: number;
  className?: string;
};

/** A decorative circle that drifts as the page scrolls. */
export function ParallaxBlob({ speed, className }: ParallaxBlobProps) {
  const reducedMotion = useReducedMotion();
  const ref = useParallax<HTMLDivElement>(speed, !reducedMotion);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute rounded-full", className)} />
  );
}
