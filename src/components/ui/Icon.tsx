import type { SVGProps } from "react";

export type IconName =
  | "pin"
  | "phone"
  | "mail"
  | "arrow"
  | "plus"
  | "menu"
  | "close"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "users"
  | "truck"
  | "bus"
  | "gps"
  | "camera"
  | "shield"
  | "check"
  | "wrench"
  | "warehouse"
  | "clock";

const paths: Record<IconName, React.ReactNode> = {
  pin: (
    <>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
      <circle cx="12" cy="9.3" r="2.2" fill="none" stroke="currentColor" strokeWidth={1.3} />
    </>
  ),
  phone: (
    <path d="M7 3.5 9.5 8 7.2 9.8a11 11 0 0 0 5 5l1.8-2.3 4.5 2.5-.6 3a2 2 0 0 1-2.2 1.6C9.8 18.8 5.2 14.2 4.4 8.3a2 2 0 0 1 1.6-2.2l1-.6z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  arrow: (
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  ),
  plus: (
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  ),
  menu: (
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
  ),
  close: (
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" strokeWidth={1.2} />
      <path d="M7.5 10v6.5M7.5 7.6v.1M11.5 16.5V10M11.5 12.7c0-1.5 1-2.7 2.6-2.7 1.7 0 2.4 1.1 2.4 2.9v3.6" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth={1.2} />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth={1.2} />
    </>
  ),
  facebook: (
    <path d="M14.5 21v-7h2.3l.4-3h-2.7V8.9c0-.9.2-1.5 1.5-1.5h1.3V4.8C16.9 4.7 16 4.6 15 4.6c-2.2 0-3.7 1.3-3.7 3.8V11H9v3h2.3v7h3.2z" fill="currentColor" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M3.5 19c.5-3 2.7-4.5 5.5-4.5s5 1.5 5.5 4.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      <circle cx="16" cy="8.5" r="2.3" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M14.8 14.7c2.2.2 3.9 1.6 4.3 4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
    </>
  ),
  truck: (
    <>
      <rect x="2.5" y="8" width="11" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M13.5 11h3.5l3 3v2h-1.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
      <circle cx="7" cy="17.3" r="1.6" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <circle cx="16.5" cy="17.3" r="1.6" fill="none" stroke="currentColor" strokeWidth={1.3} />
    </>
  ),
  bus: (
    <>
      <rect x="3" y="6" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M3 11h18" stroke="currentColor" strokeWidth={1.3} />
      <path d="M6.5 6V3.7h11V6" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <circle cx="17" cy="18" r="1.6" fill="none" stroke="currentColor" strokeWidth={1.3} />
    </>
  ),
  gps: (
    <>
      <circle cx="12" cy="11" r="3" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M12 2v2.2M12 19.8V22M2 11h2.2M19.8 11H22" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      <circle cx="12" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeDasharray="2 3" />
    </>
  ),
  camera: (
    <>
      <rect x="2.5" y="7" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M16.5 10.3 21 8v8l-4.5-2.3" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
      <circle cx="9.5" cy="12" r="2.3" fill="none" stroke="currentColor" strokeWidth={1.3} />
    </>
  ),
  shield: (
    <path d="M12 3l7 2.7v5.3c0 5-3 8-7 10-4-2-7-5-7-10V5.7L12 3z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
  ),
  check: (
    <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 1-5 5L4.5 16.5a2 2 0 0 0 2.8 2.8L12.5 14a4 4 0 0 1 5-5l-2 2-2-.5-.5-2 2-2z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" strokeLinecap="round" />
  ),
  warehouse: (
    <>
      <path d="M3 10.5 12 5l9 5.5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M4.5 10v9h15v-9" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M9 19v-5h6v5" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

type IconProps = { name: IconName } & SVGProps<SVGSVGElement>;

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}
