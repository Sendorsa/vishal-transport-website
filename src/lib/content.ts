import type { IconName } from "@/components/ui/Icon";

/* All site copy in one place — components stay presentational. */

export const site = {
  name: "Vishal Group",
  legalName: "Vishal Transport and HR Solutions",
  tagline: "We Move Industry",
  phone: "+91 99943 91696",
  phoneHref: "tel:+919994391696",
  email: "vishaladml1@gmail.com",
  emailHref: "mailto:vishaladml1@gmail.com",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Coverage", href: "#coverage" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrowLeft: "Hosur — Bengaluru",
  eyebrowRight: "01 / Est. 10 years",
  headline: ["We move", "the machines", "of industry."],
  body: "Staff transportation. Cargo. Manpower. Ten years, without pause, across Tamil Nadu and Karnataka.",
  shotBrief: "Shot brief — Aerial, empty highway, golden hour, fleet in motion",
};

export const about = {
  index: "02 — About",
  title: ["Ten years", "on the road."],
  body: "Vishal Transport and HR Solutions moves the people and cargo behind the automobile and manufacturing plants of Hosur and Bengaluru — staff mobilisation, domestic logistics, and manpower, under one accountable operation.",
  stats: [
    { value: "10+", label: "Years" },
    { value: "2", label: "States" },
    { value: "2", label: "Sectors" },
  ],
  shotBrief: "Shot brief — Fleet parked at the operations yard, blue hour",
};

export const corridor = {
  shotBrief: "Shot brief — Highway, dusk, long exposure, Hosur–Bengaluru corridor",
  metric: "5,000,000+ km covered",
  quote: "The corridor between Hosur and Bengaluru never stops.",
};

export const fleet = {
  index: "04 — Scale",
  stats: [
    { count: 200, suffix: "+", label: "Vehicles on the road", size: "clamp(3.5rem,9vw,8rem)" },
    { count: 2000, suffix: "+", label: "Skilled employees", size: "clamp(3rem,7vw,6rem)" },
    { count: 16000, suffix: "+", label: "Man-hours, daily", size: "clamp(3rem,7vw,6rem)" },
    { count: 10, suffix: "", label: "Years in operation", size: "clamp(3rem,6vw,5rem)" },
  ],
};

export const services = {
  index: "05 — What We Do",
  title: ["Three ways", "we keep industry moving."],
  items: [
    {
      num: "01",
      title: "Staff Transportation",
      body: "200+ buses, daily. Employees moved safely between home and factory, shift after shift.",
    },
    {
      num: "02",
      title: "Cargo Management",
      body: "Cost down, transit time down — domestic delivery, planned around production.",
    },
    {
      num: "03",
      title: "Manpower Consulting",
      body: "Skilled people, matched precisely to the machines and methods of manufacturing.",
    },
  ],
  imageBriefs:
    "Image briefs — 01: bus fleet on the highway, golden hour. 02: distribution centre, wide interior. 03: skilled workforce, industrial floor.",
};

export const partners = {
  index: "06 — Who We Serve",
  title: ["Industries we", "move for."],
  cards: [
    { title: ["Automobile", "Manufacturing"], tag: "assembly line, telephoto compression" },
    { title: ["Industrial", "Engineering"], tag: "heavy machinery, plant floor" },
    { title: ["Warehousing &", "Distribution"], tag: "interior, wide angle" },
    { title: ["Corporate", "Workforce"], tag: "environmental portrait" },
  ],
  footnote: "All photography is a placeholder, reserved for original imagery.",
};

export const team = {
  index: "07 — Leadership",
  // Name reserved — supply the real MD name to render it above the role.
  name: "",
  role: "Managing Director",
  org: "Vishal Transport and HR Solutions",
  message: [
    "Ten years in, Vishal Group has become a recognised leader in manpower and transportation for automobile and manufacturing.",
    "2,000+ employees, 200+ vehicles, and a habit of adapting before we're asked to — that is the operation we hold ourselves to, every shift.",
  ],
  cta: { label: "Start a conversation", href: "#contact" },
  shotBrief: "Reserved for portrait — executive, studio lighting, neutral backdrop",
};

