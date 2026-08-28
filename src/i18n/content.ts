import type { ProjectId, TechId } from "./data";

/* -------------------------------------------------------------------------- */
/*  ENGLISH — canonical shape. `ar` is type-checked against this.              */
/* -------------------------------------------------------------------------- */

export const en = {
  code: "EN",
  switchTo: "العربية",
  switchLabel: "Switch to Arabic",

  nav: {
    items: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Start a Project",
    menu: "Menu",
    close: "Close",
    theme: "Toggle theme",
  },

  hero: {
    badge: "Digital product studio · Kuwait",
    title: ["We build", "digital experiences", "that move", "businesses forward."],
    /** Word index inside `title` (flattened) that gets the signal treatment */
    lead: "Webschema designs and engineers websites, storefronts and web applications that are fast, considered and built to scale.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "See our work",
    scroll: "Scroll",
    meta: [
      { k: "Based", v: "Kuwait City" },
      { k: "Since", v: "2020" },
      { k: "Status", v: "Open for projects" },
    ],
  },

  ticker: [
    "Websites",
    "E-commerce",
    "Web Apps",
    "UI/UX",
    "APIs",
    "Design Systems",
    "Performance",
    "Maintenance",
  ],

  services: {
    overline: "What we do",
    title: "Seven ways we build",
    lead: "One team across design and engineering — so the thing that gets designed is the thing that ships.",
    items: [
      {
        id: "websites",
        title: "Website Development",
        desc: "Marketing sites and corporate platforms engineered for speed, accessibility and search — down to the last millisecond.",
        tags: ["Next.js", "React", "SEO", "Core Web Vitals"],
      },
      {
        id: "design",
        title: "Web Design",
        desc: "Editorial layouts, typographic systems and motion that give a brand a distinct voice on screen.",
        tags: ["Art direction", "Typography", "Motion"],
      },
      {
        id: "ecommerce",
        title: "E-commerce Development",
        desc: "Storefronts, checkout, payments and inventory — conversion-focused commerce that holds up under real traffic.",
        tags: ["Storefront", "Payments", "Inventory"],
      },
      {
        id: "apps",
        title: "Custom Web Applications",
        desc: "Dashboards, internal tools and SaaS products built around the workflows your business actually runs on.",
        tags: ["Dashboards", "SaaS", "Realtime"],
      },
      {
        id: "uiux",
        title: "UI/UX Design",
        desc: "Research, flows, wireframes and interface systems that reduce friction and make complex products feel obvious.",
        tags: ["Research", "Prototyping", "Design systems"],
      },
      {
        id: "backend",
        title: "Backend & API Development",
        desc: "Data models, secure APIs and integrations — the structural engineering behind everything on the surface.",
        tags: ["Node.js", "ASP.NET", "SQL", "MongoDB"],
      },
      {
        id: "care",
        title: "Website Maintenance",
        desc: "Monitoring, updates, hardening and iteration. Launch is the start of the work, not the end of it.",
        tags: ["Monitoring", "Security", "Iteration"],
      },
    ],
  },

  approach: {
    overline: "Our approach",
    title: "Four stages. No guesswork.",
    lead: "A process built to remove ambiguity early, so the build phase is execution rather than discovery.",
    stages: [
      {
        id: "think",
        no: "01",
        title: "Think",
        desc: "Understand the problem, the users and the business goals before a single pixel is drawn.",
        points: ["Discovery workshop", "Audience & competitor mapping", "Scope and success metrics"],
      },
      {
        id: "design",
        no: "02",
        title: "Design",
        desc: "Transform ideas into intuitive, beautiful experiences — structure first, surface second.",
        points: ["Wireframes & flows", "Visual direction", "Interactive prototype"],
      },
      {
        id: "build",
        no: "03",
        title: "Build",
        desc: "Develop fast, scalable and reliable digital products with clean, maintainable engineering.",
        points: ["Component architecture", "APIs & integrations", "QA across devices"],
      },
      {
        id: "launch",
        no: "04",
        title: "Launch",
        desc: "Deploy, measure, optimise and keep improving long after the site goes live.",
        points: ["Performance budget", "Analytics & monitoring", "Ongoing iteration"],
      },
    ],
  },

  work: {
    overline: "Featured work",
    title: "Selected projects",
    lead: "A cross-section of recent builds — commerce, dashboards, platforms and editorial.",
    view: "View project",
    drag: "Drag or scroll",
    all: "Every project ships with performance, accessibility and analytics as requirements — not extras.",
    projects: {
      hayam: {
        name: "Hayam",
        category: "Brand storefront",
        desc: "A boutique label's landing experience — an engraved crest on deep lacquer red, closer to a fashion house than a shop.",
      },
      storefront: {
        name: "Redefine Your Style",
        category: "Storefront · Home",
        desc: "The seasonal homepage for a Spring/Summer drop: full-bleed campaign photography with the collection one tap away.",
      },
      aura: {
        name: "Aura Jacket",
        category: "Product launch",
        desc: "A single-product launch page where the spec list sits inside the artwork rather than underneath it.",
      },
      quietLuxury: {
        name: "Quiet Luxury",
        category: "Seasonal campaign",
        desc: "An Autumn/Winter campaign on a split canvas — a vertical season marker holding one side, editorial photography carrying the other.",
      },
      elevate: {
        name: "Elevate",
        category: "Commerce platform",
        desc: "A bilingual Kuwait storefront with language switching, an admin entry point, and delivery and offers surfaced right under the fold.",
      },
      catalogue: {
        name: "Catalogue & filters",
        category: "Browse experience",
        desc: "Twenty-two products filtered by colour, stock, sort and price in KD — with stock state and size pickers on the tile itself.",
      },
      product: {
        name: "Product page",
        category: "Conversion",
        desc: "A detail view with gallery thumbnails, colour and size variants, live stock limits and one clear path to the bag.",
      },
      auth: {
        name: "Account access",
        category: "UI/UX",
        desc: "A split login screen that keeps the campaign imagery working while the form itself stays quiet and legible.",
      },
      dashboard: {
        name: "Analytics dashboard",
        category: "Admin platform",
        desc: "The Arabic-first back office: users, orders and revenue in KD, with switchable chart types and a breakdown by governorate.",
      },
    } as Record<ProjectId, { name: string; category: string; desc: string }>,
  },

  tech: {
    overline: "Technology",
    title: "The schema",
    lead: "The stack we reach for. Chosen per project — never by default.",
    hint: "Select an element",
    groups: {
      markup: "Markup",
      language: "Language",
      framework: "Framework",
      runtime: "Runtime",
      data: "Data",
    },
    roles: {
      html: "Semantic structure — the foundation of accessibility and search visibility.",
      css: "Layout, typography and motion. Modern CSS does more heavy lifting than most teams admit.",
      js: "The language of the browser. Used sparingly and deliberately.",
      ts: "Types across the whole codebase, so refactors are safe and intent is documented.",
      react: "Component architecture for interfaces that stay maintainable as they grow.",
      next: "Server rendering, routing and image optimisation for fast, indexable sites.",
      node: "APIs, jobs and server-side logic in one language across the stack.",
      dotnet: "Enterprise-grade backends where reliability and structure matter most.",
      csharp: "Strongly typed services and business logic for demanding systems.",
      python: "Data processing, automation and integrations behind the interface.",
      sql: "Relational modelling for data that must stay consistent and queryable.",
      mongo: "Document storage for flexible, fast-moving product data.",
    } as Record<TechId, string>,
  },

  about: {
    overline: "About Webschema",
    statement:
      "Webschema sits where design, technology and strategy meet. We combine considered design with modern engineering to build digital experiences that solve real problems — not just look good in a portfolio.",
    pillars: [
      {
        no: "01",
        title: "Design",
        desc: "Interfaces with a point of view. Typography, hierarchy and motion used as tools, not decoration.",
      },
      {
        no: "02",
        title: "Technology",
        desc: "Modern, maintainable engineering. Fast by default, accessible by default, built to be extended.",
      },
      {
        no: "03",
        title: "Strategy",
        desc: "Every decision tied to a business outcome. We ask what the site has to achieve before we ask what it looks like.",
      },
    ],
    stats: [
      { value: 60, suffix: "+", label: "Projects delivered" },
      { value: 5, suffix: "yrs", label: "Building for the web" },
      { value: 98, suffix: "/100", label: "Avg. performance score" },
      { value: 24, suffix: "h", label: "Response time" },
    ],
    note: "A small, senior team working remotely from Kuwait City with clients across the Gulf.",
  },

  cta: {
    kicker: "Next",
    title: ["Have an idea?", "Let's build it."],
    lead: "Tell us what you're trying to make. We'll come back within 24 hours with a direction, a scope and a number.",
    button: "Start a Project",
    or: "or email us at",
  },

  contact: {
    overline: "Contact",
    title: "Start a project",
    lead: "Share a few details and we'll reply with a proposal within 24 hours.",
    info: [
      { k: "Email", v: "webschema@outlook.com" },
      { k: "Phone", v: "+965 9890 9936" },
      { k: "Location", v: "Kuwait City · Remote" },
      { k: "Response", v: "Under 24 hours" },
    ],
    form: {
      name: "Your name",
      namePh: "Full name",
      email: "Email",
      emailPh: "you@company.com",
      type: "Project type",
      typePh: "Select a type",
      types: [
        { value: "website", label: "Website" },
        { value: "ecommerce", label: "E-commerce" },
        { value: "webapp", label: "Web application" },
        { value: "design", label: "Design / UI-UX" },
        { value: "other", label: "Something else" },
      ],
      timeline: "Timeline",
      timelinePh: "Select a timeline",
      timelines: [
        { value: "asap", label: "As soon as possible" },
        { value: "1-2w", label: "1–2 weeks" },
        { value: "1m", label: "About a month" },
        { value: "2-3m", label: "2–3 months" },
        { value: "flex", label: "Flexible" },
      ],
      message: "Project details",
      messagePh: "What are you building, who is it for, and what does success look like?",
      submit: "Send via WhatsApp",
      required: "Required fields missing",
      requiredDesc: "Name, email and project details are all required.",
      invalidEmail: "Check your email address",
      invalidEmailDesc: "That email address doesn't look right.",
      sent: "Opening WhatsApp",
      sentDesc: "Your message is ready to send.",
    },
  },

  footer: {
    tagline: "Digital experiences that move businesses forward.",
    nav: "Navigate",
    contactCol: "Contact",
    social: "Elsewhere",
    top: "Back to top",
    rights: "All rights reserved.",
    built: "Designed & built in-house.",
  },

  preloader: {
    label: "Webschema",
  },
};

