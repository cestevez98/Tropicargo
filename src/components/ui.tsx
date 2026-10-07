import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export function Section({
  id,
  children,
  className = "",
  tone = "default",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "white" | "navy" | "sand";
  labelledBy?: string;
}) {
  const tones = {
    default: "bg-sand-50",
    white: "bg-white",
    sand: "bg-sand-100",
    navy: "bg-navy-800 text-white",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  light = false,
  align = "left",
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`mt-3 text-3xl leading-tight font-bold sm:text-4xl ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-navy-100" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

export function CheckList({ items, light = false, className = "" }: { items: string[]; light?: boolean; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Icon
            name="check"
            size={20}
            className={`mt-0.5 shrink-0 ${light ? "text-accent-300" : "text-accent-600"}`}
            strokeWidth={2.25}
          />
          <span className={light ? "text-navy-50" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function IconBadge({ name, tone = "navy" }: { name: IconName; tone?: "navy" | "accent" | "light" }) {
  const tones = {
    navy: "bg-navy-50 text-navy-700 ring-navy-100",
    accent: "bg-accent-50 text-accent-700 ring-accent-100",
    light: "bg-white/10 text-accent-300 ring-white/15",
  };
  return (
    <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${tones[tone]}`}>
      <Icon name={name} size={24} />
    </span>
  );
}

/** Encabezado de páginas interiores con fondo azul marino y trama abstracta. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-800 text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full border-[28px] border-accent-400/15 sm:h-[28rem] sm:w-[28rem]"
      />
      <div className="container-site py-14 sm:py-20">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-[1.1] font-extrabold text-white sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function Callout({
  title,
  children,
  icon = "info",
  tone = "accent",
  role,
}: {
  title: string;
  children: ReactNode;
  icon?: IconName;
  tone?: "accent" | "navy";
  role?: "note" | "alert";
}) {
  const tones = {
    accent: "border-accent-300 bg-accent-50",
    navy: "border-navy-200 bg-navy-50",
  };
  return (
    <div role={role} className={`flex gap-4 rounded-xl border-l-4 p-5 ${tones[tone]}`}>
      <Icon name={icon} size={24} className={`shrink-0 ${tone === "accent" ? "text-accent-700" : "text-navy-700"}`} />
      <div>
        <p className="font-bold text-navy-900">{title}</p>
        <div className="mt-1 leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}
