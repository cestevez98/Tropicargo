import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@site-config";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { mailHref, telHref, whatsappUrl } from "@/lib/whatsapp";
import { Icon, WhatsAppIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const c = await getTranslations("common");
  const steps = t.raw("nextSteps.items") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="bg-sand-50 py-12 sm:py-16" aria-label={t("title")}>
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div role="note" className="mb-6 flex gap-4 rounded-xl border-2 border-accent-400 bg-accent-50 p-5">
              <Icon name="alert" size={26} className="shrink-0 text-accent-700" />
              <div>
                <p className="font-bold text-navy-900">{t("phiNotice.title")}</p>
                <p className="mt-1 leading-relaxed text-ink">{t("phiNotice.text")}</p>
              </div>
            </div>
            <div className="card p-5 sm:p-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold">{t("nextSteps.title")}</h2>
              <ol className="mt-5 space-y-4">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-700 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-navy-800 p-6 text-white sm:p-8">
              <h2 className="text-xl font-bold text-white">{t("otherWays")}</h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <a href={telHref} className="flex items-center gap-3 font-semibold hover:underline">
                    <Icon name="phone" size={22} className="text-accent-300" />
                    <span>
                      <span className="sr-only">{c("phone")}: </span>
                      {siteConfig.contact.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl(c("whatsappMessage"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-semibold hover:underline"
                  >
                    <WhatsAppIcon size={22} className="text-accent-300" />
                    <span>
                      WhatsApp <span className="sr-only">{c("opensNewTab")}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={mailHref} className="flex items-center gap-3 font-semibold break-all hover:underline">
                    <Icon name="mail" size={22} className="shrink-0 text-accent-300" />
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex gap-3 text-navy-100">
                  <Icon name="clock" size={22} className="shrink-0 text-accent-300" />
                  {siteConfig.hours[locale]}
                </li>
                <li className="flex gap-3 text-navy-100">
                  <Icon name="mapPin" size={22} className="shrink-0 text-accent-300" />
                  <span>
                    {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region}{" "}
                    {siteConfig.address.postalCode}
                    <span className="mt-1 block text-sm text-navy-200">
                      {c("serviceArea")}: {c("serviceAreaValue")}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
