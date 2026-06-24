import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

const ease = [0.32, 0.72, 0, 1] as const;

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.35, ease }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 bg-foreground text-background
              px-5 py-3 rounded-full shadow-2xl
              hover:scale-105 active:scale-95
              transition-transform duration-200
              text-sm font-semibold whitespace-nowrap">
            احصل على عرض سعر
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, delay: 0.06, ease }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-background border border-border shadow-lg
              flex items-center justify-center
              hover:scale-110 active:scale-95
              transition-transform duration-200">
            <ArrowUp className="h-4 w-4 text-text-secondary" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
