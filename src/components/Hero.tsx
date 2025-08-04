import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Zap } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { TextReveal } from "@/components/magicui/text-reveal";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-background pt-16">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}

          <div className="inline-flex items-center gap-2 bg-surface-muted border border-border rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4 " />
            <span className="text-text-secondary text-sm font-medium">
              <AnimatedShinyText>فريق تطوير المواقع الإلكترونية المحترف</AnimatedShinyText>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl !leading-[50px] lg:!leading-[80px]  sm:text-5xl lg:text-6xl font-black text-text-primary mb-6">
            نحن نبني مواقع{" "}
            <span className=" ">
              <AuroraText>استثنائية</AuroraText>
            </span>{" "}
            <br />
            على الإنترنت
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            <TextAnimate animation="blurIn" as="h1">
              من المحافظ الشخصية المذهلة إلى منصات التجارة الإلكترونية القوية، ويب سكيما تقدم حلول
              ويب مخصصة تحقق النتائج وتتجاوز التوقعات.
            </TextAnimate>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="default"
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="px-8 py-3 text-lg font-semibold">
              ابدأ مشروعك
              <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#portfolio")}
              className="px-8 py-3 text-lg">
              اطلع على أعمالنا
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-surface-muted border border-border rounded-full px-4 py-2">
              <Code className="h-4 w-4 " />
              <AnimatedShinyText></AnimatedShinyText>
              <span className="text-text-secondary text-sm">
                <AnimatedShinyText>تطوير مخصص</AnimatedShinyText>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface-muted border border-border rounded-full px-4 py-2">
              <Palette className="h-4 w-4 " />
              <span className="text-text-secondary text-sm">
                <AnimatedShinyText>تصميم عصري</AnimatedShinyText>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface-muted border border-border rounded-full px-4 py-2">
              <Zap className="h-4 w-4 " />
              <span className="text-text-secondary text-sm">
                <AnimatedShinyText>تسليم سريع</AnimatedShinyText>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
