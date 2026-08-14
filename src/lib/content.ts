/**
 * Structured page content. Copy that repeats or renders from a list lives here
 * so it can be edited in one place (and localized later); one-off prose stays
 * inline in the section components where its markup matters.
 */

export type ChatSide = "in" | "out";

export type ChatMessage = {
  side: ChatSide;
  text: string;
};

/** Client-facing WhatsApp thread in the hero. */
export const frontDeskThread: ChatMessage[] = [
  { side: "in", text: "Hola! Tienes espacio mañana para lash fill?" },
  {
    side: "out",
    text: "¡Hola Ana! Sí — mañana tengo 11:00 am o 4:30 pm. El fill son $65 y toma una hora.",
  },
  { side: "in", text: "4:30 porfa" },
  {
    side: "out",
    text: "Listo. Te aparté mañana 4:30 pm. Te mando el recordatorio esta noche.",
  },
];

/** Owner-facing thread beside the role cards. `out` is the owner texting in. */
export const assistantThread: ChatMessage[] = [
  { side: "out", text: "métele a Ana mañana 4:30, lash fill" },
  { side: "in", text: "Hecho — jueves 4:30 pm, Ana R., lash fill, $65." },
  {
    side: "in",
    text: "Tu jueves tiene tres huecos entre 12 y 4. ¿Le escribo a las que no han reagendado desde junio?",
  },
  { side: "out", text: "sí, a las de junio nada más" },
];

/**
 * Stats band. Numbers come from the two-week inquiry count in the pilot studio.
 * Until it lands, `statsPending` renders the empty-but-honest variant.
 */
export const statsPending = true;

export const stats = [
  {
    value: "61%",
    label: "of inquiries waited more than twelve hours for a reply",
  },
  { value: "28%", label: "never got a reply at all" },
  { value: "3.4×", label: "book rate for fast replies versus slow ones" },
] as const;

/** Appointment lifecycle. Exactly one stage is the owner's own work. */
export type LifecycleStage = {
  label: string;
  /** The single stage the owner still does herself. */
  isYou?: boolean;
};

export const lifecycleStages: LifecycleStage[] = [
  { label: "Discovered" },
  { label: "Asked" },
  { label: "Booked" },
  { label: "Reminded" },
  { label: "Served", isYou: true },
  { label: "Followed up" },
  { label: "Rebooked" },
];

export type Role = {
  name: string;
  price: string | null;
  status: "available" | "soon";
  body: string;
  cta: string;
};

export const roles: Role[] = [
  {
    name: "Front Desk",
    price: "from $149/mo",
    status: "available",
    body: "Answers WhatsApp, Instagram and text — in Spanish or English, in seconds. Quotes your prices, books into your calendar, sends the reminder, follows up with the ones who went quiet, and asks for the review afterward.",
    cta: "Add to waitlist",
  },
  {
    name: "Assistant",
    price: "$99/mo",
    status: "available",
    body: "Works for you, not your clients. Text it to book someone in. Ask what tomorrow looks like. It flags the gaps in your week before they become empty hours.",
    cta: "Add to waitlist",
  },
  {
    name: "Marketer",
    price: null,
    status: "soon",
    body: "Keeps you visible while your hands are busy. Posts, content, and the nudges that bring past clients back.",
    cta: "Notify me",
  },
];

export const pricingTiers = [
  {
    name: "Front Desk",
    price: "from $149",
    note: "Priced by how many inboxes you run — not by which platform.",
    featured: false,
  },
  {
    name: "Assistant",
    price: "$99",
    note: "The one that works for you instead of your clients.",
    featured: false,
  },
  {
    name: "Both",
    price: "$199",
    note: "Your front desk and your assistant, hired together.",
    featured: true,
  },
] as const;

export const trustChips = [
  "Nobody is being replaced, because nobody was ever there",
  "You set what it can say",
  "You can turn it off in one tap",
] as const;
