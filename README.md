# Sitio web — Facturación y codificación médica (Miami)

Sitio bilingüe (español principal, inglés secundario) para una compañía de medical billing y codificación médica que atiende a clínicas de Miami-Dade y Broward.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · next-intl 4 · Resend (o Formspree) · Vercel Web Analytics (sin cookies).

---

## 1. Cómo correrlo en local

Requisitos: **Node.js 20.9 o superior** (recomendado 22) y npm.

```bash
npm install
cp .env.example .env.local   # opcional en local; vea la sección 3
npm run dev                  # http://localhost:3000 (redirige a /es)
```

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run lint` | ESLint (reglas de Next.js y TypeScript) |
| `npm run typecheck` | Comprobación de tipos |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |

> En local, sin claves configuradas, el formulario funciona igual: muestra la página de gracias y deja un aviso en la consola, pero no envía ningún email. En producción, sin proveedor configurado, el formulario muestra un error para que ninguna solicitud se pierda sin que nadie se entere.

---

## 2. Cómo cambiar los datos de la empresa (`site.config.ts`)

Todos los datos de la empresa están en **un solo archivo**: [`site.config.ts`](./site.config.ts), en la raíz del proyecto.

| Campo | Qué es |
| --- | --- |
| `name` | Nombre comercial (`NOMBRE_EMPRESA`). Aparece en todo el sitio, en los textos, en el SEO y en el logo provisional. |
| `legalName` | Razón social, para el pie de página y los textos legales. |
| `logo.initials` | Iniciales del logo provisional en SVG. |
| `logo.src` | Ruta a su logo definitivo (p. ej. `/logo.svg` dentro de `/public`). Si está vacío, se usa el logo provisional. |
| `domain` | Dominio de producción con `https://` y sin barra final. **Imprescindible** para el canonical, el sitemap, el hreflang y Open Graph. |
| `contact.phoneDisplay` / `phoneE164` | Teléfono tal como se muestra y en formato `+1305…` para los enlaces `tel:`. |
| `contact.whatsapp` | Número de WhatsApp: solo dígitos y con código de país (`1305…`). |
| `contact.email` | Email público. |
| `address` | Dirección en Miami y coordenadas aproximadas para schema.org. |
| `hours` | Horario (formato schema.org y texto en cada idioma). |
| `social` | LinkedIn, Facebook o Instagram. Si deja una red vacía, su icono no aparece. |
| `formRecipientEmail` | Email que recibe el formulario. La variable `CONTACT_TO_EMAIL` tiene prioridad sobre este valor. |
| `features.showTestimonials` | Mantener en `false` hasta tener testimonios reales y autorizados. |

Además:

- **Textos:** están en `messages/es.json` y `messages/en.json`. Ningún componente tiene texto escrito a mano. Dentro de los textos puede usar `{company}`, `{legalName}`, `{phone}`, `{email}` y `{city}`: se reemplazan automáticamente con los valores de `site.config.ts`.
- **Logos e iconos fijos:** `public/logo.svg` y `src/app/icon.svg` (favicon) son archivos estáticos con las iniciales "NE". Reemplácelos cuando tenga el logo definitivo.
- **Fotos del equipo:** en `src/app/[locale]/about/page.tsx` hay marcadores de posición con proporción 4:5. Ponga las fotos en `/public/team/` y sustitúyalos por `<Image>` de `next/image`. Los nombres y biografías se editan en `messages/*.json`, en `aboutPage.team.members`.
- **Testimonios:** añádalos en `testimonials.items` (con `quote`, `name` y `role`) y active `features.showTestimonials`. Solo testimonios reales, con autorización escrita.

---

## 3. Cómo configurar el envío del formulario

El formulario (`/es/contacto`) envía los datos a `src/app/api/contact/route.ts`, que valida otra vez en el servidor y manda un email.

### Opción A: Resend (recomendada)