export const coverage = {
  index: "08 — Coverage",
  title: ["One corridor.", "Two states."],
  pins: [
    { region: "Tamil Nadu", city: "Hosur", side: "left" as const, style: { left: "11.7%", top: "78.9%" } },
    { region: "Karnataka", city: "Bengaluru", side: "right" as const, style: { right: "11.7%", top: "28.9%" } },
  ],
  addresses: [
    {
      text: "#2/158 Upparapalli Village, Hosur to Thally Main Road, Hosur, Tamil Nadu – 635114",
      gstin: "GSTIN 33AAICV0267HI2D",
    },
    {
      text: "C12B, Sarjapura Attibele Road, Anekal Taluk, Indiabele Village, Bengaluru, Karnataka – 562107",
      gstin: "GSTIN 29AAICV0267H1Z2",
    },
  ],
};

export const whyUs = {
  index: "09 — Why Us",
  title: ["Why manufacturers", "choose us."],
  items: [
    { label: "A decade of experience", meta: "10+ years" },
    { label: "Strong client portfolio", meta: "Hosur & region" },
    { label: "Trained, professional drivers", meta: "Safety-first" },
    { label: "Cutting-edge tracking technology", meta: "Live visibility" },
    { label: "A large, modern fleet", meta: "200+ vehicles" },
    { label: "A deep skilled workforce", meta: "2,000+ people" },
  ],
  imageBriefs:
    "Image briefs, top to bottom — archival highway, drone coverage shot, driver inspection, GPS dashboard, truck convoy, workforce portrait.",
};

export const trust = {
  index: "10 — Trusted By",
  title: ["Trusted by", "industry leaders."],
  body: "Vishal Group proudly supports some of South India's leading manufacturing and industrial organisations — moving their people and cargo, dependably, shift after shift.",
  footnote:
    "Partner marks shown are placeholders, reserved for the logos of the manufacturers we serve.",
};

export const faq = [
  {
    q: "What services does Vishal Group provide?",
    a: "Staff transportation, domestic cargo management, and manpower consulting for the automobile and manufacturing sectors.",
  },
  {
    q: "Which regions do you operate in?",
    a: "Hosur, Tamil Nadu and Bengaluru, Karnataka, along the corridor connecting the two.",
  },
  {
    q: "How large is your fleet?",
    a: "200+ trucks and buses, supported by 2,000+ skilled employees delivering 16,000+ man-hours daily.",
  },
  {
    q: "Are you GST registered in both states?",
    a: "Yes — separate GST registrations are held for Tamil Nadu and Karnataka, listed under Coverage above.",
  },
];

export const contact = {
  index: "11 — Contact",
  title: ["Let's move,", "together."],
  shotBrief: "Shot brief — Aerial, facility or corridor, background only",
  fields: [
    { name: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name", inputMode: "text" as const },
    { name: "email", label: "Email", type: "email", placeholder: "you@company.com", autoComplete: "email", inputMode: "email" as const },
    { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91", autoComplete: "tel", inputMode: "tel" as const },
    { name: "subject", label: "Subject", type: "text", placeholder: "Staff transport / Cargo / Manpower", autoComplete: "off", inputMode: "text" as const },
  ],
};

export const footer = {
  blurb:
    "Vishal Transport and HR Solutions — staff mobilisation, logistics, and manpower consulting for the manufacturing sector.",
  socials: [
    { name: "linkedin" as IconName, label: "LinkedIn", href: "#" },
    { name: "instagram" as IconName, label: "Instagram", href: "#" },
    { name: "facebook" as IconName, label: "Facebook", href: "#" },
  ],
  quickLinks: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Industries", href: "#industries" },
    { label: "Contact", href: "#contact" },
  ],
  servicesList: ["Staff Transportation", "Cargo Management", "Manpower Consulting"],
  locations: [
    { city: "Hosur, Tamil Nadu", zip: "635114" },
    { city: "Bengaluru, Karnataka", zip: "562107" },
  ],
};
