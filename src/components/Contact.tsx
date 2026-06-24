import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Shine from "./Shine";
import { motion } from "motion/react";

const ease = [0.32, 0.72, 0, 1] as const;

const contactInfo = [
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    content: "webschema@outlook.com",
    description: "راسلنا في أي وقت",
  },
  {
    icon: Phone,
    title: "الهاتف",
    content: "98909936",
    description: "متواجدون طوال أيام الاسبوع",
  },
  {
    icon: MapPin,
    title: "الموقع",
    content: "مدينة الكويت",
    description: "فريق يعمل عن بعد",
  },
  {
    icon: Clock,
    title: "وقت الاستجابة",
    content: "> 24 ساعة",
    description: "نرد بسرعة",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "يرجى ملء الحقول المطلوبة",
        description: "الاسم والبريد الإلكتروني والرسالة مطلوبة.",
        variant: "destructive",
      });
      return;
    }
    const msg = `طلب جديد من ${formData.name}:\n\nالاسم: ${formData.name}\nالبريد: ${formData.email}\nنوع المشروع: ${formData.projectType || "-"}\nالمدة: ${formData.timeline || "-"}\n\nالتفاصيل:\n${formData.message}`;
    window.open(`https://wa.me/96598909936?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-surface-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}>
          <p className="text-xs font-semibold tracking-[0.2em] text-text-secondary uppercase mb-3">
            تواصل معنا
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            دعنا{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              نعمل معاً
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            مستعد لبدء مشروعك؟ تواصل معنا ودعنا نناقش كيف يمكننا تحويل رؤيتك إلى حقيقة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}>
                <Card className="border border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-0.5 text-sm">{info.title}</h3>
                        <p className="text-brand-primary font-medium text-sm mb-0.5">{info.content}</p>
                        <p className="text-xs text-text-secondary">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}>
            <Shine>
              <Card className="border border-border h-full relative overflow-hidden w-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-text-primary">
                    احصل على عرض سعرك المجاني
                  </CardTitle>
                  <p className="text-text-secondary">
                    أخبرنا عن مشروعك وسنقدم لك اقتراحاً مفصلاً خلال 24 ساعة.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="الاسم الكامل"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>نوع المشروع</Label>
                        <Select onValueChange={(v) => handleInputChange("projectType", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع المشروع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecommerce">متجر إلكتروني</SelectItem>
                            <SelectItem value="personal">موقع شخصي</SelectItem>
                            <SelectItem value="business">موقع شركة</SelectItem>
                            <SelectItem value="custom">حل مخصص</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>الجدول الزمني</Label>
                        <Select onValueChange={(v) => handleInputChange("timeline", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجدول الزمني" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">في أسرع وقت ممكن</SelectItem>
                            <SelectItem value="1-2weeks">1-2 أسبوع</SelectItem>
                            <SelectItem value="1month">شهر واحد</SelectItem>
                            <SelectItem value="2-3months">2-3 أشهر</SelectItem>
                            <SelectItem value="flexible">مرن</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">تفاصيل المشروع *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="أخبرنا عن مشروعك وأهدافك وأي متطلبات محددة..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" variant="default" className="w-full" size="lg">
                      <Send className="ml-2 h-5 w-5" />
                      إرسال الرسالة والحصول على عرض سعر
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Shine>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