1. Cree una cuenta en [resend.com](https://resend.com) y **verifique su dominio** (en *Domains* agregue los registros DNS que le indique).
2. Cree una API key.
3. Defina las variables de entorno (en `.env.local` para local y en Vercel para producción):

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=solicitudes@sudominio.com
CONTACT_FROM_EMAIL="Sitio web <formularios@sudominio.com>"   # debe pertenecer al dominio verificado
```

Cada solicitud llega con *Reply-To* configurado con el email de quien la envió, así que puede responder directamente.

### Opción B: Formspree (alternativa)

Si `RESEND_API_KEY` está vacía y define `FORMSPREE_FORM_ID` (el código que aparece en `https://formspree.io/f/XXXX`), el servidor reenvía la solicitud ya validada a Formspree.

### Protección contra spam y contra datos de pacientes

- **Validación** en el cliente y en el servidor con el mismo esquema (`src/lib/contact-schema.ts`).
- **Honeypot:** un campo oculto que los bots completan. Si viene lleno, se responde "ok" sin enviar nada.
- **Tiempo mínimo:** los envíos hechos en menos de 3 segundos desde que carga la página se descartan.
- **Límite de envíos:** 5 cada 10 minutos por IP (en memoria). En Vercel cada instancia tiene su propia memoria, por lo que es una primera barrera. Si llegara a recibir spam a gran escala, active la protección contra bots (*Bot Protection* o *Attack Challenge Mode*) en el firewall de Vercel, o use un límite compartido con Upstash Redis (`@upstash/ratelimit`).
- **Sin PHI:** el formulario no tiene ningún campo para datos de pacientes y muestra un aviso visible. Además, el servidor rechaza los mensajes que parecen incluir datos de pacientes: números de seguro social, identificadores de Medicare (MBI), fechas con formato de fecha de nacimiento o palabras como "DOB", "fecha de nacimiento" o "MRN". Ni el contenido del formulario ni los datos personales se escriben en los logs.

---

## 4. Cómo publicar en Vercel con dominio propio

1. Suba el repositorio a GitHub, GitLab o Bitbucket.
2. En [vercel.com](https://vercel.com) elija **Add New → Project**, importe el repositorio y deje la configuración detectada (Framework: Next.js).
3. En **Settings → Environment Variables** agregue `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` (o `FORMSPREE_FORM_ID`) para *Production* (y para *Preview* si quiere probar ahí).
4. Haga clic en **Deploy**.
5. **Dominio propio:** en **Settings → Domains** agregue `sudominio.com` y `www.sudominio.com`. Vercel le indicará los registros DNS que debe crear en su proveedor de dominio (normalmente un registro `A` para el dominio raíz y un `CNAME` para `www`). Elija cuál será el principal; el otro redirigirá a él.
6. Actualice `domain` en `site.config.ts` con el dominio principal definitivo (p. ej. `https://www.sudominio.com`), haga commit y espere a que se redespliegue.
7. **Analítica:** en el proyecto de Vercel abra **Analytics → Enable**. Vercel Web Analytics no usa cookies, así que no hace falta un banner de consentimiento. El script solo se carga cuando el sitio corre en Vercel.
8. **Search Console:** dé de alta el dominio en Google Search Console y envíe `https://sudominio.com/sitemap.xml`. Si tiene oficina física, cree también un perfil de Google Business Profile con la misma dirección y teléfono que `site.config.ts`.

---

## 5. Estructura del proyecto

```
site.config.ts              ← datos de la empresa (editar aquí)
messages/es.json, en.json   ← todos los textos del sitio
src/
  proxy.ts                  ← detección de idioma y rutas /es, /en (next-intl)
  i18n/                     ← rutas traducidas (/es/servicios ↔ /en/services)
  app/
    [locale]/               ← páginas: inicio, servicios, cómo trabajamos, indicadores,
                              cumplimiento, nosotros, contacto, gracias, privacidad, términos, 404
    api/contact/route.ts    ← envío del formulario
    sitemap.ts, robots.ts   ← SEO
    [locale]/opengraph-image.tsx ← imagen para redes sociales, generada por idioma
  components/               ← encabezado, pie, formulario, iconos, bloques reutilizables
  lib/                      ← SEO, schema.org, esquema del formulario, enlaces
```

### Rutas

| Español | Inglés |
| --- | --- |
| `/es` | `/en` |
| `/es/servicios` (anclas: `#rcm`, `#dedicated-coder`, `#projects`, `#credentialing`, `#pricing-model`) | `/en/services` |
| `/es/como-trabajamos` | `/en/how-we-work` |
| `/es/indicadores` | `/en/metrics` |
| `/es/cumplimiento` | `/en/compliance` |
| `/es/nosotros` | `/en/about` |
| `/es/contacto` · `/es/contacto/gracias` | `/en/contact` · `/en/contact/thank-you` |
| `/es/privacidad` · `/es/terminos` | `/en/privacy` · `/en/terms` |

La raíz `/` redirige a `/es` o a `/en` según el idioma del navegador; si no puede determinarlo, usa el español.

### SEO incluido

- Título, descripción, canonical y hreflang (`es`, `en` y `x-default` → español) en cada página.
- Open Graph y Twitter Cards con una imagen generada para cada idioma.
- `sitemap.xml` con las alternativas de idioma y `robots.txt`.
- schema.org `ProfessionalService` (un subtipo de `LocalBusiness`) con dirección, horario, catálogo de servicios y área de servicio Miami-Dade y Broward, más `FAQPage` en la página de inicio.
- La página de gracias tiene `noindex`.

---

## 6. Verificación realizada

- `npm run lint`, `npm run typecheck` y `npm run build`: sin errores.
- Todas las páginas revisadas en móvil (390 px) y escritorio (1440 px), sin desplazamiento horizontal.
- Lighthouse (móvil, en local): Accesibilidad 100 y Rendimiento 95–97. Prácticas recomendadas y SEO bajaban en local solo por dos motivos que desaparecen en producción: el script de analítica de Vercel (ahora solo se carga en Vercel) y el canonical apuntando a `example.com`. **Vuelva a medir con el dominio real.**
- Formulario probado de punta a punta en los dos idiomas: errores en cada campo con el foco en el primero, bloqueo de datos de pacientes, honeypot, tiempo mínimo, límite de envíos (429) y redirección a la página de gracias.

---

## 7. Decisiones tomadas (revisar)

Estas decisiones no estaban en el brief. En cada caso elegí la opción más conservadora:

1. **Costo de la auditoría:** el sitio no dice si es gratuita. Dice "sin compromiso de contratación". Si la ofrece sin costo, puede agregarlo en `home.hero.card.note` y en la pregunta frecuente de la auditoría.
2. **Contrato mínimo:** la respuesta habla de "un periodo inicial acordado en la propuesta, después mes a mes, con aviso previo por escrito". No menciona plazos concretos; ajústela a sus contratos reales.
3. **Plazos:** auditoría en 5 a 10 días hábiles y arranque en 2 a 4 semanas. Confírmelos.
4. **Pagadores:** se mencionan Medicare tradicional, Medicare Advantage, Medicaid de Florida y seguros comerciales, sin nombrar planes concretos ni insinuar afiliaciones.
5. **Sistemas clínicos:** se nombran como ejemplos (eClinicalWorks, athenahealth, AdvancedMD, Tebra, NextGen, Practice Fusion, DrChrono), con una nota legal de que las marcas pertenecen a sus titulares.
6. **Remuneración:** el sitio afirma que la tarifa nunca depende de la cantidad de diagnósticos ni de la puntuación de riesgo (tarifa fija para HMO y riesgo completo). Es una buena práctica de cumplimiento; asegúrese de que sus contratos lo reflejen.
7. **Compromisos de cumplimiento:** cifrado, autenticación en dos pasos, formación anual, verificación en la lista LEIE, verificación de antecedentes, equipo 100 % en EE. UU. y devolución de sobrepagos. **Publíquelos solo si los cumple.** Si alguno todavía no está implementado, elimínelo de `compliancePage` en los archivos de traducción.
8. **Equipo bilingüe:** el sitio afirma que se atiende en español y en inglés.
9. **Textos legales:** son borradores con un aviso visible de "revisar con abogado". Hay que completar la fecha de "Última actualización".
10. **Detector de PHI:** es deliberadamente estricto y puede rechazar, por ejemplo, un número de 9 dígitos seguidos. El aviso explica al usuario qué debe quitar.
11. **Estadísticas:** no se publican cifras de resultados ni testimonios. Los indicadores aparecen siempre como "metas de servicio".
12. **Cabeceras de seguridad:** HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy` y `Permissions-Policy`. No se incluyó una CSP estricta para no romper los scripts de Next y Vercel; puede añadirla más adelante en `next.config.ts`.
13. **Sin cookies:** el sitio no instala cookies ni píxeles de terceros, por lo que no necesita banner de consentimiento. Si en el futuro añade Google Analytics, Meta Pixel o algo similar, deberá añadir un banner de consentimiento.
