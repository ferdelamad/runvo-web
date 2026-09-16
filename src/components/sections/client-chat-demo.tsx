"use client";

import { useRef } from "react";

import { ChatBubble, TypingIndicator, clientBubble } from "@/components/ui/chat-bubble";
import { useChatPlayback } from "@/hooks/use-chat-playback";
import { cn } from "@/lib/cn";
import type { ClientChat } from "@/lib/dictionary";

type ClientChatDemoProps = {
  chat: ClientChat;
  /** Small pill in the header naming who answered. */
  badge?: string;
  /** Confirmation card revealed after the last bubble. */
  outro?: { title: string; detail: string };
  footnote?: string;
  /**
   * Framed: its own raised card, as in the hero. Bare: just the header and the
   * thread, for dropping inside a card that already has edges.
   */
  frame?: boolean;
};

/**
 * A client's WhatsApp thread, answered by the Front Desk in whichever language
 * the client wrote. This does more positioning work than any paragraph.
 */
export function ClientChatDemo({
  chat,
  badge,
  outro,
  footnote,
  frame = true,
}: ClientChatDemoProps) {
  const threadRef = useRef<HTMLDivElement>(null);
  const { revealed, typing, outro: outroOn } = useChatPlayback(threadRef, {
    messages: chat.thread,
    typingIndicator: true,
    outro: Boolean(outro),
  });

  return (
    <div
      className={cn(
        "relative z-1",
        frame
          ? "bg-cream-300 border-cream-400 ml-auto max-w-[400px] rounded-[28px] border p-3.5 shadow-[0_12px_32px_rgba(46,43,37,0.22)]"
          : "flex h-full min-h-0 flex-col",
      )}
    >
      <div className={cn("flex items-center gap-[11px] pb-3.5", frame ? "px-2 pt-1.5" : "px-1")}>
        <span
          aria-hidden
          className="bg-clay-500 text-clay-50 flex h-[34px] w-[34px] items-center justify-center rounded-full text-sm font-extrabold"
        >
          {chat.initials}
        </span>
        <div>
          <div className="text-[15px] font-bold">{chat.contact}</div>
          <div className="text-ink-600 text-[12.5px]">{chat.channel}</div>
        </div>
        <div className="flex-1" />
        {badge && (
          <span className="text-sage-600 bg-sage-100 rounded-full px-2.5 py-[5px] text-[11.5px] font-bold tracking-[0.05em]">
            {badge}
          </span>
        )}
      </div>

      <div
        ref={threadRef}
        className={cn(
          "flex flex-col gap-2.5 rounded-[20px] p-4",
          frame ? "bg-cream-50 min-h-[372px]" : "bg-cream-200 min-h-0 flex-1 justify-end overflow-hidden",
        )}
      >
        {chat.thread.map((message, index) => (
          <ChatBubble
            key={message.text}
            visible={revealed[index]}
            className={clientBubble[message.side]}
          >
            {message.text}
          </ChatBubble>
        ))}

        <TypingIndicator visible={typing} />

        {outro && (
          <>
            <div className="flex-1" />
            <div
              className={cn(
                "bg-sage-100 border-sage-200 flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 transition-[opacity,transform] duration-500 ease-out",
                outroOn ? "translate-y-0 opacity-100" : "rv-js translate-y-2 opacity-0",
              )}
            >
              <span
                aria-hidden
                className="bg-sage-500 block h-[22px] w-[22px] flex-none rounded-full"
              />
              <div className="text-sage-700 text-sm leading-[1.35]">
                <strong className="font-extrabold">{outro.title}</strong>
                <br />
                {outro.detail}
              </div>
            </div>
          </>
        )}
      </div>

      {footnote && (
        <div className="text-ink-600 px-0 pt-3 pb-1 text-center text-[12.5px]">{footnote}</div>
      )}
    </div>
  );
}
