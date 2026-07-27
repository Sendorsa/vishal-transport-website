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
  | "facebook";

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
};

type IconProps = { name: IconName } & SVGProps<SVGSVGElement>;

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}
