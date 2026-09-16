import type { Metadata, Viewport } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/dictionary";
import { isLocale, localeHref, localeMeta, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caprasimo",
  display: "swap",
});

/** Both languages are prerendered. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * `[lang]` sits at the root, so it also matches `/favicon.ico` and every other
 * stray path. Those are rendered on demand and answered by `notFound()` below —
 * turning this off instead makes Next serve the same 404 while logging an
 * internal `NoFallbackError` for each one.
 */
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const title = `${site.name} — ${dict.meta.tagline}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: localeHref(lang),
      // Both versions are equally the site — neither is a translation of the
      // other — so each points at the pair plus an x-default for everyone else.
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, localeHref(locale)])),
        "x-default": localeHref("en"),
      },
    },
    openGraph: {
      type: "website",
      url: localeHref(lang),
      siteName: site.name,
      locale: localeMeta[lang].ogLocale,
      title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f5ead8",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${figtree.variable} ${caprasimo.variable} antialiased`}>
      <head>
        {/*
          Scroll reveals, chat playback and Motion elements all hide their
          content until JavaScript reveals it. Without JS nothing would ever
          fire, so opt straight into every end state: `.rv-reveal`/`.rv-lift`
          are the section reveals, `.rv-js` a demo element waiting on
          playback, `.rv-motion` anything Motion has left dim.
        */}
        <noscript>
          <style>{`.rv-reveal,.rv-lift,.rv-js,.rv-motion{opacity:1!important;transform:none!important}.rv-js[hidden]{display:flex!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
