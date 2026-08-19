"use client";

import { useRef } from "react";

import { ChatBubble, TypingIndicator } from "@/components/ui/chat-bubble";
import { useChatPlayback } from "@/hooks/use-chat-playback";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

const inbound =
  "bg-cream-200 border-cream-400 self-start max-w-[82%] rounded-[18px_18px_18px_6px] border";
const outbound =
  "bg-clay-500 text-clay-50 self-end max-w-[86%] rounded-[18px_18px_6px_18px]";

/**
 * A real client thread, answered at 9pm, in whichever language the reader
 * speaks. This does more positioning work than any paragraph on the page.
 */
export function FrontDeskDemo({ dict }: { dict: Dictionary }) {
  const { frontDesk } = dict;
  const threadRef = useRef<HTMLDivElement>(null);
  const { revealed, typing, outro } = useChatPlayback(threadRef, {
    messages: frontDesk.thread,
    typingIndicator: true,
    outro: true,
  });

  return (
    <div className="bg-cream-300 border-cream-400 relative z-1 ml-auto max-w-[400px] rounded-[28px] border p-3.5 shadow-[0_12px_32px_rgba(46,43,37,0.22)]">
      <div className="flex items-center gap-[11px] px-2 pt-1.5 pb-3.5">
        <span
          aria-hidden
          className="bg-clay-500 text-clay-50 flex h-[34px] w-[34px] items-center justify-center rounded-full text-sm font-extrabold"
        >
          {frontDesk.initials}
        </span>
        <div>
          <div className="text-[15px] font-bold">{frontDesk.contact}</div>
          <div className="text-ink-600 text-[12.5px]">{frontDesk.channel}</div>
        </div>
        <div className="flex-1" />
        <span className="text-sage-600 bg-sage-100 rounded-full px-2.5 py-[5px] text-[11.5px] font-bold tracking-[0.05em]">
          {frontDesk.badge}
        </span>
      </div>

      <div
        ref={threadRef}
        className="bg-cream-50 flex min-h-[372px] flex-col gap-2.5 rounded-[20px] p-4"
      >
        {frontDesk.thread.map((message, index) => (
          <ChatBubble
            key={message.text}
            visible={revealed[index]}
            className={cn(message.side === "in" ? inbound : outbound)}
          >
            {message.text}
          </ChatBubble>
        ))}

        <TypingIndicator visible={typing} />

        <div className="flex-1" />

        <div
          className={cn(
            "bg-sage-100 border-sage-200 flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 transition-[opacity,transform] duration-500 ease-out",
            outro ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          <span aria-hidden className="bg-sage-500 block h-[22px] w-[22px] flex-none rounded-full" />
          <div className="text-sage-700 text-sm leading-[1.35]">
            <strong className="font-extrabold">{frontDesk.bookedTitle}</strong>
            <br />
            {frontDesk.bookedDetail}
          </div>
        </div>
      </div>

      <div className="text-ink-600 px-0 pt-3 pb-1 text-center text-[12.5px]">
        {frontDesk.footnote}
      </div>
    </div>
  );
}
