import { motion } from "motion/react";
import { Zap, Shield, Headphones } from "lucide-react";

const items = [
  {
    icon: Zap,
    title: "تسليم سريع",
    desc: "نلتزم بالمواعيد المحددة ونُسلّم مشروعك في الوقت المتفق عليه دون أي تأخير.",
  },
  {
    icon: Shield,
    title: "جودة مضمونة",
    desc: "كل موقع نبنيه يمر بمراجعة دقيقة للكود والتصميم لضمان أعلى معايير الجودة.",
  },
  {
    icon: Headphones,
    title: "دعم ما بعد الإطلاق",
    desc: "علاقتنا لا تنتهي بالتسليم. نحن هنا لدعمك وتطوير موقعك بعد الإطلاق.",
  },
];

const ease = [0.32, 0.72, 0, 1] as const;

const Features = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] text-text-secondary uppercase mb-3">
          لماذا ويب سكيما
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">مبني على الثقة</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: i * 0.12, ease }}
            className="bg-background p-8 sm:p-12 flex flex-col items-center text-center group hover:bg-surface-muted transition-colors duration-300">
            <div className="w-14 h-14 rounded-2xl bg-surface-muted group-hover:bg-background flex items-center justify-center mb-6 transition-colors duration-300 ring-1 ring-border">
              <item.icon className="h-6 w-6 text-text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
