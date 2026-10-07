import { getTranslations } from "next-intl/server";
import { siteConfig } from "@site-config";
import { Section, SectionHeading } from "./ui";

type Testimonial = { quote: string; name: string; role: string };

/**
 * Sección de testimonios — OCULTA por defecto.
 * Se muestra solo si site.config.ts → features.showTestimonials es true
 * y hay testimonios reales (con autorización escrita) en messages/*.json → testimonials.items.
 */
export async function Testimonials() {
  if (!siteConfig.features.showTestimonials) return null;
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as Testimonial[];
  if (!items.length) return null;

  return (
    <Section tone="white" labelledBy="testimonials-title">
      <SectionHeading id="testimonials-title" eyebrow={t("eyebrow")} title={t("title")} />
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.name} className="card p-6">
            <figure>
              <blockquote className="leading-relaxed text-ink">“{item.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-bold text-navy-900">{item.name}</span>
                <span className="block text-muted">{item.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
