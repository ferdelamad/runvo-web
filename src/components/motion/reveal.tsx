"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

type RevealProps = {
  /** Render as the semantic element the content needs. Defaults to a div. */
  as?: ElementType;
  /** Stagger, in milliseconds, after the element enters the viewport. */
  delay?: number;
  className?: string;
  children?: ReactNode;
  id?: string;
};

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  return (
    <Tag
      ref={ref}
      className={cn("rv-reveal", className)}
      data-visible={visible ? "" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
