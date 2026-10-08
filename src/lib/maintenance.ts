/**
 * Modo mantenimiento: se activa con la variable de entorno MAINTENANCE_MODE=1 (en Vercel).
 * Mientras está activo, todas las páginas responden 503 + Retry-After + noindex,
 * que es la forma que Google recomienda para un cierre temporal.
 * Para desactivarlo: borre la variable (o póngala en 0) y vuelva a desplegar.
 */
export const maintenanceMode = process.env.MAINTENANCE_MODE === "1" || process.env.MAINTENANCE_MODE === "true";

export const maintenanceHtml = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Sitio en preparación · Site coming soon</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px 16px;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background: #172b4e; color: #fff; }
  main { max-width: 560px; text-align: center; }
  .bar { width: 56px; height: 4px; border-radius: 2px; background: #E9A23B; margin: 0 auto 28px; }
  h1 { font-size: clamp(1.6rem, 5vw, 2.2rem); line-height: 1.2; margin: 0 0 12px; }
  p { color: #dce4f0; line-height: 1.6; margin: 0 0 8px; font-size: 1.05rem; }
  hr { border: 0; border-top: 1px solid rgb(255 255 255 / 0.15); margin: 28px 0; }
</style>
</head>
<body>
<main>
  <div class="bar" aria-hidden="true"></div>
  <h1>Estamos preparando nuestro sitio web</h1>
  <p>Facturación y codificación médica para clínicas de Miami-Dade y Broward.</p>
  <p>Muy pronto estará disponible.</p>
  <hr>
  <h1 lang="en">Our website is coming soon</h1>
  <p lang="en">Medical billing and coding for practices in Miami-Dade and Broward.</p>
</main>
</body>
</html>`;
