import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Code, Palette, Zap } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "motion/react";

const ease = [0.32, 0.72, 0, 1] as const;

const Hero = () => {
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-background pt-16 overflow-hidden">

      {/* Line-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--brand-secondary)/0.08),transparent)] pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 bg-surface-muted border border-border rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4" />
            <span className="text-text-secondary text-sm font-medium">
              <AnimatedShinyText>فريق تطوير المواقع الإلكترونية المحترف</AnimatedShinyText>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-4xl !leading-[56px] sm:text-5xl sm:!leading-[72px] lg:text-6xl lg:!leading-[84px] font-black text-text-primary mb-6">
            نحن نبني مواقع{" "}
            <AuroraText>استثنائية</AuroraText>
            <br />
            على الإنترنت
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            <TextAnimate animation="blurIn" as="span">
              من المحافظ الشخصية المذهلة إلى منصات التجارة الإلكترونية القوية، ويب سكيما تقدم حلول
              ويب مخصصة تحقق النتائج وتتجاوز التوقعات.
            </TextAnimate>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button onClick={() => scrollToSection("#contact")} size="lg" className="px-8 text-base">
              ابدأ مشروعك
              <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("#portfolio")}
              className="px-8 text-base">
              اطلع على أعمالنا
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="flex flex-wrap justify-center gap-2">
            {[
              { icon: Code, label: "تطوير مخصص" },
              { icon: Palette, label: "تصميم عصري" },
              { icon: Zap, label: "تسليم سريع" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-surface-muted border border-border rounded-full px-3 py-2">
                <Icon className="h-4 w-4 text-text-secondary" />
                <span className="text-text-secondary text-sm">
                  <AnimatedShinyText>{label}</AnimatedShinyText>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("#portfolio")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-secondary/40 hover:text-text-secondary/70 transition-colors duration-200"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">scroll</span>
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
};

export default Hero;
