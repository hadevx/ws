// import { Card, CardContent } from "@/components/ui/card";
// import { Star, Quote } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { MarqueeDemo } from "./MarqueeDemo";
/* import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity"; */

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            ماذا يقول{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              عملاؤنا
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            لا تأخذ كلامنا فقط. إليك ما يقوله عملاؤنا الراضون عن العمل مع ويب سكيما.
          </p>
        </div>

        {/* Marquee */}
        <MarqueeDemo />

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-center text-text-on-primary">
          <h3 className="text-2xl font-bold mb-8">موثوق من قبل عملاء رائعين</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">
                %
                <NumberTicker value={98} className="text-white" />
              </div>
              <div className="text-text-on-primary/90 text-sm">رضا العملاء</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                <NumberTicker value={50} className="text-white" />+
              </div>
              <div className="text-text-on-primary/90 text-sm">عملاء سعداء</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                5/
                <NumberTicker value={4.9} decimalPlaces={1} className="text-white" />
              </div>
              <div className="text-text-on-primary/90 text-sm">متوسط التقييم</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                %
                <NumberTicker value={95} className="text-white" />
              </div>
              <div className="text-text-on-primary/90 text-sm">أعمال متكررة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
