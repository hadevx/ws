import { motion, useScroll, useSpring } from "motion/react";
import { useLang } from "@/i18n/LanguageProvider";

export default function ScrollProgress() {
  const { flow } = useLang();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[130] h-[2px] bg-signal"
      style={{ scaleX, transformOrigin: flow === 1 ? "left" : "right" }}
    />
  );
}
