# runvo.io redesign — implementation plan

Written 15 Sep 2026 against the "Where the site and the product disagree" brief.
Everything the brief locked stays locked: one page, EN and ES written in parallel,
Motion (no GSAP), the hero keeps booking the appointment, no slash commands anywhere.

## What GlossGenius does that is worth borrowing

Looked at glossgenius.com section by section. The moves that transfer to a
bilingual, demo-driven page for a solo owner:

1. **Word-by-word headline reveals.** Every H2 lights up one word at a time as it
   scrolls in. Cheap, distinctive, and it makes the page feel like one system.
2. **Outcome cards, not feature cards.** "Every inquiry handled", "Clients who come
   back" — each card is an outcome with the product visual inside it, in a
   horizontal snap rail. This is exactly the "Roles should demonstrate, not
   describe" fix from the brief.
3. **Comparison copy.** "Others make you chase clients. GlossGenius…" — a two-beat
   sentence that positions against the alternative. Runvo's alternative is "a
   phone on silent", and in Trust it is "a bot that guesses".
4. **Eyebrow → headline → deck** rhythm on every section, with a lot of air.
5. **A big-numeral proof band** (already shipped on this branch).
6. **A full-bleed colour closer** before the FAQ, then a dark FAQ with native
   accordions.
7. **Pill buttons in a slim sticky header**, primary filled, secondary outlined.

What does *not* transfer: lifestyle photography (none exists yet), testimonial
carousels (one tenant, nothing to quote honestly), a mega-menu, scroll-scrubbed
pinning.

## New page order

| # | Section | Change |
|---|---------|--------|
| 1 | Header | Nav becomes How it works · What it does · Pricing · FAQ. Unchanged behaviour. |
| 2 | Hero | Same headline. Thread loses the reminder promise and gains the deposit instruction. Footnote agrees with the 9:02 PM stamp. |
| 3 | Problem (dark) | Keeps the bars. Gains the ROI line ("It answers at 9pm, when the alternative is you answering at 7am") and the checkable sum. |
| 4 | Proof band | Shipped. Headline gets the word reveal. |
| 5 | Lifecycle (`#how`) | Stage 4 "Reminded" → "Confirmed" (no reminder feature exists; the deposit confirmation does). Otherwise untouched. |
| 6 | What it does (`#roles`) | Rebuilt. A "hire" strip with the three roles and prices, then a horizontal snap rail of five outcome cards, each carrying its own live demo. |
| 7 | Trust (`#trust`) | Promoted to a full-bleed sage panel. Six concrete guardrails, an animated hand-off demo (WhatsApp → Telegram → "muted until you answer"), and three proof figures: 4 sec · 0 · 4. |
| 8 | Pricing (dark) | Same tiers. Closer stays as the payoff. Small "no contract" line. |
| 9 | FAQ | New. Six questions, native `<details>`, FAQPage JSON-LD. |
| 10 | Waitlist | Becomes the colour closer: full clay band, big display headline, the form. |
| 11 | Footer | Adds the language pair and a second nav row. |

## The five outcome cards

Each card: eyebrow (role · price), outcome headline, one-line body, demo.

1. **Front Desk — "Answers in the language they wrote in."** A client writes in
   the *other* language from the page (Spanish on the English page, English on
   the Spanish page) and gets answered in kind, with a real price and two real
   openings. Bilinguality shown, not claimed.
2. **Assistant — "Booked from one text."** `put ana in tomorrow 4:30, lash fill`
   → booked. Then `what do i have tomorrow` → the day, read from Square. Replaces
   the "gaps in your week" line, which is not a shipped feature.
3. **Assistant — "Asks for the review. You tap send."** The end-of-day run. The
   bot opens the conversation.
4. **Assistant — "Notices who stopped coming."** New. Monday 9am, the bot opens:
   three clients not back in 60+ days with nothing booked, drafts ready, the
   send is hers. Excludes anyone with an appointment on the books.
5. **Marketer — coming soon.** Dashed card, no demo.

Both nudge demos (3 and 4) run on one data-driven `NudgeDemo` component with a
script in the dictionary, replacing the hand-wound `reviews-demo.tsx` beat sheet.

## Copy changes (both languages)

- Hero thread, last message: reminder promise → deposit instruction.
- Hero booked card: "reminder scheduled" → "deposit requested".
- Hero footnote: "Answered in 4 seconds, at 9:02 PM. Your day was already over."
- Front Desk role body: loses win-back and reviews (they are Assistant features).
- Assistant role body: gains "opens the conversation itself" — reviews tonight,
  win-back on Monday.
- Trust: chips → six guardrails written as facts, not reassurance.
- Lifecycle stage 4: Confirmed / Confirmación.
- New: FAQ, win-back script, bilingual front-desk scene, proof figures.

## Motion

`motion` (Framer) added as the one runtime dependency. Used *inside* demos and
for the headline word reveal only. Sections stay server components.

- `WordReveal` — `whileInView` + `staggerChildren`, once.
- `NudgeDemo`, `HandoffDemo`, scene-card entrance — variants, no `setTimeout`
  beat sheets where a stagger will do.
- Reduced motion: every demo renders its finished state straight from render, as
  today. No-JS: a `.rv-motion` class joins the existing `<noscript>` override so
  Motion's inline `opacity:0` never strands a reader.

## Waitlist persistence

`saveWaitlistSignup` gains two zero-dependency backends chosen by env var:

- `WAITLIST_WEBHOOK_URL` — POSTs the signup JSON (Zapier, Make, n8n, Slack).
- `RESEND_API_KEY` + `WAITLIST_NOTIFY_EMAIL` — emails the founder via Resend's
  HTTP API.

Both may be set. With neither, it logs, as before. This needs a decision and a
credential from the founder before launch; the code path is ready either way.

## Verification

- `tsc --noEmit`, `eslint`, `next build`.
- Both locales screenshotted at 1280 and 390 wide.
- Reduced-motion pass: every demo shows its end state.
