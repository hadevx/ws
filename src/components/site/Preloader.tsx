import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { EASE_BRAND } from "./primitives";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setCount(100);
      const id = setTimeout(onDone, 260);
      return () => clearTimeout(id);
    }

    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 620),
    });
    return () => controls.stop();
  }, [onDone, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col justify-between bg-background px-5 py-6 sm:px-8 sm:py-8"
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: EASE_BRAND }}
    >
      {/* Top rail */}
      <div className="flex items-start justify-between">
        <span className="label">{t.preloader.label}</span>
        <span className="label latin">KWT · 29.37°N</span>
      </div>

      {/* Centre wordmark with a fill sweep driven by progress */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative select-none">
          <span className="display display-lg block text-line" aria-hidden>
            WEBSCHEMA
          </span>
          <span
            className="display display-lg absolute inset-0 block overflow-hidden whitespace-nowrap text-foreground"
            style={{ clipPath: `inset(0 ${100 - count}% 0 0)` }}
          >
            WEBSCHEMA
          </span>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="flex items-end justify-between">
        <div className="h-px flex-1 origin-left bg-line">
          <motion.div
            className="h-px bg-signal"
            style={{ width: `${count}%` }}
            transition={{ duration: 0 }}
          />
        </div>
        <span className="ms-6 font-mono text-3xl tabular-nums leading-none sm:text-5xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </motion.div>
  );
}
