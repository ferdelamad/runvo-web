import { ParallaxBlob } from "@/components/motion/parallax-blob";
import { Reveal } from "@/components/motion/reveal";
import { SectionLift } from "@/components/motion/section-lift";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/lib/dictionary";
import { HandoffDemo } from "./handoff-demo";

/**
 * The section with the most shipped, checkable material behind it. A solo
 * owner's fear isn't "will it work" — it's "will it embarrass me in front of a
 * client" — so this is written as facts about the product, and the demo is the
 * moment it doesn't know something.
 */
export function Trust({ dict }: { dict: Dictionary }) {
  const { trust } = dict;

  return (
    <SectionLift
      id="trust"
      className="bg-sage-700 text-cream-50 relative overflow-hidden rounded-[32px] px-5 py-20 sm:px-8 lg:rounded-[44px] lg:py-[104px]"
    >
      <ParallaxBlob
        speed={-0.14}
        className="bg-sage-600 top-[-120px] right-[-40px] z-0 h-[300px] w-[300px]"
      />

      <div className="relative z-1 mx-auto max-w-[1180px]">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading
              tone="sage"
              eyebrow={trust.eyebrow}
              title={trust.title}
              lede={trust.body}
            />

            <ul className="m-0 mt-10 grid list-none gap-x-8 gap-y-6 p-0 sm:grid-cols-2">
              {trust.rules.map((rule, index) => (
                <Reveal as="li" key={rule.lead} delay={80 + index * 60} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="bg-sage-200 text-sage-700 mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-[13px] font-extrabold"
                  >
                    ✓
                  </span>
                  <p className="m-0 text-[16px] leading-[1.5] text-pretty">
                    <strong className="text-cream-50 font-extrabold">{rule.lead}</strong>{" "}
                    <span className="text-sage-100">{rule.rest}</span>
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={120} className="lg:pt-2">
            <HandoffDemo demo={trust.demo} />
          </Reveal>
        </div>

        <div className="border-sage-600 mt-16 grid gap-10 border-t pt-10 sm:grid-cols-3 sm:gap-6 lg:mt-20 lg:pt-12">
          {trust.proof.map((item, index) => (
            <Reveal key={item.label} delay={index * 90}>
              <div className="text-cream-50 text-[64px] leading-[0.9] font-light tracking-[-0.04em] sm:text-[80px]">
                {item.value}
              </div>
              <p className="text-sage-100 mt-4 mb-0 max-w-[16em] text-[15px] leading-[1.4]">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionLift>
  );
}
