import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/dictionary";
import { statsPending } from "@/lib/site";

/**
 * Real numbers from one real business, or an honest placeholder until the
 * two-week inquiry count lands. Flip `statsPending` in `lib/site.ts`.
 */
export function Stats({ dict }: { dict: Dictionary }) {
  const { stats } = dict;

  return (
    <section className="mx-auto max-w-[1180px] px-5 pt-20 pb-5 sm:px-8 lg:pt-[104px]">
      <Reveal className="grid gap-5 sm:grid-cols-3">
        {stats.items.map((stat) => (
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
          {statsPending ? stats.pendingChip : stats.measuredChip}
        </span>
        <span className="text-ink-800 text-[17px]">{stats.closer}</span>
      </Reveal>
    </section>
  );
}
