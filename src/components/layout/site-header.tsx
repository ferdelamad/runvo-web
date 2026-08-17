"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/site";

/** Below this the header always shows; past it, scrolling down hides it. */
const HIDE_AFTER = 220;
/** Past this the header picks up a background so text doesn't collide with it. */
const LIFT_AFTER = 40;

/**
 * Directionally aware header: static at the top, hidden on the way down, and
 * back within reach the moment the reader scrolls up. Once it has a background
 * the nav links collapse so the logo and the one CTA carry the bar.
 */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [spanish, setSpanish] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Deferred so it lands after the browser's own jump to a URL fragment
    // (e.g. a direct link to #waitlist) has settled — see the comment on
    // `html` in globals.css for why enabling this any earlier breaks that jump.
    const id = requestAnimationFrame(() => {
      document.documentElement.classList.add("rv-smooth-scroll");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const goingAway = y > last && y > HIDE_AFTER;

      setHidden(goingAway);
      setLifted(y > LIFT_AFTER);
      // An open menu shouldn't slide off-screen underneath the reader.
      if (goingAway) setMenuOpen(false);

      last = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // Measure on the next frame in case the browser restored a scroll position.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        hidden ? "-translate-y-[105%]" : "translate-y-0",
        lifted
          ? "bg-cream-100/[0.86] backdrop-blur-[12px]"
          : "bg-cream-100/0 backdrop-blur-0",
        lifted && !hidden && "shadow-[0_1px_2px_rgba(46,43,37,0.14)]",
      )}
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-5 py-[18px] sm:gap-7 sm:px-8">
        <a href="#top" className="text-ink-950 shrink-0">
          <Wordmark />
        </a>

        <nav
          aria-label="Main"
          className={cn(
            "ml-3 hidden items-center gap-[26px] text-[15.5px] font-medium transition-[opacity,width] duration-300 lg:flex",
            lifted && "pointer-events-none w-0 overflow-hidden opacity-0",
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink-800 whitespace-nowrap hover:text-clay-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3.5">
          {/* A phone header has no room for the toggle next to the wordmark, the
              CTA and the menu button — below `sm` it moves into the menu panel. */}
          <div className="hidden sm:block">
            <LanguageToggle spanish={spanish} onChange={setSpanish} />
          </div>

          {/* One button with a swapping label: passing `hidden` to ButtonLink
              can't win over its own `inline-flex`, since cn() only joins. */}
          <ButtonLink href="#waitlist" size="sm">
            <span className="sm:hidden">Join</span>
            <span className="hidden sm:inline">Join the waitlist</span>
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Menu"
            className="border-cream-400 bg-cream-300 hover:bg-cream-400 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors lg:hidden"
          >
            <span aria-hidden className="relative block h-[9px] w-[15px]">
              {/* Both bars stay pinned to the box and animate on transform
                  alone, so the burger/close swap actually tweens. */}
              <span
                className={cn(
                  "bg-ink-800 absolute top-0 left-0 block h-[1.5px] w-full rounded-full transition-transform duration-300",
                  menuOpen && "translate-y-[3.75px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "bg-ink-800 absolute bottom-0 left-0 block h-[1.5px] w-full rounded-full transition-transform duration-300",
                  menuOpen && "-translate-y-[3.75px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-cream-400 bg-cream-100/95 backdrop-blur-[12px] border-t px-5 pb-4 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-ink-800 hover:text-clay-700 block py-3 text-[17px] font-medium"
            >
              {link.label}
            </a>
          ))}

          {/* The bar drops the toggle below `sm`; this is where it lands. */}
          <div className="border-cream-400 mt-2 flex border-t pt-4 sm:hidden">
            <LanguageToggle spanish={spanish} onChange={setSpanish} />
          </div>
        </nav>
      )}

      {spanish && (
        <div className="mx-auto max-w-[1180px] px-5 pb-3 sm:px-8">
          <p
            lang="es"
            className="bg-sage-100 border-sage-200 text-sage-700 rounded-2xl border px-[18px] py-2.5 text-[14.5px]"
          >
            La versión en español está en camino — escrita de nuevo, no traducida.
            Mientras tanto, el Front Desk ya contesta en español.
          </p>
        </div>
      )}
    </header>
  );
}

/**
 * The Spanish site is written, not translated, so it isn't live yet. Noticing
 * the toggle is most of its job — it announces who Runvo is built for.
 */
function LanguageToggle({
  spanish,
  onChange,
}: {
  spanish: boolean;
  onChange: (spanish: boolean) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="border-cream-400 bg-cream-300 flex items-center gap-0.5 rounded-full border p-[3px]"
    >
      {[
        { code: "en", label: "EN", active: !spanish },
        { code: "es", label: "ES", active: spanish },
      ].map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => onChange(option.code === "es")}
          aria-pressed={option.active}
          className={cn(
            "cursor-pointer rounded-full px-[13px] py-1.5 text-[13px] font-bold tracking-[0.04em] transition-colors",
            option.active
              ? "bg-clay-500 text-clay-50"
              : "text-ink-700 hover:bg-cream-400 bg-transparent",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
