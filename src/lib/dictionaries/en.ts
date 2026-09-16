import type { Dictionary } from "@/lib/dictionary";

/**
 * The owner in every demo is Yaz, and her studio is fictional. Client names
 * are invented; the 555 number is the one phone number that can't be real.
 */
export const en: Dictionary = {
  locale: "en",

  meta: {
    tagline: "Runvo staffs businesses of one.",
    description:
      "The front desk, the assistant, and the marketer you could never afford to hire. Runvo answers WhatsApp, Instagram and text in Spanish or English, books into your calendar, and hands you the rest — in seconds.",
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
    { href: "#roles", label: "What it does" },
    { href: "#trust", label: "Trust" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
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
        text: "Done — you’re set for tomorrow at 4:30 PM. A $15 deposit holds the spot: Zelle to (619) 555-0102 and reply “sent” 🙂",
      },
    ],
    contact: "Ana R.",
    initials: "AR",
    channel: "WhatsApp · 9:02 PM",
    badge: "FRONT DESK",
    bookedTitle: "Booked into your calendar",
    bookedDetail: "Thu 4:30 PM · Lash fill · $65 · deposit requested",
    footnote: "Answered in 4 seconds, at 9:02 PM. Your day was already over.",
  },

  problem: {
    eyebrow: "The problem",
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
    roi: {
      line: "It answers at 9pm, when the alternative is you answering at 7am.",
      sum: "At $150 an appointment, one message it catches pays for the month.",
    },
  },

  stats: {
    eyebrow: "Results",
    title: "Proven to grow your business",
    lede: "Real numbers from the studios running Runvo.",
    items: [
      { value: "15hrs", plus: true, label: "saved every month on repetitive tasks" },
      {
        value: "60%",
        plus: true,
        label: "of bookings happen while you’re closed or with a client",
      },
      { value: "30%", plus: true, label: "more revenue in year one" },
    ],
    footnote:
      "Based on current customer data and feedback. Updated as more studios come on.",
  },

  lifecycle: {
    eyebrow: "How it works",
    title: "An appointment isn’t one moment.",
    stages: [
      { label: "Discovered" },
      { label: "Asked" },
      { label: "Booked" },
      { label: "Confirmed" },
      { label: "Served", isYou: true },
      { label: "Followed up" },
      { label: "Rebooked" },
    ],
    youLabel: "YOU",
    closer: { yours: "You do one of these.", runvo: "Runvo does the rest." },
  },

  roles: {
    eyebrow: "What it does",
    title: "Hire your first employee. Then your second.",
    lede: "Three roles, each one shown doing its job.",
    items: [
      {
        name: "Front Desk",
        price: "from $149/mo",
        status: "available",
        body: "Answers WhatsApp, Instagram and text in Spanish or English, in seconds. Quotes your real prices, offers real openings, books into your calendar, and asks for the deposit.",
        cta: "Add to waitlist",
      },
      {
        name: "Assistant",
        price: "$99/mo",
        status: "available",
        body: "Works for you, not your clients. Text it to book someone in or ask what tomorrow looks like. And it opens the conversation itself: who to ask for a review tonight, who stopped coming and is worth a message on Monday.",
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
    integrations: "Works with Square. More booking platforms on the way.",
    railLabel: "What Runvo does",
    prev: "Previous",
    next: "Next",
    scenes: [
      {
        role: 0,
        title: "Answers in the language they wrote in.",
        body: "Rocío wrote in Spanish, so it answered in Spanish — your real price, your real openings, while you were mid-appointment.",
        demo: {
          kind: "client-chat",
          contact: "Rocío M.",
          initials: "RM",
          channel: "WhatsApp · 1:12 PM",
          thread: [
            { side: "in", text: "Hola! Cuánto cuesta el brow lamination?" },
            {
              side: "out",
              text: "¡Hola Rocío! El brow lamination es $85 y toma una hora. ¿Te aparto un espacio?",
            },
            { side: "in", text: "sí, el sábado si se puede" },
            {
              side: "out",
              text: "El sábado tengo 10:00 am o 2:30 pm. ¿Cuál te queda mejor?",
            },
          ],
        },
      },
      {
        role: 1,
        title: "Booked from one text.",
        body: "Type it the way you’d text a coworker. It asks before it guesses, and it won’t book outside your hours.",
        demo: {
          kind: "owner-chat",
          thread: [
            { side: "out", text: "put ana in tomorrow 4:30, lash fill" },
            { side: "in", text: "Done — Thursday 4:30 PM, Ana R., lash fill, $65." },
            { side: "out", text: "what do i have tomorrow" },
            {
              side: "in",
              text: "Thursday, 3 booked: Marisol 11:00 brow lamination · Kim 1:30 lash fill · Ana 4:30 lash fill. Straight from Square, so anything you booked yourself is in there too.",
            },
          ],
        },
      },
      {
        role: 1,
        title: "Asks for the review. You tap send.",
        body: "45 minutes after closing it tells you who hasn’t been asked, drafts each message, and hands you the send. It never asks the same client twice.",
        demo: {
          kind: "nudge",
          header: "ASSISTANT · TONIGHT",
          link: "g.page/r/CTK4G…/review",
          steps: [
            {
              title: "🌙 End of day",
              body: "You saw 4 client(s) today — 2 still haven’t been asked for a review.",
              buttons: [
                { label: "See the list", tap: true },
                { label: "Not today", muted: true },
              ],
            },
            {
              title: "🌟 Reviews — today",
              body: "2 client(s) still without a review invite.",
              list: ["1. Valeria Ortiz Mena · 10:00", "2. Camila Rueda Soto · 17:00"],
              buttons: [
                { label: "✓ 1. Valeria" },
                { label: "🚫", muted: true },
                { label: "✓ 2. Camila" },
                { label: "🚫", muted: true },
                { label: "✍️ Draft (2)", full: true, tap: true },
              ],
            },
            { body: "✍️ Drafting 2 message(s)…" },
            {
              title: "1. Valeria Ortiz Mena",
              body: "Hi Valeria, thanks for coming in today! 🌟 If you loved your appointment, a quick review would help us so much: {link}\n\nAnd as a thank-you, here’s 15% off your next visit with the code COMEBACK15. See you soon! — Yaz",
              buttons: [{ label: "💬 WhatsApp ↗" }, { label: "📱 SMS ↗" }],
            },
            {
              title: "2. Camila Rueda Soto",
              body: "Hi Camila, thanks for coming in today! 🌟 If you loved your appointment, a quick review would help us so much: {link}\n\nAnd as a thank-you, here’s 15% off your next visit with the code COMEBACK15. See you soon! — Yaz",
              buttons: [{ label: "💬 WhatsApp ↗" }, { label: "📱 SMS ↗" }],
            },
            { body: "✅ 2 ready. Tap WhatsApp or SMS on each one to send it." },
          ],
        },
      },
      {
        role: 1,
        title: "Notices who stopped coming.",
        body: "Monday at 9 it lists the clients who haven’t been back and have nothing booked, with a message ready for each. It won’t write to anyone who already has an appointment.",
        demo: {
          kind: "nudge",
          header: "ASSISTANT · MONDAY 9:00 AM",
          link: "book.runvo.io/yaz",
          steps: [
            {
              title: "☀️ Monday · win-back",
              body: "3 clients haven’t been in for 60+ days and have nothing booked:",
              list: [
                "1. Lucía Ferrer · last visit Jun 12",
                "2. Dani Rojas · Jun 20",
                "3. Rosa Peña · Jul 2",
              ],
              buttons: [
                { label: "✍️ Draft (3)", tap: true },
                { label: "Not this week", muted: true },
              ],
            },
            { body: "✍️ Drafting 3 message(s)…" },
            {
              title: "1. Lucía Ferrer",
              body: "Hi Lucía! It’s been a little while 💛 I have a few openings this week if you’d like your usual — grab one here: {link}",
              buttons: [{ label: "💬 WhatsApp ↗" }, { label: "📱 SMS ↗" }],
            },
            {
              body: "✅ 3 ready. Anyone with an appointment already on the books was left off the list.",
            },
          ],
        },
      },
      {
        role: 2,
        title: "Keeps you visible.",
        body: "Posts, content, and the nudges that bring past clients back — while your hands are busy.",
        demo: { kind: "soon" },
      },
    ],
  },

  trust: {
    eyebrow: "Trust",
    title: "It answers. It doesn’t guess.",
    body: "Every AI on the internet says it answers messages. The question that actually matters is whether it will embarrass you in front of a client who has been coming for three years. Here is exactly what it will and won’t do.",
    rules: [
      {
        lead: "Prices come from your real catalog.",
        rest: "Never “around”, never a range you didn’t set.",
      },
      {
        lead: "Medical, refunds, complaints and legal go straight to you.",
        rest: "Those never reach the AI at all — a filter in front of it, not an instruction to it.",
      },
      {
        lead: "When it doesn’t know, it hands off and goes quiet.",
        rest: "It tells you on Telegram and stays out of that thread until you’ve answered.",
      },
      {
        lead: "It says it’s virtual.",
        rest: "Once per conversation, because California requires it — and because your clients deserve to know.",
      },
      {
        lead: "Nothing reaches a client without your thumb.",
        rest: "Reviews and win-backs are drafted for you. You send them.",
      },
      {
        lead: "Off in one tap.",
        rest: "Your inbox is yours again the second you want it.",
      },
    ],
    proof: [
      { value: "4 sec", label: "average reply, day or night" },
      { value: "0", label: "messages sent without your thumb" },
      { value: "4", label: "subjects it hands straight to you, never answering itself" },
    ],
    demo: {
      clientHeader: "WhatsApp · Ana R.",
      ask: "Do you do microblading? How much is it?",
      reply: "Let me check with Yaz and get right back to you.",
      ownerHeader: "Telegram · you",
      handoffTitle: "Handed to you",
      handoffBody:
        "Ana asked about microblading. It isn’t on your service list, so I didn’t quote anything.",
      muted: "Quiet on Ana’s thread until you reply",
    },
  },

  pricing: {
    eyebrow: "Pricing",
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
    fine: "Month to month. Cancel in one message.",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions owners ask first.",
    lede: "The short answers. For anything else, write to hola@runvo.io and a person replies.",
    items: [
      {
        q: "Does it replace my booking app?",
        a: "No. Runvo works on top of Square, with more platforms on the way. Appointments it books land in the calendar you already use, and anything you book yourself shows up when you ask it what your day looks like.",
      },
      {
        q: "What happens when it doesn’t know something?",
        a: "It stops, tells the client it’s checking with you, and pings you on Telegram. It stays quiet on that conversation until you’ve answered. Medical, refund, complaint and legal messages never reach the AI at all — they come straight to you.",
      },
      {
        q: "Which languages does it speak?",
        a: "Spanish and English, in whichever one each client writes. If someone switches mid-conversation, it follows.",
      },
      {
        q: "Will my clients know they’re talking to an assistant?",
        a: "Yes. It says so once per conversation. That’s the law in California, and it’s also how you keep their trust.",
      },
      {
        q: "What does the Assistant do that the Front Desk doesn’t?",
        a: "The Front Desk talks to your clients. The Assistant talks to you: book someone from a text, ask what today looks like, and get nudged — at close about reviews, on Monday about clients who stopped coming. Everything it drafts, you send.",
      },
      {
        q: "How long does setup take, and is there a contract?",
        a: "About a week. You share your services, prices, hours and the rules you want it to follow; we connect Square and WhatsApp and run it beside you for the first few days. No contract — month to month, cancel in one message.",
      },
    ],
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
    otherLanguage: "Leer en español",
  },
};
