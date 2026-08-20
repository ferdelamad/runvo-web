"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

const START_DELAY = 600;
/** How long a card sits on screen before the owner taps its button. */
const READ_BEAT = 1600;
/** How long a tapped button stays lit before the next card lands. */
const PRESS_HOLD = 420;
const BEAT = 1150;
const LOOP_PAUSE = 5200;

/** Which button is mid-tap. The owner only ever taps these two. */
type Press = "list" | "draft" | null;

const bubble =
  "bg-cream-50 text-ink-950 rounded-[18px_18px_18px_6px] px-3.5 py-[11px] text-[14.5px] leading-[1.42]";

/**
 * The end-of-day review run. The assistant notices who hasn't been asked,
 * offers the list, drafts each invite, and stops — the owner still taps send.
 */
export function ReviewsDemo({ dict }: { dict: Dictionary }) {
  const { reviews } = dict.roles;
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { step, press } = useReviewsPlayback(cardRef, reviews.drafts.length);
  const reducedMotion = useReducedMotion();

  // Follow the thread as it grows, so the newest card is always the visible one.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || reducedMotion) return;
    // Assigning scrollTop rather than scrollTo({behavior}) — the smooth variant
    // is a no-op on this box in Chrome; `scroll-smooth` animates it instead.
    el.scrollTop = el.scrollHeight;
  }, [step, reducedMotion]);

  const draftsStart = 4;

  return (
    <div
      ref={cardRef}
      className="bg-ink-900 rounded-[28px] p-[22px] shadow-[0_12px_32px_rgba(46,43,37,0.22)]"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span aria-hidden className="bg-sage-400 block h-2 w-2 rounded-full" />
        <span className="text-cream-500 text-[12.5px] font-extrabold tracking-[0.06em]">
          {reviews.header}
        </span>
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "scroll-smooth flex flex-col gap-2.5",
          // Reduced motion gets the whole thread at once, so it can't live in a
          // fixed-height box — everything past the first screen would be lost.
          reducedMotion ? "h-auto" : "h-[420px] overflow-hidden",
        )}
      >
        {/* Hangs the thread off the bottom while it's still short, the way a
            chat app does. Collapses to nothing once the cards overflow. */}
        <div className="flex-1" />

        {/* 1 — the nudge nobody had to ask for */}
        <Card visible={step >= 1}>
          <div className={bubble}>
            <strong className="font-extrabold">{reviews.nudgeTitle}</strong>
            <p className="mt-2 mb-0">{reviews.nudgeBody}</p>
          </div>
          <ButtonRow>
            <TapButton pressed={press === "list"}>{reviews.nudgePrimary}</TapButton>
            <TapButton muted>{reviews.nudgeSecondary}</TapButton>
          </ButtonRow>
        </Card>

        {/* 2 — the list, already ticked, one tap from drafted */}
        <Card visible={step >= 2}>
          <div className={bubble}>
            <strong className="font-extrabold">{reviews.listTitle}</strong>
            <p className="mt-2 mb-0">{reviews.listBody}</p>
            <ol className="mt-2 mb-0 list-none p-0">
              {reviews.clients.map((client, index) => (
                <li key={client.name} className="text-ink-800">
                  {index + 1}. {client.name} · {client.time}
                </li>
              ))}
            </ol>
          </div>
          <ButtonRow>
            {reviews.clients.map((client, index) => (
              <Fragment key={client.name}>
                <TapButton>
                  ✓ {index + 1}. {client.short}
                </TapButton>
                <TapButton muted>{reviews.skipLabel}</TapButton>
              </Fragment>
            ))}
            <TapButton pressed={press === "draft"} full>
              {reviews.draftCta}
            </TapButton>
          </ButtonRow>
        </Card>

        {/* 3 — it writes them */}
        <Card visible={step >= 3}>
          <div className={bubble}>{reviews.drafting}</div>
        </Card>

        {/* 4..n — one drafted invite per client, ready to send */}
        {reviews.drafts.map((draft, index) => {
          const [before, after = ""] = draft.body.split("{link}");
          return (
            <Card key={draft.name} visible={step >= draftsStart + index}>
              <div className={bubble}>
                <strong className="font-extrabold">
                  {draft.label} {draft.name}
                </strong>
                <p className="mt-2 mb-0 whitespace-pre-line">
                  {before}
                  <span className="text-clay-600 decoration-clay-600/40 underline">
                    {reviews.link}
                  </span>
                  {after}
                </p>
              </div>
              <ButtonRow>
                <TapButton>💬 {reviews.whatsapp} ↗</TapButton>
                <TapButton>📱 {reviews.sms} ↗</TapButton>
              </ButtonRow>
            </Card>
          );
        })}

        {/* n+1 — it hands the send back to the owner */}
        <Card visible={step >= draftsStart + reviews.drafts.length}>
          <div className={bubble}>{reviews.done}</div>
        </Card>
      </div>
    </div>
  );
}

/** A bubble plus its attached buttons, popped in when playback reaches it. */
function Card({ visible, children }: { visible: boolean; children: ReactNode }) {
  if (!visible) return null;

  return (
    <div
      className="rv-animated flex max-w-[94%] flex-none flex-col gap-1"
      style={{ animation: "rv-pop 450ms var(--ease-out-snap) both" }}
    >
      {children}
    </div>
  );
}

function ButtonRow({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-[1fr_auto] gap-1">{children}</div>;
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
 * Runs the review flow once the card scrolls into view, then loops. Reduced
 * motion gets every card at once, with no tapping.
 */
function useReviewsPlayback(cardRef: RefObject<Element | null>, draftCount: number) {
  const reducedMotion = useReducedMotion();
  const started = useInView(cardRef, { threshold: 0.25 });

  const [step, setStep] = useState(0);
  const [press, setPress] = useState<Press>(null);

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
      setStep(0);
      setPress(null);

      let t = START_DELAY;
      at(t, () => setStep(1));

      t += READ_BEAT;
      at(t, () => setPress("list"));
      t += PRESS_HOLD;
      at(t, () => {
        setPress(null);
        setStep(2);
      });

      t += READ_BEAT;
      at(t, () => setPress("draft"));
      t += PRESS_HOLD;
      at(t, () => {
        setPress(null);
        setStep(3);
      });

      for (let i = 0; i < draftCount + 1; i += 1) {
        t += BEAT;
        at(t, () => setStep(4 + i));
      }

      at(t + LOOP_PAUSE, run);
    };

    at(0, run);
    return () => timers.forEach(clearTimeout);
  }, [started, reducedMotion, draftCount]);

  if (reducedMotion) return { step: 4 + draftCount, press: null as Press };

  return { step, press };
}
