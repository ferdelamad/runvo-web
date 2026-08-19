import type { WaitlistErrorCode } from "@/lib/dictionary";

export type WaitlistSignup = {
  email: string;
  /** Where on the page the signup came from, for later attribution. */
  source: string;
  submittedAt: string;
};

/**
 * The action runs on the server, where the page's language isn't in scope, so
 * failures come back as a code and the form renders it in its own language.
 */
export type WaitlistState =
  | { status: "idle" | "success" }
  | { status: "error"; error: WaitlistErrorCode };

export const initialWaitlistState: WaitlistState = { status: "idle" };

/**
 * The one place waitlist signups are persisted.
 *
 * For the first ten businesses this needs to notify the founder personally —
 * the follow-up is a real conversation and a real invoice, not an autoresponder.
 * Swap the body for a Resend email, an Airtable row, or a Postgres insert; the
 * calling Server Action doesn't change. Throw to surface an error to the visitor.
 */
export async function saveWaitlistSignup(signup: WaitlistSignup): Promise<void> {
  console.info("[waitlist] signup", signup);
}
