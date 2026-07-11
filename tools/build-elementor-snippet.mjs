import { readFile, writeFile } from "node:fs/promises";

const index = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("script.js", "utf8");

const headJsonLd = index.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/)?.[0] ?? "";
const header = index.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";
const main = index.match(/<main>[\s\S]*?<\/main>/)?.[0] ?? "";
const footer = index.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? "";

function scopeCss(source) {
  const replacements = [
    [/^(\s*):root\s*\{/gm, "$1.entire-landing {"],
    [/^(\s*)\*\s*\{/gm, "$1.entire-landing, $1.entire-landing * {"],
    [/^(\s*)html\s*\{/gm, "$1.entire-landing {"],
    [/^(\s*)body\s*\{/gm, "$1.entire-landing {"],
    [/^(\s*)img\s*\{/gm, "$1.entire-landing img {"],
    [/^(\s*)a\s*\{/gm, "$1.entire-landing a {"],
    [/^(\s*)([.#][^{@][^{]+)\{/gm, (match, indent, selectorList) => {
      const scoped = selectorList
        .split(",")
        .map((selector) => selector.trim())
        .map((selector) => {
          if (!selector || selector.startsWith(".entire-landing")) return selector;
          return `.entire-landing ${selector}`;
        })
        .join(`,\n${indent}`);
      return `${indent}${scoped} {`;
    }],
    [/^(\s*)(table|th|td|thead th|tbody th|tr:last-child th|tr:last-child td|select|input|summary|details|details p)([^{]*)\{/gm, (match, indent, selector, rest) => {
      return `${indent}.entire-landing ${selector}${rest} {`;
    }]
  ];

  return replacements
    .reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), source)
    .replace(/^(\s*)(td|th|tr|thead|tbody|select|input|summary|a|button|details)\b([^{\n]*)(\{|,)/gm, (match, indent, tag, rest, end) => {
      if (match.includes(".entire-landing")) return match;
      return `${indent}.entire-landing ${tag}${rest}${end}`;
    })
    .replace(/^(\s*)\*,/gm, "$1.entire-landing *,")
    .replace(/^(\s*)\*::/gm, "$1.entire-landing *::");
}

function makeSnippet({ includeChrome }) {
  const title = includeChrome ? "Landing completa" : "Landing sin header/footer";
  const chromeNote = includeChrome
    ? "Incluye header y footer propios de la landing."
    : "No incluye header ni footer; recomendado para insertar dentro de una pagina existente de WordPress.";

  return `<!--
${title} Entire® para WordPress + Elementor.
Pegar este bloque completo en un widget HTML.
${chromeNote}
Importante: subir la carpeta assets junto a esta pagina o reemplazar las rutas assets/... por URLs absolutas del gestor de medios.
-->
${headJsonLd}
<style>
${scopeCss(css)}
</style>
<div class="entire-landing">
${includeChrome ? header : ""}
${main}
${includeChrome ? footer : ""}
</div>
<script>
(() => {
${js}
})();
</script>
`;
}

await writeFile("elementor-snippet.html", makeSnippet({ includeChrome: true }));
await writeFile("elementor-section-snippet.html", makeSnippet({ includeChrome: false }));
