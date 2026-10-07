import { siteConfig } from "@site-config";
import { baseUrl } from "./seo";

/** schema.org ProfessionalService (subtipo de LocalBusiness) con área de servicio Miami-Dade y Broward. */
export function organizationSchema(locale: "es" | "en", description: string, services: string[]) {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/${locale}/opengraph-image`,
    description,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    inLanguage: locale,
    knowsLanguage: ["es", "en"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.geo.latitude,
      longitude: siteConfig.address.geo.longitude,
    },
    areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHours: siteConfig.hours.schema,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "es" ? "Servicios" : "Services",
      itemListElement: services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
