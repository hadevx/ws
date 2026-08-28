import { scrollTo, scrollToTop } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageProvider";
import { CONTACT } from "@/i18n/data";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./primitives";

const SOCIALS = [
  { label: "Instagram", href: CONTACT.instagram },
  { label: "X", href: CONTACT.x },
  { label: "WhatsApp", href: `https://wa.me/${CONTACT.whatsapp}` },
];

export default function Footer() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-background">
      <div className="shell pt-20 sm:pt-28">
        <div className="grid gap-12 pb-20 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-xs text-background">
                  W
                </span>
                <span className="text-lg font-semibold tracking-tight latin">Webschema</span>
              </div>
              <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-text-secondary">
                {t.footer.tagline}
              </p>
            </Reveal>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-3">
            <Reveal delay={0.05}>
              <p className="label mb-5">{t.footer.nav}</p>
              <ul className="space-y-3">
                {t.nav.items.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href, -8)}
                      data-cursor="hover"
                      className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-foreground"
                    >
                      <span className="h-px w-0 bg-signal transition-all duration-400 group-hover:w-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <p className="label mb-5">{t.footer.contactCol}</p>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="latin transition-colors hover:text-foreground"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    dir="ltr"
                    className="latin inline-block transition-colors hover:text-foreground"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <Reveal delay={0.15}>
              <p className="label mb-5">{t.footer.social}</p>
              <ul className="space-y-3 text-sm text-text-secondary">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="latin transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-tertiary">
            <span className="latin">© {new Date().getFullYear()} Webschema</span> ·{" "}
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-text-tertiary">{t.footer.built}</span>
            <button
              onClick={scrollToTop}
              data-cursor="hover"
              className="group flex items-center gap-2 text-xs text-text-secondary transition-colors hover:text-foreground"
            >
              {t.footer.top}
              <span className="inline-block transition-transform duration-400 group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the viewport edge */}
      <motion.div
        aria-hidden
        className="select-none px-2 pb-0"
        style={reduced ? undefined : { y: markY }}
      >
        {/* Sized to sit just inside the viewport in both scripts, so it reads as
            a deliberate full-bleed wordmark rather than clipped text. */}
        <span className="latin block whitespace-nowrap text-center text-[15.2vw] font-semibold leading-[0.78] tracking-[-0.045em] text-line-soft">
          WEBSCHEMA
        </span>
      </motion.div>
    </footer>
  );
}
