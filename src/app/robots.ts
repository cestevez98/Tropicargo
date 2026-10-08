import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";
import { maintenanceMode } from "@/lib/maintenance";

export default function robots(): MetadataRoute.Robots {
  if (maintenanceMode) {
    // En mantenimiento no se rastrea nada (ver src/lib/maintenance.ts).
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