export type Dict = typeof en;

/* -------------------------------------------------------------------------- */
/*  ARABIC                                                                     */
/* -------------------------------------------------------------------------- */

export const ar: Dict = {
  code: "AR",
  switchTo: "English",
  switchLabel: "التبديل إلى الإنجليزية",

  nav: {
    items: [
      { label: "أعمالنا", href: "#work" },
      { label: "خدماتنا", href: "#services" },
      { label: "من نحن", href: "#about" },
      { label: "تواصل معنا", href: "#contact" },
    ],
    cta: "ابدأ مشروعك",
    menu: "القائمة",
    close: "إغلاق",
    theme: "تبديل المظهر",
  },

  hero: {
    badge: "استوديو منتجات رقمية · الكويت",
    title: ["نبني تجارب", "رقمية", "تدفع أعمالك", "إلى الأمام."],
    lead: "ويب سكيما تصمّم وتُهندس المواقع والمتاجر وتطبيقات الويب — سريعة، مدروسة، ومبنية لتنمو معك.",
    ctaPrimary: "ابدأ مشروعك",
    ctaSecondary: "شاهد أعمالنا",
    scroll: "مرّر",
    meta: [
      { k: "المقر", v: "مدينة الكويت" },
      { k: "منذ", v: "٢٠٢٠" },
      { k: "الحالة", v: "نستقبل مشاريع" },
    ],
  },

  ticker: [
    "مواقع إلكترونية",
    "متاجر إلكترونية",
    "تطبيقات ويب",
    "تجربة المستخدم",
    "واجهات برمجية",
    "أنظمة تصميم",
    "أداء عالٍ",
    "صيانة مستمرة",
  ],

  services: {
    overline: "ما نقدمه",
    title: "سبع طرق نبني بها",
    lead: "فريق واحد يجمع التصميم والهندسة — فما يُصمَّم هو نفسه ما يُطلَق، دون فقدان في الترجمة.",
    items: [
      {
        id: "websites",
        title: "تطوير المواقع الإلكترونية",
        desc: "مواقع تعريفية ومنصات مؤسسية مبنية للسرعة وسهولة الوصول والظهور في محركات البحث — حتى آخر جزء من الثانية.",
        tags: ["Next.js", "React", "SEO", "أداء"],
      },
      {
        id: "design",
        title: "تصميم الويب",
        desc: "تخطيطات تحريرية وأنظمة طباعية وحركة تمنح علامتك صوتاً مميزاً على الشاشة.",
        tags: ["إدارة فنية", "طباعة", "حركة"],
      },
      {
        id: "ecommerce",
        title: "تطوير المتاجر الإلكترونية",
        desc: "واجهة متجر، سلة، مدفوعات، ومخزون — تجارة تركّز على التحويل وتصمد أمام الضغط الحقيقي.",
        tags: ["واجهة المتجر", "مدفوعات", "مخزون"],
      },
      {
        id: "apps",
        title: "تطبيقات ويب مخصصة",
        desc: "لوحات تحكم وأدوات داخلية ومنتجات SaaS مبنية حول سير العمل الفعلي في شركتك.",
        tags: ["لوحات تحكم", "SaaS", "بيانات لحظية"],
      },
      {
        id: "uiux",
        title: "تصميم واجهات وتجربة المستخدم",
        desc: "بحث ومسارات ونماذج أولية وأنظمة واجهة تقلّل الاحتكاك وتجعل المنتج المعقّد يبدو بديهياً.",
        tags: ["بحث", "نماذج أولية", "أنظمة تصميم"],
      },
      {
        id: "backend",
        title: "الواجهات الخلفية وواجهات البرمجة",
        desc: "نماذج بيانات وواجهات برمجية آمنة وتكاملات — الهندسة الإنشائية خلف كل ما تراه على السطح.",
        tags: ["Node.js", "ASP.NET", "SQL", "MongoDB"],
      },
      {
        id: "care",
        title: "الصيانة والتطوير المستمر",
        desc: "مراقبة وتحديثات وتحصين وتحسين متواصل. الإطلاق بداية العمل وليس نهايته.",
        tags: ["مراقبة", "أمان", "تحسين"],
      },
    ],
  },

  approach: {
    overline: "منهجيتنا",
    title: "أربع مراحل بلا تخمين",
    lead: "منهجية مصمّمة لإزالة الغموض مبكراً، حتى تكون مرحلة البناء تنفيذاً لا اكتشافاً.",
    stages: [
      {
        id: "think",
        no: "٠١",
        title: "نفكر",
        desc: "نفهم المشكلة والمستخدمين وأهداف العمل قبل رسم أول بكسل.",
        points: ["ورشة استكشاف", "تحليل الجمهور والمنافسين", "تحديد النطاق ومؤشرات النجاح"],
      },
      {
        id: "design",
        no: "٠٢",
        title: "نصمم",
        desc: "نحوّل الأفكار إلى تجارب بديهية وجميلة — البنية أولاً، ثم السطح.",
        points: ["مخططات ومسارات", "اتجاه بصري", "نموذج تفاعلي"],
      },
      {
        id: "build",
        no: "٠٣",
        title: "نبني",
        desc: "نطوّر منتجات رقمية سريعة وقابلة للتوسع وموثوقة بهندسة نظيفة قابلة للصيانة.",
        points: ["معمارية المكوّنات", "واجهات برمجية وتكاملات", "اختبار على كل الأجهزة"],
      },
      {
        id: "launch",
        no: "٠٤",
        title: "نطلق",
        desc: "ننشر ونقيس ونحسّن، ونواصل التطوير بعد الإطلاق بوقت طويل.",
        points: ["ميزانية أداء", "تحليلات ومراقبة", "تحسين مستمر"],
      },
    ],
  },

  work: {
    overline: "أعمال مختارة",
    title: "مشاريع نفخر بها",
    lead: "مقطع عرضي من أحدث أعمالنا — تجارة، لوحات تحكم، منصات، ومحتوى تحريري.",
    view: "عرض المشروع",
    drag: "اسحب أو مرّر",
    all: "كل مشروع يُسلَّم والأداء وسهولة الوصول والتحليلات ضمن المتطلبات — لا كإضافات.",
    projects: {
      hayam: {
        name: "هيام",
        category: "متجر علامة تجارية",
        desc: "واجهة هبوط لعلامة أزياء راقية — شعار محفور على أحمر عميق، أقرب إلى دار أزياء منه إلى متجر.",
      },
      storefront: {
        name: "Redefine Your Style",
        category: "متجر · الصفحة الرئيسية",
        desc: "الصفحة الرئيسية لموسم الربيع/الصيف: تصوير إعلاني يملأ الشاشة والمجموعة على بُعد نقرة واحدة.",
      },
      aura: {
        name: "جاكيت أورا",
        category: "إطلاق منتج",
        desc: "صفحة إطلاق لمنتج واحد، وُضعت فيها مواصفات المنتج داخل الصورة بدلاً من أسفلها.",
      },
      quietLuxury: {
        name: "Quiet Luxury",
        category: "حملة موسمية",
        desc: "حملة الخريف/الشتاء على مساحة مقسومة — علامة الموسم عمودية على جانب، والتصوير التحريري يحمل الجانب الآخر.",
      },
      elevate: {
        name: "Elevate",
        category: "منصة تجارة إلكترونية",
        desc: "متجر كويتي ثنائي اللغة مع تبديل اللغة ومدخل للوحة التحكم، والتوصيل والعروض ظاهرة مباشرة أسفل الواجهة.",
      },
      catalogue: {
        name: "الكتالوج والفلاتر",
        category: "تجربة التصفح",
        desc: "٢٢ منتجاً مع فلترة حسب اللون والتوفّر والترتيب والسعر بالدينار — وحالة المخزون واختيار المقاس على البطاقة نفسها.",
      },
      product: {
        name: "صفحة المنتج",
        category: "رفع التحويل",
        desc: "صفحة تفاصيل بصور مصغّرة وخيارات لون ومقاس وحدود مخزون لحظية ومسار واحد واضح إلى السلة.",
      },
      auth: {
        name: "الدخول إلى الحساب",
        category: "واجهات وتجربة",
        desc: "شاشة دخول مقسومة تُبقي صور الحملة تعمل بينما يبقى النموذج هادئاً وواضح القراءة.",
      },
      dashboard: {
        name: "لوحة الإحصائيات",
        category: "منصة إدارة",
        desc: "لوحة تحكم عربية أولاً: المستخدمون والطلبات والإيرادات بالدينار، مع أنواع رسوم قابلة للتبديل وتوزيع حسب المحافظة.",
      },
    } as Record<ProjectId, { name: string; category: string; desc: string }>,
  },

  tech: {
    overline: "التقنيات",
    title: "المخطط",
    lead: "الأدوات التي نبني بها. نختارها حسب المشروع — لا بالعادة.",
    hint: "اختر عنصراً",
    groups: {
      markup: "بنية",
      language: "لغة",
      framework: "إطار عمل",
      runtime: "بيئة تشغيل",
      data: "بيانات",
    },
    roles: {
      html: "بنية دلالية سليمة — أساس سهولة الوصول والظهور في محركات البحث.",
      css: "التخطيط والطباعة والحركة. الـ CSS الحديث يقوم بأكثر مما تعترف به معظم الفرق.",
      js: "لغة المتصفح. نستخدمها بحساب وعن قصد.",
      ts: "أنواع تغطي المشروع بالكامل، فتصبح إعادة الهيكلة آمنة والنية موثّقة.",
      react: "معمارية مكوّنات لواجهات تبقى قابلة للصيانة كلما كبرت.",
      next: "تصيير من الخادم وتوجيه وتحسين للصور من أجل مواقع سريعة وقابلة للفهرسة.",
      node: "واجهات برمجية ومهام ومنطق خادم بلغة واحدة عبر المشروع كله.",
      dotnet: "واجهات خلفية بمستوى مؤسسي حيث تكون الموثوقية والبنية أهم شيء.",
      csharp: "خدمات ومنطق أعمال بأنواع صارمة للأنظمة الحسّاسة.",
      python: "معالجة بيانات وأتمتة وتكاملات خلف الواجهة.",
      sql: "نمذجة علائقية للبيانات التي يجب أن تبقى متسقة وقابلة للاستعلام.",
      mongo: "تخزين مستندي لبيانات منتجات مرنة وسريعة التغيّر.",
    } as Record<TechId, string>,
  },

  about: {
    overline: "عن ويب سكيما",
    statement:
      "ويب سكيما تقف عند نقطة التقاء التصميم والتقنية والاستراتيجية. نجمع بين تصميم مدروس وهندسة حديثة لنبني تجارب رقمية تحلّ مشكلات حقيقية — لا مجرد أعمال جميلة في معرض.",
    pillars: [
      {
        no: "٠١",
        title: "التصميم",
        desc: "واجهات لها وجهة نظر. الطباعة والتسلسل البصري والحركة أدوات لا زخرفة.",
      },
      {
        no: "٠٢",
        title: "التقنية",
        desc: "هندسة حديثة قابلة للصيانة. سريعة افتراضياً، متاحة للجميع افتراضياً، ومبنية لتُبنى عليها.",
      },
      {
        no: "٠٣",
        title: "الاستراتيجية",
        desc: "كل قرار مرتبط بنتيجة تجارية. نسأل ماذا يجب أن يحقق الموقع قبل أن نسأل كيف سيبدو.",
      },
    ],
    stats: [
      { value: 60, suffix: "+", label: "مشروع منجز" },
      { value: 5, suffix: "سنوات", label: "في بناء الويب" },
      { value: 98, suffix: "/١٠٠", label: "متوسط تقييم الأداء" },
      { value: 24, suffix: "ساعة", label: "زمن الاستجابة" },
    ],
    note: "فريق صغير من ذوي الخبرة يعمل عن بُعد من مدينة الكويت مع عملاء في أنحاء الخليج.",
  },

  cta: {
    kicker: "الخطوة التالية",
    title: ["عندك فكرة؟", "خلّنا نبنيها."],
    lead: "احكِ لنا ما الذي تحاول بناءه، وسنعود إليك خلال ٢٤ ساعة باتجاه ونطاق ورقم.",
    button: "ابدأ مشروعك",
    or: "أو راسلنا على",
  },

  contact: {
    overline: "تواصل معنا",
    title: "ابدأ مشروعك",
    lead: "شارك بعض التفاصيل وسنرد عليك بعرض مفصّل خلال ٢٤ ساعة.",
    info: [
      { k: "البريد الإلكتروني", v: "webschema@outlook.com" },
      { k: "الهاتف", v: "+965 9890 9936" },
      { k: "الموقع", v: "مدينة الكويت · عن بُعد" },
      { k: "الاستجابة", v: "أقل من ٢٤ ساعة" },
    ],
    form: {
      name: "الاسم",
      namePh: "الاسم الكامل",
      email: "البريد الإلكتروني",
      emailPh: "you@company.com",
      type: "نوع المشروع",
      typePh: "اختر النوع",
      types: [
        { value: "website", label: "موقع إلكتروني" },
        { value: "ecommerce", label: "متجر إلكتروني" },
        { value: "webapp", label: "تطبيق ويب" },
        { value: "design", label: "تصميم / واجهات" },
        { value: "other", label: "شيء آخر" },
      ],
      timeline: "الجدول الزمني",
      timelinePh: "اختر المدة",
      timelines: [
        { value: "asap", label: "في أسرع وقت" },
        { value: "1-2w", label: "١–٢ أسبوع" },
        { value: "1m", label: "شهر تقريباً" },
        { value: "2-3m", label: "٢–٣ أشهر" },
        { value: "flex", label: "مرن" },
      ],
      message: "تفاصيل المشروع",
      messagePh: "ما الذي تبنيه، ولمن، وكيف يبدو النجاح بالنسبة لك؟",
      submit: "أرسل عبر واتساب",
      required: "حقول مطلوبة ناقصة",
      requiredDesc: "الاسم والبريد الإلكتروني وتفاصيل المشروع مطلوبة جميعاً.",
      invalidEmail: "تحقق من بريدك الإلكتروني",
      invalidEmailDesc: "صيغة البريد الإلكتروني غير صحيحة.",
      sent: "جارٍ فتح واتساب",
      sentDesc: "رسالتك جاهزة للإرسال.",
    },
  },

  footer: {
    tagline: "تجارب رقمية تدفع الأعمال إلى الأمام.",
    nav: "التنقل",
    contactCol: "تواصل",
    social: "تابعنا",
    top: "العودة للأعلى",
    rights: "جميع الحقوق محفوظة.",
    built: "مصمَّم ومبني داخلياً.",
  },

  preloader: {
    label: "ويب سكيما",
  },
};

export const dictionaries = { ar, en } as const;
