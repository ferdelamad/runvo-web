"use client";

import { useRef } from "react";

import { ChatBubble } from "@/components/ui/chat-bubble";
import { useChatPlayback } from "@/hooks/use-chat-playback";
import { assistantThread } from "@/lib/content";

const fromOwner =
  "bg-ink-700 text-cream-50 self-end max-w-[88%] rounded-[18px_18px_6px_18px]";
const fromAssistant =
  "bg-cream-50 text-ink-950 self-start max-w-[90%] rounded-[18px_18px_18px_6px]";

/** The owner-facing thread — the half of the product no booking platform builds. */
export function AssistantDemo() {
  const threadRef = useRef<HTMLDivElement>(null);
  const { revealed } = useChatPlayback(threadRef, { messages: assistantThread });

  return (
    <div className="bg-ink-900 rounded-[28px] p-[22px] shadow-[0_12px_32px_rgba(46,43,37,0.22)]">
      <div className="mb-4 flex items-center gap-2.5">
        <span aria-hidden className="bg-sage-400 block h-2 w-2 rounded-full" />
        <span className="text-cream-500 text-[12.5px] font-extrabold tracking-[0.06em]">
          ASSISTANT · YOUR OWN THREAD
        </span>
      </div>

      <div ref={threadRef} lang="es" className="flex flex-col gap-2.5">
        {assistantThread.map((message, index) => (
          <ChatBubble
            key={message.text}
            visible={revealed[index]}
            className={message.side === "out" ? fromOwner : fromAssistant}
          >
            {message.text}
          </ChatBubble>
        ))}
      </div>
    </div>
  );
}
