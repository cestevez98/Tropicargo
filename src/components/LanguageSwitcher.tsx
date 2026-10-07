"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Icon } from "./icons";

const names = { es: "Español", en: "English" } as const;

export function LanguageSwitcher({ label, switchTo }: { label: string; switchTo: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-1 rounded-lg border border-sand-200 bg-white p-1">
      <Icon name="globe" size={18} className="mx-1 text-navy-500" />
      {routing.locales.map((l) => {
        const active = l === locale;
        return active ? (
          <span
            key={l}
            aria-current="true"
            lang={l}
            title={names[l]}
            className="inline-flex min-h-9 min-w-10 items-center justify-center rounded-md bg-navy-700 px-2 text-sm font-bold text-white"
          >
            <span aria-hidden="true">{l.toUpperCase()}</span>
            <span className="sr-only">{names[l]}</span>
          </span>
        ) : (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-label={`${l.toUpperCase()} – ${switchTo}`}
            className="inline-flex min-h-9 min-w-10 items-center justify-center rounded-md px-2 text-sm font-bold text-navy-700 hover:bg-navy-50"
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
