import type { SVGProps } from "react";

/** Iconografía lineal propia (24×24, trazo 1.75) para mantener coherencia visual. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const icons = {
  check: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </Base>
  ),
  checkCircle: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.7 2.7L16.2 9.5" />
    </Base>
  ),
  arrowRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  ),
  phone: (p: IconProps) => (
    <Base {...p}>
      <path d="M5.5 3.5h3l1.5 4.5-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2 4.5 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2z" />
    </Base>
  ),
  mail: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </Base>
  ),
  mapPin: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Base>
  ),
  clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  ),
  menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  ),
  close: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  ),
  globe: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </Base>
  ),
  fileText: (p: IconProps) => (
    <Base {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
    </Base>
  ),
  fileClock: (p: IconProps) => (
    <Base {...p}>
      <path d="M13 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v3" />
      <path d="M14 3v5h5" />
      <circle cx="17" cy="17" r="4" />
      <path d="M17 15.5V17l1 1" />
    </Base>
  ),
  repeat: (p: IconProps) => (
    <Base {...p}>
      <path d="M17 2l3 3-3 3" />
      <path d="M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3" />
      <path d="M20 13v2a4 4 0 0 1-4 4H4" />
    </Base>
  ),
  hourglass: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
    </Base>
  ),
  stethoscope: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 3v6a5 5 0 0 0 10 0V3" />
      <path d="M11 14v1.5a5.5 5.5 0 0 0 11 0V13" />
      <circle cx="21.5" cy="11" r="1.5" />
    </Base>
  ),
  target: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </Base>
  ),
  shield: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
    </Base>
  ),
  shieldCheck: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </Base>
  ),
  lock: (p: IconProps) => (
    <Base {...p}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </Base>
  ),
  scale: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z" />
    </Base>
  ),
  clipboardCheck: (p: IconProps) => (
    <Base {...p}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 13l2 2 4-4" />
    </Base>
  ),
  user: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </Base>
  ),
  users: (p: IconProps) => (
    <Base {...p}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6" />
    </Base>
  ),
  idCard: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 14h3" />
    </Base>
  ),
  layers: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Base>
  ),
  search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </Base>
  ),
  chart: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 4v16h16" />
      <path d="M7.5 15l3.5-4 3 2.5L19 8" />
    </Base>
  ),
  calendar: (p: IconProps) => (
    <Base {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Base>
  ),
  send: (p: IconProps) => (
    <Base {...p}>
      <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />
    </Base>
  ),
  monitor: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </Base>
  ),
  flag: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </Base>
  ),
  alert: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3.5L2.5 20h19z" />
      <path d="M12 10v4.5M12 17.5v.01" />
    </Base>
  ),
  info: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8v.01" />
    </Base>
  ),
  chevronDown: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 9l6 6 6-6" />
    </Base>
  ),
  heart: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
    </Base>
  ),
  eye: (p: IconProps) => (
    <Base {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </Base>
  ),
  linkedin: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.8v.01M12 16v-5.5M12 13a2.5 2.5 0 0 1 5 0v3" />
    </Base>
  ),
  facebook: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M15.5 8H14a2 2 0 0 0-2 2v11M9.5 13H15" />
    </Base>
  ),
  instagram: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.01" />
    </Base>
  ),
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Cmp = icons[name];
  return <Cmp {...props} />;
}

/** Logotipo de WhatsApp (relleno), necesario para que el botón sea reconocible. */
export function WhatsAppIcon({ size = 28, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 27l6.2-1.6a12.1 12.1 0 0 0 5.84 1.48h.01c6.63 0 12.03-5.37 12.03-11.97C28.08 8.36 22.68 3 16.04 3zm0 21.86h-.01c-1.8 0-3.56-.48-5.1-1.39l-.37-.22-3.68.95.98-3.56-.24-.37a9.9 9.9 0 0 1-1.53-5.3c0-5.49 4.49-9.96 10.01-9.96 2.67 0 5.18 1.04 7.07 2.92a9.86 9.86 0 0 1 2.93 7.05c0 5.49-4.5 9.88-10.06 9.88zm5.49-7.44c-.3-.15-1.78-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.22 1.36.19 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35z"
      />
    </svg>
  );
}
