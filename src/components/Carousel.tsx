import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * WorksGallery (Websites Showcase)
 * - Images must be in /public and named: 1.png ... 8.png (or change EXT below)
 * - TailwindCSS required
 * - Framer Motion required
 */

const EXT = "jpg"; // change to "webp" or "jpg" if your files use another extension

const WorksGallery = () => {
  const works = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const id = i + 1;
        return {
          id,
          title: `Website ${id}`,
          src: `/${id}.${EXT}`,
        };
      }),
    [],
  );

  const [active, setActive] = useState(works[0]);

  return (
    <section id="works" className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold">أعمالنا</h2>
          <p className="mt-3 text-white/75 max-w-2xl mx-auto">
            مجموعة من مواقع الويب التي قمنا بتصميمها وتطويرها. اضغط على أي صورة لعرضها بحجم أكبر.
          </p>
        </div>

        {/* Featured Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 shadow-xl">
              <div className="aspect-[16/10] w-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.id}
                    src={active.src}
                    alt={active.title}
                    className="h-full w-full object-contain bg-black/20"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    draggable={false}
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-white/10">
                <div className="min-w-0">
                  <p className="text-sm text-white/70">المشروع المختار</p>
                  <p className="font-semibold truncate">{active.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const idx = works.findIndex((w) => w.id === active.id);
                      setActive(works[(idx - 1 + works.length) % works.length]);
                    }}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
                    aria-label="Previous">
                    السابق
                  </button>
                  <button
                    onClick={() => {
                      const idx = works.findIndex((w) => w.id === active.id);
                      setActive(works[(idx + 1) % works.length]);
                    }}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
                    aria-label="Next">
                    التالي
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5">
              <p className="text-sm text-white/70 mb-4">كل الأعمال</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                {works.map((w) => {
                  const isActive = w.id === active.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setActive(w)}
                      className={[
                        "group relative overflow-hidden rounded-2xl border transition",
                        isActive
                          ? "border-white/40 ring-2 ring-white/20"
                          : "border-white/10 hover:border-white/25",
                      ].join(" ")}
                      aria-label={`Open ${w.title}`}
                      type="button">
                      <div className="aspect-[16/11] bg-black/20">
                        <img
                          src={w.src}
                          alt={w.title}
                          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          draggable={false}
                          loading="lazy"
                        />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-2">
                        <div className="rounded-xl bg-black/50 backdrop-blur px-2 py-1 border border-white/10">
                          <p className="text-xs font-medium truncate">{w.title}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksGallery;
