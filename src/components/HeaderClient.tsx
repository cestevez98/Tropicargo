"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { telHref } from "@/lib/whatsapp";
import { Icon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import type { NavItem } from "./Header";

type Labels = {
  home: string;
  cta: string;
  call: string;
  menuOpen: string;
  menuClose: string;
  primaryNav: string;
  mobileNav: string;
  language: string;
  switchTo: string;
};

export function HeaderClient({ items, labels, phoneDisplay }: { items: NavItem[]; labels: Labels; phoneDisplay: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cierra el menú al cambiar de página.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="shrink-0 rounded-md">
          <Logo />
        </Link>

        <nav aria-label={labels.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-md px-2.5 py-2 text-[0.95rem] font-medium whitespace-nowrap transition-colors hover:bg-navy-50 hover:text-navy-900 ${
                    isActive(item.href) ? "text-navy-900 underline decoration-accent-400 decoration-2 underline-offset-8" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher label={labels.language} switchTo={labels.switchTo} />
          </div>
          <a
            href={telHref}
            className="hidden items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold whitespace-nowrap text-navy-800 hover:text-navy-950 2xl:inline-flex"
          >
            <Icon name="phone" size={18} />
            {phoneDisplay}
          </a>
          <Link href="/contact" className="btn-primary hidden !min-h-11 !px-4 !py-2 text-sm whitespace-nowrap sm:inline-flex">
            {labels.cta}
          </Link>
          <a
            href={telHref}
            aria-label={labels.call}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-sand-200 text-navy-800 lg:hidden"
          >
            <Icon name="phone" size={20} />
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-sand-200 text-navy-800 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? labels.menuClose : labels.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!open} className="border-t border-sand-200 bg-white lg:hidden">
        <nav aria-label={labels.mobileNav} className="container-site py-4">
          <ul className="divide-y divide-sand-200">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center justify-between py-3 text-lg font-medium ${
                    isActive(item.href) ? "text-navy-900" : "text-ink"
                  }`}
                >
                  {item.label}
                  <Icon name="arrowRight" size={18} className="text-navy-300" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              {labels.cta}
            </Link>
            <a href={telHref} className="btn-outline w-full">
              <Icon name="phone" size={18} />
              {phoneDisplay}
            </a>
            <div className="flex justify-center pt-2">
              <LanguageSwitcher label={labels.language} switchTo={labels.switchTo} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
