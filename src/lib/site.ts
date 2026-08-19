export const site = {
  name: "Runvo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://runvo.io",
  email: "hola@runvo.io",
} as const;

/**
 * Stats band. Numbers come from the two-week inquiry count in the pilot studio.
 * Until it lands, this renders the empty-but-honest variant. The numbers and
 * their labels live in each dictionary.
 */
export const statsPending = true;
