import { ArrowLeft, Mail, Phone, MapPin, Instagram, Twitter, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import Modal from "./Modal";

const ease = [0.32, 0.72, 0, 1] as const;

const quickLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "خدماتنا", href: "#services" },
  { label: "أعمالنا", href: "#portfolio" },
  { label: "آراء العملاء", href: "#testimonials" },
  { label: "تواصل معنا", href: "#contact" },
];

const services = [
  { label: "متجر إلكتروني" },
  { label: "موقع شخصي" },
  { label: "موقع شركة" },
  { label: "مدونة" },
  { label: "تطوير مخصص" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/96598909936" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  const scroll = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#0a0a0a] text-white">

      {/* ── CTA strip ── */}
      <div className="border-b border-white/8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
            <p className="text-white/55 text-sm">
              جاهز لتحويل فكرتك إلى موقع احترافي؟
            </p>
            <button
              onClick={() => scroll("#contact")}
              className="group flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors duration-200">
              احصل على عرض سعر مجاني
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main columns ── */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease }}>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">

          {/* Company */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <span className="text-xl font-bold tracking-tight text-white">
                webschema
              </span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-[220px]">
              نبني مواقع استثنائية تحقق النتائج، بإبداع لا حدود له وخبرة تقنية متميزة.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-200">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white/35 text-[11px] font-semibold tracking-[0.16em] uppercase mb-5">
              التنقل
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scroll(link.href)}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/35 text-[11px] font-semibold tracking-[0.16em] uppercase mb-5">
              خدماتنا
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => scroll("#services")}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200">
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/35 text-[11px] font-semibold tracking-[0.16em] uppercase mb-5">
              تواصل معنا
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:webschema@outlook.com"
                  className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm transition-colors duration-200 group">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100" />
                  webschema@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+96598909936"
                  className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm transition-colors duration-200 group">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100" />
                  98909936 (+965)
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/55 text-sm">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                الكويت
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">

            <p className="text-white/30 text-xs">
              © {year} WebSchema. جميع الحقوق محفوظة.
            </p>

            <div className="flex items-center gap-5 text-xs text-white/30">
              <Modal title={title1} body={body1}>
                <span className="cursor-pointer hover:text-white/70 transition-colors duration-200">
                  سياسة الخصوصية
                </span>
              </Modal>
              <span className="w-px h-3 bg-white/15" />
              <Modal title={title2} body={body2}>
                <span className="cursor-pointer hover:text-white/70 transition-colors duration-200">
                  شروط الخدمة
                </span>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ── Legal copy ── */
const title1 = "سياسة الخصوصية – ويب سكيما";
const body1 = `
نحن في ويب سكيما نحرص على خصوصية زوارنا وعملائنا ونلتزم بحماية البيانات الشخصية التي يتم جمعها واستخدامها عند زيارتك لموقعنا أو استخدام خدماتنا.

1. المعلومات التي نقوم بجمعها:
- الاسم الكامل
- البريد الإلكتروني
- رقم الهاتف
- بيانات المشروع (إذا تم تزويدنا بها عند طلب خدمة)
- معلومات التصفح (مثل نوع الجهاز، المتصفح، الصفحات التي تم زيارتها)

2. كيف نستخدم المعلومات:
- تقديم خدماتنا وتحسينها
- التواصل معك بشأن طلباتك أو استفساراتك
- إرسال تحديثات وعروض (بموافقتك)
- تحليل أداء الموقع وتحسين تجربة المستخدم

3. مشاركة المعلومات:
نحن لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة، باستثناء:
- في حال وجود طلب قانوني رسمي من الجهات المختصة
- مع مزودي خدمات موثوقين يساعدوننا في إدارة الموقع أو تنفيذ بعض المهام

4. حماية البيانات:
نستخدم إجراءات أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإتلاف.

5. ملفات تعريف الارتباط (Cookies):
نستخدم ملفات تعريف الارتباط لتحسين تجربة الاستخدام وتحليل الأداء. يمكنك اختيار تعطيلها من إعدادات المتصفح.

6. حقوقك:
- الوصول إلى معلوماتك الشخصية
- تعديل أو حذف بياناتك
- سحب الموافقة على استخدام بياناتك

7. التعديلات على سياسة الخصوصية:
قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر أي تعديلات على هذه الصفحة مع تاريخ آخر تحديث.

8. التواصل معنا:
📧 البريد الإلكتروني: webschema@outlook.com
📞 الهاتف: 98909936

آخر تحديث: 4 أغسطس 2025
`;

const title2 = "شروط الخدمة – ويب سكيما";
const body2 = `
باستخدامك لموقع ويب سكيما أو أي من خدماتنا، فإنك توافق على الالتزام بالشروط والأحكام التالية. يرجى قراءتها بعناية.

1. قبول الشروط:
عند استخدامك للموقع أو التواصل معنا لطلب خدمة، فإنك تقر بأنك قرأت وفهمت ووافقت على هذه الشروط.

2. طبيعة الخدمة:
نقدم خدمات تصميم وبرمجة المواقع والمتاجر الإلكترونية، وقد تشمل الخدمة عناصر مخصصة بحسب الاتفاق مع العميل.

3. التعديلات:
يحق لنا تعديل هذه الشروط في أي وقت، وسيتم إشعار المستخدمين بأي تغييرات عبر الموقع.

4. الملكية الفكرية:
جميع الحقوق الفكرية للتصاميم والكود والمواد المقدمة من قبلنا محفوظة، ولا يحق إعادة استخدامها أو بيعها دون إذن مكتوب.

5. المحتوى المقدم من العميل:
أنت تتحمل المسؤولية الكاملة عن أي محتوى تزودنا به، ويجب ألا ينتهك أي حقوق لطرف ثالث.

6. الدفع والاسترجاع:
يتم الاتفاق على الأسعار قبل بدء العمل. في حال الإلغاء بعد بدء التنفيذ، قد لا يتم استرداد كامل المبلغ.

7. حدود المسؤولية:
نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة تنتج عن استخدام الموقع أو الخدمات.

8. الدعم الفني:
نقدم دعمًا فنيًا محدودًا بعد تسليم المشروع حسب ما تم الاتفاق عليه في العقد أو الفاتورة.

9. القانون المعمول به:
تخضع هذه الشروط للقوانين المحلية لدولة الكويت، وأي نزاع يتم حله عبر الجهات القانونية المختصة.

آخر تحديث: 4 أغسطس 2025
`;

export default Footer;
