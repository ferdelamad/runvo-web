import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * One entry per language, each pointing at the other as an alternate — neither
 * is a translation of the other, so neither outranks it in the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${site.url}/${locale}`]),
  );

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages },
  }));
}
