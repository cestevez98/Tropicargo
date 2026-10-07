import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/icons";

export default async function NotFound() {
  const t = await getTranslations("notFoundPage");
  return (
    <section className="relative isolate overflow-hidden bg-sand-50 py-20 sm:py-28">
      <svg aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="170" stroke="#1F3864" strokeOpacity="0.06" strokeWidth="40" />
        <circle cx="200" cy="200" r="100" stroke="#E9A23B" strokeOpacity="0.15" strokeWidth="12" />
      </svg>
      <div className="container-site max-w-xl text-center">
        <p className="eyebrow justify-center">{t("code")}</p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted">{t("text")}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-navy">
            {t("home")}
          </Link>
          <Link href="/contact" className="btn-outline">
            {t("contact")}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
