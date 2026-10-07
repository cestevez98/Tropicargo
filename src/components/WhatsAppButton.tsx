import { getTranslations } from "next-intl/server";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export async function WhatsAppButton() {
  const t = await getTranslations("common");
  return (
    <a
      href={whatsappUrl(t("whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("whatsappLabel")} ${t("opensNewTab")}`}
      className="fixed right-4 bottom-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0f7a3d] text-white shadow-lg ring-2 ring-white transition-transform hover:scale-105 hover:bg-[#0c6633] sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
