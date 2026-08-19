import { Reveal } from "@/components/motion/reveal";
import { DotList } from "@/components/ui/dot-list";
import type { Dictionary } from "@/lib/dictionary";
import { WaitlistForm } from "./waitlist-form";

export function Waitlist({ dict }: { dict: Dictionary }) {
  const { waitlist } = dict;

  return (
    <section id="waitlist" className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-[110px]">
      <div className="bg-cream-300 relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-14 sm:py-16">
        <div
          aria-hidden
          className="bg-sage-100 rv-animated pointer-events-none absolute -top-20 -right-[60px] h-[300px] w-[300px] rounded-full"
          style={{ animation: "rv-float 9s ease-in-out infinite" }}
        />

        <div className="relative max-w-[34em]">
          <Reveal
            as="h2"
            className="font-display mt-0 mb-5 text-[40px] leading-none tracking-[-0.02em] sm:text-[52px] lg:text-[64px]"
          >
            {waitlist.title}
          </Reveal>

          <Reveal
            as="p"
            delay={70}
            className="text-ink-800 mt-0 mb-[30px] text-[18px] leading-[1.5] sm:text-[20px]"
          >
            {waitlist.lede}
          </Reveal>

          <WaitlistForm copy={waitlist} />

          <DotList
            items={waitlist.promises}
            className="text-ink-700 text-[15px] font-medium"
          />
        </div>
      </div>
    </section>
  );
}
