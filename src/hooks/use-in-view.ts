"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first intersection. Defaults to true. */
  once?: boolean;
};

/**
 * Tracks whether an element has scrolled into view. Visitors without JavaScript
 * never reach this — the root layout's `<noscript>` block reveals everything for
 * them instead.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0.15, rootMargin = "0px", once = true }: Options = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
