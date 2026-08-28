import { useLang } from "@/i18n/LanguageProvider";
import { GROUP_HUE, TECH, type Tech as TechItem } from "@/i18n/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { EASE, EASE_BRAND, Overline, Reveal, SplitWords } from "./primitives";

export default function Tech() {
  const { t } = useLang();
  const [active, setActive] = useState<TechItem>(TECH[4]); // React
  const [pinned, setPinned] = useState(false);

  // Spotlight that trails the pointer across the table
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  const spotX = useSpring(sx, { stiffness: 140, damping: 20 });
  const spotY = useSpring(sy, { stiffness: 140, damping: 20 });
  const [spotOn, setSpotOn] = useState(false);

  const hue = GROUP_HUE[active.group];

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sx.set(e.clientX - rect.left);
    sy.set(e.clientY - rect.top);
  };

  return (
    <section id="tech" className="section relative overflow-hidden bg-surface">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + detail */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-5">
              <Reveal>
                <Overline>{t.tech.overline}</Overline>
              </Reveal>
              <h2 className="display display-lg">
                <SplitWords text={t.tech.title} stagger={0.05} />
              </h2>
              <Reveal delay={0.1}>
                <p className="lead max-w-[44ch]">{t.tech.lead}</p>
              </Reveal>
            </div>

            {/* Detail panel */}
            <Reveal delay={0.15} className="mt-12">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-background p-7 sm:p-9">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(90% 120% at 100% 0%, hsl(${hue} / 0.14), transparent 65%)`,
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE_BRAND }}
                    className="relative"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <span className="label latin">{active.no}</span>
                        <h3 className="display mt-2 text-4xl latin sm:text-5xl">{active.symbol}</h3>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                        style={{
                          color: `hsl(${hue})`,
                          backgroundColor: `hsl(${hue} / 0.12)`,
                        }}
                      >
                        {t.tech.groups[active.group]}
                      </span>
                    </div>

                    <p className="mt-5 text-lg font-medium latin">{active.name}</p>
                    <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-text-secondary">
                      {t.tech.roles[active.id]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          {/* Right: the table */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="label">{t.tech.hint}</span>
              <span className="label latin">{TECH.length} elements</span>
            </div>

            <div
              className="relative"
              onMouseMove={onMove}
              onMouseEnter={() => setSpotOn(true)}
              onMouseLeave={() => {
                setSpotOn(false);
                setPinned(false);
              }}
            >
              {/* Pointer spotlight */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-[320px] w-[320px] rounded-full blur-[70px] transition-opacity duration-500"
                style={{
                  x: spotX,
                  y: spotY,
                  marginLeft: -160,
                  marginTop: -160,
                  opacity: spotOn ? 0.5 : 0,
                  background: `radial-gradient(circle, hsl(${hue} / 0.55), transparent 65%)`,
                }}
              />

              <div className="relative grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
                {TECH.map((item, i) => {
                  const isActive = active.id === item.id;
                  const itemHue = GROUP_HUE[item.group];
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.6, delay: i * 0.035, ease: EASE }}
                      onMouseEnter={() => !pinned && setActive(item)}
                      onFocus={() => setActive(item)}
                      onClick={() => {
                        setActive(item);
                        setPinned(true);
                      }}
                      data-cursor="hover"
                      aria-pressed={isActive}
                      className={cn(
                        "group/cell relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl border p-3 text-start transition-colors duration-500 sm:p-4",
                        isActive
                          ? "border-transparent bg-background"
                          : "border-line bg-background/40 hover:border-transparent",
                      )}
                      style={
                        isActive
                          ? { boxShadow: `inset 0 0 0 1px hsl(${itemHue} / 0.6)` }
                          : undefined
                      }
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute inset-0 transition-opacity duration-500",
                          isActive ? "opacity-100" : "opacity-0 group-hover/cell:opacity-60",
                        )}
                        style={{
                          background: `linear-gradient(160deg, hsl(${itemHue} / 0.18), transparent 60%)`,
                        }}
                      />
                      <span className="relative font-mono text-[10px] tracking-widest text-text-tertiary">
                        {item.no}
                      </span>
                      <span
                        className="relative block text-2xl font-semibold tracking-tight latin transition-colors duration-500 sm:text-[2rem]"
                        style={isActive ? { color: `hsl(${itemHue})` } : undefined}
                      >
                        {item.symbol}
                      </span>
                      <span className="relative truncate text-[11px] text-text-secondary latin sm:text-xs">
                        {item.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Group legend */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {(Object.keys(GROUP_HUE) as Array<keyof typeof GROUP_HUE>).map((g) => (
                <span key={g} className="flex items-center gap-2 text-[11px] text-text-tertiary">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: `hsl(${GROUP_HUE[g]})` }}
                  />
                  {t.tech.groups[g]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
