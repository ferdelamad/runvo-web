"use client";

import { useRef, type ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

type SectionLiftProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * The full-bleed panels between sections settle up to full size as they arrive,
 * which reads as one card sliding out from behind another.
 */
export function SectionLift({ id, className, children }: SectionLiftProps) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { threshold: 0.08 });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("rv-lift", className)}
      data-visible={visible ? "" : undefined}
    >
      {children}
    </section>
  );
}
