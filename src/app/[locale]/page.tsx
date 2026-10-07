import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { Icon, type IconName } from "@/components/icons";
import { CheckList, IconBadge, Section, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Testimonials } from "@/components/Testimonials";
import { FaqList, FinalCta, MetricsBand, ServiceCards } from "@/components/sections/shared";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "home", "/");
}

const PROBLEM_ICONS: IconName[] = ["fileClock", "repeat", "hourglass", "stethoscope", "target", "scale"];
const COMPLIANCE_ICONS: IconName[] = ["shieldCheck", "clipboardCheck", "fileText", "flag"];

type Item = { title: string; text: string };
type ClinicType = { title: string; model: string; benefit: string; points: string[] };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const c = await getTranslations("common");

  const heroPoints = t.raw("hero.points") as string[];
  const cardItems = t.raw("hero.card.items") as string[];
  const problems = t.raw("problems.items") as Item[];
  const clinicTypes = t.raw("clinicTypes.items") as ClinicType[];
  const steps = t.raw("process.steps") as Item[];
  const compliance = t.raw("compliance.items") as Item[];
  const faq = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-800 text-white">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
        <svg
          aria-hidden="true"
          className="absolute top-0 right-0 -z-10 hidden h-full w-1/2 lg:block"
          viewBox="0 0 600 700"
          preserveAspectRatio="xMaxYMid slice"
          fill="none"
        >
          <circle cx="520" cy="140" r="210" stroke="#E9A23B" strokeOpacity="0.18" strokeWidth="36" />
          <path d="M40 620 C 200 520, 300 600, 600 420" stroke="#8ba3c8" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M40 660 C 220 560, 320 640, 600 470" stroke="#8ba3c8" strokeOpacity="0.15" strokeWidth="2" />
        </svg>
        <div className="container-site grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-light">{t("hero.eyebrow")}</p>
            <h1 id="hero-title" className="mt-4 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-[3.5rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">{t("hero.lead")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                {t("hero.ctaPrimary")}
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link href="/services" className="btn-outline-light">
                {t("hero.ctaSecondary")}
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 text-navy-50 sm:grid-cols-3 sm:gap-4">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm sm:text-[0.95rem]">
                  <Icon name="checkCircle" size={20} className="mt-px shrink-0 text-accent-300" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <aside aria-labelledby="audit-card-title" className="lg:col-span-5">
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rotate-2 rounded-3xl bg-accent-400/20" />
              <div className="relative rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold tracking-[0.14em] text-accent-700 uppercase">{t("hero.card.label")}</p>
                  <Icon name="fileText" size={28} className="text-navy-300" />
                </div>
                <h2 id="audit-card-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  {t("hero.card.title")}
                </h2>
                <p className="mt-3 text-muted">{t("hero.card.text")}</p>
                <CheckList items={cardItems} className="mt-5" />
                <Link href="/contact" className="btn-navy mt-7 w-full">
                  {t("hero.card.cta")}
                </Link>
                <p className="mt-4 flex gap-2 text-sm text-muted">
                  <Icon name="lock" size={16} className="mt-0.5 shrink-0 text-navy-500" />
                  {t("hero.card.note")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Problemas ────────────────────────────────────── */}
      <Section labelledBy="problems-title">
        <SectionHeading id="problems-title" eyebrow={t("problems.eyebrow")} title={t("problems.title")} lead={t("problems.lead")} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <li key={p.title} className="card p-6">
              <IconBadge name={PROBLEM_ICONS[i] ?? "alert"} tone="accent" />
              <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Servicios ────────────────────────────────────── */}
      <Section tone="white" labelledBy="services-title">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="services-title" eyebrow={t("services.eyebrow")} title={t("services.title")} lead={t("services.lead")} />
          <Link href="/services" className="btn-outline shrink-0 self-start lg:self-auto">
            {c("seeAllServices")}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
        <div className="mt-12">
          <ServiceCards />
        </div>
      </Section>

      {/* ── Tipos de clínica ─────────────────────────────── */}
      <Section labelledBy="clinic-types-title">
        <SectionHeading
          id="clinic-types-title"
          eyebrow={t("clinicTypes.eyebrow")}
          title={t("clinicTypes.title")}
          lead={t("clinicTypes.lead")}
        />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {clinicTypes.map((ct, i) => (
            <li key={ct.title} className="card flex flex-col overflow-hidden">
              <div className={`h-1.5 ${["bg-navy-400", "bg-navy-600", "bg-accent-400"][i]}`} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-sm font-semibold text-muted">{ct.model}</p>
                <h3 className="mt-1 text-2xl font-extrabold">{ct.title}</h3>
                <p className="mt-4 border-l-2 border-accent-400 pl-4 text-lg leading-snug font-semibold text-navy-800">{ct.benefit}</p>
                <CheckList items={ct.points} className="mt-6 text-[0.95rem]" />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Proceso ──────────────────────────────────────── */}
      <Section tone="white" labelledBy="process-title">
        <SectionHeading id="process-title" eyebrow={t("process.eyebrow")} title={t("process.title")} lead={t("process.lead")} />
        <ol className="mt-12 grid gap-4 lg:grid-cols-5 lg:gap-0">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 lg:flex-col lg:gap-0 lg:pr-6">
              <div className="flex flex-col items-center lg:flex-row lg:items-center">
                <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-700 text-lg font-extrabold text-white ring-4 ring-white">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="w-px flex-1 bg-navy-200 lg:h-px lg:w-auto lg:flex-1" />
                )}
              </div>
              <div className="pb-6 lg:pt-5 lg:pb-0">
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link href="/how-we-work" className="link mt-10 inline-flex items-center gap-1.5">
          {t("process.cta")}
          <Icon name="arrowRight" size={18} />
        </Link>
      </Section>

      {/* ── Indicadores ──────────────────────────────────── */}
      <MetricsBand />

      {/* ── Cumplimiento ─────────────────────────────────── */}
      <Section labelledBy="compliance-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="compliance-title"
              eyebrow={t("compliance.eyebrow")}
              title={t("compliance.title")}
              lead={t("compliance.lead")}
            />
            <Link href="/compliance" className="btn-outline mt-8">
              {t("compliance.cta")}
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {compliance.map((item, i) => (
              <li key={item.title} className="card p-6">
                <IconBadge name={COMPLIANCE_ICONS[i] ?? "shield"} />
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Testimonials />

      {/* ── Preguntas frecuentes ─────────────────────────── */}
      <Section tone="sand" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="faq-title" eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList />
          </div>
        </div>
      </Section>

      <FinalCta />
      <JsonLd data={faqSchema(faq)} />
    </>
  );
}
