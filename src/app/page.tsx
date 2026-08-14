import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { Lifecycle } from "@/components/sections/lifecycle";
import { Pricing } from "@/components/sections/pricing";
import { Problem } from "@/components/sections/problem";
import { Roles } from "@/components/sections/roles";
import { Stats } from "@/components/sections/stats";
import { Trust } from "@/components/sections/trust";
import { Waitlist } from "@/components/sections/waitlist";
import { site } from "@/lib/site";
import { pricingTiers, roles } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <a
        href="#top"
        className="bg-clay-500 text-clay-50 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:px-5 focus:py-2.5 focus:font-bold"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main>
        <Hero />
        <Problem />
        <Stats />
        <Lifecycle />
        <Roles />
        <Trust />
        <Pricing />
        <Waitlist />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        // Values come from local content, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
    </div>
  );
}

/** Product/offer markup so search results can show the roles and their prices. */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    url: site.url,
    applicationCategory: "BusinessApplication",
    description: site.description,
    inLanguage: ["en", "es"],
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
      areaServed: "US-CA",
    },
    featureList: roles.map((role) => `${role.name}: ${role.body}`),
    offers: pricingTiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace(/[^\d.]/g, ""),
      priceCurrency: "USD",
      description: tier.note,
    })),
  };
}
