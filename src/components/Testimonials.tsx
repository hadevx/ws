import { NumberTicker } from "@/components/magicui/number-ticker";
import { MarqueeDemo } from "./MarqueeDemo";
import { motion } from "motion/react";

const ease = [0.32, 0.72, 0, 1] as const;

const stats = [
  { value: 98, suffix: "%", label: "رضا العملاء" },
  { value: 50, suffix: "+", label: "عملاء سعداء" },
  { value: 4.9, suffix: "/5", label: "متوسط التقييم", decimal: 1 },
  { value: 95, suffix: "%", label: "أعمال متكررة" },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}>
          <p className="text-xs font-semibold tracking-[0.2em] text-text-secondary uppercase mb-3">
            آراء العملاء
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            ماذا يقول{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              عملاؤنا
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            لا تأخذ كلامنا فقط. إليك ما يقوله عملاؤنا الراضون عن العمل مع ويب سكيما.
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease }}>
          <MarqueeDemo />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-10 text-center text-text-on-primary"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}>
          <h3 className="text-2xl font-bold mb-10">موثوق من قبل عملاء رائعين</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}>
                <div className="text-4xl font-bold mb-2 tabular-nums">
                  {s.suffix === "%" && "%"}
                  <NumberTicker
                    value={s.value}
                    decimalPlaces={s.decimal ?? 0}
                    className="text-white"
                  />
                  {s.suffix !== "%" && s.suffix}
                </div>
                <div className="text-text-on-primary/70 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
