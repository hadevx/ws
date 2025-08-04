import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart, Building, ArrowRight, Check } from "lucide-react";
import { TabsDemo } from "./TabsDemo";
const Services = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-surface-muted ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            خدماتنا{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              المتخصصة
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            نحن نتخصص في إنشاء حلول ويب مخصصة مصممة خصيصاً لتلبية احتياجاتك وأهدافك المحددة.
          </p>
        </div>
        <TabsDemo />
        {/* Services Grid */}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-text-on-primary">
          <h3 className="text-2xl font-bold mb-4">تحتاج شيئاً مخصصاً؟</h3>
          <p className="text-text-on-primary/90 mb-6 max-w-2xl mx-auto">
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
        </div>
      </div>
    </section>
  );
};

export default Services;
