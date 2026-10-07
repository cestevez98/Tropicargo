import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@site-config";
import { Link } from "@/i18n/navigation";
import { mailHref, telHref } from "@/lib/whatsapp";
import { Icon, type IconName } from "./icons";
import { Logo } from "./Logo";

export async function Footer() {
  const locale = (await getLocale()) as "es" | "en";
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const c = await getTranslations("common");
  const s = await getTranslations("servicesData");

  const socials = (Object.entries(siteConfig.social) as [IconName & keyof typeof siteConfig.social, string][]).filter(
    ([, url]) => url,
  );
  const networkNames = { linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram" } as const;

  const linkClass = "text-navy-100 hover:text-white hover:underline underline-offset-4";

  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs leading-relaxed">{t("tagline")}</p>
          <p className="mt-6 flex max-w-xs gap-2 text-sm text-navy-200">
            <Icon name="shield" size={18} className="mt-0.5 shrink-0 text-accent-300" />
            {t("phiReminder")}
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map(([network, url]) => (
                <li key={network}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("socialLabel", { network: networkNames[network] })} ${c("opensNewTab")}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 hover:bg-white/10"
                  >
                    <Icon name={network} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-labelledby="footer-services" className="lg:col-span-2">
          <h2 id="footer-services" className="text-sm font-bold tracking-wider text-white uppercase">
            {t("servicesTitle")}
          </h2>
          <ul className="mt-4 space-y-3">
            {(
              [
                ["rcm", "rcm"],
                ["coder", "dedicated-coder"],
                ["projects", "projects"],
                ["credentialing", "credentialing"],
              ] as const
            ).map(([key, anchor]) => (
              <li key={key}>
                <Link href={{ pathname: "/services", hash: anchor }} className={linkClass}>
                  {s(`${key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company" className="lg:col-span-2">
          <h2 id="footer-company" className="text-sm font-bold tracking-wider text-white uppercase">
            {t("companyTitle")}
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/how-we-work" className={linkClass}>
                {nav("howWeWork")}
              </Link>
            </li>
            <li>
              <Link href="/metrics" className={linkClass}>
                {nav("metrics")}
              </Link>
            </li>
            <li>
              <Link href="/compliance" className={linkClass}>
                {nav("compliance")}
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass}>
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                {nav("contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-4">
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">{t("contactTitle")}</h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="flex gap-3">
              <Icon name="phone" size={20} className="mt-0.5 shrink-0 text-accent-300" />
              <span>
                <span className="sr-only">{c("phone")}: </span>
                <a href={telHref} className={linkClass}>
                  {siteConfig.contact.phoneDisplay}
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="mail" size={20} className="mt-0.5 shrink-0 text-accent-300" />
              <span>
                <span className="sr-only">{c("email")}: </span>
                <a href={mailHref} className={linkClass}>
                  {siteConfig.contact.email}
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="mapPin" size={20} className="mt-0.5 shrink-0 text-accent-300" />
              <span>
                <span className="sr-only">{c("address")}: </span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
              </span>
            </p>
            <p className="flex gap-3">
              <Icon name="clock" size={20} className="mt-0.5 shrink-0 text-accent-300" />
              <span>
                <span className="sr-only">{c("hours")}: </span>
                {siteConfig.hours[locale]}
              </span>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-navy-200 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <ul className="flex gap-6" aria-label={t("legalTitle")}>
            <li>
              <Link href="/privacy" className={linkClass}>
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                {t("terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
