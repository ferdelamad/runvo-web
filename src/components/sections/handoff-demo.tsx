"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

import { clientBubble } from "@/components/ui/chat-bubble";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

const pop: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const grow: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  show: { scaleY: 1, opacity: 1 },
};

/**
 * The moment the product is really selling: a question it can't answer, the
 * hand-off to the owner's Telegram, and the assistant going quiet on that
 * thread. Four beats on fixed delays — no timers, nothing to fall out of sync.
 */
export function HandoffDemo({ demo }: { demo: Dictionary["trust"]["demo"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const on = Boolean(reduced || inView);
  const instant = Boolean(reduced);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="bg-cream-50 text-ink-950 rounded-[24px] p-5 shadow-[0_12px_32px_rgba(32,30,29,0.28)]">
        <Header dot="bg-clay-500" text="text-ink-600">
          {demo.clientHeader}
        </Header>
        <div className="flex flex-col gap-2.5">
          <Beat on={on} instant={instant} delay={0.3} className={cn(bubble, clientBubble.in)}>
            {demo.ask}
          </Beat>
          <Beat on={on} instant={instant} delay={1.4} className={cn(bubble, clientBubble.out)}>
            {demo.reply}
          </Beat>
        </div>
      </div>

      {/* The hand-off itself: a thread running from one app to the other. */}
      <Beat
        on={on}
        instant={instant}
        delay={2.3}
        variants={grow}
        className="bg-sage-200 mx-auto h-9 w-0.5 origin-top"
      />

      <div className="bg-ink-900 text-cream-50 rounded-[24px] p-5 shadow-[0_12px_32px_rgba(32,30,29,0.28)]">
        <Header dot="bg-sage-400" text="text-cream-500">
          {demo.ownerHeader}
        </Header>
        <div className="flex flex-col items-start gap-2.5">
          <Beat
            on={on}
            instant={instant}
            delay={2.8}
            className={cn(
              bubble,
              "bg-cream-50 text-ink-950 max-w-[92%] rounded-[18px_18px_18px_6px]",
            )}
          >
            <strong className="text-clay-700 font-extrabold">{demo.handoffTitle}</strong>
            <p className="mt-1.5 mb-0">{demo.handoffBody}</p>
          </Beat>
          <Beat
            on={on}
            instant={instant}
            delay={3.7}
            className="bg-ink-800 text-cream-300 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-bold"
          >
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="bg-sage-400 rv-animated absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <span className="bg-sage-400 relative inline-flex h-2 w-2 rounded-full" />
            </span>
            {demo.muted}
          </Beat>
        </div>
      </div>
    </div>
  );
}

const bubble = "px-3.5 py-[11px] text-[15px] leading-[1.4]";

function Header({
  dot,
  text,
  children,
}: {
  dot: string;
  text: string;
  children: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span aria-hidden className={cn("block h-2 w-2 rounded-full", dot)} />
      <span className={cn("text-[12.5px] font-extrabold tracking-[0.06em] uppercase", text)}>
        {children}
      </span>
    </div>
  );
}

function Beat({
  on,
  instant,
  delay,
  variants = pop,
  className,
  children,
}: {
  on: boolean;
  instant: boolean;
  delay: number;
  variants?: Variants;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className={cn("rv-motion", className)}
      variants={variants}
      initial={instant ? false : "hidden"}
      animate={on ? "show" : "hidden"}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: instant ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
