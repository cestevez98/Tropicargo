/**
 * ─────────────────────────────────────────────────────────────
 *  DATOS DE LA EMPRESA — edite SOLO este archivo.
 *  Todos los valores son marcadores de posición (placeholders).
 *  Los textos del sitio están en /messages/es.json y /messages/en.json.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Nombre comercial. Se inserta en todos los textos donde aparece {company}. */
  name: "NOMBRE_EMPRESA",
  /** Razón social para documentos legales (p. ej. "Nombre Empresa LLC"). */
  legalName: "NOMBRE_EMPRESA LLC",

  /**
   * Logo. Si `src` está vacío se usa el logo provisional en SVG generado
   * con las iniciales y el nombre (componente src/components/Logo.tsx).
   * Para usar un logo propio, guárdelo en /public (p. ej. /public/logo.svg)
   * e indique aquí la ruta: src: "/logo.svg".
   */
  logo: {
    src: "",
    initials: "NE",
    width: 180,
    height: 40,
  },

  /** Dominio de producción, sin barra final. Se usa en SEO, sitemap y Open Graph. */
  domain: "https://www.example.com",

  contact: {
    /** Teléfono tal como se muestra. */
    phoneDisplay: "(305) 000-0000",
    /** Teléfono en formato E.164 para enlaces tel:. */
    phoneE164: "+13050000000",
    /** WhatsApp: solo dígitos con código de país, sin + ni espacios. */
    whatsapp: "13050000000",
    email: "info@example.com",
  },

  address: {
    street: "0000 Brickell Avenue, Suite 000",
    city: "Miami",
    region: "FL",
    postalCode: "33131",
    country: "US",
    /** Coordenadas aproximadas (opcional, para schema.org). */
    geo: { latitude: 25.7617, longitude: -80.1918 },
  },

  /** Horario en formato schema.org (24 h) y textos por idioma. */
  hours: {
    schema: ["Mo-Fr 08:30-17:30"],
    es: "Lunes a viernes, 8:30 a. m. – 5:30 p. m. (hora del este)",
    en: "Monday to Friday, 8:30 a.m. – 5:30 p.m. (Eastern Time)",
  },

  /** Áreas de servicio (schema.org y textos). */
  serviceArea: ["Miami-Dade County, FL", "Broward County, FL"],

  /** Redes sociales. Deje la cadena vacía para ocultar el enlace. */
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
  },

  /**
   * Destino del formulario de contacto. En producción se recomienda definirlo
   * con la variable de entorno CONTACT_TO_EMAIL (tiene prioridad sobre este valor).
   */
  formRecipientEmail: "info@example.com",

  /**
   * Interruptores de secciones.
   * showTestimonials: mantener en false hasta tener testimonios reales y
   * autorizados por escrito (los textos van en messages/*.json → testimonials.items).
   */
  features: {
    showTestimonials: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
