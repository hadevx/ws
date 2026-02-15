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
// import { ShineBorder } from "@/components/magicui/shine-border";
import Shine from "./Shine";
// import { TextReveal } from "@/components/magicui/text-reveal";

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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

    // Construct message
    const msg = `
 طلب جديد من ${formData.name}:

 الاسم: ${formData.name}

 البريد: ${formData.email}



 نوع المشروع: ${formData.projectType || "-"}



 المدة: ${formData.timeline || "-"}
 
 التفاصيل:
${formData.message}
`;

    const phone = "96598909936"; // Your WhatsApp number (no +, no spaces)
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    // Open WhatsApp
    window.open(url, "_blank");
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      content: "webschema@outlook.com",
      description: "راسلنا في أي وقت",
      clickable: true,
    },
    {
      icon: Phone,
      title: "الهاتف",
      content: "98909936",
      description: "متواجدون طوال أيام الاسبوع",
      clickable: true,
    },
    {
      icon: MapPin,
      title: "الموقع",
      content: "مدينة الكويت",
      description: "فريق يعمل عن بعد",
      clickable: false,
    },
    {
      icon: Clock,
      title: "وقت الاستجابة",
      content: "> 24 ساعة",
      description: "نرد بسرعة",
      clickable: false,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-surface-muted">
      {/*  <TextReveal>
        هل تريد موقعًا يجذب الانتباه ويعكس هوية علامتك بقوّة؟ أنت في المكان المناسب دعنا نساعدك في
        تحديد الموقع المناسب لك
      </TextReveal> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            دعنا{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              نعمل معاً
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            مستعد لبدء مشروعك؟ تواصل معنا ودعنا نناقش كيف يمكننا تحويل رؤيتك إلى حقيقة.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r  from-gray-900 to-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-text-on-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">{info.title}</h3>
                        <p className="text-brand-primary font-medium mb-1">{info.content}</p>
                        <p className="text-sm text-text-secondary">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 ">
            <Shine>
              <Card className="border border-border h-full relative overflow-hidden   w-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-text-primary">
                    احصل على عرض سعرك المجاني
                  </CardTitle>
                  <p className="text-text-secondary">
                    أخبرنا عن مشروعك وسنقدم لك اقتراحاً مفصلاً خلال 24 ساعة.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label htmlFor="projectType">نوع المشروع</Label>
                        <Select onValueChange={(value) => handleInputChange("projectType", value)}>
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
                        <Label htmlFor="timeline">الجدول الزمني للمشروع</Label>
                        <Select onValueChange={(value) => handleInputChange("timeline", value)}>
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

                    <Button type="submit" variant="default" className="w-full " size="lg">
                      <Send className="ml-2 h-5 w-5" />
                      إرسال الرسالة والحصول على عرض سعر
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Shine>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
