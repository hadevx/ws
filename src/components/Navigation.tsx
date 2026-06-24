import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import { useTheme } from "@/hooks/use-theme";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "الرئيسية", href: "#home" },
    { label: "أعمالنا", href: "#portfolio" },
    { label: "خدماتنا", href: "#services" },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Track active section
  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => sections.forEach((s) => s && observer.unobserve(s as Element));
  }, []);

  const confettiRef = useRef<ConfettiRef>(null);
  useEffect(() => {
    const interval = setInterval(() => confettiRef.current?.fire({}), 10000);
    return () => clearInterval(interval);
  }, []);

  /* ── Shared theme toggle button ── */
  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      aria-label="تبديل المظهر"
      className="flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-background/60 hover:bg-surface-muted transition-colors duration-200">
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}>
            <Sun className="h-4 w-4 text-amber-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}>
            <Moon className="h-4 w-4 text-text-secondary" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );

  return (
    <>
      {/* ── Navbar bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Confetti ref={confettiRef} className="absolute left-0 top-0 z-0 size-full" />

        <nav className="bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16" style={{ direction: "ltr" }}>
              {/* Logo */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => scrollToSection("#home")}>
                <img src="/x.png" alt="WebSchema logo" className="h-7 w-auto rounded-md" />
                <span className="text-xl font-bold text-brand-primary">WebSchema</span>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-baseline gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`mx-4 font-medium transition-colors duration-200 ${
                      activeSection === item.href
                        ? "text-brand-primary underline underline-offset-8 text-rose-500"
                        : "text-text-secondary hover:text-text-primary"
                    }`}>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Desktop right side: theme toggle + CTA */}
              <div className="hidden md:flex items-center gap-3">
                <ThemeToggle />
                <Button
                  variant="default"
                  onClick={() => scrollToSection("#contact")}
                  className="px-6">
                  احصل على عرض سعر
                </Button>
              </div>

              {/* Mobile right side: theme toggle + hamburger */}
              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen((v) => !v)}
                  aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}>
                  <AnimatePresence mode="wait" initial={false}>
                    {isMenuOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}>
                        <X className="h-5 w-5 text-text-primary" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}>
                        <Menu className="h-5 w-5 text-text-primary" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Full-screen mobile menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-[hsl(var(--background))] md:hidden"
            style={{ paddingTop: "4rem" }}>
            {/* Nav items */}
            <nav className="flex-1 flex flex-col justify-center px-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.22, delay: 0.05 + i * 0.055 }}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`group w-full flex items-center justify-between py-5 border-b border-border/60 last:border-b-0 transition-colors duration-150 ${
                      activeSection === item.href
                        ? "text-brand-primary"
                        : "text-text-primary hover:text-brand-primary"
                    }`}>
                    <span className="text-3xl font-semibold tracking-tight">{item.label}</span>
                    <span
                      className={`text-xl transition-transform duration-200 group-hover:-translate-x-1 ${
                        activeSection === item.href
                          ? "opacity-100"
                          : "opacity-30 group-hover:opacity-70"
                      }`}>
                      ←
                    </span>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.32 }}
              className="px-8 pb-12 space-y-4">
              <Button
                variant="default"
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="w-full h-14 text-base rounded-2xl">
                احصل على عرض سعر
              </Button>
              <p className="text-center text-sm text-text-secondary">webschema@outlook.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
