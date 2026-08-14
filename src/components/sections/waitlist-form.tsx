"use client";

import { useActionState } from "react";

import { joinWaitlist } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { initialWaitlistState } from "@/lib/waitlist";

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialWaitlistState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="bg-sage-100 border-sage-200 mb-[22px] flex items-center gap-3.5 rounded-[28px] border px-[26px] py-[18px] sm:rounded-full"
      >
        <span aria-hidden className="bg-sage-500 block h-[22px] w-[22px] flex-none rounded-full" />
        <span className="text-sage-700 text-[17px] font-semibold">
          You&rsquo;re on the list. I&rsquo;ll write to you myself this week.
        </span>
      </div>
    );
  }

  return (
    <div className="mb-[22px]">
      <form action={formAction} className="relative flex flex-wrap gap-3">
        <label htmlFor="waitlist-email" className="sr-only">
          Your email
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@yourbusiness.com"
          aria-invalid={state.status === "error" || undefined}
          aria-describedby={state.status === "error" ? "waitlist-error" : undefined}
          className="border-cream-500 bg-cream-50 text-ink-950 flex-[1_1_280px] rounded-full border-[1.5px] px-[22px] py-4 text-[17px]"
        />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />

        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Joining…" : "Join the waitlist"}
        </Button>
      </form>

      {state.status === "error" && (
        <p id="waitlist-error" role="alert" className="text-clay-700 mt-3 mb-0 text-[15px] font-semibold">
          {state.message}
        </p>
      )}
    </div>
  );
}
