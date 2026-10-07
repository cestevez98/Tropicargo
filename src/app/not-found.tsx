import Link from "next/link";
import { Public_Sans } from "next/font/google";

const font = Public_Sans({ subsets: ["latin"], display: "swap" });

// 404 para rutas fuera de /es y /en (poco habitual: el proxy redirige casi todo a un idioma).
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className={font.className} style={{ margin: 0, background: "#fbfaf7", color: "#15213a" }}>
        <main style={{ maxWidth: 560, margin: "15vh auto", padding: "0 16px", textAlign: "center" }}>
          <p style={{ color: "#8a520a", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 12 }}>Error 404</p>
          <h1 style={{ color: "#1F3864" }}>Página no encontrada · Page not found</h1>
          <p>
            <Link href="/es" style={{ color: "#1F3864", fontWeight: 700 }}>
              Ir al inicio
            </Link>{" "}
            ·{" "}
            <Link href="/en" style={{ color: "#1F3864", fontWeight: 700 }}>
              Go to home page
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
