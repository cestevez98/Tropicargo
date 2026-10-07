import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/icons";
import { Callout, CheckList, IconBadge, PageHero, Section, SectionHeading } from "@/components/ui";
import { FinalCta, SERVICE_ANCHORS, SERVICE_ICONS, SERVICE_KEYS } from "@/components/sections/shared";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "services", "/services");
}

type PricingModel = { title: string; basis: string; text: string };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const s = await getTranslations("servicesData");
  const c = await getTranslations("common");
  const models = t.raw("pricing.models") as PricingModel[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")}>
        <nav aria-label={t("jumpTo")} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {SERVICE_KEYS.map((key) => (
              <li key={key}>
                <a
                  href={`#${SERVICE_ANCHORS[key]}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <Icon name={SERVICE_ICONS[key]} size={18} className="text-accent-300" />
                  {s(`${key}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {SERVICE_KEYS.map((key, i) => {
        const includes = s.raw(`${key}.includes`) as string[];
        return (
          <Section key={key} id={SERVICE_ANCHORS[key]} tone={i % 2 === 0 ? "default" : "white"} labelledBy={`${key}-title`}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <IconBadge name={SERVICE_ICONS[key]} tone="accent" />
                <p className="mt-5 text-sm font-semibold text-muted">
                  {String(i + 1).padStart(2, "0")} / {String(SERVICE_KEYS.length).padStart(2, "0")}
                </p>
                <h2 id={`${key}-title`} className="mt-1 text-3xl font-extrabold sm:text-4xl">
                  {s(`${key}.title`)}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{s(`${key}.summary`)}</p>
                <div className="mt-6 rounded-xl bg-navy-50 p-5">
                  <p className="text-sm font-bold tracking-wide text-navy-700 uppercase">{s(`${key}.idealTitle`)}</p>
                  <p className="mt-1 leading-relaxed text-ink">{s(`${key}.ideal`)}</p>
                </div>
                <Link href="/contact" className="btn-primary mt-8">
                  {c("requestQuote")}
                  <Icon name="arrowRight" size={18} />
                </Link>
              </div>
              <div className="lg:col-span-7">
                <div className="card p-6 sm:p-8">
                  <h3 className="text-xl font-bold">{s(`${key}.includesTitle`)}</h3>
                  <CheckList items={includes} className="mt-6" />
                </div>
                {key === "coder" && (
                  <div className="mt-6">
                    <Callout title={s("coder.guardrailTitle")} icon="shieldCheck" role="note">
                      {s("coder.guardrail")}
                    </Callout>
                  </div>
                )}
              </div>
            </div>
          </Section>
        );
      })}

      <Section id="pricing-model" tone="sand" labelledBy="pricing-title">
        <SectionHeading id="pricing-title" eyebrow={t("pricing.eyebrow")} title={t("pricing.title")} lead={t("pricing.lead")} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {models.map((m) => (
            <li key={m.title} className="card flex flex-col p-6 sm:p-7">
              <h3 className="text-xl font-bold">{m.title}</h3>
              <p className="mt-3 inline-flex self-start rounded-full bg-accent-50 px-3 py-1 text-sm font-bold text-accent-800 ring-1 ring-accent-200">
                {m.basis}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{m.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 flex max-w-3xl gap-3 font-semibold text-navy-800">
          <Icon name="scale" size={22} className="shrink-0 text-accent-600" />
          {t("pricing.note")}
        </p>
        <Link href="/contact" className="btn-navy mt-8">
          {t("pricing.cta")}
        </Link>
      </Section>

      <FinalCta title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
