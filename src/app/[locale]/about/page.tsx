import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Icon, type IconName } from "@/components/icons";
import { IconBadge, PageHero, Section, SectionHeading } from "@/components/ui";
import { FinalCta } from "@/components/sections/shared";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", "/about");
}

type Value = { title: string; text: string };
type Member = { name: string; role: string; bio: string };
const VALUE_ICONS: IconName[] = ["target", "eye", "users", "shieldCheck"];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const values = t.raw("values.items") as Value[];
  const members = t.raw("team.members") as Member[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <Section tone="white" labelledBy="mission-title">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="mission-title" className="eyebrow justify-center">
            {t("mission.title")}
          </h2>
          <p className="mt-5 text-2xl leading-snug font-semibold text-navy-900 sm:text-3xl">{t("mission.text")}</p>
        </div>
      </Section>

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" title={t("values.title")} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.title} className="card p-6">
              <IconBadge name={VALUE_ICONS[i] ?? "check"} tone="accent" />
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="team-title">
        <SectionHeading id="team-title" title={t("team.title")} lead={t("team.lead")} />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li key={member.role}>
              {/* Marcador de posición para foto: reemplazar por <Image> con la foto real (proporción 4:5). */}
              <div
                role="img"
                aria-label={`${t("team.photoPlaceholder")}: ${member.role}`}
                className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-navy-50 ring-1 ring-navy-100"
              >
                <svg aria-hidden="true" viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                  <circle cx="170" cy="40" r="70" fill="none" stroke="#E9A23B" strokeOpacity="0.35" strokeWidth="14" />
                  <path d="M0 210 C 60 180, 120 240, 200 190" stroke="#8ba3c8" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
                </svg>
                <span className="relative flex flex-col items-center gap-2 text-navy-400">
                  <Icon name="user" size={44} />
                  <span className="text-sm font-semibold tracking-wider uppercase">{t("team.photoPlaceholder")}</span>
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{member.name}</h3>
              <p className="font-semibold text-accent-700">{member.role}</p>
              <p className="mt-2 leading-relaxed text-muted">{member.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
