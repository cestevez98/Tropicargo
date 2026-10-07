import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  // Rutas traducidas: la clave es la ruta interna (carpeta en src/app/[locale]).
  pathnames: {
    "/": "/",
    "/services": { es: "/servicios", en: "/services" },
    "/how-we-work": { es: "/como-trabajamos", en: "/how-we-work" },
    "/metrics": { es: "/indicadores", en: "/metrics" },
    "/compliance": { es: "/cumplimiento", en: "/compliance" },
    "/about": { es: "/nosotros", en: "/about" },
    "/contact": { es: "/contacto", en: "/contact" },
    "/contact/thank-you": { es: "/contacto/gracias", en: "/contact/thank-you" },
    "/privacy": { es: "/privacidad", en: "/privacy" },
    "/terms": { es: "/terminos", en: "/terms" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
