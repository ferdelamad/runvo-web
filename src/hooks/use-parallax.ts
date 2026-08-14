"use client";

import { useEffect, useRef } from "react";

/**
 * One scroll listener and one rAF for every parallax element on the page,
 * regardless of how many register. Elements translate on Y proportionally to
 * how far their centre sits from the centre of the viewport.
 */
const registry = new Map<HTMLElement, number>();
let frame = 0;
let listening = false;

function paint() {
  frame = 0;
  const viewport = window.innerHeight;

  for (const [el, speed] of registry) {
    const box = el.getBoundingClientRect();
    const progress = (box.top + box.height / 2 - viewport / 2) / viewport;
    el.style.transform = `translate3d(0, ${(progress * speed * 140).toFixed(1)}px, 0)`;
  }
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(paint);
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stopListening() {
  if (!listening || registry.size > 0) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/**
 * @param speed Negative drifts against the scroll, positive drifts with it.
 * @param enabled Pass `false` for reduced-motion visitors.
 */
export function useParallax<T extends HTMLElement>(speed: number, enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    registry.set(el, speed);
    listen();
    schedule();

    return () => {
      registry.delete(el);
      el.style.transform = "";
      stopListening();
    };
  }, [speed, enabled]);

  return ref;
}
