import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const navItems = [
    { label: `الرئيسية`, href: "#home" },
    { label: "أعمالنا", href: "#portfolio" },
    { label: "خدماتنا", href: "#services" },
    // { label: "فريقنا", href: "#team" },
    { label: "آراء العملاء", href: "#testimonials" },
    { label: "تواصل معنا", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Track active section
  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 } // 60% of section visible
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section as Element);
      });
    };
  }, []);
  const confettiRef = useRef<ConfettiRef>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      confettiRef.current?.fire({});
    }, 10000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* 🔥 Offer Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white text-center py-2 px-4 font-bold text-sm md:text-base shadow-md ">
          🎉 عرض لفتره محدوده متجر إلكتروني بـ <span className=""> 100 دك </span>فقط
        </div>
        <Confetti ref={confettiRef} className="absolute left-0 top-0 z-0 size-full" />

        {/* Navbar */}
        <nav className="bg-background/80 backdrop-blur-md border-b border-border z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <span
                  className="text-lg font-bold text-brand-primary cursor-pointer"
                  onClick={() => scrollToSection("#home")}>
                  <p className="text-2xl">WebSchema</p>
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`mx-5 font-medium transition-colors duration-200 ${
                        activeSection === item.href
                          ? "text-brand-primary underline underline-offset-8 text-rose-500"
                          : "text-text-secondary hover:text-text-primary"
                      }`}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <Button
                  variant="default"
                  onClick={() => scrollToSection("#contact")}
                  className="px-6">
                  احصل على عرض سعر
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`block w-full text-left px-3 py-2 transition-colors duration-200 ${
                        activeSection === item.href
                          ? "text-brand-primary font-semibold "
                          : "text-text-secondary hover:text-text-primary"
                      }`}>
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-4">
                    <Button
                      variant="default"
                      onClick={() => scrollToSection("#contact")}
                      className="w-full">
                      احصل على عرض سعر
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
