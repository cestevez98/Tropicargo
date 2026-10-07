import { getTranslations } from "next-intl/server";
import { Icon } from "./icons";

type LegalSection = { title: string; paragraphs: string[] };

export async function LegalPage({ doc }: { doc: "privacy" | "terms" }) {
  const t = await getTranslations("legal");
  const sections = t.raw(`${doc}.sections`) as LegalSection[];

  return (
    <article className="bg-sand-50 py-12 sm:py-16">
      <div className="container-site max-w-3xl">
        <div role="note" className="flex gap-3 rounded-xl border-2 border-dashed border-accent-500 bg-accent-50 p-5">
          <Icon name="alert" size={24} className="shrink-0 text-accent-700" />
          <p className="font-semibold text-navy-900">{t("reviewNotice")}</p>
        </div>
        <h1 className="mt-10 text-4xl font-extrabold">{t(`${doc}.title`)}</h1>
        <p className="mt-2 text-sm text-muted">{t("lastUpdated")}</p>
        <div className="prose-legal mt-8">
          <p className="text-lg">{t(`${doc}.intro`)}</p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
