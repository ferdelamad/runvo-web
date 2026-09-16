import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Lifecycle } from "@/components/sections/lifecycle";
import { Pricing } from "@/components/sections/pricing";
import { Problem } from "@/components/sections/problem";
import { Scenes } from "@/components/sections/scenes";
import { Stats } from "@/components/sections/stats";
import { Trust } from "@/components/sections/trust";
import { Waitlist } from "@/components/sections/waitlist";
import type { Dictionary } from "@/lib/dictionary";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen overflow-x-clip">
      <a
        href="#top"
        className="bg-clay-500 text-clay-50 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:px-5 focus:py-2.5 focus:font-bold"
      >
        {dict.common.skipToContent}
      </a>

      <SiteHeader dict={dict} />

      <main>
        <Hero dict={dict} />
        <Problem dict={dict} />
        <Stats dict={dict} />
        <Lifecycle dict={dict} />
        <Scenes dict={dict} />
        <Trust dict={dict} />
        <Pricing dict={dict} />
        <Faq dict={dict} />
        <Waitlist dict={dict} />
      </main>

      <SiteFooter dict={dict} />

      <script
        type="application/ld+json"
        // Values come from local content, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(dict)) }}
      />
    </div>
  );
}

/**
 * Product/offer markup so search results can show the roles and their prices,
 * plus the FAQ so the answers can surface as rich results.
 */
function structuredData(dict: Dictionary) {
  const url = `${site.url}/${dict.locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: site.name,
        url,
        applicationCategory: "BusinessApplication",
        description: dict.meta.description,
        // The product is bilingual whichever page you landed on; this page is one.
        inLanguage: dict.locale,
        availableLanguage: [...locales],
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          email: site.email,
          areaServed: "US-CA",
        },
        featureList: dict.roles.items.map((role) => `${role.name}: ${role.body}`),
        offers: dict.pricing.tiers.map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          price: tier.price.replace(/[^\d.]/g, ""),
          priceCurrency: "USD",
          description: tier.note,
        })),
      },
      {
        "@type": "FAQPage",
        url: `${url}#faq`,
        inLanguage: dict.locale,
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
