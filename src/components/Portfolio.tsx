import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import ecommerceProject from "@/assets/project-ecommerce.jpg";
import businessProject from "@/assets/project-business.jpg";
import personalProject from "@/assets/project-personal.jpg";

const Portfolio = () => {
  const projects = [
    {
      title: "متجر التقنية المحترف",
      category: "التجارة الإلكترونية",
      description: "منصة تجارة إلكترونية حديثة مع فلترة متقدمة للمنتجات، دفع آمن، وإدارة المخزون.",
      image: ecommerceProject,
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      link: "#",
    },
    {
      title: "استشارات ستيرلنغ",
      category: "أعمال",
      description: "موقع شركة مهني مع عرض الخدمات، آراء العملاء، ونماذج توليد العملاء المحتملين.",
      image: businessProject,
      technologies: ["Next.js", "Tailwind", "CMS", "Analytics"],
      link: "#",
    },
    {
      title: "محفظة سارة تشين",
      category: "شخصي",
      description: "موقع محفظة إبداعي لمصممة جرافيك يضم معرض تفاعلي ورسوم متحركة سلسة.",
      image: personalProject,
      technologies: ["React", "Framer Motion", "Vercel", "CMS"],
      link: "#",
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            معرض{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              أعمالنا
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            استكشف بعض مشاريعنا الحديثة وشاهد كيف ساعدنا الشركات والأفراد في تحقيق أهدافهم الرقمية.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border border-border hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="m-4 text-text-on-primary hover:bg-white/20">
                    <ExternalLink className="h-4 w-4 ml-2" />
                    عرض المشروع
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-text-primary mb-2">{project.title}</h3>

                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-surface-muted text-text-secondary px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-4">مستعد لبدء مشروعك؟</h3>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            دعنا ننشئ شيئاً مذهلاً معاً. تواصل معنا لمناقشة متطلبات مشروعك واحصل على عرض سعر مخصص.
          </p>
          <Button size="lg" onClick={scrollToContact} className="px-8">
            ابدأ مشروعك
            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
