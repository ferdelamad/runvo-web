export const site = {
  name: "Runvo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://runvo.io",
  email: "hola@runvo.io",
  tagline: "Runvo staffs businesses of one.",
  description:
    "The front desk, the assistant, and the marketer you could never afford to hire. Runvo answers WhatsApp, Instagram and text in Spanish or English, books into your calendar, and follows up — in seconds.",
  locale: "en_US",
} as const;

/**
 * Header/footer navigation. Add `{ href: "/blog", label: "Blog" }` once two or
 * three posts exist — an empty blog reads as an unreal company.
 */
export const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#roles", label: "Roles" },
  { href: "#pricing", label: "Pricing" },
] as const;
