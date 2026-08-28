import { scrollTo } from "@/hooks/use-smooth-scroll";
import { useLang } from "@/i18n/LanguageProvider";
import { CONTACT } from "@/i18n/data";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE_BRAND, Magnetic, SplitWords } from "./primitives";

export default function CallToAction() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The two headline lines drift past each other as the section crosses the viewport.
  const lineA = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const lineB = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden rounded-t-[2rem] bg-foreground py-28 text-background sm:py-36 lg:py-44 grain"
    >
      {/* Animated field */}
      <motion.div className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: glow }}>
        <div
          className="absolute -left-[15%] top-[-20%] h-[62vh] w-[62vh] rounded-full blur-[110px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--signal) / 0.55), transparent 65%)",
            animation: reduced ? undefined : "ws-drift 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-[10%] bottom-[-25%] h-[55vh] w-[55vh] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--brand-accent) / 0.32), transparent 65%)",
            animation: reduced ? undefined : "ws-drift 14s ease-in-out infinite reverse",
          }}
        />
      </motion.div>

      {/* Hairline grid, inverted */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      <div className="shell relative">
        <span className="label !text-background/50">{t.cta.kicker}</span>

        <h2 className="display display-xl mt-8 text-balance">
          <motion.span
            className="block"
            style={reduced ? undefined : { x: lineA }}
          >
            <SplitWords text={t.cta.title[0]} stagger={0.05} />
          </motion.span>
          <motion.span
            className="block"
            style={reduced ? undefined : { x: lineB }}
          >
            <SplitWords text={t.cta.title[1]} stagger={0.05} delay={0.1} />
          </motion.span>
        </h2>

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE_BRAND }}
            className="max-w-[44ch] text-base leading-relaxed text-background/65"
          >
            {t.cta.lead}
          </motion.p>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <Magnetic strength={0.32}>
              <button
                onClick={() => scrollTo("#contact", -8)}
                data-cursor="hover"
                className="group/cta relative flex h-20 items-center gap-5 overflow-hidden rounded-full bg-background px-10 text-foreground sm:h-24 sm:px-14"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-700 ease-brand group-hover/cta:scale-y-100"
                />
                <span className="relative z-10 text-lg font-medium tracking-tight transition-colors duration-500 group-hover/cta:text-background sm:text-2xl">
                  {t.cta.button}
                </span>
                <span
                  aria-hidden
                  className="relative z-10 text-xl transition-all duration-500 ease-brand arrow-fwd group-hover/cta:translate-x-1.5 group-hover/cta:text-background sm:text-2xl"
                >
                  →
                </span>
              </button>
            </Magnetic>

            <p className="text-sm text-background/50">
              {t.cta.or}{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-background underline-offset-4 transition-colors hover:text-signal hover:underline latin"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
