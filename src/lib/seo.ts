import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@site-config";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";

export const baseUrl = siteConfig.domain.replace(/\/$/, "");

export function localizedUrl(locale: Locale, href: AppPathname) {
  const path = getPathname({ locale, href });
  return `${baseUrl}${path === "/" ? "" : path}`;
}

/** Alternativas hreflang (es, en y x-default → español). */
export function alternates(locale: Locale, href: AppPathname): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, href);
  languages["x-default"] = localizedUrl(routing.defaultLocale, href);
  return { canonical: localizedUrl(locale, href), languages };
}

type PageKey =
  | "home"
  | "services"
  | "howWeWork"
  | "metrics"
  | "compliance"
  | "about"
  | "contact"
  | "thankYou"
  | "privacy"
  | "terms";

export async function pageMetadata(
  locale: Locale,
  key: PageKey,
  href: AppPathname,
  options: { noIndex?: boolean } = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const url = localizedUrl(locale, href);
  const image = { url: `${baseUrl}/${locale}/opengraph-image`, width: 1200, height: 630, alt: t("ogAlt") };

  return {
    title: key === "home" ? { absolute: `${title} | ${siteConfig.name}` } : title,
    description,
    alternates: alternates(locale, href),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_US"],
      url,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: options.noIndex ? { index: false, follow: true } : undefined,
  };
}
