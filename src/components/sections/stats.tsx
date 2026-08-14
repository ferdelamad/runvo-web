import { Reveal } from "@/components/motion/reveal";
import { stats, statsPending } from "@/lib/content";

const CLOSER = "Runvo answers in seconds. Every channel. Even at 9pm.";

/**
 * Real numbers from one real business, or an honest placeholder until the
 * two-week inquiry count lands. Flip `statsPending` in `lib/content.ts`.
 */
export function Stats() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-20 pb-5 sm:px-8 lg:pt-[104px]">
      <Reveal className="grid gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={
              statsPending
                ? "border-cream-500 bg-cream-50 rounded-[28px] border-[1.5px] border-dashed p-[30px]"
                : "bg-cream-300 rounded-[28px] p-[30px]"
            }
          >
            <div
              className={
                statsPending
                  ? "font-display text-cream-500 text-[46px] leading-none"
                  : "font-display text-clay-700 text-[46px] leading-none lg:text-[60px]"
              }
            >
              {statsPending ? "—" : stat.value}
            </div>
            <div
              className={`mt-3 text-base leading-[1.4] ${statsPending ? "text-ink-700" : "text-ink-800"}`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal
        delay={80}
        className="mt-[22px] flex flex-wrap items-baseline gap-x-5 gap-y-3"
      >
        <span className="text-sage-600 bg-sage-100 rounded-full px-[15px] py-[7px] text-[15px] font-bold">
          {statsPending
            ? "Counting now — two weeks, one Vacaville studio"
            : "Measured in one Vacaville studio, two weeks"}
        </span>
        <span className="text-ink-800 text-[17px]">{CLOSER}</span>
      </Reveal>
    </section>
  );
}
