import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EXT = "jpg";

const WORKS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Website ${i + 1}`,
  src: `/${i + 1}.${EXT}`,
}));

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "6%" : "-6%",
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-6%" : "6%",
    opacity: 0,
    scale: 0.98,
  }),
};

const WorksGallery = () => {
  const works = useMemo(() => WORKS, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number, dir?: number) => {
      const d = dir ?? (index > activeIndex ? 1 : -1);
      setDirection(d);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % works.length);
  }, [works.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + works.length) % works.length);
  }, [works.length]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  const active = works[activeIndex];

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const delta = dragStartX.current - e.clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
    }
  };

  return (
    <section id="portfolio" className="bg-black text-white py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-4">
            أعمالنا
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            مواقع صممناها بشغف
          </h2>
          <p className="mt-4 text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            مجموعة مختارة من مشاريعنا — من الفكرة إلى الإطلاق.
          </p>
        </div>

        {/* Main stage */}
        <div
          className="relative group select-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* Image frame */}
          <div className="relative overflow-hidden rounded-[2rem] bg-neutral-900 shadow-[0_40px_80px_rgba(0,0,0,0.6)] aspect-[16/10] cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={active.id}
                src={active.src}
                alt={active.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 h-full w-full object-contain pointer-events-none"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </AnimatePresence>

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

            {/* Progress bar */}
            {!paused && (
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 overflow-hidden">
                <motion.div
                  key={activeIndex}
                  className="h-full bg-white/70"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </div>
            )}
          </div>

          {/* Left arrow */}
          <button
            onClick={prev}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full
              bg-white/10 hover:bg-white/20
              backdrop-blur-md border border-white/15
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-all duration-200
              hover:scale-110 active:scale-95">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 rounded-full
              bg-white/10 hover:bg-white/20
              backdrop-blur-md border border-white/15
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-all duration-200
              hover:scale-110 active:scale-95">
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Title + counter */}
        <div className="flex items-center justify-between mt-6 px-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-lg font-semibold tracking-tight">
              {active.title}
            </motion.p>
          </AnimatePresence>

          <span className="text-sm text-white/40 tabular-nums">
            {activeIndex + 1} / {works.length}
          </span>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-[6px] mt-6">
          {works.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "rounded-full transition-all duration-400 ease-in-out",
                i === activeIndex
                  ? "w-5 h-[6px] bg-white"
                  : "w-[6px] h-[6px] bg-white/30 hover:bg-white/55",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className="mt-10 flex gap-3 overflow-x-auto pb-1 justify-start sm:justify-center scroll-smooth"
          style={{ scrollbarWidth: "none" }}>
          {works.map((w, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={w.id}
                onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                className={[
                  "flex-shrink-0 relative overflow-hidden rounded-xl transition-all duration-300",
                  isActive
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black opacity-100 scale-100"
                    : "opacity-35 scale-95 hover:opacity-60 hover:scale-[0.98]",
                ].join(" ")}
                style={{ width: 88, height: 56 }}>
                <img
                  src={w.src}
                  alt={w.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorksGallery;
