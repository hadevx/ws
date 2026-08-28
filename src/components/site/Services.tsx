import { useLang } from "@/i18n/LanguageProvider";
import { SERVICE_IMAGES } from "@/i18n/data";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useState } from "react";
import { EASE, EASE_BRAND, Reveal, SectionHead, useCoarsePointer } from "./primitives";

export default function Services() {
  const { t, flow } = useLang();
  const coarse = useCoarsePointer();
  const reduced = useReducedMotion();

  const [hovered, setHovered] = useState<number | null>(null);
  const [openRow, setOpenRow] = useState<number | null>(0);

  // Floating preview follows the pointer with a little inertia.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const py = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  const trackPointer = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  const showPreview = !coarse && !reduced && hovered !== null;

  return (
    <section id="services" className="section relative">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              overline={t.services.overline}
              title={t.services.title}
              lead={t.services.lead}
              className="lg:sticky lg:top-32"
            />
          </div>

          {/* Rows */}
          <ul
            className="lg:col-span-7"
            onMouseLeave={() => setHovered(null)}
            onMouseMove={trackPointer}
          >
            {t.services.items.map((item, i) => {
              const isHot = hovered === i;
              const isOpen = openRow === i;
              return (
                <Reveal as="li" key={item.id} delay={i * 0.05} y={20} amount={0.4}>
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onClick={() => setOpenRow(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    data-cursor="hover"
                    className="group relative block w-full border-t border-line py-6 text-start last:border-b sm:py-7"
                  >
                    {/* Hover wash */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-[-1rem] inset-y-0 -z-10 rounded-lg bg-surface transition-opacity duration-500",
                        isHot ? "opacity-100" : "opacity-0",
                      )}
                    />

                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={cn(
                          "label latin shrink-0 transition-colors duration-500",
                          isHot && "text-signal",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <motion.h3
                        className="display flex-1 text-[clamp(1.35rem,3vw,2.15rem)] leading-tight"
                        animate={
                          reduced ? undefined : { x: isHot ? 10 * flow : 0 }
                        }
                        transition={{ duration: 0.6, ease: EASE_BRAND }}
                      >
                        {item.title}
                      </motion.h3>

                      <motion.span
                        aria-hidden
                        className="shrink-0 text-lg text-text-tertiary arrow-fwd"
                        animate={{
                          opacity: isHot || isOpen ? 1 : 0.3,
                          rotate: isOpen ? 45 : 0,
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        {isOpen ? "+" : "→"}
                      </motion.span>
                    </div>

                    {/* Expanded detail */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE_BRAND }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-5 pt-5 ps-8 sm:ps-14 md:flex-row md:items-start md:gap-8">
                            <div className="flex-1 space-y-4">
                              <p className="max-w-[54ch] text-sm leading-relaxed text-text-secondary">
                                {item.desc}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-tertiary"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Inline thumbnail — the mobile stand-in for the cursor preview */}
                            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-line bg-surface md:w-52 lg:hidden">
                              <img
                                src={SERVICE_IMAGES[item.id]}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover object-top"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Cursor-following preview (desktop) */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            key="preview"
            className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
            style={{ x: px, y: py }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="-translate-x-1/2 -translate-y-[115%]">
              <div className="relative h-[190px] w-[300px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.55)]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={hovered}
                    src={SERVICE_IMAGES[t.services.items[hovered!].id]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </AnimatePresence>
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
                  {t.services.items[hovered!].title}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
