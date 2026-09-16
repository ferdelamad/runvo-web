import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

/**
 * The proof band.
 *
 * The composition is the diagonal: each figure sits lower than the one before
 * it, so three numbers read as a descent rather than a row of equal brags. It
 * flattens on a phone, where a stagger is indistinguishable from broken spacing.
 *
 * The numerals are set in the body face at a low weight, not the display face —
 * Caprasimo is drawn for 40–60px headlines and reads as a toy at this size,
 * while Figtree at 300 with tight tracking gives the thin, oversized figures the
 * layout depends on.
 */
const DESCENT = ["sm:mt-0", "sm:mt-10", "sm:mt-20"];

export function Stats({ dict }: { dict: Dictionary }) {
  const { stats } = dict;

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-20 pb-5 sm:px-8 lg:pt-[104px]">
      <SectionHeading
        align="center"
        eyebrow={stats.eyebrow}
        title={stats.title}
        className="mb-14 lg:mb-[72px]"
        titleClassName="mb-3.5!"
        ledeClassName="text-[17px]!"
        lede={`${stats.lede}*`}
      />

      <div className="grid gap-12 sm:grid-cols-3 sm:gap-6 lg:gap-9">
        {stats.items.map((stat, index) => (
          <Reveal
            key={stat.label}
            /* Revealed along the diagonal, so the motion follows the composition. */
            delay={index * 90}
            className={cn("min-w-0", DESCENT[index])}
          >
            <div className="text-ink-950 flex items-start text-[clamp(64px,13vw,132px)] leading-[0.82] font-light tracking-[-0.045em]">
              {stat.value}
              {stat.plus && (
                <span
                  aria-hidden
                  className="text-clay-500 mt-[0.35em] text-[0.3em] leading-none font-normal"
                >
                  +
                </span>
              )}
            </div>
            <p className="text-ink-700 mt-5 mb-0 max-w-[15em] text-[15px] leading-[1.38]">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal
        as="p"
        delay={280}
        className="text-ink-600 mt-14 mb-0 max-w-[40em] text-[13.5px] leading-[1.45] lg:mt-[72px]"
      >
        <span aria-hidden className="text-clay-600 font-bold">
          *
        </span>{" "}
        {stats.footnote}
      </Reveal>
    </section>
  );
}
