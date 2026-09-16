import { Reveal } from "@/components/motion/reveal";
import { SectionLift } from "@/components/motion/section-lift";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import type { Dictionary, Role, Scene } from "@/lib/dictionary";
import { ClientChatDemo } from "./client-chat-demo";
import { NudgeDemo } from "./nudge-demo";
import { OwnerChatDemo } from "./owner-chat-demo";
import { SceneRail } from "./scene-rail";

/**
 * "What it does": the three roles named and priced, then a rail of outcome
 * cards where each role is shown doing its job rather than described. This is
 * the section the pricing argument used to carry on its own.
 */
export function Scenes({ dict }: { dict: Dictionary }) {
  const { roles } = dict;

  return (
    <SectionLift
      id="roles"
      className="rv-rail-scope bg-cream-300 relative rounded-[32px] py-20 lg:rounded-[44px] lg:py-[104px]"
    >
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHeading eyebrow={roles.eyebrow} title={roles.title} lede={roles.lede} />

        <div className="mt-12 mb-14 grid gap-4 sm:grid-cols-3 lg:mb-16">
          {roles.items.map((role, index) => (
            <Reveal key={role.name} delay={index * 70}>
              <RoleCard role={role} badges={roles.badges} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={100}>
        <SceneRail
          count={roles.scenes.length}
          labels={{ rail: roles.railLabel, prev: roles.prev, next: roles.next }}
        >
          {roles.scenes.map((scene, index) => (
            <SceneCard
              key={index}
              scene={scene}
              role={roles.items[scene.role]}
              badges={roles.badges}
            />
          ))}
        </SceneRail>
      </Reveal>

      <p className="text-ink-700 mx-auto mt-8 mb-0 max-w-[1180px] px-5 text-[14.5px] leading-[1.45] sm:px-8">
        {roles.integrations}
      </p>
    </SectionLift>
  );
}

function RoleCard({ role, badges }: { role: Role; badges: Dictionary["roles"]["badges"] }) {
  const available = role.status === "available";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[24px] px-6 py-6",
        available
          ? "bg-cream-50 shadow-[0_3px_10px_rgba(46,43,37,0.08)]"
          : "border-cream-500 border-[1.5px] border-dashed",
      )}
    >
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
        <h3
          className={cn(
            "font-display m-0 text-[24px] font-normal",
            !available && "text-ink-700",
          )}
        >
          {role.name}
        </h3>
        {role.price && <span className="text-clay-700 text-[15.5px] font-bold">{role.price}</span>}
      </div>
      <span
        className={cn(
          "mb-3.5 w-fit rounded-full px-2.5 py-1 text-[11.5px] font-extrabold tracking-[0.06em]",
          available ? "text-sage-700 bg-sage-100" : "text-ink-700 bg-cream-400",
        )}
      >
        {available ? badges.available : badges.soon}
      </span>
      <p
        className={cn(
          "mt-0 mb-4 text-[15.5px] leading-[1.5] text-pretty",
          available ? "text-ink-800" : "text-ink-700",
        )}
      >
        {role.body}
      </p>
      <a
        href="#waitlist"
        className="text-clay-700 hover:text-clay-900 mt-auto w-fit text-[15px] font-bold underline-offset-4 hover:underline"
      >
        {role.cta} →
      </a>
    </article>
  );
}

function SceneCard({
  scene,
  role,
  badges,
}: {
  scene: Scene;
  role: Role;
  badges: Dictionary["roles"]["badges"];
}) {
  const { demo } = scene;
  const dark = demo.kind === "owner-chat" || demo.kind === "nudge";
  const soon = demo.kind === "soon";

  return (
    <li className="w-[min(84vw,420px)] flex-none snap-start">
      <article
        className={cn(
          "flex h-full flex-col rounded-[28px] p-6 sm:p-7",
          dark && "bg-ink-900 text-cream-50 shadow-[0_12px_32px_rgba(46,43,37,0.22)]",
          !dark && !soon && "bg-cream-50 text-ink-950 shadow-[0_12px_32px_rgba(46,43,37,0.14)]",
          soon && "border-cream-500 text-ink-700 border-[1.5px] border-dashed",
        )}
      >
        <div
          className={cn(
            "mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] font-extrabold tracking-[0.06em] uppercase",
            dark ? "text-cream-500" : "text-ink-600",
          )}
        >
          <span>{role.name}</span>
          {role.price ? (
            <>
              <span aria-hidden className="opacity-50">
                ·
              </span>
              <span className={dark ? "text-clay-300" : "text-clay-700"}>{role.price}</span>
            </>
          ) : (
            <span className="text-ink-700 bg-cream-400 rounded-full px-2.5 py-1 text-[11px]">
              {badges.soon}
            </span>
          )}
        </div>

        <h3 className="font-display m-0 text-[25px] leading-[1.12] font-normal text-balance sm:text-[27px]">
          {scene.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 mb-0 text-[15px] leading-[1.5] text-pretty",
            dark ? "text-cream-400" : "text-ink-700",
          )}
        >
          {scene.body}
        </p>

        <div className="mt-6 flex h-[420px] flex-col justify-end">
          {demo.kind === "client-chat" && (
            <ClientChatDemo chat={demo} frame={false} />
          )}
          {demo.kind === "owner-chat" && <OwnerChatDemo thread={demo.thread} />}
          {demo.kind === "nudge" && (
            <NudgeDemo header={demo.header} link={demo.link} steps={demo.steps} />
          )}
          {demo.kind === "soon" && <SoonSketch />}
        </div>
      </article>
    </li>
  );
}

/** A ghost of the feed the Marketer will fill — three posts, not yet written. */
function SoonSketch() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className="border-cream-500 flex items-center gap-3 rounded-[18px] border-[1.5px] border-dashed p-3"
        >
          <span className="bg-cream-400/60 block h-12 w-12 flex-none rounded-[12px]" />
          <div className="flex flex-1 flex-col gap-2">
            <span className="bg-cream-400/60 block h-2.5 w-3/4 rounded-full" />
            <span className="bg-cream-400/40 block h-2.5 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
