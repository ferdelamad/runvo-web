import { Wordmark } from "@/components/ui/wordmark";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-cream-400 border-t">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-6 px-5 pt-10 pb-14 sm:px-8">
        <Wordmark size="sm" />

        <div className="flex-1" />

        <nav aria-label="Footer" className="text-ink-700 flex flex-wrap gap-[22px] text-[15px]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-ink-700 hover:text-clay-700">
              {link.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="text-ink-700 hover:text-clay-700">
            {site.email}
          </a>
        </nav>

        <p className="text-ink-600 m-0 w-full text-[14.5px]">
          Runvo · California · Staffing businesses of one.
        </p>
      </div>
    </footer>
  );
}
