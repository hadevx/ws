import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Github } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "أليكس رودريغيز",
      role: "مطور رئيسي",
      bio: "خبير تطوير شامل مع أكثر من 8 سنوات في بناء تطبيقات ويب قابلة للتوسع. متخصص في React و Node.js وهندسة السحابة.",
      skills: ["React", "Node.js", "AWS", "TypeScript"]
    },
    {
      name: "سارة كيم",
      role: "مصممة واجهة المستخدم/تجربة المستخدم",
      bio: "مصممة إبداعية تركز على التصميم المحوري للمستخدم. تنشئ واجهات جميلة وبديهية يحبها المستخدمون.",
      skills: ["Figma", "أنظمة التصميم", "بحث المستخدم", "النماذج الأولية"]
    },
    {
      name: "ماركوس جونسون",
      role: "مهندس الخادم الخلفي",
      bio: "متخصص في قواعد البيانات وواجهات البرمجة لضمان أنظمة خادم خلفية قوية وآمنة لجميع تطبيقات الويب.",
      skills: ["Python", "PostgreSQL", "تصميم API", "الأمان"]
    },
    {
      name: "إيما تشين",
      role: "مديرة المشاريع",
      bio: "تضمن تسليم المشاريع بسلاسة والتواصل مع العملاء. تحافظ على المشاريع في الوقت المحدد وضمن الميزانية.",
      skills: ["Agile", "علاقات العملاء", "الاستراتيجية", "ضمان الجودة"]
    }
  ];

  return (
    <section id="team" className="py-20 bg-surface-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            تعرف على{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              فريقنا
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            فريقنا المتحمس من المطورين والمصممين والاستراتيجيين يعملون معاً لتحويل رؤيتك إلى واقع.
          </p>
          
          {/* Team Photo */}
          <div className="max-w-3xl mx-auto mb-12">
            <img 
              src={teamPhoto} 
              alt="فريق ويب سكيما"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center border border-border hover:border-brand-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-text-on-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-text-primary mb-1">
                  {member.name}
                </h3>
                
                <p className="text-brand-primary font-medium mb-3">
                  {member.role}
                </p>
                
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <button className="p-2 text-text-secondary hover:text-brand-primary transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-text-secondary hover:text-brand-primary transition-colors">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-text-secondary hover:text-brand-primary transition-colors">
                    <Github className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-primary mb-2">50+</div>
            <div className="text-text-secondary">مشروع مكتمل</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-primary mb-2">4+</div>
            <div className="text-text-secondary">سنوات خبرة</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-primary mb-2">98%</div>
            <div className="text-text-secondary">رضا العملاء</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-primary mb-2">24/7</div>
            <div className="text-text-secondary">دعم متاح</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;