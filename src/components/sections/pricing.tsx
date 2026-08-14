import { ParallaxBlob } from "@/components/motion/parallax-blob";
import { Reveal } from "@/components/motion/reveal";
import { SectionLift } from "@/components/motion/section-lift";
import { cn } from "@/lib/cn";
import { pricingTiers } from "@/lib/content";

export function Pricing() {
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
        <Reveal
          as="h2"
          className="font-display mt-0 mb-10 max-w-[14em] text-[34px] leading-[1.03] tracking-[-0.02em] sm:text-[44px] lg:text-[60px]"
        >
          One appointment a month pays for it.
        </Reveal>

        <div className="mb-8 grid gap-[18px] md:grid-cols-3 lg:mb-[34px]">
          {pricingTiers.map((tier, index) => (
            <Reveal
              key={tier.name}
              delay={index * 70}
              className={cn(
                "rounded-[28px] p-[30px]",
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
                  /mo
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
          At $150 an appointment, the Front Desk pays for itself the first time it
          catches one you&rsquo;d have missed. And a client you keep isn&rsquo;t one
          appointment — it&rsquo;s every visit she&rsquo;d have made this year.
        </Reveal>
      </div>
    </SectionLift>
  );
}
