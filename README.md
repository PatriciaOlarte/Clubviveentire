# Landing Entire®

Landing premium para la línea de productos Entire®, con selector interactivo, tabla comparativa, FAQ y CTA final.

## Inicio rápido

```bash
npm run dev
```

Abre:
`http://127.0.0.1:5173/`

Verificación antes de subir a GitHub:

```bash
npm run check
```

## Archivos

- `index.html`: estructura semántica, SEO básico y contenido de la landing.
- `styles.css`: estilos visuales responsive.
- `script.js`: lógica del selector "¿Qué Entire® es para ti?".
- `elementor-snippet.html`: bloque listo para pegar en Elementor, con header y footer propios.
- `elementor-section-snippet.html`: bloque listo para pegar en Elementor, sin header ni footer. Recomendado si el sitio ya usa el header/footer de WordPress.
- `assets/entire-family.png`: imagen oficial de familia de productos tomada de viveentire.com.
- `assets/product-*.webp`: imágenes oficiales individuales tomadas de viveentire.com.
- `supabase-newsletter.sql`: tabla y políticas de seguridad para guardar suscripciones del newsletter.
- `tools/build-elementor-snippet.mjs`: generador del snippet de Elementor a partir de `index.html`, `styles.css` y `script.js`.
- `tools/dev-server.mjs`: servidor local para revisar la landing.
- `tools/project-check.mjs`: verificación rápida antes de publicar.
- `DEPLOYMENT.md`: guía para GitHub y hosting.

## Instalación en WordPress + Elementor

Opción rápida recomendada:

1. Sube la carpeta `assets` al gestor de medios o al directorio del tema.
2. Abre `elementor-section-snippet.html` si vas a insertar la landing dentro de una página existente.
3. Reemplaza las rutas `assets/...` por las URLs finales de WordPress si no conservarás la carpeta `assets`.
4. Pega el bloque completo en un widget HTML de Elementor.
5. Configura el título SEO y la meta descripción desde Rank Math, Yoast o el plugin SEO activo.

Opción página completa:

1. Usa `elementor-snippet.html` si quieres que el bloque incluya su propio header, navegación y footer.
2. Reemplaza las rutas de imágenes si las subes al gestor de medios.
3. Pega el bloque completo en un widget HTML de Elementor.

Opción por archivos separados:

1. Usa el contenido de `index.html` como base de la página.
2. Carga `styles.css` como CSS personalizado de la página o del tema.
3. Carga `script.js` al final de la página o en el administrador de snippets.
4. Sube los archivos de `assets` y ajusta rutas si cambian de ubicación.

## SEO recomendado

Título SEO:
`Productos Entire® | Encuentra la fórmula ideal para cada etapa de la vida`

Meta descripción:
`Conoce la línea completa de suplementos nutricionales Entire®. Encuentra la fórmula ideal para niños, adultos y mayores de 40 años.`

## Verificación

- Diseño responsive para escritorio y móvil.
- Imágenes con `alt`.
- FAQ con datos estructurados JSON-LD.
- Tabla comparativa con scroll horizontal en pantallas pequeñas.
- Selector funcional con recomendación automática.
- Formulario de newsletter listo para conectar a Supabase.

## Captura de correos con Supabase

1. En Supabase, abre el SQL Editor.
2. Ejecuta el contenido de `supabase-newsletter.sql`.
3. En `script.js`, confirma que `SUPABASE_URL` y `SUPABASE_ANON_KEY` apunten al proyecto correcto.
4. Regenera los snippets si cambias `script.js` y vas a usar Elementor:
   `node tools/build-elementor-snippet.mjs`
5. Vuelve a pegar `elementor-section-snippet.html` o `elementor-snippet.html` en Elementor.

La política incluida permite insertar registros desde la landing, pero no permite leer correos públicamente con la anon key.

Estado actual:

- Proyecto conectado: `https://njaqzgmdevbjrultlqci.supabase.co`
- Tabla configurada: `entire_newsletter_leads`
- Migración aplicada correctamente en Supabase.

## GitHub

Este proyecto ya está preparado para subirse como repositorio estático. Archivos recomendados para publicar:

- Todo el contenido raíz del proyecto.
- La carpeta `assets`.
- Los snippets de Elementor si vas a mantener la integración con WordPress.

No subas archivos `.env`; el proyecto incluye `.env.example` solo como referencia.
