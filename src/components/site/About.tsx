import { useLang } from "@/i18n/LanguageProvider";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Counter, Overline, Reveal } from "./primitives";

/** One word of the manifesto, brightened as the section scrolls past. */
function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={still ? undefined : { opacity }}
      className="inline-block me-[0.28em]"
    >
      {children}
    </motion.span>
  );
}

function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.55"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const step = 1 / words.length;

  return (
    <p
      ref={ref}
      className="display display-md relative max-w-[22ch] leading-[1.3] rtl:leading-[1.55]"
    >
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          range={[i * step, (i + 1) * step]}
          still={!!reduced}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section relative">
      <div className="shell">
        {/* Manifesto */}
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <Overline>{t.about.overline}</Overline>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <ScrollStatement text={t.about.statement} />
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-24 grid gap-px border-t border-line bg-line sm:mt-32 lg:grid-cols-3">
          {t.about.pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              className="group relative bg-background p-8 transition-colors duration-500 hover:bg-surface sm:p-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="label latin">{p.no}</span>
                <span className="h-px flex-1 origin-left bg-line transition-colors duration-500 group-hover:bg-signal" />
              </div>
              <h3 className="display mt-8 text-[clamp(1.6rem,2.6vw,2.25rem)] transition-colors duration-500 group-hover:text-signal">
                {p.title}
              </h3>
              <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-text-secondary">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-12 sm:mt-28 lg:grid-cols-4">
          {t.about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="flex flex-col gap-2">
                <div className="display flex items-baseline gap-1 text-[clamp(2.25rem,4.5vw,3.75rem)]">
                  <Counter value={s.value} />
                  <span className="text-signal text-[0.42em]">{s.suffix}</span>
                </div>
                <span className="text-[13px] text-text-secondary">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[54ch] text-sm text-text-tertiary">{t.about.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
