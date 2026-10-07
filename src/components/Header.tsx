import { getTranslations } from "next-intl/server";
import { siteConfig } from "@site-config";
import type { AppPathname } from "@/i18n/routing";
import { HeaderClient } from "./HeaderClient";

export type NavItem = { href: AppPathname; label: string };

export async function Header() {
  const t = await getTranslations("nav");
  const c = await getTranslations("common");

  const items: NavItem[] = [
    { href: "/services", label: t("services") },
    { href: "/how-we-work", label: t("howWeWork") },
    { href: "/metrics", label: t("metrics") },
    { href: "/compliance", label: t("compliance") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <HeaderClient
      items={items}
      phoneDisplay={siteConfig.contact.phoneDisplay}
      labels={{
        home: t("home"),
        cta: c("requestAudit"),
        call: c("callUs"),
        menuOpen: c("menuOpen"),
        menuClose: c("menuClose"),
        primaryNav: c("primaryNav"),
        mobileNav: c("mobileNav"),
        language: c("languageLabel"),
        switchTo: c("switchTo"),
      }}
    />
  );
}
