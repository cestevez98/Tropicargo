import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@site-config";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Open Graph";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OgImage({ params }: { params: Promise<{ locale: "es" | "en" }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const m = await getTranslations({ locale, namespace: "common" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#172b4e",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#ffffff",
              color: "#1F3864",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            {siteConfig.logo.initials}
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 24, color: "#efb75a", textTransform: "uppercase", letterSpacing: 3 }}>{t("eyebrow")}</div>
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>{t("title")}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#dce4f0" }}>
          <div style={{ width: 60, height: 6, background: "#E9A23B", borderRadius: 3 }} />
          {m("serviceAreaValue")} · {siteConfig.contact.phoneDisplay}
        </div>
      </div>
    ),
    size,
  );
}
