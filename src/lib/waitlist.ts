export type WaitlistSignup = {
  email: string;
  /** Where on the page the signup came from, for later attribution. */
  source: string;
  submittedAt: string;
};

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
};

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
