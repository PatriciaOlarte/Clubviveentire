import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const outDir = "hostinger-upload";
const zipPath = "dist/club-vive-entire-hostinger.zip";

await rm(outDir, { recursive: true, force: true });
await rm("dist", { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await mkdir("dist", { recursive: true });

await cp("index.html", path.join(outDir, "index.html"));
await cp("styles.css", path.join(outDir, "styles.css"));
await cp("script.js", path.join(outDir, "script.js"));
await cp("assets", path.join(outDir, "assets"), { recursive: true });

await writeFile(
  path.join(outDir, ".htaccess"),
  `Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^selector/?$ /?utm_source=instagram&utm_medium=bio&utm_campaign=entire_selector#selector [R=302,L,NE]
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "^(index\\.html)?$">
    Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"
    Header set Pragma "no-cache"
    Header set Expires "0"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType text/css "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
</IfModule>
`
);

await execFileAsync("zip", ["-r", "../dist/club-vive-entire-hostinger.zip", "."], {
  cwd: outDir
});

console.log(`Paquete Hostinger creado: ${zipPath}`);
