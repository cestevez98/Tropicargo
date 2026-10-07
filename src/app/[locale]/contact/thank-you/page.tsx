import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/icons";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "thankYou", "/contact/thank-you", { noIndex: true });
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thankYouPage");

  return (
    <section className="bg-sand-50 py-16 sm:py-24">
      <div className="container-site">
        <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 text-navy-700 ring-1 ring-navy-100">
            <Icon name="checkCircle" size={34} />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">{t("title")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t("text")}</p>
          <p className="mx-auto mt-6 flex max-w-lg gap-2 rounded-xl bg-accent-50 p-4 text-left text-sm leading-relaxed text-ink">
            <Icon name="shield" size={20} className="shrink-0 text-accent-700" />
            {t("reminder")}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-navy">
              {t("home")}
            </Link>
            <Link href="/services" className="btn-outline">
              {t("services")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
