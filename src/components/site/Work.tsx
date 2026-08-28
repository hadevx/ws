import { useLang } from "@/i18n/LanguageProvider";
import { PROJECTS } from "@/i18n/data";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Overline, Reveal, SplitWords } from "./primitives";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

interface CardProps {
  index: number;
  img: string;
  year: string;
  stack: string[];
  tint: string;
  name: string;
  category: string;
  desc: string;
  view: string;
  horizontal?: boolean;
}

function ProjectCard({
  index,
  img,
  year,
  stack,
  tint,
  name,
  category,
  desc,
  view,
  horizontal,
}: CardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col",
        // In the pinned gallery the card is height-driven: it fills whatever the
        // viewport leaves, so short windows crop the shot instead of clipping it.
        horizontal ? "h-full w-[min(70vw,700px)] shrink-0" : "w-full",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-line bg-surface",
          horizontal && "min-h-0 flex-1",
        )}
        data-cursor-text={view}
        style={{ ["--tint" as string]: tint }}
      >
        {/* Tint glow on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120% 80% at 50% 110%, hsl(${tint} / 0.35), transparent 70%)`,
          }}
        />
        <div className={cn("overflow-hidden", horizontal ? "h-full" : "aspect-[16/10]")}>
          <img
            src={img}
            alt={name}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top transition-transform duration-1000 ease-brand group-hover:scale-[1.05]"
          />
        </div>

        {/* Index chip */}
        <span className="latin absolute start-4 top-4 z-20 rounded-full bg-background/80 px-3 py-1 font-mono text-[10px] tracking-widest backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Meta */}
      <div
        className={cn(
          "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
          horizontal ? "mt-5 shrink-0" : "mt-6",
        )}
      >
        <div className="max-w-[46ch]">
          <div className="flex items-baseline gap-3">
            <h3 className="display text-[clamp(1.3rem,2.4vw,2rem)] leading-tight">{name}</h3>
            <span className="label latin">{year}</span>
          </div>
          <p className="mt-1 text-sm text-signal">{category}</p>
          {/* The blurb is the first thing to go when the window is short */}
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed text-text-secondary",
              horizontal && "hidden [@media(min-height:800px)]:block",
            )}
          >
            {desc}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-tertiary latin"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function HorizontalTrack({
  x,
  trackRef,
  children,
}: {
  x: MotionValue<number>;
  trackRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      ref={trackRef}
      style={{ x }}
      className="flex h-full gap-8 gpu will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export default function Work() {
  const { t, flow } = useLang();
  const desktop = useIsDesktop();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Measure how far the track has to travel.
  useEffect(() => {
    if (!desktop) {
      setDistance(0);
      return;
    }
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const padding = window.innerWidth * 0.08;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + padding));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [desktop, t]);

  const x = useTransform(scrollYProgress, [0.06, 0.96], [0, -distance * flow]);
  const progress = useTransform(scrollYProgress, [0.06, 0.96], [0, 1]);

  const header = (
    <div className="flex flex-col gap-5">
      <Reveal>
        <Overline>{t.work.overline}</Overline>
      </Reveal>
      <h2 className="display display-lg max-w-[12ch]">
        <SplitWords text={t.work.title} stagger={0.05} />
      </h2>
      <Reveal delay={0.1}>
        <p className="lead max-w-[52ch]">{t.work.lead}</p>
      </Reveal>
    </div>
  );

  /* ---------------- Mobile / tablet: vertical stack ---------------- */
  if (!desktop) {
    return (
      // The ref stays attached in both layouts so `useScroll` always has a live target.
      <section id="work" ref={sectionRef} className="section relative">
        <div className="shell">
          {header}
          <div className="mt-16 space-y-20">
            {PROJECTS.map((p, i) => {
              const copy = t.work.projects[p.id];
              return (
                <Reveal key={p.id} y={32} amount={0.15}>
                  <ProjectCard
                    index={i}
                    img={p.img}
                    year={p.year}
                    stack={p.stack}
                    tint={p.tint}
                    view={t.work.view}
                    {...copy}
                  />
                </Reveal>
              );
            })}
          </div>
          <p className="mt-20 max-w-[52ch] border-t border-line pt-6 text-sm text-text-secondary">
            {t.work.all}
          </p>
        </div>
      </section>
    );
  }

  /* ---------------- Desktop: pinned horizontal scroll ---------------- */
  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative"
      style={{ height: `${PROJECTS.length * 78 + 60}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Compact header: the pinned viewport has to fit header + card + meta */}
        <div className="shell shrink-0 pb-6 pt-20 [@media(min-height:800px)]:pb-8 [@media(min-height:800px)]:pt-24">
          <div className="flex items-end justify-between gap-12">
            <div className="flex flex-col gap-3">
              <Reveal>
                <Overline>{t.work.overline}</Overline>
              </Reveal>
              <h2 className="display display-md">
                <SplitWords text={t.work.title} stagger={0.05} />
              </h2>
            </div>
            <div className="flex shrink-0 items-end gap-10">
              <Reveal delay={0.1}>
                <p className="hidden max-w-[38ch] text-sm text-text-secondary xl:block">
                  {t.work.lead}
                </p>
              </Reveal>
              <div className="hidden shrink-0 items-center gap-3 lg:flex">
                <span className="label">{t.work.drag}</span>
                <span aria-hidden className="text-signal arrow-fwd">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Takes the leftover height and hands it to the cards */}
        <div className="min-h-0 flex-1 ps-[4vw]">
          <HorizontalTrack x={x} trackRef={trackRef}>
            {PROJECTS.map((p, i) => {
              const copy = t.work.projects[p.id];
              return (
                <ProjectCard
                  key={p.id}
                  horizontal
                  index={i}
                  img={p.img}
                  year={p.year}
                  stack={p.stack}
                  tint={p.tint}
                  view={t.work.view}
                  {...copy}
                />
              );
            })}
            {/* Closing note travels with the track */}
            <div className="flex w-[420px] shrink-0 items-center">
              <p className="border-t border-line pt-6 text-sm leading-relaxed text-text-secondary">
                {t.work.all}
              </p>
            </div>
          </HorizontalTrack>
        </div>

        {/* Track progress */}
        <div className="shell shrink-0 py-6 [@media(min-height:800px)]:py-8">
          <div className="h-px w-full bg-line">
            <motion.div
              className="h-px bg-signal"
              style={{ scaleX: progress, transformOrigin: flow === 1 ? "left" : "right" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
