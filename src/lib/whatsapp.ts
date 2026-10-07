import { siteConfig } from "@site-config";

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telHref = `tel:${siteConfig.contact.phoneE164}`;
export const mailHref = `mailto:${siteConfig.contact.email}`;
