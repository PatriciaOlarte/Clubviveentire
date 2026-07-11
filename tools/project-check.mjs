import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "elementor-snippet.html",
  "elementor-section-snippet.html",
  "supabase-newsletter.sql",
  "assets/entire-family.png",
  "assets/product-master.webp",
  "assets/product-full.webp",
  "assets/product-zero.webp",
  "assets/product-proteina.webp",
  "assets/product-kido.webp"
];

const forbiddenPatterns = [
  /desktop-check\.png/,
  /mobile-check\.png/,
  /entire-family-green/,
  /entire-landing-concept/,
  /product-.*\.png/
];

for (const file of requiredFiles) {
  await access(file);
}

const filesToScan = [
  "index.html",
  "styles.css",
  "script.js",
  "elementor-snippet.html",
  "elementor-section-snippet.html",
  "README.md",
  "DEPLOYMENT.md"
];

for (const file of filesToScan) {
  const content = await readFile(file, "utf8");
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      throw new Error(`Referencia no deseada en ${file}: ${pattern}`);
    }
  }
}

const script = await readFile("script.js", "utf8");
if (!script.includes("https://njaqzgmdevbjrultlqci.supabase.co")) {
  throw new Error("SUPABASE_URL no está configurada en script.js");
}

console.log("Proyecto listo: archivos requeridos, rutas y Supabase verificados.");

