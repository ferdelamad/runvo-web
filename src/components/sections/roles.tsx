import { Reveal } from "@/components/motion/reveal";
import { SectionLift } from "@/components/motion/section-lift";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { Dictionary, Role } from "@/lib/dictionary";
import { AssistantDemo } from "./assistant-demo";

export function Roles({ dict }: { dict: Dictionary }) {
  const { roles } = dict;

  return (
    <SectionLift
      id="roles"
      className="bg-cream-300 relative rounded-[32px] px-5 py-20 sm:px-8 lg:rounded-[44px] lg:py-[104px]"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal
          as="h2"
          className="font-display mt-0 mb-10 text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:mb-12 lg:text-[56px]"
        >
          {roles.title}
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="flex flex-col gap-[18px]">
            {roles.items.map((role, index) => (
              <Reveal key={role.name} delay={index * 80}>
                <RoleCard role={role} badges={roles.badges} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="lg:sticky lg:top-[110px]">
            <AssistantDemo dict={dict} />
            <p className="text-ink-700 mx-1 mt-4 mb-0 text-[14.5px] leading-[1.45]">
              {roles.integrations}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionLift>
  );
}

function RoleCard({
  role,
  badges,
}: {
  role: Role;
  badges: Dictionary["roles"]["badges"];
}) {
  const available = role.status === "available";

  return (
    <article
      className={cn(
        "rounded-[28px] px-8 py-[30px]",
        available
          ? "bg-cream-50 shadow-[0_3px_10px_rgba(46,43,37,0.10)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(46,43,37,0.18)]"
          : "border-cream-500 border-[1.5px] border-dashed bg-transparent",
      )}
    >
      <div className="mb-3 flex flex-wrap items-baseline gap-3.5">
        <h3
          className={cn(
            "font-display m-0 text-[26px] font-normal sm:text-[30px]",
            !available && "text-ink-700",
          )}
        >
          {role.name}
        </h3>
        {role.price && (
          <span className="text-clay-700 text-[17px] font-bold">{role.price}</span>
        )}
        <span
          className={cn(
            "rounded-full px-3 py-[5px] text-[12.5px] font-extrabold tracking-[0.06em]",
            available ? "text-sage-700 bg-sage-100" : "text-ink-700 bg-cream-400",
          )}
        >
          {available ? badges.available : badges.soon}
        </span>
      </div>

      <p
        className={cn(
          "mt-0 mb-5 text-[17.5px] leading-[1.5] text-pretty",
          available ? "text-ink-800" : "text-ink-700",
        )}
      >
        {role.body}
      </p>

      <ButtonLink href="#waitlist" variant={available ? "primary" : "outline"}>
        {role.cta}
      </ButtonLink>
    </article>
  );
}
