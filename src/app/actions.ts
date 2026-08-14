"use server";

import { saveWaitlistSignup, type WaitlistState } from "@/lib/waitlist";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Server Actions are reachable by direct POST, not only through the form, so
 * everything is validated here rather than relying on the browser.
 */
export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: a real visitor never fills a hidden field. Answer as if it worked
  // so the bot has nothing to tune against.
  if (formData.get("company")) {
    return { status: "success" };
  }

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL.test(email) || email.length > 254) {
    return {
      status: "error",
      message: "That address doesn't look right — mind checking it?",
    };
  }

  try {
    await saveWaitlistSignup({
      email,
      source: String(formData.get("source") ?? "waitlist"),
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[waitlist] failed to save signup", error);
    return {
      status: "error",
      message: "Something broke on our end. Try again, or write to hola@runvo.io.",
    };
  }

  return { status: "success" };
}
