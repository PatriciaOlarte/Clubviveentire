# Despliegue

Este proyecto es una landing estática. No requiere build para funcionar: basta con publicar `index.html`, `styles.css`, `script.js` y la carpeta `assets`.

## Antes de subir a GitHub

1. Ejecuta:
   ```bash
   npm run check
   ```
2. Confirma que el repositorio contiene:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/`
   - `elementor-section-snippet.html`
   - `supabase-newsletter.sql`

## Ver localmente

```bash
npm run dev
```

Abre:
`http://127.0.0.1:5173/`

## Publicar como sitio estático

Puedes publicar el contenido raíz del repositorio en:

- GitHub Pages
- Netlify
- Vercel
- Hostinger
- Cualquier hosting estático

No hay comando de build obligatorio.

## Hostinger hPanel

Para subir la landing al hosting clásico de Hostinger:

1. Genera el paquete:
   ```bash
   npm run build:hostinger
   ```
2. Sube este archivo en hPanel > File Manager:
   `dist/club-vive-entire-hostinger.zip`
3. Entra a `public_html` del dominio o subdominio donde vivirá la landing.
4. Sube el ZIP y extrae su contenido dentro de `public_html`.
5. Verifica que `index.html`, `styles.css`, `script.js`, `.htaccess` y `assets/` queden directamente dentro de `public_html`.
6. Abre el dominio en el navegador.

Si ya existe un sitio en `public_html`, crea primero una carpeta o subdominio para no reemplazar archivos existentes.

## Hostinger Deploy Web App desde GitHub

Este flujo requiere que el repositorio ya esté subido a GitHub.

Configuración sugerida en Hostinger:

- Repository: `PatriciaOlarte/Clubviveentire`
- Branch: `main`
- Framework preset: `Other` o `Node.js`
- Build command: `npm run build`
- Start command: `npm start`
- Output/public directory: dejar vacío si Hostinger pide ejecutar como app Node; usar `/` o raíz del repo si ofrece modo estático.

El servidor usa la variable `PORT` de Hostinger automáticamente. Si Hostinger pide una variable `HOST`, usa:

```text
0.0.0.0
```

Para un sitio estático simple, el método de ZIP en `public_html` sigue siendo el más directo. El deploy desde GitHub es mejor si quieres actualizaciones automáticas cuando hagas push.

## WordPress + Elementor

Usa `elementor-section-snippet.html` para pegar la landing dentro de una página existente.

Si editas `index.html`, `styles.css` o `script.js`, regenera los snippets:

```bash
npm run build:elementor
```

## Supabase

La tabla `entire_newsletter_leads` ya fue preparada con RLS. La anon key es pública y puede vivir en frontend, pero la política solo permite insertar registros, no leer correos.

Si creas otro proyecto de Supabase:

1. Ejecuta `supabase-newsletter.sql` en el nuevo proyecto.
2. Cambia `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `script.js`.
3. Ejecuta `npm run build:elementor`.
