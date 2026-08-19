import type { Dictionary } from "@/lib/dictionary";

export const en: Dictionary = {
  locale: "en",

  meta: {
    tagline: "Runvo staffs businesses of one.",
    description:
      "The front desk, the assistant, and the marketer you could never afford to hire. Runvo answers WhatsApp, Instagram and text in Spanish or English, books into your calendar, and follows up — in seconds.",
    keywords: [
      "AI front desk",
      "WhatsApp booking",
      "salon booking automation",
      "bilingual receptionist",
      "solo business",
    ],
  },

  common: {
    skipToContent: "Skip to content",
    navLabel: "Main",
    footerNavLabel: "Footer",
    languageLabel: "Language",
    menuLabel: "Menu",
    joinShort: "Join",
    join: "Join the waitlist",
  },

  navLinks: [
    { href: "#how", label: "How it works" },
    { href: "#roles", label: "Roles" },
    { href: "#pricing", label: "Pricing" },
  ],

  hero: {
    badge: "First clients onboarding now",
    titleLines: ["Runvo staffs", "businesses of one."],
    lede: "The front desk, the assistant, and the marketer you could never afford to hire. Start with one. Add the others when you’re ready.",
    ctaPrimary: "Join the waitlist",
    ctaSecondary: "See how it works",
    proofPoints: ["Answers in seconds", "Works in Spanish and English", "Set up in a week"],
  },

  frontDesk: {
    thread: [
      { side: "in", text: "Hi! Do you have anything tomorrow for a lash fill?" },
      {
        side: "out",
        text: "Hi Ana! Yes — tomorrow I have 11:00 AM or 4:30 PM. A fill is $65 and takes an hour.",
      },
      { side: "in", text: "4:30 please" },
      {
        side: "out",
        text: "Done. You're set for tomorrow at 4:30 PM. I'll send the reminder tonight.",
      },
    ],
    contact: "Ana R.",
    initials: "AR",
    channel: "WhatsApp · 9:02 PM",
    badge: "FRONT DESK",
    bookedTitle: "Booked into your calendar",
    bookedDetail: "Thu 4:30 PM · Lash fill · $65 · reminder scheduled",
    footnote: "Answered in 4 seconds. You were with a client.",
  },

  problem: {
    title: "You don’t have a front desk. You have a phone on silent.",
    body: [
      "Every business big enough to afford a receptionist has one. Yours is muted in a drawer while your hands are busy with a client.",
      "Messages pile up. WhatsApp. Instagram. Texts. And you still have to answer them after eight hours on your feet, when the day should already be over.",
    ],
    punchline:
      "A client texted at 9pm. You replied at 7am. They booked someone else at 9:15pm.",
    bars: {
      slow: {
        label: "Today, without a front desk",
        value: "10 hrs",
        from: "9:00 PM — they ask",
        to: "7:00 AM — you reply",
      },
      fast: {
        label: "Today, with Runvo",
        value: "4 sec",
        from: "9:00 PM — they ask",
        to: "9:00 PM — they’re booked",
      },
    },
  },

  stats: {
    items: [
      { value: "61%", label: "of inquiries waited more than twelve hours for a reply" },
      { value: "28%", label: "never got a reply at all" },
      { value: "3.4×", label: "book rate for fast replies versus slow ones" },
    ],
    pendingChip: "Counting now — two weeks, one Vacaville studio",
    measuredChip: "Measured in one Vacaville studio, two weeks",
    closer: "Runvo answers in seconds. Every channel. Even at 9pm.",
  },

  lifecycle: {
    title: "An appointment isn’t one moment.",
    stages: [
      { label: "Discovered" },
      { label: "Asked" },
      { label: "Booked" },
      { label: "Reminded" },
      { label: "Served", isYou: true },
      { label: "Followed up" },
      { label: "Rebooked" },
    ],
    youLabel: "YOU",
    closer: { yours: "You do one of these.", runvo: "Runvo does the rest." },
  },

  roles: {
    title: "Hire your first employee. Then your second.",
    items: [
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
    ],
    badges: { available: "AVAILABLE NOW", soon: "COMING SOON" },
    integrations: "Works with Square, and whatever you already use.",
    assistantHeader: "ASSISTANT · YOUR OWN THREAD",
    assistantThread: [
      { side: "out", text: "put ana in tomorrow 4:30, lash fill" },
      { side: "in", text: "Done — Thursday 4:30 PM, Ana R., lash fill, $65." },
      {
        side: "in",
        text: "Your Thursday has three gaps between 12 and 4. Want me to message the ones who haven't rebooked since June?",
      },
      { side: "out", text: "yeah, june only" },
    ],
  },

  trust: {
    title: "It answers. It doesn’t guess.",
    body: "Runvo works from your real prices, your real services, and your real calendar. When something falls outside what you’ve set, it stops and hands the conversation to you instead of making one up.",
    chips: [
      "Nobody is being replaced, because nobody was ever there",
      "You set what it can say",
      "You can turn it off in one tap",
    ],
    demoTitle: "WHEN IT DOESN’T KNOW",
    ask: "Do you do microblading? How much is it?",
    reply: "Let me check with Yaz and get right back to you.",
    handoffStrong: "Handed to you",
    handoffRest: " — microblading isn’t on your service list.",
  },

  pricing: {
    title: "One appointment a month pays for it.",
    tiers: [
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
    ],
    perMonth: "/mo",
    closer:
      "At $150 an appointment, the Front Desk pays for itself the first time it catches one you’d have missed. And a client you keep isn’t one appointment — it’s every visit they’d have made this year.",
  },

  waitlist: {
    title: "Be first.",
    lede: "Onboarding the first ten businesses now. You’ll hear from a person, not an autoresponder.",
    promises: ["Set up in a week", "Spanish and English", "Cancel any time"],
    emailLabel: "Your email",
    placeholder: "you@yourbusiness.com",
    submit: "Join the waitlist",
    submitting: "Joining…",
    success: "You’re on the list. I’ll write to you myself this week.",
    errors: {
      "invalid-email": "That address doesn't look right — mind checking it?",
      "save-failed": "Something broke on our end. Try again, or write to hola@runvo.io.",
    },
  },

  footer: {
    legal: "Runvo · California · Staffing businesses of one.",
  },
};
