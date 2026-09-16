"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type SceneRailProps = {
  count: number;
  labels: { rail: string; prev: string; next: string };
  children: ReactNode;
};

/**
 * A horizontal snap rail that starts on the page grid and runs off the right
 * edge of the screen. Scrolling is native — a thumb on a phone, a trackpad on a
 * laptop — and the arrows are for everyone else. Nothing here is needed for the
 * cards to be readable without JavaScript.
 */
export function SceneRail({ count, labels, children }: SceneRailProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const items = [...list.children] as HTMLElement[];
      if (items.length === 0) return;
      const origin = items[0].offsetLeft;
      const x = list.scrollLeft;
      let nearest = 0;
      let distance = Infinity;
      items.forEach((item, i) => {
        const d = Math.abs(item.offsetLeft - origin - x);
        if (d < distance) {
          distance = d;
          nearest = i;
        }
      });
      setIndex(nearest);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      list.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const go = (to: number) => {
    const list = listRef.current;
    if (!list) return;
    const items = [...list.children] as HTMLElement[];
    const target = items[Math.max(0, Math.min(to, items.length - 1))];
    if (!target) return;
    list.scrollTo({ left: target.offsetLeft - items[0].offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mx-auto mb-6 flex max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <span className="text-ink-600 font-mono text-[13px] font-semibold tracking-[0.06em] tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <Arrow label={labels.prev} disabled={index === 0} onClick={() => go(index - 1)}>
            ←
          </Arrow>
          <Arrow
            label={labels.next}
            disabled={index >= count - 1}
            onClick={() => go(index + 1)}
          >
            →
          </Arrow>
        </div>
      </div>

      <ul
        ref={listRef}
        aria-label={labels.rail}
        className="rv-rail m-0 flex list-none snap-x snap-mandatory items-stretch gap-[18px] overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}

function Arrow({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "border-cream-500 text-ink-950 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] text-lg transition-[background-color,border-color,opacity] duration-200",
        "hover:border-clay-700 hover:bg-cream-200 disabled:cursor-default disabled:opacity-35 disabled:hover:border-cream-500 disabled:hover:bg-transparent",
      )}
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
