import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TabsDemo } from "./TabsDemo";
import { motion } from "motion/react";

const ease = [0.32, 0.72, 0, 1] as const;

const Services = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-24 bg-surface-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}>
          <p className="text-xs font-semibold tracking-[0.2em] text-text-secondary uppercase mb-3">
            ما نقدمه
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            خدماتنا{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              المتخصصة
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            نحن نتخصص في إنشاء حلول ويب مخصصة مصممة خصيصاً لتلبية احتياجاتك وأهدافك المحددة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease }}>
          <TabsDemo />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-10 text-text-on-primary"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}>
          <h3 className="text-2xl font-bold mb-4">تحتاج شيئاً مخصصاً؟</h3>
          <p className="text-text-on-primary/80 mb-6 max-w-2xl mx-auto leading-relaxed">
            كل مشروع فريد من نوعه. دعنا نناقش متطلباتك المحددة ونصنع حلاً يناسب احتياجاتك تماماً.
          </p>
          <Button
            variant="custom"
            size="lg"
            onClick={scrollToContact}
            className="bg-white text-black hover:bg-white/90">
            ناقش مشروعك
            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
