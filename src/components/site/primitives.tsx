import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_BRAND = [0.32, 0.72, 0, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Environment                                                                */
/* -------------------------------------------------------------------------- */

/** True on touch / stylus devices, where hover-driven effects should stand down. */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}

/* -------------------------------------------------------------------------- */
/*  Reveal — the workhorse enter animation                                     */
/* -------------------------------------------------------------------------- */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "span" | "li" | "section" | "figure";
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.9,
  once = true,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0.3 : duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/*  SplitWords — masked, staggered word reveal                                 */
/*  Splits on whitespace only, never on characters: Arabic shaping must not    */
/*  be broken apart.                                                           */
/* -------------------------------------------------------------------------- */

interface SplitWordsProps {
  text: string | string[];
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Render each array entry as its own line. */
  lines?: boolean;
  once?: boolean;
  /** Words matching these strings get the signal colour. */
  accent?: string[];
  animateOnMount?: boolean;
}

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  lines = false,
  once = true,
  accent = [],
  animateOnMount = false,
}: SplitWordsProps) {
  const reduced = useReducedMotion();
  const source = Array.isArray(text) ? text : [text];

  // Each word starts fully outside its own overflow-hidden mask, so the word
  // itself can never be "in view" — the trigger has to live on the wrapper,
  // which then propagates the variant label down to every word.
  const wordVariants = reduced
    ? {
        hidden: { opacity: 0 },
        show: (d: number) => ({ opacity: 1, transition: { duration: 0.4, delay: d } }),
      }
    : {
        hidden: { y: "110%", opacity: 0 },
        show: (d: number) => ({
          y: "0%",
          opacity: 1,
          transition: { duration: 1, delay: d, ease: EASE },
        }),
      };

  let index = 0;

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      {...(animateOnMount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once, margin: "0px 0px -8% 0px" } })}
    >
      {source.map((line, li) => (
        <span key={li} className={cn(lines && "block")}>
          {line
            .split(/\s+/)
            .filter(Boolean)
            .map((word) => {
              const i = index++;
              const isAccent = accent.includes(word);
              return (
                <span
                  key={`${li}-${i}`}
                  className="inline-flex overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] me-[0.26em]"
                >
                  <motion.span
                    className={cn("inline-block", isAccent && "text-signal", wordClassName)}
                    variants={wordVariants}
                    custom={delay + i * stagger}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
        </span>
      ))}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Magnetic — pointer-attracted wrapper                                       */
/* -------------------------------------------------------------------------- */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const disabled = reduced || coarse;

  const onMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={disabled ? undefined : { x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ActionButton — the site's primary CTA                                      */
/* -------------------------------------------------------------------------- */

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
  type?: "button" | "submit";
}

export function ActionButton({
  children,
  onClick,
  href,
  variant = "solid",
  size = "md",
  className,
  arrow = true,
  magnetic = true,
  type = "button",
}: ActionButtonProps) {
  const base = cn(
    "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full",
    "font-medium tracking-tight transition-colors duration-500 ease-brand",
    "focus-visible:outline-2 focus-visible:outline-offset-4",
    size === "sm" && "h-9 px-5 text-[13px]",
    size === "md" && "h-12 px-7 text-sm",
    size === "lg" && "h-14 px-9 text-base",
    variant === "solid" && "bg-foreground text-background",
    variant === "outline" && "border border-line text-foreground hover:border-transparent",
    variant === "ghost" && "text-foreground",
    className,
  );

  const inner = (
    <>
      {/* Wipe fill */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-brand group-hover/btn:scale-y-100",
          variant === "solid" ? "bg-signal" : "bg-foreground",
        )}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-500 ease-brand",
          variant === "solid" && "group-hover/btn:text-background",
          variant !== "solid" && "group-hover/btn:text-background",
        )}
      >
        {children}
      </span>
      {arrow && (
        <span
          aria-hidden
          className={cn(
            "relative z-10 inline-block transition-all duration-500 ease-brand arrow-fwd",
            "group-hover/btn:translate-x-1",
            variant === "solid" && "group-hover/btn:text-background",
            variant !== "solid" && "group-hover/btn:text-background",
          )}
        >
          →
        </span>
      )}
    </>
  );

  const node = href ? (
    <a href={href} className={base} data-cursor="hover">
      {inner}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={base} data-cursor="hover">
      {inner}
    </button>
  );

  return magnetic ? <Magnetic strength={0.28}>{node}</Magnetic> : node;
}

/* -------------------------------------------------------------------------- */
/*  Section furniture                                                          */
/* -------------------------------------------------------------------------- */

export function Overline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("label inline-flex items-center gap-2.5", className)}>
      <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-signal" />
      {children}
    </span>
  );
}

export function SectionHead({
  overline,
  title,
  lead,
  align = "start",
  className,
}: {
  overline: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <Overline>{overline}</Overline>
      </Reveal>
      <h2 className="display display-md max-w-[16ch]">
        <SplitWords text={title} stagger={0.05} />
      </h2>
      {lead && (
        <Reveal delay={0.12}>
          <p className={cn("lead max-w-[52ch]", align === "center" && "mx-auto")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Counter — number ticker on entry                                           */
/* -------------------------------------------------------------------------- */

export function Counter({
  value,
  duration = 1.8,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee — CSS-driven, direction aware                                      */
/* -------------------------------------------------------------------------- */

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
  pauseOnHover = false,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  // One copy has to be at least as wide as the strip, otherwise the hand-off at
  // the halfway point exposes bare track. The viewport is the widest the strip
  // can be, so it is a safe floor; when the content already exceeds it the
  // min-width and the distribution are both inert.
  const copy = "flex min-w-[100vw] shrink-0 items-center justify-around";

  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex w-max shrink-0 items-center gpu",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{
          ["--marquee-duration" as string]: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className={copy}>{children}</div>
        <div className={copy} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
