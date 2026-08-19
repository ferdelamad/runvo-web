import { ParallaxBlob } from "@/components/motion/parallax-blob";
import { Reveal } from "@/components/motion/reveal";
import { SectionLift } from "@/components/motion/section-lift";
import type { Dictionary } from "@/lib/dictionary";
import { ResponseBars } from "./response-bars";

export function Problem({ dict }: { dict: Dictionary }) {
  const { problem } = dict;

  return (
    <SectionLift className="bg-ink-900 text-cream-50 relative overflow-hidden rounded-[32px] px-5 py-20 sm:px-8 lg:rounded-[44px] lg:py-[110px]">
      <ParallaxBlob speed={-0.16} className="bg-ink-800 top-[-110px] right-[6%] z-0 h-[260px] w-[260px]" />

      <div className="relative z-1 mx-auto max-w-[1180px]">
        <Reveal
          as="h2"
          className="font-display mt-0 mb-8 max-w-[15em] text-[34px] leading-[1.02] tracking-[-0.02em] text-balance sm:text-[44px] lg:mb-[34px] lg:text-[60px]"
        >
          {problem.title}
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal
              as="p"
              delay={80}
              className="text-cream-400 mt-0 mb-[22px] max-w-[32em] text-[18px] leading-[1.55] text-pretty sm:text-[20px]"
            >
              {problem.body[0]}
            </Reveal>
            <Reveal
              as="p"
              delay={140}
              className="text-cream-400 mt-0 mb-[34px] max-w-[32em] text-[18px] leading-[1.55] text-pretty sm:text-[20px]"
            >
              {problem.body[1]}
            </Reveal>
            <Reveal
              as="p"
              delay={200}
              className="font-display text-clay-300 m-0 max-w-[15em] text-[24px] leading-[1.25] sm:text-[29px]"
            >
              {problem.punchline}
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ResponseBars bars={problem.bars} />
          </Reveal>
        </div>
      </div>
    </SectionLift>
  );
}
