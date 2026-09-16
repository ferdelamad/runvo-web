"use client";

import { useRef } from "react";

import { ChatBubble, ownerBubble } from "@/components/ui/chat-bubble";
import { useChatPlayback } from "@/hooks/use-chat-playback";
import type { ChatMessage } from "@/lib/dictionary";

/** The owner-facing thread — the half of the product no booking platform builds. */
export function OwnerChatDemo({ thread, header }: { thread: ChatMessage[]; header?: string }) {
  const threadRef = useRef<HTMLDivElement>(null);
  const { revealed } = useChatPlayback(threadRef, { messages: thread });

  return (
    <div className="flex h-full flex-col">
      {header && (
        <div className="mb-4 flex items-center gap-2.5">
          <span aria-hidden className="bg-sage-400 block h-2 w-2 rounded-full" />
          <span className="text-cream-500 text-[12.5px] font-extrabold tracking-[0.06em]">
            {header}
          </span>
        </div>
      )}

      <div ref={threadRef} className="flex flex-1 flex-col justify-end gap-2.5">
        {thread.map((message, index) => (
          <ChatBubble
            key={message.text}
            visible={revealed[index]}
            className={ownerBubble[message.side]}
          >
            {message.text}
          </ChatBubble>
        ))}
      </div>
    </div>
  );
}
