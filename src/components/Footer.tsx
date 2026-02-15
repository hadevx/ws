import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

import Modal from "./Modal";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "الرئيسية", href: "#home" },
    { label: "خدماتنا", href: "#services" },
    { label: "أعمالنا", href: "#portfolio" },
    { label: "فريقنا", href: "#team" },
    { label: "آراء العملاء", href: "#testimonials" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  const services = [
    { label: "المواقع الشخصية", href: "#services" },
    { label: "حلول التجارة الإلكترونية", href: "#services" },
    { label: "مواقع الشركات", href: "#services" },
    { label: "التطوير المخصص", href: "#services" },
  ];

  return (
    <footer className="bg-text-primary text-text-on-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <span className="text-3xl font-bold text-transparent bg-clip-text  bg-gradient-to-r from-gray-200 to-gray-400 drop-shadow-[10px_10px_10px_black]">
                  webschema
                </span>
              </div>
              <p className="text-text-on-primary/80 mb-6 leading-relaxed">
                نبني مواقع استثنائية تحقق النتائج. نجمع بين الإبداع والخبرة التقنية لتقديم حلول ويب
                تتجاوز التوقعات.
              </p>
            </div>

            {/* Quick Links */}
            <div className="">
              <h3 className="text-lg font-semibold mb-6">روابط سريعة</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 hover:text-white transition-colors duration-200">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">خدماتنا</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(service.href)}
                      className="text-white/70 hover:text-white transition-colors duration-200">
                      {service.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">تواصل معنا</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white/70 hover:text-white">webschema@outlook.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white/70 hover:text-white"> 98909936 (965+)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white/70 hover:text-white">الكويت</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="custom"
                  onClick={() => scrollToSection("#contact")}
                  className="w-full sm:w-auto bg-white text-black hover:bg-white/80">
                  ابدأ مشروعك
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-text-on-primary/60">
              <span>© {currentYear} webschema </span>
            </div>
            <div className="flex gap-6 text-sm text-text-on-primary/60">
              <button className="text-white/70 hover:text-white transition-colors">
                <Modal title={title1} body={body1}>
                  سياسة الخصوصية
                </Modal>
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <Modal title={title2} body={body2}>
                  شروط الخدمة
                </Modal>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
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
📧 البريد الإلكتروني: info@webschema.com
📞 الهاتف:  98909936 

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
