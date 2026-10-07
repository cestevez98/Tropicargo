import Image from "next/image";
import { siteConfig } from "@site-config";

/**
 * Logo provisional en SVG generado solo con texto (iniciales + nombre).
 * Para usar un logo definitivo, indique su ruta en site.config.ts → logo.src.
 */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { logo, name } = siteConfig;

  if (logo.src) {
    return <Image src={logo.src} alt={name} width={logo.width} height={logo.height} priority className="h-9 w-auto" />;
  }

  const text = variant === "light" ? "text-white" : "text-navy-800";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" focusable="false" className="shrink-0">
        <rect width="36" height="36" rx="8" fill={variant === "light" ? "#ffffff" : "#1F3864"} />
        <rect x="6" y="27" width="24" height="2.5" rx="1.25" fill="#E9A23B" />
        <text
          x="18"
          y="22"
          textAnchor="middle"
          fontFamily="var(--font-public-sans), Arial, sans-serif"
          fontWeight="800"
          fontSize="14"
          letterSpacing="0.5"
          fill={variant === "light" ? "#1F3864" : "#ffffff"}
        >
          {logo.initials}
        </text>
      </svg>
      <span className={`text-[0.95rem] leading-tight font-extrabold tracking-tight sm:text-base ${text}`}>{name}</span>
    </span>
  );
}
