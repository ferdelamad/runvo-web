import { Reveal } from "@/components/motion/reveal";
import { SectionLift } from "@/components/motion/section-lift";
import { WordReveal } from "@/components/motion/word-reveal";
import { DotList } from "@/components/ui/dot-list";
import type { Dictionary } from "@/lib/dictionary";
import { WaitlistForm } from "./waitlist-form";

/** The closer: one full-bleed block of clay, one headline, one field. */
export function Waitlist({ dict }: { dict: Dictionary }) {
  const { waitlist } = dict;

  return (
    <SectionLift
      id="waitlist"
      className="bg-clay-500 text-cream-50 relative overflow-hidden rounded-[32px] px-5 py-20 sm:px-8 lg:rounded-[44px] lg:py-[120px]"
    >
      <div
        aria-hidden
        className="bg-clay-600 rv-animated pointer-events-none absolute -top-24 -right-16 h-[360px] w-[360px] rounded-full"
        style={{ animation: "rv-float 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="bg-clay-600/60 pointer-events-none absolute -bottom-32 left-[8%] h-[260px] w-[260px] rounded-full"
      />

      <div className="relative z-1 mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <WordReveal
            text={waitlist.title}
            className="font-display mt-0 mb-5 text-[56px] leading-[0.95] tracking-[-0.02em] sm:text-[80px] lg:text-[104px]"
          />
          <Reveal
            as="p"
            delay={70}
            className="text-clay-100 mt-0 mb-0 max-w-[26em] text-[18px] leading-[1.5] text-pretty sm:text-[20px]"
          >
            {waitlist.lede}
          </Reveal>
        </div>

        <Reveal delay={120}>
          <WaitlistForm copy={waitlist} />
          <DotList items={waitlist.promises} className="text-clay-100 text-[15px] font-medium" />
        </Reveal>
      </div>
    </SectionLift>
  );
}
