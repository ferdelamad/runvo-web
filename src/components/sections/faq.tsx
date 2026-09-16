import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";

/**
 * Native `<details>`, so every answer opens without JavaScript and search
 * engines can read all of them. The heading sits beside the list rather than
 * above it, which keeps six questions from becoming a wall.
 */
export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;

  return (
    <section id="faq" className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-[104px]">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} lede={faq.lede} />

        <div className="border-cream-400 divide-cream-400 divide-y border-y">
          {faq.items.map((item, index) => (
            <Reveal key={item.q} delay={index * 50}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold text-pretty sm:text-[20px] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="border-cream-500 text-ink-700 group-hover:border-clay-700 group-hover:text-clay-700 flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] text-lg leading-none transition-[transform,border-color,color] duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-ink-700 mt-3 mb-0 max-w-[40em] text-[16.5px] leading-[1.55] text-pretty">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
