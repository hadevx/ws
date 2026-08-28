/**
 * Language-independent data: image paths, ids, stack lists, symbols.
 * Localised strings for these records live in `content.ts`, keyed by `id`.
 */

export type ProjectId = "terra" | "flowdesk" | "marketpulse" | "commerce" | "atelier" | "orangery";

export interface Project {
  id: ProjectId;
  img: string;
  year: string;
  stack: string[];
  /** Tailwind-safe accent used for the card glow */
  tint: string;
}

export const PROJECTS: Project[] = [
  {
    id: "terra",
    img: "/terra.png",
    year: "2025",
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    tint: "152 70% 42%",
  },
  {
    id: "flowdesk",
    img: "/ecomm.png",
    year: "2025",
    stack: ["React", "TypeScript", "Node.js", "SQL"],
    tint: "28 90% 55%",
  },
  {
    id: "marketpulse",
    img: "/services.png",
    year: "2024",
    stack: ["React", "Python", "WebSocket", "SQL"],
    tint: "220 85% 60%",
  },
  {
    id: "commerce",
    img: "/admin.png",
    year: "2025",
    stack: ["React", "ASP.NET", "C#", "SQL Server"],
    tint: "266 70% 62%",
  },
  {
    id: "atelier",
    img: "/folio.jpeg",
    year: "2024",
    stack: ["React", "Motion", "Vite"],
    tint: "0 0% 62%",
  },
  {
    id: "orangery",
    img: "/blog.png",
    year: "2024",
    stack: ["Next.js", "MDX", "Vercel"],
    tint: "88 55% 45%",
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
  x: "https://x.com/webschema",
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
