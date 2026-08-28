/**
 * Language-independent data: image paths, ids, stack lists, symbols.
 * Localised strings for these records live in `content.ts`, keyed by `id`.
 */

export type ProjectId =
  | "hayam"
  | "storefront"
  | "aura"
  | "quietLuxury"
  | "elevate"
  | "catalogue"
  | "product"
  | "auth"
  | "dashboard";

export interface Project {
  id: ProjectId;
  img: string;
  year: string;
  stack: string[];
  /** Tailwind-safe accent used for the card glow — sampled from each shot */
  tint: string;
}

export const PROJECTS: Project[] = [
  {
    id: "hayam",
    img: "/1.jpg",
    year: "2025",
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    tint: "0 62% 38%",
  },
  {
    id: "storefront",
    img: "/2.jpg",
    year: "2026",
    stack: ["React", "Next.js", "TypeScript"],
    tint: "210 14% 46%",
  },
  {
    id: "aura",
    img: "/3.jpg",
    year: "2026",
    stack: ["React", "Next.js", "Motion"],
    tint: "24 55% 44%",
  },
  {
    id: "quietLuxury",
    img: "/4.jpg",
    year: "2026",
    stack: ["React", "Next.js", "Motion"],
    tint: "30 34% 56%",
  },
  {
    id: "elevate",
    img: "/5.jpg",
    year: "2025",
    stack: ["React", "Node.js", "MongoDB", "i18n"],
    tint: "14 56% 54%",
  },
  {
    id: "catalogue",
    img: "/6.jpg",
    year: "2025",
    stack: ["React", "TypeScript", "Node.js"],
    tint: "150 58% 42%",
  },
  {
    id: "product",
    img: "/7.jpg",
    year: "2025",
    stack: ["React", "TypeScript", "Node.js"],
    tint: "225 62% 42%",
  },
  {
    id: "auth",
    img: "/8.jpg",
    year: "2025",
    stack: ["React", "Node.js", "JWT"],
    tint: "270 52% 56%",
  },
  {
    id: "dashboard",
    img: "/9.png",
    year: "2025",
    stack: ["React", "Node.js", "MongoDB", "Recharts"],
    tint: "5 74% 58%",
  },
];

export type TechId =
  | "html"
  | "css"
  | "js"
  | "ts"
  | "react"
  | "next"
  | "node"
  | "dotnet"
  | "csharp"
  | "python"
  | "sql"
  | "mongo";

export interface Tech {
  id: TechId;
  /** Periodic-table symbol */
  symbol: string;
  no: string;
  name: string;
  group: "markup" | "language" | "framework" | "runtime" | "data";
}

/** Laid out as a deliberate 6×2 "schema table" — order matters visually. */
export const TECH: Tech[] = [
  { id: "html", symbol: "Ht", no: "01", name: "HTML", group: "markup" },
  { id: "css", symbol: "Cs", no: "02", name: "CSS", group: "markup" },
  { id: "js", symbol: "Js", no: "03", name: "JavaScript", group: "language" },
  { id: "ts", symbol: "Ts", no: "04", name: "TypeScript", group: "language" },
  { id: "react", symbol: "Re", no: "05", name: "React", group: "framework" },
  { id: "next", symbol: "Nx", no: "06", name: "Next.js", group: "framework" },
  { id: "node", symbol: "Nd", no: "07", name: "Node.js", group: "runtime" },
  { id: "dotnet", symbol: "Ne", no: "08", name: "ASP.NET", group: "framework" },
  { id: "csharp", symbol: "C#", no: "09", name: "C#", group: "language" },
  { id: "python", symbol: "Py", no: "10", name: "Python", group: "language" },
  { id: "sql", symbol: "Sq", no: "11", name: "SQL", group: "data" },
  { id: "mongo", symbol: "Mg", no: "12", name: "MongoDB", group: "data" },
];

export const GROUP_HUE: Record<Tech["group"], string> = {
  markup: "28 90% 55%",
  language: "44 96% 58%",
  framework: "152 78% 48%",
  runtime: "180 70% 50%",
  data: "266 70% 65%",
};

export const CONTACT = {
  email: "webschema@outlook.com",
  phone: "+965 9890 9936",
  phoneHref: "tel:+96598909936",
  whatsapp: "96598909936",
  instagram: "https://instagram.com/webschema",
} as const;

export const SERVICE_IMAGES: Record<string, string> = {
  websites: "/blog.png",
  design: "/folio.jpeg",
  ecommerce: "/terra.png",
  apps: "/services.png",
  uiux: "/image.png",
  backend: "/ecomm.png",
  care: "/admin.png",
};
