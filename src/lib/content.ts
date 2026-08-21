import type { IconName } from "@/components/ui/Icon";
import type { PhotoKey } from "@/lib/photos";

/* All site copy in one place — components stay presentational. */

export const site = {
  name: "Vishal Transport",
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
  sideNote: "300+ vehicles in daily service",
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
};

export const corridor = {
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
  body: "Transportation is the core of what we do — but manufacturers need more than moving parts. Vishal Transport also manages and leases warehouse space, rounding out a complete logistics partnership from a single accountable operator.",
  stat: { count: 200000, suffix: "+", label: "Sq. ft. of managed warehouse space" },
  tenants: { value: "6–7", label: "Companies currently leasing space" },
};

export const partners = {
  index: "07 — Who We Serve",
  title: ["Industries we", "move for."],
  cards: [
    {
      photo: "client-uno-minda" as PhotoKey,
      title: ["Automobile", "Components"],
      tag: "UNO MINDA — Hosur",
    },
    {
      photo: "client-tata-electronics" as PhotoKey,
      title: ["Electronics", "Manufacturing"],
      tag: "TATA Electronics — Hosur",
    },
    {
      photo: "client-jbm-ogihara" as PhotoKey,
      title: ["Automotive", "Stamping"],
      tag: "JBM Ogihara — Hosur",
    },
    {
      photo: "client-teal" as PhotoKey,
      title: ["Corporate", "Workforce"],
      tag: "Daily staff mobilisation",
    },
  ],
  footnote:
    "Photographed on site, at the plants we serve every shift.",
};

export const team = {
  name: "Vishal Manjunath",
  role: "Managing Director",
  org: "Vishal Transport and HR Solutions Pvt. Ltd.",
  // Executive letter — polished rewrite of the MD's original statement.
  letter: {
    label: "Our Promise to You",
    heading: ["From the Managing", "Director's Desk"],
    paragraphs: [
      "Over the past fourteen years, Vishal Transport has grown into a recognised leader in transportation and manpower solutions for the automobile and manufacturing sectors. With a fleet of 300+ vehicles and more than 550 skilled employees, we deliver dependable service to every partner we work with — backed by in-house maintenance facilities in Hosur and Bengaluru that keep our fleet moving without interruption.",
      "Our commitment is simple — to move with the future by continually refining our processes, investing in our people, and raising the standard of what an operations partner should be.",
      "Discover what's possible with Vishal Transport — your trusted partner in transportation and manpower solutions.",
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
    body: "Every driver at Vishal Transport is trained, tested, and re-trained — because the people we move deserve nothing less.",
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

/**
 * Partner logos for the marquee. Flat and logo-only by design: a company
 * without artwork is omitted rather than shown as a text tile, so the band
 * reads as a wall of recognisable marks at a glance.
 *
 * `scale` is optical correction. Balance is by rendered AREA, not height — a
 * 1:1 crest at the same height as a 5:1 wordmark covers a fraction of the
 * space. Regenerate with `node scripts/build-partner-logos.mjs`.
 *
 * Order is hand-set to alternate wide wordmarks with compact marks, so the
 * band never shows two long logos back to back as it scrolls.
 */
export type PartnerLogo = {
  src: string;
  width: number;
  height: number;
  scale: number;
};

export type Partner = {
  /** Registered name — the image's accessible name. */
  name: string;
  logo: PartnerLogo;
};

export const partnerLogos: Partner[] = [
  { name: "UNO Minda Ltd", logo: { src: "/partners/uno-minda.png", width: 315, height: 160, scale: 1 } },
  { name: "Tata Electronics Pvt Ltd", logo: { src: "/partners/tata-electronics.png", width: 182, height: 160, scale: 1.25 } },
  { name: "Titan Watches Ltd", logo: { src: "/partners/titan-watches.png", width: 166, height: 160, scale: 1.3 } },
  { name: "Dhoot Transmission Ltd", logo: { src: "/partners/dhoot-transmission.png", width: 687, height: 160, scale: 0.85 } },
  { name: "JBM Ogihara Automotive India Ltd", logo: { src: "/partners/jbm-ogihara.png", width: 403, height: 160, scale: 1 } },
  { name: "Titan Jewellery Ltd", logo: { src: "/partners/titan-jewellery.png", width: 166, height: 160, scale: 1.3 } },
  { name: "Titan Engineering & Automation Ltd", logo: { src: "/partners/teal.png", width: 784, height: 160, scale: 0.85 } },
  { name: "Suman Nirmal Minda School", logo: { src: "/partners/suman-nirmal-minda-school.png", width: 153, height: 160, scale: 1.3 } },
];

export const trust = {
  index: "14 — Trusted By",
  title: ["Trusted by", "industry leaders."],
  body:
    "Supporting leading automotive, manufacturing, engineering, and technology companies across India.",
};

export const faq = [
  {
    q: "What services does Vishal Transport provide?",
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
