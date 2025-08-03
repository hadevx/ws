import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Heart } from "lucide-react";
import { AuroraText } from "./magicui/aurora-text";
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
                <span className="text-3xl font-bold text-brand-secondary">
                  <AuroraText>webschema</AuroraText>
                </span>
              </div>
              <p className="text-text-on-primary/80 mb-6 leading-relaxed">
                نبني مواقع استثنائية تحقق النتائج. نجمع بين الإبداع والخبرة التقنية لتقديم حلول ويب
                تتجاوز التوقعات.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">روابط سريعة</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-text-on-primary/80 hover:text-brand-secondary transition-colors duration-200">
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
                      className="text-text-on-primary/80 hover:text-brand-secondary transition-colors duration-200">
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
                  <Mail className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                  <span className="text-text-on-primary/80">hello@webschema.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                  <span className="text-text-on-primary/80"> 98909936 (965+)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                  <span className="text-text-on-primary/80">الكويت</span>
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
              <button className="hover:text-brand-secondary transition-colors">
                سياسة الخصوصية
              </button>
              <button className="hover:text-brand-secondary transition-colors">شروط الخدمة</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
