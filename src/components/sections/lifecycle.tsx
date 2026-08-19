"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

/**
 * Beat sheet for one run, in milliseconds. The marker rests at a stage, then
 * travels to the next — the pause is what makes each stage register, and it is
 * why this reads as one appointment moving rather than a progress bar filling.
 */
const ENTER_BEAT = 500;
const DWELL = 420;
const HOP = 560;
/** How long the finished lifecycle rests before the rail clears. */
const HOLD = 2600;
const RESET = 500;
const REST = 700;

/**
 * Enough runs to catch a reader, then it settles on the finished lifecycle
 * rather than looping into wallpaper. Scrolling away and back re-arms it.
 */
const MAX_PASSES = 3;

const TRAVEL = `${HOP}ms`;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

type Spot = { x: number; y: number };

/**
 * A lifecycle rather than a channel flow — which is what keeps Runvo out of the
 * "chatbot" box and gives every future role a slot without a redesign.
 *
 * The stages sit on a rail and a marker carries the appointment down it, laying
 * the rail as it goes. The two steps either side of the human stage stay dotted
 * and never fill, so the closing line is something you watch happen.
 */
export function Lifecycle({ dict }: { dict: Dictionary }) {
  const { lifecycle } = dict;
  const stages = lifecycle.stages;
  const total = stages.length;
  /** The one stage the owner keeps; everything either side of it is a handoff. */
  const youIndex = stages.findIndex((stage) => stage.isYou);

  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { threshold: 0.2, once: false });
  const reducedMotion = useReducedMotion();

  /** How far the appointment has got. -1 is "not started". */
  const [at, setAt] = useState(-1);
  /** True while the marker is between stages, which is when the rail paints. */
  const [hopping, setHopping] = useState(false);
  const [live, setLive] = useState(false);

  // Reduced motion gets the finished lifecycle without the journey.
  const reached = reducedMotion ? total - 1 : at;

  const spots = useBadgeSpots(listRef);
  /** Whether a previous run left the rail dressed and needing a clear-down. */
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let timer: ReturnType<typeof setTimeout>;
    let passes = 0;

    const hop = (from: number) => {
      if (from >= total - 1) {
        timer = setTimeout(endPass, HOLD);
        return;
      }

      setHopping(true);
      timer = setTimeout(() => {
        setAt(from + 1);
        setHopping(false);
        timer = setTimeout(() => hop(from + 1), DWELL);
      }, HOP);
    };

    const start = () => {
      startedRef.current = true;
      setAt(0);
      setHopping(false);
      setLive(true);
      timer = setTimeout(() => hop(0), DWELL);
    };

    // Fade the marker out where it stands before clearing the rail behind it,
    // so it never flies backwards in view.
    const clearDown = () => {
      setLive(false);
      timer = setTimeout(() => {
        setAt(-1);
        setHopping(false);
        timer = setTimeout(start, REST);
      }, RESET);
    };

    const endPass = () => {
      passes += 1;
      // Stop on the completed rail: that finished state is the argument.
      if (passes >= MAX_PASSES) return;
      clearDown();
    };

    // A first look starts straight away; coming back to a dressed rail strikes
    // it first.
    timer = setTimeout(startedRef.current ? clearDown : start, ENTER_BEAT);

    return () => clearTimeout(timer);
  }, [inView, reducedMotion, total]);

  // Where the marker is headed — which is the stage it is already crossing to
  // while hopping. Clamped so it parks on the first badge while the rail is
  // bare, rather than at the list's origin.
  const markerIndex = Math.max(0, Math.min(hopping ? at + 1 : at, total - 1));
  const markerAt = spots[markerIndex];
  const markerOnYou = markerIndex === youIndex;

  return (
    <section id="how" className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:pt-24 lg:pb-[104px]">
      <Reveal
        as="h2"
        className="font-display mt-0 mb-10 text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:mb-[46px] lg:text-[56px]"
      >
        {lifecycle.title}
      </Reveal>

      <ol
        ref={listRef}
        className="relative m-0 mb-9 flex list-none flex-col p-0 lg:mb-[38px] lg:flex-row"
      >
        {stages.map((stage, index) => (
          <Stage
            key={stage.label}
            index={index}
            label={stage.label}
            isYou={Boolean(stage.isYou)}
            youLabel={lifecycle.youLabel}
            youIndex={youIndex}
            reached={index <= reached}
            active={live && !hopping && index === reached}
            /** The rail into the next stage paints while the marker crosses it. */
            trailOn={index < reached || (index === reached && hopping)}
            isLast={index === total - 1}
          />
        ))}

        {/* The appointment itself, riding the rail. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-0 left-0 z-2 h-[46px] w-[46px] rounded-full border-[2.5px] transition-[transform,opacity,border-color,box-shadow]",
            live && markerAt ? "opacity-100" : "opacity-0",
            // The marker takes the colour of whoever has the appointment: sage
            // while Runvo carries it, clay from the moment it starts crossing
            // to the stage you own — the turn happens during the hop, so the
            // handover reads before it lands.
            markerOnYou
              ? "border-clay-500 shadow-[0_0_0_5px_rgba(198,113,57,0.12)]"
              : "border-sage-500 shadow-[0_0_0_5px_rgba(114,129,87,0.12)]",
          )}
          style={{
            transitionDuration: `${TRAVEL}, 320ms, ${TRAVEL}, ${TRAVEL}`,
            transitionTimingFunction: EASE,
            transform: markerAt
              ? `translate3d(${markerAt.x}px, ${markerAt.y}px, 0) translate(-50%, -50%)`
              : undefined,
          }}
        />
      </ol>

      <Reveal as="p" className="font-display m-0 text-[26px] leading-[1.2] sm:text-[34px]">
        {lifecycle.closer.yours}{" "}
        <span className="text-clay-700">{lifecycle.closer.runvo}</span>
      </Reveal>
    </section>
  );
}

/**
 * Badge centres relative to the list, remeasured whenever it resizes. Measuring
 * rather than computing is what lets one marker ride both the even desktop row
 * and the ragged mobile column, where the taller YOU card shifts the spacing.
 */
function useBadgeSpots(listRef: React.RefObject<HTMLOListElement | null>) {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const base = list.getBoundingClientRect();
      setSpots(
        [...list.querySelectorAll<HTMLElement>("[data-badge]")].map((badge) => {
          const box = badge.getBoundingClientRect();
          return {
            x: box.x - base.x + box.width / 2,
            y: box.y - base.y + box.height / 2,
          };
        }),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [listRef]);

  return spots;
}

function Stage({
  index,
  label,
  isYou,
  youLabel,
  youIndex,
  reached,
  active,
  trailOn,
  isLast,
}: {
  index: number;
  label: string;
  isYou: boolean;
  youLabel: string;
  youIndex: number;
  reached: boolean;
  active: boolean;
  trailOn: boolean;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-3.5 pb-2.5 last:pb-0 lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-3 lg:px-[5px] lg:pb-0">
      {!isLast && <Trail on={trailOn} handoff={index === youIndex - 1 || index === youIndex} />}

      <span
        data-badge
        className={cn(
          "relative z-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[11px] font-extrabold tracking-[0.06em] transition-[background-color,border-color,transform] duration-[420ms] lg:mx-auto",
          // A small pop as the marker lands, so arrival is a beat and not just
          // a colour change. Scaling is centred, so it doesn't shift the spot
          // the marker is measured against.
          active ? "scale-[1.12]" : "scale-100",
          isYou
            ? "border-clay-500 bg-clay-500 text-clay-50"
            : reached
              ? "border-sage-500 bg-sage-500 text-sage-50"
              : "border-cream-400 bg-cream-100 text-ink-500",
        )}
        style={{ transitionTimingFunction: EASE }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={cn(
          // Centred on `lg` so the one label that wraps to two lines sits level
          // with the rest, which stretch to a shared height.
          "flex-1 rounded-[18px] border-[1.5px] px-4 py-3.5 transition-[background-color,border-color,transform,box-shadow] duration-[420ms] lg:flex lg:flex-col lg:justify-center lg:px-3 lg:py-[18px] lg:text-center",
          // Three tiers, so a wave travels the row: waiting, holding the
          // appointment, and done.
          active ? "-translate-y-2 shadow-[0_8px_20px_rgba(46,43,37,0.10)]" : "shadow-none",
          reached && !active && "-translate-y-0.5",
          !reached && "translate-y-0",
          isYou
            ? "border-clay-500 bg-cream-50"
            : reached
              ? "border-sage-300 bg-sage-100"
              : "border-cream-400 bg-cream-200",
        )}
        style={{ transitionTimingFunction: EASE }}
      >
        <span className={cn("font-display block text-lg lg:text-xl", isYou && "text-clay-700")}>
          {label}
        </span>
        {isYou && (
          <span className="text-clay-600 mt-1.5 block text-[11px] font-extrabold tracking-[0.08em]">
            {youLabel}
          </span>
        )}
      </div>
    </li>
  );
}

/**
 * The rail between one badge and the next: vertical on a phone, horizontal from
 * `lg`. `w-full` lands exactly on the next badge because the stages are equal
 * columns, so half of this cell plus half of the next is one full cell across.
 */
function Trail({ on, handoff }: { on: boolean; handoff: boolean }) {
  const box =
    "absolute top-9 bottom-0 left-[17px] lg:top-[17px] lg:bottom-auto lg:left-1/2 lg:w-full";

  // Runvo hands the appointment over and picks it back up — it doesn't work
  // through the stage you own, so these two steps stay dotted and never fill.
  if (handoff) {
    return (
      <span
        aria-hidden
        className={cn(
          box,
          "w-0 border-l-2 border-dotted transition-colors lg:h-0 lg:border-t-2 lg:border-l-0",
          on ? "border-clay-500" : "border-cream-400",
        )}
        style={{ transitionDuration: TRAVEL, transitionTimingFunction: EASE }}
      />
    );
  }

  return (
    <span aria-hidden className={cn(box, "bg-cream-400 w-0.5 lg:h-0.5")}>
      <span
        className={cn(
          "bg-sage-400 block h-full w-full origin-top transition-transform lg:origin-left",
          on ? "scale-100" : "scale-0",
        )}
        style={{ transitionDuration: TRAVEL, transitionTimingFunction: EASE }}
      />
    </span>
  );
}
