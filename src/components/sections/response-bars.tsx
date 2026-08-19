"use client";

import { useEffect, useRef, useState } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

/**
 * Beat sheet for one pass, in milliseconds. The slow bar is meant to be tedious
 * — the comparison only lands if you feel the wait, and at 2.4s on an ease-out
 * curve nobody did. Durations live here rather than in `duration-*` classes
 * because the replay schedule below has to stay in step with them.
 */
const ENTER_BEAT = 450;
const SLOW_FILL = 6500;
const FAST_FILL = 450;
/** How long the finished pair rests before rewinding. */
const HOLD = 2600;
const DRAIN = 450;
const REST = 600;

/**
 * Enough replays to catch someone reading the copy alongside, then it settles
 * on the full bars instead of looping into wallpaper. Scrolling away and back
 * re-arms it.
 */
const MAX_PASSES = 3;

type Bars = Dictionary["problem"]["bars"];

/** Same story on both bars: one takes ten hours to land, the other four seconds. */
export function ResponseBars({ bars }: { bars: Bars }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.5, once: false });

  const [filled, setFilled] = useState(false);
  const filledRef = useRef(false);

  useEffect(() => {
    if (!inView) return;

    const apply = (next: boolean) => {
      filledRef.current = next;
      setFilled(next);
    };

    // Reduced motion gets the conclusion without the theatre — a bar that
    // snapped between empty and full on a loop would just be a blinking light.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let passes = 0;

    const fill = () => {
      apply(true);
      timer = setTimeout(endPass, SLOW_FILL + HOLD);
    };

    const endPass = () => {
      passes += 1;
      // Stop on the full bars: that finished state is the whole argument.
      if (passes >= MAX_PASSES) return;
      apply(false);
      timer = setTimeout(fill, DRAIN + REST);
    };

    // Returning to a full set of bars rewinds them before replaying.
    const rewinding = filledRef.current;
    apply(false);
    timer = setTimeout(fill, rewinding ? DRAIN + REST : ENTER_BEAT);

    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-col gap-[18px]">
      <div className="bg-ink-800 rounded-[28px] px-[26px] py-6">
        <Legend className="text-cream-500" label={bars.slow.label} value={bars.slow.value} />
        <Track className="bg-ink-900">
          {/* Linear, because a grind that never speeds up is the point. */}
          <Fill filled={filled} fillMs={SLOW_FILL} ease="ease-linear" className="bg-ink-600" />
        </Track>
        <Footnote className="text-cream-400" from={bars.slow.from} to={bars.slow.to} />
      </div>

      <div className="bg-sage-600 rounded-[28px] px-[26px] py-6">
        <Legend className="text-sage-100" label={bars.fast.label} value={bars.fast.value} />
        <Track className="bg-sage-700">
          {/* No delay on either bar: both footnotes start at the same 9:00 PM
              message, so they have to leave the gate together. */}
          <Fill
            filled={filled}
            fillMs={FAST_FILL}
            ease="ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            className="bg-sage-200"
          />
        </Track>
        <Footnote className="text-sage-50" from={bars.fast.from} to={bars.fast.to} />
      </div>
    </div>
  );
}

function Legend({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex justify-between gap-4 text-[13px] font-bold tracking-[0.06em] uppercase",
        className,
      )}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Track({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div aria-hidden className={cn("relative h-3 overflow-hidden rounded-full", className)}>
      {children}
    </div>
  );
}

/**
 * Slides a full-width pill in from the left of a clipped track. Cheaper than
 * animating `right` — which relaid out every frame, for 6.5s on the slow bar —
 * and the rounded leading edge survives, which a scaleX would have squashed.
 */
function Fill({
  filled,
  fillMs,
  ease,
  className,
}: {
  filled: boolean;
  fillMs: number;
  /** Applied only while filling; the rewind has its own curve. */
  ease: string;
  className: string;
}) {
  return (
    <div
      style={{ transitionDuration: `${filled ? fillMs : DRAIN}ms` }}
      className={cn(
        "absolute inset-0 rounded-full transition-transform motion-reduce:transition-none",
        className,
        filled ? cn("translate-x-0", ease) : "-translate-x-full ease-in",
      )}
    />
  );
}

function Footnote({
  from,
  to,
  className,
}: {
  from: string;
  to: string;
  className: string;
}) {
  return (
    <div className={cn("mt-3 flex justify-between gap-4 text-[14.5px]", className)}>
      <span>{from}</span>
      <span>{to}</span>
    </div>
  );
}
