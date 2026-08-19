import { ParallaxBlob } from "@/components/motion/parallax-blob";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { DotList } from "@/components/ui/dot-list";
import type { Dictionary } from "@/lib/dictionary";
import { FrontDeskDemo } from "./front-desk-demo";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pt-14 lg:pb-24"
    >
      <div>
        <Reveal className="bg-cream-300 border-cream-400 text-ink-700 mb-6 inline-flex items-center gap-[9px] rounded-full border py-[7px] pr-4 pl-2.5 text-sm font-semibold">
          <span aria-hidden className="bg-sage-400 block h-2 w-2 rounded-full" />
          {hero.badge}
        </Reveal>

        <Reveal
          as="h1"
          delay={60}
          className="font-display mt-0 mb-6 text-[42px] leading-[0.98] tracking-[-0.025em] text-balance sm:text-[58px] lg:text-[78px]"
        >
          {hero.titleLines[0]} <br className="hidden sm:inline" />
          {hero.titleLines[1]}
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="text-ink-800 mb-8 max-w-[30em] text-[19px] leading-[1.5] text-pretty sm:text-[21px]"
        >
          {hero.lede}
        </Reveal>

        <Reveal delay={180} className="mb-[30px] flex flex-wrap gap-3.5">
          <ButtonLink href="#waitlist" size="lg">
            {hero.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="#how" variant="outline" size="lg">
            {hero.ctaSecondary}
          </ButtonLink>
        </Reveal>

        <Reveal delay={240}>
          <DotList
            items={hero.proofPoints}
            className="text-ink-700 text-[15px] font-medium"
          />
        </Reveal>
      </div>

      <Reveal delay={140} className="relative">
        <ParallaxBlob
          speed={-0.1}
          className="bg-sage-100 -top-12 -right-[70px] z-0 h-80 w-80"
        />
        <ParallaxBlob
          speed={0.14}
          className="bg-clay-100 bottom-5 -left-[46px] z-0 h-[150px] w-[150px]"
        />
        <FrontDeskDemo dict={dict} />
      </Reveal>
    </section>
  );
}
