/**
 * The two languages Runvo is sold in. Spanish isn't a translation layer bolted
 * onto an English site — it's a first-class locale with its own copy, written
 * for the same reader in the language they actually work in.
 */
export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Every route is under `/{locale}`, so links are built rather than written. */
export function localeHref(locale: Locale): `/${Locale}` {
  return `/${locale}`;
}

/** What the toggle shows, and what `<html lang>`/`og:locale` need. */
export const localeMeta: Record<Locale, { label: string; name: string; ogLocale: string }> = {
  en: { label: "EN", name: "English", ogLocale: "en_US" },
  es: { label: "ES", name: "Español", ogLocale: "es_US" },
};
