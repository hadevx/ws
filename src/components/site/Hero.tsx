import { scrollTo } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageProvider";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import HeroField from "./HeroField";
import { ActionButton, EASE, Marquee, SplitWords } from "./primitives";

export default function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  const accent = lang === "en" ? ["experiences"] : ["رقمية"];

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 sm:pt-32"
    >
      {/* Interactive field */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={reduced ? undefined : { y: fieldY, scale: fieldScale }}
      >
        <HeroField className="h-full w-full" />
        {/* Keeps the headline legible without washing the field out entirely */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,hsl(var(--background)/0.72),transparent_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      <motion.div
        className="shell flex flex-1 flex-col justify-center"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-70 [animation:ws-pulse-ring_2.4s_ease-out_infinite]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          <span className="label">{t.hero.badge}</span>
        </motion.div>

        {/* Headline */}
        <h1 className="display display-xl max-w-[15ch]">
          <SplitWords
            text={t.hero.title}
            lines
            animateOnMount
            delay={0.28}
            stagger={0.055}
            accent={accent}
          />
        </h1>

        {/* Lead + CTAs */}
        <div className="mt-9 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="lead max-w-[46ch] lg:col-span-5 lg:col-start-1"
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82, ease: EASE }}
            className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:col-start-7"
          >
            <ActionButton size="lg" onClick={() => scrollTo("#contact", -8)}>
              {t.hero.ctaPrimary}
            </ActionButton>
            <ActionButton
              size="lg"
              variant="outline"
              arrow={false}
              magnetic={false}
              onClick={() => scrollTo("#work", -8)}
            >
              {t.hero.ctaSecondary}
            </ActionButton>
          </motion.div>

          {/* Meta rail */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="hidden gap-8 lg:col-span-2 lg:col-start-11 lg:flex lg:flex-col lg:gap-3"
          >
            {t.hero.meta.map((m) => (
              <div key={m.k} className="flex items-baseline justify-between gap-4 border-t border-line pt-2">
                <dt className="label">{m.k}</dt>
                <dd className="text-[13px] text-text-secondary">{m.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Scroll cue + ticker */}
      <div className="relative z-10 mt-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          onClick={() => scrollTo("#services", -8)}
          className="shell mb-8 flex items-center gap-3 text-text-tertiary transition-colors hover:text-foreground"
          data-cursor="hover"
        >
          <span className="label">{t.hero.scroll}</span>
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 block h-3 bg-signal"
              animate={reduced ? undefined : { y: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.button>

        <div className="border-y border-line py-4">
          <Marquee speed={38}>
            {t.ticker.map((word, i) => (
              <span key={`${word}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="px-6 text-sm text-text-secondary sm:px-9 sm:text-base">{word}</span>
                <span aria-hidden className="text-signal">
                  ✳
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
