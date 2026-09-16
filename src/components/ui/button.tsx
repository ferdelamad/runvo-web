import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ink";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-full font-bold whitespace-nowrap transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-clay-500 text-clay-50 hover:bg-clay-600",
  outline:
    "border-[1.5px] border-cream-500 text-ink-950 hover:border-clay-700 hover:bg-cream-300",
  /** For the clay closer, where the primary clay would vanish. */
  ink: "bg-ink-900 text-cream-50 hover:bg-ink-800",
};

const sizes: Record<Size, string> = {
  sm: "px-[22px] py-[11px] text-[15px]",
  md: "px-6 py-3 text-[15.5px]",
  lg: "px-[30px] py-4 text-[17px]",
};

/** Only the raised variants cast a shadow, and it grows with size. */
const shadows: Record<Size, string> = {
  sm: "shadow-[0_1px_2px_rgba(46,43,37,0.14)]",
  md: "shadow-[0_1px_2px_rgba(46,43,37,0.14)]",
  lg: "shadow-[0_3px_10px_rgba(46,43,37,0.16)]",
};

type ButtonStyleProps = { variant?: Variant; size?: Size };

function classes({ variant = "primary", size = "md" }: ButtonStyleProps, className?: string) {
  return cn(
    base,
    variants[variant],
    sizes[size],
    variant !== "outline" && shadows[size],
    className,
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"a"> & ButtonStyleProps) {
  return <a className={classes({ variant, size }, className)} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonStyleProps) {
  return (
    <button
      type={type}
      className={cn(
        classes({ variant, size }, className),
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
      )}
      {...props}
    />
  );
}
