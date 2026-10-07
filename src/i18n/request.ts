import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { siteConfig } from "@site-config";
import { routing } from "./routing";

type Messages = { [key: string]: string | Messages | Messages[] | string[] };

/**
 * Inserta los datos de site.config.ts en los textos.
 * Use {company}, {legalName}, {phone}, {email} o {city} dentro de los archivos de traducción.
 */
const tokens: Record<string, string> = {
  "{company}": siteConfig.name,
  "{legalName}": siteConfig.legalName,
  "{phone}": siteConfig.contact.phoneDisplay,
  "{email}": siteConfig.contact.email,
  "{city}": siteConfig.address.city,
};

function fill<T>(value: T): T {
  if (typeof value === "string") {
    let out: string = value;
    for (const [token, replacement] of Object.entries(tokens)) out = out.split(token).join(replacement);
    return out as T;
  }
  if (Array.isArray(value)) return value.map(fill) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fill(v)])) as T;
  }
  return value;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const messages = (await import(`../../messages/${locale}.json`)).default as Messages;

  return {
    locale,
    messages: fill(messages),
    timeZone: "America/New_York",
  };
});
