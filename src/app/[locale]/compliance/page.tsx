import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { type IconName } from "@/components/icons";
import { Callout, CheckList, IconBadge, PageHero, Section } from "@/components/ui";
import { FinalCta } from "@/components/sections/shared";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "compliance", "/compliance");
}

type ComplianceSection = { id: string; title: string; text: string; items: string[] };
const ICONS: Record<string, IconName> = { hipaa: "lock", oig: "clipboardCheck", documentation: "fileText", team: "flag" };

export default async function CompliancePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("compliancePage");
  const sections = t.raw("sections") as ComplianceSection[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm font-semibold text-white hover:bg-white/10"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="card scroll-mt-28 p-6 sm:p-8">
              <IconBadge name={ICONS[s.id] ?? "shield"} />
              <h2 id={`${s.id}-title`} className="mt-5 text-2xl font-bold">
                {s.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              <CheckList items={s.items} className="mt-6 text-[0.95rem]" />
            </section>
          ))}
        </div>
        <div className="mt-10">
          <Callout title={t("formNoticeTitle")} icon="alert" role="note">
            {t("formNotice")}
          </Callout>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
