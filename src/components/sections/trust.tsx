import { Reveal } from "@/components/motion/reveal";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { trustChips } from "@/lib/content";

export function Trust() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-[104px]">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal
            as="h2"
            className="font-display mt-0 mb-[26px] text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:text-[56px]"
          >
            It answers. It doesn&rsquo;t guess.
          </Reveal>

          <Reveal
            as="p"
            delay={80}
            className="text-ink-800 mt-0 mb-7 text-[18px] leading-[1.55] text-pretty sm:text-[20px]"
          >
            Runvo works from your real prices, your real services, and your real
            calendar. When something falls outside what you&rsquo;ve set, it stops and
            hands the conversation to you instead of making one up.
          </Reveal>

          <Reveal delay={140} className="flex flex-wrap gap-2.5">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="text-sage-700 bg-sage-100 border-sage-200 rounded-full border px-[17px] py-[9px] text-[15px] font-semibold"
              >
                {chip}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={120}
          className="bg-cream-50 rounded-[28px] p-[26px] shadow-[0_3px_10px_rgba(46,43,37,0.12)]"
        >
          <div className="text-ink-600 mb-4 text-[12.5px] font-extrabold tracking-[0.06em]">
            WHEN IT DOESN&rsquo;T KNOW
          </div>

          <div className="flex flex-col gap-2.5">
            <ChatBubble
              visible
              className="bg-cream-200 border-cream-400 max-w-[84%] self-start rounded-[18px_18px_18px_6px] border"
            >
              <span lang="es">Hacen microblading? Cuánto sale?</span>
            </ChatBubble>
            <ChatBubble
              visible
              className="bg-clay-500 text-clay-50 max-w-[88%] self-end rounded-[18px_18px_6px_18px]"
            >
              <span lang="es">Déjame confirmarlo con Yaz y te digo en un momento.</span>
            </ChatBubble>

            <div className="bg-clay-100 border-clay-200 mt-1 flex items-center gap-2.5 rounded-2xl border px-3.5 py-3">
              <span aria-hidden className="bg-clay-600 block h-5 w-5 flex-none rounded-full" />
              <p className="text-clay-900 m-0 text-sm leading-[1.35]">
                <strong className="font-extrabold">Handed to you</strong> — microblading
                isn&rsquo;t on your service list.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
