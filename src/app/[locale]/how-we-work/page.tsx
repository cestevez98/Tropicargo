import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Icon, type IconName } from "@/components/icons";
import { CheckList, PageHero, Section, SectionHeading } from "@/components/ui";
import { FinalCta } from "@/components/sections/shared";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "howWeWork", "/how-we-work");
}

type Step = { title: string; text: string; details: string[] };
const STEP_ICONS: IconName[] = ["fileText", "lock", "clipboardCheck", "search", "send", "chart"];

export default async function HowWeWorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("howWeWorkPage");
  const steps = t.raw("steps") as Step[];
  const systems = t.raw("systems.list") as string[];
  const needs = t.raw("needs.items") as string[];
  const timeline = t.raw("timeline.items") as { when: string; what: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <Section labelledBy="steps-title">
        <h2 id="steps-title" className="sr-only">
          {t("title")}
        </h2>
        <ol className="relative mx-auto max-w-4xl">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-8">
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute top-14 bottom-0 left-6 w-px bg-navy-200 sm:left-7" />
              )}
              <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white ring-4 ring-sand-50 sm:h-14 sm:w-14">
                <Icon name={STEP_ICONS[i] ?? "check"} size={24} />
              </span>
              <div className="card flex-1 p-6 sm:p-7">
                <p className="text-sm font-bold tracking-wide text-accent-700 uppercase">
                  {t("stepLabel")} {i + 1}
                </p>
                <h3 className="mt-1 text-xl font-bold sm:text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
                <CheckList items={step.details} className="mt-5 text-[0.95rem]" />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white" labelledBy="systems-title">
        <SectionHeading id="systems-title" title={t("systems.title")} lead={t("systems.lead")} />
        <ul className="mt-8 flex flex-wrap gap-3">
          {systems.map((name) => (
            <li
              key={name}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-sand-200 bg-sand-50 px-5 font-semibold text-navy-800"
            >
              <Icon name="monitor" size={18} className="text-navy-400" />
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted">{t("systems.note")}</p>
      </Section>

      <Section labelledBy="needs-title">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <h2 id="needs-title" className="text-2xl font-bold">
              {t("needs.title")}
            </h2>
            <CheckList items={needs} className="mt-6" />
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-bold">{t("timeline.title")}</h2>
            <dl className="mt-6 divide-y divide-sand-200">
              {timeline.map((row) => (
                <div key={row.when} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-bold text-navy-800">{row.when}</dt>
                  <dd className="text-muted sm:col-span-2">{row.what}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex gap-2 text-sm text-muted">
              <Icon name="info" size={18} className="mt-0.5 shrink-0" />
              {t("timeline.note")}
            </p>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
