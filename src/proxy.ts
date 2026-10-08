import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { maintenanceHtml, maintenanceMode } from "./lib/maintenance";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (maintenanceMode) {
    return new Response(maintenanceHtml, {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Retry-After": "86400",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    });
  }
  return intlMiddleware(request);
}

export const config = {
  // Todo excepto API, archivos internos de Next/Vercel y archivos con extensión.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
