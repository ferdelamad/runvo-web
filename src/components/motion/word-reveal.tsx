"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { Fragment, useRef, type ElementType } from "react";

import { cn } from "@/lib/cn";

/**
 * Words start dim rather than invisible, so a heading that never animates —
 * no JS, an observer that never fires — still reads. The `<noscript>` block in
 * the root layout lifts `.rv-motion` to full opacity for good measure.
 */
const word: Variants = {
  hidden: { opacity: 0.16, y: "0.18em" },
  show: { opacity: 1, y: 0 },
};

const STAGGER = 0.05;

type WordRevealProps = {
  as?: "h1" | "h2" | "h3" | "p";
  /** One string, or one string per line; lines break on `sm` and up. */
  text: string | string[];
  className?: string;
  id?: string;
};

/**
 * A heading that lights up one word at a time as it scrolls into view — the
 * one motion the whole page shares, which is what makes it feel like a system.
 */
export function WordReveal({ as = "h2", text, className, id }: WordRevealProps) {
  // Typed loosely: the tag is chosen at render, and the ref only feeds the observer.
  const ref = useRef<HTMLParagraphElement & HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const Tag: ElementType = as;

  const lines = Array.isArray(text) ? text : [text];
  const shown = reduced || inView;
  let index = 0;

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && (
            <>
              {" "}
              <br className="hidden sm:inline" />
            </>
          )}
          {line.split(" ").map((token, tokenIndex) => {
            const delay = STAGGER * index++;
            return (
              <Fragment key={tokenIndex}>
                {tokenIndex > 0 && " "}
                <motion.span
                  className="rv-motion inline-block"
                  variants={word}
                  initial={reduced ? false : "hidden"}
                  animate={shown ? "show" : "hidden"}
                  transition={{
                    duration: 0.55,
                    ease: [0.2, 0.7, 0.2, 1],
                    delay: reduced ? 0 : delay,
                  }}
                >
                  {token}
                </motion.span>
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Small-caps label above a heading. */
export function Eyebrow({ className, children }: { className?: string; children: string }) {
  return (
    <p
      className={cn(
        "m-0 mb-4 text-[12.5px] font-extrabold tracking-[0.12em] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
