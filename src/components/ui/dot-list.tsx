import { Fragment } from "react";

import { cn } from "@/lib/cn";

/** Short proof points separated by middots, wrapping freely on narrow screens. */
export function DotList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-[22px] gap-y-2.5", className)}>
      {items.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && (
            <span aria-hidden className="text-cream-500">
              ·
            </span>
          )}
          <span>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}
