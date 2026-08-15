import type { IconName } from "@/components/ui/Icon";

/* All site copy in one place — components stay presentational. */

export const site = {
  name: "Vishal Group",
  legalName: "Vishal Transport and HR Solutions Pvt. Ltd.",
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
  eyebrowRight: "01 / Est. 14 years",
  headline: ["We move", "the machines", "of industry."],
  body: "Staff transportation. Cargo. Warehousing. Manpower. Fourteen years, without pause, across Tamil Nadu and Karnataka.",
  shotBrief: "Shot brief — Aerial, empty highway, golden hour, fleet in motion",
};

export const about = {
  index: "02 — About",
  title: ["Fourteen years", "on the road."],
  body: "Vishal Transport and HR Solutions moves the people, cargo, and inventory behind the automobile and manufacturing plants of Hosur and Bengaluru — staff mobilisation, domestic logistics, warehousing, and manpower, under one accountable operation.",
  stats: [
    { value: "14+", label: "Years" },
    { value: "2", label: "States" },
    { value: "20+", label: "Clients" },
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
    {
      count: 300,
      suffix: "+",
      label: "Vehicles on the road",
      note: "Buses & trucks",
      size: "clamp(3.5rem,9vw,8rem)",
    },
    {
      count: 550,
      suffix: "+",
      label: "Skilled employees",
      note: "Drivers & support staff",
      size: "clamp(3rem,7vw,6rem)",
    },
    {
      count: 20,
      suffix: "+",
      label: "Companies served",
      note: "Automobile & manufacturing",
      size: "clamp(3rem,7vw,6rem)",
    },
    {
      count: 14,
      suffix: "",
      label: "Years in operation",
      note: "Hosur — Bengaluru corridor",
      size: "clamp(3rem,6vw,5rem)",
    },
  ],
};

