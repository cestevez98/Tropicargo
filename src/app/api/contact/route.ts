import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@site-config";
import { contactSchema, fieldErrors, type ContactData } from "@/lib/contact-schema";

export const runtime = "nodejs";

/* ── Límite de envíos (en memoria, por instancia) ─────────────────────────
 * 5 envíos cada 10 minutos por IP. En Vercel cada instancia tiene su propia
 * memoria, por lo que este límite es una primera barrera; junto con el
 * honeypot y la comprobación de tiempo frena la mayoría del spam. Para un
 * límite global, vea la sección "Anti-spam" del README. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_REQUESTS;
}

const MIN_FILL_MS = 3000;

const labels: Record<string, Record<string, string>> = {
  providers: { "1": "1", "2-5": "2–5", "6-15": "6–15", "16+": "16+" },
  contract: { ffs: "Fee-for-service", hmo: "HMO (tarifa fija / capitación)", full_risk: "Full risk", unsure: "No sabe" },
  service: {
    audit: "Auditoría de 50 notas",
    rcm: "Facturación integral (RCM)",
    coder: "Codificador dedicado",
    projects: "Proyectos",
    credentialing: "Credentialing",
    unsure: "No sabe aún",
  },
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function buildEmail(data: ContactData, locale: string) {
  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Cargo", data.role],
    ["Clínica", data.clinic],
    ["Ciudad", data.city],
    ["Teléfono", data.phone],
    ["Email", data.email],
    ["Proveedores", labels.providers[data.providers]],
    ["Contrato principal", labels.contract[data.contract]],
    ["Servicio de interés", labels.service[data.service]],
    ["Idioma del sitio", locale === "en" ? "Inglés" : "Español"],
    ["Mensaje", data.message || "—"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:Arial,sans-serif;color:#1F3864">Nueva solicitud desde el sitio web</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top"><strong>${escapeHtml(k)}</strong></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#777">Recordatorio: no responda solicitando información de pacientes por email.</p>`;
  return { rows, text, html };
}

async function deliver(data: ContactData, locale: string) {
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.formRecipientEmail;
  const subject = `Solicitud web: ${labels.service[data.service]} — ${data.clinic}`;
  const { rows, text, html } = buildEmail(data, locale);

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;
    const { error } = await resend.emails.send({ from, to: [to], replyTo: data.email, subject, text, html });
    if (error) throw new Error(`Resend: ${error.name}`);
    return;
  }

  if (process.env.FORMSPREE_FORM_ID) {
    const res = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, _replyto: data.email, ...Object.fromEntries(rows) }),
    });
    if (!res.ok) throw new Error(`Formspree: ${res.status}`);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    // En desarrollo, sin proveedor configurado, solo se registra que llegó una solicitud (sin datos personales).
    console.warn("[contact] Formulario recibido, pero no hay RESEND_API_KEY ni FORMSPREE_FORM_ID configurados.");
    return;
  }
  throw new Error("No hay proveedor de email configurado");
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, error: "server" }, { status: 400 });

  // Honeypot y tiempo mínimo de llenado: si es un bot, respondemos "ok" sin enviar nada.
  const startedAt = Number(body.startedAt);
  if ((typeof body.website === "string" && body.website.trim() !== "") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rateLimit" }, { status: 429 });

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, { status: 422 });
  }

  try {
    await deliver(parsed.data, body.locale === "en" ? "en" : "es");
  } catch (err) {
    console.error("[contact] Error al enviar:", err instanceof Error ? err.message : "desconocido");
    return NextResponse.json({ ok: false, error: "server" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
