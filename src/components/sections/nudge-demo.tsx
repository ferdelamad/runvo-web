"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";
import type { NudgeStep } from "@/lib/dictionary";

const START_DELAY = 600;
/** How long a card sits on screen before the owner taps its button. */
const READ_BEAT = 1600;
/** How long a tapped button stays lit before the next card lands. */
const PRESS_HOLD = 420;
const BEAT = 1150;
const LOOP_PAUSE = 5200;

const bubble =
  "bg-cream-50 text-ink-950 rounded-[18px_18px_18px_6px] px-3.5 py-[11px] text-[14.5px] leading-[1.42]";

type NudgeDemoProps = {
  header?: string;
  link: string;
  steps: NudgeStep[];
};

/**
 * A run the assistant starts on its own — the end-of-day review ask, the
 * Monday win-back — played from a script in the dictionary. The assistant
 * notices, offers, drafts, and stops: the owner still taps send.
 */
export function NudgeDemo({ header, link, steps }: NudgeDemoProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { shown, pressed } = useNudgePlayback(cardRef, steps);
  const reducedMotion = useReducedMotion();

  // Follow the thread as it grows, so the newest card is always the visible one.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || reducedMotion) return;
    // Assigning scrollTop rather than scrollTo({behavior}) — the smooth variant
    // is a no-op on this box in Chrome; `scroll-smooth` animates it instead.
    el.scrollTop = el.scrollHeight;
  }, [shown, reducedMotion]);

  return (
    <div ref={cardRef} className="flex h-full flex-col">
      {header && (
        <div className="mb-4 flex items-center gap-2.5">
          <span aria-hidden className="bg-sage-400 block h-2 w-2 rounded-full" />
          <span className="text-cream-500 text-[12.5px] font-extrabold tracking-[0.06em]">
            {header}
          </span>
        </div>
      )}

      <div
        ref={scrollRef}
        className={cn(
          "flex flex-1 scroll-smooth flex-col gap-2.5",
          // Reduced motion gets the whole thread at once, so it can't live in a
          // clipped box — everything past the first screen would be lost.
          reducedMotion ? "h-auto" : "min-h-0 overflow-hidden",
        )}
      >
        {/* Hangs the thread off the bottom while it's still short, the way a
            chat app does. Collapses to nothing once the cards overflow. */}
        <div className="flex-1" />

        {steps.map((step, index) => {
          const [before, after = ""] = step.body.split("{link}");
          const linked = step.body.includes("{link}");

          return (
            <Card key={index} visible={index < shown}>
              <div className={bubble}>
                {step.title && <strong className="font-extrabold">{step.title}</strong>}
                <p className={cn("mb-0 whitespace-pre-line", step.title && "mt-2")}>
                  {before}
                  {linked && (
                    <span className="text-clay-600 decoration-clay-600/40 underline">{link}</span>
                  )}
                  {after}
                </p>
                {step.list && (
                  <ol className="text-ink-800 mt-2 mb-0 list-none p-0">
                    {step.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                )}
              </div>

              {step.buttons && (
                <div className="grid grid-cols-[1fr_auto] gap-1">
                  {step.buttons.map((button, buttonIndex) => (
                    <TapButton
                      key={buttonIndex}
                      muted={button.muted}
                      full={button.full}
                      pressed={Boolean(button.tap) && pressed === index}
                    >
                      {button.label}
                    </TapButton>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/**
 * A bubble plus its attached buttons, popped in when playback reaches it. It
 * stays in the DOM while hidden so the no-JS stylesheet can show it.
 */
function Card({ visible, children }: { visible: boolean; children: ReactNode }) {
  return (
    <motion.div
      hidden={!visible}
      className="rv-js flex max-w-[94%] flex-none flex-col gap-1"
      initial={false}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A button on a message. Decorative — the real ones live in the chat app, so
 * these are spans, not controls a visitor can tab into and press to nowhere.
 */
function TapButton({
  children,
  pressed = false,
  muted = false,
  full = false,
}: {
  children: ReactNode;
  pressed?: boolean;
  muted?: boolean;
  full?: boolean;
}) {
  return (
    <span
      className={cn(
        "block rounded-[10px] px-3 py-[9px] text-center text-[13px] font-bold whitespace-nowrap transition-[background-color,transform,color] duration-200 ease-[var(--ease-out-snap)]",
        muted ? "bg-sage-600/70 text-cream-200" : "bg-sage-500 text-cream-50",
        pressed && "bg-sage-200 text-sage-700 scale-[0.97]",
        full && "col-span-2",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Walks the script once the card scrolls into view, then loops. A step whose
 * buttons include a `tap` waits for the owner to press it before the next step
 * lands; the rest arrive on a beat. Reduced motion gets every card at once.
 */
function useNudgePlayback(cardRef: RefObject<Element | null>, steps: NudgeStep[]) {
  const reducedMotion = useReducedMotion();
  const started = useInView(cardRef, { threshold: 0.25 });

  const [shown, setShown] = useState(0);
  const [pressed, setPressed] = useState<number | null>(null);

  useEffect(() => {
    if (reducedMotion || !started) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (delay: number, fn: () => void) => {
      timers.push(setTimeout(fn, delay));
    };

    const run = () => {
      // Every timer from the previous pass has fired by now; drop them so the
      // list doesn't grow with each loop.
      timers.length = 0;
      setShown(0);
      setPressed(null);

      let t = START_DELAY;

      steps.forEach((step, index) => {
        at(t, () => setShown(index + 1));

        if (step.buttons?.some((button) => button.tap)) {
          t += READ_BEAT;
          at(t, () => setPressed(index));
          t += PRESS_HOLD;
          at(t, () => setPressed(null));
        } else {
          t += BEAT;
        }
      });

      at(t + LOOP_PAUSE, run);
    };

    at(0, run);
    return () => timers.forEach(clearTimeout);
  }, [started, reducedMotion, steps]);

  if (reducedMotion) return { shown: steps.length, pressed: null };

  return { shown, pressed };
}
