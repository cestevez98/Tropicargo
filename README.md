# Tropicargo — Sitio web moderno

Rediseño moderno, rápido y ligero del sitio de **Tropicargo**, empresa de
logística y envíos entre Estados Unidos y Cuba (casillero virtual en Miami,
compras asistidas, dropshipping y envíos exprés, aéreos y marítimos).

Este proyecto reconstruye la página —originalmente hecha en WordPress +
Elementor— como un **sitio estático sin dependencias ni frameworks**: solo
HTML, CSS y JavaScript vanilla. Carga rápido, es fácil de mantener y desplegar
en cualquier hosting.

## ✨ Qué incluye

- **Diseño moderno y responsive** con la identidad de marca de Tropicargo
  (navy `#0c2648` / naranja `#fa5a28` / cyan `#38acc6` / teal `#28838c`).
- **Hero** con propuesta de valor y **cotizador rápido** interactivo
  (estimación por tipo de envío, peso y provincia de destino).
- **Estadísticas animadas** (contadores al hacer scroll).
- **Servicios**: Casillero Virtual, Almacenamiento y Envío, Compras Asistidas,
  Dropshipping.
- **Tipos de envío**: Exprés (48–72 h), Aéreo (7–10 días), Marítimo (~21 días).
- **Cómo funciona** en 3 pasos: recibimos, pesamos y enviamos.
- **Planes** de membresía: Beginner $29.90, Intermediate $49.90,
  Advance $69.90, Pro $129.90.
- **Quiénes somos**, **FAQs** (acordeón) y **CTA de contacto**.
- Botón flotante de **WhatsApp**, menú móvil, animaciones de aparición y
  formulario de suscripción (demo front-end).
- Accesibilidad: navegación por teclado, `aria-labels`, respeto a
  `prefers-reduced-motion`.

## 📁 Estructura

```
.
├── index.html              # Página principal (todas las secciones)
└── assets/
    ├── css/styles.css      # Estilos y sistema de diseño
    ├── js/main.js          # Menú móvil, cotizador, contadores, animaciones
    └── img/
        ├── logo-tropicargo.svg         # Logo a color
        ├── logo-tropicargo-white.svg   # Logo en blanco (fondos oscuros)
        └── favicon.svg
```

## 🚀 Uso

Al ser estático, basta con abrir `index.html` o servirlo:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

Desplegable en Hostinger, Netlify, Vercel, GitHub Pages o cualquier servidor
de archivos estáticos.

## 🔧 Personalización

- **Colores / tipografías**: variables CSS en `:root` (`assets/css/styles.css`).
- **Tarifas del cotizador**: objetos `RATES` y `PROV_FACTOR` en
  `assets/js/main.js` (valores orientativos; la cotización real se calcula al
  pesar el paquete).
- **Contacto**: teléfono `+1 (786) 561-7158`, oficina
  `3132 NW 72nd Ave, Doral, FL 33122`.

---

© 2026 Tropicargo. Soluciones logísticas seguras y rápidas entre EE. UU. y el mundo.
