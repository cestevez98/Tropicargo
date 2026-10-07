import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@site-config";
import { routing } from "@/i18n/routing";
import { baseUrl } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";

const publicSans = Public_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-public-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#1F3864",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(baseUrl),
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("defaultDescription"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_US" : "en_US",
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations("common");
  const meta = await getTranslations("meta");
  const s = await getTranslations("servicesData");
  const serviceNames = (["rcm", "coder", "projects", "credentialing"] as const).map((k) => s(`${k}.title`));

  return (
    <html lang={locale} className={publicSans.variable}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-navy-800 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t("skipToContent")}
        </a>
        {/* Solo se envían al navegador los textos que usan los componentes de cliente. */}
        <NextIntlClientProvider messages={{ form: messages.form }}>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
        <JsonLd data={organizationSchema(locale, meta("defaultDescription"), serviceNames)} />
        {/* Vercel Web Analytics: sin cookies. Solo se carga cuando el sitio corre en Vercel. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
