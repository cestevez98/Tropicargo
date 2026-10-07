import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Icon, type IconName } from "@/components/icons";
import { Callout, CheckList, PageHero, Section } from "@/components/ui";
import { FinalCta } from "@/components/sections/shared";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "metrics", "/metrics");
}

type Metric = { key: string; value: string; label: string; definition: string };
const METRIC_ICONS: Record<string, IconName> = {
  cleanClaim: "checkCircle",
  denialRate: "repeat",
  daysAr: "calendar",
  netCollection: "chart",
  codingAccuracy: "target",
  turnaround: "clock",
};

export default async function MetricsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("metricsPage");
  const m = await getTranslations("metricsData");
  const items = m.raw("items") as Metric[];
  const reporting = t.raw("reporting.items") as string[];
  const factors = t.raw("factors.items") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <Section labelledBy="metrics-list-title">
        <h2 id="metrics-list-title" className="sr-only">
          {t("title")}
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.key} className="card flex flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg leading-snug font-bold">{item.label}</h3>
                <Icon name={METRIC_ICONS[item.key] ?? "chart"} size={24} className="shrink-0 text-navy-300" />
              </div>
              <p className="mt-4">
                <span className="block text-xs font-bold tracking-wider text-muted uppercase">{t("targetLabel")}</span>
                <span className="text-4xl font-extrabold tracking-tight text-navy-700 tabular-nums">{item.value}</span>
              </p>
              <div className="mt-4 border-t border-sand-200 pt-4">
                <p className="text-xs font-bold tracking-wider text-muted uppercase">{t("definitionLabel")}</p>
                <p className="mt-1 leading-relaxed text-ink">{item.definition}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Callout title={t("disclaimerTitle")} icon="info" role="note">
            {t("disclaimer")}
          </Callout>
        </div>
      </Section>

      <Section tone="white" labelledBy="reporting-title">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="reporting-title" className="text-2xl font-bold sm:text-3xl">
              {t("reporting.title")}
            </h2>
            <CheckList items={reporting} className="mt-6" />
          </div>
          <div className="rounded-2xl bg-sand-100 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">{t("factors.title")}</h2>
            <CheckList items={factors} className="mt-6" />
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
