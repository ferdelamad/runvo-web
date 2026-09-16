import { ParallaxBlob } from "@/components/motion/parallax-blob";
import { Reveal } from "@/components/motion/reveal";
import { SectionLift } from "@/components/motion/section-lift";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/dictionary";

export function Pricing({ dict }: { dict: Dictionary }) {
  const { pricing } = dict;

  return (
    <SectionLift
      id="pricing"
      className="bg-ink-900 text-cream-50 relative overflow-hidden rounded-[32px] px-5 py-20 sm:px-8 lg:rounded-[44px] lg:py-[104px]"
    >
      <ParallaxBlob
        speed={0.12}
        className="bg-ink-800 bottom-[-90px] left-[-70px] z-0 h-[220px] w-[220px]"
      />

      <div className="relative z-1 mx-auto max-w-[1180px]">
        <SectionHeading
          tone="dark"
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          size="lg"
          className="mb-10 lg:mb-12"
        />

        <div className="mb-8 grid gap-[18px] md:grid-cols-3 lg:mb-[34px]">
          {pricing.tiers.map((tier, index) => (
            <Reveal
              key={tier.name}
              delay={index * 70}
              className={cn(
                "rounded-[28px] p-[30px] transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1",
                tier.featured ? "bg-clay-500 text-clay-50" : "bg-ink-800",
              )}
            >
              <div
                className={cn(
                  "mb-3.5 text-[13px] font-extrabold tracking-[0.07em] uppercase",
                  tier.featured ? "text-clay-100" : "text-cream-500",
                )}
              >
                {tier.name}
              </div>
              <div className="font-display text-[46px] leading-none">
                {tier.price}
                <span
                  className={cn("text-xl", tier.featured ? "text-clay-100" : "text-cream-500")}
                >
                  {pricing.perMonth}
                </span>
              </div>
              <div
                className={cn(
                  "mt-3 text-[15.5px]",
                  tier.featured ? "text-clay-100" : "text-cream-400",
                )}
              >
                {tier.note}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          className="text-cream-400 m-0 max-w-[42em] text-[18px] leading-[1.55] text-pretty sm:text-[20px]"
        >
          {pricing.closer}
        </Reveal>
        <Reveal as="p" delay={60} className="text-cream-500 mt-4 mb-0 text-[14.5px]">
          {pricing.fine}
        </Reveal>
      </div>
    </SectionLift>
  );
}
