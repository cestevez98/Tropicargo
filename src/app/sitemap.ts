import type { MetadataRoute } from "next";
import { routing, type AppPathname } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

const pages: { href: AppPathname; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { href: "/", priority: 1, changeFrequency: "monthly" },
  { href: "/services", priority: 0.9, changeFrequency: "monthly" },
  { href: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { href: "/how-we-work", priority: 0.8, changeFrequency: "monthly" },
  { href: "/metrics", priority: 0.7, changeFrequency: "monthly" },
  { href: "/compliance", priority: 0.7, changeFrequency: "monthly" },
  { href: "/about", priority: 0.6, changeFrequency: "monthly" },
  { href: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { href: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ href, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, href),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((l) => [l, localizedUrl(l, href)]),
          ["x-default", localizedUrl(routing.defaultLocale, href)],
        ]),
      },
    })),
  );
}
