import { useTheme } from "@/hooks/use-theme";
import { scrollTo, scrollToTop, setScrollLocked } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageProvider";
import { CONTACT } from "@/i18n/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ActionButton, EASE_BRAND, Magnetic } from "./primitives";

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();

  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#work");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCondensed(y > 120);
    setHidden(y > 560 && y > prev && y - prev > 4 && !open);
  });

  // `change` only fires on movement, so seed the state for reloads that restore
  // a scroll position part-way down the page.
  useEffect(() => {
    setCondensed(window.scrollY > 120);
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    return () => setScrollLocked(false);
  }, [open]);

  // Active section highlight
  useEffect(() => {
    const ids = ["work", "services", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // Let the overlay begin closing before the scroll starts.
    setTimeout(() => scrollTo(href, -8), open ? 220 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[120] flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
        animate={{ y: hidden ? "-140%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_BRAND }}
      >
        <motion.nav
          className={cn(
            "flex w-full items-center justify-between gap-4 rounded-full border transition-colors duration-500",
            condensed
              ? "max-w-[1180px] border-line bg-background/72 px-3 py-2.5 backdrop-blur-xl sm:px-4"
              : "max-w-[1560px] border-transparent bg-transparent px-2 py-3 sm:px-5",
          )}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_BRAND }}
        >
          {/* Wordmark */}
          <button
            onClick={scrollToTop}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Webschema"
            data-cursor="hover"
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-foreground">
              <span className="font-mono text-[11px] font-medium leading-none text-background">
                W
              </span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-brand group-hover:scale-y-100" />
              <span className="absolute font-mono text-[11px] font-medium leading-none text-background opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                W
              </span>
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight latin sm:block">
              Webschema
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {t.nav.items.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                data-cursor="hover"
                className={cn(
                  "group relative rounded-full px-4 py-2 text-[13.5px] transition-colors duration-300",
                  active === item.href
                    ? "text-foreground"
                    : "text-text-secondary hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-4 bottom-1 h-px origin-center bg-signal transition-transform duration-500 ease-brand",
                    active === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={toggle}
              aria-label={t.switchLabel}
              data-cursor="hover"
              className="flex h-9 items-center rounded-full border border-line px-3 font-mono text-[11px] tracking-wider text-text-secondary transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>

            <button
              onClick={toggleTheme}
              aria-label={t.nav.theme}
              data-cursor="hover"
              className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line transition-colors duration-300 hover:border-foreground/40"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="text-[13px] leading-none"
                >
                  {theme === "dark" ? "☀" : "☾"}
                </motion.span>
              </AnimatePresence>
            </button>

            <div className="hidden sm:block">
              <ActionButton size="sm" onClick={() => go("#contact")} arrow={false}>
                {t.nav.cta}
              </ActionButton>
            </div>

            {/* Burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              data-cursor="hover"
              className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line transition-colors duration-300 hover:border-foreground/40 lg:hidden"
            >
              <motion.span
                className="block h-px w-3.5 bg-foreground"
                animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }}
                transition={{ duration: 0.3, ease: EASE_BRAND }}
              />
              <motion.span
                className="block h-px w-3.5 bg-foreground"
                animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }}
                transition={{ duration: 0.3, ease: EASE_BRAND }}
              />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_BRAND }}
            className="fixed inset-0 z-[110] flex flex-col justify-between bg-background pb-10 pt-24 lg:hidden"
          >
            <nav className="flex flex-col px-5 sm:px-8">
              {t.nav.items.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.14 + i * 0.06, ease: EASE_BRAND }}
                  onClick={() => go(item.href)}
                  className="group flex items-baseline justify-between border-b border-line-soft py-5 text-start"
                >
                  <span className="display text-[clamp(2rem,10vw,3.5rem)] transition-colors duration-300 group-hover:text-signal">
                    {item.label}
                  </span>
                  <span className="label latin">0{i + 1}</span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="space-y-6 px-5 sm:px-8"
            >
              <Magnetic>
                <ActionButton size="lg" className="w-full" onClick={() => go("#contact")}>
                  {t.nav.cta}
                </ActionButton>
              </Magnetic>
              <div className="flex items-center justify-between">
                <a href={`mailto:${CONTACT.email}`} className="text-sm text-text-secondary latin">
                  {CONTACT.email}
                </a>
                <span className="label latin">{CONTACT.phone}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
