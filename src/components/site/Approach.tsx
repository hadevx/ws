import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import ApproachMotif from "./ApproachMotifs";
import { EASE, EASE_BRAND, Overline, Reveal, SplitWords } from "./primitives";

export default function Approach() {
  const { t, flow } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const stages = t.approach.stages;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length)));
    setIndex((prev) => (prev === next ? prev : next));
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const stage = stages[index];

  return (
    <section id="approach" className="relative bg-surface">
      {/* Intro */}
      <div className="shell pt-24 sm:pt-32">
        <div className="flex flex-col gap-5 border-b border-line pb-12">
          <Reveal>
            <Overline>{t.approach.overline}</Overline>
          </Reveal>
          <h2 className="display display-lg max-w-[14ch]">
            <SplitWords text={t.approach.title} stagger={0.05} />
          </h2>
          <Reveal delay={0.1}>
            <p className="lead max-w-[52ch]">{t.approach.lead}</p>
          </Reveal>
        </div>
      </div>

      {/* Scroll-driven stage sequence */}
      <div ref={ref} style={{ height: `${stages.length * 100}vh` }} className="relative isolate">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="shell w-full">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              {/* Stage index rail */}
              <div className="lg:col-span-3">
                <ol className="flex gap-6 lg:flex-col lg:gap-5">
                  {stages.map((s, i) => (
                    <li key={s.id} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "hidden h-px transition-all duration-700 ease-brand lg:block",
                          i === index ? "w-8 bg-signal" : "w-3 bg-line",
                        )}
                      />
                      <span
                        className={cn(
                          "font-mono text-[11px] tracking-widest transition-colors duration-500 lg:text-xs",
                          i === index ? "text-signal" : "text-text-tertiary",
                        )}
                      >
                        {s.no}
                      </span>
                      <span
                        className={cn(
                          "text-sm transition-colors duration-500",
                          i === index ? "text-foreground" : "text-text-tertiary",
                        )}
                      >
                        {s.title}
                      </span>
                    </li>
                  ))}
                </ol>

                {/* Progress rail */}
                <div className="mt-8 hidden h-px w-full bg-line lg:block">
                  <motion.div
                    className="h-px bg-signal"
                    style={{ scaleX: railScale, transformOrigin: flow === 1 ? "left" : "right" }}
                  />
                </div>
              </div>

              {/* Copy */}
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.55, ease: EASE_BRAND }}
                  >
                    {/* Total is taken from the last stage so the numerals match the script */}
                    <span className="label block">
                      {stage.no} / {stages[stages.length - 1].no}
                    </span>
                    <h3 className="display display-lg mt-4">{stage.title}</h3>
                    <p className="lead mt-5 max-w-[42ch]">{stage.desc}</p>
                    <ul className="mt-8 space-y-3">
                      {stage.points.map((p, i) => (
                        <motion.li
                          key={p}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                          className="flex items-center gap-3 border-t border-line pt-3 text-sm text-text-secondary"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-signal" />
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Motif */}
              <div className="lg:col-span-4">
                <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.5, ease: EASE_BRAND }}
                      className="absolute inset-0"
                    >
                      <ApproachMotif stage={stage.id} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
