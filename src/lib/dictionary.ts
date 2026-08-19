import type { Locale } from "@/lib/i18n";

/**
 * The shape of one language's page. Every string a visitor can read lives in a
 * dictionary — `dictionaries/en.ts` and `dictionaries/es.ts` — so the two
 * versions stay structurally identical while the words are written separately.
 * The Spanish one is written, not translated.
 */

export type ChatSide = "in" | "out";

export type ChatMessage = {
  side: ChatSide;
  text: string;
};

export type LifecycleStage = {
  label: string;
  /** The single stage the owner still does themselves. */
  isYou?: boolean;
};

export type Role = {
  name: string;
  price: string | null;
  status: "available" | "soon";
  body: string;
  cta: string;
};

export type Dictionary = {
  /** Mirrors the file's locale; components need it for nested `lang` attributes. */
  locale: Locale;
  meta: {
    tagline: string;
    description: string;
    keywords: string[];
  };
  common: {
    skipToContent: string;
    navLabel: string;
    footerNavLabel: string;
    languageLabel: string;
    menuLabel: string;
    joinShort: string;
    join: string;
  };
  navLinks: { href: string; label: string }[];
  hero: {
    badge: string;
    /** Two lines so the display face can break where the copy wants it to. */
    titleLines: [string, string];
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    proofPoints: string[];
  };
  frontDesk: {
    thread: ChatMessage[];
    contact: string;
    initials: string;
    channel: string;
    badge: string;
    bookedTitle: string;
    bookedDetail: string;
    footnote: string;
  };
  problem: {
    title: string;
    body: [string, string];
    punchline: string;
    bars: {
      slow: { label: string; value: string; from: string; to: string };
      fast: { label: string; value: string; from: string; to: string };
    };
  };
  stats: {
    items: { value: string; label: string }[];
    pendingChip: string;
    measuredChip: string;
    closer: string;
  };
  lifecycle: {
    title: string;
    stages: LifecycleStage[];
    youLabel: string;
    closer: { yours: string; runvo: string };
  };
  roles: {
    title: string;
    items: Role[];
    badges: { available: string; soon: string };
    integrations: string;
    assistantHeader: string;
    /** Owner-facing thread beside the cards. `out` is the owner texting in. */
    assistantThread: ChatMessage[];
  };
  trust: {
    title: string;
    body: string;
    chips: string[];
    demoTitle: string;
    ask: string;
    reply: string;
    handoffStrong: string;
    handoffRest: string;
  };
  pricing: {
    title: string;
    tiers: { name: string; price: string; note: string; featured: boolean }[];
    perMonth: string;
    closer: string;
  };
  waitlist: {
    title: string;
    lede: string;
    promises: string[];
    emailLabel: string;
    placeholder: string;
    submit: string;
    submitting: string;
    success: string;
    errors: Record<WaitlistErrorCode, string>;
  };
  footer: {
    legal: string;
  };
};

/**
 * The Server Action can't read the request locale, so it answers with a code
 * and the form — which knows its own language — picks the sentence.
 */
export type WaitlistErrorCode = "invalid-email" | "save-failed";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.en),
  es: () => import("./dictionaries/es").then((module) => module.es),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
