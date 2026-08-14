"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";
import { lifecycleStages } from "@/lib/content";

const SWEEP_INTERVAL = 900;

/**
 * A lifecycle rather than a channel flow — which is what keeps Runvo out of the
 * "chatbot" box and gives every future role a slot without a redesign.
 */
export function Lifecycle() {
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const running = useInView(listRef, { threshold: 0.2, once: false }) && !reducedMotion;
  const [sweep, setSweep] = useState(-1);
  // Nothing is highlighted while the list is off-screen or motion is reduced.
  const active = running ? sweep : -1;

  useEffect(() => {
    if (!running) return;

    const id = setInterval(
      () => setSweep((current) => (current + 1) % lifecycleStages.length),
      SWEEP_INTERVAL,
    );
    return () => clearInterval(id);
  }, [running]);

  return (
    <section id="how" className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:pt-24 lg:pb-[104px]">
      <Reveal
        as="h2"
        className="font-display mt-0 mb-10 text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:mb-[46px] lg:text-[56px]"
      >
        An appointment isn&rsquo;t one moment.
      </Reveal>

      <ol
        ref={listRef}
        className="mb-9 flex list-none flex-wrap items-stretch gap-2.5 p-0 lg:mb-[38px]"
      >
        {lifecycleStages.map((stage, index) => {
          const on = index === active;

          return (
            <li
              key={stage.label}
              className={cn(
                "flex-[1_1_130px] rounded-[20px] border-[1.5px] px-4 py-5 transition-[background-color,border-color,transform] duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                on ? "-translate-y-1.5" : "translate-y-0",
                stage.isYou
                  ? "bg-cream-50 border-clay-500"
                  : on
                    ? "bg-sage-100 border-sage-300"
                    : "bg-cream-300 border-cream-400",
              )}
            >
              <div
                className={cn(
                  "mb-2 text-xs font-extrabold tracking-[0.08em]",
                  stage.isYou ? "text-clay-600" : "text-ink-500",
                )}
              >
                {stage.isYou ? "YOU" : String(index + 1).padStart(2, "0")}
              </div>
              <div className={cn("font-display text-xl", stage.isYou && "text-clay-700")}>
                {stage.label}
              </div>
            </li>
          );
        })}
      </ol>

      <Reveal as="p" className="font-display m-0 text-[26px] leading-[1.2] sm:text-[34px]">
        You do one of these. <span className="text-clay-700">Runvo does the rest.</span>
      </Reveal>
    </section>
  );
}
