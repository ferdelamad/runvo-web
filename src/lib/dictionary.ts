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

/** A button attached to a message in the owner's Telegram thread. */
export type NudgeButton = {
  label: string;
  /** The quieter of a pair, e.g. "Not today". */
  muted?: boolean;
  /** Spans the whole row instead of half of it. */
  full?: boolean;
  /** The one the owner taps in the demo, which advances to the next step. */
  tap?: boolean;
};

/**
 * One message in a nudge run — the assistant opening a conversation, listing,
 * drafting, and handing the send back. `{link}` in `body` marks where the
 * shortened review or booking URL sits.
 */
export type NudgeStep = {
  title?: string;
  body: string;
  list?: string[];
  buttons?: NudgeButton[];
};

export type Role = {
  name: string;
  price: string | null;
  status: "available" | "soon";
  body: string;
  cta: string;
};

/** A client-side WhatsApp thread, answered by the Front Desk. */
export type ClientChat = {
  contact: string;
  initials: string;
  channel: string;
  thread: ChatMessage[];
};

export type SceneDemo =
  | ({ kind: "client-chat" } & ClientChat)
  /** The owner's own thread. `out` is the owner texting in. */
  | { kind: "owner-chat"; thread: ChatMessage[] }
  /** The assistant opens the conversation; the owner taps through. */
  | { kind: "nudge"; header: string; link: string; steps: NudgeStep[] }
  | { kind: "soon" };

/** One outcome card in the "what it does" rail, carrying its own live demo. */
export type Scene = {
  /** Index into `roles.items` — the card wears that role's name and price. */
  role: number;
  title: string;
  body: string;
  demo: SceneDemo;
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
  frontDesk: ClientChat & {
    badge: string;
    bookedTitle: string;
    bookedDetail: string;
    footnote: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    body: [string, string];
    punchline: string;
    bars: {
      slow: { label: string; value: string; from: string; to: string };
      fast: { label: string; value: string; from: string; to: string };
    };
    /** The money argument, made where the 9pm → 7am story already lands. */
    roi: { line: string; sum: string };
  };
  stats: {
    eyebrow: string;
    title: string;
    lede: string;
    /**
     * `plus` renders the raised + that marks a figure as a floor rather than a
     * measurement — the same job the footnote does, carried typographically.
     */
    items: { value: string; plus: boolean; label: string }[];
    footnote: string;
  };
  lifecycle: {
    eyebrow: string;
    title: string;
    stages: LifecycleStage[];
    youLabel: string;
    closer: { yours: string; runvo: string };
  };
  roles: {
    eyebrow: string;
    title: string;
    lede: string;
    items: Role[];
    badges: { available: string; soon: string };
    integrations: string;
    scenes: Scene[];
    /** Accessible names for the rail and its arrows. */
    railLabel: string;
    prev: string;
    next: string;
  };
  trust: {
    eyebrow: string;
    title: string;
    body: string;
    /** Facts about the product, each with a bold lead and the rest of the line. */
    rules: { lead: string; rest: string }[];
    /** No asterisk needed — these are properties of the product, not outcomes. */
    proof: { value: string; label: string }[];
    demo: {
      clientHeader: string;
      ask: string;
      reply: string;
      ownerHeader: string;
      handoffTitle: string;
      handoffBody: string;
      muted: string;
    };
  };
  pricing: {
    eyebrow: string;
    title: string;
    tiers: { name: string; price: string; note: string; featured: boolean }[];
    perMonth: string;
    closer: string;
    fine: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { q: string; a: string }[];
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
    /** Points at the other locale, written in that locale. */
    otherLanguage: string;
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
