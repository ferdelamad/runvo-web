import { cn } from "@/lib/cn";

const sizes = {
  sm: { dot: "h-6 w-6", text: "text-[20px]" },
  md: { dot: "h-[30px] w-[30px]", text: "text-[25px]" },
} as const;

export function Wordmark({ size = "md" }: { size?: keyof typeof sizes }) {
  const { dot, text } = sizes[size];

  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden className={cn("bg-clay-500 block rounded-full", dot)} />
      <span className={cn("font-display tracking-[-0.01em]", text)}>Runvo</span>
    </span>
  );
}
