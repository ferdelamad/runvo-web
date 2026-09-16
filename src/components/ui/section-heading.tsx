import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, WordReveal } from "@/components/motion/word-reveal";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark" | "sage";

const tones: Record<Tone, { eyebrow: string; title: string; lede: string }> = {
  light: { eyebrow: "text-clay-700", title: "text-ink-950", lede: "text-ink-700" },
  dark: { eyebrow: "text-clay-300", title: "text-cream-50", lede: "text-cream-400" },
  sage: { eyebrow: "text-sage-200", title: "text-cream-50", lede: "text-sage-100" },
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: Tone;
  align?: "left" | "center";
  /** `lg` is the 60px headline the dark panels use. */
  size?: "md" | "lg";
  className?: string;
  titleClassName?: string;
  ledeClassName?: string;
};

/**
 * Eyebrow, word-by-word headline, deck. Every section opens the same way so
 * the reader learns the rhythm once.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  size = "md",
  className,
  titleClassName,
  ledeClassName,
}: SectionHeadingProps) {
  const t = tones[tone];
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow className={t.eyebrow}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <WordReveal
        text={title}
        className={cn(
          "font-display mt-0 text-[34px] leading-[1.05] tracking-[-0.02em] text-balance sm:text-[44px]",
          size === "lg" ? "lg:text-[60px]" : "lg:text-[56px]",
          lede ? "mb-5" : "mb-0",
          centered ? "mx-auto max-w-[16em]" : "max-w-[15em]",
          t.title,
          titleClassName,
        )}
      />

      {lede && (
        <Reveal
          as="p"
          delay={70}
          className={cn(
            "mt-0 mb-0 max-w-[34em] text-[17px] leading-[1.5] text-pretty sm:text-[19px]",
            centered && "mx-auto",
            t.lede,
            ledeClassName,
          )}
        >
          {lede}
        </Reveal>
      )}
    </div>
  );
}