export const services = {
  index: "05 — What We Do",
  title: ["Three ways", "we keep industry moving."],
  items: [
    {
      num: "01",
      title: "Staff Transportation",
      body: "300+ buses, daily. Employees moved safely between home and factory, shift after shift.",
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

export const employeeGrowth = {
  index: "08 — Workforce",
  title: ["Growing our", "people, every year."],
  body: "As operations expand across the corridor, the team behind them grows with it. Driver recruitment and support-staff hiring have kept pace with client demand, year after year.",
  growthNote: "120%+ workforce growth in two years",
  unit: "Employees",
  chart: [
    { year: "FY23–24", count: 250 },
    { year: "FY24–25", count: 400 },
    { year: "FY25–26", count: 550 },
  ],
  callouts: [
    { label: "Driver training pipeline", meta: "Recruited, trained, and certified in-house" },
    { label: "Support staff", meta: "Operations, dispatch, and client coordination" },
  ],
};

export const fleetStrength = {
  index: "09 — Fleet Strength",
  title: ["A fleet built", "for scale."],
  body: "Buses for staff mobility. Trucks for cargo and supply chain. Every vehicle runs out of two strategic yards — Hosur and Bengaluru — and is maintained in-house, not outsourced.",
  growthNote: "65%+ fleet growth in two years",
  unit: "Vehicles",
  chart: [
    { year: "FY23–24", count: 200 },
    { year: "FY24–25", count: 250 },
    { year: "FY25–26", count: 330 },
  ],
  categories: [
    {
      icon: "bus" as IconName,
      label: "Buses",
      meta: "Staff mobility, daily shift service",
    },
    {
      icon: "truck" as IconName,
      label: "Trucks",
      meta: "Cargo and supply-chain delivery",
    },
  ],
};

export const extendedCapabilities = {
  index: "06 — Extended Capabilities",
  title: ["Beyond", "the road."],
  body: "Transportation is the core of what we do — but manufacturers need more than moving parts. Vishal Group also manages and leases warehouse space, rounding out a complete logistics partnership from a single accountable operator.",
  stat: { count: 200000, suffix: "+", label: "Sq. ft. of managed warehouse space" },
  tenants: { value: "6–7", label: "Companies currently leasing space" },
};

export const partners = {
  index: "07 — Who We Serve",
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
  name: "Vishal Manjunath",
  role: "Managing Director",
  org: "Vishal Transport and HR Solutions Pvt. Ltd.",
  shotBrief: "Reserved for portrait — executive, studio lighting, neutral backdrop",
  // Executive letter — polished rewrite of the MD's original statement.
  letter: {
    label: "Our Promise to You",
    heading: ["From the Managing", "Director's Desk"],
    paragraphs: [
      "Over the past fourteen years, Vishal Group has grown into a recognised leader in transportation and manpower solutions for the automobile and manufacturing sectors. With a fleet of 300+ vehicles and more than 550 skilled employees, we deliver dependable service to every partner we work with — backed by in-house maintenance facilities in Hosur and Bengaluru that keep our fleet moving without interruption.",
      "Our commitment is simple — to move with the future by continually refining our processes, investing in our people, and raising the standard of what an operations partner should be.",
      "Discover what's possible with Vishal Group — your trusted partner in transportation and manpower solutions.",
    ],
  },
};

// Technology & Safety share one section — two sides of the same commitment
// (visibility, and the people driving) rather than two thin, similar sections.
export const operations = {
  index: "10 — Technology & Safety",
  title: ["Seen, tracked,", "and driven right."],
  intro:
    "Every vehicle reports in, and every driver is trained to the same standard — visibility and safety, as one commitment.",
  technology: {
    label: "Technology & Tracking",
    body: "GPS and a dedicated mobile app give real-time visibility into location and employee safety, while live CCTV inside every bus keeps the ride monitored end to end.",
    features: [
      { icon: "gps" as IconName, label: "GPS fleet tracking", meta: "Real-time vehicle location, always on" },
      { icon: "phone" as IconName, label: "Mobile app visibility", meta: "Live updates for operations and clients" },
      { icon: "camera" as IconName, label: "Live CCTV monitoring", meta: "Every bus, continuously recorded" },
      { icon: "pin" as IconName, label: "Route management", meta: "Planned, tracked, and adjusted in real time" },
    ],
  },
  safety: {
    label: "Driver Training & Safety",
    body: "Every driver at Vishal Group is trained, tested, and re-trained — because the people we move deserve nothing less.",
    stat: { count: 500, suffix: "+", label: "Trained drivers" },
    pillars: [
      {
        icon: "check" as IconName,
        label: "Comprehensive training",
        detail: "Safety protocols, customer service, and vehicle maintenance — covered before a driver takes the wheel.",
      },
      {
        icon: "clock" as IconName,
        label: "Continuous education",
        detail: "Regular workshops and updates on the latest safety regulations and industry standards.",
      },
      {
        icon: "shield" as IconName,
        label: "Defensive driving",
        detail: "Emergency response and defensive driving technique are trained and re-tested, not assumed.",
      },
    ],
  },
};

export const maintenance = {
  index: "11 — Maintenance",
  title: ["Kept running.", "Kept ready."],
  body: "In-house workshops in both Hosur and Bengaluru mean breakdowns are handled fast — minimising downtime and keeping every commitment on schedule.",
  shotBrief: "Shot brief — Workshop floor, vehicles under service, wide interior",
  features: [
    { icon: "wrench" as IconName, label: "In-house workshops", meta: "State-of-the-art equipment, two locations" },
    { icon: "truck" as IconName, label: "Paint shops & repair bays", meta: "Hosur & Bengaluru" },
    { icon: "users" as IconName, label: "Trained mechanics", meta: "Fast turnaround on every repair" },
    { icon: "clock" as IconName, label: "Preventive maintenance", meta: "Minimising downtime before it happens" },
  ],
};

export const coverage = {
  index: "12 — Coverage",
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
  index: "13 — Why Us",
  title: ["Why manufacturers", "choose us."],
  items: [
    { icon: "clock" as IconName, label: "A decade and more of experience", meta: "14+ years" },
    { icon: "users" as IconName, label: "Strong client portfolio", meta: "20+ companies" },
    {
      icon: "check" as IconName,
      label: "One accountable partner",
      meta: "Transport, manpower & warehousing",
    },
    {
      icon: "shield" as IconName,
      label: "Built on safety, not shortcuts",
      meta: "500+ trained drivers",
    },
  ],
};

// Real clients drawn from the company profile — no logo files supplied, so
// LogoCarousel renders these as clean text wordmarks (see LogoItem).
export const clients = [
  "UNO MINDA",
  "TATA Electronics",
  "TITAN",
  "TEAL — A Tata Enterprise",
  "Jamna Auto Industries",
  "AVTEC — CK Birla Group",
  "Luminous",
  "Dhoot Transmissions",
];

export const trust = {
  index: "14 — Trusted By",
  title: ["Trusted by", "industry leaders."],
  body: "Vishal Group proudly supports 20+ of South India's leading manufacturing and industrial organisations — moving their people and cargo, dependably, shift after shift.",
  footnote:
    "A selection of the manufacturing and industrial leaders who trust us with their people and cargo.",
};

export const faq = [
  {
    q: "What services does Vishal Group provide?",
    a: "Staff transportation, domestic cargo management, warehouse leasing, and manpower consulting for the automobile and manufacturing sectors.",
  },
  {
    q: "Which regions do you operate in?",
    a: "Hosur, Tamil Nadu and Bengaluru, Karnataka, along the corridor connecting the two.",
  },
  {
    q: "How large is your fleet?",
    a: "300+ trucks and buses, supported by 550+ skilled employees, including 500+ professional drivers.",
  },
  {
    q: "Do you offer warehousing?",
    a: "Yes — we lease and manage 200,000+ sq. ft. of warehouse space for manufacturers across the corridor.",
  },
  {
    q: "Are you GST registered in both states?",
    a: "Yes — separate GST registrations are held for Tamil Nadu and Karnataka, listed under Coverage above.",
  },
];

export const contact = {
  index: "15 — Contact",
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
    "Vishal Transport and HR Solutions — staff mobilisation, logistics, warehousing, and manpower consulting for the manufacturing sector.",
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
  servicesList: [
    "Staff Transportation",
    "Cargo Management",
    "Manpower Consulting",
    "Warehouse Leasing",
  ],
  locations: [
    { city: "Hosur, Tamil Nadu", zip: "635114" },
    { city: "Bengaluru, Karnataka", zip: "562107" },
  ],
};
