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
 * For the first ten businesses this needs to reach the founder personally —
 * the follow-up is a real conversation and a real invoice, not an autoresponder.
 * Two zero-dependency backends, picked by environment variable; both may be on:
 *
 * - `WAITLIST_WEBHOOK_URL` — the signup is POSTed as JSON. Works with Zapier,
 *   Make, n8n, a Slack incoming webhook, or anything that takes a POST.
 * - `RESEND_API_KEY` + `WAITLIST_NOTIFY_EMAIL` (+ optional `WAITLIST_FROM_EMAIL`)
 *   — an email per signup through Resend's HTTP API.
 *
 * With neither set it logs, so a dev build never swallows a signup silently.
 * A backend that fails throws, which surfaces as `save-failed` to the visitor.
 */
export async function saveWaitlistSignup(signup: WaitlistSignup): Promise<void> {
  const backends = [postWebhook, sendEmail]
    .map((backend) => backend(signup))
    .filter((job): job is Promise<void> => job !== null);

  if (backends.length === 0) {
    console.info("[waitlist] signup (no backend configured)", signup);
    return;
  }

  const results = await Promise.allSettled(backends);
  const failed = results.find((result) => result.status === "rejected");
  if (failed && failed.status === "rejected") throw failed.reason;
}

function postWebhook(signup: WaitlistSignup): Promise<void> | null {
  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) return null;

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      // Slack incoming webhooks want `text`; everything else gets the fields.
      text: `New waitlist signup: ${signup.email} (${signup.source})`,
      ...signup,
    }),
  }).then((response) => {
    if (!response.ok) throw new Error(`[waitlist] webhook answered ${response.status}`);
  });
}

function sendEmail(signup: WaitlistSignup): Promise<void> | null {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_EMAIL;
  if (!key || !to) return null;

  const from = process.env.WAITLIST_FROM_EMAIL ?? "Runvo <waitlist@runvo.io>";

  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: signup.email,
      subject: `Waitlist: ${signup.email}`,
      text: `${signup.email}\nsource: ${signup.source}\nat: ${signup.submittedAt}`,
    }),
  }).then((response) => {
    if (!response.ok) throw new Error(`[waitlist] resend answered ${response.status}`);
  });
}
