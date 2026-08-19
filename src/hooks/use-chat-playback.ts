"use client";

import { useEffect, useState, type RefObject } from "react";

import type { ChatMessage } from "@/lib/dictionary";
import { useInView } from "./use-in-view";
import { useReducedMotion } from "./use-reduced-motion";

const START_DELAY = 500;
const BEAT = 800;
const TYPING_DURATION = 750;
const TYPING_GAP = 120;
const OUTRO_DELAY = 700;
const LOOP_PAUSE = 4200;

type Options = {
  messages: ChatMessage[];
  /** Show a typing indicator before each outbound bubble. */
  typingIndicator?: boolean;
  /** Reveal a confirmation card after the last bubble. */
  outro?: boolean;
};

export type ChatPlayback = {
  revealed: boolean[];
  typing: boolean;
  outro: boolean;
};

/**
 * Replays a message thread once it scrolls into view, then loops. Reduced-motion
 * visitors get the finished thread with no animation.
 */
export function useChatPlayback(
  containerRef: RefObject<Element | null>,
  { messages, typingIndicator = false, outro = false }: Options,
): ChatPlayback {
  const reducedMotion = useReducedMotion();
  const started = useInView(containerRef, { threshold: 0.3 });

  const [state, setState] = useState<ChatPlayback>(() => ({
    revealed: messages.map(() => false),
    typing: false,
    outro: false,
  }));

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
      setState({ revealed: messages.map(() => false), typing: false, outro: false });

      let t = START_DELAY;

      messages.forEach((message, index) => {
        if (typingIndicator && message.side === "out") {
          at(t, () => setState((s) => ({ ...s, typing: true })));
          t += TYPING_DURATION;
          at(t, () => setState((s) => ({ ...s, typing: false })));
          t += TYPING_GAP;
        } else {
          t += BEAT;
        }

        at(t, () =>
          setState((s) => {
            const revealed = [...s.revealed];
            revealed[index] = true;
            return { ...s, revealed };
          }),
        );
      });

      if (outro) {
        at(t + OUTRO_DELAY, () => setState((s) => ({ ...s, outro: true })));
      }

      at(t + LOOP_PAUSE, run);
    };

    // Deferred by a tick: the thread already renders empty, so there is nothing
    // to reset synchronously here.
    at(0, run);
    return () => timers.forEach(clearTimeout);
    // `messages` is module-level static content; length and sides never change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reducedMotion, typingIndicator, outro, messages.length]);

  // Reduced-motion visitors get the finished thread straight from render.
  if (reducedMotion) {
    return { revealed: messages.map(() => true), typing: false, outro };
  }

  return state;
}
