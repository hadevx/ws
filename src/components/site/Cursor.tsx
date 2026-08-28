import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useCoarsePointer } from "./primitives";

/**
 * Custom cursor: a fast dot plus a lagging ring. Elements opt in via
 * `data-cursor="hover" | "drag"` or `data-cursor-text="View project"`.
 */
export default function Cursor() {
  const coarse = useCoarsePointer();
  const reduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 });

  const [mode, setMode] = useState<"default" | "hover" | "drag">("default");
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const disabled = coarse || reduced;

  // Hide the native cursor only while ours is actually mounted and active.
  useEffect(() => {
    if (disabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], [data-cursor-text], a, button",
      ) as HTMLElement | null;

      if (!el) {
        setMode("default");
        setLabel(null);
        return;
      }

      const text = el.getAttribute("data-cursor-text");
      const kind = el.getAttribute("data-cursor");
      setLabel(text);
      if (kind === "drag") setMode("drag");
      else if (kind === "hover" || text || el.tagName === "A" || el.tagName === "BUTTON")
        setMode("hover");
      else setMode("default");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled, visible, x, y]);

  if (disabled) return null;

  const ringSize = label ? 76 : mode === "hover" ? 46 : mode === "drag" ? 64 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden lg:block" aria-hidden>
      {/* Ring */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-foreground/50 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Fill, separated from the ring so we animate opacity rather than a
            CSS-variable colour (which motion can't interpolate). */}
        <motion.span
          className="absolute inset-0 rounded-full bg-foreground"
          animate={{ opacity: label ? 0.92 : 0 }}
          transition={{ duration: 0.25 }}
        />
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="relative px-2 text-center text-[9px] font-mono uppercase tracking-[0.14em] leading-tight text-background"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dot */}
      <motion.div
        className="absolute top-0 left-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-foreground mix-blend-difference"
        style={{ x, y }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: mode === "hover" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
