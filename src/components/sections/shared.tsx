import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { telHref } from "@/lib/whatsapp";
import { Icon, type IconName } from "../icons";
import { IconBadge, Section, SectionHeading } from "../ui";

export const SERVICE_KEYS = ["rcm", "coder", "projects", "credentialing"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];
export const SERVICE_ANCHORS: Record<ServiceKey, string> = {
  rcm: "rcm",
  coder: "dedicated-coder",
  projects: "projects",
  credentialing: "credentialing",
};
export const SERVICE_ICONS: Record<ServiceKey, IconName> = {
  rcm: "layers",
  coder: "clipboardCheck",
  projects: "search",
  credentialing: "idCard",
};

type Metric = { key: string; value: string; label: string; definition: string };

/** Cuadrícula de indicadores (metas de servicio) sobre fondo azul marino. */
export async function MetricsBand({ withCta = true }: { withCta?: boolean }) {
  const t = await getTranslations("home.metrics");
  const m = await getTranslations("metricsData");
  const items = m.raw("items") as Metric[];

  return (
    <Section tone="navy" labelledBy="metrics-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="metrics-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} light />
        {withCta && (
          <Link href="/metrics" className="btn-outline-light shrink-0 self-start lg:self-auto">
            {t("cta")}
            <Icon name="arrowRight" size={18} />
          </Link>
        )}
      </div>
      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.key} className="flex flex-col-reverse gap-2 bg-navy-800 p-5 sm:p-7">
            <dt className="text-sm leading-snug text-navy-100 sm:text-base">{item.label}</dt>
            <dd className="text-3xl font-extrabold tracking-tight text-accent-300 tabular-nums sm:text-4xl">{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 flex gap-2 text-sm text-navy-200">
        <Icon name="info" size={18} className="mt-0.5 shrink-0" />
        {m("disclaimer")}
      </p>
    </Section>
  );
}

/** Banda final de llamada a la acción. */
export async function FinalCta({ title, text }: { title?: string; text?: string }) {
  const t = await getTranslations("home.finalCta");
  return (
    <section aria-labelledby="final-cta-title" className="bg-sand-50 py-16 sm:py-20">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-700 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full border-[24px] border-accent-400/20" />
          <h2 id="final-cta-title" className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
            {title ?? t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-navy-100">{text ?? t("text")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              {t("primary")}
              <Icon name="arrowRight" size={18} />
            </Link>
            <a href={telHref} className="btn-outline-light">
              <Icon name="phone" size={18} />
              {t("secondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tarjetas resumen de los cuatro servicios. */
export async function ServiceCards() {
  const s = await getTranslations("servicesData");
  const c = await getTranslations("common");
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICE_KEYS.map((key) => (
        <li key={key} className="card group relative flex flex-col p-6 transition-shadow hover:shadow-lg">
          <IconBadge name={SERVICE_ICONS[key]} />
          <h3 className="mt-5 text-xl font-bold">
            <Link
              href={{ pathname: "/services", hash: SERVICE_ANCHORS[key] }}
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
            >
              {s(`${key}.title`)}
            </Link>
          </h3>
          <p className="mt-3 flex-1 leading-relaxed text-muted">{s(`${key}.short`)}</p>
          <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-navy-700 group-hover:text-navy-900">
            {c("learnMore")}
            <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Preguntas frecuentes con <details> nativo (accesible con teclado sin JavaScript). */
export async function FaqList() {
  const t = await getTranslations("home.faq");
  const items = t.raw("items") as { q: string; a: string }[];
  return (
    <div className="divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-white">
      {items.map((item, i) => (
        <details key={item.q} className="group px-5 sm:px-7" open={i === 0}>
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
            <h3 className="text-[1.05rem] sm:text-lg">{item.q}</h3>
            <Icon name="chevronDown" size={22} className="shrink-0 text-navy-500 transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-6 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
