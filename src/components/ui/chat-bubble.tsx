import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ChatBubbleProps = {
  visible: boolean;
  className?: string;
  children: ReactNode;
};

/** A message bubble that pops in when the thread's playback reaches it. */
export function ChatBubble({ visible, className, children }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "px-3.5 py-[11px] text-[15px] leading-[1.4] transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-[10px] scale-[0.98] opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The three bouncing dots shown while the Front Desk composes a reply. */
export function TypingIndicator({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-clay-100 flex gap-1 self-end rounded-full px-3.5 py-[11px] transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="bg-clay-600 rv-animated block h-1.5 w-1.5 rounded-full"
          style={{ animation: `rv-dot 1.1s ${delay}ms infinite` }}
        />
      ))}
    </div>
  );
}
