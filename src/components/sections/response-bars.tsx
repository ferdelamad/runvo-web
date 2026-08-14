"use client";

import { useRef } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

/** Same story on both bars: one takes ten hours to land, the other four seconds. */
export function ResponseBars() {
  const ref = useRef<HTMLDivElement>(null);
  const filled = useInView(ref, { threshold: 0.5 });

  return (
    <div ref={ref} className="flex flex-col gap-[18px]">
      <div className="bg-ink-800 rounded-[28px] px-[26px] py-6">
        <Legend
          className="text-cream-500"
          label="Today, without a front desk"
          value="10 hrs"
        />
        <Track className="bg-ink-900">
          <Fill
            filled={filled}
            className="bg-ink-600 delay-[400ms] duration-[2400ms] ease-[cubic-bezier(0.3,0.6,0.2,1)]"
          />
        </Track>
        <Footnote className="text-cream-400" from="9:00 PM — she asks" to="7:00 AM — you reply" />
      </div>

      <div className="bg-sage-600 rounded-[28px] px-[26px] py-6">
        <Legend className="text-sage-100" label="Today, with Runvo" value="4 sec" />
        <Track className="bg-sage-700">
          <Fill
            filled={filled}
            className="bg-sage-200 delay-200 duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          />
        </Track>
        <Footnote className="text-sage-50" from="9:00 PM — she asks" to="9:00 PM — she's booked" />
      </div>
    </div>
  );
}

function Legend({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex justify-between gap-4 text-[13px] font-bold tracking-[0.06em] uppercase",
        className,
      )}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Track({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div aria-hidden className={cn("relative h-3 overflow-hidden rounded-full", className)}>
      {children}
    </div>
  );
}

function Fill({ filled, className }: { filled: boolean; className: string }) {
  return (
    <div
      className={cn(
        "absolute top-0 bottom-0 left-0 rounded-full transition-[right] motion-reduce:transition-none",
        filled ? "right-0" : "right-full",
        className,
      )}
    />
  );
}

function Footnote({
  from,
  to,
  className,
}: {
  from: string;
  to: string;
  className: string;
}) {
  return (
    <div className={cn("mt-3 flex justify-between gap-4 text-[14.5px]", className)}>
      <span>{from}</span>
      <span>{to}</span>
    </div>
  );
}
